import React, { useState, useEffect } from 'react';
import PhoneFrame from './components/PhoneFrame';
import Dashboard from './components/Dashboard';
import ContactSelect from './components/ContactSelect';
import TransferInput from './components/TransferInput';
import PinEntry from './components/PinEntry';
import Processing from './components/Processing';
import SuccessReceipt from './components/SuccessReceipt';
import TransactionHistory from './components/TransactionHistory';
import BillRechargeForm from './components/BillRechargeForm';
import BalanceCheck from './components/BalanceCheck';
import WalletPanel from './components/WalletPanel';
import RewardsPanel from './components/RewardsPanel';
import QrScanner from './components/QrScanner';

import { Contact, BankAccount, Transaction, RewardCoupon, BillCategory } from './types';
import { INITIAL_CONTACTS, INITIAL_BANKS, INITIAL_TRANSACTIONS, INITIAL_REWARDS } from './mockData';

export default function App() {
  // Screen Routes: 'dashboard' | 'contact_select' | 'transfer_input' | 'pin_entry' | 'processing' | 'success_receipt' | 'history' | 'bill_form' | 'check_balance' | 'wallet_panel' | 'rewards_panel'
  const [screen, setScreen] = useState<string>('dashboard');

  // Core Persistent State
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [rewards, setRewards] = useState<RewardCoupon[]>([]);
  const [walletBalance, setWalletBalance] = useState<number>(0);
  const [upiLiteBalance, setUpiLiteBalance] = useState<number>(0);

  // Transfer Context Variable States
  const [activeRecipient, setActiveRecipient] = useState<Contact | null>(null);
  const [activeTransferAmount, setActiveTransferAmount] = useState<number>(0);
  const [activeTransferNote, setActiveTransferNote] = useState<string>('');
  const [activeTransferBankId, setActiveTransferBankId] = useState<string>('');
  const [activeTransferBankName, setActiveTransferBankName] = useState<string>('');
  const [activeBillCategory, setActiveBillCategory] = useState<BillCategory | null>(null);

  // Load state from localStorage on mount
  useEffect(() => {
    try {
      const storedContacts = localStorage.getItem('ypay_contacts');
      const storedBanks = localStorage.getItem('ypay_banks');
      const storedTxns = localStorage.getItem('ypay_transactions');
      const storedRewards = localStorage.getItem('ypay_rewards');
      const storedWallet = localStorage.getItem('ypay_wallet_balance');
      const storedLite = localStorage.getItem('ypay_lite_balance');

      if (storedContacts) setContacts(JSON.parse(storedContacts));
      else setContacts(INITIAL_CONTACTS);

      if (storedBanks) setBankAccounts(JSON.parse(storedBanks));
      else setBankAccounts(INITIAL_BANKS);

      if (storedTxns) setTransactions(JSON.parse(storedTxns));
      else setTransactions(INITIAL_TRANSACTIONS);

      if (storedRewards) setRewards(JSON.parse(storedRewards));
      else setRewards(INITIAL_REWARDS);

      if (storedWallet) setWalletBalance(parseFloat(storedWallet));
      else setWalletBalance(850.00); // Starter default wallet

      if (storedLite) setUpiLiteBalance(parseFloat(storedLite));
      else setUpiLiteBalance(200.00); // Starter default Lite
    } catch (e) {
      console.error('Error loading state from localStorage:', e);
      // Fallback defaults
      setContacts(INITIAL_CONTACTS);
      setBankAccounts(INITIAL_BANKS);
      setTransactions(INITIAL_TRANSACTIONS);
      setRewards(INITIAL_REWARDS);
      setWalletBalance(850.00);
      setUpiLiteBalance(200.00);
    }
  }, []);

  // Save changes to localStorage whenever core states update
  useEffect(() => {
    if (contacts.length > 0) localStorage.setItem('ypay_contacts', JSON.stringify(contacts));
  }, [contacts]);

  useEffect(() => {
    if (bankAccounts.length > 0) localStorage.setItem('ypay_banks', JSON.stringify(bankAccounts));
  }, [bankAccounts]);

  useEffect(() => {
    if (transactions.length > 0) localStorage.setItem('ypay_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    if (rewards.length > 0) localStorage.setItem('ypay_rewards', JSON.stringify(rewards));
  }, [rewards]);

  useEffect(() => {
    localStorage.setItem('ypay_wallet_balance', walletBalance.toString());
  }, [walletBalance]);

  useEffect(() => {
    localStorage.setItem('ypay_lite_balance', upiLiteBalance.toString());
  }, [upiLiteBalance]);

  // Reset database back to default mock state
  const handleResetDatabase = () => {
    localStorage.clear();
    setContacts(INITIAL_CONTACTS);
    setBankAccounts(INITIAL_BANKS);
    setTransactions(INITIAL_TRANSACTIONS);
    setRewards(INITIAL_REWARDS);
    setWalletBalance(850.00);
    setUpiLiteBalance(200.00);
    setScreen('dashboard');
  };

  // Navigations or custom action hooks
  const navigateTo = (screenName: string) => {
    setScreen(screenName);
  };

  const handleSelectContact = (contact: Contact) => {
    setActiveRecipient(contact);
    setScreen('transfer_input');
  };

  const handleSelectBillCategory = (category: BillCategory) => {
    setActiveBillCategory(category);
    setScreen('bill_form');
  };

  // Handle addition of custom contacts dynamically
  const handleAddContact = (newContact: Omit<Contact, 'id' | 'color'>) => {
    const id = `c_${Date.now()}`;
    const colors = ['#833ab4', '#fd1d1d', '#fcb045', '#10b981', '#3b82f6', '#f59e0b', '#ec4899', '#6366f1'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const created: Contact = {
      ...newContact,
      id,
      color: randomColor
    };

    setContacts((prev) => [created, ...prev]);
    // Instant proceed option
    setActiveRecipient(created);
    setScreen('transfer_input');
  };

  // Triggers submitting the Transfer Input form -> starts securing and proceeds to PIN overlay
  const handleTransferSubmit = (
    amount: number,
    fee: number,
    payFromLabel: string,
    bankId: string,
    note: string
  ) => {
    setActiveTransferAmount(amount);
    setActiveTransferBankId(bankId);
    setActiveTransferBankName(payFromLabel);
    setActiveTransferNote(note);
    setScreen('pin_entry');
  };

  // Triggers submitting the custom Bill Recharge Forms -> routes straight to PIN overlay or transfer insecure confirmation
  const handleBillSubmit = (title: string, amount: number, note: string) => {
    // Generate virtual contact representing the utility merchant
    const mockBillContact: Contact = {
      id: 'utility_merch',
      name: title,
      phone: 'BBPS Unified Merchant Invoice',
      upiId: 'merchant.bbps@npci',
      color: '#470085'
    };

    setActiveRecipient(mockBillContact);
    setActiveTransferAmount(amount);
    setActiveTransferBankId(bankAccounts[0]?.id || 'wallet');
    setActiveTransferBankName(bankAccounts[0]?.bankName || 'PhonePe Wallet');
    setActiveTransferNote(note);
    setScreen('pin_entry');
  };

  // Submits the secret PIN -> initiates automated Processing timelines steps (verifying, connecting)
  const handlePinSubmit = (pin: string) => {
    // Correct simulation
    setScreen('processing');
  };

  // Compiles and processes actual ledger updates once the spinner is completed
  const handleProcessComplete = () => {
    const deductAmount = activeTransferAmount;

    // 1. Deduct funds from source bank account or wallet
    if (activeTransferBankId === 'wallet') {
      setWalletBalance((prev) => Math.max(0, prev - deductAmount));
    } else {
      setBankAccounts((prevList) =>
        prevList.map((acc) =>
          acc.id === activeTransferBankId
            ? { ...acc, balance: Math.max(0, acc.balance - deductAmount) }
            : acc
        )
      );
    }

    // 2. Append standard record log entry dynamically
    const newTxn: Transaction = {
      id: `t_${Date.now()}`,
      type: activeBillCategory ? 'bill' : 'send',
      title: activeRecipient ? activeRecipient.name : 'Vibrant Payment',
      subtitle: `Paid • ${new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}, ${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`,
      avatarInitials: activeRecipient ? activeRecipient.name.split(' ').map(n=>n[0]).join('').substring(0, 2) : 'VP',
      avatarColor: activeRecipient ? activeRecipient.color : 'bg-purple-800',
      avatarUrl: activeRecipient?.avatarUrl,
      amount: -deductAmount,
      date: `${new Date().getDate()} ${new Date().toLocaleString('en-US', { month: 'short' })} ${new Date().getFullYear()}`,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      status: 'success',
      bankName: activeTransferBankId === 'wallet' 
        ? 'PhonePe Wallet' 
        : `${activeTransferBankName} •••• ${bankAccounts.find(b=>b.id===activeTransferBankId)?.accountNumberLast4 || '0000'}`,
      transactionId: `TXN${Math.floor(1000000000 + Math.random() * 9000000000)}`,
      note: activeTransferNote
    };

    setTransactions((prev) => [newTxn, ...prev]);

    // Go to final success receipt
    setScreen('success_receipt');
  };

  // Triggering adding money to the wallet
  const handleAddWalletFunds = (amount: number, bankId: string) => {
    // deduct from bank
    setBankAccounts((prevList) =>
      prevList.map((b) =>
        b.id === bankId ? { ...b, balance: Math.max(0, b.balance - amount) } : b
      )
    );

    // add to wallet
    setWalletBalance((prev) => prev + amount);

    // add to transactions
    const log: Transaction = {
      id: `t_wallet_${Date.now()}`,
      type: 'wallet_add',
      title: 'Top Up Wallet',
      subtitle: `Added • ${new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}, ${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`,
      avatarInitials: 'WT',
      avatarColor: 'bg-purple-900',
      amount: amount,
      date: `${new Date().getDate()} ${new Date().toLocaleString('en-US', { month: 'short' })} ${new Date().getFullYear()}`,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      status: 'success',
      bankName: 'HDFC Bank •••• 4892',
      transactionId: `TXN${Math.floor(1000000000 + Math.random() * 9000000000)}`,
      note: 'Wallet Credit Fund'
    };

    setTransactions((prev) => [log, ...prev]);
  };

  // scratching cashback coupons rewards credits
  const handleScratchCouponValue = (id: string, cashback: number) => {
    // Set scratch to true
    setRewards((prevList) =>
      prevList.map((item) => (item.id === id ? { ...item, scratched: true } : item))
    );

    if (cashback > 0) {
      setWalletBalance((prev) => prev + cashback);

      // Add to transactions ledger
      const rewardRecord: Transaction = {
        id: `t_reward_${Date.now()}`,
        type: 'receive',
        title: 'PhonePe Smart Cashback',
        subtitle: 'Cashback Credit Received',
        avatarInitials: 'CB',
        avatarColor: 'bg-emerald-600',
        amount: cashback,
        date: `${new Date().getDate()} ${new Date().toLocaleString('en-US', { month: 'short' })} ${new Date().getFullYear()}`,
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        status: 'success',
        bankName: 'PhonePe Rewards Channel',
        transactionId: `TXN${Math.floor(1000000000 + Math.random() * 9000000000)}`,
        note: 'Loyalty Scratch Winner Cashback'
      };

      setTransactions((prev) => [rewardRecord, ...prev]);
    }
  };

  const handleReplenishAllBalances = () => {
    setWalletBalance((prev) => prev + 10000);
    setUpiLiteBalance((prev) => prev + 2000);
    setBankAccounts((prevList) =>
      prevList.map((acc) => ({ ...acc, balance: acc.balance + 50000 }))
    );

    const replenishTxn: Transaction = {
      id: `t_replenish_${Date.now()}`,
      type: 'receive',
      title: 'PhonePe Balance Refill',
      subtitle: `Refilled • ${new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}, ${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`,
      avatarInitials: 'RF',
      avatarColor: 'bg-indigo-600',
      amount: 62000,
      date: `${new Date().getDate()} ${new Date().toLocaleString('en-US', { month: 'short' })} ${new Date().getFullYear()}`,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      status: 'success',
      bankName: 'PhonePe Host',
      transactionId: `TXN${Math.floor(1000000000 + Math.random() * 9000000000)}`,
      note: 'Refilled all accounts successfully'
    };
    setTransactions((prev) => [replenishTxn, ...prev]);
  };

  return (
    <PhoneFrame 
      onReset={handleResetDatabase} 
      walletBalance={walletBalance} 
      upiLiteBalance={upiLiteBalance}
    >
      {/* Route Render Core Switches */}
      {screen === 'dashboard' && (
        <Dashboard
          contacts={contacts}
          bankAccounts={bankAccounts}
          walletBalance={walletBalance}
          upiLiteBalance={upiLiteBalance}
          onNavigate={navigateTo}
          onSelectContact={handleSelectContact}
          onSelectBill={handleSelectBillCategory}
          onCheckBalance={() => setScreen('check_balance')}
          onAddWallet={() => setScreen('wallet_panel')}
          onViewRewards={() => setScreen('rewards_panel')}
          onReplenishAllBalances={handleReplenishAllBalances}
          onReset={handleResetDatabase}
        />
      )}

      {screen === 'contact_select' && (
        <ContactSelect
          contacts={contacts}
          onSelect={handleSelectContact}
          onBack={() => setScreen('dashboard')}
          onAddContact={handleAddContact}
        />
      )}

      {screen === 'transfer_input' && activeRecipient && (
        <TransferInput
          recipient={activeRecipient}
          bankAccounts={bankAccounts}
          walletBalance={walletBalance}
          onBack={() => {
            setActiveBillCategory(null);
            setScreen('contact_select');
          }}
          onSubmit={handleTransferSubmit}
        />
      )}

      {screen === 'pin_entry' && activeRecipient && (
        <PinEntry
          recipientName={activeRecipient.name}
          amount={activeTransferAmount}
          payFromBankLabel={activeTransferBankName}
          payFromBankLast4={
            activeTransferBankId === 'wallet' 
              ? 'Wallet' 
              : bankAccounts.find((b) => b.id === activeTransferBankId)?.accountNumberLast4 || '1234'
          }
          onBack={() => setScreen('transfer_input')}
          onSubmit={handlePinSubmit}
        />
      )}

      {screen === 'processing' && activeRecipient && (
        <Processing
          recipientName={activeRecipient.name}
          recipientUpi={activeRecipient.upiId}
          amount={activeTransferAmount}
          onComplete={handleProcessComplete}
        />
      )}

      {screen === 'success_receipt' && activeRecipient && (
        <SuccessReceipt
          recipientName={activeRecipient.name}
          recipientUpi={activeRecipient.upiId}
          recipientAvatar={activeRecipient.avatarUrl}
          amount={activeTransferAmount}
          payFromBankLabel={activeTransferBankName}
          payFromBankLast4={
            activeTransferBankId === 'wallet' 
              ? 'Wallet' 
              : bankAccounts.find((b) => b.id === activeTransferBankId)?.accountNumberLast4 || '1234'
          }
          note={activeTransferNote}
          onNavigateHome={() => {
            setActiveRecipient(null);
            setActiveBillCategory(null);
            setScreen('dashboard');
          }}
          onShareReceipt={() => {
            alert('Configured standard native sharing options! Copying invoice image link.');
          }}
        />
      )}

      {screen === 'history' && (
        <TransactionHistory
          transactions={transactions}
          onBack={() => setScreen('dashboard')}
        />
      )}

      {screen === 'bill_form' && activeBillCategory && (
        <BillRechargeForm
          category={activeBillCategory}
          onBack={() => {
            setActiveBillCategory(null);
            setScreen('dashboard');
          }}
          onSubmit={handleBillSubmit}
        />
      )}

      {screen === 'check_balance' && (
        <BalanceCheck
          bankAccounts={bankAccounts}
          onBack={() => setScreen('dashboard')}
        />
      )}

      {screen === 'wallet_panel' && (
        <WalletPanel
          walletBalance={walletBalance}
          bankAccounts={bankAccounts}
          onAddFunds={handleAddWalletFunds}
          onBack={() => setScreen('dashboard')}
        />
      )}

      {screen === 'rewards_panel' && (
        <RewardsPanel
          coupons={rewards}
          onScratch={handleScratchCouponValue}
          onBack={() => setScreen('dashboard')}
        />
      )}

      {screen === 'qr_scan' && (
        <QrScanner
          contacts={contacts}
          onScanSuccess={handleSelectContact}
          onBack={() => setScreen('dashboard')}
        />
      )}
    </PhoneFrame>
  );
}
