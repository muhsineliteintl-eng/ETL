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

        if (!resumeUrl) {
            return NextResponse.json({ error: 'Resume URL is required' }, { status: 400 });
        }

        // Test if the URL is accessible
        const response = await fetch(resumeUrl, { method: 'HEAD' });
        
        return NextResponse.json({
            url: resumeUrl,
            accessible: response.ok,
            status: response.status,
            statusText: response.statusText,
            contentType: response.headers.get('content-type'),
            contentLength: response.headers.get('content-length')
        });

    } catch (error) {
        console.error('Resume test error:', error);
        return NextResponse.json({
            url: resumeUrl,
            accessible: false,
            error: error.message
        });
    }
}