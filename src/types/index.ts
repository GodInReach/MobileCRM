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

export interface SsrApprovalItem {
  id: string;
  vesselName: string;
  voyageNumber: string;
  shipper: string;
  cargoType: string;
  containersCount: number;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Under Review';
  requestDate: string;
  destinationPort: string;
  originPort: string;
}
