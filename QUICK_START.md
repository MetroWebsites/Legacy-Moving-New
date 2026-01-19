# 🚀 Quick Start Guide - Get Your Forms Working in 10 Minutes

## The Problem

Your website forms are protected with reCAPTCHA and ready to go, but they can't send emails yet because:

- ❌ **No Resend account created**
- ❌ **No API key generated**  
- ❌ **API key not added to Vercel**

## The Solution (3 Simple Steps)

### 1️⃣ Create Resend Account (3 min)

**Go to:** https://resend.com → Sign Up → Verify Email

### 2️⃣ Get API Key (2 min)

**Go to:** https://resend.com/api-keys → Create API Key → Copy it (starts with `re_`)

### 3️⃣ Add to Vercel (5 min)

**Go to:** https://vercel.com/dashboard → Your Project → Settings → Environment Variables

**Add these TWO variables:**

```
RECAPTCHA_SECRET_KEY = 6Ld-k8sAAAAAMb6-SXQjLGPQCvHRQfboIUV1Se
RESEND_API_KEY = re_[YOUR_KEY_FROM_STEP_2]
```

**Check all environments:** ✅ Production ✅ Preview ✅ Development

**Then:** Deployments → Latest → ⋮ → Redeploy (no cache)

---

## Test It!

1. Visit: https://www.legacymovingdenver.com/contact
2. Fill form + complete reCAPTCHA
3. Submit
4. Check: legacymovingdenver@gmail.com

---

## ✅ What You Get

- **5 Protected Forms:** Contact, Feedback, Local Move, Long Distance, Quick Quote
- **Spam Protection:** Google reCAPTCHA v2 on all forms
- **Professional Emails:** Beautiful HTML formatting
- **Secure:** All secrets in environment variables, never in code
- **Free:** 100 emails/day, 3,000/month

---

## 📚 More Help?

- **Detailed Setup:** [SETUP_CHECKLIST.md](./SETUP_CHECKLIST.md)
- **Troubleshooting:** [RESEND_TROUBLESHOOTING.md](./RESEND_TROUBLESHOOTING.md)
- **Security Info:** [SECURE_IMPLEMENTATION_SUMMARY.md](./SECURE_IMPLEMENTATION_SUMMARY.md)
- **Test Script:** Run `node test-resend.js` to verify your API key

---

## 🔗 Quick Links

| Resource | Link |
|----------|------|
| Resend Sign Up | https://resend.com |
| Resend API Keys | https://resend.com/api-keys |
| Resend Dashboard | https://resend.com/overview |
| Vercel Dashboard | https://vercel.com/dashboard |
| Your Website | https://www.legacymovingdenver.com |
| GitHub Repo | https://github.com/MetroWebsites/Legacy-Moving-New |

---

## 🆘 Still Stuck?

If it's not working after following all steps, share these with me:

1. ✅ Screenshot of Vercel env vars (both RECAPTCHA_SECRET_KEY and RESEND_API_KEY)
2. ✅ Error message from the form
3. ✅ Vercel function logs for `/api/forms/submit`
4. ✅ Resend dashboard email status

---

**Start here:** https://resend.com 🚀
