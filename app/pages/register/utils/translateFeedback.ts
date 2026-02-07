export const translateWarning = (warning: string, isArabic: boolean): string => {
  if (!warning || !isArabic) return warning;

  const translations: Record<string, string> = {
    'This is a top-10 common password': 'هذه كلمة مرور شائعة جداً',
    'This is a top-100 common password': 'هذه كلمة مرور شائعة',
    'This is a very common password': 'هذه كلمة مرور شائعة جداً',
    'This is similar to a commonly used password': 'هذه مشابهة لكلمة مرور شائعة',
    'A word by itself is easy to guess': 'كلمة واحدة سهلة التخمين',
    'Names and surnames by themselves are easy to guess': 'الأسماء وحدها سهلة التخمين',
    'Common names and surnames are easy to guess': 'الأسماء الشائعة سهلة التخمين',
    'Straight rows of keys are easy to guess': 'صفوف المفاتيح المتتالية سهلة التخمين',
    'Short keyboard patterns are easy to guess': 'أنماط لوحة المفاتيح القصيرة سهلة التخمين',
    'Repeats like "aaa" are easy to guess': 'التكرار مثل "aaa" سهل التخمين',
    'Repeats like "abcabcabc" are only slightly harder to guess than "abc"': 'التكرار مثل "abcabcabc" أصعب قليلاً من "abc"',
    'Sequences like abc or 6543 are easy to guess': 'التسلسلات مثل abc أو 6543 سهلة التخمين',
    'Recent years are easy to guess': 'السنوات الأخيرة سهلة التخمين',
    'Dates are often easy to guess': 'التواريخ غالباً سهلة التخمين',
  };

  return translations[warning] || warning;
};

export const translateSuggestion = (suggestion: string, isArabic: boolean): string => {
  if (!suggestion || !isArabic) return suggestion;

  const translations: Record<string, string> = {
    'Use a few words, avoid common phrases': 'استخدم عدة كلمات، تجنب العبارات الشائعة',
    'No need for symbols, digits, or uppercase letters': 'لا حاجة للرموز أو الأرقام أو الأحرف الكبيرة',
    'Add another word or two. Uncommon words are better.': 'أضف كلمة أو اثنتين. الكلمات غير الشائعة أفضل.',
    'Use a longer keyboard pattern with more turns': 'استخدم نمط لوحة مفاتيح أطول مع المزيد من التغييرات',
    'Avoid repeated words and characters': 'تجنب الكلمات والأحرف المتكررة',
    'Avoid sequences': 'تجنب التسلسلات',
    'Avoid recent years': 'تجنب السنوات الأخيرة',
    'Avoid years that are associated with you': 'تجنب السنوات المرتبطة بك',
    'Avoid dates and years that are associated with you': 'تجنب التواريخ والسنوات المرتبطة بك',
    'Capitalization doesn\'t help very much': 'الأحرف الكبيرة لا تساعد كثيراً',
    'All-uppercase is almost as easy to guess as all-lowercase': 'كل الأحرف كبيرة سهلة التخمين مثل الصغيرة',
    'Reversed words aren\'t much harder to guess': 'الكلمات المعكوسة ليست أصعب بكثير للتخمين',
    'Predictable substitutions like \'@\' instead of \'a\' don\'t help very much': 'الاستبدالات المتوقعة مثل "@" بدلاً من "a" لا تساعد كثيراً',
  };

  return translations[suggestion] || suggestion;
};
