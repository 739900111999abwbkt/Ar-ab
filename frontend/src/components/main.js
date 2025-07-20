// main.js (مثال على كيفية استخدام playSound)

import { playSound } from './sound.js'; // استيراد دالة playSound من ملف sound.js الخاص بك

// ... بقية كود التهيئة لتطبيقك (الدردشة، الخلفية، إلخ) ...

// مثال على تشغيل صوت عند انضمام مستخدم جديد:
socket.on('userJoined', (userData) => {
    // عرض رسالة في الدردشة بأن المستخدم انضم
    // (بافتراض أن لديك دالة appendMessage التي تدعم رسائل النظام)
    // appendMessage(null, `${userData.name} انضم إلى الغرفة!`, true);

    // تشغيل صوت الانضمام
    playSound('join');
});

// مثال على تشغيل صوت عند تلقي هدية:
socket.on('giftReceived', (giftData) => {
    // displayGiftAnimation(giftData);
    playSound('gift');
});

// مثال على تشغيل صوت عند تفعيل المايك:
const micButton = document.getElementById('mic-toggle-btn');
micButton.addEventListener('click', () => {
    // toggleMicState(); // دالة لتغيير حالة المايك
    // إذا كان المايك قيد التشغيل، شغل صوت تفعيل المايك
    // if (isMicOn) {
    //     playSound('micOn');
    // } else {
    //     playSound('micOff');
    // }
});
