import React, { useState } from 'react';
import { ArrowLeft, Send, Zap, HelpCircle } from 'lucide-react';
import { BillCategory } from '../types';

interface BillRechargeFormProps {
  category: BillCategory;
  onBack: () => void;
  onSubmit: (title: string, amount: number, note: string) => void;
}

export default function BillRechargeForm({ category, onBack, onSubmit }: BillRechargeFormProps) {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');
  const [operator, setOperator] = useState('');

  const getCategoryDetails = () => {
    switch (category) {
      case 'mobile':
        return {
          title: 'Mobile Recharge',
          label: 'Mobile Number',
          placeholder: 'Enter 10-digit number',
          operators: ['Jio 5G', 'Airtel India', 'VI Speed', 'BSNL Rural'],
          notes: 'Standard 1.5GB/day recharge plans range starting ₹239'
        };
      case 'dth':
        return {
          title: 'DTH Recharge',
          label: 'Subscriber ID',
          placeholder: 'Enter 11-digit subscription code',
          operators: ['Tata Play', 'Airtel Digital TV', 'Dish TV', 'Sun Direct'],
          notes: 'Monthly starter packs range from ₹290 to ₹490'
        };
      case 'electricity':
        return {
          title: 'Electricity Bill',
          label: 'Consumer Account Number',
          placeholder: 'Enter 12-digit consumer ID',
          operators: ['BESCOM (Urban)', 'Adani Power', 'BSES Rajdhani', 'MSEDCL'],
          notes: 'Dynamic bill auto-fetched upon validating consumer node'
        };
      case 'creditcard':
        return {
          title: 'Credit Card Bill',
          label: 'Credit Card Card Number',
          placeholder: 'Enter 16-digit card number',
          operators: ['HDFC Visa Classic', 'SBI MasterCard', 'ICICI Amex Black', 'Axis Neo'],
          notes: 'Validate billing statement. Bank updates within 1 hour.'
        };
      case 'rent':
        return {
          title: 'Rent Payments',
          label: 'Landlord Bank Node / UPI',
          placeholder: 'Enter landord UPI id (e.g. sharma@okaxis)',
          operators: ['Residential Unit Rent', 'Commercial Office Sp.', 'Co-working Seat Rent'],
          notes: 'YPay insures transfer. Legal rent slips auto-compiled.'
        };
      case 'loan':
        return {
          title: 'Loan Repayments',
          label: 'Loan Account Number / ID',
          placeholder: 'Enter HDFC-LN or SBI-LN id',
          operators: ['Housing Finance EMI', 'Education Loan Repay', 'Car Loan Facility', 'Gold Scheme Loan'],
          notes: 'Avoid overdue penalties. Credit reports updated instantly.'
        };
      case 'fastag':
        return {
          title: 'FASTag Recharge',
          label: 'Vehicle Registration Number',
          placeholder: 'Enter vehicle plate (e.g. KA-03-MY-8849)',
          operators: ['Paytm FASTag Provider', 'HDFC Highway Plaza', 'SBI NETC Tollway', 'ICICI Tollgate Tag'],
          notes: 'Instant tollway balance deployment is activated'
        };
      case 'gas':
        return {
          title: 'Gas Cylinder Booking',
          label: 'Consumer Registry Number',
          placeholder: 'Enter 17-digit LPG client code',
          operators: ['Indane Gas Cylinders', 'Bharat Petroleum Gas', 'HP Gas Service'],
          notes: 'Standard cylinders are heavily subsidized. Base rate ₹803.'
        };
    }
  };

  const details = getCategoryDetails();

  const handleAction = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!inputValue.trim()) {
      setError(`Please enter a valid ${details.label}`);
      return;
    }

    if (!operator) {
      setError('Please select a service provider to continue');
      return;
    }

    // Standard high-fidelity mock amounts mimicking billing engines
    let mockAmount = 500;
    if (category === 'electricity') mockAmount = 1840;
    if (category === 'gas') mockAmount = 803;
    if (category === 'mobile') mockAmount = 299;
    if (category === 'dth') mockAmount = 450;
    if (category === 'rent') mockAmount = 14500;
    if (category === 'loan') mockAmount = 7500;
    if (category === 'creditcard') mockAmount = 1250;
    if (category === 'fastag') mockAmount = 350;

    onSubmit(
      `${details.title} (${operator})`,
      mockAmount,
      `Bill reference: ${inputValue}`
    );
  };

  return (
    <div className="flex-1 bg-[#fdf8fd] flex flex-col">
      {/* Header */}
      <div className="bg-[#470085] text-white px-4 py-4 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-1 hover:bg-white/10 rounded-full transition-colors cursor-pointer">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="font-bold text-base">{details.title}</h2>
            <p className="text-[10px] text-white/70">Bharat Bill Payment System Node</p>
          </div>
        </div>
        <HelpCircle className="w-5 h-5 text-white/80" />
      </div>

      {/* Main Flow Content */}
      <form onSubmit={handleAction} className="p-4 flex-1 flex flex-col justify-between">
        <div className="space-y-5">
          {/* Operator Selector with beautiful grids */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              Select Operator / Provider
            </label>
            <div className="grid grid-cols-2 gap-2">
              {details.operators.map((op) => (
                <button
                  key={op}
                  type="button"
                  onClick={() => setOperator(op)}
                  className={`py-3 px-3 rounded-xl text-left border text-xs font-semibold transition-all cursor-pointer ${
                    operator === op
                      ? 'border-[#470085] bg-[#eedbff]/30 text-[#470085]'
                      : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  {op}
                </button>
              ))}
            </div>
          </div>

          {/* Core Code Input */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              {details.label}
            </label>
            <div className="relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={details.placeholder}
                className="w-full bg-slate-100 border border-slate-200 focus:border-[#470085] focus:ring-1 focus:ring-[#470085] rounded-xl py-3 px-4 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400"
              />
              {operator && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider">Verified Connected</span>
                </div>
              )}
            </div>
          </div>

          {/* Dynamic bill status indicator */}
          <div className="bg-slate-100 rounded-xl p-3 border border-slate-200">
            <div className="flex gap-2.5 items-start">
              <div className="bg-[#eedbff]/50 mt-0.5 p-1.5 rounded-lg text-[#470085]">
                <Zap className="w-4 h-4 fill-[#470085]" />
              </div>
              <div className="text-xs">
                <h4 className="font-bold text-slate-800">Dynamic Instant Fetch Engine</h4>
                <p className="text-slate-500 text-[11px] leading-relaxed mt-1">{details.notes}</p>
              </div>
            </div>
          </div>

          {/* Validation constraints */}
          {error && (
            <div className="p-3 bg-red-50 text-red-700 rounded-xl border border-red-100 text-xs text-center font-medium">
              {error}
            </div>
          )}
        </div>

        {/* Action triggers */}
        <button
          type="submit"
          className="w-full h-12 bg-[#470085] hover:bg-[#5f259f] active:scale-[0.98] text-white font-bold rounded-full transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer mt-6"
        >
          <Send className="w-4 h-4" />
          Fetch and Pay Bill Securely
        </button>
      </form>
    </div>
  );
}
