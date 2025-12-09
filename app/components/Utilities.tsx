
import React, { useState } from 'react';
import { Bill, User } from '../types';
import { db } from '../services/database';
import {AlertCircle, Zap, Flame, FileText, Search, Shield } from 'lucide-react';

interface UtilitiesProps {
    currentUser: User;
    onUpdateUser: (user: User) => void;
}

// const MOCK_RESIDENT_BILLS: Bill[] = [
//   { id: '1', type: 'Electricity', amount: 45000.00, dueDate: '2023-11-05', status: 'Pending', usage: '450 kWh' },
//   { id: '4', type: 'Estate Dues', amount: 25000.00, dueDate: '2023-11-01', status: 'Paid' },
// ];

const MOCK_ADMIN_BILLS: Bill[] = [
    { id: '101', unit: '402', residentName: 'Alex Johnson', type: 'Electricity', amount: 45000.00, dueDate: '2023-11-05', status: 'Pending' },
    { id: '102', unit: '305', residentName: 'Sarah Smith', type: 'Estate Dues', amount: 35000.00, dueDate: '2023-11-01', status: 'Overdue' },
    { id: '104', unit: '808', residentName: 'Emily Davis', type: 'Electricity', amount: 31000.00, dueDate: '2023-11-05', status: 'Pending' },
];

export const Utilities: React.FC<UtilitiesProps> = ({ currentUser, onUpdateUser }) => {
  const [bills, setBills] = useState<Bill[]>(MOCK_ADMIN_BILLS);
  
  // Wallet State
  // const [showTopUpModal, setShowTopUpModal] = useState(false);
  // const [topUpAmount, setTopUpAmount] = useState('');

  const handlePay = (bill: Bill) => {
    if (bill.status === 'Paid') return;

    if (currentUser.walletBalance < bill.amount) {
        alert("Insufficient wallet balance. Please top up your wallet to pay this bill.");
        return;
    }

    if (window.confirm(`Pay ₦${bill.amount.toLocaleString(undefined, {minimumFractionDigits: 2})} for ${bill.type} using your wallet?`)) {
        try {
            const updatedUser = db.deductWallet(currentUser.id, bill.amount);
            onUpdateUser(updatedUser);
            setBills(bills.map(b => b.id === bill.id ? { ...b, status: 'Paid' } : b));
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (e: any) {
            alert(e.message);
        }
    }
  };

  // const handleTopUp = () => {
  //     const amount = parseFloat(topUpAmount);
  //     if (isNaN(amount) || amount <= 0) return;

  //     try {
  //         const updatedUser = db.topUpWallet(currentUser.id, amount);
  //         onUpdateUser(updatedUser);
  //         setShowTopUpModal(false);
  //         setTopUpAmount('');
  //     } catch (e: any) {
  //         alert("Failed to top up wallet.");
  //     }
  // };

  const getIcon = (type: string) => {
    switch (type) {
      case 'Electricity': return <Zap className="text-amber-500" />;
      case 'Gas': return <Flame className="text-orange-500" />;
      case 'Estate Dues': return <Shield className="text-teal-500" />;
      default: return <AlertCircle className="text-slate-500" />;
    }
  };

  return (
        <div className="space-y-8 pb-24 md:pb-8">
            <header className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Billing & Finance</h1>
                    <p className="text-sm text-slate-500 font-medium mt-1">Estate financial overview</p>
                </div>
                <button className="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-slate-200 hover:bg-slate-800 flex items-center gap-2">
                    <FileText size={16} /> Generate Invoices
                </button>
            </header>

            <div className="grid grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col justify-between h-32">
                    <div className="text-slate-400 text-xs font-bold uppercase tracking-wider">Total Outstanding</div>
                    <div className="text-3xl font-bold text-rose-500">₦425,000.00</div>
                    <div className="text-xs text-slate-400 font-medium">From 12 units</div>
                </div>
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col justify-between h-32">
                    <div className="text-slate-400 text-xs font-bold uppercase tracking-wider">Collected this Month</div>
                    <div className="text-3xl font-bold text-emerald-500">₦1,245,000.00</div>
                    <div className="text-xs text-slate-400 font-medium">+15% vs last month</div>
                </div>
            </div>

            <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                    <h2 className="font-bold text-lg text-slate-900">Resident Invoices</h2>
                    <div className="flex items-center text-slate-500 bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-100 focus-within:ring-2 focus-within:ring-indigo-100">
                        <Search size={18} className="mr-2"/>
                        <input type="text" placeholder="Unit or Name" className="bg-transparent text-sm font-medium outline-none placeholder:text-slate-400" />
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 text-slate-400 font-bold uppercase text-xs tracking-wider">
                            <tr>
                                <th className="px-6 py-4">Unit</th>
                                <th className="px-6 py-4">Resident</th>
                                <th className="px-6 py-4">Type</th>
                                <th className="px-6 py-4">Amount</th>
                                <th className="px-6 py-4">Due Date</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {bills.map((bill) => (
                                <tr key={bill.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 font-bold text-slate-800">{bill.unit}</td>
                                    <td className="px-6 py-4 text-slate-600 font-medium">{bill.residentName}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-slate-700 font-medium">
                                            {getIcon(bill.type)} {bill.type}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-bold text-slate-900">₦{bill.amount.toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
                                    <td className="px-6 py-4 text-slate-500">{new Date(bill.dueDate).toLocaleDateString()}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wide border ${
                                            bill.status === 'Paid' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                                            bill.status === 'Overdue' ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-amber-50 text-amber-600 border-amber-100'
                                        }`}>
                                            {bill.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-slate-400 hover:text-indigo-600 transition-colors">
                                            <FileText size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
      )
};
