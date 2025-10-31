const express = require('express');
const router = express.Router();
const { getMe, updateMe, deleteMe } = require('../controllers/user.controller.js');
const auth = require('../middlewares/auth.midd.js');


router.get('/user', auth, getMe);
router.put('/user', auth, updateMe);
router.delete('/user', auth, deleteMe);


module.exports = router;