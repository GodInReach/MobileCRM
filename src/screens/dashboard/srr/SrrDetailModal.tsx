import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useAppInsets } from '../../../hooks/useAppInsets';
import {
  CloseIcon,
  ClipboardCheckIcon,
  CheckmarkIcon,
  TimesCircleIcon,
  RequoteIcon,
  CalendarIcon,
  EditPenIcon,
  PinSmallIcon,
} from '../../../components/icons/VectorIcons';
import { SrrRecord, ApprovalDecisionPayload } from '../../../types';
import { colors, typography, spacing, borderRadius, shadows } from '../../../theme';

interface SrrDetailModalProps {
  visible: boolean;
  record: SrrRecord | null;
  onClose: () => void;
  onDecision: (id: string, payload: ApprovalDecisionPayload) => Promise<void>;
}

export const SrrDetailModal: React.FC<SrrDetailModalProps> = ({
  visible,
  record,
  onClose,
  onDecision,
}) => {
  const insets = useAppInsets();

  const [remarks, setRemarks] = useState('');
  const [validityDate, setValidityDate] = useState('25-Aug-2026');

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!record) return null;

  const handleAction = async (decision: 'Approve' | 'Reject' | 'Requote') => {
    if (decision === 'Reject' && !remarks.trim()) {
      Alert.alert('Remarks Required', 'Please enter remarks for rejecting the SRR.');
      return;
    }

    try {
      setIsSubmitting(true);
      await onDecision(record.id, {
        decision,
        remarks: remarks.trim() || undefined,
        validityDate: validityDate.trim() || undefined,
      });
      onClose();
    } catch (err) {
      Alert.alert('Error', `Failed to ${decision.toLowerCase()} the SRR.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
      transparent={false}
    >
      <View style={styles.safeContainer}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.keyboardContainer}
        >
          {/* Top Green Enterprise Header */}
          <View style={[styles.headerBar, { paddingTop: insets.top, height: 54 + insets.top }]}>
            <View style={styles.headerLeft}>
              <ClipboardCheckIcon size={20} color="#FFFFFF" />
              <Text style={styles.headerTitle}>SRR Approval</Text>
            </View>
            <TouchableOpacity
              testID="close-detail-modal"
              style={styles.closeBtn}
              onPress={onClose}
              activeOpacity={0.7}
            >
              <CloseIcon size={18} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          {/* Scrollable Content */}
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={[
              styles.scrollContent,
              { paddingBottom: insets.bottom + 32 },
            ]}
            showsVerticalScrollIndicator={false}
          >
            {/* 1. Purple Gradient Hero Info Card */}
            <View style={styles.purpleCard}>
              {/* Primary SRR & Date Row */}
              <View style={styles.heroTopRow}>
                <View style={styles.heroItem}>
                  <Text style={styles.heroLabel}>📋 SRR Number</Text>
                  <Text style={styles.heroSrrNumber}>{record.srrNo}</Text>
                </View>
                <View style={styles.heroItem}>
                  <Text style={styles.heroLabel}>📅 Validity</Text>
                  <Text style={styles.heroValue}>{record.validity}</Text>
                </View>
                <View style={styles.heroItem}>
                  <Text style={styles.heroLabel}>📦 Service Type</Text>
                  <Text style={styles.heroValue}>{record.serviceType}</Text>
                </View>
              </View>

              {/* Customer & Principal Row */}
              <View style={styles.heroGridRow}>
                <View style={styles.heroItemFlex}>
                  <Text style={styles.heroLabel}>👤 Customer</Text>
                  <Text style={styles.heroValue} numberOfLines={1}>
                    {record.customer}
                  </Text>
                </View>
                <View style={styles.heroItemFlex}>
                  <Text style={styles.heroLabel}>🏛️ Principal</Text>
                  <Text style={styles.heroValue} numberOfLines={1}>
                    {record.principal}
                  </Text>
                </View>
                <View style={styles.heroItem}>
                  <Text style={styles.heroLabel}>📝 Remarks</Text>
                  <View style={styles.remarksPill}>
                    <Text style={styles.remarksPillText}>{record.remarks || 'None'}</Text>
                  </View>
                </View>
              </View>

              {/* Routing Row (POL, POD, POR, FPOD) */}
              <View style={styles.routingContainer}>
                <View style={styles.routeItem}>
                  <View style={styles.portLabelRow}>
                    <PinSmallIcon size={12} color="#93C5FD" />
                    <Text style={styles.routeLabel}>POL</Text>
                  </View>
                  <Text style={styles.routeValue}>{record.pol}</Text>
                </View>

                <View style={styles.routeItem}>
                  <View style={styles.portLabelRow}>
                    <PinSmallIcon size={12} color="#93C5FD" />
                    <Text style={styles.routeLabel}>POD</Text>
                  </View>
                  <Text style={styles.routeValue}>{record.pod}</Text>
                </View>
              </View>

              <View style={styles.routingContainer}>
                <View style={styles.routeItem}>
                  <View style={styles.portLabelRow}>
                    <PinSmallIcon size={12} color="#93C5FD" />
                    <Text style={styles.routeLabel}>POR</Text>
                  </View>
                  <Text style={styles.routeValue}>{record.por}</Text>
                </View>

                <View style={styles.routeItem}>
                  <View style={styles.portLabelRow}>
                    <PinSmallIcon size={12} color="#93C5FD" />
                    <Text style={styles.routeLabel}>FPOD</Text>
                  </View>
                  <Text style={styles.routeValue}>{record.fpod}</Text>
                </View>
              </View>

              {/* Free Days Sub-section */}
              <View style={styles.freeDaysSection}>
                <Text style={styles.freeDaysTitle}>🕒 Free Days</Text>
                <View style={styles.freeDaysGrid}>
                  <View style={styles.freeDaysChip}>
                    <Text style={styles.freeDaysType}>Detention (Export)</Text>
                    <Text style={styles.freeDaysValue}>
                      {record.freeDays.detentionExport}
                    </Text>
                  </View>
                  <View style={styles.freeDaysChip}>
                    <Text style={styles.freeDaysType}>Demurrage (Export)</Text>
                    <Text style={styles.freeDaysValue}>
                      {record.freeDays.demurrageExport}
                    </Text>
                  </View>
                  <View style={styles.freeDaysChip}>
                    <Text style={styles.freeDaysType}>Detention (Import)</Text>
                    <Text style={styles.freeDaysValue}>
                      {record.freeDays.detentionImport}
                    </Text>
                  </View>
                  <View style={styles.freeDaysChip}>
                    <Text style={styles.freeDaysType}>Demurrage (Import)</Text>
                    <Text style={styles.freeDaysValue}>
                      {record.freeDays.demurrageImport}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            {/* 2. Container Details Section */}
            <View style={styles.sectionContainer}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Container Details</Text>
                <View style={styles.blackBadge}>
                  <Text style={styles.blackBadgeText}>
                    {record.containerDetails.length} Types
                  </Text>
                </View>
              </View>

              {record.containerDetails.map((cnt) => (
                <View key={cnt.id} style={styles.tableCard}>
                  <View style={styles.dataRow}>
                    <View style={styles.dataCol}>
                      <Text style={styles.dataLabel}>Container Type</Text>
                      <View style={styles.outlinePill}>
                        <Text style={styles.outlinePillText}>{cnt.containerType}</Text>
                      </View>
                    </View>
                    <View style={styles.dataCol}>
                      <Text style={styles.dataLabel}>Quantity</Text>
                      <View style={styles.blackPill}>
                        <Text style={styles.blackPillText}>{cnt.quantity}</Text>
                      </View>
                    </View>
                    <View style={styles.dataCol}>
                      <Text style={styles.dataLabel}>Commodity</Text>
                      <View style={styles.outlinePill}>
                        <Text style={styles.outlinePillText}>{cnt.commodity}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              ))}
            </View>

            {/* 3. Tariff Rates Section */}
            <View style={styles.sectionContainer}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Tariff Rates</Text>
                <View style={styles.greenBadge}>
                  <Text style={styles.greenBadgeText}>
                    {record.tariffRates.length} Items
                  </Text>
                </View>
              </View>

              {record.tariffRates.map((tr) => (
                <View key={tr.id} style={[styles.tableCard, styles.greenBorderCard]}>
                  <View style={styles.dataRow}>
                    <View style={styles.dataCol}>
                      <Text style={styles.dataLabel}>Charge</Text>
                      <Text style={styles.chargeText}>{tr.charge}</Text>
                    </View>
                    <View style={styles.dataCol}>
                      <Text style={styles.dataLabel}>Container</Text>
                      <View style={styles.outlinePill}>
                        <Text style={styles.outlinePillText}>{tr.container}</Text>
                      </View>
                    </View>
                    <View style={styles.dataCol}>
                      <Text style={styles.dataLabel}>Qty</Text>
                      <Text style={styles.plainValueText}>{tr.qty}</Text>
                    </View>
                    <View style={styles.dataCol}>
                      <Text style={styles.dataLabel}>Payment Term</Text>
                      <Text style={styles.termText}>{tr.paymentTerm}</Text>
                    </View>
                  </View>

                  <View style={[styles.dataRow, { marginTop: spacing.sm }]}>
                    <View style={styles.dataCol}>
                      <Text style={styles.dataLabel}>Manifest Rate</Text>
                      <Text style={styles.plainValueText}>{tr.manifestRate}</Text>
                    </View>
                    <View style={styles.dataCol}>
                      <Text style={styles.dataLabel}>Customer Rate</Text>
                      <Text style={styles.customerRateHighlight}>
                        {tr.customerRate}
                      </Text>
                    </View>
                    <View style={styles.dataCol}>
                      <Text style={styles.dataLabel}>Currency</Text>
                      <View style={styles.currencyBadge}>
                        <Text style={styles.currencyBadgeText}>{tr.currency}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              ))}
            </View>

            {/* 4. Tariff Costs Section */}
            <View style={styles.sectionContainer}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Tariff Costs</Text>
                <View style={styles.redBadge}>
                  <Text style={styles.redBadgeText}>
                    {record.tariffCosts.length} Items
                  </Text>
                </View>
              </View>

              {record.tariffCosts.map((tc) => (
                <View key={tc.id} style={[styles.tableCard, styles.redBorderCard]}>
                  <View style={styles.dataRow}>
                    <View style={styles.dataCol}>
                      <Text style={styles.dataLabel}>Charge</Text>
                      <Text style={styles.chargeText}>{tc.charge}</Text>
                    </View>
                    <View style={styles.dataCol}>
                      <Text style={styles.dataLabel}>Container</Text>
                      <View style={styles.outlinePill}>
                        <Text style={styles.outlinePillText}>{tc.container}</Text>
                      </View>
                    </View>
                    <View style={styles.dataCol}>
                      <Text style={styles.dataLabel}>Qty</Text>
                      <Text style={styles.plainValueText}>{tc.qty}</Text>
                    </View>
                    <View style={styles.dataCol}>
                      <Text style={styles.dataLabel}>Payment Term</Text>
                      <Text style={styles.termText}>{tc.paymentTerm}</Text>
                    </View>
                  </View>

                  <View style={[styles.dataRow, { marginTop: spacing.sm }]}>
                    <View style={styles.dataCol}>
                      <Text style={styles.dataLabel}>Manifest Rate</Text>
                      <Text style={styles.plainValueText}>{tc.manifestRate}</Text>
                    </View>
                    <View style={styles.dataCol}>
                      <Text style={styles.dataLabel}>Principal Rate</Text>
                      <Text style={styles.principalRateHighlight}>
                        {tc.principalRate}
                      </Text>
                    </View>
                    <View style={styles.dataCol}>
                      <Text style={styles.dataLabel}>Currency</Text>
                      <View style={styles.currencyBadge}>
                        <Text style={styles.currencyBadgeText}>{tc.currency}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              ))}
            </View>

            {/* 5. Approval Decision Section */}
            <View style={styles.decisionCard}>
              <View style={styles.decisionHeader}>
                <EditPenIcon size={16} color="#D97706" />
                <Text style={styles.decisionTitle}>Approval Decision</Text>
              </View>

              {/* Remarks Field */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Remarks</Text>
                <TextInput
                  testID="decision-remarks-input"
                  style={styles.textArea}
                  placeholder="Enter remarks here..."
                  placeholderTextColor="#94A3B8"
                  value={remarks}
                  onChangeText={setRemarks}
                  multiline
                />
                <Text style={styles.helperText}>
                  ℹ️ Required for REJECT action
                </Text>
              </View>

              {/* Validity Date Field */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Validity Date</Text>
                <View style={styles.dateInputWrapper}>
                  <TextInput
                    testID="decision-validity-input"
                    style={styles.dateInput}
                    value={validityDate}
                    onChangeText={setValidityDate}
                    placeholder="dd-mm-yyyy"
                    placeholderTextColor="#94A3B8"
                  />
                  <CalendarIcon size={18} color="#64748B" />
                </View>
                <Text style={styles.helperText}>
                  ℹ️ Required for REQUOTE action (Max 15 days from today)
                </Text>
              </View>
            </View>

            {/* Bottom Action Buttons */}
            <View style={styles.actionsBar}>
              <TouchableOpacity
                testID="btn-approve"
                style={[styles.actionBtn, styles.approveBtn]}
                onPress={() => handleAction('Approve')}
                disabled={isSubmitting}
                activeOpacity={0.8}
              >
                <CheckmarkIcon size={14} color="#FFFFFF" />
                <Text style={styles.btnText}>Approve</Text>
              </TouchableOpacity>

              <TouchableOpacity
                testID="btn-reject"
                style={[styles.actionBtn, styles.rejectBtn]}
                onPress={() => handleAction('Reject')}
                disabled={isSubmitting}
                activeOpacity={0.8}
              >
                <TimesCircleIcon size={14} color="#FFFFFF" />
                <Text style={styles.btnText}>Reject</Text>
              </TouchableOpacity>

              <TouchableOpacity
                testID="btn-requote"
                style={[styles.actionBtn, styles.requoteBtn]}
                onPress={() => handleAction('Requote')}
                disabled={isSubmitting}
                activeOpacity={0.8}
              >
                <RequoteIcon size={14} color="#FFFFFF" />
                <Text style={styles.btnText}>Requote</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );

};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  keyboardContainer: {
    flex: 1,
  },
  headerBar: {
    height: 52,
    backgroundColor: '#16A34A',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  headerTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
  closeBtn: {
    padding: spacing.xs,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    padding: spacing.md,
    paddingBottom: 40,
  },
  purpleCard: {
    backgroundColor: '#4338CA',
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.base,
    ...shadows.card,
  },
  heroTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  heroGridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  heroItem: {
    justifyContent: 'center',
  },
  heroItemFlex: {
    flex: 1,
    marginRight: spacing.xs,
  },
  heroLabel: {
    fontSize: typography.fontSize.xs,
    color: 'rgba(255, 255, 255, 0.75)',
    marginBottom: 2,
    fontWeight: typography.fontWeight.medium,
  },
  heroSrrNumber: {
    fontSize: typography.fontSize.base + 1,
    fontWeight: typography.fontWeight.black,
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  heroValue: {
    fontSize: typography.fontSize.sm + 1,
    fontWeight: typography.fontWeight.bold,
    color: '#FFFFFF',
  },
  remarksPill: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    alignSelf: 'flex-start',
  },
  remarksPillText: {
    fontSize: typography.fontSize.xs,
    color: '#FFFFFF',
    fontWeight: typography.fontWeight.bold,
  },
  routingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderRadius: borderRadius.md,
    padding: spacing.sm,
    marginBottom: spacing.xs + 2,
  },
  routeItem: {
    flex: 1,
  },
  portLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 2,
  },
  routeLabel: {
    fontSize: typography.fontSize.xs - 1,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: typography.fontWeight.bold,
  },
  routeValue: {
    fontSize: typography.fontSize.xs + 1,
    fontWeight: typography.fontWeight.semiBold,
    color: '#FFFFFF',
  },
  freeDaysSection: {
    marginTop: spacing.sm,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.2)',
  },
  freeDaysTitle: {
    fontSize: typography.fontSize.xs,
    color: 'rgba(255, 255, 255, 0.85)',
    fontWeight: typography.fontWeight.bold,
    marginBottom: spacing.xs,
  },
  freeDaysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  freeDaysChip: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: borderRadius.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    minWidth: '48%',
    flex: 1,
  },
  freeDaysType: {
    fontSize: typography.fontSize.xs - 2,
    color: 'rgba(255, 255, 255, 0.85)',
  },
  freeDaysValue: {
    fontSize: typography.fontSize.xs + 1,
    color: '#FFFFFF',
    fontWeight: typography.fontWeight.bold,
  },
  sectionContainer: {
    marginBottom: spacing.base,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.xs + 2,
  },
  sectionTitle: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
    color: '#0F172A',
  },
  blackBadge: {
    backgroundColor: '#0F172A',
    borderRadius: borderRadius.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
  },
  blackBadgeText: {
    fontSize: typography.fontSize.xs - 1,
    fontWeight: typography.fontWeight.bold,
    color: '#FFFFFF',
  },
  greenBadge: {
    backgroundColor: '#16A34A',
    borderRadius: borderRadius.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
  },
  greenBadgeText: {
    fontSize: typography.fontSize.xs - 1,
    fontWeight: typography.fontWeight.bold,
    color: '#FFFFFF',
  },
  redBadge: {
    backgroundColor: '#DC2626',
    borderRadius: borderRadius.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
  },
  redBadgeText: {
    fontSize: typography.fontSize.xs - 1,
    fontWeight: typography.fontWeight.bold,
    color: '#FFFFFF',
  },
  tableCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.borderLight,
    marginBottom: spacing.xs,
    ...shadows.subtle,
  },
  greenBorderCard: {
    borderLeftWidth: 3.5,
    borderLeftColor: '#16A34A',
  },
  redBorderCard: {
    borderLeftWidth: 3.5,
    borderLeftColor: '#DC2626',
  },
  dataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dataCol: {
    flex: 1,
  },
  dataLabel: {
    fontSize: typography.fontSize.xs - 1,
    color: colors.textPlaceholder,
    marginBottom: 2,
  },
  chargeText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
    color: '#0F172A',
  },
  plainValueText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semiBold,
    color: '#334155',
  },
  termText: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.medium,
    color: '#64748B',
  },
  customerRateHighlight: {
    fontSize: typography.fontSize.sm + 1,
    fontWeight: typography.fontWeight.bold,
    color: '#16A34A',
  },
  principalRateHighlight: {
    fontSize: typography.fontSize.sm + 1,
    fontWeight: typography.fontWeight.bold,
    color: '#EA580C',
  },
  outlinePill: {
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: borderRadius.xs,
    paddingHorizontal: spacing.xs + 2,
    paddingVertical: 1,
    alignSelf: 'flex-start',
  },
  outlinePillText: {
    fontSize: typography.fontSize.xs - 1,
    color: '#475569',
    fontWeight: typography.fontWeight.semiBold,
  },
  blackPill: {
    backgroundColor: '#0F172A',
    borderRadius: borderRadius.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: 1,
    alignSelf: 'flex-start',
  },
  blackPillText: {
    fontSize: typography.fontSize.xs - 1,
    color: '#FFFFFF',
    fontWeight: typography.fontWeight.bold,
  },
  currencyBadge: {
    backgroundColor: '#2563EB',
    borderRadius: borderRadius.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    alignSelf: 'flex-start',
  },
  currencyBadgeText: {
    fontSize: typography.fontSize.xs - 1,
    fontWeight: typography.fontWeight.bold,
    color: '#FFFFFF',
  },
  decisionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    borderWidth: 1.5,
    borderColor: '#F59E0B',
    marginBottom: spacing.base,
    ...shadows.subtle,
  },
  decisionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: spacing.md,
  },
  decisionTitle: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
    color: '#D97706',
  },
  inputGroup: {
    marginBottom: spacing.md,
  },
  inputLabel: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semiBold,
    color: '#334155',
    marginBottom: spacing.xs,
  },
  textArea: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: borderRadius.md,
    padding: spacing.sm + 2,
    minHeight: 50,
    fontSize: typography.fontSize.sm + 1,
    color: '#0F172A',
    textAlignVertical: 'top',
  },
  dateInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    height: 44,
  },
  dateInput: {
    flex: 1,
    fontSize: typography.fontSize.sm + 1,
    color: '#0F172A',
  },
  helperText: {
    fontSize: typography.fontSize.xs - 1,
    color: '#64748B',
    marginTop: 4,
  },
  actionsBar: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  actionBtn: {
    flex: 1,
    height: 44,
    borderRadius: borderRadius.md,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.xs,
    ...shadows.subtle,
  },
  approveBtn: {
    backgroundColor: '#16A34A',
  },
  rejectBtn: {
    backgroundColor: '#DC2626',
  },
  requoteBtn: {
    backgroundColor: '#D97706',
  },
  btnText: {
    fontSize: typography.fontSize.sm + 1,
    fontWeight: typography.fontWeight.bold,
    color: '#FFFFFF',
  },
});
