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
  onReplenishAllBalances
}: DashboardProps) {
  const [selectedLocation, setSelectedLocation] = useState('Home');
  const [showLocationMenu, setShowLocationMenu] = useState(false);

  const locations = ['Home', 'Office', 'Current Location', 'Delhi NCR', 'Silicon Valley'];

  return (
    <div className="flex-1 bg-[#fdf8fd] flex flex-col pb-16 relative">
      {/* Dynamic Header */}
      <header className="bg-[#470085] px-4 pt-4 pb-3 flex items-center justify-between text-white shrink-0 sticky top-0 z-40 shadow-md">
        <div className="flex items-center gap-2">
          {/* Avatar holding Initials */}
          <div className="w-9 h-9 rounded-full bg-purple-300 text-purple-900 font-extrabold flex items-center justify-center text-xs border border-purple-400">
            AS
          </div>
          <div className="relative">
            <button 
              onClick={() => setShowLocationMenu(!showLocationMenu)}
              className="flex items-center gap-1 text-[11px] text-purple-200 hover:text-white cursor-pointer"
            >
              <span>{selectedLocation}</span>
              <ChevronDown className="w-3 h-3" />
            </button>
            <h1 className="font-extrabold text-sm tracking-tight text-white leading-tight">Avneet Singh</h1>

            {/* Location selector dropdown */}
            {showLocationMenu && (
              <div className="absolute left-0 mt-2 w-40 bg-white rounded-xl shadow-lg border border-slate-100 text-slate-800 z-50 overflow-hidden divide-y divide-slate-100 py-1">
                {locations.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => {
                      setSelectedLocation(loc);
                      setShowLocationMenu(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs font-semibold hover:bg-slate-50 block transition-colors ${
                      selectedLocation === loc ? 'text-[#470085] bg-purple-50' : 'text-slate-700'
                    }`}
                  >
                    {loc}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Action Header Icons */}
        <div className="flex items-center gap-2.5">
          <button 
            onClick={() => onNavigate('qr_scan')}
            className="p-1.5 hover:bg-white/10 rounded-full transition-colors cursor-pointer text-white"
          >
            <Scan className="w-5 h-5" />
          </button>
          <div className="relative">
            <button className="p-1.5 hover:bg-white/10 rounded-full transition-colors cursor-pointer">
              <Bell className="w-5 h-5" />
            </button>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full"></span>
          </div>
          <button className="p-1.5 hover:bg-white/10 rounded-full transition-colors cursor-pointer text-white">
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

      {/* Sandbox Replenish Balance */}
      <div className="px-3 pb-3">
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-2xl p-4 flex items-center justify-between text-white shadow-[0_4px_12px_rgba(16,185,129,0.15)] relative overflow-hidden border border-emerald-500/20">
          <div className="absolute -right-8 -bottom-8 opacity-10 text-white transform rotate-12 pointer-events-none">
            <Sparkles className="w-24 h-24" />
          </div>
          <div className="z-10 pr-2">
            <h4 className="font-extrabold text-xs tracking-wider uppercase text-emerald-100 flex items-center gap-1.5 leading-none">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" /> BALANCE REFILL
            </h4>
            <p className="text-[10px] text-white/95 leading-normal mt-1.5 font-medium">
              Want more money? Top up ₹10k Wallet, ₹2k Lite, &amp; ₹50k Banks.
            </p>
          </div>
          <button
            onClick={() => {
              onReplenishAllBalances();
            }}
            className="z-10 shrink-0 bg-white hover:bg-emerald-50 active:scale-95 text-emerald-800 font-extrabold text-xs px-4 py-2 rounded-xl transition-all shadow-md cursor-pointer ml-1"
          >
            Refill All
          </button>
        </div>
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
    </div>
  );
}
