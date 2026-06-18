import React, { useState } from 'react';
import { ArrowLeft, CheckCircle, HelpCircle, Lock, Eye, EyeOff } from 'lucide-react';
import { BankAccount } from '../types';

interface BalanceCheckProps {
  bankAccounts: BankAccount[];
  onBack: () => void;
}

export default function BalanceCheck({ bankAccounts, onBack }: BalanceCheckProps) {
  const [selectedBank, setSelectedBank] = useState<BankAccount | null>(null);
  const [pin, setPin] = useState<string>('');
  const [showPin, setShowPin] = useState(false);
  const [step, setStep] = useState<'select' | 'pin' | 'loading' | 'result'>('select');
  const [error, setError] = useState('');

  const handleKeypadPress = (val: string) => {
    if (pin.length < 4) {
      setPin((prev) => prev + val);
    }
  };

  const handleDelete = () => {
    setPin((prev) => prev.slice(0, -1));
  };

  const handleValidate = () => {
    if (pin.length !== 4) {
      setError('Please Enter your secret 4-digit UPI PIN code.');
      return;
    }
    if (pin !== '4816') {
      setError('Incorrect 4-digit UPI PIN. Hint: 4816');
      return;
    }
    setError('');
    setStep('loading');

    setTimeout(() => {
      setStep('result');
    }, 2000);
  };

  const handleBankSelect = (bank: BankAccount) => {
    setSelectedBank(bank);
    setPin('');
    setStep('pin');
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
            <h2 className="font-bold text-base">Check Bank Balance</h2>
            <p className="text-[10px] text-white/70">Secure Balance Inquiry Network</p>
          </div>
        </div>
        <HelpCircle className="w-5 h-5 text-white/80" />
      </div>

      {step === 'select' && (
        <div className="p-4 flex-1 space-y-4">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">
            Choose Bank Account
          </p>
          <div className="space-y-3">
            {bankAccounts.map((bank) => (
              <button
                key={bank.id}
                onClick={() => handleBankSelect(bank)}
                className="w-full flex items-center justify-between p-4 bg-white hover:bg-slate-50 active:scale-[0.99] border border-slate-200 rounded-2xl shadow-sm transition-all cursor-pointer text-left"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full ${bank.logoColor} text-white font-bold flex items-center justify-center text-sm shadow-sm`}>
                    {bank.logoText}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">{bank.bankName}</h4>
                    <p className="text-[11px] text-slate-500">Savings Account •••• {bank.accountNumberLast4}</p>
                  </div>
                </div>
                <span className="text-xs text-[#470085] font-semibold bg-[#eedbff] px-3 py-1 rounded-full">
                  Check
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 'pin' && selectedBank && (
        <div className="flex-1 bg-slate-900 text-slate-100 flex flex-col justify-between">
          <div className="p-6 text-center space-y-6">
            <div className="space-y-2">
              <span className="text-[11px] bg-white/10 py-1 px-3 rounded-full text-slate-300 inline-block font-semibold">
                {selectedBank.bankName} Savings
              </span>
              <h3 className="font-bold text-white text-lg">ENTER 4-DIGIT UPI PIN</h3>
            </div>

            {/* Obscured PIN entry box */}
            <div className="flex flex-col items-center gap-3">
              <div className="flex justify-center gap-3.5 py-4 w-full">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-3.5 h-3.5 rounded-full border-2 transition-all duration-150 ${
                      pin.length > i
                        ? 'bg-purple-500 border-purple-500 scale-110 shadow-[0_0_12px_rgba(168,85,247,0.4)]'
                        : 'border-slate-600 bg-slate-800'
                    }`}
                  ></div>
                ))}
              </div>
              <p className="text-xs text-slate-400 flex items-center gap-1.5 justify-center">
                <Lock className="w-3.5 h-3.5 text-[#a855f7]" /> Secretly routed pin validations
              </p>
            </div>

            {error && (
              <p className="text-xs text-rose-400 font-semibold bg-rose-950/40 py-2 rounded-lg border border-rose-900/30">
                {error}
              </p>
            )}
          </div>

          {/* 3x4 custom numeric keypad */}
          <div className="bg-slate-950 p-4 pb-6 border-t border-slate-800/80 space-y-4">
            <div className="grid grid-cols-3 gap-1.5 max-w-xs mx-auto text-center">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((v) => (
                <button
                  key={v}
                  onClick={() => handleKeypadPress(v)}
                  className="h-14 font-semibold text-lg text-white hover:bg-slate-800/60 active:scale-95 rounded-xl transition-all cursor-pointer bg-slate-900/40 border border-slate-800"
                >
                  {v}
                </button>
              ))}
              <button
                onClick={handleDelete}
                className="h-14 flex items-center justify-center font-bold text-red-400 hover:bg-slate-800/60 active:scale-95 rounded-xl transition-all cursor-pointer bg-slate-900/40 border border-slate-800"
              >
                Delete
              </button>
              <button
                onClick={() => handleKeypadPress('0')}
                className="h-14 font-semibold text-lg text-white hover:bg-slate-800/60 active:scale-95 rounded-xl transition-all cursor-pointer bg-slate-900/40 border border-slate-800"
              >
                0
              </button>
              <button
                onClick={handleValidate}
                className="h-14 flex items-center justify-center bg-purple-600 hover:bg-purple-500 active:scale-95 text-white font-bold rounded-xl transition-all cursor-pointer shadow-lg"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {step === 'loading' && (
        <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-6 text-center">
          <div className="relative w-20 h-20 flex items-center justify-center">
            <div className="absolute inset-0 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
            <Lock className="w-8 h-8 text-[#470085]" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800">Verifying security node</h3>
            <p className="text-xs text-slate-500 mt-2">Connecting to NPCI / Bank Servers...</p>
          </div>
        </div>
      )}

      {step === 'result' && selectedBank && (
        <div className="flex-grow p-6 flex flex-col justify-between bg-slate-50">
          <div className="space-y-6 text-center py-8">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600 shadow-sm border border-emerald-200 animate-bounce">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-widest">
                Bank Balance Inquiry
              </h3>
              <p className="text-slate-800 text-sm font-bold">
                {selectedBank.bankName} Savings (•••• {selectedBank.accountNumberLast4})
              </p>
            </div>

            {/* Currency block */}
            <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm inline-block w-full max-w-sm">
              <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold mb-1">Available Balance</p>
              <span className="text-3xl font-extrabold text-[#470085]">
                ₹{selectedBank.balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          <button
            onClick={onBack}
            className="w-full h-12 bg-[#470085] hover:bg-[#5f259f] active:scale-[0.98] text-white font-bold rounded-full transition-all shadow-md cursor-pointer flex items-center justify-center"
          >
            Return to Home Screen
          </button>
        </div>
      )}
    </div>
  );
}
