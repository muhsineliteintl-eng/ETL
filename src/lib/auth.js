import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET;
const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH;

if (!JWT_SECRET || !ADMIN_USERNAME || !ADMIN_PASSWORD_HASH) {
    throw new Error('Missing required authentication environment variables');
}

/**
 * Rate limiting helper (simple in-memory implementation)
 */
const loginAttempts = new Map();

/**
 * Verify admin credentials
 */
export async function verifyAdminCredentials(username, password) {
    if (username !== ADMIN_USERNAME) {
        return false;
    }
    
    return await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
}

/**
 * Generate JWT token for admin
 */
export function generateAdminToken() {
    return jwt.sign(
        { 
            username: ADMIN_USERNAME,
            role: 'admin',
            iat: Math.floor(Date.now() / 1000)
        },
        JWT_SECRET,
        { 
            expiresIn: '24h',
            issuer: 'elite-international',
            audience: 'admin-panel'
        }
    );
}

/**
 * Verify JWT token
 */
export function verifyToken(token) {
    try {
        return jwt.verify(token, JWT_SECRET, {
            issuer: 'elite-international',
            audience: 'admin-panel'
        });
    } catch (error) {
        return null;
    }
}

/**
 * Middleware helper to verify admin authentication
 */
export function verifyAdminAuth(request) {
    const authHeader = request.headers.get('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return { isValid: false, error: 'Missing or invalid authorization header' };
    }
    
    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    const decoded = verifyToken(token);
    
    if (!decoded) {
        return { isValid: false, error: 'Invalid or expired token' };
    }
    
    return { isValid: true, user: decoded };
}

/**
 * Create unauthorized response
 */
export function createUnauthorizedResponse(message = 'Unauthorized') {
    return NextResponse.json(
        { error: message, code: 'UNAUTHORIZED' },
        { status: 401 }
    );
}

/**
 * Require authentication helper for API routes
 */
export function requireAuth(request) {
    const authResult = verifyAdminAuth(request);
    
    if (!authResult.isValid) {
        return {
            error: authResult.error,
            status: 401
        };
    }
    
    return {
        user: authResult.user,
        error: null
    };
}

/**
 * Rate limiting for login attempts
 */
export function checkRateLimit(ip) {
    const now = Date.now();
    const attempts = loginAttempts.get(ip) || [];
    
    // Remove attempts older than 15 minutes
    const recentAttempts = attempts.filter(time => now - time < 15 * 60 * 1000);
    
    if (recentAttempts.length >= 5) {
        return { allowed: false, resetTime: recentAttempts[0] + 15 * 60 * 1000 };
    }
    
    recentAttempts.push(now);
    loginAttempts.set(ip, recentAttempts);
    
    return { allowed: true, attemptsLeft: 5 - recentAttempts.length };
}