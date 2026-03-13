# System Setup Guide

This guide will help you set up the required services for your Elite International facility management website.

## Required Services

### 1. PostgreSQL Database (Neon)
Your database is already configured in the `.env` file. The connection string is:
```
DATABASE_URL="postgresql://..."
```

If you need to set up a new database:
1. Go to [Neon](https://neon.tech) and sign up (Free tier available)
2. Create a new project
3. Copy the connection string
4. Update `DATABASE_URL` in your `.env` file
5. Run `npx prisma db push` to create tables

### 2. Cloudinary (Image Hosting)
This is where your uploaded images and resumes will be stored.

1. Go to [Cloudinary](https://cloudinary.com/users/register/free) and sign up (Free)
2. **Get Cloud Name**: On your Dashboard, copy the "Cloud Name"
   - Update `CLOUDINARY_CLOUD_NAME` in `.env`
3. **Create Upload Preset**:
   - Click Settings (top right) → Upload tab
   - Scroll to "Upload presets" → "Add upload preset"
   - **Signing Mode**: Change to "Unsigned"
   - **Name**: Use `ml_default` or create your own
   - Click Save
   - Update `CLOUDINARY_UPLOAD_PRESET` in `.env`
4. **Get API Credentials**:
   - Go to Dashboard
   - Copy API Key and API Secret
   - Update `CLOUDINARY_API_KEY` and `CLOUDINARY_API_SECRET` in `.env`

### 3. Email Configuration (Gmail SMTP)
For sending contact form and job application emails:

1. Use a Gmail account
2. Enable 2-Factor Authentication
3. Generate an App Password:
   - Go to Google Account → Security → 2-Step Verification → App passwords
   - Create a new app password
   - Update these in `.env`:
     - `SMTP_USER`: Your Gmail address
     - `SMTP_PASSWORD`: The app password (16 characters, no spaces)
     - `ADMIN_EMAIL`: Where you want to receive notifications
     - `HR_EMAIL`: Where job applications should be sent

---

## Environment Variables

All configuration is in the `.env` file. Make sure these are set:

```env
# Database
DATABASE_URL="postgresql://..."

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_UPLOAD_PRESET=ml_default
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Admin Authentication
JWT_SECRET=your-secret-key-change-in-production
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH="$2a$12$..."

# Email
ADMIN_EMAIL=your-email@gmail.com
HR_EMAIL=your-hr-email@gmail.com
EMAIL_FROM_NAME="Elite International Website"
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
```

---

## Running the Application

### Development Mode
```bash
npm install
npx prisma generate
npx prisma db push
npm run dev
```

Access the site at: http://localhost:3000
Access admin panel at: http://localhost:3000/admin/login

### Production Build
```bash
npm run build
npm start
```

---

## Admin Panel Access

See `ADMIN_CREDENTIALS.md` for login details.
