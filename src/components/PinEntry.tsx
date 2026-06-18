import React, { useState } from 'react';
import { ArrowLeft, HelpCircle, Lock, Menu, ShieldCheck } from 'lucide-react';

interface PinEntryProps {
  recipientName: string;
  amount: number;
  payFromBankLabel: string;
  payFromBankLast4: string;
  onBack: () => void;
  onSubmit: (pin: string) => void;
}

export default function PinEntry({
  recipientName,
  amount,
  payFromBankLabel,
  payFromBankLast4,
  onBack,
  onSubmit
}: PinEntryProps) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  const handleKeyPress = (val: string) => {
    if (pin.length < 4) {
      setPin((p) => p + val);
    }
  };

  const handleDelete = () => {
    setPin((p) => p.slice(0, -1));
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
    onSubmit(pin);
  };

  return (
    <div className="flex-1 bg-slate-900 text-slate-100 flex flex-col justify-between h-full select-none font-sans">
      
      {/* Secure NPCI Head */}
      <header className="bg-slate-950 px-4 py-3 flex items-center justify-between shadow border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Menu className="w-5 h-5 text-slate-400" />
          <h2 className="font-extrabold text-xs tracking-wider text-slate-300">SECURE UPI PAYMENT GATEWAY</h2>
        </div>
        <div className="flex items-center gap-1">
          <HelpCircle className="w-4 h-4 text-slate-400" />
        </div>
      </header>

      {/* Main Form info */}
      <div className="flex-1 p-6 flex flex-col justify-around items-center text-center">
        {/* Recipient card info */}
        <div className="space-y-1">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">Paying to</p>
          <h3 className="text-white font-extrabold text-base leading-snug">{recipientName}</h3>
          <p className="text-slate-400 text-xs">{payFromBankLabel} •••• {payFromBankLast4}</p>
        </div>

        {/* Major Amount presentation */}
        <div className="space-y-0.5">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Transaction Value</p>
          <span className="text-3xl font-black text-white">
            ₹{amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </span>
        </div>

        {/* Secret Pin Indicators dots */}
        <div className="space-y-5 w-full bg-slate-950/40 border border-slate-800 rounded-3xl p-5 shadow-inner">
          <p className="text-xs text-slate-300 font-bold tracking-wider uppercase">ENTER 4-DIGIT UPI PIN</p>
          
          <div className="flex justify-center gap-3.5 py-1">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className={`w-3.5 h-3.5 rounded-full border-2 transition-all duration-150 ${
                  pin.length > i
                    ? 'bg-purple-500 border-purple-500 scale-110 shadow-[0_0_12px_rgba(168,85,247,0.4)]'
                    : 'border-slate-700 bg-slate-900'
                }`}
              ></div>
            ))}
          </div>

          <p className="text-[10px] text-emerald-400 font-semibold flex items-center justify-center gap-1.5 leading-none">
            <Lock className="w-3.5 h-3.5 stroke-[2.5]" /> Secure 256-bit SSL encrypted connection
          </p>
        </div>

        {error && (
          <p className="text-xs text-rose-400 font-semibold bg-rose-950/50 py-2.5 px-4 rounded-xl border border-rose-900/35">
            {error}
          </p>
        )}
      </div>

      {/* custom secure numeric keypad keypad and cancel actions */}
      <div className="bg-slate-950 p-4 pb-6 space-y-4 border-t border-slate-800">
        <div className="grid grid-cols-3 gap-1.5 max-w-xs mx-auto text-center">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((v) => (
            <button
              key={v}
              onClick={() => handleKeyPress(v)}
              className="h-14 font-semibold text-lg text-white hover:bg-slate-800 rounded-xl transition-all cursor-pointer bg-slate-900/30 border border-slate-800/80 shadow-sm btn-mobile-haptic active:animate-haptic-press"
            >
              {v}
            </button>
          ))}
          <button
            onClick={onBack}
            className="h-14 flex items-center justify-center text-xs font-bold text-[#eedbff] hover:bg-slate-800 rounded-xl transition-all cursor-pointer bg-slate-900/30 border border-slate-800/80 shadow-sm btn-mobile-haptic active:animate-haptic-press"
          >
            Cancel
          </button>
          <button
            onClick={() => handleKeyPress('0')}
            className="h-14 font-semibold text-lg text-white hover:bg-slate-800 rounded-xl transition-all cursor-pointer bg-slate-900/30 border border-slate-800/80 shadow-sm btn-mobile-haptic active:animate-haptic-press"
          >
            0
          </button>
          <button
            onClick={handleValidate}
            className="h-14 flex items-center justify-center bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-sm rounded-xl transition-all cursor-pointer shadow-lg shadow-purple-900/20 btn-mobile-haptic active:animate-haptic-press btn-vibrate-on-press"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
