import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export const dynamic = 'force-dynamic';

export async function GET() {
    const username = process.env.ADMIN_USERNAME;
    const hash = process.env.ADMIN_PASSWORD_HASH;
    const jwtSecret = process.env.JWT_SECRET;

    // Test the hash against the password
    let hashTest = false;
    let hashError = null;
    try {
        if (hash) {
            hashTest = await bcrypt.compare('Eliter@2026', hash);
        }
    } catch (e) {
        hashError = e.message;
    }

    return NextResponse.json({
        username_set: !!username,
        username_value: username,
        hash_set: !!hash,
        hash_length: hash?.length,
        hash_preview: hash ? hash.substring(0, 10) + '...' : null,
        jwt_set: !!jwtSecret,
        password_matches: hashTest,
        hash_error: hashError,
    });
}
