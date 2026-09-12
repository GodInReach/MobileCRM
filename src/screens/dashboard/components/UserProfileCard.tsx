import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import { images } from '../../../assets/images';
import { InfoIcon, ChevronUpIcon, ChevronDownIcon } from '../../../components/icons/VectorIcons';
import { colors, typography, spacing, borderRadius, shadows } from '../../../theme';
import { useAuth } from '../../../context/AuthContext';

export const UserProfileCard: React.FC = () => {
  const { user, logout } = useAuth();
  const [menuVisible, setMenuVisible] = useState(false);

  const displayName = user?.name || 'Vizoroz';
  const displayEmail = user?.email || 'grow@vizoroz.com';

  return (
    <View style={styles.container}>
      <View style={styles.profileRow}>
        {/* Avatar */}
        <Image
          source={images.logo}
          style={styles.avatar}
          resizeMode="cover"
        />

        {/* User Details */}
        <View style={styles.infoContainer}>
          <Text style={styles.userName} numberOfLines={1}>
            {displayName}
          </Text>
          <Text style={styles.userEmail} numberOfLines={1}>
            {displayEmail}
          </Text>
        </View>

        {/* Action Controls */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => setMenuVisible(true)}
            activeOpacity={0.7}
          >
            <InfoIcon size={16} color={colors.textMuted} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => setMenuVisible(!menuVisible)}
            activeOpacity={0.7}
          >
            {menuVisible ? (
              <ChevronDownIcon size={12} color={colors.textMuted} />
            ) : (
              <ChevronUpIcon size={12} color={colors.textMuted} />
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* User Options Dropdown / Modal */}
      <Modal
        visible={menuVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setMenuVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.popoverMenu}>
                <View style={styles.popoverHeader}>
                  <Text style={styles.popoverTitle}>{displayName}</Text>
                  <Text style={styles.popoverSub}>{displayEmail}</Text>
                </View>
                <View style={styles.divider} />
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => {
                    setMenuVisible(false);
                    logout();
                  }}
                  activeOpacity={0.7}
                >
                  <Text style={styles.logoutText}>Sign Out</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.xs,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.xs,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  infoContainer: {
    flex: 1,
    marginLeft: spacing.sm + 2,
    justifyContent: 'center',
  },
  userName: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
  },
  userEmail: {
    fontSize: typography.fontSize.xs,
    color: colors.textMuted,
    marginTop: 1,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  actionBtn: {
    padding: spacing.xs,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'flex-end',
    paddingBottom: 80,
    paddingHorizontal: 16,
  },
  popoverMenu: {
    backgroundColor: '#FFFFFF',
    borderRadius: borderRadius.lg,
    padding: spacing.base,
    width: 250,
    ...shadows.modal,
  },
  popoverHeader: {
    marginBottom: spacing.sm,
  },
  popoverTitle: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
  },
  popoverSub: {
    fontSize: typography.fontSize.xs,
    color: colors.textMuted,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: colors.borderLight,
    marginVertical: spacing.sm,
  },
  menuItem: {
    paddingVertical: spacing.sm,
  },
  logoutText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.statusDanger,
  },
});
