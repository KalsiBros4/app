import React, { useState, useEffect } from 'react';
import { Wifi, Battery, Signal } from 'lucide-react';

interface PhoneFrameProps {
  children: React.ReactNode;
  onReset: () => void;
  walletBalance: number;
  upiLiteBalance: number;
}

export default function PhoneFrame({ children }: PhoneFrameProps) {
  const [time, setTime] = useState('09:41 AM');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // safety for 12 AM/PM
      setTime(`${hours}:${minutes} ${ampm}`);
    };
    updateTime();
    const timer = setInterval(updateTime, 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-start text-on-surface select-none font-sans antialiased">
      {/* Main Screen Shell Centered on Desktop, Full screen on Mobile */}
      <div className="w-full max-w-md min-h-screen bg-[#fdf8fd] flex flex-col relative shadow-[0_0_24px_rgba(0,0,0,0.06)] overflow-hidden">
        
        {/* Content Area */}
        <div className="flex-1 flex flex-col relative overflow-y-auto">
          {children}
        </div>

        {/* Home Navigation Indicator Bar */}
        <div className="w-full h-4 bg-[#fdf8fd] flex items-center justify-center shrink-0 border-t border-slate-100">
          <div className="w-28 h-1 bg-slate-300 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}

