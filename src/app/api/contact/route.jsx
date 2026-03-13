import { NextResponse } from 'next/server';
import prisma from '../../../lib/db';
import { sendEmail, generateInquiryEmailTemplate } from '../../../lib/email';

export async function POST(request) {
    try {
        const body = await request.json();

        // Validate required fields
        if (!body.name || !body.phone || !body.email || !body.service) {
            return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
        }

        // Get client IP address
        const forwarded = request.headers.get('x-forwarded-for');
        const ipAddress = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown';

        // Create new inquiry via Prisma
        const inquiry = await prisma.inquiry.create({
            data: {
                name: body.name.trim(),
                phone: body.phone.trim(),
                email: body.email.trim().toLowerCase(),
                service: body.service.trim(),
                date: body.date?.trim() || null,
                details: body.details?.trim() || null,
                ipAddress,
                status: 'New',
                emailSent: false
            }
        });

        console.log('Inquiry Saved:', inquiry.id);

        // Send Email Notification
        let emailResult = { success: false };
        try {
            const emailTemplate = generateInquiryEmailTemplate({
                ...body,
                id: inquiry.id,
                ipAddress
            });
            
            emailResult = await sendEmail({
                to: process.env.ADMIN_EMAIL || 'info@elite-intl.com',
                ...emailTemplate
            });

            // Update inquiry with email status
            await prisma.inquiry.update({
                where: { id: inquiry.id },
                data: { emailSent: emailResult.success }
            });

            // Log email attempt
            await prisma.emailLog.create({
                data: {
                    type: 'inquiry',
                    recipientId: inquiry.id,
                    recipient: process.env.ADMIN_EMAIL || 'info@elite-intl.com',
                    subject: emailTemplate.subject,
                    status: emailResult.success ? 'sent' : 'failed',
                    messageId: emailResult.messageId || null,
                    error: emailResult.error || null
                }
            });

        } catch (emailError) {
            console.error('Email sending failed:', emailError);
        }

        return NextResponse.json({
            success: true,
            message: emailResult.success 
                ? 'Your message has been received. We will get back to you soon.'
                : 'Your inquiry has been received. We will contact you soon.',
            id: inquiry.id
        });
    } catch (error) {
        console.error('Contact API Error:', error);
        return NextResponse.json({ 
            success: false, 
            message: 'Failed to submit inquiry. Please try again.' 
        }, { status: 500 });
    }
}
