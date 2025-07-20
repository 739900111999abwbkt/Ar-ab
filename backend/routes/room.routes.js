const express = require('express');
const router = express.Router();
const { createRoom, getRooms } = require('../controllers/room.controller');
const auth = require('../middlewares/authMiddleware');

router.post('/create', auth, createRoom);
router.get('/all', getRooms);

module.exports = router;
