const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors({
    origin:'*',
    methods:['GET', 'POST','PUT','DELETE']
}));
app.use(express.json());
app.use(express.static('../frontend'));
app.use(express.urlencoded({extended:true}));

// Routes
app.use('/api/hero',  require('./routes/hero'));
app.use('/api/about', require('./routes/about'));
app.use('/api/skills', require('./routes/skills'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/auth', require('./routes/auth'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
});
