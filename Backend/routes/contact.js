const express = require('express');
const router = express.Router();
const auth=require("../middleware/auth");
const { getMessages, sendMessage } = require('../controllers/contactController');
router.get('/',auth, getMessages);
router.post('/', sendMessage);
module.exports = router;

