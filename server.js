import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables from .env
dotenv.config({ override: true });

function resolveEmail(val, fallback = 'boboike600@gmail.com') {
  const trimmed = (val || '').trim();
  if (!trimmed) return fallback;
  if (!trimmed.includes('@')) {
    return `${trimmed}@gmail.com`;
  }
  return trimmed;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Body parser middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Basic CORS headers to allow cross-origin requests when frontend is hosted separately
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Fav Li$ Noble Tech - Brief Intake Backend',
    timestamp: new Date().toISOString(),
    emailUserConfigured: Boolean(process.env.EMAIL_USER),
    emailPassConfigured: Boolean(process.env.EMAIL_PASS),
    receiverConfigured: Boolean(process.env.RECEIVER_EMAIL),
  });
});

/**
 * Transmit Project Brief Endpoint
 * Receives project proposals and dispatches an email via Nodemailer + Gmail App Password
 */
app.post(['/api/transmit-brief', '/api/contact'], async (req, res) => {
  const { email, budget, brief, message } = req.body || {};
  const briefContent = brief || message;

  // Validation
  if (!email || !briefContent) {
    return res.status(400).json({
      success: false,
      error: 'Validation failed: Both email and project brief are required.',
    });
  }

  const emailUser = resolveEmail(process.env.EMAIL_USER, 'boboike600@gmail.com');
  const receiverEmail = resolveEmail(process.env.RECEIVER_EMAIL, 'boboike600@gmail.com');
  const rawPass = process.env.EMAIL_PASS || 'bbiwjuyqnmxkdnlh';
  const emailPass = (rawPass || '').trim().replace(/\s+/g, '');

  if (!emailPass) {
    console.error('[Nodemailer Error] EMAIL_PASS environment variable is missing.');
    return res.status(500).json({
      success: false,
      error: 'Server email credentials are not configured. Please set EMAIL_PASS in your .env file.',
    });
  }

  try {
    // Configure Gmail SMTP transporter using App Password
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    const formattedTime = new Date().toLocaleString('en-US', {
      timeZone: 'UTC',
      dateStyle: 'full',
      timeStyle: 'medium',
    });

    const mailOptions = {
      from: `"Fav Li$ Noble Tech Intake" <${emailUser}>`,
      to: receiverEmail,
      replyTo: email,
      subject: `[Project Brief] New Proposal from ${email} (${budget || 'Flexible'})`,
      text: `NEW CLIENT PROJECT BRIEF TRANSMITTED
=====================================================
Client Email: ${email}
Budget Range: ${budget || 'Not specified'}
Transmitted At: ${formattedTime} UTC

Project Specifications & Brief:
-----------------------------------------------------
${briefContent}
=====================================================
Direct reply: You can reply directly to this email to contact ${email}.`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background: #030712; color: #f1f5f9; padding: 32px 24px; border-radius: 16px; max-width: 600px; margin: 0 auto; border: 1px solid rgba(6, 182, 212, 0.3);">
          <div style="border-bottom: 1px solid #1e293b; padding-bottom: 16px; margin-bottom: 20px;">
            <span style="font-size: 11px; font-family: monospace; letter-spacing: 2px; color: #06b6d4; text-transform: uppercase;">
              FAV LI$ NOBLE TECH // DIRECT ASYNC INTAKE
            </span>
            <h2 style="font-size: 22px; font-weight: 800; color: #ffffff; margin: 8px 0 4px 0;">
              New Project Proposal Brief
            </h2>
            <p style="font-size: 13px; color: #94a3b8; margin: 0;">
              Transmitted securely from your website intake terminal.
            </p>
          </div>

          <div style="background-color: #080c16; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; padding: 18px; margin-bottom: 20px;">
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr>
                <td style="padding: 6px 0; color: #94a3b8; width: 140px;">Client Email:</td>
                <td style="padding: 6px 0; font-weight: 600;">
                  <a href="mailto:${email}" style="color: #38bdf8; text-decoration: none;">${email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #94a3b8;">Budget Range:</td>
                <td style="padding: 6px 0; color: #fbbf24; font-weight: 600;">
                  ${budget || 'Not specified'}
                </td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #94a3b8;">Received:</td>
                <td style="padding: 6px 0; color: #cbd5e1; font-family: monospace; font-size: 12px;">
                  ${formattedTime} UTC
                </td>
              </tr>
            </table>
          </div>

          <div style="background-color: #080c16; border: 1px solid rgba(168, 85, 247, 0.25); border-radius: 12px; padding: 18px; margin-bottom: 24px;">
            <h3 style="margin-top: 0; margin-bottom: 12px; font-size: 12px; letter-spacing: 1.5px; text-transform: uppercase; color: #c084fc;">
              Project Brief & Specifications
            </h3>
            <div style="white-space: pre-wrap; font-size: 14px; line-height: 1.6; color: #e2e8f0;">
${briefContent}
            </div>
          </div>

          <div style="border-top: 1px solid #1e293b; padding-top: 16px; font-size: 12px; color: #64748b; text-align: center;">
            Hit <strong style="color: #f1f5f9;">Reply</strong> in your email client to contact <a href="mailto:${email}" style="color: #38bdf8;">${email}</a> directly.
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('[Nodemailer Success] Email dispatched. Message ID:', info.messageId);

    return res.status(200).json({
      success: true,
      message: 'Brief transmitted successfully to engineering.',
      messageId: info.messageId,
    });
  } catch (err) {
    console.error('[Nodemailer Error] Failed to send email:', err);
    return res.status(500).json({
      success: false,
      error: err.message || 'Failed to dispatch email via Nodemailer SMTP.',
    });
  }
});

// Serve frontend static build if dist directory exists
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'), (err) => {
    if (err) {
      res.status(200).send('Fav Li$ Noble Tech API Server Running.');
    }
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend server listening on http://0.0.0.0:${PORT}`);
});
