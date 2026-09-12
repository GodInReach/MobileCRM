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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../assets/images';
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
import { colors, typography, spacing, borderRadius, shadows } from '../../theme';
import { useAuth } from '../../context/AuthContext';

export const LoginScreen: React.FC = () => {
  const { login } = useAuth();
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
    <View style={styles.heroPanel}>
      {/* Subtle angled background accents */}
      <View style={styles.stripePatternContainer}>
        <View style={[styles.diagonalStripe, { top: -40, left: 20 }]} />
        <View style={[styles.diagonalStripe, { top: 60, left: 100 }]} />
        <View style={[styles.diagonalStripe, { top: 160, left: 180 }]} />
      </View>

      {/* App Globe Badge and Ship illustration */}
      <View style={styles.heroGraphicRow}>
        <GlobeBadge size={58} />
        <View style={styles.shipIllustrationWrapper}>
          <ShipIllustration width={100} height={65} />
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
    <View style={styles.formPanel}>
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
    <SafeAreaView style={styles.safeContainer}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          isLandscapeOrWide ? styles.scrollContentLandscape : null,
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[
            styles.cardContainer,
            isLandscapeOrWide ? styles.cardContainerLandscape : styles.cardContainerPortrait,
          ]}
        >
          {isLandscapeOrWide ? (
            <>
              {renderHeroBanner()}
              {renderLoginForm()}
            </>
          ) : (
            <>
              {renderHeroBanner()}
              {renderLoginForm()}
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#262D35',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.md,
  },
  scrollContentLandscape: {
    padding: spacing.xl,
  },
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
    ...shadows.card,
  },
  cardContainerLandscape: {
    flexDirection: 'row',
    width: '100%',
    maxWidth: 960,
    minHeight: 520,
  },
  cardContainerPortrait: {
    flexDirection: 'column',
    width: '100%',
    maxWidth: 440,
  },
  heroPanel: {
    flex: 1,
    backgroundColor: '#0E7490',
    padding: spacing.xl,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
    minHeight: 240,
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
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xl,
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
