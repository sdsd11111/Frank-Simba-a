// Versión simplificada y compatible con Vercel
const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  // Configuración CORS básica
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Manejar solicitud OPTIONS (preflight)
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Solo permitir método POST
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Método no permitido' });
    return;
  }

  try {
    // Parsear el cuerpo de la solicitud
    let body = {};
    try {
      body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    } catch (e) {
      return res.status(400).json({
        success: false,
        message: 'Formato de solicitud no válido'
      });
    }

    // Extraer y validar campos
    const { name, email, message, subject = '' } = body;
    
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Por favor complete todos los campos requeridos.'
      });
    }

    // Validar email
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Por favor ingrese un correo electrónico válido.'
      });
    }

    // Obtener credenciales
    const { GMAIL_USER, GMAIL_PASS, EMAIL_TO } = process.env;
    
    if (!GMAIL_USER || !GMAIL_PASS) {
      console.error('Error: Faltan credenciales de correo');
      return res.status(500).json({
        success: false,
        message: 'Error de configuración del servidor.'
      });
    }

    // Configurar y enviar correo
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: GMAIL_USER, pass: GMAIL_PASS }
    });

    const mailOptions = {
      from: `"${name}" <${GMAIL_USER}>`,
      to: EMAIL_TO || GMAIL_USER,
      subject: `Contacto: ${subject || 'Sin asunto'}`,
      text: `
        Nombre: ${name}
        Email: ${email}
        Asunto: ${subject || 'No especificado'}
        Mensaje: ${message}
      `,
      html: `
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Asunto:</strong> ${subject || 'No especificado'}</p>
        <h3>Mensaje:</h3>
        <p>${(message || '').replace(/\n/g, '<br>')}</p>
      `
    };

    await transporter.sendMail(mailOptions);
    
    res.status(200).json({ 
      success: true, 
      message: '¡Mensaje enviado con éxito!' 
    });

  } catch (error) {
    console.error('Error al enviar el correo:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al enviar el mensaje. Intente nuevamente.'
    });
  }
};
