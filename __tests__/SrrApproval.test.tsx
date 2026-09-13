import 'react-native';
import React from 'react';
import ReactTestRenderer, { act } from 'react-test-renderer';
import { srrService } from '../src/services/srrService';
import { SsrApprovalScreen } from '../src/screens/dashboard/SsrApprovalScreen';
import { SrrDetailModal } from '../src/screens/dashboard/srr/SrrDetailModal';
import { SrrRecord } from '../src/types';

// Helper to extract all text strings from a react-test-renderer instance
function getAllText(root: ReactTestRenderer.ReactTestInstance): string {
  const texts = root.findAllByType('Text' as any);
  return texts.map((t) => (Array.isArray(t.props.children) ? t.props.children.join(' ') : String(t.props.children || ''))).join(' ');
}

describe('SRR Approval Service & Mobile UI', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    srrService.resetStore();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('srrService API Layer', () => {
    it('fetches records matching reference seed data', async () => {
      const recordsPromise = srrService.getRecords();
      jest.runAllTimers();
      const records = await recordsPromise;

      expect(records.length).toBeGreaterThan(0);
      const sample = records.find((r) => r.srrNo === 'SRR2608250304');
      expect(sample).toBeDefined();
      expect(sample?.customer).toBe('AB EXPORT IMPORT');
      expect(sample?.principal).toBe('AQUA CONTAINER LINES');
      expect(sample?.pol).toBe('ICLNI - ICD LONI');
      expect(sample?.pod).toBe('AEAUH - ABU DHABI');
    });

    it('computes metrics counts accurately', async () => {
      const metricsPromise = srrService.getMetrics();
      jest.runAllTimers();
      const metrics = await metricsPromise;

      expect(metrics.total).toBeGreaterThan(0);
      expect(metrics.pending).toBeDefined();
      expect(metrics.approved).toBeDefined();
    });

    it('updates approval decision to Approved, Rejected, and Requoted', async () => {
      // Approve
      const approvePromise = srrService.updateDecision('SRR2608250304', {
        decision: 'Approve',
      });
      jest.runAllTimers();
      const approvedRecord = await approvePromise;
      expect(approvedRecord.status).toBe('Approved');
      expect(approvedRecord.approvedBy).toBe('Vizoroz');

      // Reject
      const rejectPromise = srrService.updateDecision('SRR2608250304', {
        decision: 'Reject',
        remarks: 'Exceeds budget',
      });
      jest.runAllTimers();
      const rejectedRecord = await rejectPromise;
      expect(rejectedRecord.status).toBe('Rejected');
      expect(rejectedRecord.remarks).toBe('Exceeds budget');

      // Requote
      const requotePromise = srrService.updateDecision('SRR2608250304', {
        decision: 'Requote',
        validityDate: '30-Aug-2026',
      });
      jest.runAllTimers();
      const requotedRecord = await requotePromise;
      expect(requotedRecord.status).toBe('Requoted');
      expect(requotedRecord.validity).toBe('30-Aug-2026');
    });
  });

  describe('SsrApprovalScreen Rendering', () => {
    it('renders the header, metrics, search bar, and records', async () => {
      let tree: ReactTestRenderer.ReactTestRenderer;

      await act(async () => {
        tree = ReactTestRenderer.create(<SsrApprovalScreen />);
      });

      await act(async () => {
        jest.runAllTimers();
      });

      const text = getAllText(tree!.root);
      expect(text).toContain('SRR Approval');
      expect(text).toContain('PENDING');
      expect(text).toContain('APPROVED');
      expect(text).toContain('REJECTED');
      expect(text).toContain('REQUOTED');
      expect(text).toContain('All Records');
      expect(text).toContain('SRR2608250304');
    });

    it('opens detail modal when a record card is pressed', async () => {
      let tree: ReactTestRenderer.ReactTestRenderer;

      await act(async () => {
        tree = ReactTestRenderer.create(<SsrApprovalScreen />);
      });

      await act(async () => {
        jest.runAllTimers();
      });

      // Find the touchable for record SRR2608250304
      const recordCard = tree!.root.findByProps({ testID: 'srr-record-SRR2608250304' });
      expect(recordCard).toBeDefined();

      await act(async () => {
        recordCard.props.onPress();
      });

      const text = getAllText(tree!.root);
      expect(text).toContain('Container Details');
      expect(text).toContain('Tariff Rates');
      expect(text).toContain('Tariff Costs');
      expect(text).toContain('Approval Decision');
      expect(text).toContain('Approve');
      expect(text).toContain('Reject');
      expect(text).toContain('Requote');
    });
  });

  describe('SrrDetailModal Component', () => {
    it('renders all sections and action buttons correctly', async () => {
      const mockRecord: SrrRecord = {
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
      };

      const onDecisionMock = jest.fn().mockResolvedValue(undefined);
      const onCloseMock = jest.fn();

      let tree: ReactTestRenderer.ReactTestRenderer;
      await act(async () => {
        tree = ReactTestRenderer.create(
          <SrrDetailModal
            visible={true}
            record={mockRecord}
            onClose={onCloseMock}
            onDecision={onDecisionMock}
          />
        );
      });

      const text = getAllText(tree!.root);
      expect(text).toContain('SRR2608250304');
      expect(text).toContain('25-Aug-2026');
      expect(text).toContain('AQUA CONTAINER LINES');
      expect(text).toContain('Free Days');
      expect(text).toContain('12 days');
      expect(text).toContain('Container Details');
      expect(text).toContain('20GP');
      expect(text).toContain('GENERAL');
      expect(text).toContain('OFRT');
      expect(text).toContain('3333');
      expect(text).toContain('DOF');
      expect(text).toContain('333');
      expect(text).toContain('Approval Decision');

      // Trigger Approve action
      const approveBtn = tree!.root.findByProps({ testID: 'btn-approve' });
      await act(async () => {
        approveBtn.props.onPress();
        jest.runAllTimers();
      });

      expect(onDecisionMock).toHaveBeenCalledWith('SRR2608250304', {
        decision: 'Approve',
        remarks: undefined,
        validityDate: '25-Aug-2026',
      });
    });
  });
});
