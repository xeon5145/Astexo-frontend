// Core invoice data models and types

export enum PaymentStatus {
  PENDING = 'pending',
  PAID = 'paid',
  OVERDUE = 'overdue',
  CANCELLED = 'cancelled',
  PARTIALLY_PAID = 'partially_paid'
}

export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Payment {
  id: string;
  amount: number;
  paymentDate: Date;
  paymentMethod: string;
  transactionId?: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  clientId: string;
  date: Date;
  dueDate: Date;
  amount: number;
  taxAmount: number;
  totalAmount: number;
  status: PaymentStatus;
  description: string;
  lineItems: LineItem[];
  paymentHistory: Payment[];
  createdAt: Date;
  updatedAt: Date;
}

export interface InvoiceFilters {
  search: string;
  status: PaymentStatus[];
  dateRange: {
    from: Date | null;
    to: Date | null;
  };
  sortBy: 'date' | 'amount' | 'dueDate';
  sortOrder: 'asc' | 'desc';
}

export interface DashboardState {
  invoices: Invoice[];
  filteredInvoices: Invoice[];
  loading: boolean;
  error: string | null;
  filters: InvoiceFilters;
  selectedInvoice: Invoice | null;
  modalOpen: boolean;
}

export interface InvoiceSummary {
  totalInvoices: number;
  totalAmount: number;
  paidAmount: number;
  pendingAmount: number;
  overdueCount: number;
}

export type InvoiceAction = 'download' | 'print' | 'view';

// API interfaces
export interface InvoiceAPI {
  getInvoices(clientId: string, filters?: InvoiceFilters): Promise<Invoice[]>;
  getInvoiceDetails(invoiceId: string): Promise<Invoice>;
  downloadInvoice(invoiceId: string): Promise<Blob>;
  getInvoiceSummary(clientId: string): Promise<InvoiceSummary>;
}