# 📧 Resend Email Setup Guide

## Why Switch from Formspree to Resend?

**Problem with Formspree:**
- Formspree has its own reCAPTCHA validation that conflicts with ours
- We don't have full control over the email sending process
- Limited customization options

**Benefits of Resend:**
- ✅ Full control over email delivery
- ✅ Works perfectly with our reCAPTCHA verification
- ✅ **100 emails/day FREE** (3,000/month)
- ✅ Beautiful HTML email formatting
- ✅ Built for serverless (perfect for Vercel)
- ✅ Reliable delivery rates
- ✅ Simple API integration

---

## 🚀 Quick Setup (5 minutes)

### Step 1: Create Resend Account

1. Go to **https://resend.com**
2. Click **"Sign Up"** or **"Get Started"**
3. Sign up with:
   - GitHub (recommended - fastest)
   - Google
   - Or email

### Step 2: Verify Your Email

1. Check your email inbox
2. Click the verification link
3. Complete the verification

### Step 3: Get Your API Key

1. After login, you'll be on the dashboard
2. Click **"API Keys"** in the left sidebar
3. Click **"Create API Key"**
4. Enter a name: `Legacy Moving Denver Production`
5. Permission: Keep default (**Full Access**)
6. Click **"Add"**
7. **COPY THE API KEY IMMEDIATELY** (you won't see it again!)
   - Format: `re_xxxxxxxxxxxxxxxxxxxxxxxxxx`

### Step 4: Add to Vercel Environment Variables

1. Go to **https://vercel.com/dashboard**
2. Select project: **Legacy-Moving-New**
3. **Settings** → **Environment Variables**
4. Click **"Add New"**
5. Add **TWO** variables:

   **Variable 1:**
   - Name: `RECAPTCHA_SECRET_KEY`
   - Value: `6Ld-k8sAAAAAMb6-SXQjLGPQCvHRQfboIUV1Se`
   - Environments: ☑ Production ☑ Preview ☑ Development

   **Variable 2:**
   - Name: `RESEND_API_KEY`
   - Value: `re_xxxxxxxxxxxxxxxxxxxxxxxxxx` (your actual key)
   - Environments: ☑ Production ☑ Preview ☑ Development

6. Click **"Save"**
7. **Redeploy** the project (Deployments tab → click "..." → Redeploy)

---

## 📝 Environment Variable Summary

You need **TWO** environment variables set on Vercel:

```bash
RECAPTCHA_SECRET_KEY=6Ld-k8sAAAAAMb6-SXQjLGPQCvHRQfboIUV1Se
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

## 🧪 Testing

### Test Locally (Optional)

1. Update `.env` file with your Resend API key:
   ```bash
   RECAPTCHA_SECRET_KEY=6Ld-k8sAAAAAMb6-SXQjLGPQCvHRQfboIUV1Se
   RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

2. Start dev server:
   ```bash
   npm run dev
   ```

3. Test a form at: http://localhost:4322/contact

### Test Production

1. After Vercel redeploys, visit: https://www.legacymovingdenver.com/contact
2. Fill out the form
3. Complete reCAPTCHA
4. Click Submit
5. Check your email at: **legacymovingdenver@gmail.com**

---

## 📧 What Emails Look Like

Resend will send beautifully formatted HTML emails to **legacymovingdenver@gmail.com** with:

- Professional header with form name
- All form fields clearly labeled
- Proper formatting and styling
- Footer with verification note
- Reply-to set to the form submitter's email

**Example:**
```
Subject: New Quote Request from John Smith

━━━━━━━━━━━━━━━━━━━━━━━━━━
New Quote Request
━━━━━━━━━━━━━━━━━━━━━━━━━━

Name: John Smith
Email: john@example.com
Phone: (555) 123-4567
Move Date: 02/15/2024
Moving From: Denver, CO
Moving To: Boulder, CO
Message: Looking for a quote...

━━━━━━━━━━━━━━━━━━━━━━━━━━
This form was submitted through 
Legacy Moving Denver website.
Submission verified with Google reCAPTCHA.
```

---

## 🔧 Resend Dashboard Features

Once set up, you can:

- **View sent emails** - See all form submissions
- **Check delivery status** - Track if emails were delivered
- **View email content** - See exactly what was sent
- **Monitor usage** - Track how many emails sent/remaining
- **Manage API keys** - Create/delete keys as needed

Dashboard: https://resend.com/emails

---

## 💰 Pricing (Very Affordable!)

**Free Tier (Perfect for most businesses):**
- 100 emails/day
- 3,000 emails/month
- No credit card required

**Pro Plan ($20/month):**
- 50,000 emails/month
- Custom domains
- Email analytics
- Priority support

For a moving company receiving quotes, the **free tier is more than enough**!

---

## ⚠️ Important Notes

### Default Sender Address

Resend uses `onboarding@resend.dev` as the default sender for new accounts. This works perfectly fine, but you can:

**Option 1: Keep default** (easiest)
- Works immediately
- No setup needed
- Emails arrive reliably

**Option 2: Add custom domain** (optional)
- Requires DNS setup
- Emails from: `noreply@legacymovingdenver.com`
- More professional looking
- Takes 10-15 minutes to set up

For now, **Option 1 is recommended** - it works great and you can always upgrade later.

### Reply-To Feature

Even though emails come from `onboarding@resend.dev`, they have the **reply-to** header set to the customer's email address. This means when you click reply in Gmail, it will reply to the customer directly!

---

## 🔍 Troubleshooting

### "Email service not configured" Error

**Problem:** `RESEND_API_KEY` environment variable not set

**Solution:**
1. Go to Vercel → Settings → Environment Variables
2. Add `RESEND_API_KEY` with your key
3. Redeploy the project

### Emails Not Arriving

**Check these:**
1. ✅ API key is correct (starts with `re_`)
2. ✅ Environment variable is set on Vercel
3. ✅ Project has been redeployed after adding variable
4. ✅ Check spam folder in Gmail
5. ✅ Verify email in Resend dashboard (https://resend.com/emails)

### Still Having Issues?

1. **Check Vercel deployment logs:**
   - Go to Vercel Dashboard → Deployments
   - Click on latest deployment
   - Check Function Logs tab for errors

2. **Check Resend dashboard:**
   - Go to https://resend.com/emails
   - See if emails are showing up (even if failed)
   - Check error messages

3. **Test API endpoint:**
   ```bash
   curl -X POST https://www.legacymovingdenver.com/api/forms/submit \
     -F "name=Test User" \
     -F "email=test@example.com" \
     -F "form_name=Test Form"
   ```

---

## ✅ Setup Checklist

- [ ] Created Resend account
- [ ] Verified email address
- [ ] Generated API key
- [ ] Copied API key (starts with `re_`)
- [ ] Added `RECAPTCHA_SECRET_KEY` to Vercel
- [ ] Added `RESEND_API_KEY` to Vercel
- [ ] Both variables set for Production, Preview, Development
- [ ] Redeployed project on Vercel
- [ ] Tested form submission
- [ ] Received test email at legacymovingdenver@gmail.com

---

## 🎯 Summary

**What Changed:**
- ✅ Removed Formspree dependency
- ✅ Added Resend for email delivery
- ✅ Full control over email sending
- ✅ Works perfectly with our reCAPTCHA verification
- ✅ Free tier is more than sufficient

**What You Need:**
1. Resend API key (free account)
2. Add to Vercel environment variables
3. Redeploy project
4. Test and enjoy working forms!

**Support:**
- Resend Docs: https://resend.com/docs
- Resend Dashboard: https://resend.com/dashboard
- Resend Support: support@resend.com

---

🎉 **Once set up, your forms will work flawlessly with secure reCAPTCHA protection and reliable email delivery!**
