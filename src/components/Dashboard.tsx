import React, { useState } from 'react';
import { 
  Scan, Bell, HelpCircle, ChevronDown, Sparkles, Send, 
  ArrowLeftRight, CheckSquare, Zap, Wallet, Gift, Phone,
  Tv, Lightbulb, CreditCard, Home, Percent, Landmark, ShieldCheck, Car, Flame, ArrowUpRight
} from 'lucide-react';
import { Contact, BankAccount, Transaction, BillCategory } from '../types';

interface DashboardProps {
  contacts: Contact[];
  bankAccounts: BankAccount[];
  walletBalance: number;
  upiLiteBalance: number;
  onNavigate: (screen: string) => void;
  onSelectContact: (contact: Contact) => void;
  onSelectBill: (category: BillCategory) => void;
  onCheckBalance: () => void;
  onAddWallet: () => void;
  onViewRewards: () => void;
  onReplenishAllBalances: () => void;
  onReset?: () => void;
}

export default function Dashboard({
  contacts,
  bankAccounts,
  walletBalance,
  upiLiteBalance,
  onNavigate,
  onSelectContact,
  onSelectBill,
  onCheckBalance,
  onAddWallet,
  onViewRewards,
  onReplenishAllBalances,
  onReset
}: DashboardProps) {
  const [selectedLocation, setSelectedLocation] = useState('Home');
  const [showLocationMenu, setShowLocationMenu] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [isResetBusy, setIsResetBusy] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);

  const locations = ['Home', 'Office', 'Current Location', 'Delhi NCR', 'Silicon Valley'];
  
  const locationDetails: Record<string, string> = {
    'Home': 'Koramangala, Bengaluru',
    'Office': 'Sector 62, Noida, NCR',
    'Current Location': 'Connaught Place, New Delhi',
    'Delhi NCR': 'Gurugram, Haryana',
    'Silicon Valley': 'Palo Alto, California'
  };

  return (
    <div className="flex-1 bg-[#fdf8fd] flex flex-col pb-16 relative">
      {/* Dynamic Header */}
      <header className="bg-[#470085] px-4 pt-4 pb-3 flex items-center justify-between text-white shrink-0 sticky top-0 z-40 shadow-md">
        <div className="flex items-center gap-2 select-none text-left p-1 rounded-xl">
          {/* Avatar holding Initials */}
          <div className="w-9 h-9 rounded-full bg-purple-300 text-purple-900 font-extrabold flex items-center justify-center text-xs border border-purple-400 shrink-0 select-none">
            AS
          </div>
          <div className="relative">
            <h1 className="font-extrabold text-base tracking-widest text-white uppercase leading-none selection:bg-transparent">YPay</h1>
            <p className="text-[8px] text-purple-200 mt-1 font-semibold opacity-75 uppercase tracking-wide leading-none select-none selection:bg-transparent">NPCI Secured</p>
          </div>
        </div>

        {/* Action Header Icons */}
        <div className="flex items-center gap-2.5">
          <button 
            onClick={() => onNavigate('qr_scan')}
            className="p-1.5 hover:bg-white/10 rounded-full transition-colors cursor-pointer text-white animate-haptic-press"
          >
            <Scan className="w-5 h-5" />
          </button>
          <div className="relative">
            <button className="p-1.5 hover:bg-white/10 rounded-full transition-colors cursor-pointer">
              <Bell className="w-5 h-5" />
            </button>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full"></span>
          </div>
          <button 
            onClick={() => setShowHelpModal(true)}
            className="p-1.5 hover:bg-white/10 rounded-full transition-colors cursor-pointer text-white btn-mobile-haptic active:animate-haptic-press"
          >
            <HelpCircle className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Hero promo area QR */}
      <div className="p-3">
        <button
          onClick={() => onNavigate('qr_scan')}
          className="w-full bg-[#f7f2f8] hover:bg-[#ebe7ec]/80 active:scale-[0.99] rounded-2xl p-4 flex items-center justify-between text-left transition-all border border-purple-200/20 shadow-[0_4px_12px_rgba(0,0,0,0.03)] cursor-pointer"
        >
          <div className="w-2/3">
            <h3 className="font-extrabold text-[#470085] text-sm">Scan &amp; Pay Any QR</h3>
            <p className="text-[11px] text-slate-500 leading-snug mt-1">Instant, secure, and hassle-free payments everywhere.</p>
          </div>
          {/* Mock QR SVG frame decoration */}
          <div className="w-14 h-14 bg-gradient-to-tr from-purple-100 to-white rounded-xl border border-purple-200 flex items-center justify-center text-[#470085] shadow-inner font-mono text-[9px] font-bold text-center">
            QR CODE
          </div>
        </button>
      </div>



      {/* Transfer money sections */}
      <section className="px-3 py-1">
        <div className="bg-white rounded-2xl p-4 border border-slate-200/60 shadow-[0_4px_12px_rgba(0,0,0,0.02)] space-y-4">
          <h3 className="font-extrabold text-slate-800 text-sm pl-1">Transfer Money</h3>
          
          <div className="grid grid-cols-4 gap-1 text-center">
            <button
              onClick={() => onNavigate('contact_select')}
              className="flex flex-col items-center gap-1.5 hover:scale-105 active:scale-95 transition-all text-slate-700 font-semibold cursor-pointer"
            >
              <div className="w-12 h-12 bg-purple-100/50 hover:bg-purple-100 rounded-full flex items-center justify-center text-[#470085] shadow-sm transition-colors border border-purple-200/10">
                <Send className="w-5 h-5 fill-[#470085]" />
              </div>
              <span className="text-[10px] leading-tight font-extrabold text-slate-500">To Mobile<br />Number</span>
            </button>

            <button
              onClick={() => onNavigate('contact_select')}
              className="flex flex-col items-center gap-1.5 hover:scale-105 active:scale-95 transition-all text-slate-700 font-semibold cursor-pointer"
            >
              <div className="w-12 h-12 bg-purple-100/50 hover:bg-purple-100 rounded-full flex items-center justify-center text-[#470085] shadow-sm transition-colors border border-purple-200/10">
                <Landmark className="w-5 h-5" />
              </div>
              <span className="text-[10px] leading-tight font-extrabold text-slate-500">To Bank /<br />UPI ID</span>
            </button>

            <button
              onClick={() => onNavigate('contact_select')} // dynamic self bank transfer
              className="flex flex-col items-center gap-1.5 hover:scale-105 active:scale-95 transition-all text-slate-700 font-semibold cursor-pointer"
            >
              <div className="w-12 h-12 bg-purple-100/50 hover:bg-purple-100 rounded-full flex items-center justify-center text-[#470085] shadow-sm transition-colors border border-purple-200/10">
                <ArrowLeftRight className="w-5 h-5" />
              </div>
              <span className="text-[10px] leading-tight font-extrabold text-slate-500">To Self<br />Account</span>
            </button>

            <button
              onClick={onCheckBalance}
              className="flex flex-col items-center gap-1.5 hover:scale-105 active:scale-95 transition-all text-slate-700 font-semibold cursor-pointer"
            >
              <div className="w-12 h-12 bg-purple-100/50 hover:bg-purple-100 rounded-full flex items-center justify-center text-[#470085] shadow-sm transition-colors border border-purple-200/10">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="text-[10px] leading-tight font-extrabold text-slate-500">Check<br />Balance</span>
            </button>
          </div>
        </div>
      </section>

      {/* Horizontal actions chips for Wallet, Rewards, Lite */}
      <section className="px-3 py-2">
        <div className="flex gap-2 overflow-x-auto no-scrollbar scroll-smooth">
          {/* UPI Lite */}
          <button 
            onClick={onAddWallet}
            className="flex-1 min-w-[130px] bg-blue-50 border border-blue-100 hover:bg-blue-100/60 rounded-xl p-3 flex items-center gap-2 shadow-sm transition-colors text-left cursor-pointer"
          >
            <Zap className="w-4 h-4 text-blue-600 fill-blue-600 shrink-0" />
            <div>
              <h4 className="text-[10px] font-extrabold text-[#0061a4] leading-tight">UPI Lite</h4>
              <p className="text-[9px] text-blue-500 leading-none mt-1">₹{upiLiteBalance.toFixed(2)} Enable</p>
            </div>
          </button>

          {/* Wallet */}
          <button 
            onClick={onAddWallet}
            className="flex-1 min-w-[130px] bg-purple-50 border border-purple-100 hover:bg-purple-100/60 rounded-xl p-3 flex items-center gap-2 shadow-sm transition-colors text-left cursor-pointer"
          >
            <Wallet className="w-4 h-4 text-[#470085] shrink-0" />
            <div>
              <h4 className="text-[10px] font-extrabold text-[#470085] leading-tight">Wallet</h4>
              <p className="text-[9px] text-purple-500 leading-none mt-1">₹{walletBalance.toFixed(2)} Top Up</p>
            </div>
          </button>

          {/* Rewards */}
          <button 
            onClick={onViewRewards}
            className="flex-1 min-w-[130px] bg-emerald-50 border border-emerald-100 hover:bg-emerald-100/60 rounded-xl p-3 flex items-center gap-2 shadow-sm transition-colors text-left cursor-pointer"
          >
            <Gift className="w-4 h-4 text-emerald-600 shrink-0" />
            <div>
              <h4 className="text-[10px] font-extrabold text-emerald-700 leading-tight">Rewards</h4>
              <p className="text-[9px] text-emerald-600 leading-none mt-1">Scratch Cards</p>
            </div>
          </button>
        </div>
      </section>

      {/* Bill & Recharge category */}
      <section className="px-3 py-1">
        <div className="bg-white rounded-2xl p-4 border border-slate-200/60 shadow-[0_4px_12px_rgba(0,0,0,0.02)] space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-extrabold text-slate-800 text-sm pl-1">Recharge &amp; Pay Bills</h3>
            <button 
              onClick={() => onSelectBill('mobile')}
              className="text-[#470085] hover:text-[#5f259f] text-[10px] font-extrabold bg-purple-100 hover:bg-purple-200/60 px-3 py-1 rounded-full transition-colors cursor-pointer"
            >
              See All
            </button>
          </div>

          <div className="grid grid-cols-4 gap-y-4 gap-x-1 text-center">
            <button onClick={() => onSelectBill('mobile')} className="flex flex-col items-center gap-1.5 cursor-pointer hover:scale-105 transition-transform">
              <div className="w-11 h-11 bg-slate-50 hover:bg-purple-50 text-slate-700 hover:text-[#470085] border border-slate-100 rounded-full flex items-center justify-center transition-colors shadow-sm">
                <Phone className="w-4.5 h-4.5" />
              </div>
              <span className="text-[9px] leading-tight font-extrabold text-[#4b4452]">Mobile<br />Recharge</span>
            </button>

            <button onClick={() => onSelectBill('dth')} className="flex flex-col items-center gap-1.5 cursor-pointer hover:scale-105 transition-transform">
              <div className="w-11 h-11 bg-slate-50 hover:bg-purple-50 text-slate-700 hover:text-[#470085] border border-slate-100 rounded-full flex items-center justify-center transition-colors shadow-sm">
                <Tv className="w-4.5 h-4.5" />
              </div>
              <span className="text-[9px] leading-tight font-extrabold text-[#4b4452]">DTH<br />Subscriber</span>
            </button>

            <button onClick={() => onSelectBill('electricity')} className="flex flex-col items-center gap-1.5 cursor-pointer hover:scale-105 transition-transform">
              <div className="w-11 h-11 bg-slate-50 hover:bg-purple-50 text-slate-700 hover:text-[#470085] border border-slate-100 rounded-full flex items-center justify-center transition-colors shadow-sm">
                <Lightbulb className="w-4.5 h-4.5" />
              </div>
              <span className="text-[9px] leading-tight font-extrabold text-[#4b4452]">Electricity<br />Electricity</span>
            </button>

            <button onClick={() => onSelectBill('creditcard')} className="flex flex-col items-center gap-1.5 cursor-pointer hover:scale-105 transition-transform">
              <div className="w-11 h-11 bg-slate-50 hover:bg-purple-50 text-slate-700 hover:text-[#470085] border border-slate-100 rounded-full flex items-center justify-center transition-colors shadow-sm">
                <CreditCard className="w-4.5 h-4.5" />
              </div>
              <span className="text-[9px] leading-tight font-extrabold text-[#4b4452]">Credit Card<br />Payment</span>
            </button>

            <button onClick={() => onSelectBill('rent')} className="flex flex-col items-center gap-1.5 cursor-pointer hover:scale-105 transition-transform">
              <div className="w-11 h-11 bg-slate-50 hover:bg-purple-50 text-slate-700 hover:text-[#470085] border border-slate-100 rounded-full flex items-center justify-center transition-colors shadow-sm">
                <Home className="w-4.5 h-4.5" />
              </div>
              <span className="text-[9px] leading-tight font-extrabold text-[#4b4452]">Rent<br />Transfer</span>
            </button>

            <button onClick={() => onSelectBill('loan')} className="flex flex-col items-center gap-1.5 cursor-pointer hover:scale-105 transition-transform">
              <div className="w-11 h-11 bg-slate-50 hover:bg-purple-50 text-slate-700 hover:text-[#470085] border border-slate-100 rounded-full flex items-center justify-center transition-colors shadow-sm">
                <CheckSquare className="w-4.5 h-4.5" />
              </div>
              <span className="text-[9px] leading-tight font-extrabold text-[#4b4452]">Loan<br />Repay</span>
            </button>

            <button onClick={() => onSelectBill('fastag')} className="flex flex-col items-center gap-1.5 cursor-pointer hover:scale-105 transition-transform">
              <div className="w-11 h-11 bg-slate-50 hover:bg-purple-50 text-slate-700 hover:text-[#470085] border border-slate-100 rounded-full flex items-center justify-center transition-colors shadow-sm">
                <Car className="w-4.5 h-4.5" />
              </div>
              <span className="text-[9px] leading-tight font-extrabold text-[#4b4452]">FASTag<br />Recharge</span>
            </button>

            <button onClick={() => onSelectBill('gas')} className="flex flex-col items-center gap-1.5 cursor-pointer hover:scale-105 transition-transform">
              <div className="w-11 h-11 bg-slate-50 hover:bg-purple-50 text-slate-700 hover:text-[#470085] border border-slate-100 rounded-full flex items-center justify-center transition-colors shadow-sm">
                <Flame className="w-4.5 h-4.5 animate-pulse text-amber-500" />
              </div>
              <span className="text-[9px] leading-tight font-extrabold text-[#4b4452]">Book LPG<br />Cylinder</span>
            </button>
          </div>
        </div>
      </section>

      {/* Global Bottom persist tabs navigation */}
      <nav className="absolute bottom-0 inset-x-0 h-16 bg-white border-t border-slate-100 shadow-[0_-4px_16px_rgba(0,0,0,0.03)] flex justify-around items-center px-1 z-35">
        <button 
          onClick={() => onNavigate('dashboard')}
          className="flex flex-col items-center justify-center hover:bg-purple-50/50 w-16 h-full rounded-xl transition-all cursor-pointer text-[#470085] font-extrabold"
        >
          <Home className="w-5 h-5 fill-[#470085]" />
          <span className="text-[10px] mt-0.5">Home</span>
        </button>

        <button 
          onClick={() => onNavigate('contact_select')}
          className="flex flex-col items-center justify-center hover:bg-purple-50/50 w-16 h-full rounded-xl transition-all cursor-pointer text-slate-500"
        >
          <Scan className="w-5 h-5" />
          <span className="text-[10px] mt-0.5 font-bold">Scan</span>
        </button>

        <button 
          onClick={() => onNavigate('history')}
          className="flex flex-col items-center justify-center hover:bg-purple-50/50 w-16 h-full rounded-xl transition-all cursor-pointer text-slate-500"
        >
          <ArrowLeftRight className="w-5 h-5" />
          <span className="text-[10px] mt-0.5 font-bold">History</span>
        </button>
      </nav>

      {/* Custom Reboot Confirmation Modal (No browser alerts!) */}
      {showResetConfirm && (
        <div className="absolute inset-x-0 bottom-0 top-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-[90] animate-fade-in">
          <div className="bg-white rounded-3xl w-full max-w-xs p-5 shadow-2xl border border-purple-50 text-center animate-haptic-press">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600 mx-auto mb-3">
              <Zap className="w-6 h-6 fill-red-600 stroke-[2]" />
            </div>
            
            <h3 className="font-extrabold text-slate-800 text-sm">Reboot App State?</h3>
            <p className="text-[10.5px] text-slate-500 mt-2 mb-4 leading-normal">
              This will wipe all local transaction logs, restore default bank balances (e.g., ₹24.5k to HDFC Bank •••• 4892), and completely reboot the application back to pristine defaults.
            </p>

            <div className="space-y-2">
              <button
                disabled={isResetBusy}
                onClick={() => {
                  setIsResetBusy(true);
                  setTimeout(() => {
                    if (onReset) onReset();
                    setIsResetBusy(false);
                    setShowResetConfirm(false);
                    setShowHelpModal(false);
                  }, 800);
                }}
                className="w-full bg-red-600 hover:bg-red-500 text-white font-extrabold text-xs py-2.5 rounded-full shadow-md cursor-pointer transition-all btn-mobile-haptic active:animate-haptic-press flex items-center justify-center gap-1"
              >
                {isResetBusy ? (
                  <>
                    <svg className="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Rebooting...
                  </>
                ) : (
                  'Yes, Reboot Now'
                )}
              </button>

              <button
                disabled={isResetBusy}
                onClick={() => setShowResetConfirm(false)}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs py-2.5 rounded-full cursor-pointer transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Help & Support Custom Bottom Modal Popup */}
      {showHelpModal && (
        <>
          {/* Backdrop */}
          <div 
            onClick={() => setShowHelpModal(false)}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs z-[70] transition-opacity duration-300 animate-fade-in"
          ></div>

          {/* Bottom Sheet Modal Container */}
          <div className="absolute bottom-0 inset-x-0 bg-white rounded-t-[2.5rem] shadow-2xl z-[80] p-5 pb-8 flex flex-col border-t border-purple-100/50 max-h-[90%] overflow-y-auto no-scrollbar animate-elastic-grow select-none">
            {/* Top header drag indicator or line */}
            <div className="w-10 h-1 bg-slate-200 rounded-full mx-auto mb-4"></div>

            {/* Title */}
            <div className="flex justify-between items-center mb-3">
              <div>
                <h2 className="text-[17px] font-extrabold text-[#470085]">Help, Support &amp; Sandbox</h2>
                <p className="text-[10px] text-slate-400 font-medium">Configure sandbox resources or raise a support queries</p>
              </div>
              <button 
                onClick={() => setShowHelpModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 font-bold flex items-center justify-center cursor-pointer transition-colors"
                type="button"
              >
                ✕
              </button>
            </div>

            {/* Sandbox Developer Controls - High Vis */}
            <div className="bg-purple-50/70 border border-purple-100/80 rounded-3xl p-4.5 mb-4">
              <h4 className="font-extrabold text-[10px] text-purple-700 tracking-wider uppercase mb-3 flex items-center gap-1.5 leading-none">
                <Sparkles className="w-3.5 h-3.5 text-purple-600 animate-pulse" /> Sandbox Quick Actions
              </h4>

              <div className="grid grid-cols-2 gap-3">
                {/* Balance Refill */}
                <div className="bg-white rounded-2xl p-3 shadow-xs border border-purple-100 flex flex-col justify-between">
                  <div>
                    <span className="font-extrabold text-[11px] text-slate-700 block leading-tight">Refill Balances</span>
                    <span className="text-[9px] text-slate-400 leading-normal block mt-1">Refills wallet &amp; banks with ₹62k.</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      onReplenishAllBalances();
                      // flash a quick confirmation or close
                      setShowHelpModal(false);
                    }}
                    className="w-full bg-emerald-600 text-white font-extrabold text-[10px] py-1.5 rounded-xl text-center mt-3 cursor-pointer active:scale-95 transition-transform"
                  >
                    Refill ₹62,000
                  </button>
                </div>

                {/* Reboot Engine */}
                <div className="bg-white rounded-2xl p-3 shadow-xs border border-purple-100 flex flex-col justify-between">
                  <div>
                    <span className="font-extrabold text-[11px] text-slate-700 block leading-tight">Reboot App</span>
                    <span className="text-[9px] text-slate-400 leading-normal block mt-1">Wipes all custom transaction logs.</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowResetConfirm(true)}
                    className="w-full bg-red-600 text-white font-extrabold text-[10px] py-1.5 rounded-xl text-center mt-3 cursor-pointer active:scale-95 transition-transform"
                  >
                    Reboot Engine
                  </button>
                </div>
              </div>
            </div>

            {/* Standard Help Links */}
            <div className="space-y-2">
              <h4 className="font-extrabold text-[10px] text-slate-400 tracking-wider uppercase pl-1 mb-1">Standard Support Topics</h4>

              <button className="w-full flex items-center gap-3.5 p-3 rounded-2xl bg-slate-50 hover:bg-purple-50/60 border border-slate-100 transition-colors text-left cursor-pointer">
                <span className="w-9 h-9 rounded-xl bg-[#eedeed] text-[#470085] flex items-center justify-center font-bold">ℹ️</span>
                <div className="flex-1">
                  <div className="text-xs font-extrabold text-slate-800 leading-none">FAQs &amp; User Manual</div>
                  <div className="text-[10px] text-slate-400 mt-1 leading-none">Find answers to common transaction queries</div>
                </div>
              </button>

              <button className="w-full flex items-center gap-3.5 p-3 rounded-2xl bg-slate-50 hover:bg-purple-50/60 border border-slate-100 transition-colors text-left cursor-pointer">
                <span className="w-9 h-9 rounded-xl bg-[#eedeed] text-[#470085] flex items-center justify-center font-bold">💬</span>
                <div className="flex-1">
                  <div className="text-xs font-extrabold text-slate-800 leading-none">Raise Support Ticket</div>
                  <div className="text-[10px] text-slate-400 mt-1 leading-none">Get live help with active transaction disputes</div>
                </div>
              </button>

              <button className="w-full flex items-center gap-3.5 p-3 rounded-2xl bg-slate-50 hover:bg-purple-50/60 border border-slate-100 transition-colors text-left cursor-pointer">
                <span className="w-9 h-9 rounded-xl bg-[#eedeed] text-[#470085] flex items-center justify-center font-bold">📞</span>
                <div className="flex-1">
                  <div className="text-xs font-extrabold text-slate-800 leading-none">Contact Helpline Support</div>
                  <div className="text-[10px] text-slate-400 mt-1 leading-none">Speak directly with our digital care desk</div>
                </div>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
