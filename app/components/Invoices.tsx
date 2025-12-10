import React, { useState, useEffect } from 'react';
import { InvoiceWithTenant, GeneralInvoice } from '../types';
import { FileText } from 'lucide-react';
import { fetchTenantInvoices, fetchGeneralInvoices } from '../utils/invoices';

interface InvoicesProps {
  currentUserId: string;
}

const InvoiceTable = ({
  invoices,
  type = 'tenant',
}: {
  invoices: InvoiceWithTenant[] | GeneralInvoice[];
  type?: 'tenant' | 'general';
}) => (
  <div className="bg-white rounded-4xl shadow-sm border overflow-hidden">
    <div className="p-6 border-b flex items-center justify-between">
      <h2 className="font-bold text-lg text-slate-900">
        {type === 'tenant' ? 'Recent Invoices' : 'Recent General Invoices'}
      </h2>
      <button className="text-indigo-600 text-xs font-semibold hover:underline flex items-center gap-1">
        View All <FileText size={14} />
      </button>
    </div>
    <div className="overflow-x-auto">
      {(invoices.length === 0) ? (
        <p className="text-center py-6 text-slate-500">No {type === 'tenant' ? 'invoices' : 'general invoices'} yet.</p>
      ) : (
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 text-slate-400 font-bold uppercase text-xs tracking-wider">
            <tr>
              {type === 'tenant' ? (
                <>
                  <th className="px-6 py-4">Invoice ID</th>
                  <th className="px-6 py-4">Bill ID</th>
                  <th className="px-6 py-4">Resident</th>
                  <th className="px-6 py-4">Unit</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Issued Date</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </>
              ) : (
                <>
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Bill</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Created By</th>
                  <th className="px-6 py-4">Date</th>
                </>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {invoices.map(inv => (
              <tr key={inv.id} className="hover:bg-slate-50 transition-colors">
                {type === 'tenant' ? (
                  <>
                    <td className="px-6 py-4 font-bold text-slate-800">{inv.id}</td>
                    <td className="px-6 py-4 text-slate-600">{(inv as InvoiceWithTenant).bill_id}</td>
                    <td className="px-6 py-4 text-slate-600 font-medium">{(inv as InvoiceWithTenant).tenant.name}</td>
                    <td className="px-6 py-4 font-bold text-slate-800">{(inv as InvoiceWithTenant).tenant.block}-{(inv as InvoiceWithTenant).tenant.unit}</td>
                    <td className="px-6 py-4 font-bold text-slate-900">
                      ₦{(inv as InvoiceWithTenant).total_amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    <td className="px-6 py-4 text-slate-500">{new Date((inv as InvoiceWithTenant).created_at).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wide border ${
                          (inv as InvoiceWithTenant).status === 'paid'
                            ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                            : (inv as InvoiceWithTenant).status === 'pending'
                            ? 'bg-amber-50 text-amber-600 border-amber-100'
                            : 'bg-rose-50 text-rose-600 border-rose-100'
                        }`}
                      >
                        {(inv as InvoiceWithTenant).status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-slate-400 hover:text-indigo-600 transition-colors">
                        <FileText size={18} />
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="px-6 py-4 font-bold text-slate-800">{inv.id}</td>
                    <td className="px-6 py-4 text-slate-600">{(inv as GeneralInvoice).bill_name || (inv as GeneralInvoice).description}</td>
                    <td className="px-6 py-4 font-bold text-slate-900">
                      ₦{(inv as GeneralInvoice).total_amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    <td className="px-6 py-4 text-slate-600 font-medium">{(inv as GeneralInvoice).created_by_name || 'Admin'}</td>
                    <td className="px-6 py-4 text-slate-500">{new Date((inv as GeneralInvoice).created_at).toLocaleDateString()}</td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  </div>
);

export const InvoicesPage: React.FC<InvoicesProps> = ({ currentUserId }) => {
  const [invoices, setInvoices] = useState<InvoiceWithTenant[]>([]);
  const [recentInvoices, setRecentInvoices] = useState<InvoiceWithTenant[]>([]);
  const [generalInvoices, setGeneralInvoices] = useState<GeneralInvoice[]>([]);
  const [recentGeneralInvoices, setRecentGeneralInvoices] = useState<GeneralInvoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const [tenantInvoices, genInvoices] = await Promise.all([
          fetchTenantInvoices(),
          fetchGeneralInvoices()
        ]);

        setInvoices(tenantInvoices);
        setGeneralInvoices(genInvoices);

        setRecentInvoices([...tenantInvoices].sort((a,b)=> new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0,5));
        setRecentGeneralInvoices([...genInvoices].sort((a,b)=> new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0,5));
      } catch (err: any) {
        console.error('Invoice fetch error:', err);
        setError(err.message || 'Failed to load invoices');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // KPI
  const totalInvoices = invoices.length;
  const paidInvoices = invoices.filter(inv => inv.status === 'paid').length;
  const paidPercentage = totalInvoices ? Math.round((paidInvoices / totalInvoices) * 100) : 0;

  if (loading) return <p className="text-center py-6">Loading invoices...</p>;
  if (error) return <p className="text-center text-red-500 py-6">{error}</p>;

  return (
    <div className="space-y-8 pb-24 md:pb-8 flex flex-col">
      {/* Header & KPI */}
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Invoices</h1>
          <p className="text-sm text-slate-500 font-medium mt-1">Estate invoices overview</p>
        </div>
      </header>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-8 rounded-3xl shadow-sm border">
          <div className="text-slate-400 text-sm font-bold uppercase tracking-wider flex justify-between items-center">
            <span>Total Invoices</span>
            <button className="text-indigo-600 text-xs font-semibold hover:underline flex items-center gap-1">
              View All <FileText size={14} />
            </button>
          </div>
          <div className="text-4xl font-bold text-slate-900 mt-4">{totalInvoices}</div>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-sm border">
          <div className="text-slate-400 text-sm font-bold uppercase tracking-wider flex justify-between items-center">
            <span>% Paid Invoices</span>
            <button className="text-indigo-600 text-xs font-semibold hover:underline flex items-center gap-1">
              View All <FileText size={14} />
            </button>
          </div>
          <div className="text-4xl font-bold text-emerald-500 mt-4">{paidPercentage}%</div>
        </div>
      </div>

      {/* Generate Buttons */}
      <div className="w-full flex justify-end gap-4 mt-6">
        <button className="px-6 py-2 bg-indigo-600 text-white rounded-xl font-semibold shadow-lg hover:bg-indigo-700 flex items-center gap-2">
          Generate Tenant Invoices <FileText size={16} />
        </button>
        <button className="px-6 py-2 bg-emerald-600 text-white rounded-xl font-semibold shadow-lg hover:bg-emerald-700 flex items-center gap-2">
          Generate General Invoice <FileText size={16} />
        </button>
      </div>

      {/* Tables */}
      <InvoiceTable invoices={recentGeneralInvoices} type="general" />
      <InvoiceTable invoices={recentInvoices} type="tenant" />
    </div>
  );
};
