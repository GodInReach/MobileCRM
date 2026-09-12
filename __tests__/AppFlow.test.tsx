import 'react-native';
import React from 'react';
import ReactTestRenderer, { act } from 'react-test-renderer';
import App from '../App';
import { Sidebar } from '../src/screens/dashboard/components/Sidebar';
import { HomeScreen } from '../src/screens/dashboard/HomeScreen';
import { SsrApprovalScreen } from '../src/screens/dashboard/SsrApprovalScreen';
import { LoginScreen } from '../src/screens/auth/LoginScreen';
import { AuthProvider } from '../src/context/AuthContext';

describe('Green Global Enterprise UI & Navigation', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders App cleanly without crashing', () => {
    let root: ReactTestRenderer.ReactTestRenderer;
    act(() => {
      root = ReactTestRenderer.create(<App />);
    });
    expect(root!).toBeDefined();
  });

  it('renders LoginScreen with pre-filled test email', () => {
    let tree: ReactTestRenderer.ReactTestRenderer;
    act(() => {
      tree = ReactTestRenderer.create(
        <AuthProvider>
          <LoginScreen />
        </AuthProvider>
      );
    });

    const json = JSON.stringify(tree!.toJSON());
    expect(json).toContain('GREEN GLOBAL');
    expect(json).toContain('Welcome to');
    expect(json).toContain('Green Global');
    expect(json).toContain('grow@vizoroz.com');
    expect(json).toContain('Remember me');
    expect(json).toContain('Forgot password?');
    expect(json).toContain('Sign In');
    expect(json).toContain('Secure & Encrypted');
    expect(json).toContain('2025 Green Global');
  });

  it('renders Sidebar with Home, Export, Location, and User profile', () => {
    const onNavigateMock = jest.fn();
    let tree: ReactTestRenderer.ReactTestRenderer;

    act(() => {
      tree = ReactTestRenderer.create(
        <AuthProvider>
          <Sidebar currentRoute="Home" onNavigate={onNavigateMock} />
        </AuthProvider>
      );
    });

    const json = JSON.stringify(tree!.toJSON());
    expect(json).toContain('GREEN GLOBAL');
    expect(json).toContain('Search menu items...');
    expect(json).toContain('Home');
    expect(json).toContain('Export');
    expect(json).toContain('CHENNAI');
    expect(json).toContain('VERDE MONDE - TEST');
    expect(json).toContain('Vizoroz');
    expect(json).toContain('grow@vizoroz.com');
  });

  it('expands Export item to reveal SSR Approval upon click', () => {
    const onNavigateMock = jest.fn();
    let testRenderer: ReactTestRenderer.ReactTestRenderer;

    act(() => {
      testRenderer = ReactTestRenderer.create(
        <AuthProvider>
          <Sidebar currentRoute="Home" onNavigate={onNavigateMock} />
        </AuthProvider>
      );
    });

    // Before clicking Export, SSR Approval is not shown
    let json = JSON.stringify(testRenderer!.toJSON());
    expect(json).not.toContain('SSR Approval');

    // Find the Export TouchableOpacity by testID and press it
    const exportTouchable = testRenderer!.root.findByProps({ testID: 'export-nav-item' });
    expect(exportTouchable).toBeDefined();

    act(() => {
      exportTouchable.props.onPress();
    });

    // Now SSR Approval is revealed as a child of Export
    json = JSON.stringify(testRenderer!.toJSON());
    expect(json).toContain('SSR Approval');

    // Clicking SSR Approval triggers navigation
    const ssrTouchable = testRenderer!.root.findByProps({ testID: 'ssr-approval-nav-item' });
    expect(ssrTouchable).toBeDefined();

    act(() => {
      ssrTouchable.props.onPress();
    });

    expect(onNavigateMock).toHaveBeenCalledWith('SSR Approval');
  });

  it('renders HomeScreen with only the ship background image', () => {
    let tree: ReactTestRenderer.ReactTestRenderer;
    act(() => {
      tree = ReactTestRenderer.create(<HomeScreen />);
    });
    const root = tree!.root;
    const images = root.findAllByType('Image' as any);
    expect(images.length).toBe(1);
  });

  it('renders empty SsrApprovalScreen as requested', () => {
    let tree: ReactTestRenderer.ReactTestRenderer;
    act(() => {
      tree = ReactTestRenderer.create(<SsrApprovalScreen />);
    });
    expect(tree!.toJSON()).toBeDefined();
  });
});
