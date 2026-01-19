import type { APIRoute } from 'astro';
import { Resend } from 'resend';

const RECAPTCHA_SECRET_KEY = import.meta.env.RECAPTCHA_SECRET_KEY;
const RECAPTCHA_VERIFY_URL = 'https://www.google.com/recaptcha/api/siteverify';
const RESEND_API_KEY = import.meta.env.RESEND_API_KEY;
const RECIPIENT_EMAIL = 'legacymovingdenver@gmail.com';

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
 * Format form data into HTML email
 */
function formatEmailHtml(formData: FormData): string {
  const formName = formData.get('form_name') || 'Form Submission';
  const entries = Array.from(formData.entries()).filter(
    ([key]) => !['g-recaptcha-response', 'form_name', 'recipient_email'].includes(key)
  );

  let html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #0066cc; color: white; padding: 20px; border-radius: 5px 5px 0 0; }
        .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-radius: 0 0 5px 5px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #0066cc; }
        .value { margin-top: 5px; }
        .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>New ${formName}</h2>
        </div>
        <div class="content">
  `;

  entries.forEach(([key, value]) => {
    const label = key
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    html += `
      <div class="field">
        <div class="label">${label}:</div>
        <div class="value">${String(value).replace(/\n/g, '<br>')}</div>
      </div>
    `;
  });

  html += `
        </div>
        <div class="footer">
          <p>This form was submitted through Legacy Moving Denver website.</p>
          <p>Submission verified with Google reCAPTCHA.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return html;
}

/**
 * POST /api/forms/submit
 * 
 * Handles form submissions with reCAPTCHA verification
 * 
 * 1. Validates reCAPTCHA token
 * 2. Sends email via Resend
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

    // Check if Resend API key is configured
    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY environment variable is not set');
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Email service not configured. Please contact support.',
        }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // reCAPTCHA verified successfully - now send email via Resend
    const resend = new Resend(RESEND_API_KEY);
    const formName = formData.get('form_name') || 'Form Submission';
    const senderEmail = formData.get('email') as string;
    const senderName = formData.get('name') as string;

    try {
      const { data, error } = await resend.emails.send({
        from: 'Legacy Moving Denver <onboarding@resend.dev>', // Resend default sender
        to: [RECIPIENT_EMAIL],
        subject: `New ${formName} from ${senderName || 'Website'}`,
        html: formatEmailHtml(formData),
        replyTo: senderEmail || undefined,
      });

      if (error) {
        console.error('Resend email error:', error);
        return new Response(
          JSON.stringify({
            success: false,
            error: 'Failed to send email. Please try again or contact us directly at (720) 340-1849.',
          }),
          {
            status: 500,
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
      }

      console.log('Email sent successfully:', data);

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
          error: 'Failed to send email. Please try again or contact us directly at (720) 340-1849.',
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
