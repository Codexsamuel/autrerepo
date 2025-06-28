#!/usr/bin/env node

/**
 * DAVY Trading Platform - AI Security Surveillance System
 * Author: Samuel OBAM & Sabine NGA Lucie
 * Version: 1.0.0
 */

const winston = require('winston');
const Redis = require('redis');
const { createClient } = require('@supabase/supabase-js');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

// Configuration
const config = {
    redis: {
        url: process.env.REDIS_URL || 'redis://localhost:6379'
    },
    supabase: {
        url: process.env.SUPABASE_URL,
        key: process.env.SUPABASE_SERVICE_KEY
    },
    security: {
        threatThreshold: 0.8,
        anomalyThreshold: 0.7,
        maxFailedAttempts: 5,
        lockoutDuration: 15 * 60 * 1000, // 15 minutes
        sessionTimeout: 24 * 60 * 60 * 1000 // 24 hours
    }
};

// Initialize Redis
const redis = Redis.supabase;
redis.connect().catch(console.error);

// Initialize Supabase
const supabase = supabase;

// Logger configuration
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json()
    ),
    defaultMeta: { service: 'security-monitor' },
    transports: [
        new winston.transports.File({ filename: 'logs/security-error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/security-combined.log' }),
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            )
        })
    ]
});

class SecurityMonitor {
    constructor() {
        this.threatPatterns = this.loadThreatPatterns();
        this.anomalyDetector = new AnomalyDetector();
        this.rateLimiter = new RateLimiter();
        this.otpManager = new OTPManager();
        this.incidentManager = new IncidentManager();
    }

    loadThreatPatterns() {
        return {
            sqlInjection: [
                /(\b(union|select|insert|update|delete|drop|create|alter)\b.*\b(from|into|where|table|database)\b)/i,
                /(\b(union|select|insert|update|delete|drop|create|alter)\b.*\b(from|into|where|table|database)\b)/i,
                /(\b(union|select|insert|update|delete|drop|create|alter)\b.*\b(from|into|where|table|database)\b)/i
            ],
            xss: [
                /<script[^>]*>.*?<\/script>/gi,
                /javascript:/gi,
                /on\w+\s*=/gi,
                /<iframe[^>]*>/gi,
                /<object[^>]*>/gi
            ],
            pathTraversal: [
                /\.\.\//g,
                /\.\.\\/g,
                /\/etc\/passwd/i,
                /\/proc\/self\/environ/i
            ],
            commandInjection: [
                /[;&|`$(){}[\]]/g,
                /\b(cat|ls|pwd|whoami|id|uname|ps|netstat)\b/i
            ],
            bruteForce: {
                loginAttempts: 5,
                timeWindow: 5 * 60 * 1000 // 5 minutes
            }
        };
    }

    async analyzeRequest(req, res, next) {
        try {
            const requestData = {
                ip: req.ip || req.connection.remoteAddress,
                userAgent: req.headers['user-agent'],
                method: req.method,
                url: req.url,
                body: req.body,
                headers: req.headers,
                timestamp: new Date()
            };

            // Threat detection
            const threatScore = await this.detectThreats(requestData);
            
            // Anomaly detection
            const anomalyScore = await this.anomalyDetector.detect(requestData);
            
            // Rate limiting
            const rateLimitResult = await this.rateLimiter.check(requestData.ip);

            // Combined security score
            const securityScore = Math.max(threatScore, anomalyScore);

            // Log security event
            await this.logSecurityEvent({
                type: 'request_analysis',
                ip: requestData.ip,
                threatScore,
                anomalyScore,
                securityScore,
                rateLimitResult,
                details: requestData
            });

            // Take action based on security score
            if (securityScore > config.security.threatThreshold) {
                await this.handleHighThreat(requestData, securityScore);
                return res.status(403).json({ error: 'Access denied for security reasons' });
            }

            if (rateLimitResult.blocked) {
                return res.status(429).json({ error: 'Too many requests' });
            }

            // Add security headers
            this.addSecurityHeaders(res);

            next();
        } catch (error) {
            logger.error('Error in request analysis:', error);
            next();
        }
    }

    async detectThreats(requestData) {
        let threatScore = 0;
        const threats = [];

        // Check for SQL injection
        const sqlInjectionScore = this.checkSQLInjection(requestData);
        if (sqlInjectionScore > 0) {
            threatScore += sqlInjectionScore;
            threats.push('sql_injection');
        }

        // Check for XSS
        const xssScore = this.checkXSS(requestData);
        if (xssScore > 0) {
            threatScore += xssScore;
            threats.push('xss');
        }

        // Check for path traversal
        const pathTraversalScore = this.checkPathTraversal(requestData);
        if (pathTraversalScore > 0) {
            threatScore += pathTraversalScore;
            threats.push('path_traversal');
        }

        // Check for command injection
        const commandInjectionScore = this.checkCommandInjection(requestData);
        if (commandInjectionScore > 0) {
            threatScore += commandInjectionScore;
            threats.push('command_injection');
        }

        // Check for brute force
        const bruteForceScore = await this.checkBruteForce(requestData);
        if (bruteForceScore > 0) {
            threatScore += bruteForceScore;
            threats.push('brute_force');
        }

        return Math.min(threatScore, 1.0);
    }

    checkSQLInjection(requestData) {
        const patterns = this.threatPatterns.sqlInjection;
        const data = JSON.stringify(requestData).toLowerCase();
        
        for (const pattern of patterns) {
            if (pattern.test(data)) {
                return 0.9;
            }
        }
        return 0;
    }

    checkXSS(requestData) {
        const patterns = this.threatPatterns.xss;
        const data = JSON.stringify(requestData);
        
        for (const pattern of patterns) {
            if (pattern.test(data)) {
                return 0.8;
            }
        }
        return 0;
    }

    checkPathTraversal(requestData) {
        const patterns = this.threatPatterns.pathTraversal;
        const data = JSON.stringify(requestData);
        
        for (const pattern of patterns) {
            if (pattern.test(data)) {
                return 0.7;
            }
        }
        return 0;
    }

    checkCommandInjection(requestData) {
        const patterns = this.threatPatterns.commandInjection;
        const data = JSON.stringify(requestData);
        
        for (const pattern of patterns) {
            if (pattern.test(data)) {
                return 0.8;
            }
        }
        return 0;
    }

    async checkBruteForce(requestData) {
        const key = `brute_force:${requestData.ip}`;
        const attempts = await redis.get(key);
        
        if (attempts && parseInt(attempts) >= this.threatPatterns.bruteForce.loginAttempts) {
            return 0.9;
        }
        return 0;
    }

    async handleHighThreat(requestData, securityScore) {
        // Block IP
        await redis.setex(`blocked:${requestData.ip}`, 3600, 'blocked');
        
        // Log incident
        await this.incidentManager.createIncident({
            type: 'high_threat',
            severity: 'critical',
            ip: requestData.ip,
            securityScore,
            details: requestData
        });

        // Send alert
        await this.sendAlert({
            type: 'high_threat_detected',
            ip: requestData.ip,
            securityScore,
            timestamp: new Date()
        });
    }

    addSecurityHeaders(res) {
        res.setHeader('X-Content-Type-Options', 'nosniff');
        res.setHeader('X-Frame-Options', 'DENY');
        res.setHeader('X-XSS-Protection', '1; mode=block');
        res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
        res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';");
        res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
        res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
    }

    async logSecurityEvent(event) {
        try {
            await supabase
                .from('security_logs')
                .insert({
                    action: event.type,
                    ip_address: event.ip,
                    threat_level: event.securityScore > 0.8 ? 'high' : event.securityScore > 0.5 ? 'medium' : 'low',
                    details: event
                });

            logger.info('Security event logged', event);
        } catch (error) {
            logger.error('Error logging security event:', error);
        }
    }

    async sendAlert(alert) {
        // Send to monitoring system
        logger.warn('Security alert:', alert);
        
        // Could integrate with external services like:
        // - Slack
        // - Email
        // - SMS
        // - PagerDuty
    }
}

class AnomalyDetector {
    constructor() {
        this.baseline = new Map();
        this.anomalyThreshold = config.security.anomalyThreshold;
    }

    async detect(requestData) {
        const features = this.extractFeatures(requestData);
        const anomalyScore = this.calculateAnomalyScore(features);
        
        // Update baseline
        this.updateBaseline(features);
        
        return anomalyScore;
    }

    extractFeatures(requestData) {
        return {
            requestSize: JSON.stringify(requestData).length,
            methodComplexity: this.calculateMethodComplexity(requestData.method),
            headerCount: Object.keys(requestData.headers).length,
            userAgentLength: requestData.userAgent?.length || 0,
            urlLength: requestData.url.length,
            timestamp: requestData.timestamp.getHours()
        };
    }

    calculateMethodComplexity(method) {
        const complexity = {
            'GET': 1,
            'POST': 2,
            'PUT': 2,
            'DELETE': 2,
            'PATCH': 3
        };
        return complexity[method] || 1;
    }

    calculateAnomalyScore(features) {
        let score = 0;
        
        // Check against baseline
        for (const [key, value] of Object.entries(features)) {
            if (typeof value === 'number') {
                const baseline = this.baseline.get(key);
                if (baseline) {
                    const deviation = Math.abs(value - baseline.mean) / baseline.std;
                    if (deviation > 2) { // 2 standard deviations
                        score += 0.3;
                    }
                }
            }
        }
        
        return Math.min(score, 1.0);
    }

    updateBaseline(features) {
        for (const [key, value] of Object.entries(features)) {
            if (typeof value === 'number') {
                const current = this.baseline.get(key) || { mean: 0, std: 0, count: 0 };
                
                // Update mean
                current.count++;
                const delta = value - current.mean;
                current.mean += delta / current.count;
                
                // Update standard deviation
                const delta2 = value - current.mean;
                current.std = Math.sqrt((current.std * current.std * (current.count - 1) + delta * delta2) / current.count);
                
                this.baseline.set(key, current);
            }
        }
    }
}

class RateLimiter {
    constructor() {
        this.windowMs = 15 * 60 * 1000; // 15 minutes
        this.maxRequests = 100;
    }

    async check(ip) {
        const key = `rate_limit:${ip}`;
        const current = await redis.get(key);
        
        if (!current) {
            await redis.setex(key, Math.floor(this.windowMs / 1000), '1');
            return { blocked: false, remaining: this.maxRequests - 1 };
        }
        
        const count = parseInt(current);
        if (count >= this.maxRequests) {
            return { blocked: true, remaining: 0 };
        }
        
        await redis.incr(key);
        return { blocked: false, remaining: this.maxRequests - count - 1 };
    }
}

class OTPManager {
    constructor() {
        this.otpExpiry = 5 * 60 * 1000; // 5 minutes
    }

    async generateOTP(userId) {
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date(Date.now() + this.otpExpiry);
        
        await supabase
            .from('otp_sessions')
            .insert({
                user_id: userId,
                otp_code: otp,
                expires_at: expiresAt.toISOString()
            });
        
        return otp;
    }

    async verifyOTP(userId, otp) {
        const { data, error } = await supabase
            .from('otp_sessions')
            .select('*')
            .eq('user_id', userId)
            .eq('otp_code', otp)
            .eq('is_used', false)
            .gt('expires_at', new Date().toISOString())
            .single();
        
        if (error || !data) {
            return false;
        }
        
        // Mark as used
        await supabase
            .from('otp_sessions')
            .update({ is_used: true })
            .eq('id', data.id);
        
        return true;
    }
}

class IncidentManager {
    async createIncident(incident) {
        try {
            await supabase
                .from('ai_surveillance_logs')
                .insert({
                    threat_type: incident.type,
                    threat_level: incident.severity,
                    confidence_score: incident.securityScore,
                    detection_method: 'ai_surveillance',
                    details: incident,
                    action_taken: 'blocked'
                });
            
            logger.warn('Incident created:', incident);
        } catch (error) {
            logger.error('Error creating incident:', error);
        }
    }
}

// Export the security monitor
module.exports = SecurityMonitor;

// If run directly, start monitoring
if (require.main === module) {
    const monitor = new SecurityMonitor();
    logger.info('AI Security Surveillance System started');
    
    // Keep the process alive
    process.on('SIGINT', () => {
        logger.info('Shutting down security monitor...');
        redis.quit();
        process.exit(0);
    });
} 