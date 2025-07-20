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
}); // main.js (أو ملف التطبيق الرئيسي)

import { changeRoomBackground } from './bg.js'; // استيراد الدالة من ملف bg.js

// ... (بقية كود تهيئة تطبيقك) ...

// مثال على استخدام الدالة:
const changeBgBtn = document.getElementById("change-bg-btn"); // افترض أن لديك زر بهذا المعرّف في ملف HTML
const backgroundImages = [
    'https://picsum.photos/seed/bg-new1/1920/1080', // رابط صورة مثال 1
    'https://picsum.photos/seed/bg-new2/1920/1080', // رابط صورة مثال 2
    'https://picsum.photos/seed/bg-new3/1920/1080'  // رابط صورة مثال 3
];
let currentBgIndex = 0; // مؤشر لتتبع الصورة الحالية

// ربط الدالة بحدث النقر على الزر
changeBgBtn.onclick = () => {
    // الانتقال إلى الصورة التالية في القائمة (والعودة للأولى بعد الأخيرة)
    currentBgIndex = (currentBgIndex + 1) % backgroundImages.length;
    // استدعاء الدالة لتغيير الخلفية
    changeRoomBackground(backgroundImages[currentBgIndex]);
};

// تعيين خلفية أولية عند تحميل الصفحة لكي لا تكون فارغة في البداية
changeRoomBackground(backgroundImages[currentBgIndex]);
