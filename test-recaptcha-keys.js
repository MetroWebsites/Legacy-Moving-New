#!/usr/bin/env node

/**
 * Test reCAPTCHA Keys Directly
 * 
 * This script tests if your reCAPTCHA keys are valid by making a direct
 * API call to Google's verification endpoint.
 * 
 * Usage:
 *   node test-recaptcha-keys.js <token>
 */

const SECRET_KEY = '6Ld-_k8sAAAAAMb6_-SXQjLGPQCvHRQfboIUV1Se';

async function testRecaptchaToken(token) {
  console.log('\n🧪 Testing reCAPTCHA Token Verification...\n');
  
  console.log('📋 Configuration:');
  console.log(`   Secret Key: ${SECRET_KEY.substring(0, 15)}...`);
  console.log(`   Token: ${token.substring(0, 30)}...`);
  console.log('');

  try {
    const params = new URLSearchParams({
      secret: SECRET_KEY,
      response: token,
    });

    console.log('🌐 Calling Google reCAPTCHA API...');
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params,
    });

    console.log(`   Status: ${response.status} ${response.statusText}`);

    const result = await response.json();
    
    console.log('\n📊 Response from Google:');
    console.log(JSON.stringify(result, null, 2));

    if (result.success) {
      console.log('\n✅ SUCCESS! The token is valid!');
      console.log(`   Verified at: ${result.challenge_ts}`);
      console.log(`   Hostname: ${result.hostname}`);
    } else {
      console.log('\n❌ FAILED! Token verification failed.');
      console.log(`   Error codes: ${result['error-codes']?.join(', ')}`);
      
      console.log('\n📖 Error Code Meanings:');
      const errorMeanings = {
        'missing-input-secret': 'The secret parameter is missing',
        'invalid-input-secret': 'The secret parameter is invalid or malformed',
        'missing-input-response': 'The response parameter (token) is missing',
        'invalid-input-response': 'The response parameter (token) is invalid or malformed',
        'bad-request': 'The request is invalid or malformed',
        'timeout-or-duplicate': 'The response is no longer valid (expired or already used)',
      };
      
      result['error-codes']?.forEach(code => {
        console.log(`   • ${code}: ${errorMeanings[code] || 'Unknown error'}`);
      });

      if (result['error-codes']?.includes('invalid-input-response')) {
        console.log('\n💡 Common causes of "invalid-input-response":');
        console.log('   1. Token was generated with a different site key');
        console.log('   2. Token is expired (older than 2 minutes)');
        console.log('   3. Token was already used once');
        console.log('   4. Site key and secret key are from different reCAPTCHA sites');
      }

      if (result['error-codes']?.includes('invalid-input-secret')) {
        console.log('\n💡 The secret key is wrong!');
        console.log('   • Double-check you copied the secret key correctly from:');
        console.log('     https://www.google.com/recaptcha/admin');
      }
    }

  } catch (error) {
    console.error('\n❌ Error calling Google API:');
    console.error(error);
  }
}

// Get token from command line
const token = process.argv[2];

if (!token) {
  console.log('Usage: node test-recaptcha-keys.js <token>');
  console.log('');
  console.log('To get a token:');
  console.log('1. Go to https://www.legacymovingdenver.com/contact');
  console.log('2. Open browser dev tools (F12)');
  console.log('3. Go to Console tab');
  console.log('4. Complete the reCAPTCHA');
  console.log('5. In console, type: document.querySelector("[name=g-recaptcha-response]").value');
  console.log('6. Copy the token and run: node test-recaptcha-keys.js <token>');
  process.exit(1);
}

testRecaptchaToken(token);
