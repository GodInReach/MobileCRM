import { useContext } from 'react';
import { SafeAreaInsetsContext, EdgeInsets } from 'react-native-safe-area-context';

const DEFAULT_INSETS: EdgeInsets = {
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
};

/**
 * Hook that returns the current safe area insets.
 * Unlike useSafeAreaInsets(), this will not throw when rendered
 * outside of a SafeAreaProvider (e.g. during isolated unit tests),
 * and instead safely falls back to zero insets.
 */
export const useAppInsets = (): EdgeInsets => {
  const insets = useContext(SafeAreaInsetsContext);
  return insets ?? DEFAULT_INSETS;
};
