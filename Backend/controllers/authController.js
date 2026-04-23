const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// ===== REGISTER =====
exports.register = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ 
            error: '⚠️ Email et mot de passe requis' 
        });
    }

    try {
        db.query('SELECT * FROM admin WHERE email = ?', 
        [email], async (err, results) => {
            if (err) return res.status(500).json({ error: err });

            if (results.length > 0) {
                return res.status(400).json({ 
                    error: '⚠️ Cet email existe déjà' 
                });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const sql = 'INSERT INTO admin (email, password) VALUES (?, ?)';

            db.query(sql, [email, hashedPassword], (err) => {
                if (err) return res.status(500).json({ error: err });
                res.json({ 
                    success: true, 
                    message: '✅ Admin créé avec succès !' 
                });
            });
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ===== LOGIN =====
exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ 
            error: '⚠️ Email et mot de passe requis' 
        });
    }

    try {
        db.query('SELECT * FROM admin WHERE email = ?', 
        [email], async (err, results) => {
            if (err) return res.status(500).json({ error: err });

            if (results.length === 0) {
                return res.status(401).json({ 
                    error: '❌ Email ou mot de passe incorrect' 
                });
            }

            const admin = results[0];
            const isMatch = await bcrypt.compare(
                password, admin.password
            );

            if (!isMatch) {
                return res.status(401).json({ 
                    error: '❌ Email ou mot de passe incorrect' 
                });
            }

            const token = jwt.sign(
                { id: admin.id, email: admin.email },
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_EXPIRE }
            );

            res.json({ 
                success: true,
                token,
                message: '✅ Connexion réussie !'
            });
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ===== VERIFY =====
exports.verifyToken = (req, res) => {
    res.json({ 
        success: true, 
        admin: req.admin,
        message: '✅ Token valide !'
    });
};
