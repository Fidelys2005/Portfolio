const db = require('../config/db');

exports.getHero = (req, res) => {
    db.query('SELECT * FROM hero LIMIT 1', (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json(result[0]);
    });
};

exports.updateHero = (req, res) => {
    const { 
        nom, titre, bio, photo,
        github, linkedin, twitter, dribbble 
    } = req.body;

    const sql = `UPDATE hero SET 
                nom=?, titre=?, bio=?, photo=?,
                github=?, linkedin=?, twitter=?, dribbble=?
                WHERE id=1`;

    db.query(sql, [
        nom, titre, bio, photo,
        github, linkedin, twitter, dribbble
    ], (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ success: true, message: '✅ Hero mis à jour !' });
    });
};
