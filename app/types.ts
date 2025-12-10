
export type Role = 'resident' | 'admin' | 'superadmin';

export interface User {
  id: string;
  estate_id: string;
  name: string;
  email: string;        
  city?: string | null;
  town?: string | null;
  wallet_balance: string;       // keep as string to match DB numeric -> '0.00'
  avatar?: string |Blob;
  subscription_expiry?: string; // or Date if you convert it on fetch
  created_at?: string; // optional role field
}


export interface Bill {
  id: string;
  type: 'Electricity' | 'Gas' | 'Estate Dues';
  amount: number;
  dueDate: string;
  status: 'Paid' | 'Pending' | 'Overdue';
  usage?: string; // e.g., "340 kWh"
  residentName?: string; // For admin view
  unit?: string; // For admin view
}

export interface Visitor {
  id: string;
  name: string;
  type: 'Guest' | 'Delivery' | 'Service';
  accessCode: string;
  date: string;
  status: 'Active' | 'Expired' | 'Used';
  unit?: string; // For admin view
}

export interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  authorRole?: Role;
}

export interface Post {
  id: string;
  author: string;
  title: string;
  content: string;
  category: 'General' | 'Complaints' | 'Marketplace' | 'Alerts';
  likes: number;
  comments: Comment[];
  timestamp: string;
  authorRole?: Role;
}

export interface CommunityEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  attendees: number;
  image: string;
}

export enum ViewState {
  DASHBOARD = 'dashboard',
  UTILITIES = 'utilities',
  INVOICES = 'invoices',
  ACCESS = 'access',
  FORUM = 'forum',
  EVENTS = 'events',
  USERS = 'users',
  REQUESTS = 'requests'
}

export interface Tenant {
  id: string;
  estate_id: string;
  name: string;
  email: string;
  unit: string;
  block?: string | null;
  wallet_balance: string;   // from DB as string, you can parseFloat if needed
  avatar?: string | null;
  created_at: string;       // timestamp string
}

export interface JoinRequest {
  id: string;
  temp_tenant_id: string;
  estate_id: string;
  block?: string;
  unit?: string;
  status: "PENDING" | "APPROVED" | "DECLINED";
  requested_at: string;
  temp_tenant_name: string;  // added from JOIN
  temp_tenant_email: string; // added from JOIN
}

export interface Invoice {
  id: string;
  tenant_id: string;
  estate_id: string;
  bill_id: string | null;  // special invoices may not reference a bill
  invoice_month: string;   // ISO date string (e.g. "2025-12-01")
  status: "pending" | "partially_paid" | "paid" | "overdue";
  total_amount: number;
  amount_paid: number;
  balance_due: number;
  created_at: string;
  updated_at: string;
}

export interface InvoiceItem {
  id: string;
  invoice_id: string;
  item_name: string;
  amount: number;
  quantity: number;
  total: number;
  created_at: string;
  updated_at: string;
}

export interface InvoiceWithItems extends Invoice {
  items: InvoiceItem[];
}


export interface InvoiceWithTenant extends Invoice {
  items: InvoiceItem[];
  tenant: {
    id: string;
    name: string;
    block: string;
    unit: string;
  };
}

export interface GeneralInvoice {
  id: string;
  bill_id: string | null;       // null for one-off invoices
  bill_name: string | null;
  description: string | null;
  total_amount: number;
  invoice_date: string;         // YYYY-MM-DD
  created_at: string;
  updated_at: string;
  created_by: string;
  created_by_name: string | null;
}



