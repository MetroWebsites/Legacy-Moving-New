# Google reCAPTCHA Integration Documentation

## Overview

Google reCAPTCHA v2 has been successfully integrated into all forms across the Legacy Moving Denver website with **secure server-side verification** to protect against spam and automated submissions.

## Security Architecture

### ✅ Secure Implementation
- **Client-side**: Only the site key is exposed (public, safe)
- **Server-side**: Secret key stored in environment variables (never exposed to client)
- **API Endpoint**: All form submissions go through `/api/forms/submit` for verification
- **Token Validation**: Every submission verified with Google's API before processing
- **Rejection Policy**: Invalid reCAPTCHA tokens result in 400/403 responses

### Configuration

**Client-side** (`/src/config/recaptcha.ts`):
```typescript
export const RECAPTCHA_SITE_KEY = '6Ld-_k8sAAAAAIwGO-NtUvcsfXJUy-AUdw2UIO6b';
```

**Server-side** (`.env` - **NEVER commit to repo**):
```bash
RECAPTCHA_SECRET_KEY=your_secret_key_here
```

## Integrated Forms

The following 5 forms now include reCAPTCHA protection:

1. **ContactForm** - Main contact/quote request form
2. **FeedbackForm** - Customer feedback and rating form
3. **LocalMoveForm** - Local moving services quote form
4. **LongDistanceMoveForm** - Long-distance moving quote form
5. **QuickQuoteForm** - Quick quote ZIP code form

### Components

#### API Endpoint (`/src/pages/api/forms/submit.ts`)

Secure server-side form submission handler:

1. **Receives form data** with reCAPTCHA token
2. **Validates token** exists and is a string
3. **Verifies with Google** using secret key from environment
4. **Rejects invalid submissions** with 400/403 status codes
5. **Forwards to email service** (Formspree) only if verified
6. **Returns JSON response** with success/error status

**Security Features:**
- Secret key never exposed to client
- All submissions must pass Google verification
- Detailed error logging for debugging
- Graceful error handling with user-friendly messages

#### ReCAPTCHA Component (`/src/components/ReCAPTCHA.tsx`)

A reusable wrapper component that:
- Dynamically loads the reCAPTCHA library client-side only (prevents SSR issues)
- Shows a placeholder during server-side rendering
- Uses **only the public site key** (secure)
- Supports light/dark themes
- Supports compact/normal/invisible sizes
- Provides onChange, onExpired, and onErrored callbacks
- Passes through a ref to access reCAPTCHA methods

#### Verification Utility (Server-side only)

Built into `/src/pages/api/forms/submit.ts`:
- `verifyRecaptchaToken(token)` - Verifies token with Google's API using secret key
- Runs only on the server (Astro API route)
- Returns detailed verification response

### Form Integration Pattern

Each form follows this secure pattern:

1. **Import the component:**
```typescript
import { ReCAPTCHAComponent } from './ReCAPTCHA';
import type ReCAPTCHA from 'react-google-recaptcha';
```

2. **Add state and ref:**
```typescript
const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
const [errorMessage, setErrorMessage] = useState<string>("");
const recaptchaRef = useRef<ReCAPTCHA>(null);
```

3. **Include in form JSX:**
```tsx
<ReCAPTCHAComponent
  recaptchaRef={recaptchaRef}
  onChange={(token) => setRecaptchaToken(token)}
  onExpired={() => setRecaptchaToken(null)}
  onErrored={() => setRecaptchaToken(null)}
/>
```

4. **Submit to secure API endpoint:**
```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  if (!recaptchaToken) {
    setSubmitStatus("error");
    setErrorMessage("Please complete the reCAPTCHA verification.");
    return;
  }
  
  // Add token to form data
  form.append('g-recaptcha-response', recaptchaToken);
  
  // Submit to our secure API endpoint (not directly to email service)
  const response = await fetch("/api/forms/submit", {
    method: "POST",
    body: form,
  });

  const result = await response.json();

  if (response.ok && result.success) {
    // Success - server verified reCAPTCHA and sent email
    setSubmitStatus("success");
    setFormData(defaultFormData);
    setRecaptchaToken(null);
    recaptchaRef.current?.reset();
  } else {
    // Error - show server error message
    setSubmitStatus("error");
    setErrorMessage(result.error || "There was an error submitting your request.");
    recaptchaRef.current?.reset();
    setRecaptchaToken(null);
  }
};
```

5. **Display server error messages:**
```tsx
{submitStatus === "error" && (
  <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
    {errorMessage || "There was an error submitting your request."}
  </div>
)}
```

6. **Disable submit button when no token:**
```tsx
<Button
  type="submit"
  disabled={isSubmitting || !recaptchaToken}
>
  Submit Form
</Button>
```

## Features

### Security (Enhanced)
- ✅ **Server-side verification** - All tokens verified with Google before processing
- ✅ **Environment variables** - Secret key never exposed to client code
- ✅ **API gateway pattern** - Single secure endpoint for all form submissions
- ✅ **Token validation** - Submissions rejected if reCAPTCHA fails (400/403)
- ✅ **Protection against**: Bots, spam, automated submissions, replay attacks
- ✅ **Secure credential storage** - `.env` file excluded from version control

### User Experience
- ✅ Clear visual feedback with reCAPTCHA checkbox
- ✅ Submit button disabled until reCAPTCHA is completed
- ✅ Automatic reset after form submission
- ✅ Error handling for expired or failed verifications
- ✅ **Server error messages** displayed to users
- ✅ Responsive design that works on all devices

### Technical
- ✅ SSR-compatible (dynamic client-side loading)
- ✅ TypeScript support with proper typing
- ✅ Reusable component architecture
- ✅ Minimal bundle size impact
- ✅ **Astro API routes** for server-side logic
- ✅ No breaking changes to existing forms
- ✅ **Separation of concerns** - Client renders, server validates

## Setup & Deployment

### Environment Variables Setup

1. **Local Development:**
   ```bash
   # Copy the example file
   cp .env.example .env
   
   # Edit .env and add your secret key
   RECAPTCHA_SECRET_KEY=your_actual_secret_key_here
   ```

2. **Production Deployment (Vercel):**
   ```bash
   # Set environment variable via Vercel CLI
   vercel env add RECAPTCHA_SECRET_KEY
   
   # Or via Vercel Dashboard:
   # Project Settings → Environment Variables → Add
   # Name: RECAPTCHA_SECRET_KEY
   # Value: your_actual_secret_key_here
   ```

3. **Production Deployment (Other Platforms):**
   - **Netlify**: Site Settings → Environment Variables
   - **CloudFlare Pages**: Settings → Environment Variables
   - **AWS/Heroku**: Platform-specific environment variable configuration

### Security Checklist

- [ ] `.env` file is in `.gitignore` (✅ Already done)
- [ ] Secret key stored in environment variables only
- [ ] Secret key NEVER committed to repository
- [ ] Production environment variables configured
- [ ] API endpoint `/api/forms/submit` is working
- [ ] Form submissions go through API (not directly to email service)
- [ ] Server returns appropriate error codes (400/403 for invalid tokens)

### Manual Testing Checklist
- [ ] Each form displays the reCAPTCHA widget
- [ ] Submit button is disabled until reCAPTCHA is completed
- [ ] Completing reCAPTCHA enables submit button
- [ ] **Form submits to `/api/forms/submit`** (check Network tab)
- [ ] **Server validates reCAPTCHA** before sending email
- [ ] **Success message shows only when server returns 200**
- [ ] **Error messages from server are displayed** on failure
- [ ] reCAPTCHA resets after form submission
- [ ] Error message shows if submission attempted without reCAPTCHA
- [ ] Works across all browsers (Chrome, Firefox, Safari, Edge)
- [ ] Mobile responsive on different screen sizes
- [ ] **API returns 400 without token, 403 with invalid token**

### API Endpoint Testing

Test the secure endpoint:
```bash
# Test without reCAPTCHA token (should fail with 400)
curl -X POST http://localhost:4321/api/forms/submit \
  -F "name=Test User" \
  -F "email=test@example.com"

# Test with invalid token (should fail with 403)
curl -X POST http://localhost:4321/api/forms/submit \
  -F "name=Test User" \
  -F "email=test@example.com" \
  -F "g-recaptcha-response=invalid_token"
```

## Dependencies

New packages added:
- `react-google-recaptcha` - reCAPTCHA React component
- `@types/react-google-recaptcha` - TypeScript definitions

## Architecture Summary

### Flow Diagram
```
User fills form → Completes reCAPTCHA → Clicks Submit
                                            ↓
                                 Frontend validation (token exists)
                                            ↓
                              POST /api/forms/submit with token
                                            ↓
                              Server-side verification with Google
                                            ↓
                         ✅ Valid → Forward to Formspree → Success
                         ❌ Invalid → Return 400/403 → Show error
```

### Security Layers
1. **Client-side**: UI feedback, token capture, basic validation
2. **API Gateway**: `/api/forms/submit` endpoint
3. **Server-side**: Google reCAPTCHA verification with secret key
4. **Email Service**: Formspree (only receives verified submissions)

## Maintenance

### Updating Credentials
If reCAPTCHA keys need to be changed:
1. Update site key in `/src/config/recaptcha.ts`
2. Update secret key in `.env` file (local) and deployment platform (production)
3. Rebuild and deploy the application

### Monitoring
Monitor reCAPTCHA performance in the Google reCAPTCHA Admin Console:
- https://www.google.com/recaptcha/admin

## Browser Compatibility

reCAPTCHA v2 is supported on:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Known Limitations

1. Requires JavaScript to be enabled
2. May require user interaction (checkbox click)
3. Tokens expire after 2 minutes
4. Requires internet connection to Google's servers

## Troubleshooting

### reCAPTCHA not displaying
- Check browser console for errors
- Verify site key is correct in `/src/config/recaptcha.ts`
- Ensure the domain is registered in reCAPTCHA admin
- Check for ad blockers or privacy extensions

### API Endpoint Errors

**"Server configuration error"**
- Ensure `RECAPTCHA_SECRET_KEY` is set in environment variables
- Check `.env` file exists in local development
- Verify environment variable is set in production platform

**400 Bad Request**
- reCAPTCHA token is missing from form submission
- Check that `g-recaptcha-response` field is being sent

**403 Forbidden**
- reCAPTCHA token verification failed with Google
- Token may be expired (2 minute limit)
- Token may be invalid or tampered with
- Secret key may be incorrect

### Build errors
- Clear node_modules and reinstall dependencies
- Verify TypeScript configuration
- Check that all imports are correct
- Ensure `.env` file exists for local builds

### Form submission failures
- Open browser DevTools → Network tab
- Verify request goes to `/api/forms/submit` (not Formspree directly)
- Check response status code and error message
- Verify token is captured in onChange handler
- Ensure `.env` has correct secret key

## Support

For issues or questions:
1. Check Google reCAPTCHA documentation: https://developers.google.com/recaptcha
2. Review react-google-recaptcha docs: https://github.com/dozoisch/react-google-recaptcha
3. Check application logs for errors

## Version History

- **v2.0.0** (2026-01-19) - **Secure server-side verification**
  - ✅ Removed secret key from client-side code
  - ✅ Created `/api/forms/submit` endpoint with server-side verification
  - ✅ Environment variable configuration (.env file)
  - ✅ All forms now submit to secure API endpoint
  - ✅ Server validates reCAPTCHA before forwarding to email service
  - ✅ Proper error handling and user feedback
  - ✅ Security best practices implemented
  
- **v1.0.0** (2026-01-19) - Initial integration across all 5 forms
  - ContactForm
  - FeedbackForm
  - LocalMoveForm
  - LongDistanceMoveForm
  - QuickQuoteForm
