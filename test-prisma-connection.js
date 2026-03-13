import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    console.log('🔍 Testing Prisma PostgreSQL Connection...\n');

    try {
        // 1. Connect and query
        console.log('⏳ Connecting to database...');
        await prisma.$connect();
        console.log('✅ Connected successfully!');

        // 2. Count records in each table
        const contentCount = await prisma.content.count();
        const applicationCount = await prisma.jobApplication.count();
        const inquiryCount = await prisma.inquiry.count();

        console.log('\n📊 Table Status:');
        console.log(`   - Content: ${contentCount} records`);
        console.log(`   - JobApplications: ${applicationCount} records`);
        console.log(`   - Inquiries: ${inquiryCount} records`);

        // 3. Test a simple operation (findFirst)
        console.log('\n📡 Testing findFirst on Content model...');
        const firstContent = await prisma.content.findFirst();
        if (firstContent) {
            console.log('✅ Successfully fetched content data!');
            console.log(`   ID: ${firstContent.id}`);
            console.log(`   Created At: ${firstContent.createdAt}`);
        } else {
            console.log('ℹ️  Content table is currently empty.');
        }

        console.log('\n🎉 Prisma connection test PASSED!');

    } catch (error) {
        console.error('\n❌ Prisma Connection FAILED!');
        console.error(`   Error: ${error.message}`);

        if (error.message.includes('Can\'t reach database server')) {
            console.error('\n💡 Tip: Check your internet connection and if the Neon database is active.');
        } else if (error.message.includes('Authentication failed')) {
            console.error('\n💡 Tip: Check your DATABASE_URL password and username.');
        }
    } finally {
        await prisma.$disconnect();
        console.log('\n🔌 Disconnected.');
        process.exit(0);
    }
}

main();
