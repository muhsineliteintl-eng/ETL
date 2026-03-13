import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Upload image to Cloudinary (Standardized Implementation)
 */
export async function uploadToCloudinary(file, folder = 'uploads') {
    try {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Determine resource type based on file
        const isRawFile = file.type.includes('pdf') || 
                          file.type.includes('doc') || 
                          file.type.includes('docx') ||
                          file.type.includes('xls') ||
                          /\.(pdf|docx?|xlsx?|pptx?|csv|txt)$/i.test(file.name || '');

        const resourceType = isRawFile ? 'raw' : 'image';

        // Prepare upload options matching the requested style
        const uploadOptions = {
            folder: folder,
            resource_type: resourceType,
            use_filename: true,
            unique_filename: true,
            // For images, we can apply standard transformations if needed
            ...(resourceType === 'image' ? {
                transformation: {
                    quality: 'auto',
                    fetch_format: 'auto'
                }
            } : {})
        };

        // Create stream and pipe
        const stream = Readable.from(buffer);
        
        const result = await new Promise((resolve, reject) => {
            const upload = cloudinary.uploader.upload_stream(
                uploadOptions,
                (error, result) => {
                    if (error) {
                        console.error('Cloudinary Upload Error:', error);
                        reject(new Error(`Upload failed: ${error.message}`));
                    } else {
                        resolve(result);
                    }
                }
            );
            stream.pipe(upload);
        });

        // console.log('Cloudinary Upload Success:', {
        //     public_id: result.public_id,
        //     url: result.secure_url,
        //     format: result.format
        // });

        return result.secure_url;

    } catch (error) {
        console.error('Upload Service Error:', error);
        throw error;
    }
}

/**
 * Helper to generate a forced download URL
 */
export function getDownloadUrl(publicId, filename) {
    if (!publicId) return '';
    return cloudinary.url(publicId, {
        flags: `attachment:${filename}`,
        resource_type: 'raw' // Adjust based on your usage
    });
}

/**
 * Helper to fix existing URLs that might have the wrong resource type in path
 */
export function fixCloudinaryUrl(url) {
    if (!url) return url;
    // If it's a PDF but has /image/upload/, fix it to /raw/upload/
    if (url.includes('.pdf') && url.includes('/image/upload/')) {
        return url.replace('/image/upload/', '/raw/upload/');
    }
    return url;
}
