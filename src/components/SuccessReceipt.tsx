import React, { useState } from 'react';
import { Check, Copy, Share2, Clipboard, ArrowLeft, ArrowRight } from 'lucide-react';

interface SuccessReceiptProps {
  recipientName: string;
  recipientUpi: string;
  recipientAvatar?: string;
  amount: number;
  payFromBankLabel: string;
  payFromBankLast4: string;
  note: string;
  onNavigateHome: () => void;
  onShareReceipt: () => void;
}

export default function SuccessReceipt({
  recipientName,
  recipientUpi,
  recipientAvatar,
  amount,
  payFromBankLabel,
  payFromBankLast4,
  note,
  onNavigateHome,
  onShareReceipt
}: SuccessReceiptProps) {
  const [copied, setCopied] = useState(false);
  const txnId = `TXN${Math.floor(1000000000 + Math.random() * 9000000000)}`;

  const handleCopyTxn = () => {
    navigator.clipboard.writeText(txnId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getLocalDateString = () => {
    const d = new Date();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let hours = d.getHours();
    const minutes = d.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'AM' : 'PM'; // wait, HPT standard format in India maps ampm correctly
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()} at ${hours}:${minutes} ${ampm}`;
  };

  return (
    <div className="flex-1 bg-[#fdf8fd] flex flex-col justify-between h-full select-none font-sans relative">
      
      {/* Confetti sparkle backgrounds decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150vw] h-[360px] bg-gradient-to-b from-emerald-500/15 to-transparent rounded-b-full blur-2xl"></div>
      </div>

      {/* Success large checkmark badge */}
      <div className="text-center pt-8 px-5 relative z-10 space-y-4">
        <div className="relative w-24 h-24 mx-auto">
          {/* pulsating ring */}
          <div className="absolute inset-0 bg-emerald-100 rounded-full animate-ping opacity-60"></div>
          <div className="absolute inset-0 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-400/35 border-4 border-emerald-100">
            <Check className="w-12 h-12 text-white stroke-[3.5]" />
          </div>
        </div>

        <div className="space-y-1">
          <h2 className="font-extrabold text-slate-800 text-lg">Payment Successful</h2>
          <p className="text-3xl sm:text-4xl font-black text-slate-800 tracking-tight">
            ₹{amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </p>
        </div>
      </div>

      {/* Receipt metadata Details Card */}
      <div className="p-4 relative z-10 flex-grow flex items-center justify-center">
        <div className="w-full bg-white border border-slate-200 shadow-lg rounded-2xl p-5 space-y-4">
          <div className="flex items-center gap-3.5">
            {recipientAvatar ? (
              <img
                src={recipientAvatar}
                alt={recipientName}
                className="w-12 h-12 rounded-full object-cover shadow-sm bg-slate-100"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-purple-700 text-white font-extrabold flex items-center justify-center text-sm shadow-sm">
                {recipientName
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .substring(0, 2)}
              </div>
            )}
            <div className="text-left leading-none">
              <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest block mb-1">Paid To</span>
              <h3 className="font-extrabold text-slate-800 text-sm leading-tight">{recipientName}</h3>
              <p className="text-[10px] text-slate-400 font-semibold mt-1">{recipientUpi}</p>
            </div>
          </div>

          <div className="border-t border-slate-100 my-4"></div>

          <div className="text-xs space-y-3 font-semibold text-slate-600 pl-1 text-left">
            <div className="flex justify-between items-center">
              <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Note Code</span>
              <span className="text-slate-800 text-xs font-bold">{note}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Date &amp; Time</span>
              <span className="text-slate-800 text-xs">{getLocalDateString()}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Method Source</span>
              <span className="text-slate-800 text-xs">{payFromBankLabel} •••• {payFromBankLast4}</span>
            </div>

            <div className="flex justify-between items-center relative">
              <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Transaction ID</span>
              <div className="flex items-center gap-1">
                <span className="text-slate-800 text-xs font-mono font-bold">{txnId}</span>
                <button
                  onClick={handleCopyTxn}
                  className="p-1 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors cursor-pointer"
                  title="Copy reference log"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>

              {copied && (
                <span className="absolute right-0 -top-6 text-[10px] bg-slate-800 text-white py-1 px-2.5 rounded-lg font-bold shadow-md">
                  Reference Copied!
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Button controls Done */}
      <div className="p-4 grid grid-cols-3 gap-3 relative z-10 shrink-0 border-t border-purple-50">
        <button
          onClick={onShareReceipt}
          className="col-span-1 border-2 border-slate-200 hover:bg-slate-50 active:scale-95 text-slate-700 py-3 rounded-full flex items-center justify-center gap-1 px-2 transition-all cursor-pointer font-bold text-xs"
        >
          <Share2 className="w-4 h-4 text-slate-500" />
          Share
        </button>

        <button
          onClick={onNavigateHome}
          className="col-span-2 bg-[#470085] hover:bg-[#5f259f] active:scale-95 text-white py-3 rounded-full transition-all cursor-pointer shadow-md text-xs font-bold"
        >
          Done
        </button>
      </div>

    </div>
  );
}
