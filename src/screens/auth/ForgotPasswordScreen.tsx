import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { images } from '../../assets/images';
import { useAppInsets } from '../../hooks/useAppInsets';
import { CustomInput } from '../../components/common/CustomInput';
import { CustomButton } from '../../components/common/CustomButton';
import {
  MailIcon,
  ShipIllustration,
} from '../../components/icons/VectorIcons';
import { GlobeBadge } from '../../components/icons/GlobeBadge';
import { colors, typography, spacing, borderRadius } from '../../theme';
import { forgotPasswordApi } from '../../services/api';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface Props {
  onBackToLogin: () => void;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateEmail(raw: string): string | null {
  const trimmed = raw.trim();
  if (trimmed.length === 0) {
    return 'Email address is required.';
  }
  if (!EMAIL_REGEX.test(trimmed)) {
    return 'Please enter a valid email address.';
  }
  return null;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export const ForgotPasswordScreen: React.FC<Props> = ({ onBackToLogin }) => {
  const insets = useAppInsets();
  const { width, height } = useWindowDimensions();
  const isLandscapeOrWide = width > height || width >= 720;

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Guard against state updates after unmount
  const isMounted = useRef(true);
  React.useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  // -------------------------------------------------------------------------
  // Handlers
  // -------------------------------------------------------------------------
  const handleEmailChange = (text: string) => {
    setEmail(text);
    // Clear inline error as the user corrects input
    if (emailError) {
      setEmailError(null);
    }
    // Clear result banners when the user starts editing again
    if (successMessage || errorMessage) {
      setSuccessMessage(null);
      setErrorMessage(null);
    }
  };

  const handleSendResetLink = async () => {
    // 1. Validate
    const validationError = validateEmail(email);
    if (validationError) {
      setEmailError(validationError);
      return;
    }

    // 2. Prevent duplicate submissions
    if (isLoading) {
      return;
    }

    setEmailError(null);
    setSuccessMessage(null);
    setErrorMessage(null);
    setIsLoading(true);

    try {
      // 3. Call API
      const result = await forgotPasswordApi(email);

      if (!isMounted.current) {
        return;
      }

      if (result.Status) {
        // 4a. Success path
        setSuccessMessage(result.Message);
      } else {
        // 4b. Server returned Status: false — treat as a failure
        setErrorMessage(
          result.Message ||
            'We could not process your request. Please try again.',
        );
      }
    } catch (err: unknown) {
      if (!isMounted.current) {
        return;
      }
      const message =
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again.';
      setErrorMessage(message);
    } finally {
      if (isMounted.current) {
        setIsLoading(false);
      }
    }
  };

  // -------------------------------------------------------------------------
  // Sub-renders
  // -------------------------------------------------------------------------
  const renderHeroBanner = () => (
    <View
      style={[
        styles.heroPanel,
        isLandscapeOrWide
          ? styles.heroPanelLandscape
          : styles.heroPanelPortrait,
        {
          paddingTop:
            insets.top +
            (isLandscapeOrWide ? spacing.xl : spacing.base),
        },
      ]}
    >
      {/* Subtle angled background accents */}
      <View style={styles.stripePatternContainer}>
        <View style={[styles.diagonalStripe, { top: -40, left: 20 }]} />
        <View style={[styles.diagonalStripe, { top: 60, left: 100 }]} />
        <View style={[styles.diagonalStripe, { top: 160, left: 180 }]} />
      </View>

      {/* Globe Badge + Ship illustration */}
      <View style={styles.heroGraphicRow}>
        <GlobeBadge size={54} />
        <View style={styles.shipIllustrationWrapper}>
          <ShipIllustration width={95} height={60} />
        </View>
      </View>

      {/* Hero Headings */}
      <View style={styles.heroTextContainer}>
        <Text style={styles.heroHeading1}>Welcome to</Text>
        <Text style={styles.heroHeading2}>Green Global</Text>
        <Text style={styles.heroSubtitle}>
          Manage your global shipping operations efficiently from container
          tracking to vessel schedules all in one place.
        </Text>
      </View>
    </View>
  );

  const renderForm = () => (
    <View
      style={[
        styles.formPanel,
        isLandscapeOrWide
          ? styles.formPanelLandscape
          : styles.formPanelPortrait,
        { paddingBottom: Math.max(insets.bottom, spacing.md) + spacing.base },
      ]}
    >
      {/* Brand Header */}
      <View style={styles.brandHeader}>
        <Image
          source={images.logo}
          style={styles.headerLogo}
          resizeMode="contain"
        />
        <Text style={styles.brandTitleText}>GREEN GLOBAL</Text>
      </View>

      {/* Heading */}
      <Text style={styles.screenHeading}>Forgot Password?</Text>
      <Text style={styles.screenDescription}>
        Enter your registered email address and we'll send you instructions to
        reset your password.
      </Text>

      {/* Email Input */}
      <View style={styles.inputWrapper}>
        <CustomInput
          label="Email"
          value={email}
          onChangeText={handleEmailChange}
          placeholder="Enter your registered email"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          leftIcon={<MailIcon size={18} color="#94A3B8" />}
          error={emailError ?? undefined}
          accessibilityLabel="Email address input"
        />
      </View>

      {/* Success Banner */}
      {successMessage ? (
        <View
          style={styles.successBanner}
          accessibilityLiveRegion="polite"
          accessibilityRole="alert"
        >
          <Text style={styles.successIcon}>✅</Text>
          <View style={styles.bannerTextContainer}>
            <Text style={styles.successText}>{successMessage}</Text>
            <Text style={styles.successHint}>
              Check your inbox and spam folder for the reset email.
            </Text>
          </View>
        </View>
      ) : null}

      {/* Error Banner */}
      {errorMessage ? (
        <View
          style={styles.errorBanner}
          accessibilityLiveRegion="polite"
          accessibilityRole="alert"
        >
          <Text style={styles.errorBannerIcon}>⚠️</Text>
          <Text style={styles.errorBannerText}>{errorMessage}</Text>
        </View>
      ) : null}

      {/* Send Reset Link Button */}
      <CustomButton
        title="Send Reset Link"
        onPress={handleSendResetLink}
        loading={isLoading}
        disabled={isLoading}
        variant="primary"
        style={styles.sendButton}
        textStyle={styles.sendButtonText}
      />

      {/* Back to Login */}
      <TouchableOpacity
        style={styles.backRow}
        onPress={onBackToLogin}
        activeOpacity={0.7}
        disabled={isLoading}
        accessibilityRole="button"
        accessibilityLabel="Back to Login"
        testID="back-to-login-button"
      >
        <Text style={styles.backArrow}>←</Text>
        <Text style={styles.backText}>Back to Login</Text>
      </TouchableOpacity>

      {/* Security Banner */}
      <View style={styles.securityRow}>
        <View style={styles.cyanDot} />
        <Text style={styles.securityLockIcon}>🔒</Text>
        <Text style={styles.securityText}>Secure &amp; Encrypted</Text>
      </View>

      {/* Copyright Footer */}
      <Text style={styles.copyrightText}>
        © 2025 Green Global • All Rights Reserved
      </Text>
    </View>
  );

  // -------------------------------------------------------------------------
  // Root render
  // -------------------------------------------------------------------------
  return (
    <View style={styles.rootContainer}>
      <StatusBar barStyle="light-content" />

      {isLandscapeOrWide ? (
        <View
          style={[
            styles.landscapeContainer,
            { paddingLeft: insets.left, paddingRight: insets.right },
          ]}
        >
          {renderHeroBanner()}
          <ScrollView
            style={styles.landscapeFormScroll}
            contentContainerStyle={styles.landscapeFormScrollContent}
            showsVerticalScrollIndicator={false}
          >
            {renderForm()}
          </ScrollView>
        </View>
      ) : (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.keyboardContainer}
        >
          <ScrollView
            style={styles.portraitScrollView}
            contentContainerStyle={styles.portraitScrollContent}
            showsVerticalScrollIndicator={false}
            bounces={false}
          >
            {renderHeroBanner()}
            {renderForm()}
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </View>
  );
};

// ---------------------------------------------------------------------------
// Styles — mirroring LoginScreen conventions exactly
// ---------------------------------------------------------------------------
const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  keyboardContainer: {
    flex: 1,
  },
  portraitScrollView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  portraitScrollContent: {
    flexGrow: 1,
  },
  landscapeContainer: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFFF',
  },
  landscapeFormScroll: {
    flex: 1.2,
    backgroundColor: '#FFFFFF',
  },
  landscapeFormScrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },

  // Hero Panel — identical to LoginScreen
  heroPanel: {
    backgroundColor: '#0E7490',
    position: 'relative',
    overflow: 'hidden',
  },
  heroPanelPortrait: {
    width: '100%',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroPanelLandscape: {
    flex: 1,
    height: '100%',
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stripePatternContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
  },
  diagonalStripe: {
    position: 'absolute',
    width: 280,
    height: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    transform: [{ rotate: '-35deg' }],
  },
  heroGraphicRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
    width: '100%',
  },
  shipIllustrationWrapper: {
    marginLeft: spacing.lg,
  },
  heroTextContainer: {
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
  },
  heroHeading1: {
    fontSize: typography.fontSize['3xl'],
    fontWeight: typography.fontWeight.bold,
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  heroHeading2: {
    fontSize: typography.fontSize['4xl'],
    fontWeight: typography.fontWeight.black,
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 2,
    letterSpacing: 0.3,
  },
  heroSubtitle: {
    fontSize: typography.fontSize.sm + 1,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 21,
    marginTop: spacing.md,
    maxWidth: 340,
    fontWeight: typography.fontWeight.normal,
  },

  // Form Panel — identical structure to LoginScreen
  formPanel: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  formPanelPortrait: {
    width: '100%',
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
  },
  formPanelLandscape: {
    paddingHorizontal: spacing['2xl'],
    paddingTop: spacing.xl,
    justifyContent: 'center',
  },

  // Brand Header
  brandHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  headerLogo: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: spacing.md,
  },
  brandTitleText: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.black,
    color: colors.brandRed,
    letterSpacing: 0.6,
  },

  // Screen-specific headings
  screenHeading: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.black,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
    letterSpacing: 0.2,
  },
  screenDescription: {
    fontSize: typography.fontSize.base,
    color: colors.textSecondary,
    lineHeight: 21,
    marginBottom: spacing.xl,
    fontWeight: typography.fontWeight.normal,
  },

  inputWrapper: {
    marginBottom: spacing.sm,
  },

  // Success Banner
  successBanner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.brandGreenLight,
    borderWidth: 1,
    borderColor: colors.brandGreen,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.base,
  },
  successIcon: {
    fontSize: 16,
    marginRight: spacing.sm,
    marginTop: 1,
  },
  bannerTextContainer: {
    flex: 1,
  },
  successText: {
    fontSize: typography.fontSize.base,
    color: colors.brandGreenDark,
    fontWeight: typography.fontWeight.semiBold,
    lineHeight: 20,
  },
  successHint: {
    fontSize: typography.fontSize.sm,
    color: colors.brandGreenDark,
    marginTop: spacing.xs,
    fontWeight: typography.fontWeight.normal,
    lineHeight: 18,
  },

  // Error Banner
  errorBanner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: colors.statusDanger,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.base,
  },
  errorBannerIcon: {
    fontSize: 15,
    marginRight: spacing.sm,
    marginTop: 1,
  },
  errorBannerText: {
    flex: 1,
    fontSize: typography.fontSize.base,
    color: '#991B1B',
    fontWeight: typography.fontWeight.medium,
    lineHeight: 20,
  },

  // Send Button — uses primary (cyan) variant to distinguish from Sign In
  sendButton: {
    backgroundColor: colors.cyanPrimary,
    borderRadius: borderRadius.md,
    height: 46,
    marginBottom: spacing.base,
    marginTop: spacing.sm,
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
  },

  // Back to Login
  backRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xl,
    paddingVertical: spacing.xs,
  },
  backArrow: {
    fontSize: typography.fontSize.base,
    color: colors.brandGreenDark,
    marginRight: spacing.xs,
    fontWeight: typography.fontWeight.bold,
  },
  backText: {
    fontSize: typography.fontSize.sm + 1,
    fontWeight: typography.fontWeight.bold,
    color: colors.brandGreenDark,
  },

  // Security row + copyright — identical to LoginScreen
  securityRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xs + 2,
  },
  cyanDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#0284C7',
    marginRight: 6,
  },
  securityLockIcon: {
    fontSize: 11,
    marginRight: 5,
  },
  securityText: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.semiBold,
    color: '#0284C7',
    letterSpacing: 0.2,
  },
  copyrightText: {
    fontSize: typography.fontSize.xs - 1,
    color: colors.textPlaceholder,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
});
