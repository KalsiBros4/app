import React, { useState } from 'react';
import { ArrowLeft, UserPlus, Search, HelpCircle, PhoneCall, PlusCircle, X } from 'lucide-react';
import { Contact } from '../types';

interface ContactSelectProps {
  contacts: Contact[];
  onSelect: (contact: Contact) => void;
  onBack: () => void;
  onAddContact: (newContact: Omit<Contact, 'id' | 'color'>) => void;
}

export default function ContactSelect({ contacts, onSelect, onBack, onAddContact }: ContactSelectProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newUpi, setNewUpi] = useState('');
  const [error, setError] = useState('');

  const filteredContacts = contacts.filter((c) => {
    const term = searchTerm.toLowerCase().trim();
    return (
      c.name.toLowerCase().includes(term) ||
      c.phone.includes(term) ||
      c.upiId.toLowerCase().includes(term)
    );
  });

  const handleCreateContact = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!newName.trim() || !newPhone.trim()) {
      setError('Name and Phone number are required fields');
      return;
    }

    const upi = newUpi.trim() || `${newName.toLowerCase().replace(/\s+/g, '')}@okaxis`;

    onAddContact({
      name: newName.trim(),
      phone: newPhone.trim(),
      upiId: upi,
      isRecent: true
    });

    // Reset fields
    setNewName('');
    setNewPhone('');
    setNewUpi('');
    setShowAddModal(false);
  };

  return (
    <div className="flex-1 bg-[#fdf8fd] flex flex-col justify-between h-full relative">
      <div>
        {/* Top Header */}
        <header className="bg-[#470085] text-white px-4 py-4 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="p-1 hover:bg-white/10 rounded-full transition-colors cursor-pointer">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h2 className="font-extrabold text-[#fdf8fd] text-base">Select Contact</h2>
          </div>
          <HelpCircle className="w-5 h-5 text-white/80" />
        </header>

        {/* Search bar & Create New Contact button row */}
        <div className="p-4 space-y-3">
          <div className="relative w-full">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name or number"
              className="w-full bg-[#f1ecf2] border-none rounded-full py-3.5 pl-12 pr-4 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#470085] font-semibold transition-shadow placeholder:text-slate-400"
            />
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="w-full flex items-center justify-center gap-2 bg-[#eedbff] text-[#470085] hover:bg-purple-100 font-bold rounded-2xl py-3 px-4 transition-all active:scale-[0.99] border border-purple-200/20 text-xs cursor-pointer shadow-sm"
          >
            <UserPlus className="w-4 h-4" />
            Create New Recipient Contact
          </button>
        </div>

        {/* Recent Contacts list */}
        <div className="px-4 pb-4">
          <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-3 pl-1">
            Recent Contacts
          </h3>

          {filteredContacts.length === 0 ? (
            <p className="text-center text-xs text-slate-400 py-8">No matching contacts found</p>
          ) : (
            <div className="space-y-2.5">
              {filteredContacts.map((c) => (
                <button
                  key={c.id}
                  onClick={() => onSelect(c)}
                  className="w-full flex items-center p-3.5 bg-white hover:bg-[#f7f2f8] rounded-2xl shadow-sm hover:shadow transition-all duration-200 text-left border border-purple-200/10 active:scale-[0.99] cursor-pointer"
                >
                  {/* Photo or Initials block */}
                  {c.avatarUrl ? (
                    <img
                      src={c.avatarUrl}
                      alt={c.name}
                      referrerPolicy="no-referrer"
                      className="w-11 h-11 rounded-full object-cover mr-3.5 shadow-sm border border-slate-200"
                    />
                  ) : (
                    <div
                      className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3.5 shadow-sm"
                      style={{ backgroundColor: c.color }}
                    >
                      {c.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                        .substring(0, 2)}
                    </div>
                  )}

                  <div className="flex-grow">
                    <h4 className="font-extrabold text-slate-800 text-sm">{c.name}</h4>
                    <p className="text-[11px] text-slate-500 font-medium mt-0.5">{c.phone}</p>
                  </div>

                  <PhoneCall className="w-4.5 h-4.5 text-[#470085] opacity-70 hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Slide-over contact creation modal */}
      {showAddModal && (
        <div className="absolute inset-x-0 bottom-0 bg-white/95 backdrop-blur-md rounded-t-3xl shadow-[0_-8px_30px_rgba(0,0,0,0.15)] flex flex-col z-50 border-t border-purple-200 animate-slide-up p-5 space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-slate-100">
            <h3 className="font-extrabold text-slate-800 text-base">Add Beneficiary Contact</h3>
            <button onClick={() => setShowAddModal(false)} className="p-1.5 hover:bg-slate-100 rounded-full cursor-pointer">
              <X className="w-5 h-5 text-slate-400" />
            </button>
          </div>

          <form onSubmit={handleCreateContact} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-400 uppercase block pl-1">Full Name</label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="e.g. Alex Johnson"
                className="w-full bg-slate-50 border border-slate-200 focus:border-[#470085] rounded-xl py-3 px-4 text-xs font-semibold text-slate-800 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-400 uppercase block pl-1">Mobile / Phone Number</label>
              <input
                type="text"
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value)}
                placeholder="e.g. +91 98765 43210"
                className="w-full bg-slate-50 border border-slate-200 focus:border-[#470085] rounded-xl py-3 px-4 text-xs font-semibold text-slate-800 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-400 uppercase block pl-1">UPI ID (Optional)</label>
              <input
                type="text"
                value={newUpi}
                onChange={(e) => setNewUpi(e.target.value)}
                placeholder="e.g. alex@okaxis (auto-compiled if empty)"
                className="w-full bg-slate-50 border border-slate-200 focus:border-[#470085] rounded-xl py-3 px-4 text-xs font-semibold text-slate-800 outline-none"
              />
            </div>

            {error && <p className="text-[11px] text-rose-600 bg-rose-50 p-2 rounded-lg font-semibold text-center">{error}</p>}

            <button
              type="submit"
              className="w-full h-11 bg-[#470085] hover:bg-[#5f259f] active:scale-[0.98] text-white font-bold rounded-xl text-xs transition-all cursor-pointer shadow-md"
            >
              Save and Continue Transfer
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
