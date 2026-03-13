import { NextResponse } from 'next/server';
import prisma from '../../../../lib/db';
import { requireAuth } from '../../../../lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(request) {
    const authResult = requireAuth(request);
    if (authResult.error) {
        return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }

    try {
        const inquiries = await prisma.inquiry.findMany({
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json(inquiries);
    } catch (error) {
        console.error('Admin Inquiries API Error:', error);
        return NextResponse.json({ error: 'Failed to fetch inquiries' }, { status: 500 });
    }
}

export async function PATCH(request) {
    const authResult = requireAuth(request);
    if (authResult.error) {
        return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }

    try {
        const { id, status } = await request.json();
        
        const updatedInquiry = await prisma.inquiry.update({
            where: { id: parseInt(id) },
            data: { status }
        });

        return NextResponse.json(updatedInquiry);
    } catch (error) {
        console.error('Update Inquiry Error:', error);
        return NextResponse.json({ error: 'Failed to update inquiry' }, { status: 500 });
    }
}
