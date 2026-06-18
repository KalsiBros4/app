export interface Contact {
  id: string;
  name: string;
  phone: string;
  upiId: string;
  avatarUrl?: string;
  color: string;
  isRecent?: boolean;
}

export type TransactionType = 'send' | 'receive' | 'recharge' | 'bill' | 'wallet_add' | 'upilite_add';
export type TransactionStatus = 'success' | 'processing' | 'failed';

export interface Transaction {
  id: string;
  type: TransactionType;
  title: string;
  subtitle: string;
  avatarUrl?: string;
  avatarInitials?: string;
  avatarColor?: string;
  amount: number;
  date: string;
  time: string;
  status: TransactionStatus;
  bankName: string;
  transactionId: string;
  note?: string;
}

export interface BankAccount {
  id: string;
  bankName: string;
  accountNumberLast4: string;
  balance: number;
  type: 'Savings' | 'Current';
  logoText: string;
  logoColor: string;
}

export type BillCategory = 'mobile' | 'dth' | 'electricity' | 'creditcard' | 'rent' | 'loan' | 'fastag' | 'gas';

export interface RewardCoupon {
  id: string;
  title: string;
  subtitle: string;
  details: string;
  scratched: boolean;
  value?: number; // cashback value if scratch card
  couponCode?: string;
}
