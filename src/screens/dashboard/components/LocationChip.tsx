import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PinIcon } from '../../../components/icons/VectorIcons';
import { colors, typography, spacing, borderRadius } from '../../../theme';

interface LocationChipProps {
  city?: string;
  branch?: string;
}

export const LocationChip: React.FC<LocationChipProps> = ({
  city = 'CHENNAI',
  branch = 'VERDE MONDE - TEST',
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>
        <PinIcon size={18} color="#334155" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.cityText}>{city}</Text>
        <Text style={styles.branchText}>{branch}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: borderRadius.md,
    paddingVertical: spacing.sm + 2,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  iconWrapper: {
    marginRight: spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cityText: {
    fontSize: typography.fontSize.sm + 1,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    letterSpacing: 0.5,
  },
  branchText: {
    fontSize: typography.fontSize.xs,
    color: colors.textMuted,
    marginTop: 1,
    letterSpacing: 0.2,
    fontWeight: typography.fontWeight.medium,
  },
});
