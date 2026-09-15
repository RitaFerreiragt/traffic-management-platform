import nodemailer from 'nodemailer';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

interface LeadEmailData {
  name: string;
  email: string;
  businessName: string;
  businessType: string;
}

// Initialize email transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

/**
 * Send email
 */
export async function sendEmail(options: EmailOptions): Promise<void> {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || 'noreply@trafficmanagement.pt',
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
    });
    console.log(`✉️  Email sent to ${options.to}`);
  } catch (error: any) {
    console.error('Error sending email:', error);
    throw new Error(`Failed to send email: ${error.message}`);
  }
}

/**
 * Send confirmation email to lead
 */
export async function sendLeadConfirmationEmail(
  lead: LeadEmailData
): Promise<void> {
  const html = `
    <!DOCTYPE html>
    <html lang="pt-PT">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          font-family: 'Inter', Arial, sans-serif;
          line-height: 1.6;
          color: #1A1A1A;
          background-color: #FAFAF8;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #FAFAF8;
        }
        .header {
          background: linear-gradient(135deg, #1A1A1A 0%, #B8A89F 100%);
          color: #FAFAF8;
          padding: 40px 20px;
          text-align: center;
          border-radius: 8px 8px 0 0;
        }
        .header h1 {
          margin: 0;
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 32px;
          font-weight: bold;
        }
        .content {
          background-color: #FAFAF8;
          padding: 40px 20px;
          border: 1px solid #D4C5B9;
          border-top: none;
        }
        .content h2 {
          font-family: 'Playfair Display', Georgia, serif;
          color: #1A1A1A;
          font-size: 24px;
          margin-bottom: 20px;
        }
        .content p {
          margin-bottom: 15px;
          color: #B8A89F;
        }
        .highlight {
          color: #D4AF37;
          font-weight: bold;
        }
        .business-info {
          background-color: #F5F3F0;
          border-left: 4px solid #D4AF37;
          padding: 20px;
          margin: 20px 0;
          border-radius: 4px;
        }
        .business-info p {
          margin: 8px 0;
          color: #1A1A1A;
        }
        .cta {
          text-align: center;
          margin: 30px 0;
        }
        .cta-button {
          display: inline-block;
          background-color: #1A1A1A;
          color: #FAFAF8;
          padding: 12px 30px;
          text-decoration: none;
          border-radius: 4px;
          font-weight: bold;
          transition: background-color 0.3s;
        }
        .cta-button:hover {
          background-color: #B8A89F;
        }
        .footer {
          background-color: #1A1A1A;
          color: #FAFAF8;
          padding: 20px;
          text-align: center;
          font-size: 12px;
          border-radius: 0 0 8px 8px;
        }
        .footer p {
          margin: 5px 0;
          color: #B8A89F;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎯 Recebemos o teu formulário!</h1>
        </div>
        
        <div class="content">
          <h2>Olá ${lead.name},</h2>
          
          <p>
            Obrigado por preencheres o formulário! Recebemos os dados do teu negócio
            <span class="highlight">${lead.businessName}</span> e vamos
            analisá-los com atenção.
          </p>
          
          <div class="business-info">
            <p><strong>Informações Registadas:</strong></p>
            <p>📧 <strong>Email:</strong> ${lead.email}</p>
            <p>🏢 <strong>Negócio:</strong> ${lead.businessName}</p>
            <p>📊 <strong>Tipo:</strong> ${lead.businessType}</p>
          </div>
          
          <p>
            O nosso objetivo é perceber o potencial real do teu negócio e como podemos
            ajudar-te a transformar o teu investimento em publicidade em oportunidades
            reais de negócio.
          </p>
          
          <p>
            <strong>O que vem a seguir?</strong>
          </p>
          <p>
            Em breve, um dos nossos especialistas entrará em contacto contigo para:
          </p>
          <ul>
            <li>Analisar o teu negócio em detalhes</li>
            <li>Identificar oportunidades de crescimento</li>
            <li>Explicar como podemos colaborar</li>
          </ul>
          
          <p>
            Se tiveres dúvidas ou preferires agendar uma reunião mais rapidamente,
            não hesites em contactar-nos.
          </p>
          
          <div class="cta">
            <a href="mailto:digital@ritaferreiragt.com" class="cta-button">
              Contactar Agora
            </a>
          </div>
          
          <p>
            Estamos ansiosos por trabalhar contigo e ajudar o teu negócio a crescer.
          </p>
          
          <p>
            Cumprimentos,<br>
            <strong>Equipa Traffic Management</strong><br>
            <em>Investimento com Direção</em>
          </p>
        </div>
        
        <div class="footer">
          <p>Traffic Management | Gestão de Tráfego Pago</p>
          <p>📧 digital@ritaferreiragt.com</p>
          <p>Portugal</p>
          <p style="margin-top: 15px; border-top: 1px solid #B8A89F; padding-top: 15px;">
            Este email foi enviado porque preencheste o nosso formulário.
            <a href="#" style="color: #D4AF37; text-decoration: none;">Política de Privacidade</a>
          </p>
        </div>
      </div>
    </body>
    </html>
  `;

  const text = `
Olá ${lead.name},

Obrigado por preencheres o formulário! Recebemos os dados do teu negócio "${lead.businessName}" e vamos analisá-los com atenção.

Informações Registadas:
- Email: ${lead.email}
- Negócio: ${lead.businessName}
- Tipo: ${lead.businessType}

Em breve, um dos nossos especialistas entrará em contacto contigo para:
- Analisar o teu negócio em detalhes
- Identificar oportunidades de crescimento
- Explicar como podemos colaborar

Estamos ansiosos por trabalhar contigo!

Cumprimentos,
Equipa Traffic Management
Investimento com Direção

digital@ritaferreiragt.com
  `;

  await sendEmail({
    to: lead.email,
    subject: `Recebemos o teu formulário, ${lead.name}! 🎯`,
    html,
    text,
  });
}

/**
 * Send notification email to admin
 */
export async function sendLeadNotificationToAdmin(
  lead: LeadEmailData & {
    phone: string;
    currentChallenges: string[];
    budget?: string;
    message?: string;
  }
): Promise<void> {
  const html = `
    <!DOCTYPE html>
    <html lang="pt-PT">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          font-family: 'Inter', Arial, sans-serif;
          line-height: 1.6;
          color: #1A1A1A;
          background-color: #FAFAF8;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #FAFAF8;
        }
        .header {
          background: #D4AF37;
          color: #1A1A1A;
          padding: 20px;
          text-align: center;
          border-radius: 8px 8px 0 0;
        }
        .header h1 {
          margin: 0;
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 24px;
        }
        .content {
          background-color: #FAFAF8;
          padding: 20px;
          border: 1px solid #D4C5B9;
          border-top: none;
        }
        .section {
          margin-bottom: 20px;
          border-bottom: 1px solid #D4C5B9;
          padding-bottom: 15px;
        }
        .section h3 {
          color: #1A1A1A;
          margin: 0 0 10px 0;
          font-size: 14px;
          text-transform: uppercase;
          font-weight: bold;
        }
        .info-row {
          display: flex;
          margin: 8px 0;
          font-size: 14px;
        }
        .info-label {
          font-weight: bold;
          width: 120px;
          color: #B8A89F;
        }
        .info-value {
          color: #1A1A1A;
          flex: 1;
        }
        .challenges {
          background-color: #F5F3F0;
          padding: 10px;
          border-radius: 4px;
          margin: 5px 0;
        }
        .challenge-item {
          margin: 5px 0;
          font-size: 13px;
          color: #1A1A1A;
        }
        .footer {
          background-color: #1A1A1A;
          color: #FAFAF8;
          padding: 15px;
          text-align: center;
          font-size: 12px;
          border-radius: 0 0 8px 8px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🚀 Novo Lead Recebido!</h1>
        </div>
        
        <div class="content">
          <div class="section">
            <h3>Informações Pessoais</h3>
            <div class="info-row">
              <span class="info-label">Nome:</span>
              <span class="info-value">${lead.name}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Email:</span>
              <span class="info-value">${lead.email}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Telefone:</span>
              <span class="info-value">${lead.phone}</span>
            </div>
          </div>
          
          <div class="section">
            <h3>Informações do Negócio</h3>
            <div class="info-row">
              <span class="info-label">Negócio:</span>
              <span class="info-value">${lead.businessName}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Tipo:</span>
              <span class="info-value">${lead.businessType}</span>
            </div>
            ${lead.budget ? `<div class="info-row">
              <span class="info-label">Orçamento:</span>
              <span class="info-value">${lead.budget}€/mês</span>
            </div>` : ''}
          </div>
          
          <div class="section">
            <h3>Desafios Principais</h3>
            <div class="challenges">
              ${lead.currentChallenges.map((challenge) => `<div class="challenge-item">✓ ${challenge}</div>`).join('')}
            </div>
          </div>
          
          ${lead.message ? `<div class="section">
            <h3>Mensagem Adicional</h3>
            <p style="color: #1A1A1A; margin: 0; font-style: italic;">${lead.message}</p>
          </div>` : ''}
          
          <div class="section" style="border-bottom: none;">
            <h3>Ações Recomendadas</h3>
            <p style="color: #1A1A1A; margin: 0;">
              1. Contactar lead para agendar reunião de diagnóstico<br>
              2. Preparar análise inicial do negócio<br>
              3. Agendar follow-up em 24-48 horas
            </p>
          </div>
        </div>
        
        <div class="footer">
          <p>Traffic Management | Sistema de Leads</p>
          <p>Email enviado automaticamente pelo sistema de formulários</p>
        </div>
      </div>
    </body>
    </html>
  `;

  await sendEmail({
    to: process.env.ADMIN_EMAIL || 'digital@ritaferreiragt.com',
    subject: `[NOVO LEAD] ${lead.businessName} - ${lead.name}`,
    html,
  });
}
