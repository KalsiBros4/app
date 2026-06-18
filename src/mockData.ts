import { Contact, BankAccount, Transaction, RewardCoupon } from './types';

export const INITIAL_CONTACTS: Contact[] = [
  {
    id: 'c1',
    name: 'Priya Sharma',
    phone: '+91 98765 43210',
    upiId: 'priya@okhdfcbank',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    color: '#833ab4',
    isRecent: true
  },
  {
    id: 'c2',
    name: 'Sarah Jenkins',
    phone: '+1 555-0198',
    upiId: 'sarah.j@okaxis',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    color: '#fd1d1d',
    isRecent: true
  },
  {
    id: 'c3',
    name: 'Michael Rodriguez',
    phone: '+1 555-0245',
    upiId: 'm.rod@okicici',
    color: '#2b5797',
    isRecent: true
  },
  {
    id: 'c4',
    name: 'David Chen',
    phone: '+1 555-0312',
    upiId: 'dchen@okaxis',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    color: '#00a300',
    isRecent: true
  },
  {
    id: 'c5',
    name: 'Emma Larson',
    phone: '+1 555-0488',
    upiId: 'emma.l@okicici',
    color: '#ffc40d',
    isRecent: true
  },
  {
    id: 'c6',
    name: 'James Smith',
    phone: '+1 555-0551',
    upiId: 'jsmith@okaxis',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    color: '#ee1111',
    isRecent: true
  },
  {
    id: 'c7',
    name: 'Alex Johnson',
    phone: '+91 88776 55443',
    upiId: 'alex.j@ybl',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    color: '#9c27b0'
  }
];

export const INITIAL_BANKS: BankAccount[] = [
  {
    id: 'b1',
    bankName: 'HDFC Bank',
    accountNumberLast4: '1234',
    balance: 24500.50,
    type: 'Savings',
    logoText: 'HD',
    logoColor: 'bg-blue-800'
  },
  {
    id: 'b2',
    bankName: 'State Bank of India',
    accountNumberLast4: '8849',
    balance: 8520.00,
    type: 'Savings',
    logoText: 'SB',
    logoColor: 'bg-teal-600'
  },
  {
    id: 'b3',
    bankName: 'ICICI Bank',
    accountNumberLast4: '4591',
    balance: 1420.75,
    type: 'Current',
    logoText: 'IC',
    logoColor: 'bg-orange-600'
  }
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 't1',
    type: 'recharge',
    title: 'Blue Bottle Coffee',
    subtitle: 'Paid • 28 Aug, 09:14 AM',
    avatarUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=150&auto=format&fit=crop&q=80',
    amount: -450.00,
    date: '28 Aug 2026',
    time: '09:14 AM',
    status: 'success',
    bankName: 'HDFC Bank ****1234',
    transactionId: 'TXN8594231802',
    note: 'Premium Beans blend'
  },
  {
    id: 't2',
    type: 'receive',
    title: 'Sarah Jenkins',
    subtitle: 'Received • 25 Aug, 06:30 PM',
    avatarInitials: 'SJ',
    avatarColor: 'bg-indigo-600',
    amount: 2500.00,
    date: '25 Aug 2026',
    time: '06:30 PM',
    status: 'success',
    bankName: 'HDFC Bank ****1234',
    transactionId: 'TXN9184592038',
    note: 'Weekend road-trip share'
  },
  {
    id: 't3',
    type: 'bill',
    title: 'Bescom Electricity',
    subtitle: 'Bill Paid • 12 Aug, 10:00 AM',
    avatarInitials: 'BE',
    avatarColor: 'bg-yellow-600',
    amount: -1840.00,
    date: '12 Aug 2026',
    time: '10:00 AM',
    status: 'success',
    bankName: 'ICICI Bank ****4591',
    transactionId: 'TXN4892150381',
    note: 'Consumer ID: EL-489102'
  },
  {
    id: 't4',
    type: 'send',
    title: 'Whole Foods Market',
    subtitle: 'Paid • 30 Jul, 04:45 PM',
    avatarUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=150&auto=format&fit=crop&q=80',
    amount: -3250.00,
    date: '30 Jul 2026',
    time: '04:45 PM',
    status: 'success',
    bankName: 'HDFC Bank ****1234',
    transactionId: 'TXN7295140381',
    note: 'Organic groceries shopping'
  },
  {
    id: 't5',
    type: 'receive',
    title: 'David Chen',
    subtitle: 'Received • 15 Jul, 11:20 AM',
    avatarInitials: 'DC',
    avatarColor: 'bg-emerald-600',
    amount: 800.00,
    date: '15 Jul 2026',
    time: '11:20 AM',
    status: 'success',
    bankName: 'State Bank of India ****8849',
    transactionId: 'TXN3815024823',
    note: 'Lunch repayment'
  }
];

export const INITIAL_REWARDS: RewardCoupon[] = [
  {
    id: 'r1',
    title: 'Flat ₹50 Cashback',
    subtitle: 'on Google Play Recharge',
    details: 'Scratch to reveal your cashback and credit to HDFC bank bank account instantly!',
    scratched: false,
    value: 50
  },
  {
    id: 'r2',
    title: 'Up to ₹200 OFF',
    subtitle: 'on Indigo Flights booking',
    details: 'Copy custom promo coupon and apply at check-out on indigo.in. Min booking value ₹4,000.',
    scratched: false,
    couponCode: 'INDYPAY200'
  },
  {
    id: 'r3',
    title: 'Airtel Free 5GB Data',
    subtitle: 'Airtel Thanks user exclusive',
    details: 'Free 5GB high-speed 5G voucher. Redeemable on Airtel mobile app inside coupons tab.',
    scratched: false,
    couponCode: '5GDATAYPAY'
  },
  {
    id: 'r4',
    title: '₹100 Cashback Voucher',
    subtitle: 'on FASTag First Recharge',
    details: 'Scratch to win cash directly to wallet.',
    scratched: true,
    value: 100
  }
];
