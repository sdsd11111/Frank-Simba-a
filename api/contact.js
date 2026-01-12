const nodemailer = require('nodemailer');

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { name, email, subject, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Faltan campos obligatorios (nombre, email, mensaje)' });
    }

    try {
        // Create transporter using SMTP credentials from environment variables
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.franksimbana.com',
            port: parseInt(process.env.SMTP_PORT || '465'),
            secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
            tls: {
                rejectUnauthorized: false // Often needed for custom domain SMTPs
            }
        });

        const mailOptions = {
            from: `"${name}" <${process.env.SMTP_USER}>`, // Recommended to use SMTP_USER as sender to avoid rejection
            to: process.env.CONTACT_EMAIL || 'email@franksimbana.com',
            replyTo: email,
            subject: subject || 'Nuevo mensaje de contacto - Web Frank Simbaña',
            text: `Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`,
            html: `
        <h3>Nuevo mensaje de contacto</h3>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Asunto:</strong> ${subject || 'Contacto desde la web'}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `
        };

        await transporter.sendMail(mailOptions);

        return res.status(200).json({ message: 'Mensaje enviado con éxito' });
    } catch (error) {
        console.error('Error enviando email:', error);
        return res.status(500).json({ error: 'Error al enviar el mensaje: ' + error.message });
    }
}
