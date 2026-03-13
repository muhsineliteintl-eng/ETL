import { NextResponse } from 'next/server';
import { uploadToCloudinary } from '../../../lib/cloudinary';
import { requireAuth } from '../../../lib/auth';

export async function POST(request) {
    // Require authentication for image uploads
    const authResult = requireAuth(request);
    if (authResult.error) {
        return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }

    try {
        const formData = await request.formData();
        const file = formData.get('file');
        const folder = formData.get('folder') || 'general';

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        // Validate file type
        if (!file.type.startsWith('image/')) {
            return NextResponse.json({ error: 'Only image files are allowed' }, { status: 400 });
        }

        // Validate file size (5MB limit)
        if (file.size > 5 * 1024 * 1024) {
            return NextResponse.json({ error: 'File size must be less than 5MB' }, { status: 400 });
        }

        const url = await uploadToCloudinary(file, folder);

        return NextResponse.json({
            success: true,
            url: url
        });

    } catch (error) {
        console.error('Upload API Error:', error);
        return NextResponse.json(
            { error: 'Upload failed', details: error.message },
            { status: 500 }
        );
    }
}