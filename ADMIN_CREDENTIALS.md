# Admin Panel Access

## Admin Login Credentials

- **URL**: http://localhost:3000/admin/login
- **Username**: `admin`
- **Password**: `admin123`

## Quick Start

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:3000/admin/login
   ```

3. Login with the credentials above

4. You'll be redirected to the admin dashboard at:
   ```
   http://localhost:3000/admin
   ```

## Admin Panel Features

- **Overview**: Dashboard with statistics and system health
- **Hero Hub**: Edit homepage hero section
- **About Elite**: Manage company information
- **Leadership**: Update leadership profiles
- **Executive Summary**: Edit company summary
- **Active Services**: Manage soft and hard services
- **Equipment Gallery**: Add/edit equipment images and descriptions
- **Quality & Safety**: Update QHSE commitments
- **Testimonials**: Manage client reviews
- **Corporate Partners**: Edit partner information
- **Industry Sectors**: Manage sector data
- **Service Inquiries**: View contact form submissions
- **HR / Applications**: View job applications
- **Visibility Controller**: Toggle section visibility

## Troubleshooting

### Cannot Login
- Make sure the server is running (`npm run dev`)
- Check that the `.env` file exists with correct credentials
- Clear browser cache and try again

### Images Not Loading
- Ensure images are in the `public/images/services/` folder
- Check that image paths in the database start with `/images/`
- Verify file names match exactly (case-sensitive)

### Database Issues
- Run `npx prisma generate` to regenerate Prisma client
- Run `npx prisma db push` to sync database schema
- Check DATABASE_URL in `.env` file

## Security Notes

⚠️ **IMPORTANT**: Change the default password before deploying to production!

To change the admin password:
1. Generate a new bcrypt hash for your password
2. Update `ADMIN_PASSWORD_HASH` in `.env` file
3. Restart the server

## Support

For issues or questions, check the application logs in the terminal where you ran `npm run dev`.
