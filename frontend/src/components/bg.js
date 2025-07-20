// bg.js - دالة لتغيير صورة خلفية الغرفة

/**
 * تُغيّر صورة الخلفية للعنصر الذي يحمل المعرّف "room-container".
 * تضمن أن الصورة تُغطي المساحة بأكملها وتتمركز بشكل صحيح.
 *
 * @param {string} imageUrl - رابط (URL) الصورة المراد تعيينها كخلفية.
 */
export function changeRoomBackground(imageUrl) {
  // الحصول على عنصر حاوية الغرفة باستخدام المعرّف الخاص به
  const roomContainer = document.getElementById("room-container"); 
  
  if (roomContainer) { // التحقق مما إذا كان العنصر موجودًا لتجنب الأخطاء
    // تعيين الصورة كخلفية للعنصر
    roomContainer.style.backgroundImage = `url('${imageUrl}')`;
    // التأكد من أن الصورة تُغطي المساحة بأكملها (حتى لو كانت أبعادها مختلفة)
    roomContainer.style.backgroundSize = "cover"; 
    // توسيط الصورة داخل العنصر لتبدو في أفضل شكل
    roomContainer.style.backgroundPosition = "center";
  } else {
    // اختياري: تسجيل تحذير في الكونسول إذا لم يتم العثور على العنصر،
    // وهذا يساعد في تصحيح الأخطاء.
    console.warn("لم يتم العثور على العنصر ذي المعرّف 'room-container'. لا يمكن تعيين الخلفية.");
  }
}
