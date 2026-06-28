const transporter = require('../config/email.js');

/**
 * Envía un correo electrónico vía SMTP (Google).
 *
 * @param {Object} params
 * @param {string} params.to - Dirección de correo del destinatario
 * @param {string} params.subject - Asunto del correo
 * @param {string} params.body - Cuerpo del correo
 * @param {boolean} [params.isHtml=true] - Si el cuerpo es HTML o texto plano
 * @returns {Promise<import('nodemailer').SentMessageInfo>}
 */
const sendEmail = async ({ to, subject, body, isHtml = true }) => {
    if (!to || !subject || !body) {
        throw new Error('to, subject y body son obligatorios');
    }

    const from = process.env.SMTP_FROM || process.env.SMTP_USER;

    const mailOptions = {
        from,
        to,
        subject,
        ...(isHtml ? { html: body } : { text: body }),
    };

    return transporter.sendMail(mailOptions);
};

module.exports = {
    sendEmail,
};
