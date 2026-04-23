const express = require('express');
const router = express.Router();
const auth=require('../middleware/auth');
const { 
    getSkills,
    addSkill,
    updateSkill,
    deleteSkill


} = require('../controllers/skillsController');
router.get('/', getSkills);
router.post('/',auth,addSkill);
router.put('/:id',auth, updateSkill);
router.delete('/:id', auth,deleteSkill);

module.exports = router;

