import { NextResponse } from 'next/server';
import { requireAuth } from '../../../../lib/auth';

export async function GET(request) {
    const authResult = requireAuth(request);
    if (authResult.error) {
        return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }

    try {
        const { searchParams } = new URL(request.url);
        const resumeUrl = searchParams.get('url');
        const filename = searchParams.get('filename') || 'resume.pdf';

        if (!resumeUrl) {
            return NextResponse.json({ error: 'Resume URL is required' }, { status: 400 });
        }

        // Fetch the file from Cloudinary
        const response = await fetch(resumeUrl);
        
        if (!response.ok) {
            return NextResponse.json({ error: 'Failed to fetch resume' }, { status: 404 });
        }

        const fileBuffer = await response.arrayBuffer();

        // Return the file with proper headers for download
        return new NextResponse(fileBuffer, {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename="${filename}"`,
                'Content-Length': fileBuffer.byteLength.toString(),
            },
        });

    } catch (error) {
        console.error('Resume download error:', error);
        return NextResponse.json({ error: 'Failed to download resume' }, { status: 500 });
    }
}