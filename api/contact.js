const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Manejar solicitud OPTIONS (preflight)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Solo permitir método POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const { name, email, subject, message } = req.body;

    // Validar campos requeridos
    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'Por favor complete todos los campos requeridos.' 
      });
    }

    // Configurar el transporter de Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
      }
    });

    // Configurar el correo
    const mailOptions = {
      from: `"${name}" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_TO || 'centrodeportivoloja@hotmail.com',
      subject: `Nuevo mensaje de contacto: ${subject || 'Sin asunto'}`,
      text: `
        Nombre: ${name}
        Email: ${email}
        Asunto: ${subject || 'No especificado'}
        
        Mensaje:
        ${message}
      `,
      html: `
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Asunto:</strong> ${subject || 'No especificado'}</p>
        <h3>Mensaje:</h3>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `
    };

    // Enviar el correo
    await transporter.sendMail(mailOptions);
    
    return res.status(200).json({ 
      success: true, 
      message: '¡Mensaje enviado con éxito! Pronto nos pondremos en contacto contigo.' 
    });

  } catch (error) {
    console.error('Error al enviar el correo:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo más tarde.' 
    });
  }
};
