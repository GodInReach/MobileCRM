import React, { useEffect, useState } from 'react';
import { StatusBar, Platform } from 'react-native';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { LoginScreen } from './src/screens/auth/LoginScreen';
import { ForgotPasswordScreen } from './src/screens/auth/ForgotPasswordScreen';
import { DashboardLayout } from './src/screens/dashboard/DashboardLayout';

type AuthScreen = 'login' | 'forgotPassword';

const RootNavigator = () => {
  const { isLoggedIn } = useAuth();
  const [authScreen, setAuthScreen] = useState<AuthScreen>('login');

  useEffect(() => {
    if (Platform.OS === 'android') {
      (StatusBar as any).setTranslucent?.(true);
      (StatusBar as any).setBackgroundColor?.('transparent');
    }
  }, []);

  // Reset to login screen whenever the user is authenticated (e.g. after logout)
  useEffect(() => {
    if (!isLoggedIn) {
      setAuthScreen('login');
    }
  }, [isLoggedIn]);

  if (isLoggedIn) {
    return (
      <>
        <StatusBar barStyle="light-content" />
        <DashboardLayout />
      </>
    );
  }

  return (
    <>
      <StatusBar barStyle="light-content" />
      {authScreen === 'forgotPassword' ? (
        <ForgotPasswordScreen onBackToLogin={() => setAuthScreen('login')} />
      ) : (
        <LoginScreen onForgotPassword={() => setAuthScreen('forgotPassword')} />
      )}
    </>
  );
};


export default function App() {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
    </SafeAreaProvider>
  );
}

