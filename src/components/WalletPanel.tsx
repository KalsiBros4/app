import React, { useState } from 'react';
import { ArrowLeft, Wallet, CreditCard, ChevronRight, Check } from 'lucide-react';
import { BankAccount } from '../types';

interface WalletPanelProps {
  walletBalance: number;
  bankAccounts: BankAccount[];
  onAddFunds: (amount: number, bankId: string) => void;
  onBack: () => void;
}

export default function WalletPanel({ walletBalance, bankAccounts, onAddFunds, onBack }: WalletPanelProps) {
  const [addAmount, setAddAmount] = useState<string>('');
  const [selectedBankId, setSelectedBankId] = useState<string>(bankAccounts[0]?.id || '');
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState('');

  const quickAmounts = [100, 500, 1000, 2000];

  const handleAdd = () => {
    setError('');
    const amt = parseFloat(addAmount);
    if (isNaN(amt) || amt <= 0) {
      setError('Please Enter a valid positive amount to top up');
      return;
    }

    const bank = bankAccounts.find((b) => b.id === selectedBankId);
    if (!bank) {
      setError('Selected bank is not available');
      return;
    }

    if (bank.balance < amt) {
      setError(`Insufficient funds in ${bank.bankName}. Available: ₹${bank.balance.toFixed(2)}`);
      return;
    }

    // Trigger state change
    onAddFunds(amt, selectedBankId);
    setCompleted(true);
  };

  return (
    <div className="flex-1 bg-[#fdf8fd] flex flex-col justify-between h-full">
      {/* Header */}
      <div className="bg-[#470085] text-white px-4 py-4 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-1 hover:bg-white/10 rounded-full transition-colors cursor-pointer">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="font-bold text-base">YPay Wallet</h2>
            <p className="text-[10px] text-white/70">Top Up and PIN-less payments</p>
          </div>
        </div>
        <Wallet className="w-5 h-5 text-white/80" />
      </div>

      {!completed ? (
        <div className="p-4 flex-grow flex flex-col justify-between">
          <div className="space-y-6">
            {/* Wallet Core Info */}
            <div className="bg-gradient-to-r from-purple-800 to-indigo-900 rounded-3xl p-5 text-white shadow-md relative overflow-hidden">
              <div className="absolute right-0 bottom-0 opacity-10 text-white translate-x-4 translate-y-4">
                <Wallet className="w-40 h-40" />
              </div>
              <div className="space-y-1 z-10 relative">
                <span className="text-[10px] tracking-widest font-extrabold text-indigo-200 uppercase">Interactive Balance</span>
                <p className="text-3xl font-extrabold">₹{walletBalance.toFixed(2)}</p>
                <p className="text-xs text-indigo-150 pt-2 opacity-85">Enable standard PIN-less checkout up to ₹2,000</p>
              </div>
            </div>

            {/* Input reload */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block pl-1">
                Amount to Add
              </label>
              <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex items-center">
                <span className="text-2xl font-bold text-slate-500 mr-2">₹</span>
                <input
                  type="number"
                  value={addAmount}
                  onChange={(e) => setAddAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full bg-transparent text-2xl font-bold text-[#470085] focus:outline-none border-none outline-none"
                />
              </div>

              {/* Quick Select Buttons */}
              <div className="grid grid-cols-4 gap-2">
                {quickAmounts.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => setAddAmount(q.toString())}
                    className="py-2.5 bg-slate-100 hover:bg-[#eedbff]/30 border border-slate-200 hover:border-[#470085] rounded-xl text-xs font-bold text-slate-700 hover:text-[#470085] transition-all cursor-pointer"
                  >
                    +₹{q}
                  </button>
                ))}
              </div>
            </div>

            {/* Bank selectors */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block pl-1">
                Funding Account
              </label>
              <div className="space-y-2">
                {bankAccounts.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => setSelectedBankId(b.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all text-left cursor-pointer ${
                      selectedBankId === b.id
                        ? 'border-[#470085] bg-[#eedbff]/20'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full ${b.logoColor} text-white font-bold flex items-center justify-center text-[10px]`}>
                        {b.logoText}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 text-xs">{b.bankName}</h4>
                        <p className="text-[10px] text-slate-400">Bal: ₹{b.balance.toFixed(2)}</p>
                      </div>
                    </div>
                    {selectedBankId === b.id ? (
                      <span className="w-5 h-5 rounded-full bg-[#470085] flex items-center justify-center text-white">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                    ) : (
                      <span className="w-5 h-5 rounded-full border border-slate-300"></span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {error && (
              <p className="text-xs text-rose-600 bg-rose-50 p-2.5 rounded-xl border border-rose-100 text-center font-semibold">
                {error}
              </p>
            )}
          </div>

          <button
            onClick={handleAdd}
            className="w-full h-12 bg-[#470085] hover:bg-[#5f259f] active:scale-[0.98] text-white font-bold rounded-full transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer mt-6"
          >
            Add Money Securely
          </button>
        </div>
      ) : (
        <div className="p-6 flex-grow flex flex-col justify-between bg-slate-50 text-center items-center">
          <div className="space-y-5 py-8 max-w-sm">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600 shadow-sm border border-emerald-200 animate-bounce">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-slate-800 text-lg">Money Added Successfully</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                ₹{parseFloat(addAmount).toFixed(2)} successfully credited to your wallet from linked bank account!
              </p>
            </div>
          </div>
          <button
            onClick={onBack}
            className="w-full h-12 bg-[#470085] hover:bg-[#5f259f] active:scale-[0.98] text-white font-bold rounded-full transition-all shadow-md cursor-pointer"
          >
            Go Back
          </button>
        </div>
      )}
    </div>
  );
}
