let activeUsers = {};

const socketHandler = (io) => {
  io.on('connection', (socket) => {
    console.log('🔌 User connected:', socket.id);

    // عند انضمام مستخدم إلى غرفة
    socket.on('joinRoom', ({ roomId, userId }) => {
      socket.join(roomId);
      activeUsers[socket.id] = { userId, roomId };
      io.to(roomId).emit('userJoined', { userId });
    });

    // إرسال رسالة في الدردشة
    socket.on('sendMessage', ({ roomId, message, sender }) => {
      io.to(roomId).emit('newMessage', { message, sender });
    });

    // صعود مايك
    socket.on('requestMic', ({ roomId, userId }) => {
      io.to(roomId).emit('micRequested', { userId });
    });

    // كتم المايك
    socket.on('muteAll', ({ roomId }) => {
      io.to(roomId).emit('muteEveryone');
    });

    // طرد مستخدم
    socket.on('kickUser', ({ roomId, userId }) => {
      io.to(roomId).emit('userKicked', { userId });
    });

    // عند فصل الاتصال
    socket.on('disconnect', () => {
      const user = activeUsers[socket.id];
      if (user) {
        io.to(user.roomId).emit('userLeft', { userId: user.userId });
        delete activeUsers[socket.id];
      }
      console.log('❌ User disconnected:', socket.id);
    });
  });
};

module.exports = socketHandler;
