import { NextResponse } from 'next/server';
import { verifyAdminCredentials, generateAdminToken, checkRateLimit } from '../../../../lib/auth';

export const dynamic = 'force-dynamic';

export async function POST(request) {
    console.log('=== LOGIN API CALLED ===');
    try {
        // Get client IP for rate limiting
        const forwarded = request.headers.get('x-forwarded-for');
        const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown';
        
        // Check rate limiting
        const rateLimit = checkRateLimit(ip);
        if (!rateLimit.allowed) {
            const resetTime = new Date(rateLimit.resetTime).toISOString();
            console.log('Rate limited:', ip);
            return NextResponse.json(
                { 
                    error: 'Too many login attempts. Please try again later.',
                    resetTime,
                    code: 'RATE_LIMITED'
                },
                { status: 429 }
            );
        }
        
        const body = await request.json();
        const { username, password } = body;
        
        console.log('Login attempt:', { username, passwordLength: password?.length });
        
        // Validate input
        if (!username || !password) {
            console.log('Missing credentials');
            return NextResponse.json(
                { error: 'Username and password are required', code: 'MISSING_CREDENTIALS' },
                { status: 400 }
            );
        }
        
        // Verify credentials
        const isValid = await verifyAdminCredentials(username, password);
        console.log('Credentials valid:', isValid);
        
        if (!isValid) {
            console.log('Invalid credentials');
            return NextResponse.json(
                { 
                    error: 'Invalid credentials',
                    code: 'INVALID_CREDENTIALS',
                    attemptsLeft: rateLimit.attemptsLeft - 1
                },
                { status: 401 }
            );
        }
        
        // Generate JWT token
        const token = generateAdminToken();
        console.log('Generated token, length:', token.length);
        
        // Return success response with token
        console.log('Login successful');
        return NextResponse.json({
            success: true,
            message: 'Login successful',
            token,
            expiresIn: '24h'
        });
        
    } catch (error) {
        console.error('Admin login error:', error);
        return NextResponse.json(
            { error: 'Internal server error', code: 'SERVER_ERROR' },
            { status: 500 }
        );
    }
}

export async function DELETE(request) {
    // Logout endpoint - client will clear sessionStorage
    return NextResponse.json({ success: true, message: 'Logged out successfully' });
}