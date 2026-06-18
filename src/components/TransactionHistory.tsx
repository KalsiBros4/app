import React, { useState } from 'react';
import { ArrowLeft, Search, Filter, ArrowUpRight, ArrowDownLeft, Zap, Tv, HelpCircle, Check, Copy, MoreVertical } from 'lucide-react';
import { Transaction, TransactionType } from '../types';

interface TransactionHistoryProps {
  transactions: Transaction[];
  onBack: () => void;
}

export default function TransactionHistory({ transactions, onBack }: TransactionHistoryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<TransactionType | 'all'>('all');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [selectedTxnDetails, setSelectedTxnDetails] = useState<Transaction | null>(null);
  const [copiedTxnId, setCopiedTxnId] = useState<string | null>(null);

  const filteredTransactions = transactions.filter((t) => {
    const term = searchTerm.toLowerCase().trim();
    const matchesSearch = 
      t.title.toLowerCase().includes(term) ||
      t.subtitle.toLowerCase().includes(term) ||
      t.amount.toString().includes(term) ||
      (t.note && t.note.toLowerCase().includes(term)) ||
      t.transactionId.toLowerCase().includes(term);

    const matchesCategory = categoryFilter === 'all' || t.type === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  const handleCopyId = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(id);
    setCopiedTxnId(id);
    setTimeout(() => setCopiedTxnId(null), 2000);
  };

  return (
    <div className="flex-1 bg-[#fdf8fd] flex flex-col justify-between h-full relative font-sans">
      
      {/* Top App bar */}
      <header className="bg-[#470085] text-white px-4 py-4 flex items-center justify-between shadow-md shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-1 hover:bg-white/10 rounded-full transition-colors cursor-pointer">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="font-extrabold text-[#fdf8fd] text-base">Transaction History</h2>
        </div>
        <HelpCircle className="w-5 h-5 text-white/80" />
      </header>

      {/* Main Container */}
      <div className="flex-grow p-4 space-y-4 overflow-y-auto">
        <div className="flex gap-2 relative">
          <div className="relative flex-grow">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search history, UPI ID, or value"
              className="w-full bg-[#f1ecf2] border-none rounded-xl py-3.5 pl-10 pr-4 text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-[#470085]"
            />
          </div>

          <button
            onClick={() => setShowFilterDropdown(!showFilterDropdown)}
            className="p-3 bg-purple-100 hover:bg-purple-200 text-[#470085] rounded-xl transition-all cursor-pointer shadow-sm relative shrink-0"
          >
            <Filter className="w-4 h-4" />
            {categoryFilter !== 'all' && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full"></span>
            )}
          </button>

          {/* Filter categorizer list */}
          {showFilterDropdown && (
            <div className="absolute right-0 top-14 w-44 bg-white border border-slate-100 rounded-2xl shadow-xl z-50 overflow-hidden divide-y divide-slate-100">
              {['all', 'send', 'receive', 'recharge', 'bill', 'wallet_add'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => {
                    setCategoryFilter(filter as TransactionType | 'all');
                    setShowFilterDropdown(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-xs font-bold transition-all hover:bg-slate-50 uppercase tracking-wider ${
                    categoryFilter === filter ? 'text-[#470085] bg-purple-50' : 'text-slate-600'
                  }`}
                >
                  {filter === 'all' ? 'All Transactions' : filter.replace('_', ' ')}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Logs grouped list */}
        <div className="space-y-4">
          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">
            Recent payments
          </h3>

          {filteredTransactions.length === 0 ? (
            <p className="text-center text-xs text-slate-400 py-12">No transactions match your filters</p>
          ) : (
            <div className="space-y-2.5">
              {filteredTransactions.map((t) => (
                <div
                  key={t.id}
                  onClick={() => setSelectedTxnDetails(t)}
                  className="w-full flex items-center justify-between p-3.5 bg-white hover:bg-slate-50 border border-slate-200/50 rounded-2xl shadow-sm hover:shadow active:scale-[0.99] transition-all cursor-pointer text-left"
                >
                  <div className="flex items-center gap-3">
                    {/* Avatar initials or Image */}
                    {t.avatarUrl ? (
                      <img src={t.avatarUrl} alt={t.title} className="w-10 h-10 rounded-full object-cover shadow-sm bg-slate-100" />
                    ) : (
                      <div className={`w-10 h-10 rounded-full font-bold text-xs flex items-center justify-center text-white ${t.avatarColor || 'bg-purple-600'} shadow-sm`}>
                        {t.avatarInitials || t.title[0]}
                      </div>
                    )}

                    <div className="leading-tight">
                      <h4 className="font-extrabold text-slate-800 text-xs">{t.title}</h4>
                      <p className="text-[10px] text-slate-400 mt-1 flex items-center gap-1 font-medium select-none">
                        {t.type === 'receive' ? (
                          <ArrowDownLeft className="w-3 h-3 text-emerald-500 stroke-[3]" />
                        ) : (
                          <ArrowUpRight className="w-3 h-3 text-slate-400 stroke-[3]" />
                        )}
                        {t.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className={`text-[#33a0fd] font-extrabold text-sm block ${t.amount > 0 ? 'text-emerald-600' : 'text-slate-800'}`}>
                      {t.amount > 0 ? '+' : ''}₹{Math.abs(t.amount).toLocaleString('en-IN', { minimumFractionDigits: 1 })}
                    </span>
                    <span className="text-[9px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full mt-1 inline-block uppercase leading-none">
                      {t.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Pop-up sheet Details trace modal preview */}
      {selectedTxnDetails && (
        <div className="absolute inset-0 bg-black/40 z-50 flex items-end">
          <div className="absolute inset-0" onClick={() => setSelectedTxnDetails(null)}></div>
          <div className="w-full bg-[#fdf8fd] rounded-t-3xl shadow-xl relative z-50 p-5 space-y-4 max-h-[85%] overflow-y-auto animate-slide-up text-slate-800 text-left">
            <div className="flex justify-between items-center pb-2 border-b border-purple-100">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest leading-none">
                Details Inquiry Receipt
              </span>
              <button
                onClick={() => setSelectedTxnDetails(null)}
                className="text-xs font-bold text-slate-400 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 px-3 py-1 rounded-full cursor-pointer leading-none"
              >
                Close
              </button>
            </div>

            <div className="flex items-center gap-3">
              {selectedTxnDetails.avatarUrl ? (
                <img src={selectedTxnDetails.avatarUrl} alt={selectedTxnDetails.title} className="w-12 h-12 rounded-full object-cover shadow-sm bg-slate-100" />
              ) : (
                <div className={`w-12 h-12 rounded-full font-bold text-sm flex items-center justify-center text-white ${selectedTxnDetails.avatarColor || 'bg-purple-600'} shadow-sm`}>
                  {selectedTxnDetails.avatarInitials || selectedTxnDetails.title[0]}
                </div>
              )}
              <div>
                <h3 className="font-extrabold text-slate-800 text-sm">{selectedTxnDetails.title}</h3>
                <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-wider">{selectedTxnDetails.type} transaction</p>
              </div>
            </div>

            <div className="space-y-2.5 text-xs font-semibold text-slate-600 p-4 bg-white border border-slate-200 rounded-2xl shadow-sm">
              <div className="flex justify-between">
                <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Amount Balance</span>
                <span className={`text-xs font-bold ${selectedTxnDetails.amount > 0 ? 'text-emerald-600' : 'text-slate-800'}`}>
                  ₹{selectedTxnDetails.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </span>
              </div>

              {selectedTxnDetails.note && (
                <div className="flex justify-between">
                  <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Note Reference</span>
                  <span className="text-slate-700 text-xs font-bold">{selectedTxnDetails.note}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Timeline</span>
                <span className="text-slate-700 text-xs">{selectedTxnDetails.date} at {selectedTxnDetails.time}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Debited From</span>
                <span className="text-slate-700 text-xs">{selectedTxnDetails.bankName}</span>
              </div>

              <div className="flex justify-between items-center relative">
                <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Transaction ID</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-700 font-mono font-bold text-xs">{selectedTxnDetails.transactionId}</span>
                  <button
                    onClick={(e) => handleCopyId(e, selectedTxnDetails.transactionId)}
                    className="p-1 hover:bg-purple-50 text-[#470085] rounded cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
                {copiedTxnId === selectedTxnDetails.transactionId && (
                  <span className="absolute right-0 -top-6 text-[9px] bg-slate-800 text-white font-bold px-2 py-0.5 rounded shadow">
                    ID Copied!
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
