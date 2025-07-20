// move.js - وظائف تحريك عناصر المايك وعناصر أخرى داخل الغرفة

/**
 * تجعل العنصر المحدد قابلاً للسحب والإفلات باستخدام الماوس.
 *
 * @param {HTMLElement} element - العنصر (مثل المايك) الذي تريد جعله قابلاً للسحب.
 */
export function makeDraggable(element) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0; // لمتغيرات تتبع مواضع الماوس والعنصر

  // عند الضغط على زر الماوس على العنصر
  element.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault(); // منع السلوك الافتراضي للمتصفح (مثل تحديد النص)

    // الحصول على الإحداثيات الأولية للماوس عند الضغط
    pos3 = e.clientX;
    pos4 = e.clientY;

    // عند تحريك زر الماوس أو إفلاته، قم بتعيين الدوال المعنية
    document.onmouseup = closeDragElement; // عند الإفلات
    document.onmousemove = elementDrag;   // عند التحريك
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault(); // منع السلوك الافتراضي للمتصفح

    // حساب الفرق في المسافة بين الموقع الحالي والموقع السابق للماوس
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    // تحديث مواضع الماوس الحالية لتكون هي المواضع السابقة في التكرار التالي
    pos3 = e.clientX;
    pos4 = e.clientY;

    // ضبط الموقع الجديد للعنصر بناءً على الفرق في الحركة
    // element.offsetTop و element.offsetLeft يعطيان الموضع الحالي للعنصر
    element.style.top = (element.offsetTop - pos2) + "px";
    element.style.left = (element.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // إزالة معالجات الأحداث عند إفلات زر الماوس لوقف عملية السحب
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

/**
 * تحرك عنصر المايك المحدد إلى منتصف الشاشة بالضبط.
 * يستخدم خصائص CSS لتحقيق ذلك بفعالية (position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);).
 *
 * @param {string} micId - معرّف (ID) عنصر المايك الذي تريد تحريكه إلى المنتصف.
 */
export function moveMicToCenter(micId) {
  const mic = document.getElementById(micId); // الحصول على عنصر المايك
  if (!mic) { // التحقق مما إذا كان العنصر موجودًا
    console.warn(`العنصر بالـ ID "${micId}" غير موجود. لا يمكن تحريكه إلى المنتصف.`);
    return;
  }

  // تطبيق خصائص CSS لوضعه في المنتصف تمامًا
  mic.style.position = "absolute"; // تحديد الموضع المطلق
  mic.style.left = "50%";          // 50% من اليسار
  mic.style.top = "50%";           // 50% من الأعلى
  // تحويل العنصر بنسبة -50% من عرضه وطوله لجعله يتمركز تمامًا
  mic.style.transform = "translate(-50%, -50%)";
}
