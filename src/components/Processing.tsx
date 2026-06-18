import React, { useState, useEffect } from 'react';
import { ShieldCheck, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';

interface ProcessingProps {
  recipientName: string;
  recipientUpi: string;
  amount: number;
  onComplete: () => void;
}

export default function Processing({ recipientName, recipientUpi, amount, onComplete }: ProcessingProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  useEffect(() => {
    // Step 1 -> 2
    const timer1 = setTimeout(() => {
      setStep(2);
    }, 1500);

    // Step 2 -> 3
    const timer2 = setTimeout(() => {
      setStep(3);
    }, 3200);

    // Complete whole process
    const timer3 = setTimeout(() => {
      onComplete();
    }, 4800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <div className="flex-1 bg-[#fdf8fd] flex flex-col justify-center items-center p-6 text-center select-none font-sans h-full relative">
      
      {/* Background shadow ambience */}
      <div className="absolute top-0 left-0 inset-x-0 h-64 bg-gradient-to-b from-purple-100/50 to-transparent pointer-events-none"></div>

      <div className="w-full max-w-md bg-white border border-slate-200 shadow-xl rounded-3xl p-6 space-y-6 relative z-10">
        
        {/* Payee headers */}
        <div className="space-y-1">
          <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest pl-0.5">Transfer in transit</p>
          <h2 className="text-slate-800 font-extrabold text-base leading-snug">Paying {recipientName}</h2>
          <p className="text-[11px] text-slate-400 font-semibold">{recipientUpi}</p>
        </div>

        {/* Amount in transit */}
        <div>
          <span className="text-3xl font-black text-[#470085]">
            ₹{amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </span>
        </div>

        {/* Spinner rings */}
        <div className="relative w-32 h-32 flex items-center justify-center mx-auto py-2">
          {/* Outer circle */}
          <div className="absolute inset-0 border-4 border-purple-100 border-t-purple-600 rounded-full animate-spin"></div>
          {/* Inner pulsating ring */}
          <div className="absolute w-24 h-24 bg-[#eedbff] rounded-full animate-ping opacity-25"></div>
          <RefreshCw className="w-10 h-10 text-[#470085] animate-spin relative z-10" />
        </div>

        {/* Live step timelines log */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="font-extrabold text-[#470085] text-sm leading-snug">
            {step === 1 && 'Verifying payment legitimacy...'}
            {step === 2 && 'Connecting securely with banking ledger...'}
            {step === 3 && 'Finalizing transaction logs...'}
          </h3>

          <div className="flex justify-between items-center text-xs font-semibold px-4">
            {/* Step 1 */}
            <div className="flex flex-col items-center gap-1.5 w-1/3">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-50" />
              <span className="text-emerald-600 text-[10px] uppercase font-bold">Verifying</span>
            </div>

            {/* Step 2 */}
            <div className={`flex flex-col items-center gap-1.5 w-1/3 transition-all duration-350 ${step >= 2 ? 'opacity-100' : 'opacity-35'}`}>
              {step >= 2 ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-50" />
              ) : (
                <div className="w-5 h-5 rounded-full border-2 border-slate-300"></div>
              )}
              <span className={`${step >= 2 ? 'text-emerald-500' : 'text-slate-400'} text-[10px] uppercase font-bold`}>Connecting</span>
            </div>

            {/* Step 3 */}
            <div className={`flex flex-col items-center gap-1.5 w-1/3 transition-all duration-350 ${step >= 3 ? 'opacity-100' : 'opacity-30'}`}>
              {step >= 3 ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-50" />
              ) : (
                <div className="w-5 h-5 rounded-full border-2 border-slate-300"></div>
              )}
              <span className={`${step >= 3 ? 'text-emerald-500' : 'text-slate-400'} text-[10px] uppercase font-bold`}>Finalizing</span>
            </div>
          </div>
        </div>

      </div>

      {/* Safety Badge */}
      <p className="mt-8 text-[11px] text-slate-400 font-extrabold flex items-center justify-center gap-1.5">
        <ShieldCheck className="w-4 h-4 text-emerald-500" /> Insured by Federal Reserve NPCI Node
      </p>
    </div>
  );
}
