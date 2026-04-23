const db = require('../config/db');

// GET
exports.getSkills = (req, res) => {
    db.query('SELECT * FROM skills', (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
};

// ADD
exports.addSkill = (req, res) => {
    const { nom, pourcentage, icone } = req.body;
    if (!nom || !pourcentage || !icone) {
        return res.status(400).json({ 
            error: 'Tous les champs sont requis' 
        });
    }
    const sql = 'INSERT INTO skills (nom, pourcentage, icone) VALUES (?, ?, ?)';
    db.query(sql, [nom, pourcentage, icone], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ success: true, id: result.insertId });
    });
};

// UPDATE
exports.updateSkill = (req, res) => {
    const { nom, pourcentage, icone } = req.body;
    const sql = 'UPDATE skills SET nom=?, pourcentage=?, icone=? WHERE id=?';
    db.query(sql, [nom, pourcentage, icone, req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ success: true, message: '✅ Skill mis à jour !' });
    });
};

// DELETE
exports.deleteSkill = (req, res) => {
    db.query('DELETE FROM skills WHERE id=?', [req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ success: true, message: '✅ Skill supprimé !' });
    });
};
