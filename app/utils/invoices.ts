// api/invoices.ts
import { InvoiceWithTenant, GeneralInvoice } from '../types';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export async function fetchTenantInvoices(): Promise<InvoiceWithTenant[]> {
  const res = await fetch(`${baseUrl}/invoices`, { credentials: 'include' });
  const data = await res.json();
  if (!data.success) throw new Error(data.message || 'Failed to fetch invoices');
  return data.invoices;
}

export async function fetchGeneralInvoices(): Promise<GeneralInvoice[]> {
  const res = await fetch(`${baseUrl}/invoices/general`, { credentials: 'include' });
  const data = await res.json();
  if (!data.success) throw new Error(data.message || 'Failed to fetch general invoices');
  return data.generalInvoices;
}
