import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Sidebar } from './components/Sidebar';
import { HomeScreen } from './HomeScreen';
import { SsrApprovalScreen } from './SsrApprovalScreen';
import { DashboardRoute } from '../../types';

export const DashboardLayout: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<DashboardRoute>('Home');
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const { width, height } = useWindowDimensions();

  // Screen is considered landscape or wide if width > height or width >= 640
  const isLandscapeOrWide = width > height || width >= 640;

  const renderContent = () => {
    switch (currentRoute) {
      case 'Home':
        return <HomeScreen />;
      case 'SSR Approval':
        return <SsrApprovalScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        {isLandscapeOrWide ? (
          // Landscape / Desktop / Tablet View (Exact match with Screenshot 2)
          <View style={styles.sideBySideContainer}>
            <Sidebar
              currentRoute={currentRoute}
              onNavigate={(route) => setCurrentRoute(route)}
            />
            <View style={styles.mainContentContainer}>
              {renderContent()}
            </View>
          </View>
        ) : (
          // Portrait Mobile View (Responsive with drawer toggle)
          <View style={styles.mobileContainer}>
            {/* Top Bar with Brand Logo & Menu Toggle */}
            <View style={styles.mobileTopBar}>
              <TouchableOpacity
                style={styles.mobileMenuBtn}
                onPress={() => setIsMobileDrawerOpen(true)}
                activeOpacity={0.7}
              >
                {/* 3-bar hamburger icon */}
                <View style={styles.hamburgerBar} />
                <View style={styles.hamburgerBar} />
                <View style={styles.hamburgerBar} />
              </TouchableOpacity>
            </View>

            {/* Main Content Area */}
            <View style={styles.mobileMainContent}>
              {renderContent()}
            </View>

            {/* Slide-in Mobile Drawer */}
            <Modal
              visible={isMobileDrawerOpen}
              transparent
              animationType="fade"
              onRequestClose={() => setIsMobileDrawerOpen(false)}
            >
              <TouchableWithoutFeedback onPress={() => setIsMobileDrawerOpen(false)}>
                <View style={styles.modalOverlay}>
                  <TouchableWithoutFeedback>
                    <View style={styles.modalSidebarWrapper}>
                      <Sidebar
                        currentRoute={currentRoute}
                        onNavigate={(route) => {
                          setCurrentRoute(route);
                          setIsMobileDrawerOpen(false);
                        }}
                        onCloseMobileDrawer={() => setIsMobileDrawerOpen(false)}
                      />
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </TouchableWithoutFeedback>
            </Modal>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
  },
  sideBySideContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  mainContentContainer: {
    flex: 1,
    height: '100%',
  },
  mobileContainer: {
    flex: 1,
    position: 'relative',
  },
  mobileTopBar: {
    position: 'absolute',
    top: 12,
    left: 12,
    zIndex: 20,
  },
  mobileMenuBtn: {
    width: 42,
    height: 42,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  hamburgerBar: {
    width: 20,
    height: 2.2,
    backgroundColor: '#334155',
    borderRadius: 2,
    marginVertical: 2,
  },
  mobileMainContent: {
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    flexDirection: 'row',
  },
  modalSidebarWrapper: {
    width: 280,
    height: '100%',
    backgroundColor: '#FFFFFF',
  },
});
