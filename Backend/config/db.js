const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: { rejectUnauthorized: false },
    connectTimeout: 30000
});

db.connect((err) => {
    if (err) {
        console.error('❌ Erreur connexion MySQL :', err);
        return;
    }
    console.log('✅ MySQL connecté !');

    // ===== CRÉER TABLES =====
    db.query(`CREATE TABLE IF NOT EXISTS admin (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(100) NOT NULL,
        password VARCHAR(255) NOT NULL
    )`, (err) => {
        if (err) console.error('❌ Table admin:', err.message);
    });

    db.query(`CREATE TABLE IF NOT EXISTS hero (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nom VARCHAR(100),
        titre VARCHAR(100),
        bio TEXT,
        photo VARCHAR(255),
        github VARCHAR(255),
        linkedin VARCHAR(255),
        twitter VARCHAR(255),
        dribbble VARCHAR(255)
    )`, (err) => {
        if (err) console.error('❌ Table hero:', err.message);
    });

    db.query(`CREATE TABLE IF NOT EXISTS about (
        id INT AUTO_INCREMENT PRIMARY KEY,
        bio1 TEXT,
        bio2 TEXT,
        photo1 VARCHAR(255),
        photo2 VARCHAR(255),
        photo3 VARCHAR(255),
        photo4 VARCHAR(255),
        cv VARCHAR(255)
    )`, (err) => {
        if (err) console.error('❌ Table about:', err.message);
    });

    db.query(`CREATE TABLE IF NOT EXISTS skills (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nom VARCHAR(100),
        pourcentage INT,
        icone VARCHAR(100)
    )`, (err) => {
        if (err) console.error('❌ Table skills:', err.message);
    });

    db.query(`CREATE TABLE IF NOT EXISTS projects (
        id INT AUTO_INCREMENT PRIMARY KEY,
        titre VARCHAR(100),
        description TEXT,
        image VARCHAR(255),
        lien VARCHAR(255),
        technologies VARCHAR(255)
    )`, (err) => {
        if (err) console.error('❌ Table projects:', err.message);
    });

    db.query(`CREATE TABLE IF NOT EXISTS messages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nom VARCHAR(100),
        email VARCHAR(100),
        message TEXT,
        date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`, (err) => {
        if (err) console.error('❌ Table messages:', err.message);
        else console.log('✅ Tables créées !');
    });

    // ===== INSÉRER DONNÉES INITIALES =====

    // Hero
    db.query('SELECT * FROM hero LIMIT 1', (err, results) => {
        if (err) return;
        if (results.length === 0) {
            db.query(`INSERT INTO hero VALUES (
                1, 'Fidelys', 'Développeur Full Stack',
                'Je crée des expériences numériques exceptionnelles, rapides, accessibles et visuellement attrayantes. Créons ensemble quelque chose d incroyable.',
                'Images/profil.png',
                NULL, NULL, NULL, NULL
            )`, (err) => {
                if (err) console.error('❌ Insert hero:', err.message);
                else console.log('✅ Données hero insérées !');
            });
        }
    });

    // About
    db.query('SELECT * FROM about LIMIT 1', (err, results) => {
        if (err) return;
        if (results.length === 0) {
            db.query(`INSERT INTO about VALUES (
                1,
                'Je suis un développeur Full Stack passionné avec plus de 5 ans d expérience dans la création d applications web modernes. Je me spécialise dans l écosystème JavaScript, incluant React, Node.js et les frameworks CSS modernes.',
                'Mon objectif principal est de combiner le design et la fonctionnalité afin de livrer des projets de haute qualité qui répondent aux attentes des clients et des utilisateurs.',
                'Images/about1.jpg',
                'Images/about2.jpg',
                'Images/about3.jpg',
                'Images/about4.jpg',
                'CV_Fidelys.pdf'
            )`, (err) => {
                if (err) console.error('❌ Insert about:', err.message);
                else console.log('✅ Données about insérées !');
            });
        }
    });

    // Skills
    db.query('SELECT * FROM skills LIMIT 1', (err, results) => {
        if (err) return;
        if (results.length === 0) {
            db.query(`INSERT INTO skills VALUES
                (1, 'HTML & CSS', 90, 'fab fa-html5'),
                (2, 'JavaScript', 85, 'fab fa-js'),
                (3, 'React', 80, 'fab fa-react'),
                (4, 'Tailwind CSS', 90, 'fab fa-css3-alt')
            `, (err) => {
                if (err) console.error('❌ Insert skills:', err.message);
                else console.log('✅ Données skills insérées !');
            });
        }
    });

    // Projects
    db.query('SELECT * FROM projects LIMIT 1', (err, results) => {
        if (err) return;
        if (results.length === 0) {
            db.query(`INSERT INTO projects VALUES
                (1, 'Plateforme E-commerce',
                'Une plateforme e-commerce complète, développée avec React, Node.js et MongoDB.',
                'Images/projet1.jpg',
                'https://github.com/basir/node-react-ecommerce',
                'React, Node.js, MongoDB'),
                (2, 'Application de gestion des tâches',
                'Une application de productivité pour gérer les tâches avec une fonctionnalité de glisser-déposer.',
                'Images/projet2.jpg',
                'https://kanban-task-management-app.netlify.app/',
                'JavaScript, CSS'),
                (3, 'Site de portfolio',
                'Un site de portfolio responsive, construit selon des principes de design modernes.',
                'Images/projet3.jpg',
                'https://portfolio-website-beta-snowy-73.vercel.app/',
                'HTML, CSS, JS')
            `, (err) => {
                if (err) console.error('❌ Insert projects:', err.message);
                else console.log('✅ Données projects insérées !');
            });
        }
    });
});

module.exports = db;
