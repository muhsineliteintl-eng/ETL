import { NextResponse } from 'next/server';
import prisma from '../../../../../lib/db';
import { requireAuth } from '../../../../../lib/auth';
import { v2 as cloudinary } from 'cloudinary';

export const dynamic = 'force-dynamic';

export async function DELETE(request, { params }) {
    const authResult = requireAuth(request);
    if (authResult.error) {
        return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }

    try {
        // Await params in Next.js 15
        const { id } = await params;
        const applicationId = parseInt(id);

        if (isNaN(applicationId)) {
            return NextResponse.json({ error: 'Invalid application ID' }, { status: 400 });
        }

        // First, check if the application exists and get the resume URL
        let application;
        try {
            application = await prisma.jobApplication.findUnique({
                where: { id: applicationId }
            });
        } catch (prismaError) {
            console.error('Prisma findUnique error:', prismaError);
            return NextResponse.json({ 
                error: 'Database error while finding application',
                details: prismaError.message 
            }, { status: 500 });
        }

        if (!application) {
            return NextResponse.json({ error: 'Application not found' }, { status: 404 });
        }

        // Try to delete from Cloudinary (optional, don't fail if this fails)
        if (application.resumeUrl) {
            try {
                // Extract public ID from Cloudinary URL
                const urlParts = application.resumeUrl.split('/');
                const uploadIndex = urlParts.findIndex(part => part === 'upload');
                
                if (uploadIndex !== -1 && urlParts[uploadIndex + 1]) {
                    const pathAfterUpload = urlParts.slice(uploadIndex + 1).join('/');
                    const publicId = pathAfterUpload.replace(/\.[^/.]+$/, ''); // Remove extension
                    
                    // Delete from Cloudinary with proper resource type
                    await cloudinary.uploader.destroy(publicId, { resource_type: 'raw' });
                    console.log('Resume deleted from Cloudinary:', publicId);
                }
            } catch (cloudinaryError) {
                console.error('Failed to delete from Cloudinary (continuing anyway):', cloudinaryError);
                // Don't fail the entire operation if Cloudinary deletion fails
            }
        }

        // Delete from database
        try {
            await prisma.jobApplication.delete({
                where: { id: applicationId }
            });
        } catch (prismaError) {
            console.error('Prisma delete error:', prismaError);
            return NextResponse.json({ 
                error: 'Database error while deleting application',
                details: prismaError.message 
            }, { status: 500 });
        }

        return NextResponse.json({ 
            success: true, 
            message: 'Application deleted successfully' 
        });

    } catch (error) {
        console.error('Delete application error:', error);
        return NextResponse.json({ 
            error: 'Failed to delete application',
            details: error.message 
        }, { status: 500 });
    }
}