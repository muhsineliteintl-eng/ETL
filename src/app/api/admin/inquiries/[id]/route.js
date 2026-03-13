import { NextResponse } from 'next/server';
import prisma from '../../../../../lib/db';
import { requireAuth } from '../../../../../lib/auth';

export const dynamic = 'force-dynamic';

export async function DELETE(request, { params }) {
    const authResult = requireAuth(request);
    if (authResult.error) {
        return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }

    try {
        // Await params in Next.js 15
        const { id } = await params;
        const inquiryId = parseInt(id);

        if (isNaN(inquiryId)) {
            return NextResponse.json({ error: 'Invalid inquiry ID' }, { status: 400 });
        }

        // Check if inquiry exists
        let inquiry;
        try {
            inquiry = await prisma.inquiry.findUnique({
                where: { id: inquiryId }
            });
        } catch (prismaError) {
            console.error('Prisma findUnique error:', prismaError);
            return NextResponse.json({ 
                error: 'Database error while finding inquiry',
                details: prismaError.message 
            }, { status: 500 });
        }

        if (!inquiry) {
            return NextResponse.json({ error: 'Inquiry not found' }, { status: 404 });
        }

        // Delete from database
        try {
            await prisma.inquiry.delete({
                where: { id: inquiryId }
            });
        } catch (prismaError) {
            console.error('Prisma delete error:', prismaError);
            return NextResponse.json({ 
                error: 'Database error while deleting inquiry',
                details: prismaError.message 
            }, { status: 500 });
        }

        return NextResponse.json({ 
            success: true, 
            message: 'Inquiry deleted successfully' 
        });

    } catch (error) {
        console.error('Delete inquiry error:', error);
        return NextResponse.json({ 
            error: 'Failed to delete inquiry',
            details: error.message 
        }, { status: 500 });
    }
}