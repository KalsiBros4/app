import React, { useState } from 'react';
import { ArrowLeft, Edit2, HelpCircle, MoreVertical, ChevronDown, Check, Wallet } from 'lucide-react';
import { Contact, BankAccount } from '../types';

interface TransferInputProps {
  recipient: Contact;
  bankAccounts: BankAccount[];
  walletBalance: number;
  onBack: () => void;
  onSubmit: (amount: number, fee: number, payFrom: string, bankId: string, note: string) => void;
}

export default function TransferInput({ recipient, bankAccounts, walletBalance, onBack, onSubmit }: TransferInputProps) {
  const [amount, setAmount] = useState('0');
  const [note, setNote] = useState('');
  const [selectedBankId, setSelectedBankId] = useState<string>(bankAccounts[0]?.id || 'wallet');
  const [showBankSheet, setShowBankMenu] = useState(false);

  const handleKeypadPress = (val: string) => {
    if (amount === '0') {
      if (val === '.') {
        setAmount('0.');
      } else {
        setAmount(val);
      }
    } else {
      if (val === '.' && amount.includes('.')) return;
      // limit decimal places to 2
      if (amount.includes('.')) {
        const parts = amount.split('.');
        if (parts[1] && parts[1].length >= 2) return;
      }
      // limit max digits to keep UI clean
      if (amount.length >= 8) return;
      setAmount((prev) => prev + val);
    }
  };

  const handleDelete = () => {
    setAmount((prev) => {
      if (prev.length <= 1) return '0';
      return prev.slice(0, -1);
    });
  };

  const getSelectedPaymentLabel = () => {
    if (selectedBankId === 'wallet') {
      return `PhonePe Wallet (₹${walletBalance.toFixed(2)})`;
    }
    const bank = bankAccounts.find((b) => b.id === selectedBankId);
    return bank ? `${bank.bankName} **** ${bank.accountNumberLast4}` : 'Select Account';
  };

  const handlePay = () => {
    const numericAmount = parseFloat(amount);
    if (!numericAmount || numericAmount <= 0) return;

    // Check balances
    if (selectedBankId === 'wallet') {
      if (walletBalance < numericAmount) {
        alert(`Insufficient Wallet Balance. Available wallet balance is ₹${walletBalance.toFixed(2)}`);
        return;
      }
    } else {
      const bank = bankAccounts.find((b) => b.id === selectedBankId);
      if (bank && bank.balance < numericAmount) {
        alert(`Insufficient Bank Balance. Available bank balance is ₹${bank.balance.toFixed(2)}`);
        return;
      }
    }

    const payFromLabel = selectedBankId === 'wallet' 
      ? 'PhonePe Wallet' 
      : bankAccounts.find((b) => b.id === selectedBankId)?.bankName || 'Unknown Bank';

    onSubmit(
      numericAmount,
      0, // zero UPI fee
      payFromLabel,
      selectedBankId,
      note.trim() || 'Money Transfer'
    );
  };

  const isPayBtnActive = parseFloat(amount) > 0;

  return (
    <div className="flex-grow flex flex-col justify-between h-full bg-[#fdf8fd] relative select-none">
      
      {/* Top Header navbar */}
      <header className="flex justify-between items-center px-4 h-16 w-full shrink-0 sticky top-0 bg-[#fdf8fd] z-30 border-b border-purple-50">
        <button onClick={onBack} className="w-10 h-10 flex items-center justify-center rounded-full text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-1">
          <button className="p-2 hover:bg-slate-100 rounded-full text-slate-500 cursor-pointer">
            <HelpCircle className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-slate-100 rounded-full text-slate-500 cursor-pointer">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Canvas Scroll area */}
      <div className="flex-1 flex flex-col px-4 pt-2 pb-4 overflow-y-auto">
        {/* Payee Recipient Identity */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 rounded-full bg-indigo-150 text-indigo-800 font-extrabold flex items-center justify-center text-lg mb-2 relative shadow-md">
            {recipient.avatarUrl ? (
              <img
                src={recipient.avatarUrl}
                alt={recipient.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-full absolute inset-0"
              />
            ) : (
              <div className="w-full h-full rounded-full flex items-center justify-center text-white" style={{ backgroundColor: recipient.color }}>
                {recipient.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .substring(0, 2)}
              </div>
            )}
          </div>
          <h1 className="font-extrabold text-slate-800 text-base flex items-center gap-1.5 leading-snug">
            {recipient.name}
          </h1>
          <p className="text-[11px] text-slate-400 font-semibold tracking-wider">{recipient.phone} • {recipient.upiId}</p>
        </div>

        {/* Big digits centered dynamic layout */}
        <div className="flex flex-col items-center justify-center flex-grow min-h-[140px] py-4">
          <div className="flex items-baseline space-x-0.5 relative">
            <span className="font-extrabold text-3xl text-slate-800 select-none mr-1.5 self-center">₹</span>
            <div className="flex items-center">
              <span className="text-4xl sm:text-5xl font-extrabold text-slate-800 tracking-tight" id="amount-display">
                {amount}
              </span>
              <div className="w-[3px] h-9 bg-purple-600 ml-1.5 animate-pulse" id="cursor"></div>
            </div>
          </div>

          <div className="mt-6 w-full max-w-[280px]">
            <div className="bg-slate-100 rounded-2xl px-4 py-2.5 flex items-center shadow-inner">
              <Edit2 className="w-4 h-4 text-slate-400 mr-2.5 shrink-0" />
              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Add rent details, dinner share, etc."
                className="bg-transparent border-none outline-none text-xs font-semibold w-full text-slate-800 placeholder:text-slate-400 focus:ring-0 px-0"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Transaction trigger bar with account indicator on top */}
      <div className="bg-white rounded-t-3xl shadow-[0_-4px_24px_rgba(0,0,0,0.06)] w-full shrink-0 pb-3 border-t border-purple-100 relative z-30">
        <div className="px-4 py-3.5 flex justify-between items-center border-b border-purple-50">
          <button 
            onClick={() => setShowBankMenu(true)}
            className="flex flex-col text-left cursor-pointer group"
          >
            <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest leading-none">Paying with</span>
            <span className="text-[11px] font-bold text-slate-800 flex items-center mt-1 select-none group-hover:text-[#470085] transition-colors leading-tight">
              {getSelectedPaymentLabel()}
              <IconKeyboardArrowDown className="w-3.5 h-3.5 ml-1 text-slate-400 group-hover:text-[#470085] transition-all" />
            </span>
          </button>

          {/* Secure button pay */}
          <button
            onClick={handlePay}
            disabled={!isPayBtnActive}
            className={`font-extrabold text-xs px-6 py-2.5 rounded-full shadow transition-all cursor-pointer ${
              isPayBtnActive
                ? 'bg-[#470085] hover:bg-[#5f259f] text-white btn-mobile-haptic active:animate-haptic-press btn-vibrate-on-press'
                : 'bg-slate-100 text-slate-400 opacity-60 cursor-not-allowed'
            }`}
          >
            Pay
          </button>
        </div>

        {/* Numerical grids layout */}
        <div className="grid grid-cols-3 gap-0.5 p-1 text-center bg-slate-50">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0'].map((val) => (
            <button
              key={val}
              onClick={() => handleKeypadPress(val)}
              className="h-12 flex items-center justify-center font-extrabold text-slate-800 text-base hover:bg-purple-100/40 rounded-lg transition-all cursor-pointer btn-mobile-haptic active:animate-haptic-press"
            >
              {val}
            </button>
          ))}
          <button
            onClick={handleDelete}
            className="h-12 flex items-center justify-center text-slate-600 hover:bg-purple-100/45 rounded-lg transition-all cursor-pointer btn-mobile-haptic active:animate-haptic-press"
          >
            <IconBackspace className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>
      </div>

      {/* Account lists slider sheet selector */}
      {showBankSheet && (
        <div className="absolute inset-0 bg-black/40 z-50 flex items-end">
          {/* backdrop clicking */}
          <div className="absolute inset-0" onClick={() => setShowBankMenu(false)}></div>
          
          <div className="w-full bg-[#fdf8fd] rounded-t-3xl shadow-xl relative z-50 p-5 space-y-4 max-h-[80%] overflow-y-auto animate-slide-up">
            <h3 className="font-extrabold text-[#470085] text-sm uppercase tracking-wider pl-1">
              Select Payment Source
            </h3>

            <div className="space-y-2">
              {/* Wallet select */}
              <button
                onClick={() => {
                  setSelectedBankId('wallet');
                  setShowBankMenu(false);
                }}
                className={`w-full flex items-center justify-between p-3 rounded-2xl border transition-all text-left cursor-pointer ${
                  selectedBankId === 'wallet'
                    ? 'border-[#470085] bg-[#eedbff]/30'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-700 text-white flex items-center justify-center text-xs">
                    <Wallet className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-800 text-xs">PhonePe Wallet</h4>
                    <p className="text-[10px] text-slate-400">Available: ₹{walletBalance.toFixed(2)} (PIN-less Enabled)</p>
                  </div>
                </div>
                {selectedBankId === 'wallet' && (
                  <span className="w-5 h-5 rounded-full bg-[#470085] flex items-center justify-center text-white">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                )}
              </button>

              {/* Banks List select */}
              {bankAccounts.map((b) => (
                <button
                  key={b.id}
                  onClick={() => {
                    setSelectedBankId(b.id);
                    setShowBankMenu(false);
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-2xl border transition-all text-left cursor-pointer ${
                    selectedBankId === b.id
                      ? 'border-[#470085] bg-[#eedbff]/30'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full ${b.logoColor} text-white font-extrabold flex items-center justify-center text-[10px]`}>
                      {b.logoText}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-800 text-xs">{b.bankName}</h4>
                      <p className="text-[10px] text-slate-400">Savings Account ••• {b.accountNumberLast4} | Balance: ₹{b.balance.toFixed(2)}</p>
                    </div>
                  </div>
                  {selectedBankId === b.id && (
                    <span className="w-5 h-5 rounded-full bg-[#470085] flex items-center justify-center text-white">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Local compact icons
function IconKeyboardArrowDown(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  );
}

function IconBackspace(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.375-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.211-.211.498-.33.796-.33H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-9.284c-.298 0-.585-.119-.796-.33z" />
    </svg>
  );
}
