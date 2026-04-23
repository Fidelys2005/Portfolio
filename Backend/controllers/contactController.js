const db = require('../config/db');
exports.getMessages=(_,res)=>{
    db.query('SELECT * FROM messages ORDER BY DATE DESC',
    (err,results)=>{
        if(err) return res.status(500).json({error:err.message});
        res.json(results);
    });
};
exports.sendMessage = (req, res) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Tous les champs sont requis' });
    }
    const sql = 'INSERT INTO messages (nom, email, message) VALUES (?, ?, ?)';
    db.query(sql, [name, email, message], (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ success: true, message: '✅ Message envoyé !' });
    });
};
