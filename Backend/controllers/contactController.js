const db = require('../config/db');
const nodemailer = require('nodemailer');
require('dotenv').config();

// ===== CONFIGURATION EMAIL =====
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// ===== GET MESSAGES (Admin) =====
exports.getMessages = (_, res) => {
    db.query(
        'SELECT * FROM messages ORDER BY date DESC',
        (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(results);
        }
    );
};

// ===== SEND MESSAGE =====
exports.sendMessage = (req, res) => {
    const { name, email, message } = req.body;

    // Validation
    if (!name || !email || !message) {
        return res.status(400).json({ 
            error: '⚠️ Tous les champs sont requis' 
        });
    }

    // 1. Sauvegarder dans BD
    const sql = 'INSERT INTO messages (nom, email, message) VALUES (?, ?, ?)';
    db.query(sql, [name, email, message], (err) => {
        if (err) {
            return res.status(500).json({ 
                error: '❌ Erreur sauvegarde message' 
            });
        }

        // 2. Envoyer email notification
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: `📩 Nouveau message de ${name}`,
            html: `
                <div style="font-family: Arial, sans-serif; 
                            max-width: 600px; 
                            margin: 0 auto;
                            padding: 20px;
                            background-color: #f9f9f9;
                            border-radius: 10px;">
                    
                    <h2 style="color: #0ea5e9; 
                               text-align: center;">
                        📩 Nouveau message reçu !
                    </h2>
                    
                    <div style="background-color: #ffffff;
                                padding: 20px;
                                border-radius: 8px;
                                border-left: 4px solid #0ea5e9;">
                        
                        <p style="margin: 10px 0;">
                            <strong>👤 Nom :</strong> ${name}
                        </p>
                        
                        <p style="margin: 10px 0;">
                            <strong>📧 Email :</strong> 
                            <a href="mailto:${email}">${email}</a>
                        </p>
                        
                        <p style="margin: 10px 0;">
                            <strong>💬 Message :</strong>
                        </p>
                        
                        <p style="background-color: #f0f9ff;
                                  padding: 15px;
                                  border-radius: 5px;
                                  color: #333;">
                            ${message}
                        </p>
                        
                    </div>
                    
                    <div style="text-align: center; 
                                margin-top: 20px;
                                color: #666;
                                font-size: 12px;">
                        <p>Message reçu via votre Portfolio</p>
                        <p>© 2026 BOTOVELO Fidelys</p>
                    </div>
                    
                </div>
            `
        };

        transporter.sendMail(mailOptions, (err) => {
            if (err) {
                console.error('❌ Erreur envoi email:', err);
                // ✅ Message sauvegardé même si email échoue
                return res.json({ 
                    success: true, 
                    message: '✅ Message envoyé ! (email notification failed)' 
                });
            }
            
            console.log('✅ Email notification envoyé !');
            res.json({ 
                success: true, 
                message: '✅ Message envoyé avec succès !' 
            });
        });
    });
}