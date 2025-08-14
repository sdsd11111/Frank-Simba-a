require('dotenv').config({ path: '../.env' });
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración detallada de CORS
const corsOptions = {
    origin: '*', // En producción, reemplazar con el dominio específico
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200 // Algunos clientes (ej: navegadores antiguos) requieren esto
};

// Middleware
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Habilitar preflight para todas las rutas
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware para logging de peticiones
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Servir archivos estáticos desde la carpeta raíz
app.use(express.static(path.join(__dirname, '..')));

// Configuración del transporte SMTP
const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true para 465, false para otros puertos
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
});

// Verificar la conexión del transporte
transporter.verify(function(error, success) {
    if (error) {
        console.error('Error al verificar el transporte SMTP:', error);
    } else {
        console.log('Servidor listo para enviar correos');
    }
});

// Función para enviar correo
const sendEmail = async (emailOptions) => {
    try {
        const mailOptions = {
            from: `"${emailOptions.name}" <${process.env.GMAIL_USER}>`,
            to: process.env.GMAIL_TO,
            subject: emailOptions.subject,
            text: emailOptions.text,
            html: emailOptions.html
        };

        return await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error al enviar el correo:', error);
        throw error;
    }
};

// Ruta para manejar el envío del formulario
app.post('/api/contact', cors(corsOptions), async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ 
                success: false, 
                message: 'Por favor complete todos los campos requeridos.' 
            });
        }

        // Configuración del correo
        const emailContent = {
            name: name,
            subject: `Nuevo mensaje de contacto: ${subject || 'Sin asunto'}`,
            text: `
                Nombre: ${name}
                Email: ${email}
                Asunto: ${subject || 'No especificado'}
                
                Mensaje:
                ${message}
            `,
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #1a5276;">Nuevo mensaje de contacto</h2>
                    <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; border-left: 4px solid #3498db;">
                        <p><strong style="color: #2c3e50;">Nombre:</strong> ${name}</p>
                        <p><strong style="color: #2c3e50;">Email:</strong> <a href="mailto:${email}" style="color: #2980b9; text-decoration: none;">${email}</a></p>
                        <p><strong style="color: #2c3e50;">Asunto:</strong> ${subject || 'No especificado'}</p>
                        <h3 style="color: #1a5276; margin-top: 20px; border-bottom: 1px solid #eee; padding-bottom: 5px;">Mensaje:</h3>
                        <p style="white-space: pre-line; background-color: white; padding: 15px; border-radius: 4px; border: 1px solid #eee;">${message}</p>
                    </div>
                    <p style="margin-top: 20px; font-size: 0.9em; color: #7f8c8d;">
                        Este mensaje fue enviado desde el formulario de contacto de franksimbana.com
                    </p>
                </div>
            `
        };

        // Enviar el correo usando la API de Gmail
        await sendEmail(emailContent);
        
        res.status(200).json({ 
            success: true, 
            message: '¡Mensaje enviado con éxito! Pronto nos pondremos en contacto contigo.' 
        });

    } catch (error) {
        console.error('Error al enviar el correo:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo más tarde.' 
        });
    }
});

// Ruta de verificación de salud
app.get('/api/health', cors(corsOptions), (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.status(200).json({ status: 'ok', message: 'Servidor funcionando correctamente' });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
