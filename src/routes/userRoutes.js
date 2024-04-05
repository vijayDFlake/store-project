const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const roles = require('../roles/roles.json');

router.post('/addUser', authMiddleware.verifyToken, authMiddleware.checkRole([roles.Admin]), userController.addUser);
router.get('/viewAllUser', authMiddleware.verifyToken, authMiddleware.checkRole([roles.Admin, roles.Supervisor]), userController.viewAllUser);
router.put('/editUser/:user_id', authMiddleware.verifyToken, authMiddleware.checkRole([roles.Admin, roles.Supervisor]), userController.editUser);
router.delete('/deleteUser/:user_id', authMiddleware.verifyToken, authMiddleware.checkRole([roles.Admin]), userController.deleteUser);
router.get('/getUser/:user_id', authMiddleware.verifyToken, authMiddleware.checkRole([roles.Admin, roles.Supervisor, roles.Executive]), userController.getUser);

module.exports = router;