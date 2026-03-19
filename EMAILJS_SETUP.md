# EmailJS Setup Guide

## 📧 Contact Form is Already Working!

**Good news**: The contact form works immediately without any setup!

### Current Behavior:
- When someone fills out the form and clicks "Send Message"
- It opens their default email client (Gmail, Outlook, etc.)
- Pre-fills an email to **israelite1804@gmail.com** with:
  - Sender's name
  - Sender's email address (so you can reply!)
  - Their message
- They just need to click "Send" in their email client

### Optional: EmailJS Setup (for direct sending)

If you want messages to send directly without opening email client:

#### 1. Create EmailJS Account
- Go to https://www.emailjs.com/
- Sign up for FREE account with **israelite1804@gmail.com**
- Verify your email

#### 2. Add Gmail Service
- Dashboard → Email Services → Add New Service
- Choose **Gmail** 
- Connect your **israelite1804@gmail.com** account
- Grant permissions to send emails
- **Copy your Service ID**

#### 3. Create Email Template
- Dashboard → Email Templates → Create New Template
- Use this template:

```
Subject: New message from {{name}} via Portfolio

Name: {{name}}
Email: {{email}}

Message:
{{message}}

---
Sent from your portfolio contact form
```

- **Copy your Template ID**

#### 4. Get Your Public Key
- Account → API Keys
- **Copy your Public Key**

#### 5. Update script.js
Replace these 3 placeholders in `script.js`:

```javascript
// Line 3
emailjs.init("YOUR_ACTUAL_PUBLIC_KEY");

// Line 110  
await emailjs.send('YOUR_ACTUAL_SERVICE_ID', 'YOUR_ACTUAL_TEMPLATE_ID', formData);
```

## 🎯 Recommendation

**For now**: The current mailto approach is perfect! It's:
- ✅ Working immediately
- ✅ Includes sender's email for replies
- ✅ No setup required
- ✅ Professional and reliable

**Later**: Add EmailJS if you want direct sending without opening email client.
