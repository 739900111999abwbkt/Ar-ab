const Gift = require('../models/Gift');

exports.getAllGifts = async (req, res) => {
  try {
    const gifts = await Gift.find();
    res.status(200).json({ success: true, gifts });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to load gifts' });
  }
};

exports.sendGift = async (req, res) => {
  try {
    const { giftId, toUserId } = req.body;
    // ... تنفيذ منطق إرسال الهدية هنا
    res.status(200).json({ success: true, message: 'Gift sent successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error sending gift' });
  }
};
