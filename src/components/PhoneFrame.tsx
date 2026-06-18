import React, { useState, useEffect } from 'react';
import { Wifi, Battery, Signal, Smartphone, PanelRightOpen, RefreshCw, Sparkles } from 'lucide-react';

interface PhoneFrameProps {
  children: React.ReactNode;
  onReset: () => void;
  walletBalance: number;
  upiLiteBalance: number;
}

export default function PhoneFrame({ children, onReset, walletBalance, upiLiteBalance }: PhoneFrameProps) {
  const [time, setTime] = useState('09:41');
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // safety for 0
      setTime(`${hours}:${minutes} ${ampm}`);
    };
    updateTime();
    const timer = setInterval(updateTime, 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col xl:flex-row items-center justify-center p-3 sm:p-6 text-on-surface select-none font-sans overflow-x-hidden antialiased">
      
      {/* Background Ambience decoration */}
      <div className="absolute top-10 left-10 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Simulator Control Panel (Side-bar) */}
      <div className="w-full xl:w-80 bg-slate-800/80 backdrop-blur-md p-5 rounded-2xl border border-slate-700/50 shadow-xl mb-6 xl:mb-0 xl:mr-6 shrink-0 self-stretch flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-purple-600 rounded-lg text-white">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h1 className="font-bold text-white text-lg leading-tight">YPay Workspace</h1>
              <p className="text-xs text-slate-400">High-Fidelity UPI Simulator</p>
            </div>
          </div>

          <div className="space-y-4 text-xs text-slate-300">
            <div className="p-3 bg-slate-900/50 rounded-xl space-y-2 border border-slate-800">
              <div className="flex justify-between items-center text-slate-400">
                <span>Wallet Balance</span>
                <span className="font-semibold text-emerald-400">₹{walletBalance.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-slate-400">
                <span>UPI Lite Status</span>
                <span className="font-semibold text-blue-400">₹{upiLiteBalance.toFixed(2)}</span>
              </div>
            </div>

            <div className="space-y-2.5">
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Features Implemented</p>
              <ul className="space-y-1.5 list-disc list-inside text-slate-300">
                <li>Dynamic Contact Search & Creation</li>
                <li>HPT Keypad Money Transfers</li>
                <li>Incremental Wallet Loading</li>
                <li>Live Cash Scratch Coupons</li>
                <li>Flexible Bank Selector Sheets</li>
                <li>Sequential UPI Pin Validations</li>
                <li>Dynamic Transaction Receipts</li>
                <li>Custom Instant Bill Payments</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-700/50 space-y-2">
          <button
            onClick={() => setIsFullScreen(!isFullScreen)}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-700 hover:bg-slate-600 active:scale-[0.98] text-white rounded-xl text-xs font-semibold cursor-pointer transition-all border border-slate-600/50"
          >
            <Smartphone className="w-4 h-4" />
            {isFullScreen ? 'Switch to Smartphone Bezel' : 'Expanded Screen Mode'}
          </button>
          
          <button
            onClick={onReset}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-purple-600/20 hover:bg-purple-600/35 active:scale-[0.98] text-purple-300 rounded-xl text-xs font-semibold cursor-pointer transition-all border border-purple-500/35"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reset Simulator Database
          </button>
        </div>
      </div>

      {/* Main Smartphone Screen Shell */}
      <div
        className={`relative transition-all duration-500 flex flex-col justify-between ${
          isFullScreen
            ? 'w-full max-w-lg aspect-[9/19.5] sm:min-h-[850px] bg-slate-950 rounded-2xl border border-slate-800'
            : 'w-full max-w-[420px] aspect-[9/19.5] bg-neutral-950 sm:p-2 rounded-[42px] sm:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] border-[6px] border-slate-800 relative'
        }`}
      >
        {/* Notch / Speaker bar only in phone bezel mode */}
        {!isFullScreen && (
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-50 flex items-center justify-center">
            {/* Dynamic island / Speaker slot */}
            <div className="w-10 h-1 bg-neutral-800 rounded-full mb-1"></div>
            <div className="w-2.5 h-2.5 bg-neutral-900 rounded-full border border-neutral-800 ml-4 mb-1"></div>
          </div>
        )}

        {/* Dynamic Hardware Status Bar inside phone screen */}
        <div className="relative flex-1 rounded-[32px] sm:rounded-[36px] overflow-hidden bg-[#fdf8fd] flex flex-col text-on-surface shadow-inner">
          <div className="px-5 pt-3 pb-1 flex items-center justify-between text-white bg-[#470085] text-xs font-medium relative select-none">
            {/* Clock */}
            <span>{time}</span>
            {/* Cellular/WiFi/Battery Right cluster */}
            <div className="flex items-center gap-1.5 z-10">
              <Signal className="w-3.5 h-3.5 stroke-[2.5]" />
              <div className="text-[10px] bg-white/20 px-1 rounded-sm">5G</div>
              <Wifi className="w-3.5 h-3.5" />
              <Battery className="w-4 h-4 fill-white" />
            </div>
          </div>

          {/* Child content representing individual screens */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col relative bg-[#fdf8fd]">
            {children}
          </div>

          {/* iOS-Style Home Indicator Bar at bottom */}
          <div className="w-full h-5 bg-[#fdf8fd] dark:bg-slate-900/40 relative flex items-center justify-center shrink-0">
            <div className="w-32 h-1 bg-neutral-400 rounded-full self-center"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
