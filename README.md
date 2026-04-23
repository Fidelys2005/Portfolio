# 🎨 Portfolio - BOTOVELO Fidelys

Portfolio personnel fullstack moderne avec panneau d'administration sécurisé.

---

## 🚀 Technologies utilisées

### Frontend
- HTML5, CSS3, JavaScript
- Tailwind CSS
- Font Awesome

### Backend
- Node.js
- Express.js
- JWT (JSON Web Token)
- Bcrypt.js
- MySQL2

---

## 📁 Structure du projet

```
portfolio/
├── frontend/
│   ├── index.html
│   ├── style.css
│   ├── main.js
│   ├── admin-login.html
│   ├── admin-login.js
│   ├── admin-dashboard.html
│   └── admin-dashboard.js
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── heroController.js
│   │   ├── aboutController.js
│   │   ├── skillsController.js
│   │   ├── projectsController.js
│   │   └── contactController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── hero.js
│   │   ├── about.js
│   │   ├── skills.js
│   │   ├── projects.js
│   │   └── contact.js
│   ├── server.js
│   ├── .env
│   └── package.json
└── README.md
```

---

## ⚙️ Installation

### Étape 1 — Cloner le projet
```bash
git clone https://github.com/votre-username/portfolio.git
cd portfolio
```

### Étape 2 — Installer les dépendances
```bash
cd backend
npm install
```

### Étape 3 — Configurer le fichier .env

Créez un fichier `.env` dans le dossier `backend` et ajoutez :

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=votre_mot_de_passe
DB_NAME=portfolio_db8
PORT=3000
JWT_SECRET=votre_secret_jwt
JWT_EXPIRE=24h
```

### Étape 4 — Créer la base de données

Ouvrez **MySQL Workbench** et exécutez :

```sql
CREATE DATABASE portfolio_db8;
USE portfolio_db8;

CREATE TABLE admin (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE hero (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100),
    titre VARCHAR(100),
    bio TEXT,
    photo VARCHAR(255),
    github VARCHAR(255),
    linkedin VARCHAR(255),
    twitter VARCHAR(255),
    dribbble VARCHAR(255)
);

CREATE TABLE about (
    id INT AUTO_INCREMENT PRIMARY KEY,
    bio1 TEXT,
    bio2 TEXT,
    photo1 VARCHAR(255),
    photo2 VARCHAR(255),
    photo3 VARCHAR(255),
    photo4 VARCHAR(255),
    cv VARCHAR(255)
);

CREATE TABLE skills (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100),
    pourcentage INT,
    icone VARCHAR(100)
);

CREATE TABLE projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titre VARCHAR(100),
    description TEXT,
    image VARCHAR(255),
    lien VARCHAR(255),
    technologies VARCHAR(255)
);

CREATE TABLE messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100),
    email VARCHAR(100),
    message TEXT,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Étape 5 — Lancer le serveur
```bash
cd backend
node server.js
```

---

## 🌐 Accès

| Page             | URL                                        |
|------------------|--------------------------------------------|
| Site portfolio   | http://localhost:3000                      |
| Admin login      | http://localhost:3000/admin-login.html     |
| Admin dashboard  | http://localhost:3000/admin-dashboard.html |

---

## 🔐 Authentification Admin

### Créer le compte admin

Utilisez **Thunder Client** ou **Postman** :

```
POST http://localhost:3000/api/auth/register
Content-Type: application/json

{
    "email": "votre@email.com",
    "password": "votre_mot_de_passe"
}
```

### Se connecter

```
POST http://localhost:3000/api/auth/login
Content-Type: application/json

{
    "email": "votre@email.com",
    "password": "votre_mot_de_passe"
}
```

---

## 📡 Routes API

| Méthode | Route              | Accès  | Description          |
|---------|--------------------|--------|----------------------|
| POST    | /api/auth/register | Public | Créer admin          |
| POST    | /api/auth/login    | Public | Connexion admin      |
| GET     | /api/auth/verify   | Admin  | Vérifier token       |
| GET     | /api/hero          | Public | Données accueil      |
| PUT     | /api/hero          | Admin  | Modifier accueil     |
| GET     | /api/about         | Public | Données à propos     |
| PUT     | /api/about         | Admin  | Modifier à propos    |
| GET     | /api/skills        | Public | Liste compétences    |
| POST    | /api/skills        | Admin  | Ajouter compétence   |
| PUT     | /api/skills/:id    | Admin  | Modifier compétence  |
| DELETE  | /api/skills/:id    | Admin  | Supprimer compétence |
| GET     | /api/projects      | Public | Liste projets        |
| POST    | /api/projects      | Admin  | Ajouter projet       |
| PUT     | /api/projects/:id  | Admin  | Modifier projet      |
| DELETE  | /api/projects/:id  | Admin  | Supprimer projet     |
| GET     | /api/contact       | Admin  | Lire messages        |
| POST    | /api/contact       | Public | Envoyer message      |

---

## ✅ Fonctionnalités

### Site Portfolio
- Accueil dynamique
- Section À propos
- Compétences avec barres de progression
- Projets avec liens
- Formulaire de contact
- Design responsive mobile et desktop

### Panneau Admin
- Authentification JWT sécurisée
- Gestion des projets (Ajouter, Modifier, Supprimer)
- Gestion des compétences (Ajouter, Modifier, Supprimer)
- Lecture des messages reçus
- Déconnexion sécurisée

---

## 👤 Auteur

**BOTOVELO Fidelys**
- 📧 botovelofidelys@gmail.com
- 📍 Antsiranana, Madagascar

---

© 2026 BOTOVELO Fidelys. Tous droits réservés.
