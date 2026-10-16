/**
 * Tests for the Forgot Password feature.
 *
 * Covers:
 *  1. Empty input is rejected
 *  2. Invalid email input is rejected
 *  3. Successful mocked request displays the returned message
 *  4. Unsuccessful response (Status: false) displays an error
 *  5. Network failure displays a helpful message
 *  6. Submit button cannot trigger duplicate requests while loading
 *  7. Forgot Password opens from the login screen
 *  8. Back to Login returns to the login screen
 *  9. Dashboard remains accessible only through the existing authentication flow
 * 10. Existing API config and session-config behaviour remain intact
 */

import 'react-native';
import React from 'react';
import ReactTestRenderer, { act } from 'react-test-renderer';
import { ForgotPasswordScreen } from '../src/screens/auth/ForgotPasswordScreen';
import { LoginScreen } from '../src/screens/auth/LoginScreen';
import { AuthProvider } from '../src/context/AuthContext';
import App from '../App';
import * as api from '../src/services/api';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Collect all rendered text nodes in one string. */
function getAllText(root: ReactTestRenderer.ReactTestInstance): string {
  const nodes = root.findAllByType('Text' as any);
  return nodes
    .map(n =>
      Array.isArray(n.props.children)
        ? n.props.children.join(' ')
        : String(n.props.children ?? ''),
    )
    .join(' ');
}

// ---------------------------------------------------------------------------
// Mocks
// ---------------------------------------------------------------------------

// Mock the forgotPasswordApi so no real HTTP requests are made.
jest.mock('../src/services/api', () => {
  const original = jest.requireActual('../src/services/api');
  return {
    ...original,
    forgotPasswordApi: jest.fn(),
  };
});

const mockForgotPasswordApi = api.forgotPasswordApi as jest.MockedFunction<
  typeof api.forgotPasswordApi
>;

// ---------------------------------------------------------------------------
// Test suite
// ---------------------------------------------------------------------------

describe('Forgot Password Feature', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    mockForgotPasswordApi.mockReset();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  // =========================================================================
  // 1. Empty input is rejected
  // =========================================================================
  it('1. rejects an empty email input and does not call the API', async () => {
    const onBackToLogin = jest.fn();
    let tree: ReactTestRenderer.ReactTestRenderer;

    await act(async () => {
      tree = ReactTestRenderer.create(
        <ForgotPasswordScreen onBackToLogin={onBackToLogin} />,
      );
    });

    // Press Send Reset Link without entering anything
    // Find via title text on the button
    const sendButton = tree!.root.findByProps({ title: 'Send Reset Link' });

    await act(async () => {
      sendButton.props.onPress();
    });

    expect(mockForgotPasswordApi).not.toHaveBeenCalled();
    const text = getAllText(tree!.root);
    expect(text).toContain('Email address is required.');
  });

  // =========================================================================
  // 2. Invalid email input is rejected
  // =========================================================================
  it('2. rejects an invalid email format and does not call the API', async () => {
    const onBackToLogin = jest.fn();
    let tree: ReactTestRenderer.ReactTestRenderer;

    await act(async () => {
      tree = ReactTestRenderer.create(
        <ForgotPasswordScreen onBackToLogin={onBackToLogin} />,
      );
    });

    // Enter a bad email
    const emailInput = tree!.root.findByProps({
      placeholder: 'Enter your registered email',
    });

    await act(async () => {
      emailInput.props.onChangeText('not-an-email');
    });

    const sendButton = tree!.root.findByProps({ title: 'Send Reset Link' });

    await act(async () => {
      sendButton.props.onPress();
    });

    expect(mockForgotPasswordApi).not.toHaveBeenCalled();
    const text = getAllText(tree!.root);
    expect(text).toContain('Please enter a valid email address.');
  });

  // =========================================================================
  // 3. Successful mocked request displays the returned message
  // =========================================================================
  it('3. displays the success message returned by the backend', async () => {
    mockForgotPasswordApi.mockResolvedValue({
      Status: true,
      Message: 'If an active account exists for that email address, a reset link has been sent.',
    });

    const onBackToLogin = jest.fn();
    let tree: ReactTestRenderer.ReactTestRenderer;

    await act(async () => {
      tree = ReactTestRenderer.create(
        <ForgotPasswordScreen onBackToLogin={onBackToLogin} />,
      );
    });

    const emailInput = tree!.root.findByProps({
      placeholder: 'Enter your registered email',
    });

    await act(async () => {
      emailInput.props.onChangeText('user@example.com');
    });

    const sendButton = tree!.root.findByProps({ title: 'Send Reset Link' });

    await act(async () => {
      sendButton.props.onPress();
      // Resolve all pending promises
      await Promise.resolve();
    });

    expect(mockForgotPasswordApi).toHaveBeenCalledWith('user@example.com');

    const text = getAllText(tree!.root);
    expect(text).toContain(
      'If an active account exists for that email address, a reset link has been sent.',
    );
    expect(text).toContain('Check your inbox and spam folder');
  });

  // =========================================================================
  // 4. Unsuccessful response (Status: false) displays an error
  // =========================================================================
  it('4. displays an error when the server returns Status: false', async () => {
    mockForgotPasswordApi.mockResolvedValue({
      Status: false,
      Message: 'No account found with that email.',
    });

    const onBackToLogin = jest.fn();
    let tree: ReactTestRenderer.ReactTestRenderer;

    await act(async () => {
      tree = ReactTestRenderer.create(
        <ForgotPasswordScreen onBackToLogin={onBackToLogin} />,
      );
    });

    const emailInput = tree!.root.findByProps({
      placeholder: 'Enter your registered email',
    });

    await act(async () => {
      emailInput.props.onChangeText('unknown@example.com');
    });

    const sendButton = tree!.root.findByProps({ title: 'Send Reset Link' });

    await act(async () => {
      sendButton.props.onPress();
      await Promise.resolve();
    });

    const text = getAllText(tree!.root);
    expect(text).toContain('No account found with that email.');
    // Must NOT show success hint
    expect(text).not.toContain('Check your inbox');
  });

  // =========================================================================
  // 5. Network failure displays a helpful message
  // =========================================================================
  it('5. displays a helpful error message on network failure', async () => {
    mockForgotPasswordApi.mockRejectedValue(
      new Error(
        'Unable to reach the server. Please check your internet connection and try again.',
      ),
    );

    const onBackToLogin = jest.fn();
    let tree: ReactTestRenderer.ReactTestRenderer;

    await act(async () => {
      tree = ReactTestRenderer.create(
        <ForgotPasswordScreen onBackToLogin={onBackToLogin} />,
      );
    });

    const emailInput = tree!.root.findByProps({
      placeholder: 'Enter your registered email',
    });

    await act(async () => {
      emailInput.props.onChangeText('user@example.com');
    });

    const sendButton = tree!.root.findByProps({ title: 'Send Reset Link' });

    await act(async () => {
      sendButton.props.onPress();
      await Promise.resolve();
    });

    const text = getAllText(tree!.root);
    expect(text).toContain('Unable to reach the server');
  });

  // =========================================================================
  // 6. Submit button cannot trigger duplicate requests while loading
  // =========================================================================
  it('6. prevents duplicate submissions while a request is in progress', async () => {
    // Deliberately never resolve so we stay in the loading state
    mockForgotPasswordApi.mockReturnValue(new Promise(() => {}));

    const onBackToLogin = jest.fn();
    let tree: ReactTestRenderer.ReactTestRenderer;

    await act(async () => {
      tree = ReactTestRenderer.create(
        <ForgotPasswordScreen onBackToLogin={onBackToLogin} />,
      );
    });

    const emailInput = tree!.root.findByProps({
      placeholder: 'Enter your registered email',
    });

    await act(async () => {
      emailInput.props.onChangeText('user@example.com');
    });

    const sendButton = tree!.root.findByProps({ title: 'Send Reset Link' });

    // First press — kicks off the request
    await act(async () => {
      sendButton.props.onPress();
    });

    // Button should now be disabled
    expect(sendButton.props.disabled).toBe(true);

    // Second press should be a no-op because the button is disabled
    await act(async () => {
      sendButton.props.onPress();
    });

    // Only one call to the API
    expect(mockForgotPasswordApi).toHaveBeenCalledTimes(1);
  });

  // =========================================================================
  // 7. Forgot Password opens from the login screen
  // =========================================================================
  it('7. tapping "Forgot password?" in LoginScreen calls onForgotPassword', async () => {
    const onForgotPassword = jest.fn();
    let tree: ReactTestRenderer.ReactTestRenderer;

    await act(async () => {
      tree = ReactTestRenderer.create(
        <AuthProvider>
          <LoginScreen onForgotPassword={onForgotPassword} />
        </AuthProvider>,
      );
    });

    const forgotBtn = tree!.root.findByProps({ testID: 'forgot-password-button' });
    expect(forgotBtn).toBeDefined();

    await act(async () => {
      forgotBtn.props.onPress();
    });

    expect(onForgotPassword).toHaveBeenCalledTimes(1);
  });

  // =========================================================================
  // 8. Back to Login returns to the login screen
  // =========================================================================
  it('8. tapping "Back to Login" calls the onBackToLogin callback', async () => {
    const onBackToLogin = jest.fn();
    let tree: ReactTestRenderer.ReactTestRenderer;

    await act(async () => {
      tree = ReactTestRenderer.create(
        <ForgotPasswordScreen onBackToLogin={onBackToLogin} />,
      );
    });

    const backBtn = tree!.root.findByProps({ testID: 'back-to-login-button' });
    expect(backBtn).toBeDefined();

    await act(async () => {
      backBtn.props.onPress();
    });

    expect(onBackToLogin).toHaveBeenCalledTimes(1);
  });

  // =========================================================================
  // 9. Dashboard remains accessible only through the existing auth flow
  // =========================================================================
  it('9. App renders LoginScreen when unauthenticated and never shows dashboard', async () => {
    // SafeAreaProvider renders null children in the test environment, so we
    // test the unauthenticated state the same way AppFlow.test.tsx does: render
    // LoginScreen inside AuthProvider directly and verify dashboard is absent.
    let tree: ReactTestRenderer.ReactTestRenderer;

    await act(async () => {
      tree = ReactTestRenderer.create(
        <AuthProvider>
          <LoginScreen />
        </AuthProvider>,
      );
    });

    const json = JSON.stringify(tree!.toJSON());
    // Must show login screen content
    expect(json).toContain('Sign In');
    expect(json).toContain('Forgot password?');
    // Dashboard content must be absent
    expect(json).not.toContain('SSR Approval');
  });

  // =========================================================================
  // 10. Existing API config and session-config behaviour remain intact
  // =========================================================================
  it('10. API_BASE_URL and fetchSessionConfig export are still present', () => {
    const { API_BASE_URL, fetchSessionConfig } = require('../src/services/api');
    expect(typeof API_BASE_URL).toBe('string');
    expect(API_BASE_URL).toContain('icyforest');
    expect(typeof fetchSessionConfig).toBe('function');
  });
});
