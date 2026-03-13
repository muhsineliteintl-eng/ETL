import { NextResponse } from 'next/server';
import { requireAuth } from '../../../../lib/auth';
import { v2 as cloudinary } from 'cloudinary';

export async function GET(request) {
    const authResult = requireAuth(request);
    if (authResult.error) {
        return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }

    try {
        // Check Cloudinary configuration
        const config = {
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY ? 'SET' : 'NOT SET',
            api_secret: process.env.CLOUDINARY_API_SECRET ? 'SET' : 'NOT SET',
            upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET
        };

        // Test URL generation
        const testPublicId = 'elite-international/resumes/test_file';
        const testUrls = {
            raw_url: cloudinary.url(testPublicId, { resource_type: 'raw' }),
            raw_download: cloudinary.url(testPublicId, { resource_type: 'raw', flags: 'attachment' }),
            image_url: cloudinary.url(testPublicId, { resource_type: 'image' })
        };

        // List recent uploads in the resumes folder
        let recentUploads = [];
        try {
            const result = await cloudinary.search
                .expression('folder:elite-international/resumes')
                .sort_by([['created_at', 'desc']])
                .max_results(5)
                .execute();
            
            recentUploads = result.resources.map(resource => ({
                public_id: resource.public_id,
                resource_type: resource.resource_type,
                format: resource.format,
                secure_url: resource.secure_url,
                created_at: resource.created_at
            }));
        } catch (searchError) {
            console.error('Cloudinary search error:', searchError);
        }

        return NextResponse.json({
            config,
            testUrls,
            recentUploads,
            cloudinaryConfigured: !!(process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET)
        });

    } catch (error) {
        console.error('Debug Cloudinary error:', error);
        return NextResponse.json({
            error: error.message,
            stack: error.stack
        }, { status: 500 });
    }
}