import { RECAPTCHA_CONFIG, RECAPTCHA_VERIFY_URL } from '../config/recaptcha';

export interface RecaptchaVerifyResponse {
  success: boolean;
  challenge_ts?: string;
  hostname?: string;
  'error-codes'?: string[];
}

/**
 * Verify reCAPTCHA token on the server side
 * @param token - The reCAPTCHA token to verify
 * @returns Promise with verification result
 */
export async function verifyRecaptchaToken(token: string): Promise<RecaptchaVerifyResponse> {
  try {
    const response = await fetch(RECAPTCHA_VERIFY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret: RECAPTCHA_CONFIG.secretKey,
        response: token,
      }),
    });

    if (!response.ok) {
      throw new Error(`reCAPTCHA verification failed: ${response.statusText}`);
    }

    const data: RecaptchaVerifyResponse = await response.json();
    return data;
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return {
      success: false,
      'error-codes': ['verification-failed'],
    };
  }
}

/**
 * Check if reCAPTCHA token is valid
 * @param token - The reCAPTCHA token to verify
 * @returns Promise<boolean> - true if token is valid
 */
export async function isRecaptchaValid(token: string | null): Promise<boolean> {
  if (!token) {
    return false;
  }

  const result = await verifyRecaptchaToken(token);
  return result.success;
}
