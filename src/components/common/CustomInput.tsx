import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TextInputProps,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { colors, typography, spacing, borderRadius } from '../../theme';

interface CustomInputProps extends TextInputProps {
  label?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
  error?: string;
}

export const CustomInput: React.FC<CustomInputProps> = ({
  label,
  leftIcon,
  rightIcon,
  onRightIconPress,
  error,
  style,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.inputWrapper,
          isFocused && styles.inputFocused,
          error ? styles.inputError : null,
        ]}
      >
        {leftIcon && <View style={styles.leftIconContainer}>{leftIcon}</View>}
        <TextInput
          style={[styles.input, style]}
          placeholderTextColor={colors.textPlaceholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          autoCapitalize="none"
          {...rest}
        />
        {rightIcon && (
          <TouchableOpacity
            style={styles.rightIconContainer}
            onPress={onRightIconPress}
            activeOpacity={0.7}
            disabled={!onRightIconPress}
          >
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.base,
    width: '100%',
  },
  label: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.textSecondary,
    marginBottom: spacing.xs + 2,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.2,
    borderColor: colors.borderLight,
    borderRadius: borderRadius.md + 2,
    paddingHorizontal: spacing.md,
    height: 48,
  },
  inputFocused: {
    borderColor: colors.cyanPrimary,
    backgroundColor: '#FFFFFF',
    shadowColor: colors.cyanPrimary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  inputError: {
    borderColor: colors.statusDanger,
  },
  leftIconContainer: {
    marginRight: spacing.sm + 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightIconContainer: {
    marginLeft: spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xs,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: typography.fontSize.base,
    color: colors.textPrimary,
    paddingVertical: 0,
  },
  errorText: {
    fontSize: typography.fontSize.xs,
    color: colors.statusDanger,
    marginTop: spacing.xs,
  },
});
