import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: (process.env.SMTP_PORT === '465'), // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
});

export async function sendEmail({ to, subject, text, html }) {
    try {
        const info = await transporter.sendMail({
            from: `"${process.env.EMAIL_FROM_NAME || 'Elite International'}" <${process.env.SMTP_USER}>`,
            to,
            subject,
            text,
            html,
        });

        console.log('Message sent: %s', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('Error sending email:', error);
        return { success: false, error: error.message };
    }
}

export function generateInquiryEmailTemplate(data) {
    return {
        subject: `New Inquiry from ${data.name} - Elite International`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
                <div style="background-color: #008450; color: white; padding: 20px; text-align: center;">
                    <h1 style="margin: 0;">New Service Inquiry</h1>
                </div>
                <div style="padding: 20px; color: #333;">
                    <p>You have received a new inquiry through the website contact form.</p>
                    <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                        <tr>
                            <td style="padding: 10px; border-bottom: 1px solid #f0f0f0; font-weight: bold; width: 150px;">Name:</td>
                            <td style="padding: 10px; border-bottom: 1px solid #f0f0f0;">${data.name}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; border-bottom: 1px solid #f0f0f0; font-weight: bold;">Email:</td>
                            <td style="padding: 10px; border-bottom: 1px solid #f0f0f0;">${data.email}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; border-bottom: 1px solid #f0f0f0; font-weight: bold;">Phone:</td>
                            <td style="padding: 10px; border-bottom: 1px solid #f0f0f0;">${data.phone}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; border-bottom: 1px solid #f0f0f0; font-weight: bold;">Service:</td>
                            <td style="padding: 10px; border-bottom: 1px solid #f0f0f0;">${data.service}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; border-bottom: 1px solid #f0f0f0; font-weight: bold;">Preferred Date:</td>
                            <td style="padding: 10px; border-bottom: 1px solid #f0f0f0;">${data.date}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; font-weight: bold; vertical-align: top;">Details:</td>
                            <td style="padding: 10px;">${data.details || 'No additional details provided.'}</td>
                        </tr>
                    </table>
                </div>
                <div style="background-color: #f9f9f9; padding: 15px; text-align: center; color: #777; font-size: 12px; border-top: 1px solid #e0e0e0;">
                    <p>© 2026 Elite International Company. All rights reserved.</p>
                </div>
            </div>
        `,
        text: `New Inquiry\n\nName: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nService: ${data.service}\nPreferred Date: ${data.date}\nDetails: ${data.details || 'None'}`
    };
}

export function generateCareerEmailTemplate(data) {
    return {
        subject: `New Job Application: ${data.position} - ${data.firstName} ${data.lastName}`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
                <div style="background-color: #1a365d; color: white; padding: 20px; text-align: center;">
                    <h1 style="margin: 0;">New Job Application</h1>
                </div>
                <div style="padding: 20px; color: #333;">
                    <p>A new job application has been submitted through the careers portal.</p>
                    <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                        <tr>
                            <td style="padding: 10px; border-bottom: 1px solid #f0f0f0; font-weight: bold; width: 150px;">Applicant Name:</td>
                            <td style="padding: 10px; border-bottom: 1px solid #f0f0f0;">${data.firstName} ${data.lastName}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; border-bottom: 1px solid #f0f0f0; font-weight: bold;">Position:</td>
                            <td style="padding: 10px; border-bottom: 1px solid #f0f0f0;">${data.position}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; border-bottom: 1px solid #f0f0f0; font-weight: bold;">Email:</td>
                            <td style="padding: 10px; border-bottom: 1px solid #f0f0f0;">${data.email}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; border-bottom: 1px solid #f0f0f0; font-weight: bold;">Phone:</td>
                            <td style="padding: 10px; border-bottom: 1px solid #f0f0f0;">${data.phone}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; border-bottom: 1px solid #f0f0f0; font-weight: bold; vertical-align: top;">Cover Letter:</td>
                            <td style="padding: 10px; border-bottom: 1px solid #f0f0f0;">${data.coverLetter || 'None provided'}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; font-weight: bold;">Resume URL:</td>
                            <td style="padding: 10px;"><a href="${data.resumeUrl}" style="color: #1a365d; text-decoration: underline;">Download Resume</a></td>
                        </tr>
                    </table>
                </div>
                <div style="background-color: #f9f9f9; padding: 15px; text-align: center; color: #777; font-size: 12px; border-top: 1px solid #e0e0e0;">
                    <p>© 2026 Elite International Company. All rights reserved.</p>
                </div>
            </div>
        `,
        text: `New Job Application\n\nName: ${data.firstName} ${data.lastName}\nPosition: ${data.position}\nEmail: ${data.email}\nPhone: ${data.phone}\nResume: ${data.resumeUrl}`
    };
}
