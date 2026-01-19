#!/usr/bin/env node

/**
 * Quick Test Script for Resend API
 * 
 * This script helps you verify that your Resend API key is working correctly
 * before deploying to production.
 * 
 * Usage:
 *   1. Install dependencies: npm install resend
 *   2. Create a .env file with: RESEND_API_KEY=re_your_key_here
 *   3. Run: node test-resend.js
 */

const { Resend } = require('resend');
require('dotenv').config();

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const TEST_RECIPIENT = 'legacymovingdenver@gmail.com';

async function testResend() {
  console.log('\n🧪 Testing Resend Integration...\n');

  // Check 1: API Key exists
  if (!RESEND_API_KEY || RESEND_API_KEY === 'your_resend_api_key_here') {
    console.error('❌ RESEND_API_KEY not set in .env file');
    console.log('\n📝 To fix:');
    console.log('1. Go to: https://resend.com/api-keys');
    console.log('2. Create an API key');
    console.log('3. Add to .env file: RESEND_API_KEY=re_your_key_here');
    process.exit(1);
  }

  console.log('✅ RESEND_API_KEY found in environment');
  console.log(`   Key starts with: ${RESEND_API_KEY.substring(0, 10)}...`);

  // Check 2: Try to send a test email
  console.log('\n📧 Attempting to send test email...');
  
  const resend = new Resend(RESEND_API_KEY);

  try {
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: [TEST_RECIPIENT],
      subject: 'Test Email - Legacy Moving Denver',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            .success { background: #d4edda; border: 1px solid #c3e6cb; padding: 15px; border-radius: 5px; color: #155724; }
            .code { background: #f8f9fa; padding: 10px; border-radius: 3px; font-family: monospace; margin: 10px 0; }
          </style>
        </head>
        <body>
          <div class="success">
            <h2>✅ Resend Integration Test Successful!</h2>
            <p>Your Resend API key is working correctly.</p>
            <p><strong>Test Details:</strong></p>
            <ul>
              <li><strong>From:</strong> onboarding@resend.dev</li>
              <li><strong>To:</strong> ${TEST_RECIPIENT}</li>
              <li><strong>Time:</strong> ${new Date().toISOString()}</li>
            </ul>
            <p>You can now deploy your forms to production with confidence! 🚀</p>
            <div class="code">
              <strong>Next Steps:</strong><br>
              1. Add RESEND_API_KEY to Vercel environment variables<br>
              2. Add RECAPTCHA_SECRET_KEY to Vercel environment variables<br>
              3. Redeploy your site<br>
              4. Test the contact form on your live site
            </div>
          </div>
        </body>
        </html>
      `,
    });

    if (error) {
      console.error('❌ Failed to send test email');
      console.error('   Error:', JSON.stringify(error, null, 2));
      
      if (error.message && error.message.includes('API key')) {
        console.log('\n📝 Possible issues:');
        console.log('1. API key is invalid or expired');
        console.log('2. API key doesn\'t have permission to send emails');
        console.log('3. Resend account needs verification');
        console.log('\n🔗 Check your API keys: https://resend.com/api-keys');
      }
      
      process.exit(1);
    }

    console.log('✅ Test email sent successfully!');
    console.log(`   Email ID: ${data.id}`);
    console.log(`\n📬 Check ${TEST_RECIPIENT} for the test email`);
    console.log('   (It may take 1-2 minutes to arrive, check spam folder too)');
    
    console.log('\n🎉 SUCCESS! Your Resend integration is working perfectly!');
    console.log('\n📝 Next steps:');
    console.log('1. Add this API key to Vercel environment variables');
    console.log('2. Add RECAPTCHA_SECRET_KEY to Vercel environment variables');
    console.log('3. Redeploy your site');
    console.log('4. Test the contact form on your live site');
    
    console.log('\n🔗 Useful links:');
    console.log('   Resend Dashboard: https://resend.com/overview');
    console.log('   Vercel Dashboard: https://vercel.com/dashboard');
    console.log('   Your Site: https://www.legacymovingdenver.com/contact');

  } catch (error) {
    console.error('❌ Unexpected error:', error.message);
    if (error.stack) {
      console.error('   Stack:', error.stack);
    }
    process.exit(1);
  }
}

// Run the test
testResend().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
