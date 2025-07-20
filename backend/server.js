const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const socketHandler = require('./socket');
const userRoutes = require('./routes/user.routes');
const roomRoutes = require('./routes/room.routes'); // إذا كنت تستخدم الغرف

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: '*', // يمكنك تحديد نطاق معين
    methods: ['GET', 'POST']
  }
});

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/rooms', roomRoutes); // تأكد من وجود ملف room.routes.js

// Socket
socketHandler(io);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ Connected to MongoDB');
  const PORT = process.env.PORT || 5000;
  server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err);
});
