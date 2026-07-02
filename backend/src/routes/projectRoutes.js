import express from 'express';
import ctrl from '../controllers/projectController.js';
import protect from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/projects', ctrl.apiGetProjects);
router.get('/projects/:id', ctrl.apiGetProjectById);
router.get('/clients', ctrl.apiClients);
router.get('/clients/:clientId/projects', ctrl.apiProjectsByClient);

router.post('/projects', protect, ctrl.apiAdd);
router.put('/projects/:id', protect, ctrl.apiEdit);
router.delete('/projects/:id', protect, ctrl.apiRemove);
router.post('/clients', protect, ctrl.apiAddClient);
router.delete('/clients/:clientId', protect, ctrl.apiRemoveClient);

export default router;