import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { CheckmarkIcon } from '../icons/VectorIcons';
import { colors, typography, spacing, borderRadius } from '../../theme';

interface CheckboxProps {
  checked: boolean;
  onToggle: (checked: boolean) => void;
  label?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({ checked, onToggle, label }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onToggle(!checked)}
      activeOpacity={0.7}
    >
      <View style={[styles.box, checked && styles.boxChecked]}>
        {checked && <CheckmarkIcon size={11} color="#FFFFFF" />}
      </View>
      {label && <Text style={styles.label}>{label}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  box: {
    width: 18,
    height: 18,
    borderRadius: borderRadius.xs,
    borderWidth: 1.6,
    borderColor: colors.borderMedium,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  boxChecked: {
    backgroundColor: colors.brandGreen,
    borderColor: colors.brandGreen,
  },
  label: {
    fontSize: typography.fontSize.sm + 1,
    color: colors.textSecondary,
    fontWeight: typography.fontWeight.medium,
  },
});
