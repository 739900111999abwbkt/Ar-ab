const Room = require('../models/Room');
const User = require('../models/User');

exports.createRoom = async (req, res) => {
  try {
    const { name, description, type, password, maxUsers, background, category } = req.body;

    const room = new Room({
      roomID: Date.now().toString(),
      name,
      description,
      type,
      password,
      maxUsers,
      background,
      category,
      host: req.user._id,
      admins: [req.user._id],
    });

    await room.save();
    res.status(201).json({ success: true, room });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error creating room', error: err.message });
  }
};

exports.getRooms = async (req, res) => {
  try {
    const rooms = await Room.find().populate('host admins');
    res.status(200).json({ success: true, rooms });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching rooms', error: err.message });
  }
};
