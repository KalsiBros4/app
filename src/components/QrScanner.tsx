import React, { useRef, useState, useEffect } from 'react';
import { ArrowLeft, Flashlight, Image, RefreshCw, Sparkles, Check, AlertTriangle, HelpCircle } from 'lucide-react';
import { Contact } from '../types';

interface QrScannerProps {
  contacts: Contact[];
  onScanSuccess: (payee: Contact, presetAmount?: number) => void;
  onBack: () => void;
}

export default function QrScanner({ contacts, onScanSuccess, onBack }: QrScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [permissionState, setPermissionState] = useState<'prompt' | 'granted' | 'denied' | 'unavailable'>('prompt');
  const [flashlightOn, setFlashlightOn] = useState(false);
  const [customUpi, setCustomUpi] = useState('');
  const [selectedSimPayeeId, setSelectedSimPayeeId] = useState('');

  // Request camera stream on mount
  useEffect(() => {
    async function startCamera() {
      try {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          setPermissionState('unavailable');
          return;
        }

        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment', width: { ideal: 640 }, height: { ideal: 640 } }
        });

        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setPermissionState('granted');
      } catch (err) {
        console.warn('Webcam stream could not be loaded (using fallback simulation):', err);
        setPermissionState('denied');
      }
    }

    startCamera();

    return () => {
      // Clean up webcam streams
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Web Audio feedback beep sound synthesized dynamically
  const playBeep = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      oscillator.type = 'sine';
      oscillator.frequency.value = 1046.50; // High C5 beep
      gainNode.gain.setValueAtTime(0.12, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.15);

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.15);
    } catch (e) {
      console.warn('Audio feedback context block:', e);
    }
  };

  const handleSimulateScan = (contact: Contact) => {
    playBeep();
    // Simulate slight scan delay for premium feel
    setTimeout(() => {
      onScanSuccess(contact);
    }, 400);
  };

  const handleCustomUpiSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customUpi.trim()) return;

    playBeep();
    const mockContact: Contact = {
      id: `scanned_custom`,
      name: customUpi.split('@')[0].toUpperCase(),
      phone: 'Scanned UPI Handle Recipient',
      upiId: customUpi.trim(),
      color: '#470085'
    };

    setTimeout(() => {
      onScanSuccess(mockContact);
    }, 450);
  };

  const toggleFlashlight = async () => {
    if (!streamRef.current) return;
    const track = streamRef.current.getVideoTracks()[0];
    if (track) {
      try {
        const capabilities = track.getCapabilities() as any;
        if (capabilities.torch) {
          await (track as any).applyConstraints({
            advanced: [{ torch: !flashlightOn }]
          });
          setFlashlightOn(!flashlightOn);
        } else {
          // Fallback toggle state
          setFlashlightOn(!flashlightOn);
        }
      } catch (err) {
        // Fallback for browsers that do not support torch API
        setFlashlightOn(!flashlightOn);
      }
    }
  };

  return (
    <div className="flex-1 bg-slate-950 text-white flex flex-col justify-between h-full relative font-sans select-none">
      
      {/* Top Header navbar */}
      <header className="bg-slate-900 border-b border-slate-800 text-white px-4 py-4 flex items-center justify-between shadow-md shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-1 hover:bg-white/10 rounded-full transition-colors cursor-pointer">
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div>
            <h2 className="font-extrabold text-base leading-snug">UPI QR Scanner</h2>
            <p className="text-[10px] text-slate-400">Scan any BharatQR standard node</p>
          </div>
        </div>
        <HelpCircle className="w-5 h-5 text-slate-400" />
      </header>

      {/* Main Viewfinder Canvas overlay */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 relative bg-black/90">
        
        {/* Virtual viewfinder box grid */}
        <div className="w-72 h-72 rounded-3xl border-2 border-slate-700 overflow-hidden relative shadow-2xl bg-slate-950">
          
          {/* Laser animated beam */}
          <div className="absolute left-0 right-0 h-0.5 bg-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.8)] z-10 animate-scan-beam" style={{
            animation: 'scan-laser 2.2s infinite ease-in-out'
          }}></div>

          <style>
            {`
              @keyframes scan-laser {
                0% { top: 5%; }
                50% { top: 95%; }
                100% { top: 5%; }
              }
            `}
          </style>

          {/* Corners focus ticks */}
          <div className="absolute top-4 left-4 w-6 h-6 border-t-4 border-l-4 border-purple-500 rounded-tl"></div>
          <div className="absolute top-4 right-4 w-6 h-6 border-t-4 border-r-4 border-purple-500 rounded-tr"></div>
          <div className="absolute bottom-4 left-4 w-6 h-6 border-b-4 border-l-4 border-purple-500 rounded-bl"></div>
          <div className="absolute bottom-4 right-4 w-6 h-6 border-b-4 border-r-4 border-purple-500 rounded-br"></div>

          {/* Core Live Camera Feed video */}
          {permissionState === 'granted' ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover scale-x-[-1]"
            />
          ) : (
            <div className="w-full h-full flex flex-col justify-center items-center p-6 text-center text-slate-400 space-y-3 bg-slate-900/60">
              {permissionState === 'denied' ? (
                <>
                  <AlertTriangle className="w-10 h-10 text-amber-500 animate-pulse" />
                  <h4 className="text-xs font-bold text-white">Camera Access Denied</h4>
                  <p className="text-[10px] text-slate-400 leading-relaxed">
                    Grant camera permission in the browser or use the Smart Simulation controls below.
                  </p>
                </>
              ) : (
                <>
                  <RefreshCw className="w-10 h-10 text-purple-400 animate-spin" />
                  <h4 className="text-xs font-bold text-white">Accessing device lens</h4>
                </>
              )}
            </div>
          )}

          {/* Scan Badge indicator overlay */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/60 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/10 text-[10px] text-purple-300 font-bold uppercase tracking-widest leading-none pointer-events-none">
            ALIGN QR CODE
          </div>
        </div>

        {/* Viewfinder Utilities Controls Overlay */}
        <div className="flex gap-4 mt-5 relative z-10">
          <button
            onClick={toggleFlashlight}
            className={`p-3 rounded-full hover:bg-slate-800 transition-colors cursor-pointer border ${
              flashlightOn ? 'bg-purple-600 text-white border-purple-500' : 'bg-slate-900 text-slate-300 border-slate-800'
            }`}
          >
            <Flashlight className="w-4 h-4" />
          </button>
          
          <button className="p-3 bg-slate-900 hover:bg-slate-800 rounded-full text-slate-300 border border-slate-800 cursor-pointer">
            <Image className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Simulator Payload Pre-filler Sheet Control Panel */}
      <div className="bg-slate-900 border-t border-slate-800 p-4 space-y-4 shrink-0 pb-6 relative z-10 text-left">
        <div className="space-y-1">
          <h3 className="text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 leading-none">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" /> Smart Simulator pre-filler
          </h3>
          <p className="text-[10px] text-slate-400">Pre-fill scanned payee data by choosing a recipient</p>
        </div>

        {/* Saved contact simulator dropdown select */}
        <div className="flex flex-col sm:flex-row gap-2.5">
          <div className="flex-1 flex gap-2">
            <select
              value={selectedSimPayeeId}
              onChange={(e) => setSelectedSimPayeeId(e.target.value)}
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 text-xs text-slate-200 focus:border-purple-500 focus:outline-none select-none h-11"
            >
              <option value="" className="text-slate-500">Pick saved contact...</option>
              {contacts.map((c) => (
                <option key={c.id} value={c.id} className="text-slate-200">
                  {c.name} ({c.upiId})
                </option>
              ))}
            </select>

            <button
              onClick={() => {
                const payee = contacts.find((c) => c.id === selectedSimPayeeId);
                if (payee) handleSimulateScan(payee);
              }}
              disabled={!selectedSimPayeeId}
              className={`px-4 font-bold text-xs h-11 rounded-xl transition-all cursor-pointer ${
                selectedSimPayeeId 
                  ? 'bg-purple-600 hover:bg-purple-500 text-white' 
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/50'
              }`}
            >
              Simulate QR Recognition
            </button>
          </div>
        </div>

        {/* Custom manual UPI payload input */}
        <form onSubmit={handleCustomUpiSubmit} className="flex gap-2">
          <input
            type="text"
            value={customUpi}
            onChange={(e) => setCustomUpi(e.target.value)}
            placeholder="Validate raw merchant UPI (e.g. store@okaxis)"
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 text-xs text-slate-100 placeholder:text-slate-600 focus:border-purple-500 outline-none h-11"
          />
          <button
            type="submit"
            className="px-4 bg-slate-800 border border-slate-700 hover:bg-slate-700 text-purple-300 font-bold text-xs rounded-xl transition-all cursor-pointer h-11 flex items-center justify-center gap-1.5"
          >
            <Check className="w-3.5 h-3.5" /> Direct Pay
          </button>
        </form>
      </div>

    </div>
  );
}
