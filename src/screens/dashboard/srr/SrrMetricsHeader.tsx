import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {
  ClockIcon,
  CheckCircleIcon,
  TimesCircleIcon,
  RequoteIcon,
} from '../../../components/icons/VectorIcons';
import { SrrMetrics, SrrStatus } from '../../../types';
import { colors, typography, spacing, borderRadius, shadows } from '../../../theme';

interface SrrMetricsHeaderProps {
  metrics: SrrMetrics;
  activeFilter: SrrStatus | null;
  onSelectFilter: (filter: SrrStatus | null) => void;
}

export const SrrMetricsHeader: React.FC<SrrMetricsHeaderProps> = ({
  metrics,
  activeFilter,
  onSelectFilter,
}) => {
  const handleToggle = (status: SrrStatus) => {
    if (activeFilter === status) {
      onSelectFilter(null);
    } else {
      onSelectFilter(status);
    }
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.rowContainer}>
        {/* PENDING CARD */}
        <TouchableOpacity
          testID="metric-card-pending"
          style={[
            styles.card,
            activeFilter === 'Pending' && styles.cardActivePending,
          ]}
          onPress={() => handleToggle('Pending')}
          activeOpacity={0.7}
        >
          <View style={styles.cardHeader}>
            <Text
              style={styles.cardTitle}
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.7}
            >
              PENDING
            </Text>
            <View style={[styles.iconCircle, { backgroundColor: '#EFF6FF' }]}>
              <ClockIcon size={12} color="#2563EB" />
            </View>
          </View>
          <Text style={[styles.cardCount, { color: '#2563EB' }]}>
            {metrics.pending}
          </Text>
        </TouchableOpacity>

        {/* APPROVED CARD */}
        <TouchableOpacity
          testID="metric-card-approved"
          style={[
            styles.card,
            activeFilter === 'Approved' && styles.cardActiveApproved,
          ]}
          onPress={() => handleToggle('Approved')}
          activeOpacity={0.7}
        >
          <View style={styles.cardHeader}>
            <Text
              style={styles.cardTitle}
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.7}
            >
              APPROVED
            </Text>
            <View style={[styles.iconCircle, { backgroundColor: '#ECFDF5' }]}>
              <CheckCircleIcon size={12} color="#16A34A" />
            </View>
          </View>
          <Text style={[styles.cardCount, { color: '#16A34A' }]}>
            {metrics.approved}
          </Text>
        </TouchableOpacity>

        {/* REJECTED CARD */}
        <TouchableOpacity
          testID="metric-card-rejected"
          style={[
            styles.card,
            activeFilter === 'Rejected' && styles.cardActiveRejected,
          ]}
          onPress={() => handleToggle('Rejected')}
          activeOpacity={0.7}
        >
          <View style={styles.cardHeader}>
            <Text
              style={styles.cardTitle}
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.7}
            >
              REJECTED
            </Text>
            <View style={[styles.iconCircle, { backgroundColor: '#FEF2F2' }]}>
              <TimesCircleIcon size={12} color="#EF4444" />
            </View>
          </View>
          <Text style={[styles.cardCount, { color: '#DC2626' }]}>
            {metrics.rejected}
          </Text>
        </TouchableOpacity>

        {/* REQUOTED CARD */}
        <TouchableOpacity
          testID="metric-card-requoted"
          style={[
            styles.card,
            activeFilter === 'Requoted' && styles.cardActiveRequoted,
          ]}
          onPress={() => handleToggle('Requoted')}
          activeOpacity={0.7}
        >
          <View style={styles.cardHeader}>
            <Text
              style={styles.cardTitle}
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.7}
            >
              REQUOTED
            </Text>
            <View style={[styles.iconCircle, { backgroundColor: '#FFFBEB' }]}>
              <RequoteIcon size={12} color="#D97706" />
            </View>
          </View>
          <Text style={[styles.cardCount, { color: '#D97706' }]}>
            {metrics.requoted}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: spacing.xs + 2,
    paddingHorizontal: spacing.md,
    backgroundColor: '#F8FAFC',
    width: '100%',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: 6,
    width: '100%',
  },
  card: {
    flex: 1,
    minWidth: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: borderRadius.md + 2,
    paddingHorizontal: 7,
    paddingVertical: 8,
    borderWidth: 1.2,
    borderColor: colors.borderLight,
    justifyContent: 'space-between',
    ...shadows.subtle,
  },
  cardActivePending: {
    borderColor: '#2563EB',
    backgroundColor: '#F0F7FF',
  },
  cardActiveApproved: {
    borderColor: '#16A34A',
    backgroundColor: '#F0FDF4',
  },
  cardActiveRejected: {
    borderColor: '#DC2626',
    backgroundColor: '#FEF2F2',
  },
  cardActiveRequoted: {
    borderColor: '#D97706',
    backgroundColor: '#FFFBEB',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  cardTitle: {
    flex: 1,
    fontSize: 9.5,
    fontWeight: typography.fontWeight.bold,
    color: colors.textMuted,
    letterSpacing: 0.2,
    marginRight: 2,
  },
  iconCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardCount: {
    fontSize: typography.fontSize['2xl'] - 1,
    fontWeight: typography.fontWeight.black,
    marginTop: 2,
  },
});

