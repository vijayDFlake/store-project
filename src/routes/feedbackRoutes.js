const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');
const authMiddleware = require('../middleware/authMiddleware');
const roles = require('../roles/roles.json');

router.post('/feedback', authMiddleware.verifyToken, authMiddleware.checkRole([roles.Customer]), feedbackController.raiseFeedback);
router.post('/monitorFeedback', authMiddleware.verifyToken, authMiddleware.checkRole([roles.Executive]), feedbackController.monitorFeedback);
router.get('/getAllFeedback', authMiddleware.verifyToken, authMiddleware.checkRole([roles.Admin, roles.Supervisor, roles.Executive]), feedbackController.getAllFeedback);

module.exports = router;
