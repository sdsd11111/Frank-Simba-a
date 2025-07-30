// @ts-check
'use strict';

const nodemailer = require('nodemailer');

/**
 * Manejador de la API de contacto
 * @param {object} req - Objeto de solicitud HTTP
 * @param {object} res - Objeto de respuesta HTTP
 * @returns {Promise<void>}
 */
const handler = async (req, res) => {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');

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
    let body;
    try {
      body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Formato de solicitud no válido'
      });
      return;
    }

    // Validar campos requeridos
    const { name, email, message, subject = '' } = body;
    if (!name || !email || !message) {
      res.status(400).json({
        success: false,
        message: 'Por favor complete todos los campos requeridos.'
      });
      return;
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({
        success: false,
        message: 'Por favor ingrese un correo electrónico válido.'
      });
      return;
    }

    // Obtener credenciales de las variables de entorno
    const { GMAIL_USER, GMAIL_PASS, EMAIL_TO } = process.env;
    
    // Validar variables de entorno
    if (!GMAIL_USER || !GMAIL_PASS) {
      console.error('Error: Faltan variables de entorno GMAIL_USER o GMAIL_PASS');
      res.status(500).json({
        success: false,
        message: 'Error de configuración del servidor.'
      });
      return;
    }

    // Configurar el transporte de correo
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: GMAIL_USER,
        pass: GMAIL_PASS
      }
    });

    // Configurar el correo electrónico
    const mailOptions = {
      from: `"${name}" <${GMAIL_USER}>`,
      to: EMAIL_TO || GMAIL_USER,
      subject: `Nuevo mensaje de contacto: ${subject || 'Sin asunto'}`,
      text: [
        'Nuevo mensaje de contacto',
        `Nombre: ${name}`,
        `Email: ${email}`,
        `Asunto: ${subject || 'No especificado'}`,
        'Mensaje:',
        message
      ].join('\n'),
      html: `
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Asunto:</strong> ${subject || 'No especificado'}</p>
        <h3>Mensaje:</h3>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `
    };

    // Enviar el correo electrónico
    await transporter.sendMail(mailOptions);
    
    // Responder con éxito
    res.status(200).json({ 
      success: true, 
      message: '¡Mensaje enviado con éxito! Pronto nos pondremos en contacto contigo.' 
    });

  } catch (error) {
    console.error('Error al procesar la solicitud:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Hubo un error al procesar tu solicitud. Por favor, inténtalo de nuevo más tarde.' 
    });
  }
};

// Exportar el manejador para Vercel
module.exports = handler;
