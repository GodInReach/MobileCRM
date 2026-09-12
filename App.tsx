import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { LoginScreen } from './src/screens/auth/LoginScreen';
import { DashboardLayout } from './src/screens/dashboard/DashboardLayout';

const RootNavigator = () => {
  const { isLoggedIn } = useAuth();

  return (
    <>
      <StatusBar
        barStyle={isLoggedIn ? 'dark-content' : 'light-content'}
      />
      {isLoggedIn ? <DashboardLayout /> : <LoginScreen />}
    </>
  );
};

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
    </SafeAreaProvider>
  );
}
