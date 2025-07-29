// main.js (أو ملف التطبيق الرئيسي)

import { playMusic, stopMusic, isMusicPlaying } from './music.js'; // استيراد الدوال

// ... (بقية كود تهيئة التطبيق مثل Socket.IO، الدردشة، الخلفية) ...

// مثال على كيفية استخدام وظائف الموسيقى:
const toggleMusicBtn = document.getElementById("toggle-music-btn"); // افترض أن لديك زر بهذا الـ ID في HTML
const musicTrackUrl = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'; // رابط لمسار موسيقي

toggleMusicBtn.onclick = () => {
    if (isMusicPlaying()) {
        stopMusic();
        console.log("تم إيقاف الموسيقى.");
    } else {
        playMusic(musicTrackUrl);
        console.log("تم تشغيل الموسيقى.");
    }
};

// يمكنك أيضًا تشغيل الموسيقى تلقائيًا عند تحميل الصفحة إذا سمح المتصفح (بعد تفاعل المستخدم عادةً)
// playMusic(musicTrackUrl);
// main.js (أو ملف التطبيق الرئيسي)

import { makeDraggable, moveMicToCenter } from './move.js'; // استيراد الدوال

// ... (بقية كود تهيئة التطبيق) ...

// مثال على استخدام makeDraggable:
// افترض أن لديك زر مايك أو عنصر تريد جعله قابلاً للسحب
const myMicElement = document.getElementById('my-mic-button'); // يجب أن يكون هذا الـ ID موجودًا في HTML
if (myMicElement) {
    makeDraggable(myMicElement);
    console.log("تم جعل عنصر المايك قابلاً للسحب.");
}

// مثال على استخدام moveMicToCenter:
// يمكنك استدعاء هذه الدالة لوضع المايك في المنتصف، ربما عند بدء الغرفة أو بعد إعادة ضبط.
// تأكد أن العنصر موجود في HTML.
// moveMicToCenter('my-mic-button'); // استخدم نفس الـ ID الذي جعلته قابلاً للسحب
