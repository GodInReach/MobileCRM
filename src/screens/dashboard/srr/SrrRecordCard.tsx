import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ChevronRightIcon } from '../../../components/icons/VectorIcons';
import { SrrRecord } from '../../../types';
import { colors, typography, spacing, borderRadius, shadows } from '../../../theme';

interface SrrRecordCardProps {
  record: SrrRecord;
  onPress: (record: SrrRecord) => void;
}

export const SrrRecordCard: React.FC<SrrRecordCardProps> = ({ record, onPress }) => {
  const getStatusBadge = () => {
    switch (record.status) {
      case 'Approved':
        return {
          bg: '#DCFCE7',
          text: '#15803D',
          border: '#86EFAC',
        };
      case 'Pending':
        return {
          bg: '#E2E8F0',
          text: '#334155',
          border: '#CBD5E1',
        };
      case 'Rejected':
        return {
          bg: '#FEE2E2',
          text: '#B91C1C',
          border: '#FCA5A5',
        };
      case 'Requoted':
        return {
          bg: '#FEF3C7',
          text: '#B45309',
          border: '#FCD34D',
        };
    }
  };

  const statusStyle = getStatusBadge();

  return (
    <TouchableOpacity
      testID={`srr-record-${record.id}`}
      style={styles.card}
      onPress={() => onPress(record)}
      activeOpacity={0.7}
    >
      {/* Top Header: SRR Number & Status Badge */}
      <View style={styles.cardHeader}>
        <View style={styles.srrNumberContainer}>
          <Text style={styles.srrNumberText}>{record.srrNo}</Text>
        </View>
        <View style={styles.headerRight}>
          <View
            style={[
              styles.statusBadge,
              {
                backgroundColor: statusStyle.bg,
                borderColor: statusStyle.border,
              },
            ]}
          >
            <Text style={[styles.statusBadgeText, { color: statusStyle.text }]}>
              {record.status}
            </Text>
          </View>
          <ChevronRightIcon size={14} color="#94A3B8" />
        </View>
      </View>

      <View style={styles.divider} />

      {/* Card Details Grid */}
      <View style={styles.detailsGrid}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Principal</Text>
          <Text style={styles.detailValue} numberOfLines={1}>
            {record.principal}
          </Text>
        </View>

        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Service Type</Text>
          <View style={styles.serviceTypeBadge}>
            <Text style={styles.serviceTypeText}>{record.serviceType}</Text>
          </View>
        </View>
      </View>

      <View style={styles.detailsGrid}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Approved By</Text>
          <Text style={styles.detailValue} numberOfLines={1}>
            {record.approvedBy || '-'}
          </Text>
        </View>

        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Approved Date</Text>
          <Text style={styles.detailValue}>
            {record.approvedDate || '-'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.borderLight,
    ...shadows.subtle,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  srrNumberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  srrNumberText: {
    fontSize: typography.fontSize.base + 1,
    fontWeight: typography.fontWeight.bold,
    color: '#0F172A',
    letterSpacing: 0.3,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  statusBadge: {
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: 3,
    borderRadius: borderRadius.full,
    borderWidth: 1,
  },
  statusBadgeText: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.bold,
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: spacing.sm + 2,
  },
  detailsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xs + 2,
  },
  detailItem: {
    flex: 1,
  },
  detailLabel: {
    fontSize: typography.fontSize.xs,
    color: colors.textPlaceholder,
    marginBottom: 2,
    fontWeight: typography.fontWeight.medium,
  },
  detailValue: {
    fontSize: typography.fontSize.sm + 1,
    color: colors.textPrimary,
    fontWeight: typography.fontWeight.semiBold,
  },
  serviceTypeBadge: {
    backgroundColor: '#F1F5F9',
    borderRadius: borderRadius.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    alignSelf: 'flex-start',
  },
  serviceTypeText: {
    fontSize: typography.fontSize.xs,
    color: '#334155',
    fontWeight: typography.fontWeight.bold,
  },
});
