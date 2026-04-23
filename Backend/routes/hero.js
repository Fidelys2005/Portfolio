const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getHero, updateHero } = 
      require('../controllers/heroController');

router.get('/', getHero);
router.put('/', auth, updateHero);

module.exports = router;
