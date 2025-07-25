const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const socketHandler = require('./socket');
const userRoutes = require('./routes/user.routes');
const roomRoutes = require('./routes/room.routes'); // تأكد أن الملف موجود

dotenv.config();

const app = express();
const server = http.createServer(app);

// إعداد Socket.io
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// اختبار للتأكد أن السيرفر شغال
app.get('/', (req, res) => {
  res.send('🚀 API is working!');
});

// المسارات
app.use('/api/users', userRoutes);
app.use('/api/rooms', roomRoutes); // تأكد من وجود هذا المسار

// تفعيل WebSocket
socketHandler(io);

// الاتصال بقاعدة البيانات
const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mydb';
mongoose.connect(mongoURI)
  .then(() => {
    console.log('✅ Connected to MongoDB');

    const PORT = process.env.PORT || 5000;
    server.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });
