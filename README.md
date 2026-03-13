# Elite International Company - Facility Management Website

A professional, full-featured website for Elite International Company For Public Facility Management in Kuwait. Built with Next.js 16, featuring a powerful admin panel, dynamic content management, and integrated contact/career systems.

## 🚀 Features

### Public Website
- **Modern Design**: Responsive, professional UI with smooth animations
- **Service Showcase**: Display soft and hard facility management services
- **Equipment Gallery**: Interactive carousel showcasing professional equipment
- **Leadership Section**: Highlight company leadership with images
- **QHSE Commitment**: Quality, Health, Safety & Environmental standards
- **Contact Form**: Integrated inquiry system with email notifications
- **Career Portal**: Job application system with resume upload
- **Testimonials**: Client reviews and feedback
- **Partner Showcase**: Display corporate partners and industry sectors

### Admin Panel
- **Secure Authentication**: JWT-based admin login system
- **Content Management**: Edit all website content in real-time
- **Image Upload**: Cloudinary integration for image management
- **Inquiry Management**: View and manage contact form submissions
- **Application Tracking**: Review job applications and download resumes
- **Visibility Controls**: Toggle sections on/off without code changes
- **Real-time Updates**: Changes reflect immediately on the website

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Database**: PostgreSQL (Neon)
- **ORM**: Prisma
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Image Hosting**: Cloudinary
- **Email**: Nodemailer (Gmail SMTP)
- **Authentication**: JWT + bcrypt

## 📋 Prerequisites

- Node.js 18+ and npm
- PostgreSQL database (Neon recommended)
- Cloudinary account (free tier)
- Gmail account for SMTP (optional)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd KUWET-PROJECT-TYPESCRIPT
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory (or copy from `.env.example`):
   ```env
   # Database
   DATABASE_URL="postgresql://user:password@host/database"

   # Cloudinary
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_UPLOAD_PRESET=ml_default
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret

   # JWT Secret
   JWT_SECRET=your-super-secret-jwt-key-change-in-production

   # Admin Credentials
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD_HASH="$2a$12$WBg6Dn4Y0eatDnXO.OfpIOO9CNtQsg8hRRje2wQIc9eTmeRX6kp7q"

   # Email Configuration
   ADMIN_EMAIL=your-email@gmail.com
   HR_EMAIL=hr-email@gmail.com
   EMAIL_FROM_NAME="Elite International Website"
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASSWORD=your-gmail-app-password
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   - Website: http://localhost:3000
   - Admin Panel: http://localhost:3000/admin/login

## 🔐 Admin Access

Default credentials (change in production!):
- **Username**: `admin`
- **Password**: `admin123`

See `ADMIN_CREDENTIALS.md` for detailed admin panel documentation.

## 📁 Project Structure

```
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── migrations/            # Database migrations
├── public/
│   └── images/                # Static images
├── src/
│   ├── app/                   # Next.js app router
│   │   ├── admin/            # Admin panel pages
│   │   ├── api/              # API routes
│   │   ├── careers/          # Career page
│   │   ├── contact/          # Contact page
│   │   └── page.jsx          # Homepage
│   ├── components/           # React components
│   ├── data/                 # Initial data (site-content.json)
│   └── lib/                  # Utilities (auth, db)
├── .env                      # Environment variables
├── package.json              # Dependencies
└── README.md                 # This file
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
npm start
```

### Environment Variables
Make sure all environment variables are set in your production environment.

### Database Migration
```bash
npx prisma migrate deploy
```

## 📖 Documentation

- **Setup Guide**: See `SETUP_GUIDE.md` for detailed setup instructions
- **Admin Guide**: See `ADMIN_CREDENTIALS.md` for admin panel usage
- **Loading System**: See `LOADING_SYSTEM.md` for technical details

## 🔒 Security Notes

⚠️ **Important Security Steps for Production:**

1. Change the default admin password
2. Use a strong JWT_SECRET (generate with: `openssl rand -base64 32`)
3. Enable HTTPS
4. Restrict database access to your server IP
5. Use environment-specific `.env` files
6. Never commit `.env` files to version control

## 🐛 Troubleshooting

### Database Connection Issues
```bash
npx prisma generate
npx prisma db push
```

### Image Upload Not Working
- Verify Cloudinary credentials in `.env`
- Check upload preset is set to "Unsigned"
- Ensure API key and secret are correct

### Email Not Sending
- Enable 2FA on Gmail account
- Generate App Password (not regular password)
- Check SMTP settings in `.env`

### Admin Login Failed
- Verify credentials in `ADMIN_CREDENTIALS.md`
- Check JWT_SECRET is set
- Clear browser cache and cookies

## 📝 License

This project is proprietary software for Elite International Company.

## 🤝 Support

For technical support or questions, contact the development team.

---

**Elite International Company For Public Facility Management**  
Professional Facility Management Solutions in Kuwait
