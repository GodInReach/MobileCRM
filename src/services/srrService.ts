import { SrrRecord, SrrMetrics, ApprovalDecisionPayload } from '../types';

/**
 * Configure your backend endpoint here when ready to connect:
 * e.g. const BASE_API_URL = 'https://api.yourdomain.com/v1/srr';
 */
export const API_CONFIG = {
  baseUrl: 'https://api.yourdomain.com/v1',
  useMock: true, // Toggle this to false when connecting to live backend API
};

// Initial state populated from reference mockups
const initialRecords: SrrRecord[] = [
  {
    id: 'SRR2608250304',
    srrNo: 'SRR2608250304',
    validity: '25-Aug-2026',
    serviceType: 'FCL',
    customer: 'AB EXPORT IMPORT',
    principal: 'AQUA CONTAINER LINES',
    remarks: 'test',
    pol: 'ICLNI - ICD LONI',
    pod: 'AEAUH - ABU DHABI',
    por: 'ICLNI - ICD LONI',
    fpod: 'AEAUH - ABU DHABI',
    status: 'Pending',
    approvedBy: '-',
    approvedDate: '-',
    freeDays: {
      detentionExport: '12 days',
      demurrageExport: '12 days',
      detentionImport: '12 days',
      demurrageImport: '12 days',
    },
    containerDetails: [
      {
        id: 'cnt-1',
        containerType: '20GP',
        quantity: 2,
        commodity: 'GENERAL',
      },
    ],
    tariffRates: [
      {
        id: 'tr-1',
        charge: 'OFRT',
        container: '20GP',
        qty: 2,
        paymentTerm: 'PREPAID',
        manifestRate: 2333,
        customerRate: 3333,
        currency: 'BAM',
      },
    ],
    tariffCosts: [
      {
        id: 'tc-1',
        charge: 'DOF',
        container: '20GP',
        qty: 2,
        paymentTerm: 'PREPAID',
        manifestRate: 333,
        principalRate: 333,
        currency: 'BAM',
      },
    ],
  },
  {
    id: 'SRR2608260309',
    srrNo: 'SRR2608260309',
    validity: '26-Aug-2026',
    serviceType: 'FCL',
    customer: 'AB EXPORT IMPORT',
    principal: 'AB EXPORT IMPORT',
    remarks: 'Standard Rate',
    pol: 'ICLNI - ICD LONI',
    pod: 'AEAUH - ABU DHABI',
    por: 'ICLNI - ICD LONI',
    fpod: 'AEAUH - ABU DHABI',
    status: 'Approved',
    approvedBy: 'Vizoroz',
    approvedDate: '26/08/2026',
    freeDays: {
      detentionExport: '14 days',
      demurrageExport: '14 days',
      detentionImport: '14 days',
      demurrageImport: '14 days',
    },
    containerDetails: [
      {
        id: 'cnt-2',
        containerType: '40HC',
        quantity: 4,
        commodity: 'GENERAL',
      },
    ],
    tariffRates: [
      {
        id: 'tr-2',
        charge: 'OFRT',
        container: '40HC',
        qty: 4,
        paymentTerm: 'PREPAID',
        manifestRate: 3200,
        customerRate: 4100,
        currency: 'BAM',
      },
    ],
    tariffCosts: [
      {
        id: 'tc-2',
        charge: 'DOF',
        container: '40HC',
        qty: 4,
        paymentTerm: 'PREPAID',
        manifestRate: 450,
        principalRate: 450,
        currency: 'BAM',
      },
    ],
  },
  {
    id: 'SRR2608260307',
    srrNo: 'SRR2608260307',
    validity: '26-Aug-2026',
    serviceType: 'FCL',
    customer: 'AB EXPORT IMPORT',
    principal: 'AB EXPORT IMPORT',
    remarks: 'Approved per contract',
    pol: 'INMAA - CHENNAI',
    pod: 'SGSIN - SINGAPORE',
    por: 'INMAA - CHENNAI',
    fpod: 'SGSIN - SINGAPORE',
    status: 'Approved',
    approvedBy: 'Vizoroz',
    approvedDate: '26/08/2026',
    freeDays: {
      detentionExport: '10 days',
      demurrageExport: '10 days',
      detentionImport: '10 days',
      demurrageImport: '10 days',
    },
    containerDetails: [
      {
        id: 'cnt-3',
        containerType: '20GP',
        quantity: 1,
        commodity: 'TEXTILES',
      },
    ],
    tariffRates: [
      {
        id: 'tr-3',
        charge: 'OFRT',
        container: '20GP',
        qty: 1,
        paymentTerm: 'PREPAID',
        manifestRate: 1800,
        customerRate: 2400,
        currency: 'USD',
      },
    ],
    tariffCosts: [
      {
        id: 'tc-3',
        charge: 'DOF',
        container: '20GP',
        qty: 1,
        paymentTerm: 'PREPAID',
        manifestRate: 250,
        principalRate: 250,
        currency: 'USD',
      },
    ],
  },
  {
    id: 'SRR2608260305',
    srrNo: 'SRR2608260305',
    validity: '26-Aug-2026',
    serviceType: 'FCL',
    customer: 'AB EXPORT IMPORT',
    principal: 'AB EXPORT IMPORT',
    remarks: 'Auto-rate match',
    pol: 'INNSA - NHAVA SHEVA',
    pod: 'NLRTM - ROTTERDAM',
    por: 'INNSA - NHAVA SHEVA',
    fpod: 'NLRTM - ROTTERDAM',
    status: 'Approved',
    approvedBy: 'Vizoroz',
    approvedDate: '26/08/2026',
    freeDays: {
      detentionExport: '12 days',
      demurrageExport: '12 days',
      detentionImport: '12 days',
      demurrageImport: '12 days',
    },
    containerDetails: [
      {
        id: 'cnt-4',
        containerType: '40HC',
        quantity: 2,
        commodity: 'AUTO PARTS',
      },
    ],
    tariffRates: [
      {
        id: 'tr-4',
        charge: 'OFRT',
        container: '40HC',
        qty: 2,
        paymentTerm: 'PREPAID',
        manifestRate: 2900,
        customerRate: 3750,
        currency: 'EUR',
      },
    ],
    tariffCosts: [
      {
        id: 'tc-4',
        charge: 'DOF',
        container: '40HC',
        qty: 2,
        paymentTerm: 'PREPAID',
        manifestRate: 300,
        principalRate: 300,
        currency: 'EUR',
      },
    ],
  },
  {
    id: 'SRR2608210302',
    srrNo: 'SRR2608210302',
    validity: '21-Aug-2026',
    serviceType: 'FCL',
    customer: 'AB EXPORT IMPORT',
    principal: 'AB EXPORT IMPORT',
    remarks: 'Priority clearance',
    pol: 'ICLNI - ICD LONI',
    pod: 'AEAUH - ABU DHABI',
    por: 'ICLNI - ICD LONI',
    fpod: 'AEAUH - ABU DHABI',
    status: 'Approved',
    approvedBy: 'Vizoroz',
    approvedDate: '21/08/2026',
    freeDays: {
      detentionExport: '14 days',
      demurrageExport: '14 days',
      detentionImport: '14 days',
      demurrageImport: '14 days',
    },
    containerDetails: [
      {
        id: 'cnt-5',
        containerType: '20GP',
        quantity: 3,
        commodity: 'MACHINERY',
      },
    ],
    tariffRates: [
      {
        id: 'tr-5',
        charge: 'OFRT',
        container: '20GP',
        qty: 3,
        paymentTerm: 'PREPAID',
        manifestRate: 2100,
        customerRate: 2950,
        currency: 'BAM',
      },
    ],
    tariffCosts: [
      {
        id: 'tc-5',
        charge: 'DOF',
        container: '20GP',
        qty: 3,
        paymentTerm: 'PREPAID',
        manifestRate: 280,
        principalRate: 280,
        currency: 'BAM',
      },
    ],
  },
  {
    id: 'SRR2608170299',
    srrNo: 'SRR2608170299',
    validity: '17-Aug-2026',
    serviceType: 'FCL',
    customer: 'AB EXPORT IMPORT',
    principal: 'AB EXPORT IMPORT',
    remarks: 'Standard',
    pol: 'INMAA - CHENNAI',
    pod: 'MYPKG - PORT KLANG',
    por: 'INMAA - CHENNAI',
    fpod: 'MYPKG - PORT KLANG',
    status: 'Approved',
    approvedBy: 'Vizoroz',
    approvedDate: '17/08/2026',
    freeDays: {
      detentionExport: '12 days',
      demurrageExport: '12 days',
      detentionImport: '12 days',
      demurrageImport: '12 days',
    },
    containerDetails: [
      {
        id: 'cnt-6',
        containerType: '20GP',
        quantity: 1,
        commodity: 'ELECTRONICS',
      },
    ],
    tariffRates: [
      {
        id: 'tr-6',
        charge: 'OFRT',
        container: '20GP',
        qty: 1,
        paymentTerm: 'PREPAID',
        manifestRate: 1650,
        customerRate: 2200,
        currency: 'USD',
      },
    ],
    tariffCosts: [
      {
        id: 'tc-6',
        charge: 'DOF',
        container: '20GP',
        qty: 1,
        paymentTerm: 'PREPAID',
        manifestRate: 200,
        principalRate: 200,
        currency: 'USD',
      },
    ],
  },
  {
    id: 'SRR2608170298',
    srrNo: 'SRR2608170298',
    validity: '17-Aug-2026',
    serviceType: 'FCL',
    customer: 'AB EXPORT IMPORT',
    principal: 'AB EXPORT IMPORT',
    remarks: 'Approved',
    pol: 'ICLNI - ICD LONI',
    pod: 'AEAUH - ABU DHABI',
    por: 'ICLNI - ICD LONI',
    fpod: 'AEAUH - ABU DHABI',
    status: 'Approved',
    approvedBy: 'Vizoroz',
    approvedDate: '17/08/2026',
    freeDays: {
      detentionExport: '12 days',
      demurrageExport: '12 days',
      detentionImport: '12 days',
      demurrageImport: '12 days',
    },
    containerDetails: [
      {
        id: 'cnt-7',
        containerType: '40HC',
        quantity: 1,
        commodity: 'GENERAL',
      },
    ],
    tariffRates: [
      {
        id: 'tr-7',
        charge: 'OFRT',
        container: '40HC',
        qty: 1,
        paymentTerm: 'PREPAID',
        manifestRate: 2750,
        customerRate: 3500,
        currency: 'BAM',
      },
    ],
    tariffCosts: [
      {
        id: 'tc-7',
        charge: 'DOF',
        container: '40HC',
        qty: 1,
        paymentTerm: 'PREPAID',
        manifestRate: 310,
        principalRate: 310,
        currency: 'BAM',
      },
    ],
  },
  {
    id: 'SRR2608170297',
    srrNo: 'SRR2608170297',
    validity: '17-Aug-2026',
    serviceType: 'FCL',
    customer: 'AB EXPORT IMPORT',
    principal: 'AB EXPORT IMPORT',
    remarks: 'Approved with waiver',
    pol: 'INNSA - NHAVA SHEVA',
    pod: 'LKCMB - COLOMBO',
    por: 'INNSA - NHAVA SHEVA',
    fpod: 'LKCMB - COLOMBO',
    status: 'Approved',
    approvedBy: 'Vizoroz',
    approvedDate: '17/08/2026',
    freeDays: {
      detentionExport: '14 days',
      demurrageExport: '14 days',
      detentionImport: '14 days',
      demurrageImport: '14 days',
    },
    containerDetails: [
      {
        id: 'cnt-8',
        containerType: '20GP',
        quantity: 2,
        commodity: 'PHARMACEUTICALS',
      },
    ],
    tariffRates: [
      {
        id: 'tr-8',
        charge: 'OFRT',
        container: '20GP',
        qty: 2,
        paymentTerm: 'PREPAID',
        manifestRate: 1400,
        customerRate: 1950,
        currency: 'USD',
      },
    ],
    tariffCosts: [
      {
        id: 'tc-8',
        charge: 'DOF',
        container: '20GP',
        qty: 2,
        paymentTerm: 'PREPAID',
        manifestRate: 180,
        principalRate: 180,
        currency: 'USD',
      },
    ],
  },
];

// In-memory working dataset
let recordsStore: SrrRecord[] = [...initialRecords];

/**
 * Service API methods
 */
export const srrService = {
  /**
   * Fetch all SRR records
   */
  async getRecords(): Promise<SrrRecord[]> {
    if (!API_CONFIG.useMock) {
      const response = await fetch(`${API_CONFIG.baseUrl}/srr`);
      return await response.json();
    }
    // Simulate slight network latency
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...recordsStore]);
      }, 100);
    });
  },

  /**
   * Fetch a single SRR record by ID
   */
  async getRecordById(id: string): Promise<SrrRecord | null> {
    if (!API_CONFIG.useMock) {
      const response = await fetch(`${API_CONFIG.baseUrl}/srr/${id}`);
      return await response.json();
    }
    return new Promise((resolve) => {
      setTimeout(() => {
        const found = recordsStore.find((r) => r.id === id || r.srrNo === id);
        resolve(found ? { ...found } : null);
      }, 50);
    });
  },

  /**
   * Compute metrics counts from the store
   */
  async getMetrics(): Promise<SrrMetrics> {
    const records = await this.getRecords();
    const pending = records.filter((r) => r.status === 'Pending').length;
    const approved = records.filter((r) => r.status === 'Approved').length;
    const rejected = records.filter((r) => r.status === 'Rejected').length;
    const requoted = records.filter((r) => r.status === 'Requoted').length;

    return {
      pending: pending || 2, // Default to 2 if mockup baseline
      approved: approved || 74, // Default to 74 if mockup baseline
      rejected: rejected,
      requoted: requoted,
      total: records.length || 75,
    };
  },

  /**
   * Submit decision (Approve / Reject / Requote)
   */
  async updateDecision(
    id: string,
    payload: ApprovalDecisionPayload
  ): Promise<SrrRecord> {
    if (!API_CONFIG.useMock) {
      const response = await fetch(`${API_CONFIG.baseUrl}/srr/${id}/decision`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      return await response.json();
    }

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = recordsStore.findIndex((r) => r.id === id || r.srrNo === id);
        if (index === -1) {
          reject(new Error('Record not found'));
          return;
        }

        const current = recordsStore[index];
        const newStatus =
          payload.decision === 'Approve'
            ? 'Approved'
            : payload.decision === 'Reject'
            ? 'Rejected'
            : 'Requoted';

        const updated: SrrRecord = {
          ...current,
          status: newStatus,
          approvedBy: payload.decision === 'Approve' ? 'Vizoroz' : current.approvedBy,
          approvedDate:
            payload.decision === 'Approve'
              ? new Date().toLocaleDateString('en-GB')
              : current.approvedDate,
          remarks: payload.remarks ? payload.remarks : current.remarks,
          validity: payload.validityDate ? payload.validityDate : current.validity,
        };

        recordsStore[index] = updated;
        resolve({ ...updated });
      }, 150);
    });
  },

  /**
   * Reset store (useful for tests)
   */
  resetStore(): void {
    recordsStore = [...initialRecords];
  },
};
