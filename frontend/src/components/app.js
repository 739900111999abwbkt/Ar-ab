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
