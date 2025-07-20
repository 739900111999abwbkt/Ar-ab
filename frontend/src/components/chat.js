// chat.js - مكون الدردشة داخل الغرفة (نسخة محسنة)

// الحصول على عناصر DOM التي يتعامل معها مكون الدردشة
const chatBox = document.getElementById("chat-box");
const chatInput = document.getElementById("chat-input");
const sendBtn = document.getElementById("send-btn");

/**
 * وظيفة لإضافة رسالة جديدة إلى صندوق الدردشة.
 * تدعم رسائل المستخدم العادية ورسائل النظام.
 *
 * @param {string} username - اسم مرسل الرسالة (يُستخدم لرسائل المستخدم العادية).
 * @param {string} message - نص الرسالة.
 * @param {boolean} [isSystem=false] - تحديد ما إذا كانت الرسالة رسالة نظام (true) أم رسالة مستخدم (false).
 */
export function appendMessage(username, message, isSystem = false) {
  const msg = document.createElement("div"); // إنشاء عنصر div جديد للرسالة
  msg.classList.add("chat-message"); // إضافة فئة CSS الأساسية

  if (isSystem) {
    // إذا كانت رسالة نظام، أضف فئة 'system-message' وعرض النص فقط
    msg.classList.add("system-message");
    msg.textContent = message;
  } else {
    // إذا كانت رسالة مستخدم، اعرض اسم المستخدم والرسالة
    msg.innerHTML = `<strong>${username}:</strong> ${message}`;
  }

  chatBox.appendChild(msg); // إضافة الرسالة إلى صندوق الدردشة
  // التمرير التلقائي لأسفل صندوق الدردشة لعرض أحدث الرسائل
  chatBox.scrollTop = chatBox.scrollHeight;
}

/**
 * تهيئة وظائف الدردشة.
 *
 * @param {SocketIO.Socket} socket - كائن Socket.IO للاتصال بالخادم.
 * @param {object} user - كائن يحتوي على معلومات المستخدم (مثل id و name).
 */
export function setupChat(socket, user) {
  // عند النقر على زر الإرسال
  sendBtn.onclick = () => {
    const message = chatInput.value.trim(); // الحصول على الرسالة وإزالة المسافات الزائدة
    if (!message) return; // إذا كانت الرسالة فارغة، لا تفعل شيئًا

    // إرسال الرسالة إلى الخادم عبر Socket.IO
    socket.emit("sendMessage", {
      userId: user.id,
      name: user.name,
      message,
    });

    chatInput.value = ""; // مسح حقل الإدخال بعد الإرسال
  };

  // عند استقبال رسالة من الخادم
  socket.on("receiveMessage", (data) => {
    // استخدام وظيفة appendMessage المحسّنة
    appendMessage(data.name, data.message);
  });
}
