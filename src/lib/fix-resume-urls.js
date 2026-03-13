import prisma from './db.js';
import { getDownloadUrl } from './cloudinary.js';

export async function fixResumeUrls() {
    try {
        const applications = await prisma.jobApplication.findMany();

        console.log(`Found ${applications.length} applications to check`);
        let fixedCount = 0;

        for (const app of applications) {
            if (app.resumeUrl) {
                // Extract public ID from the current URL
                let publicId = null;
                
                try {
                    // Parse the URL to extract public ID
                    const urlParts = app.resumeUrl.split('/');
                    const uploadIndex = urlParts.findIndex(part => part === 'upload');
                    
                    if (uploadIndex !== -1 && urlParts[uploadIndex + 1]) {
                        // Get everything after 'upload/' and before the file extension
                        const pathAfterUpload = urlParts.slice(uploadIndex + 1).join('/');
                        publicId = pathAfterUpload.replace(/\.[^/.]+$/, ''); // Remove extension
                    }
                    
                    if (publicId) {
                        // Generate a proper download URL
                        const filename = `${app.firstName}_${app.lastName}_Resume.pdf`;
                        const newUrl = getDownloadUrl(publicId, filename);
                        
                        await prisma.jobApplication.update({
                            where: { id: app.id },
                            data: { resumeUrl: newUrl }
                        });

                        console.log(`Fixed URL for ${app.firstName} ${app.lastName}: ${app.id}`);
                        fixedCount++;
                    }
                } catch (error) {
                    console.error(`Failed to fix URL for application ${app.id}:`, error);
                }
            }
        }

        console.log(`Resume URL fix completed. Fixed ${fixedCount} URLs.`);
        return { success: true, fixed: fixedCount };

    } catch (error) {
        console.error('Error fixing resume URLs:', error);
        return { success: false, error: error.message };
    }
}

// Function to test if a resume URL is accessible
export async function testResumeUrl(url) {
    try {
        const response = await fetch(url, { method: 'HEAD' });
        return {
            accessible: response.ok,
            status: response.status,
            contentType: response.headers.get('content-type')
        };
    } catch (error) {
        return {
            accessible: false,
            error: error.message
        };
    }
}