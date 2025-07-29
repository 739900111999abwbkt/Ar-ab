// socket.js - إعداد الاتصال بـ Socket.IO
import { io } from "https://cdn.socket.io/4.7.2/socket.io.esm.min.js";

const socket = io("https://your-backend-domain.com", {
  transports: ["websocket"],
  withCredentials: true,
});

export default socket;
