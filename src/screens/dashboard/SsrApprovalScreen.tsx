import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { useAppInsets } from '../../hooks/useAppInsets';
import {
  ClipboardCheckIcon,
  SearchIcon,
  CloseIcon,
  FilterIcon,
} from '../../components/icons/VectorIcons';
import { SrrMetricsHeader } from './srr/SrrMetricsHeader';
import { SrrRecordCard } from './srr/SrrRecordCard';
import { SrrDetailModal } from './srr/SrrDetailModal';
import { srrService } from '../../services/srrService';
import { SrrRecord, SrrMetrics, SrrStatus, ApprovalDecisionPayload } from '../../types';
import { colors, typography, spacing, borderRadius } from '../../theme';

interface SsrApprovalScreenProps {
  onOpenMenu?: () => void;
}

export const SsrApprovalScreen: React.FC<SsrApprovalScreenProps> = ({ onOpenMenu }) => {
  const insets = useAppInsets();

  const [records, setRecords] = useState<SrrRecord[]>([]);
  const [metrics, setMetrics] = useState<SrrMetrics>({
    pending: 2,
    approved: 74,
    rejected: 0,
    requoted: 0,
    total: 75,
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<SrrStatus | null>(null);

  // Selected Record for Detail Modal
  const [selectedRecord, setSelectedRecord] = useState<SrrRecord | null>(null);
  const [detailVisible, setDetailVisible] = useState(false);

  const loadData = useCallback(async () => {
    try {
      const [fetchedRecords, fetchedMetrics] = await Promise.all([
        srrService.getRecords(),
        srrService.getMetrics(),
      ]);
      setRecords(fetchedRecords);
      setMetrics(fetchedMetrics);
    } catch (err) {
      console.error('Error loading SRR data:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const onRefresh = () => {
    setRefreshing(true);
    loadData();
  };

  const handleRecordPress = (record: SrrRecord) => {
    setSelectedRecord(record);
    setDetailVisible(true);
  };

  const handleDecision = async (id: string, payload: ApprovalDecisionPayload) => {
    await srrService.updateDecision(id, payload);
    await loadData();
  };

  // Filter records by status and search query
  const filteredRecords = records.filter((rec) => {
    const matchesFilter = activeFilter ? rec.status === activeFilter : true;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      q.length === 0 ||
      rec.srrNo.toLowerCase().includes(q) ||
      rec.customer.toLowerCase().includes(q) ||
      rec.principal.toLowerCase().includes(q) ||
      rec.serviceType.toLowerCase().includes(q);
    return matchesFilter && matchesSearch;
  });

  return (
    <View style={styles.container}>
      {/* 1. Green Enterprise Header Bar */}
      <View style={[styles.headerBar, { paddingTop: insets.top }]}>
        <View style={styles.headerContentRow}>
          {onOpenMenu && (
            <TouchableOpacity
              testID="mobile-drawer-toggle"
              style={styles.headerMenuBtn}
              onPress={onOpenMenu}
              activeOpacity={0.7}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <View style={styles.menuIconBar} />
              <View style={styles.menuIconBar} />
              <View style={styles.menuIconBar} />
            </TouchableOpacity>
          )}
          <View style={styles.headerTitleRow}>
            <ClipboardCheckIcon size={20} color="#FFFFFF" />
            <Text style={styles.headerTitle}>SRR Approval</Text>
          </View>
        </View>
      </View>

      {/* 2. Top Metric KPI Cards */}
      <SrrMetricsHeader
        metrics={metrics}
        activeFilter={activeFilter}
        onSelectFilter={setActiveFilter}
      />

      {/* 3. Search & Count Bar */}
      <View style={styles.searchSection}>
        <View style={styles.countRow}>
          <Text style={styles.recordsCountText}>
            All Records ({activeFilter ? filteredRecords.length : metrics.total})
          </Text>
          {activeFilter && (
            <TouchableOpacity
              style={styles.activeFilterChip}
              onPress={() => setActiveFilter(null)}
              activeOpacity={0.7}
            >
              <Text style={styles.activeFilterText}>Filtered: {activeFilter} ✕</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Search Input */}
        <View style={styles.searchBar}>
          <SearchIcon size={18} color="#94A3B8" />
          <TextInput
            testID="srr-search-input"
            style={styles.searchInput}
            placeholder="Search by SRR No, Customer, Principal..."
            placeholderTextColor="#94A3B8"
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCapitalize="none"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              style={styles.clearSearchBtn}
              onPress={() => setSearchQuery('')}
              activeOpacity={0.7}
            >
              <CloseIcon size={16} color="#64748B" />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.filterIconBtn}
            onPress={() => {}}
            activeOpacity={0.7}
          >
            <FilterIcon size={18} color="#475569" />
          </TouchableOpacity>
        </View>
      </View>

      {/* 4. SRR Record Cards Feed */}
      {loading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#16A34A" />
        </View>
      ) : (
        <FlatList
          data={filteredRecords}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <SrrRecordCard record={item} onPress={handleRecordPress} />
          )}
          contentContainerStyle={[
            styles.listContent,
            { paddingBottom: insets.bottom + 28 },
          ]}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#16A34A']}
            />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyTitle}>No SRR records found</Text>
              <Text style={styles.emptySubtitle}>
                Try adjusting your search query or filter selection.
              </Text>
            </View>
          }
        />
      )}

      {/* 5. Detail Inspection & Decision Modal */}
      <SrrDetailModal
        visible={detailVisible}
        record={selectedRecord}
        onClose={() => {
          setDetailVisible(false);
          setSelectedRecord(null);
        }}
        onDecision={handleDecision}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  headerBar: {
    backgroundColor: '#16A34A',
  },
  headerContentRow: {
    height: 54,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
  },
  headerMenuBtn: {
    width: 38,
    height: 38,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm + 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  menuIconBar: {
    width: 18,
    height: 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 1,
    marginVertical: 2,
  },
  headerTitleRow: {
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
  searchSection: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xs,
    paddingBottom: spacing.sm,
  },
  countRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs + 2,
  },
  recordsCountText: {
    fontSize: typography.fontSize.sm + 1,
    fontWeight: typography.fontWeight.bold,
    color: '#334155',
  },
  activeFilterChip: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.full,
  },
  activeFilterText: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.bold,
    color: '#15803D',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.borderLight,
    paddingHorizontal: spacing.md,
    height: 42,
  },
  searchInput: {
    flex: 1,
    marginLeft: spacing.sm,
    fontSize: typography.fontSize.sm + 1,
    color: colors.textPrimary,
    paddingVertical: 0,
  },
  clearSearchBtn: {
    padding: spacing.xs,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterIconBtn: {
    marginLeft: spacing.xs,
    padding: spacing.xs,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xl,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    paddingVertical: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  emptySubtitle: {
    fontSize: typography.fontSize.sm,
    color: colors.textMuted,
    textAlign: 'center',
    paddingHorizontal: spacing.xl,
  },
});
