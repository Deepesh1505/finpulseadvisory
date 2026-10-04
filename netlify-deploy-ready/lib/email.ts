import nodemailer from 'nodemailer';
import { Lead } from './store';

export async function sendLeadNotificationEmail(lead: Lead) {
  const adminEmail = process.env.LEAD_NOTIFICATION_EMAIL || 'deepeshmandloi1505@gmail.com';
  
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const port = Number(process.env.SMTP_PORT) || 587;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>New High-Value Lead - FinPulse Research</title>
      </head>
      <body style="font-family: Arial, sans-serif; background-color: #0F172A; color: #ECFDF5; padding: 24px; margin: 0;">
        <div style="max-width: 600px; margin: 0 auto; background: #1E293B; border-radius: 12px; border: 1px solid #10B981; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.5);">
          
          <div style="background: linear-gradient(135deg, #065F46 0%, #10B981 100%); padding: 20px; text-align: center;">
            <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: bold; letter-spacing: 0.5px;">FinPulse Research</h1>
            <p style="margin: 4px 0 0; color: #ECFDF5; font-size: 14px;">🚨 New Advisory Lead Captured</p>
          </div>

          <div style="padding: 24px; color: #E2E8F0;">
            <p style="font-size: 16px; margin-bottom: 20px;">
              A new prospective investor/trader just submitted their inquiry on the FinPulse advisory portal:
            </p>

            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
              <tr style="background: #0F172A;">
                <td style="padding: 12px; border: 1px solid #334155; font-weight: bold; width: 40%; color: #34D399;">Full Name:</td>
                <td style="padding: 12px; border: 1px solid #334155; color: #FFFFFF; font-weight: bold;">${lead.full_name}</td>
              </tr>
              <tr>
                <td style="padding: 12px; border: 1px solid #334155; font-weight: bold; color: #34D399;">Phone / WhatsApp:</td>
                <td style="padding: 12px; border: 1px solid #334155; color: #FFFFFF; font-weight: bold;">
                  <a href="https://wa.me/${lead.phone_number.replace(/\D/g, '')}" style="color: #10B981; text-decoration: none;">${lead.phone_number} (Chat on WhatsApp)</a>
                </td>
              </tr>
              <tr style="background: #0F172A;">
                <td style="padding: 12px; border: 1px solid #334155; font-weight: bold; color: #34D399;">Email:</td>
                <td style="padding: 12px; border: 1px solid #334155; color: #FFFFFF;">${lead.email || 'N/A'}</td>
              </tr>
              <tr>
                <td style="padding: 12px; border: 1px solid #334155; font-weight: bold; color: #34D399;">Trading Segment:</td>
                <td style="padding: 12px; border: 1px solid #334155; color: #34D399; font-weight: bold;">${lead.trading_segment}</td>
              </tr>
              <tr style="background: #0F172A;">
                <td style="padding: 12px; border: 1px solid #334155; font-weight: bold; color: #34D399;">Capital Band:</td>
                <td style="padding: 12px; border: 1px solid #334155; color: #F59E0B; font-weight: bold;">${lead.investment_capital}</td>
              </tr>
              <tr>
                <td style="padding: 12px; border: 1px solid #334155; font-weight: bold; color: #34D399;">Selected Plan:</td>
                <td style="padding: 12px; border: 1px solid #334155; color: #FFFFFF;">${lead.plan_name || 'General Inquiry'}</td>
              </tr>
              <tr style="background: #0F172A;">
                <td style="padding: 12px; border: 1px solid #334155; font-weight: bold; color: #34D399;">Occupation:</td>
                <td style="padding: 12px; border: 1px solid #334155; color: #FFFFFF;">${lead.occupation || 'N/A'}</td>
              </tr>
              <tr>
                <td style="padding: 12px; border: 1px solid #334155; font-weight: bold; color: #34D399;">Submitted At:</td>
                <td style="padding: 12px; border: 1px solid #334155; color: #94A3B8;">${new Date(lead.created_at).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</td>
              </tr>
            </table>

            <div style="text-align: center; margin-top: 24px;">
              <a href="https://wa.me/${lead.phone_number.replace(/\D/g, '')}?text=Hello%20${encodeURIComponent(lead.full_name)}%2C%20thank%20you%20for%20contacting%20FinPulse%20Research.%20We%20received%20your%20interest%20in%20our%20${encodeURIComponent(lead.trading_segment)}%20advisory%20plan." 
                 style="background: #25D366; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: bold; display: inline-block;">
                Connect on WhatsApp Immediately
              </a>
            </div>
          </div>

          <div style="background: #0F172A; padding: 14px; text-align: center; border-top: 1px solid #334155; font-size: 12px; color: #64748B;">
            FinPulse Research Automated Lead Notification Engine • Lead ID: ${lead.id}
          </div>
        </div>
      </body>
    </html>
  `;

  if (host && user && pass) {
    try {
      const transporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: { user, pass },
      });

      await transporter.sendMail({
        from: `"FinPulse Research Leads" <${user}>`,
        to: adminEmail,
        subject: `🚨 [New Lead] ${lead.full_name} (${lead.trading_segment} - ${lead.investment_capital})`,
        html: htmlContent,
      });
      console.log(`[Email] Lead alert successfully emailed to ${adminEmail}`);
      return { success: true, method: 'smtp' };
    } catch (err) {
      console.error('[Email Error] Failed to send email via SMTP:', err);
      // Fallback log
      return { success: false, error: err };
    }
  } else {
    console.log(`[Email Notification Alert - Simulated/Dev]
Recipient: ${adminEmail}
Subject: 🚨 [New Lead] ${lead.full_name} (${lead.trading_segment} - ${lead.investment_capital})
Phone: ${lead.phone_number}
Capital: ${lead.investment_capital}
Time: ${lead.created_at}
Note: Add SMTP_HOST, SMTP_USER, SMTP_PASS to .env.local to deliver live inbox emails.
    `);
    return { success: true, method: 'logged' };
  }
}
