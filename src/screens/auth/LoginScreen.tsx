import React, { useState } from 'react';
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
import { Checkbox } from '../../components/common/Checkbox';
import {
  MailIcon,
  LockIcon,
  EyeIcon,
  ShipIllustration,
} from '../../components/icons/VectorIcons';
import { GlobeBadge } from '../../components/icons/GlobeBadge';
import { colors, typography, spacing, borderRadius } from '../../theme';
import { useAuth } from '../../context/AuthContext';

export const LoginScreen: React.FC = () => {
  const { login } = useAuth();
  const insets = useAppInsets();

  const [email, setEmail] = useState('grow@vizoroz.com');
  const [password, setPassword] = useState('GreenGlobal2025!');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { width, height } = useWindowDimensions();

  // Wide/landscape screen check
  const isLandscapeOrWide = width > height || width >= 720;

  const handleSignIn = () => {
    setIsLoading(true);
    setTimeout(() => {
      login(email, password);
      setIsLoading(false);
    }, 250);
  };

  const renderHeroBanner = () => (
    <View
      style={[
        styles.heroPanel,
        isLandscapeOrWide ? styles.heroPanelLandscape : styles.heroPanelPortrait,
        { paddingTop: insets.top + (isLandscapeOrWide ? spacing.xl : spacing.base) },
      ]}
    >
      {/* Subtle angled background accents */}
      <View style={styles.stripePatternContainer}>
        <View style={[styles.diagonalStripe, { top: -40, left: 20 }]} />
        <View style={[styles.diagonalStripe, { top: 60, left: 100 }]} />
        <View style={[styles.diagonalStripe, { top: 160, left: 180 }]} />
      </View>

      {/* App Globe Badge and Ship illustration */}
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

  const renderLoginForm = () => (
    <View
      style={[
        styles.formPanel,
        isLandscapeOrWide ? styles.formPanelLandscape : styles.formPanelPortrait,
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

      {/* Email Input */}
      <CustomInput
        label="Email Address"
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
        keyboardType="email-address"
        autoCapitalize="none"
        leftIcon={<MailIcon size={18} color="#94A3B8" />}
      />

      {/* Password Input */}
      <CustomInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
        secureTextEntry={!showPassword}
        leftIcon={<LockIcon size={18} color="#94A3B8" />}
        rightIcon={<EyeIcon size={18} color="#94A3B8" visible={showPassword} />}
        onRightIconPress={() => setShowPassword(!showPassword)}
      />

      {/* Remember Me & Forgot Password Row */}
      <View style={styles.optionsRow}>
        <Checkbox
          label="Remember me"
          checked={rememberMe}
          onToggle={setRememberMe}
        />
        <TouchableOpacity activeOpacity={0.7}>
          <Text style={styles.forgotPasswordText}>Forgot password?</Text>
        </TouchableOpacity>
      </View>

      {/* Sign In Button */}
      <CustomButton
        title="Sign In"
        onPress={handleSignIn}
        loading={isLoading}
        variant="slate"
        style={styles.signInButton}
        textStyle={styles.signInButtonText}
      />

      {/* Security Banner */}
      <View style={styles.securityRow}>
        <View style={styles.cyanDot} />
        <Text style={styles.securityLockIcon}>🔒</Text>
        <Text style={styles.securityText}>Secure & Encrypted</Text>
      </View>

      {/* Copyright Footer */}
      <Text style={styles.copyrightText}>
        © 2025 Green Global • All Rights Reserved
      </Text>
    </View>
  );

  return (
    <View style={styles.rootContainer}>
      <StatusBar barStyle="light-content" />

      {isLandscapeOrWide ? (
        // Wide / Landscape View: Full screen edge-to-edge side-by-side
        <View
          style={[
            styles.landscapeContainer,
            {
              paddingLeft: insets.left,
              paddingRight: insets.right,
            },
          ]}
        >
          {renderHeroBanner()}
          <ScrollView
            style={styles.landscapeFormScroll}
            contentContainerStyle={styles.landscapeFormScrollContent}
            showsVerticalScrollIndicator={false}
          >
            {renderLoginForm()}
          </ScrollView>
        </View>
      ) : (
        // Mobile Portrait View: Full screen width and height
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
            {renderLoginForm()}
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </View>
  );
};

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
  brandHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xl,
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
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.xs,
    marginBottom: spacing.xl,
  },
  forgotPasswordText: {
    fontSize: typography.fontSize.sm + 1,
    fontWeight: typography.fontWeight.bold,
    color: colors.brandGreenDark,
  },
  signInButton: {
    backgroundColor: '#E2E8F0',
    borderRadius: borderRadius.md,
    height: 46,
    marginBottom: spacing.xl,
  },
  signInButtonText: {
    color: '#64748B',
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
  },
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
