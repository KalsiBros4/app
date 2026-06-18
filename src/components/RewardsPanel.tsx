import React, { useState } from 'react';
import { ArrowLeft, Gift, Award, CheckCircle, Sparkles, Copy, ChevronRight } from 'lucide-react';
import { RewardCoupon } from '../types';

interface RewardsPanelProps {
  coupons: RewardCoupon[];
  onScratch: (id: string, cashbackValue: number) => void;
  onBack: () => void;
}

export default function RewardsPanel({ coupons, onScratch, onBack }: RewardsPanelProps) {
  const [activeCoupon, setActiveCoupon] = useState<RewardCoupon | null>(null);
  const [isScratching, setIsScratching] = useState(false);
  const [scratchProgress, setScratchProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  const startScratching = () => {
    setIsScratching(true);
    // Simulate scratching sequence
    const interval = setInterval(() => {
      setScratchProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setIsScratching(false);
          if (activeCoupon) {
            onScratch(activeCoupon.id, activeCoupon.value || 0);
            // update local active coupon reference
            setActiveCoupon({ ...activeCoupon, scratched: true });
          }
          return 100;
        }
        return p + 10;
      });
    }, 150);
  };

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
            <h2 className="font-bold text-base">Scratch Card Rewards</h2>
            <p className="text-[10px] text-white/70">Win instant cashback or voucher codes</p>
          </div>
        </div>
        <Gift className="w-5 h-5 text-white/80" />
      </div>

      {!activeCoupon ? (
        <div className="p-4 flex-1 space-y-4 overflow-y-auto">
          <div className="bg-purple-100/50 p-4 border border-purple-200/50 rounded-2xl flex items-center gap-3">
            <Award className="w-10 h-10 text-[#470085]" />
            <div className="text-xs">
              <h4 className="font-bold text-slate-800">Direct Cashback Program</h4>
              <p className="text-slate-500 mt-0.5">Win real virtual balances straight credited to your active wallet!</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3" id="rewards-grid">
            {coupons.map((c) => (
              <button
                key={c.id}
                id={`reward-card-${c.id}`}
                onClick={() => {
                  setActiveCoupon(c);
                  setScratchProgress(c.scratched ? 100 : 0);
                }}
                className={`aspect-square relative rounded-2xl border text-center p-4 flex flex-col justify-between items-center transition-all cursor-pointer ${
                  c.scratched
                    ? 'bg-white border-slate-200 shadow-sm'
                    : 'bg-gradient-to-tr from-purple-700 via-[#5f259f] to-indigo-900 border-purple-600 shadow-md hover:scale-[1.02]'
                }`}
              >
                {c.scratched ? (
                  <>
                    <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div className="space-y-0.5">
                      <h4 className="text-sm font-extrabold text-slate-800 leading-snug">
                        {c.value ? `₹${c.value} Won!` : 'Claimed'}
                      </h4>
                      <p className="text-[10px] text-slate-400 font-medium line-clamp-2">{c.title}</p>
                    </div>
                    <span className="text-[9px] text-emerald-600 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full">
                      Credited
                    </span>
                  </>
                ) : (
                  <>
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white border border-white/20 animate-pulse">
                      <Gift className="w-6 h-6" />
                    </div>
                    <p className="text-xs font-bold text-indigo-100 tracking-wider">TAP TO SCRATCH</p>
                    <span className="text-[9px] text-[#eedbff] bg-white/20 px-2 py-0.5 rounded-full uppercase tracking-wider font-extrabold">
                      Locked
                    </span>
                  </>
                )}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex-grow p-4 flex flex-col justify-between bg-slate-950 text-white">
          <button
            onClick={() => setActiveCoupon(null)}
            className="self-start text-xs font-bold text-slate-400 hover:text-white flex items-center gap-1.5 py-1 px-3 bg-slate-900 rounded-full border border-slate-800 mb-4 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to rewards grid
          </button>

          <div className="flex-1 flex flex-col items-center justify-center">
            {scratchProgress < 100 ? (
              <div className="w-72 h-72 rounded-3xl bg-slate-900 border border-slate-800 relative overflow-hidden flex flex-col items-center justify-center space-y-4">
                {/* Simulated protective foil */}
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-800 to-indigo-900 flex flex-col items-center justify-center p-6 text-center select-none">
                  <div className="w-20 h-20 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mb-4">
                    <Gift className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="font-bold text-white text-base">Exclusive scratch shield</h3>
                  <p className="text-xs text-indigo-200 mt-1.5 leading-relaxed">
                    Tap below to dissolve the scratch security layer and trigger instant validation
                  </p>
                  
                  {isScratching && (
                    <div className="w-full bg-slate-950/60 h-2 rounded-full mt-4 overflow-hidden">
                      <div className="bg-purple-500 h-2 transition-all duration-150" style={{ width: `${scratchProgress}%` }}></div>
                    </div>
                  )}

                  {!isScratching ? (
                    <button
                      onClick={startScratching}
                      className="mt-6 py-2 px-6 bg-white hover:bg-neutral-100 active:scale-95 text-[#470085] text-xs font-bold rounded-full transition-all cursor-pointer shadow-lg"
                    >
                      Scratch Card Now
                    </button>
                  ) : (
                    <span className="mt-6 text-xs text-indigo-200 font-semibold uppercase tracking-wider animate-pulse">
                      Scratching... {scratchProgress}%
                    </span>
                  )}
                </div>
              </div>
            ) : (
              <div className="w-72 h-72 rounded-3xl bg-[#eedbff] text-slate-950 flex flex-col justify-between p-6 text-center shadow-lg border border-purple-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#470085]/5 rounded-bl-full pointer-events-none"></div>
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto text-[#470085] shadow-sm">
                  <Sparkles className="w-6 h-6" />
                </div>

                <div className="space-y-1.5 z-10">
                  <h3 className="text-2xl font-extrabold text-[#470085] tracking-tight">
                    {activeCoupon.value ? `₹${activeCoupon.value} Cashback!` : 'Voucher Unlocked'}
                  </h3>
                  <p className="text-xs font-bold text-slate-700">{activeCoupon.title}</p>
                  <p className="text-[11px] text-slate-500 pt-1 leading-relaxed px-2">{activeCoupon.details}</p>
                </div>

                {activeCoupon.couponCode ? (
                  <div className="space-y-2">
                    <div className="bg-white py-2 px-4 rounded-xl border-2 border-dashed border-[#470085]/40 flex justify-between items-center text-xs font-mono font-bold text-[#470085]">
                      <span>{activeCoupon.couponCode}</span>
                      <button
                        onClick={() => handleCopy(activeCoupon.couponCode || '')}
                        className="p-1.5 hover:bg-purple-50 rounded-lg transition-colors cursor-pointer text-[#470085]"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                    {copied && <span className="text-[10px] text-emerald-600 font-bold block animate-bounce">Copied Code!</span>}
                  </div>
                ) : (
                  <span className="text-xs text-emerald-700 font-bold bg-emerald-100/80 py-1.5 px-3 rounded-full border border-emerald-300 inline-block self-center">
                    Credited Instantly to Wallet
                  </span>
                )}
              </div>
            )}
          </div>

          <button
            onClick={() => setActiveCoupon(null)}
            className="w-full h-12 bg-white hover:bg-slate-100 text-[#470085] active:scale-[0.98] font-bold rounded-full transition-all shadow-md cursor-pointer mt-6"
          >
            Done / Scratch More
          </button>
        </div>
      )}
    </div>
  );
}
