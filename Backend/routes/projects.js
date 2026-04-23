const express = require('express');
const router = express.Router();
const auth=require('../middleware/auth');
const { 
    getProjects,
    addProject,
    updateProject,
    deleteProject
 } = require('../controllers/projectsController');


router.get('/', getProjects);
router .post('/',auth, addProject);
router.put('/:id', auth, updateProject);
router.delete('/:id',auth, deleteProject);

module.exports = router;
