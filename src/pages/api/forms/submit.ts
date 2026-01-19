import type { APIRoute } from 'astro';

const RECAPTCHA_SECRET_KEY = import.meta.env.RECAPTCHA_SECRET_KEY;
const RECAPTCHA_VERIFY_URL = 'https://www.google.com/recaptcha/api/siteverify';
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mzdbndbo';

interface RecaptchaVerifyResponse {
  success: boolean;
  challenge_ts?: string;
  hostname?: string;
  'error-codes'?: string[];
}

/**
 * Verify reCAPTCHA token with Google's API
 */
async function verifyRecaptchaToken(token: string): Promise<RecaptchaVerifyResponse> {
  const response = await fetch(RECAPTCHA_VERIFY_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      secret: RECAPTCHA_SECRET_KEY,
      response: token,
    }),
  });

  if (!response.ok) {
    throw new Error(`reCAPTCHA verification failed: ${response.statusText}`);
  }

  return await response.json();
}

/**
 * POST /api/forms/submit
 * 
 * Handles form submissions with reCAPTCHA verification
 * 
 * 1. Validates reCAPTCHA token
 * 2. Forwards to email service (Formspree)
 * 3. Returns success/error response
 */
export const POST: APIRoute = async ({ request }) => {
  try {
    // Parse form data
    const formData = await request.formData();
    const recaptchaToken = formData.get('g-recaptcha-response');

    // Validate reCAPTCHA token exists
    if (!recaptchaToken || typeof recaptchaToken !== 'string') {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'reCAPTCHA verification is required',
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // Check if secret key is configured
    if (!RECAPTCHA_SECRET_KEY) {
      console.error('RECAPTCHA_SECRET_KEY environment variable is not set');
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Server configuration error. Please contact support.',
        }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // Verify reCAPTCHA token with Google
    let verificationResult: RecaptchaVerifyResponse;
    try {
      verificationResult = await verifyRecaptchaToken(recaptchaToken);
    } catch (error) {
      console.error('reCAPTCHA verification error:', error);
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Failed to verify reCAPTCHA. Please try again.',
        }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // Check if reCAPTCHA verification was successful
    if (!verificationResult.success) {
      console.warn('reCAPTCHA verification failed:', verificationResult['error-codes']);
      return new Response(
        JSON.stringify({
          success: false,
          error: 'reCAPTCHA verification failed. Please try again.',
        }),
        {
          status: 403,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // reCAPTCHA verified successfully - now forward to email service
    // Remove the reCAPTCHA token before forwarding
    formData.delete('g-recaptcha-response');

    try {
      const emailResponse = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!emailResponse.ok) {
        console.error('Formspree submission failed:', emailResponse.statusText);
        return new Response(
          JSON.stringify({
            success: false,
            error: 'Failed to send form submission. Please try again or contact us directly.',
          }),
          {
            status: 500,
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
      }

      // Success!
      return new Response(
        JSON.stringify({
          success: true,
          message: 'Form submitted successfully',
        }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    } catch (error) {
      console.error('Email service error:', error);
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Failed to send form submission. Please try again or contact us directly.',
        }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }
  } catch (error) {
    console.error('Form submission error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: 'An unexpected error occurred. Please try again.',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
};
