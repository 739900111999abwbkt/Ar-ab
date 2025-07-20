const express = require('express');
const router = express.Router();
const { getAllGifts, sendGift } = require('../controllers/gift.controller');
const auth = require('../middlewares/authMiddleware');

router.get('/', getAllGifts);
router.post('/send', auth, sendGift);

module.exports = router;
