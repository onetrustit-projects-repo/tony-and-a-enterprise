// Simple Contact Form Handler
// Place in /var/www/monorepo/projects/websites/tonyandaenterprisellc-net/api/contact.js

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

// Configure email transporter (replace with your SMTP settings)
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.example.com',
    port: process.env.SMTP_PORT || 587,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

app.post('/contact', async (req, res) => {
    const { name, email, service, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Name, email, and message are required' });
    }

    try {
        await transporter.sendMail({
            from: '"Website Contact" <noreply@tonyandaenterprisellc.net>',
            to: process.env.CONTACT_EMAIL || 'contact@tonyandaenterprisellc.net',
            subject: `New Contact Form: ${service || 'General Inquiry'}`,
            html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Service:</strong> ${service || 'Not specified'}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `
        });

        res.json({ success: true, message: 'Message sent successfully' });
    } catch (error) {
        console.error('Email error:', error);
        res.status(500).json({ error: 'Failed to send message' });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Contact API running on port ${PORT}`));
