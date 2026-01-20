# Quick Test Guide - hCaptcha Forms

## 🚀 Test After Deployment (2-3 minutes)

### ⏱️ Deployment Status
Check: https://vercel.com/dashboard

---

## ✅ Testing Each Form

### 1. Contact Form
**URL**: https://www.legacymovingdenver.com/contact

**Test Steps**:
- [ ] Form loads correctly
- [ ] hCaptcha widget is visible
- [ ] Submit button is **disabled** (grayed out)
- [ ] Click the hCaptcha checkbox
- [ ] Submit button becomes **enabled**
- [ ] Fill out form:
  - Name: Test User
  - Email: your-email@example.com
  - Phone: 555-555-5555
  - Move Date: Tomorrow
  - From: Denver
  - To: Boulder
  - Message: Testing hCaptcha integration
- [ ] Click "Submit"
- [ ] See **green success message**: "Thank you! We'll contact you shortly."
- [ ] Form fields **clear automatically**
- [ ] hCaptcha **resets automatically**
- [ ] Check email at **legacymovingdenver@gmail.com**

---

### 2. Feedback Form
**URL**: https://www.legacymovingdenver.com/feedback

**Test Steps**:
- [ ] Form loads correctly
- [ ] hCaptcha widget is visible
- [ ] Submit button is disabled
- [ ] Complete hCaptcha
- [ ] Fill out form:
  - Name: Test User
  - Email: your-email@example.com
  - Rating: Click 5 stars
  - Message: Great service!
- [ ] Click "Submit Feedback"
- [ ] See success message
- [ ] Check email

---

### 3. Local Move Form
**URL**: https://www.legacymovingdenver.com/local-moving-services

**Test Steps**:
- [ ] Form loads correctly
- [ ] hCaptcha widget is visible
- [ ] Submit button is disabled
- [ ] Complete hCaptcha
- [ ] Fill out form:
  - Name: Test User
  - Email: your-email@example.com
  - Phone: 555-555-5555
  - Move Date: Tomorrow
  - From: Denver
  - To: Boulder
  - Move Size: 2-3 Bedroom
  - Additional Services: Check "Packing Services"
- [ ] Click "Request Free Quote"
- [ ] See success message
- [ ] Check email

---

### 4. Long Distance Form
**URL**: https://www.legacymovingdenver.com/long-distance-moving-services

**Test Steps**:
- [ ] Form loads correctly
- [ ] hCaptcha widget is visible
- [ ] Submit button is disabled
- [ ] Complete hCaptcha
- [ ] Fill out form:
  - Name: Test User
  - Email: your-email@example.com
  - Phone: 555-555-5555
  - Move Date: Next week
  - From: Denver, CO
  - To: Phoenix, AZ
  - Move Size: 3-4 Bedroom
- [ ] Click "Request Free Quote"
- [ ] See success message
- [ ] Check email

---

### 5. Quick Quote Form (Homepage)
**URL**: https://www.legacymovingdenver.com

**Test Steps**:
- [ ] Scroll to Quick Quote section on homepage
- [ ] Form loads correctly
- [ ] hCaptcha widget is visible
- [ ] Submit button is disabled
- [ ] Complete hCaptcha
- [ ] Fill out form:
  - Name: Test User
  - Email: your-email@example.com
  - Phone: 555-555-5555
  - Move Date: Tomorrow
  - From ZIP: 80202
  - To ZIP: 80302
- [ ] Click "Get Quote"
- [ ] See success message
- [ ] Check email

---

## 🔍 What to Look For

### ✅ Success Indicators
- hCaptcha widget loads (checkbox visible)
- Submit button is disabled until captcha is completed
- After completing captcha, submit button becomes enabled
- Form submits without errors
- Green success message appears
- Form fields clear automatically
- hCaptcha resets automatically
- Email arrives at legacymovingdenver@gmail.com within 30 seconds

### ❌ Potential Issues
- **hCaptcha doesn't load**: Check browser console for errors
- **Submit button stays disabled**: Make sure to check the captcha box
- **"Please complete the captcha" error**: Click the captcha checkbox
- **Success message doesn't appear**: Check browser console, may be caching
- **No email received**: Check spam folder, verify Web3Forms dashboard

---

## 🛠️ Troubleshooting

### Clear Browser Cache
If forms look old or broken:
1. Press **Ctrl+Shift+R** (Windows) or **Cmd+Shift+R** (Mac)
2. Or open DevTools (F12) → Network tab → Disable cache → Reload

### Check Console for Errors
1. Press **F12** to open DevTools
2. Click **Console** tab
3. Look for red errors
4. Share screenshot if you see errors

### Verify Deployment
1. Go to https://vercel.com/dashboard
2. Click on "Legacy-Moving-New" project
3. Check latest deployment status
4. Should show "Ready" with green checkmark

---

## 📧 Email Format

### What to Expect
**Subject**: New [Form Name] - Legacy Moving Denver

**From**: onboarding@resend.dev

**To**: legacymovingdenver@gmail.com

**Body**: HTML formatted email with:
- Form name header
- All submitted fields
- Timestamp
- "Verified by hCaptcha" footer

---

## 📊 Success Criteria

### All Tests Pass When:
1. ✅ All 5 forms load correctly
2. ✅ hCaptcha visible on all forms
3. ✅ Submit buttons disabled until captcha completed
4. ✅ All forms submit successfully
5. ✅ Success messages appear on all forms
6. ✅ Forms reset after submission
7. ✅ 5 emails received at legacymovingdenver@gmail.com

---

## 🎉 Next Steps After Testing

### If Everything Works:
1. ✅ Mark this task as complete
2. 📊 Monitor spam reduction over next 7 days
3. 📈 Check Web3Forms dashboard periodically
4. 🎊 Enjoy spam-free form submissions!

### If Issues Found:
1. 📸 Take screenshots of any errors
2. 🔍 Check browser console for error messages
3. 📝 Note which form(s) have issues
4. 💬 Report findings with details

---

## 🔗 Quick Links

- **Live Site**: https://www.legacymovingdenver.com
- **GitHub**: https://github.com/MetroWebsites/Legacy-Moving-New
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Web3Forms Dashboard**: https://web3forms.com/
- **hCaptcha Dashboard**: https://dashboard.hcaptcha.com/

---

**Test Time**: ~5-10 minutes for all 5 forms  
**Expected Result**: 100% success rate  
**Spam Reduction**: 95%+ effectiveness
