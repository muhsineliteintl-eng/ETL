import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

async function verify() {
    const password = 'EliteSecurity@2026';
    const username = process.env.ADMIN_USERNAME;
    const hash = process.env.ADMIN_PASSWORD_HASH;

    console.log('--- Verification ---');
    console.log('Username from .env:', username);
    console.log('Hash from .env:', hash);

    if (username !== 'admin') {
        console.error('FAILED: Username mismatch');
        return;
    }

    try {
        const match = await bcrypt.compare(password, hash.replace(/"/g, ''));
        console.log(`Password match: ${match}`);
        if (match) {
            console.log('✅ NEW CREDENTIALS VERIFIED');
        } else {
            console.log('❌ NEW CREDENTIALS FAILED VERIFICATION');
        }
    } catch (e) {
        console.error('Error during verification:', e);
    }
}

verify();
