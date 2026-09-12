import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { colors, typography, spacing, borderRadius } from '../../theme';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'slate' | 'outline' | 'success';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  variant = 'slate',
  disabled = false,
  loading = false,
  style,
  textStyle,
}) => {
  const getBackgroundColor = () => {
    if (disabled) return colors.buttonDisabledBg;
    switch (variant) {
      case 'primary':
        return colors.cyanPrimary;
      case 'success':
        return colors.brandGreen;
      case 'outline':
        return 'transparent';
      case 'slate':
      default:
        return '#E2E8F0';
    }
  };

  const getTextColor = () => {
    if (disabled) return colors.buttonDisabledText;
    switch (variant) {
      case 'primary':
      case 'success':
        return '#FFFFFF';
      case 'outline':
        return colors.cyanPrimary;
      case 'slate':
      default:
        return '#64748B';
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: getBackgroundColor() },
        variant === 'outline' && styles.outlineBorder,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} size="small" />
      ) : (
        <Text style={[styles.text, { color: getTextColor() }, textStyle]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 46,
    borderRadius: borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    width: '100%',
  },
  outlineBorder: {
    borderWidth: 1.5,
    borderColor: colors.cyanPrimary,
  },
  text: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.bold,
    letterSpacing: 0.3,
  },
});
