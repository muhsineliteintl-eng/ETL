// Test script to check resume URLs in database
import prisma from './src/lib/db.js';

async function checkResumeUrls() {
    try {
        const applications = await prisma.jobApplication.findMany({
            select: {
                id: true,
                firstName: true,
                lastName: true,
                resumeUrl: true,
                createdAt: true
            }
        });

        console.log('Found', applications.length, 'applications');
        
        applications.forEach(app => {
            console.log(`\nID: ${app.id}`);
            console.log(`Name: ${app.firstName} ${app.lastName}`);
            console.log(`Resume URL: ${app.resumeUrl}`);
            console.log(`Created: ${app.createdAt}`);
            
            // Check if URL is accessible
            if (app.resumeUrl) {
                const isImageUpload = app.resumeUrl.includes('/image/upload/');
                const isRawUpload = app.resumeUrl.includes('/raw/upload/');
                console.log(`Upload type: ${isImageUpload ? 'IMAGE (WRONG)' : isRawUpload ? 'RAW (CORRECT)' : 'UNKNOWN'}`);
            }
        });

    } catch (error) {
        console.error('Error checking resume URLs:', error);
    } finally {
        await prisma.$disconnect();
    }
}

checkResumeUrls();