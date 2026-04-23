const db = require('../config/db');

// GET
exports.getProjects = (req, res) => {
    db.query('SELECT * FROM projects', (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
};

// ADD
exports.addProject = (req, res) => {
    const { titre, description, image, lien, technologies } = req.body;
    if (!titre || !description) {
        return res.status(400).json({ 
            error: 'Titre et description requis' 
        });
    }
    const sql = `INSERT INTO projects 
                (titre, description, image, lien, technologies) 
                VALUES (?, ?, ?, ?, ?)`;
    db.query(sql, [titre, description, image, lien, technologies], 
    (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ success: true, id: result.insertId });
    });
};

// UPDATE
exports.updateProject = (req, res) => {
    const { titre, description, image, lien, technologies } = req.body;
    const sql = `UPDATE projects SET 
                titre=?, description=?, image=?, 
                lien=?, technologies=? 
                WHERE id=?`;
    db.query(sql, 
    [titre, description, image, lien, technologies, req.params.id],
    (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ success: true, message: '✅ Projet mis à jour !' });
    });
};

// DELETE
exports.deleteProject = (req, res) => {
    db.query('DELETE FROM projects WHERE id=?', 
    [req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ success: true, message: '✅ Projet supprimé !' });
    });
};
