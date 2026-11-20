import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';

dotenv.config({ override: true });

function resolveEmail(val?: string, fallback: string = 'boboike600@gmail.com'): string {
  const trimmed = (val || '').trim();
  if (!trimmed) return fallback;
  if (!trimmed.includes('@')) {
    return `${trimmed}@gmail.com`;
  }
  return trimmed;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware for body parsing
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Google Search Console Verification File
  app.get('/google2e15421180ca8be8.html', (_req, res) => {
    res.type('text/html').send('google-site-verification: google2e15421180ca8be8.html\n');
  });

  // API Health Check
  app.get('/api/health', (_req, res) => {
    res.json({
      status: 'ok',
      service: 'Fav Li$ Noble Tech Backend',
      timestamp: new Date().toISOString(),
      emailConfigured: Boolean(process.env.EMAIL_PASS && (process.env.EMAIL_USER || process.env.RECEIVER_EMAIL)),
    });
  });

  // Contact / Project Brief Transmission Endpoint
  app.post(['/api/transmit-brief', '/api/contact'], async (req, res) => {
    const { email, budget, brief, message } = req.body || {};
    const briefContent = brief || message;

    if (!email || !briefContent) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: email and project brief are required.',
      });
    }

    const emailUser = resolveEmail(process.env.EMAIL_USER, 'boboike600@gmail.com');
    const receiverEmail = resolveEmail(process.env.RECEIVER_EMAIL, 'boboike600@gmail.com');
    const rawPass = process.env.EMAIL_PASS || 'bbiwjuyqnmxkdnlh';
    const emailPass = (rawPass || '').trim().replace(/\s+/g, '');

    if (!emailPass) {
      console.warn('[Nodemailer] Warning: EMAIL_PASS is not configured in .env');
      return res.status(500).json({
        success: false,
        error: 'Server email credentials not configured. Please set EMAIL_PASS in the .env file.',
      });
    }

    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: emailUser,
          pass: emailPass,
        },
      });

      const formattedDate = new Date().toLocaleString('en-US', {
        timeZone: 'UTC',
        dateStyle: 'full',
        timeStyle: 'medium',
      });

      const mailOptions = {
        from: `"Fav Li$ Noble Tech Intake" <${emailUser}>`,
        to: receiverEmail,
        replyTo: email,
        subject: `[Project Brief] New Inquiry from ${email} (${budget || 'Flexible Budget'})`,
        text: `NEW PROJECT PROPOSAL BRIEF RECEIVED
==================================================
Client Contact Email: ${email}
Project Budget Allocation: ${budget || 'Not specified'}
Transmission Timestamp: ${formattedDate} UTC

Project Brief & Architectural Specifications:
--------------------------------------------------
${briefContent}
==================================================
* You can reply directly to this email to contact ${email}.`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #030712; color: #f1f5f9; padding: 32px 24px; border-radius: 16px; max-width: 600px; margin: 0 auto; border: 1px solid rgba(6, 182, 212, 0.3);">
            <div style="border-bottom: 1px solid #1e293b; padding-bottom: 18px; margin-bottom: 24px;">
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

            <div style="background-color: #080c16; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; padding: 20px; margin-bottom: 20px;">
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
                    ${formattedDate} UTC
                  </td>
                </tr>
              </table>
            </div>

            <div style="background-color: #080c16; border: 1px solid rgba(168, 85, 247, 0.2); border-radius: 12px; padding: 20px; margin-bottom: 24px;">
              <h3 style="margin-top: 0; margin-bottom: 12px; font-size: 12px; letter-spacing: 1.5px; text-transform: uppercase; color: #c084fc;">
                Project Specifications & Details
              </h3>
              <div style="white-space: pre-wrap; font-size: 14px; line-height: 1.6; color: #e2e8f0;">
${briefContent}
              </div>
            </div>

            <div style="border-top: 1px solid #1e293b; padding-top: 16px; font-size: 12px; color: #64748b; text-align: center;">
              Hit <strong style="color: #f1f5f9;">Reply</strong> in your mail client to email <a href="mailto:${email}" style="color: #38bdf8;">${email}</a> directly.
            </div>
          </div>
        `,
      };

      const info = await transporter.sendMail(mailOptions);
      console.log('[Nodemailer] Project brief email sent successfully. ID:', info.messageId);

      return res.status(200).json({
        success: true,
        message: 'Brief successfully transmitted and emailed.',
        messageId: info.messageId,
      });
    } catch (err: any) {
      console.error('[Nodemailer] Failed to send email:', err);
      return res.status(500).json({
        success: false,
        error: err?.message || 'Failed to dispatch email via Nodemailer SMTP.',
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server active on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
