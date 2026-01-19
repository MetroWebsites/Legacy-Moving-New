# Setup Checklist for Resend Integration

## ⚠️ CRITICAL: You Need to Complete These Steps

### Step 1: Create Resend Account (5 minutes)

1. **Go to**: https://resend.com
2. **Click**: "Sign Up" (top right)
3. **Create account** with your email
4. **Verify** your email address
5. **Log in** to your new Resend account

### Step 2: Get Your Resend API Key (2 minutes)

1. **After logging in**, go to: https://resend.com/api-keys
2. **Click**: "Create API Key"
3. **Name it**: "Legacy Moving Denver Production"
4. **Click**: "Create"
5. **COPY THE KEY** immediately (starts with `re_`) - you won't see it again!
   - Example format: `re_123abc456def789ghi012jkl345mno678`

### Step 3: Add to Vercel Environment Variables (3 minutes)

1. **Go to**: https://vercel.com/dashboard
2. **Select**: Your project "Legacy-Moving-New"
3. **Click**: Settings (left sidebar)
4. **Click**: Environment Variables
5. **Add TWO variables**:

   **Variable 1:**
   - **Name**: `RECAPTCHA_SECRET_KEY`
   - **Value**: `6Ld-k8sAAAAAMb6-SXQjLGPQCvHRQfboIUV1Se`
   - **Environments**: ✅ Production, ✅ Preview, ✅ Development

   **Variable 2:**
   - **Name**: `RESEND_API_KEY`
   - **Value**: `re_YOUR_ACTUAL_KEY_HERE` (paste the key from Step 2)
   - **Environments**: ✅ Production, ✅ Preview, ✅ Development

6. **Click**: "Save"

### Step 4: Redeploy Your Site (1 minute)

1. **In Vercel**, go to "Deployments" tab
2. **Click** on the latest deployment
3. **Click** the three dots (⋮) in the top right
4. **Click**: "Redeploy"
5. **Select**: "Use existing Build Cache: No"
6. **Click**: "Redeploy"

### Step 5: Test the Integration (2 minutes)

1. **Wait** for deployment to complete (~2 minutes)
2. **Go to**: https://www.legacymovingdenver.com/contact
3. **Fill out** the form with test data
4. **Complete** the reCAPTCHA checkbox
5. **Click**: Submit
6. **Check Gmail**: legacymovingdenver@gmail.com (check spam folder too!)

---

## 🔍 Debugging if It Still Doesn't Work

### Check #1: Vercel Function Logs

1. **Go to**: https://vercel.com/dashboard
2. **Click**: Your project
3. **Click**: "Deployments" tab
4. **Click**: Your latest deployment
5. **Click**: "Functions" tab
6. **Look for**: `/api/forms/submit` logs
7. **Read** any error messages

### Check #2: Resend Dashboard

1. **Go to**: https://resend.com/emails
2. **Check**: Recent emails
3. **Look for**: Status (Delivered, Queued, Failed)

### Check #3: Common Issues

| Issue | Solution |
|-------|----------|
| "Email service not configured" | Resend API key not set in Vercel |
| "reCAPTCHA verification failed" | reCAPTCHA secret key not set in Vercel |
| "Failed to send email" | Check Resend API key is correct |
| Email not received | Check spam folder, wait 1-2 minutes |
| Form shows success but no email | Check Resend dashboard for delivery status |

---

## 📋 Quick Test Checklist

Before contacting support, please verify:

- [ ] Resend account created and email verified
- [ ] Resend API key copied (starts with `re_`)
- [ ] Both environment variables added to Vercel (RECAPTCHA_SECRET_KEY and RESEND_API_KEY)
- [ ] Environment variables selected for Production, Preview, Development
- [ ] Site redeployed AFTER adding environment variables
- [ ] Test form submission completed
- [ ] Gmail inbox checked (including spam folder)
- [ ] Vercel function logs reviewed for errors
- [ ] Resend dashboard checked for email status

---

## 🆘 Still Need Help?

If you've completed all steps and it's still not working, please provide:

1. **Screenshot** of Vercel Environment Variables page (showing BOTH variables exist)
2. **Screenshot** of Resend dashboard (showing your API keys page)
3. **Error message** from form submission (if any)
4. **Vercel function logs** for `/api/forms/submit` (copy/paste the full log)
5. **Resend email status** (from https://resend.com/emails)

---

## ✅ Success Criteria

You'll know it's working when:

1. ✅ Form submission shows "Form submitted successfully"
2. ✅ Email arrives in legacymovingdenver@gmail.com
3. ✅ Email has professional formatting with form data
4. ✅ Email subject is "New [Form Name] - Legacy Moving Denver"
5. ✅ Email sender is "onboarding@resend.dev"
6. ✅ Reply-to is set to customer's email

---

## 📚 Additional Resources

- **Resend Dashboard**: https://resend.com/overview
- **Resend API Keys**: https://resend.com/api-keys
- **Resend Emails**: https://resend.com/emails
- **Resend Documentation**: https://resend.com/docs
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Google reCAPTCHA Admin**: https://www.google.com/recaptcha/admin

---

## 🎯 Next Steps

**RIGHT NOW:**

1. Go to https://resend.com and create your account
2. Get your API key from https://resend.com/api-keys
3. Add it to Vercel: https://vercel.com/dashboard
4. Redeploy your site
5. Test the contact form

**Total Time Required: ~10 minutes**
