export interface User {
  name: string;
  email: string;
  location: string;
  branch: string;
  avatar?: any;
}

export interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

export type DashboardRoute = 'Home' | 'SSR Approval';

export type SrrStatus = 'Pending' | 'Approved' | 'Rejected' | 'Requoted';

export interface FreeDays {
  detentionExport: string;
  demurrageExport: string;
  detentionImport: string;
  demurrageImport: string;
}

export interface ContainerDetail {
  id: string;
  containerType: string;
  quantity: number;
  commodity: string;
}

export interface TariffRate {
  id: string;
  charge: string;
  container: string;
  qty: number;
  paymentTerm: string;
  manifestRate: number;
  customerRate: number;
  currency: string;
}

export interface TariffCost {
  id: string;
  charge: string;
  container: string;
  qty: number;
  paymentTerm: string;
  manifestRate: number;
  principalRate: number;
  currency: string;
}

export interface SrrRecord {
  id: string;
  srrNo: string;
  validity: string;
  serviceType: string;
  customer: string;
  principal: string;
  remarks: string;
  pol: string; // Port of Loading
  pod: string; // Port of Discharge
  por: string; // Place of Receipt
  fpod: string; // Final Place of Delivery
  status: SrrStatus;
  approvedBy?: string;
  approvedDate?: string;
  freeDays: FreeDays;
  containerDetails: ContainerDetail[];
  tariffRates: TariffRate[];
  tariffCosts: TariffCost[];
}

export interface ApprovalDecisionPayload {
  decision: 'Approve' | 'Reject' | 'Requote';
  remarks?: string;
  validityDate?: string;
}

export interface SrrMetrics {
  pending: number;
  approved: number;
  rejected: number;
  requoted: number;
  total: number;
}
