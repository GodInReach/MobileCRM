import { View, Text, StyleSheet } from 'react-native';
import { typography, spacing, borderRadius } from '../../theme';

interface BadgeProps {
  status: 'Pending' | 'Approved' | 'Rejected' | 'Under Review';
}

export const Badge: React.FC<BadgeProps> = ({ status }) => {
  const getBadgeStyle = () => {
    switch (status) {
      case 'Approved':
        return {
          bg: '#DCFCE7',
          text: '#15803D',
          border: '#86EFAC',
        };
      case 'Pending':
        return {
          bg: '#FEF3C7',
          text: '#B45309',
          border: '#FCD34D',
        };
      case 'Under Review':
        return {
          bg: '#E0F2FE',
          text: '#0369A1',
          border: '#7DD3FC',
        };
      case 'Rejected':
        return {
          bg: '#FEE2E2',
          text: '#B91C1C',
          border: '#FCA5A5',
        };
    }
  };

  const current = getBadgeStyle();

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: current.bg,
          borderColor: current.border,
        },
      ]}
    >
      <Text style={[styles.text, { color: current.text }]}>{status}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: spacing.xs - 1,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.semiBold,
  },
});
