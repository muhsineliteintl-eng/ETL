import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

const loginAttempts = new Map();

function getEnv() {
    const JWT_SECRET = process.env.JWT_SECRET;
    const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
    const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH;

    if (!JWT_SECRET || !ADMIN_USERNAME || !ADMIN_PASSWORD_HASH) {
        throw new Error('Missing required authentication environment variables');
    }
    return { JWT_SECRET, ADMIN_USERNAME, ADMIN_PASSWORD_HASH };
}

export async function verifyAdminCredentials(username, password) {
    const { ADMIN_USERNAME, ADMIN_PASSWORD_HASH } = getEnv();
    // case-insensitive username check
    if (username.toLowerCase() !== ADMIN_USERNAME.toLowerCase()) {
        return false;
    }
    return await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
}

export function generateAdminToken() {
    const { JWT_SECRET, ADMIN_USERNAME } = getEnv();
    return jwt.sign(
        { username: ADMIN_USERNAME, role: 'admin', iat: Math.floor(Date.now() / 1000) },
        JWT_SECRET,
        { expiresIn: '24h', issuer: 'elite-international', audience: 'admin-panel' }
    );
}

export function verifyToken(token) {
    try {
        const { JWT_SECRET } = getEnv();
        return jwt.verify(token, JWT_SECRET, {
            issuer: 'elite-international',
            audience: 'admin-panel'
        });
    } catch (error) {
        return null;
    }
}

export function verifyAdminAuth(request) {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return { isValid: false, error: 'Missing or invalid authorization header' };
    }
    const token = authHeader.substring(7);
    const decoded = verifyToken(token);
    if (!decoded) {
        return { isValid: false, error: 'Invalid or expired token' };
    }
    return { isValid: true, user: decoded };
}

export function createUnauthorizedResponse(message = 'Unauthorized') {
    return NextResponse.json(
        { error: message, code: 'UNAUTHORIZED' },
        { status: 401 }
    );
}

export function requireAuth(request) {
    const authResult = verifyAdminAuth(request);
    if (!authResult.isValid) {
        return { error: authResult.error, status: 401 };
    }
    return { user: authResult.user, error: null };
}

export function checkRateLimit(ip) {
    const now = Date.now();
    const attempts = loginAttempts.get(ip) || [];
    const recentAttempts = attempts.filter(time => now - time < 15 * 60 * 1000);
    if (recentAttempts.length >= 5) {
        return { allowed: false, resetTime: recentAttempts[0] + 15 * 60 * 1000 };
    }
    recentAttempts.push(now);
    loginAttempts.set(ip, recentAttempts);
    return { allowed: true, attemptsLeft: 5 - recentAttempts.length };
}
