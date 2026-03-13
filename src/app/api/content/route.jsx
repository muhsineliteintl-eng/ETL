import { NextResponse } from 'next/server';
import prisma from '../../../lib/db';
import { requireAuth } from '../../../lib/auth';
import { promises as fs } from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

let isSeeding = false;

export async function GET() {
    try {
        // Try to fetch from PostgreSQL via Prisma
        let content = await prisma.content.findFirst({
            orderBy: { createdAt: 'desc' }
        });

        if (!content) {
            if (isSeeding) {
                console.log('Seeding already in progress, waiting...');
                // Wait briefly for seeding to finish (simple polling fallback)
                await new Promise(resolve => setTimeout(resolve, 2000));
                content = await prisma.content.findFirst({ orderBy: { createdAt: 'desc' } });
                if (content) return NextResponse.json(content);
            }

            try {
                isSeeding = true;
                console.log('PostgreSQL is empty. Seeding from local file...');
                const DATA_PATH = path.join(process.cwd(), 'src', 'data', 'site-content.json');
                const fileData = await fs.readFile(DATA_PATH, 'utf8');
                const initialData = JSON.parse(fileData);

                content = await prisma.content.create({
                    data: initialData
                });
                console.log('Database seeded successfully. ID:', content.id);
            } finally {
                isSeeding = false;
            }
        }

        return NextResponse.json(content);
    } catch (error) {
        console.error('API Error (GET/Prisma):', error);
        return NextResponse.json({ error: 'Failed to fetch content', details: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    // Require authentication for content updates
    const authResult = requireAuth(request);
    if (authResult.error) {
        return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }

    try {
        const newData = await request.json();

        // Validate data structure
        if (!newData || typeof newData !== 'object') {
            return NextResponse.json({ error: 'Invalid data format' }, { status: 400 });
        }

        // Clean data - remove system fields
        const cleanData = { ...newData };
        delete cleanData._id;
        delete cleanData.id;
        delete cleanData.createdAt;
        delete cleanData.updatedAt;

        // Get the latest record to update, or create a new one
        const existingContent = await prisma.content.findFirst({
            orderBy: { createdAt: 'desc' }
        });

        let updatedContent;
        if (existingContent) {
            updatedContent = await prisma.content.update({
                where: { id: existingContent.id },
                data: cleanData
            });
        } else {
            updatedContent = await prisma.content.create({
                data: cleanData
            });
        }

        console.log('Content updated by admin:', authResult.user.username);

        return NextResponse.json({ 
            success: true,
            message: 'Content updated successfully', 
            content: updatedContent 
        });
    } catch (error) {
        console.error('API Error (POST/Prisma):', error);
        return NextResponse.json({ error: 'Failed to update content', details: error.message }, { status: 500 });
    }
}

