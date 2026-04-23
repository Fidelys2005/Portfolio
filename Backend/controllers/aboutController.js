const db = require('../config/db');

exports.getAbout = (req, res) => {
    db.query('SELECT * FROM about LIMIT 1', (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json(result[0]);
    });
};

exports.updateAbout = (req, res) => {
    const { 
        bio1, bio2,
        photo1, photo2, photo3, photo4,
        cv 
    } = req.body;

    const sql = `UPDATE about SET 
                bio1=?, bio2=?,
                photo1=?, photo2=?, photo3=?, photo4=?,
                cv=?
                WHERE id=1`;

    db.query(sql, [
        bio1, bio2,
        photo1, photo2, photo3, photo4,
        cv
    ], (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ success: true, message: '✅ About mis à jour !' });
    });
};
