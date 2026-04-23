const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getAbout, updateAbout } = 
      require('../controllers/aboutController');

router.get('/', getAbout);
router.put('/', auth, updateAbout);

module.exports = router;
