export const API_BASE_URL =
  'https://ggt-api.icyforest-a77494ac.southeastasia.azurecontainerapps.io';

export interface SessionConfig {
  timeout_minutes: number;
  warning_before_seconds: number;
}

export async function fetchSessionConfig(): Promise<SessionConfig> {
  const response = await fetch(
    `${API_BASE_URL}/api/auth/session-config`,
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch session config: HTTP ${response.status}`,
    );
  }

  return response.json() as Promise<SessionConfig>;
}

export interface ForgotPasswordResponse {
  Status: boolean;
  Message: string;
}

/**
 * Requests a password-reset email for the given address.
 * Only calls POST /api/auth/forgot-password — does not reset any password.
 */
export async function forgotPasswordApi(
  email: string,
): Promise<ForgotPasswordResponse> {
  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}/api/auth/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ Email: email.trim() }),
    });
  } catch {
    throw new Error(
      'Unable to reach the server. Please check your internet connection and try again.',
    );
  }

  let data: unknown;
  try {
    data = await response.json();
  } catch {
    if (!response.ok) {
      throw new Error(
        `Request failed (HTTP ${response.status}). Please try again later.`,
      );
    }
    throw new Error('Received an unexpected response from the server.');
  }

  if (!response.ok) {
    const errData = data as Record<string, unknown>;
    const message =
      (typeof errData?.Message === 'string' && errData.Message) ||
      (typeof errData?.detail === 'string' && errData.detail) ||
      (typeof errData?.error === 'string' && errData.error) ||
      `Request failed (HTTP ${response.status}). Please try again later.`;
    throw new Error(message);
  }

  const result = data as Record<string, unknown>;
  if (typeof result?.Status !== 'boolean' || typeof result?.Message !== 'string') {
    throw new Error('Received an unexpected response from the server.');
  }

  return { Status: result.Status as boolean, Message: result.Message as string };
}
