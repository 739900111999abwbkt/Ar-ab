// sound.js - لإدارة المؤثرات الصوتية داخل الغرفة

// تعريف جميع المؤثرات الصوتية مع مسارات ملفاتها.
// يفضل تحديد مسارات واضحة مثل '/src/assets/sounds/'
const sounds = {
  join: new Audio("/src/assets/sounds/join.mp3"),
  leave: new Audio("/src/assets/sounds/leave.mp3"),
  micOn: new Audio("/src/assets/sounds/mic-on.mp3"),
  micOff: new Audio("/src/assets/sounds/mic-off.mp3"),
  gift: new Audio("/src/assets/sounds/gift.mp3"),
};

/**
 * يقوم بتشغيل مؤثر صوتي محدد.
 * يضمن بدء تشغيل الصوت من البداية في كل مرة يتم استدعاؤه،
 * ويتضمن معالجة للأخطاء المحتملة أثناء التشغيل.
 *
 * @param {string} type - مفتاح الصوت في كائن 'sounds' (مثال: 'join', 'leave', 'micOn').
 */
export function playSound(type) {
  const sound = sounds[type]; // الحصول على كائن Audio بناءً على النوع المطلوب
  if (sound) { // التحقق مما إذا كان الصوت موجودًا في قائمتنا
    sound.currentTime = 0; // إعادة ضبط وقت الصوت إلى البداية (مهم لتشغيله بسرعة متكررة)
    sound.play().catch((error) => {
      // التقاط أي أخطاء تحدث أثناء التشغيل وتسجيلها في الكونسول
      console.warn(`فشل تشغيل الصوت: ${type}`, error);
    });
  } else {
    // اختياري: تسجيل تحذير إذا تم طلب نوع صوت غير موجود
    console.warn(`نوع الصوت "${type}" غير موجود.`);
  }
}
