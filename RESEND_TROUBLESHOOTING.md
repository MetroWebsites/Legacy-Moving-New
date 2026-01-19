# 🔧 Resend Troubleshooting Guide

## Common Issues & Solutions

### ❌ Issue: "Email service not configured"

**Symptom:** Forms fail with error message about email service configuration

**Cause:** `RESEND_API_KEY` environment variable is not set on Vercel

**Solution:**
1. Go to https://vercel.com/dashboard
2. Select "Legacy-Moving-New" project
3. Settings → Environment Variables
4. Verify `RESEND_API_KEY` exists
5. If missing, add it: `re_xxxxxxxxxxxxx`
6. Make sure it's enabled for Production, Preview, Development
7. **Redeploy the project** (this is critical!)

---

### ❌ Issue: Forms submit but no email arrives

**Possible Causes & Solutions:**

#### 1. Check Resend Dashboard
1. Go to https://resend.com/emails
2. Look for your sent emails
3. Check the status:
   - ✅ **Delivered** - Email was sent successfully
   - ⏳ **Queued** - Email is being processed
   - ❌ **Failed** - Check error message

#### 2. Check Email Destination
- Emails are sent to: **legacymovingdenver@gmail.com**
- Check spam/junk folder
- Check all folders in Gmail
- Search for "onboarding@resend.dev" in Gmail

#### 3. Verify API Key is Active
1. Go to https://resend.com/api-keys
2. Check that your API key is **Active** (not paused/deleted)
3. If unsure, create a new API key and update Vercel

#### 4. Check Vercel Function Logs
1. Go to Vercel Dashboard → Deployments
2. Click on latest deployment
3. Go to "Functions" tab
4. Look for `/api/forms/submit` logs
5. Check for error messages

---

### ❌ Issue: "Failed to verify reCAPTCHA"

**Cause:** `RECAPTCHA_SECRET_KEY` is missing or incorrect

**Solution:**
1. Verify in Vercel environment variables:
   - Name: `RECAPTCHA_SECRET_KEY`
   - Value: `6Ld-k8sAAAAAMb6-SXQjLGPQCvHRQfboIUV1Se`
2. Make sure it's set for all environments
3. Redeploy after adding

---

### ❌ Issue: "Invalid API key" or 401 errors

**Cause:** Wrong API key format or expired key

**Solution:**
1. API key must start with `re_`
2. Create a fresh API key at https://resend.com/api-keys
3. Copy the ENTIRE key (they're long!)
4. Update Vercel environment variable
5. Redeploy

---

### ❌ Issue: Emails going to spam

**Cause:** Using onboarding@resend.dev sender

**Solutions:**

#### Quick Fix (Keep onboarding domain):
- Add onboarding@resend.dev to Gmail contacts
- Mark one email as "Not Spam"
- Future emails should arrive in inbox

#### Long-term Fix (Add custom domain):
See "Setting Up Custom Domain" section below

---

## 🔍 Debugging Steps

### Step 1: Check Environment Variables on Vercel

```bash
# Go to Vercel Dashboard
# Settings → Environment Variables
# Verify both exist:

RECAPTCHA_SECRET_KEY=6Ld-k8sAAAAAMb6-SXQjLGPQCvHRQfboIUV1Se
RESEND_API_KEY=re_xxxxxxxxxxxxx
```

### Step 2: Check Deployment Logs

1. Vercel Dashboard → Deployments
2. Click latest deployment
3. Check build logs for errors
4. Check function logs during form submission

### Step 3: Test API Endpoint Directly

```bash
# Test with curl (replace with your domain)
curl -X POST https://www.legacymovingdenver.com/api/forms/submit \
  -F "name=Test User" \
  -F "email=test@example.com" \
  -F "phone=555-1234" \
  -F "form_name=Test Form" \
  -F "g-recaptcha-response=test_token_will_fail"

# Expected: 403 error (reCAPTCHA verification failed)
# This confirms the endpoint is working
```

### Step 4: Check Resend Account Status

1. Go to https://resend.com/dashboard
2. Check usage stats
3. Verify account is active
4. Check for any warnings/alerts

---

## 📧 Setting Up Custom Domain (Optional)

If you want emails to come from `@legacymovingdenver.com` instead of `onboarding@resend.dev`:

### Step 1: Add Domain to Resend

1. Go to https://resend.com/domains
2. Click "Add Domain"
3. Enter: `legacymovingdenver.com`
4. Click "Add"

### Step 2: Add DNS Records

Resend will provide DNS records to add. You'll need to add these to your domain registrar:

**Required Records:**
- SPF record (TXT)
- DKIM record (TXT)
- DMARC record (TXT)

**Where to add:**
- If domain is on Cloudflare: DNS settings
- If domain is on GoDaddy: DNS management
- If domain is on Namecheap: Advanced DNS

### Step 3: Verify Domain

1. After adding DNS records, wait 5-10 minutes
2. In Resend dashboard, click "Verify"
3. Status should change to "Verified"

### Step 4: Update Code

Only after domain is verified, update the code:

```typescript
// In src/pages/api/forms/submit.ts
from: 'Legacy Moving Denver <noreply@legacymovingdenver.com>',
```

**Note:** This is optional. The default `onboarding@resend.dev` works fine!

---

## 🧪 Quick Test Checklist

Run through this checklist if forms aren't working:

- [ ] Resend account created and verified
- [ ] API key generated (starts with `re_`)
- [ ] `RESEND_API_KEY` added to Vercel
- [ ] `RECAPTCHA_SECRET_KEY` added to Vercel
- [ ] Both variables set for Production, Preview, Development
- [ ] Project redeployed after adding variables
- [ ] Checked Vercel function logs for errors
- [ ] Checked Resend dashboard for sent emails
- [ ] Checked Gmail spam folder
- [ ] Waited 2-3 minutes for email delivery

---

## 📞 Getting Help

### Check Logs First

**Vercel Logs:**
```
Vercel Dashboard → Deployments → Latest → Functions
Look for: /api/forms/submit
```

**Resend Dashboard:**
```
https://resend.com/emails
Check status of recent emails
```

### Common Log Messages

**"RESEND_API_KEY environment variable is not set"**
→ Add RESEND_API_KEY to Vercel and redeploy

**"Invalid API key"**
→ Check API key format (starts with `re_`)

**"Failed to verify reCAPTCHA"**
→ Check RECAPTCHA_SECRET_KEY is set correctly

**"Email sent successfully"**
→ Email was sent! Check spam folder

---

## 💡 Pro Tips

### Tip 1: Monitor Email Delivery
- Bookmark https://resend.com/emails
- Check after each test submission
- See exactly what was sent

### Tip 2: Test in Stages
1. First, test reCAPTCHA validation (use fake token)
2. Then, test with real reCAPTCHA completion
3. Finally, verify email arrives

### Tip 3: Use Resend Webhooks (Advanced)
- Get notified when emails are delivered/bounced
- Track open rates (optional)
- Monitor engagement

### Tip 4: Create Test API Key
- Keep one key for production
- Use separate key for testing
- Easy to rotate if needed

---

## 🎯 Still Not Working?

If you've tried everything above:

1. **Share Vercel logs with me**
   - Go to Deployments → Functions
   - Copy error messages from `/api/forms/submit`

2. **Share Resend dashboard status**
   - Do emails show up at https://resend.com/emails?
   - What status do they show?

3. **Verify environment variables**
   - Take screenshot of Vercel environment variables (hide values)
   - Confirm both keys are set

4. **Try creating new API key**
   - Sometimes keys get corrupted
   - Generate fresh key at https://resend.com/api-keys
   - Update Vercel and redeploy

---

## 📊 Expected Behavior

### When Everything Works:

1. User fills form → Completes reCAPTCHA → Submits
2. Frontend sends request to `/api/forms/submit`
3. Server verifies reCAPTCHA with Google ✓
4. Server sends email via Resend API ✓
5. Resend delivers email to Gmail ✓
6. Email arrives in legacymovingdenver@gmail.com inbox ✓
7. User sees success message on website ✓

### Timeline:
- Form submission: Instant
- Email delivery: 1-10 seconds
- Appears in Gmail: Within 30 seconds

---

**Need more help? Let me know what error messages you're seeing!**
