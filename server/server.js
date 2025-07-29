require('dotenv').config({ path: '../.env.local' });
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

// Configuración del transporter de Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
});

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
        const mailOptions = {
            from: `"${name}" <${process.env.GMAIL_USER}>`,
            to: process.env.GMAIL_TO,
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
