# Remaining Forms to Update

## QuickQuoteForm
- Remove reCAPTCHA imports and refs
- Add Web3Forms access key and bot protection fields  
- Update form submission to use JSON instead of FormData
- Simplify error handling

## LongDistanceMoveForm  
- Same updates as QuickQuoteForm
- Ensure all form fields are properly included

Both forms need:
1. Remove: import { ReCAPTCHAComponent } from './ReCAPTCHA';
2. Remove: import type ReCAPTCHA from 'react-google-recaptcha';
3. Remove: recaptchaRef and recaptchaToken state
4. Add: access_key, subject, from_name, botcheck to defaultFormData
5. Update: submission to Web3Forms with JSON payload
6. Remove: reCAPTCHA component from JSX
7. Add: honeypot field for bot protection
