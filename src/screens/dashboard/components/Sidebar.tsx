import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { images } from '../../../assets/images';
import {
  HomeIcon,
  ExportIcon,
  SearchIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  SsrIcon,
} from '../../../components/icons/VectorIcons';
import { LocationChip } from './LocationChip';
import { UserProfileCard } from './UserProfileCard';
import { colors, typography, spacing, borderRadius } from '../../../theme';
import { DashboardRoute } from '../../../types';

interface SidebarProps {
  currentRoute: DashboardRoute;
  onNavigate: (route: DashboardRoute) => void;
  onCloseMobileDrawer?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentRoute,
  onNavigate,
  onCloseMobileDrawer,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isExportExpanded, setIsExportExpanded] = useState(false);

  const handleSelectHome = () => {
    onNavigate('Home');
    if (onCloseMobileDrawer) onCloseMobileDrawer();
  };

  const handleToggleExport = () => {
    setIsExportExpanded(!isExportExpanded);
  };

  const handleSelectSsrApproval = () => {
    onNavigate('SSR Approval');
    if (onCloseMobileDrawer) onCloseMobileDrawer();
  };

  const filteredMatchesHome =
    searchQuery.trim().length === 0 ||
    'home'.includes(searchQuery.toLowerCase().trim());

  const filteredMatchesExport =
    searchQuery.trim().length === 0 ||
    'export'.includes(searchQuery.toLowerCase().trim()) ||
    'ssr approval'.includes(searchQuery.toLowerCase().trim());

  return (
    <View style={styles.container}>
      {/* Top Branding */}
      <View style={styles.header}>
        <Image
          source={images.logo}
          style={styles.logoImage}
          resizeMode="contain"
        />
        <Text style={styles.brandTitle}>GREEN GLOBAL</Text>
      </View>

      {/* Menu Search Box */}
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <SearchIcon size={16} color={colors.textPlaceholder} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search menu items..."
            placeholderTextColor={colors.textPlaceholder}
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCapitalize="none"
          />
        </View>
      </View>

      {/* Navigation Items */}
      <ScrollView
        style={styles.navScrollView}
        contentContainerStyle={styles.navScrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Home Item */}
        {filteredMatchesHome && (
          <TouchableOpacity
            testID="home-nav-item"
            style={[
              styles.navItem,
              currentRoute === 'Home' && styles.navItemActive,
            ]}
            onPress={handleSelectHome}
            activeOpacity={0.7}
          >
            <View style={styles.navItemLeft}>
              <HomeIcon
                size={18}
                color={currentRoute === 'Home' ? colors.textPrimary : colors.textSecondary}
              />
              <Text
                style={[
                  styles.navItemText,
                  currentRoute === 'Home' && styles.navItemTextActive,
                ]}
              >
                Home
              </Text>
            </View>
          </TouchableOpacity>
        )}

        {/* Export Item (Expandable) */}
        {filteredMatchesExport && (
          <View>
            <TouchableOpacity
              testID="export-nav-item"
              style={styles.navItem}
              onPress={handleToggleExport}
              activeOpacity={0.7}
            >
              <View style={styles.navItemLeft}>
                <ExportIcon size={18} color={colors.textSecondary} />
                <Text style={styles.navItemText}>Export</Text>
              </View>
              <View style={styles.chevronWrapper}>
                {isExportExpanded ? (
                  <ChevronDownIcon size={13} color={colors.textPlaceholder} />
                ) : (
                  <ChevronRightIcon size={13} color={colors.textPlaceholder} />
                )}
              </View>
            </TouchableOpacity>

            {/* Sub-item: SSR Approval (Child of Export) */}
            {isExportExpanded && (
              <View style={styles.submenuContainer}>
                <TouchableOpacity
                  testID="ssr-approval-nav-item"
                  style={[
                    styles.subnavItem,
                    currentRoute === 'SSR Approval' && styles.subnavItemActive,
                  ]}
                  onPress={handleSelectSsrApproval}
                  activeOpacity={0.7}
                >
                  <View style={styles.subnavItemLeft}>
                    <SsrIcon
                      size={15}
                      color={
                        currentRoute === 'SSR Approval'
                          ? colors.cyanPrimary
                          : colors.textMuted
                      }
                    />
                    <Text
                      style={[
                        styles.subnavItemText,
                        currentRoute === 'SSR Approval' && styles.subnavItemTextActive,
                      ]}
                    >
                      SSR Approval
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      </ScrollView>

      {/* Bottom Information Section */}
      <View style={styles.footer}>
        <LocationChip city="CHENNAI" branch="VERDE MONDE - TEST" />
        <UserProfileCard />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 270,
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRightWidth: 1,
    borderColor: colors.borderLight,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.base,
    paddingBottom: spacing.md,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xs,
    marginBottom: spacing.md,
  },
  logoImage: {
    width: 38,
    height: 38,
    borderRadius: 19,
    marginRight: spacing.sm + 2,
  },
  brandTitle: {
    fontSize: typography.fontSize.lg + 1,
    fontWeight: typography.fontWeight.black,
    color: colors.brandRed,
    letterSpacing: 0.5,
  },
  searchContainer: {
    marginBottom: spacing.base,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    height: 38,
  },
  searchInput: {
    flex: 1,
    marginLeft: spacing.sm,
    fontSize: typography.fontSize.sm + 1,
    color: colors.textPrimary,
    paddingVertical: 0,
  },
  navScrollView: {
    flex: 1,
  },
  navScrollContent: {
    paddingVertical: spacing.xs,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm + 2,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.xs + 2,
  },
  navItemActive: {
    backgroundColor: colors.surfaceActive,
  },
  navItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navItemText: {
    marginLeft: spacing.md,
    fontSize: typography.fontSize.base,
    color: colors.textSecondary,
    fontWeight: typography.fontWeight.medium,
  },
  navItemTextActive: {
    color: colors.textPrimary,
    fontWeight: typography.fontWeight.semiBold,
  },
  chevronWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  submenuContainer: {
    marginLeft: spacing.base,
    paddingLeft: spacing.md,
    borderLeftWidth: 1.5,
    borderLeftColor: colors.borderLight,
    marginVertical: spacing.xs,
  },
  subnavItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.sm,
    marginVertical: 2,
  },
  subnavItemActive: {
    backgroundColor: colors.cyanLight,
  },
  subnavItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subnavItemText: {
    marginLeft: spacing.sm + 2,
    fontSize: typography.fontSize.sm + 1,
    color: colors.textSecondary,
    fontWeight: typography.fontWeight.medium,
  },
  subnavItemTextActive: {
    color: colors.cyanPrimary,
    fontWeight: typography.fontWeight.bold,
  },
  footer: {
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
});
