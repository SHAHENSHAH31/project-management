const router = require('express').Router();
const auth = require('../middleware/auth');

const { getProjects, createProject, updateProject, deleteProject } = require('../controllers/projectController');


router.use(auth);
router.get('/', getProjects);
router.post('/', createProject);
router.patch('/:id', updateProject);
router.delete('/:id', deleteProject);

module.exports = router;