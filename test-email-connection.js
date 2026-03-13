import 'dotenv/config';
import nodemailer from 'nodemailer';

async function testEmail() {
    console.log('🔍 Testing Nodemailer Connection...');
    console.log(`📡 Host: ${process.env.SMTP_HOST}`);
    console.log(`👤 User: ${process.env.SMTP_USER}`);

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: (process.env.SMTP_PORT === '465'),
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    try {
        // Verify connection configuration
        await transporter.verify();
        console.log('✅ Connection verified successfully!');

        // Optional: Send a test email
        /*
        const info = await transporter.sendMail({
            from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.SMTP_USER}>`,
            to: process.env.ADMIN_EMAIL,
            subject: "Verification Test - Elite International",
            text: "This is a test email to verify Nodemailer integration.",
        });
        console.log('📧 Test email sent: %s', info.messageId);
        */

    } catch (error) {
        console.error('❌ Connection failed:', error);
    }
}

testEmail();
