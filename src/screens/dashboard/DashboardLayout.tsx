import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  useWindowDimensions,
  Modal,
  TouchableWithoutFeedback,
  StatusBar,
} from 'react-native';
import { Sidebar } from './components/Sidebar';
import { HomeScreen } from './HomeScreen';
import { SsrApprovalScreen } from './SsrApprovalScreen';
import { DashboardRoute } from '../../types';

export const DashboardLayout: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<DashboardRoute>('SSR Approval');
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const { width, height } = useWindowDimensions();

  // Screen is considered landscape or wide if width > height or width >= 640
  const isLandscapeOrWide = width > height || width >= 640;

  const handleOpenMenu = () => {
    setIsMobileDrawerOpen(true);
  };

  const renderContent = (onOpenMenu?: () => void) => {
    switch (currentRoute) {
      case 'Home':
        return <HomeScreen onOpenMenu={onOpenMenu} />;
      case 'SSR Approval':
        return <SsrApprovalScreen onOpenMenu={onOpenMenu} />;
      default:
        return <SsrApprovalScreen onOpenMenu={onOpenMenu} />;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {isLandscapeOrWide ? (
        // Landscape / Desktop / Tablet View
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
        // Portrait Mobile View
        <View style={styles.mobileContainer}>
          {/* Main Content Area */}
          <View style={styles.mobileMainContent}>
            {renderContent(handleOpenMenu)}
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
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
    width: 290,
    height: '100%',
    backgroundColor: '#FFFFFF',
  },
});

