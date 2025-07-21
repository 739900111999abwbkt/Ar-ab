// main.js - ملف التطبيق الرئيسي لتهيئة وإدارة جميع وظائف الغرفة

// =========================================================
// 1. استيراد الدوال من الملفات الأخرى (الوحدات)
// =========================================================
import { playSound } from './sound.js';              // لوظائف تشغيل المؤثرات الصوتية
import { changeRoomBackground } from './bg.js';        // لوظائف تغيير خلفية الغرفة
import { playMusic, stopMusic, isMusicPlaying } from './music.js'; // لوظائف مشغل الموسيقى
import { makeDraggable, moveMicToCenter } from './move.js'; // لوظائف تحريك العناصر
// ملاحظة: ستحتاج أيضًا لاستيراد دوال الدردشة إذا كانت في ملف chat.js منفصل
// import { setupChat, appendMessage } from './chat.js';


// =========================================================
// 2. تهيئة الاتصال بـ Socket.IO وبيانات المستخدم
// =========================================================
// هذا السطر يتصل بخادم Socket.IO الذي قمت بإعداده.
const socket = io();

// بيانات المستخدم الحالية (مثال: في تطبيق حقيقي قد تأتي من تسجيل الدخول/الجلسة)
const currentUser = {
    id: 'user_' + Math.random().toString(36).substr(2, 9), // معرف فريد مؤقت
    name: 'زائر_' + Math.floor(Math.random() * 100),       // اسم مستخدم مؤقت
};

console.log(`مرحبًا بك يا ${currentUser.name} في الغرفة الافتراضية!`);


// =========================================================
// 3. تعريف عناصر DOM الرئيسية التي سنتفاعل معها
// =========================================================
// عناصر الدردشة (إذا لم تكن معرفة في chat.js وتم التعامل معها هناك مباشرة)
// const chatBox = document.getElementById("chat-box");
// const chatInput = document.getElementById("chat-input");
// const sendBtn = document.getElementById("send-btn");

// زر تغيير الخلفية
const changeBgBtn = document.getElementById("change-bg-btn");

// زر تشغيل/إيقاف الموسيقى
const toggleMusicBtn = document.getElementById("toggle-music-btn");

// عنصر المايك الذي يمكن تحريكه (أو أي عنصر آخر تريد جعله قابلاً للسحب)
const myMicElement = document.getElementById('my-mic-button');


// =========================================================
// 4. تهيئة وظائف التطبيق والتعامل مع الأحداث
// =========================================================

// --- أ. تهيئة وظائف الدردشة (مثال - ستحتاج لفك التعليق وتعديلها حسب هيكل chat.js الخاص بك) ---
/*
// إذا كانت دالة setupChat تستدعي chatBox, chatInput, sendBtn داخليا، فلا حاجة لتعريفها هنا
// setupChat(socket, currentUser);

// الاستماع لرسائل الدردشة الواردة
socket.on('receiveMessage', (data) => {
    // استخدم appendMessage من chat.js لعرض الرسائل
    appendMessage(data.name, data.message);
});

// مثال على تشغيل صوت عند انضمام مستخدم جديد (من الخادم):
socket.on('userJoined', (userData) => {
    // يمكنك عرض رسالة نظام في الدردشة
    // appendMessage(null, `${userData.name} انضم إلى الغرفة!`, true);
    playSound('join'); // تشغيل صوت الانضمام
});

// مثال على تشغيل صوت عند تلقي هدية (من الخادم):
socket.on('giftReceived', (giftData) => {
    // displayGiftAnimation(giftData); // دالة عرض تحريك الهدية (إذا كانت موجودة)
    playSound('gift'); // تشغيل صوت الهدية
});
*/


// --- ب. تهيئة وظائف تغيير الخلفية ---
const backgroundImages = [
    'https://picsum.photos/seed/bg-new1/1920/1080', // رابط صورة مثال 1
    'https://picsum.photos/seed/bg-new2/1920/1080', // رابط صورة مثال 2
    'https://picsum.photos/seed/bg-new3/1920/1080'  // رابط صورة مثال 3
];
let currentBgIndex = 0; // مؤشر لتتبع الصورة الحالية

if (changeBgBtn) {
    changeBgBtn.onclick = () => {
        currentBgIndex = (currentBgIndex + 1) % backgroundImages.length;
        changeRoomBackground(backgroundImages[currentBgIndex]);
        console.log(`تم تغيير الخلفية إلى: ${backgroundImages[currentBgIndex]}`);
    };
    // تعيين خلفية أولية عند تحميل الصفحة
    changeRoomBackground(backgroundImages[currentBgIndex]);
} else {
    console.warn("زر تغيير الخلفية ('change-bg-btn') غير موجود في HTML.");
}


// --- ج. تهيئة وظائف مشغل الموسيقى ---
const musicTrackUrl = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'; // رابط لمسار موسيقي

if (toggleMusicBtn) {
    toggleMusicBtn.onclick = () => {
        if (isMusicPlaying()) {
            stopMusic();
            console.log("تم إيقاف الموسيقى.");
        } else {
            playMusic(musicTrackUrl);
            console.log("تم تشغيل الموسيقى.");
        }
    };
} else {
    console.warn("زر تشغيل/إيقاف الموسيقى ('toggle-music-btn') غير موجود في HTML.");
}


// --- د. تهيئة وظائف تحريك العناصر (المايك) ---
if (myMicElement) {
    makeDraggable(myMicElement); // جعل عنصر المايك قابلاً للسحب
    console.log("تم جعل عنصر المايك قابلاً للسحب.");

    // مثال: زر لتحريك المايك إلى المنتصف (إذا كان لديك زر مخصص لذلك)
    // const centerMicBtn = document.getElementById('center-mic-btn');
    // if (centerMicBtn) {
    //     centerMicBtn.onclick = () => {
    //         moveMicToCenter('my-mic-button');
    //         console.log("تم تحريك المايك إلى المنتصف.");
    //     };
    // }

    // مثال على تشغيل صوت عند تفعيل/إلغاء تفعيل المايك (إذا كانت هناك وظيفة toggleMicState)
    /*
    micButton.addEventListener('click', () => {
        // toggleMicState(); // دالة لتغيير حالة المايك (افترض أنها موجودة)
        // إذا كان المايك قيد التشغيل، شغل صوت تفعيل المايك
        if (isMicOn) { // isMicOn متغير يفترض أنه يعكس حالة المايك
            playSound('micOn');
        } else {
            playSound('micOff');
        }
    });
    */
} else {
    console.warn("عنصر المايك ('my-mic-button') غير موجود في HTML.");
}
