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
        const applications = await prisma.jobApplication.findMany({
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json(applications);
    } catch (error) {
        console.error('Admin Careers API Error:', error);
        return NextResponse.json({ error: 'Failed to fetch applications' }, { status: 500 });
    }
}

export async function PATCH(request) {
    const authResult = requireAuth(request);
    if (authResult.error) {
        return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }

    try {
        const { id, status } = await request.json();
        
        const updatedApplication = await prisma.jobApplication.update({
            where: { id: parseInt(id) },
            data: { status }
        });

        return NextResponse.json(updatedApplication);
    } catch (error) {
        console.error('Update Application Error:', error);
        return NextResponse.json({ error: 'Failed to update application' }, { status: 500 });
    }
}
