
export type Role = 'resident' | 'admin' | 'superadmin';

export interface User {
  id: string;
  name: string;
  email?: string;
  unit: string;
  role: Role;
  avatar: string;
  walletBalance: number;
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
  ACCESS = 'access',
  FORUM = 'forum',
  EVENTS = 'events',
  USERS = 'users'
}
