(function () {
  var LANGUAGES = [
    ['en', 'English'], ['hi', 'हिन्दी'], ['bn', 'বাংলা'], ['te', 'తెలుగు'], ['mr', 'मराठी'],
    ['ta', 'தமிழ்'], ['gu', 'ગુજરાતી'], ['kn', 'ಕನ್ನಡ'], ['ml', 'മലയാളം'], ['pa', 'ਪੰਜਾਬੀ'],
    ['or', 'ଓଡ଼ିଆ'], ['as', 'অসমীয়া'], ['ur', 'اردو']
  ];
  var COPY = {
    en: { home: 'Home', knowledge: 'Knowledge Base', courses: 'Find Courses', eligibility: 'Check Eligibility', grievance: 'Grievance Redressal', report: 'Report an Issue', language: 'Language', chat: 'Chat with JanSetu AI', chatTitle: 'JanSetu AI', chatHint: 'Ask about schemes, eligibility or DBT delays', placeholder: 'Type your question…', send: 'Send', close: 'Close chat', disclaimer: 'JanSetu is an independent prototype, not an official government portal.' },
    hi: { home: 'होम', knowledge: 'योजना जानकारी', courses: 'कोर्स खोजें', eligibility: 'पात्रता जाँचें', grievance: 'शिकायत निवारण', report: 'समस्या बताएँ', language: 'भाषा', chat: 'जनसेतु AI से बात करें', chatTitle: 'जनसेतु AI', chatHint: 'योजनाओं, पात्रता या DBT देरी के बारे में पूछें', placeholder: 'अपना प्रश्न लिखें…', send: 'भेजें', close: 'चैट बंद करें', disclaimer: 'जनसेतु एक स्वतंत्र प्रोटोटाइप है, आधिकारिक सरकारी पोर्टल नहीं।' },
    bn: { home: 'হোম', knowledge: 'তথ্যভান্ডার', courses: 'কোর্স খুঁজুন', eligibility: 'যোগ্যতা দেখুন', grievance: 'অভিযোগ নিষ্পত্তি', report: 'সমস্যা জানান', language: 'ভাষা', chat: 'JanSetu AI-তে চ্যাট করুন', chatTitle: 'JanSetu AI', chatHint: 'প্রকল্প, যোগ্যতা বা DBT বিলম্ব সম্পর্কে জিজ্ঞাসা করুন', placeholder: 'আপনার প্রশ্ন লিখুন…', send: 'পাঠান', close: 'চ্যাট বন্ধ করুন', disclaimer: 'JanSetu একটি স্বাধীন প্রোটোটাইপ, সরকারি পোর্টাল নয়।' },
    te: { home: 'హోమ్', knowledge: 'సమాచార కేంద్రం', courses: 'కోర్సులు కనుగొనండి', eligibility: 'అర్హత చూడండి', grievance: 'ఫిర్యాదు పరిష్కారం', report: 'సమస్య నివేదించండి', language: 'భాష', chat: 'JanSetu AIతో చాట్ చేయండి', chatTitle: 'JanSetu AI', chatHint: 'పథకాలు, అర్హత లేదా DBT ఆలస్యం గురించి అడగండి', placeholder: 'మీ ప్రశ్నను టైప్ చేయండి…', send: 'పంపండి', close: 'చాట్ మూసివేయండి', disclaimer: 'JanSetu స్వతంత్ర నమూనా మాత్రమే, అధికారిక ప్రభుత్వ పోర్టల్ కాదు.' },
    mr: { home: 'मुख्यपृष्ठ', knowledge: 'माहिती केंद्र', courses: 'कोर्स शोधा', eligibility: 'पात्रता तपासा', grievance: 'तक्रार निवारण', report: 'समस्या नोंदवा', language: 'भाषा', chat: 'JanSetu AI शी बोला', chatTitle: 'JanSetu AI', chatHint: 'योजना, पात्रता किंवा DBT विलंबाबद्दल विचारा', placeholder: 'तुमचा प्रश्न लिहा…', send: 'पाठवा', close: 'चॅट बंद करा', disclaimer: 'JanSetu स्वतंत्र नमुना आहे, अधिकृत सरकारी पोर्टल नाही.' },
    ta: { home: 'முகப்பு', knowledge: 'தகவல் மையம்', courses: 'படிப்புகளைக் கண்டறியவும்', eligibility: 'தகுதியைச் சரிபார்க்கவும்', grievance: 'குறை தீர்ப்பு', report: 'சிக்கலைப் புகாரளிக்கவும்', language: 'மொழி', chat: 'JanSetu AI உடன் உரையாடவும்', chatTitle: 'JanSetu AI', chatHint: 'திட்டங்கள், தகுதி அல்லது DBT தாமதம் பற்றி கேளுங்கள்', placeholder: 'உங்கள் கேள்வியை எழுதுங்கள்…', send: 'அனுப்பு', close: 'அரட்டையை மூடு', disclaimer: 'JanSetu ஒரு சுயாதீன முன்மாதிரி; அதிகாரப்பூர்வ அரசு தளம் அல்ல.' },
    gu: { home: 'હોમ', knowledge: 'માહિતી કેન્દ્ર', courses: 'કોર્સ શોધો', eligibility: 'પાત્રતા તપાસો', grievance: 'ફરિયાદ નિવારણ', report: 'સમસ્યા જણાવો', language: 'ભાષા', chat: 'JanSetu AI સાથે ચેટ કરો', chatTitle: 'JanSetu AI', chatHint: 'યોજનાઓ, પાત્રતા અથવા DBT વિલંબ વિશે પૂછો', placeholder: 'તમારો પ્રશ્ન લખો…', send: 'મોકલો', close: 'ચેટ બંધ કરો', disclaimer: 'JanSetu સ્વતંત્ર પ્રોટોટાઇપ છે, સત્તાવાર સરકારી પોર્ટલ નથી.' },
    kn: { home: 'ಮುಖಪುಟ', knowledge: 'ಮಾಹಿತಿ ಕೇಂದ್ರ', courses: 'ಕೋರ್ಸ್‌ಗಳನ್ನು ಹುಡುಕಿ', eligibility: 'ಅರ್ಹತೆ ಪರಿಶೀಲಿಸಿ', grievance: 'ದೂರು ಪರಿಹಾರ', report: 'ಸಮಸ್ಯೆ ವರದಿ ಮಾಡಿ', language: 'ಭಾಷೆ', chat: 'JanSetu AI ಜೊತೆ ಚಾಟ್ ಮಾಡಿ', chatTitle: 'JanSetu AI', chatHint: 'ಯೋಜನೆ, ಅರ್ಹತೆ ಅಥವಾ DBT ವಿಳಂಬದ ಬಗ್ಗೆ ಕೇಳಿ', placeholder: 'ನಿಮ್ಮ ಪ್ರಶ್ನೆ ಬರೆಯಿರಿ…', send: 'ಕಳುಹಿಸಿ', close: 'ಚಾಟ್ ಮುಚ್ಚಿ', disclaimer: 'JanSetu ಸ್ವತಂತ್ರ ಮಾದರಿ, ಅಧಿಕೃತ ಸರ್ಕಾರಿ ಪೋರ್ಟಲ್ ಅಲ್ಲ.' },
    ml: { home: 'ഹോം', knowledge: 'വിവര കേന്ദ്രം', courses: 'കോഴ്സുകൾ കണ്ടെത്തുക', eligibility: 'യോഗ്യത പരിശോധിക്കുക', grievance: 'പരാതി പരിഹാരം', report: 'പ്രശ്നം അറിയിക്കുക', language: 'ഭാഷ', chat: 'JanSetu AI-യുമായി ചാറ്റ് ചെയ്യുക', chatTitle: 'JanSetu AI', chatHint: 'പദ്ധതികൾ, യോഗ്യത, DBT വൈകൽ എന്നിവയെക്കുറിച്ച് ചോദിക്കുക', placeholder: 'നിങ്ങളുടെ ചോദ്യം എഴുതുക…', send: 'അയയ്ക്കുക', close: 'ചാറ്റ് അടയ്ക്കുക', disclaimer: 'JanSetu ഒരു സ്വതന്ത്ര മാതൃകയാണ്, ഔദ്യോഗിക സർക്കാർ പോർട്ടലല്ല.' },
    pa: { home: 'ਹੋਮ', knowledge: 'ਜਾਣਕਾਰੀ ਕੇਂਦਰ', courses: 'ਕੋਰਸ ਲੱਭੋ', eligibility: 'ਯੋਗਤਾ ਜਾਂਚੋ', grievance: 'ਸ਼ਿਕਾਇਤ ਨਿਵਾਰਨ', report: 'ਸਮੱਸਿਆ ਦੱਸੋ', language: 'ਭਾਸ਼ਾ', chat: 'JanSetu AI ਨਾਲ ਗੱਲ ਕਰੋ', chatTitle: 'JanSetu AI', chatHint: 'ਸਕੀਮਾਂ, ਯੋਗਤਾ ਜਾਂ DBT ਦੇਰੀ ਬਾਰੇ ਪੁੱਛੋ', placeholder: 'ਆਪਣਾ ਸਵਾਲ ਲਿਖੋ…', send: 'ਭੇਜੋ', close: 'ਚੈਟ ਬੰਦ ਕਰੋ', disclaimer: 'JanSetu ਇੱਕ ਸੁਤੰਤਰ ਪ੍ਰੋਟੋਟਾਈਪ ਹੈ, ਸਰਕਾਰੀ ਪੋਰਟਲ ਨਹੀਂ।' },
    or: { home: 'ମୁଖ୍ୟ ପୃଷ୍ଠା', knowledge: 'ତଥ୍ୟ କେନ୍ଦ୍ର', courses: 'ପାଠ୍ୟକ୍ରମ ଖୋଜନ୍ତୁ', eligibility: 'ଯୋଗ୍ୟତା ଯାଞ୍ଚ କରନ୍ତୁ', grievance: 'ଅଭିଯୋଗ ସମାଧାନ', report: 'ସମସ୍ୟା ଜଣାନ୍ତୁ', language: 'ଭାଷା', chat: 'JanSetu AI ସହ ଚାଟ୍ କରନ୍ତୁ', chatTitle: 'JanSetu AI', chatHint: 'ଯୋଜନା, ଯୋଗ୍ୟତା କିମ୍ବା DBT ବିଳମ୍ବ ବିଷୟରେ ପଚାରନ୍ତୁ', placeholder: 'ଆପଣଙ୍କ ପ୍ରଶ୍ନ ଲେଖନ୍ତୁ…', send: 'ପଠାନ୍ତୁ', close: 'ଚାଟ୍ ବନ୍ଦ କରନ୍ତୁ', disclaimer: 'JanSetu ଏକ ସ୍ୱାଧୀନ ପ୍ରୋଟୋଟାଇପ୍, ସରକାରୀ ପୋର୍ଟାଲ ନୁହେଁ।' },
    as: { home: 'হোম', knowledge: 'তথ্য কেন্দ্ৰ', courses: 'কোৰ্ছ বিচাৰক', eligibility: 'যোগ্যতা চাওক', grievance: 'অভিযোগ নিষ্পত্তি', report: 'সমস্যা জনাওক', language: 'ভাষা', chat: 'JanSetu AI-ৰ সৈতে কথা পাতক', chatTitle: 'JanSetu AI', chatHint: 'আঁচনি, যোগ্যতা বা DBT পলমৰ বিষয়ে সোধক', placeholder: 'আপোনাৰ প্ৰশ্ন লিখক…', send: 'পঠাওক', close: 'চেট বন্ধ কৰক', disclaimer: 'JanSetu এটা স্বাধীন নমুনা, চৰকাৰী চৰকাৰী ৱেবছাইট নহয়।' },
    ur: { home: 'ہوم', knowledge: 'معلوماتی مرکز', courses: 'کورس تلاش کریں', eligibility: 'اہلیت جانچیں', grievance: 'شکایت کا ازالہ', report: 'مسئلہ رپورٹ کریں', language: 'زبان', chat: 'JanSetu AI سے بات کریں', chatTitle: 'JanSetu AI', chatHint: 'اسکیم، اہلیت یا DBT تاخیر کے بارے میں پوچھیں', placeholder: 'اپنا سوال لکھیں…', send: 'بھیجیں', close: 'چیٹ بند کریں', disclaimer: 'JanSetu ایک آزاد نمونہ ہے، سرکاری پورٹل نہیں۔' }
  };
  function getLanguage() {
    var saved = localStorage.getItem('jansetu-language');
    var browser = (navigator.language || 'en').split('-')[0];
    return COPY[saved] ? saved : (COPY[browser] ? browser : 'en');
  }
  function t(key) { return (COPY[getLanguage()] || COPY.en)[key] || COPY.en[key] || key; }
  function translateSharedUI() {
    var textToKey = { Home: 'home', 'Knowledge Base': 'knowledge', 'Find Courses': 'courses', 'Check Eligibility': 'eligibility', 'Grievance Redressal': 'grievance', 'Report an Issue': 'report' };
    document.documentElement.lang = getLanguage();
    document.documentElement.dir = getLanguage() === 'ur' ? 'rtl' : 'ltr';
    document.querySelectorAll('a, button').forEach(function (element) {
      var raw = element.textContent.trim();
      if (textToKey[raw] && element.children.length === 0) element.setAttribute('data-i18n-key', textToKey[raw]);
    });
    document.querySelectorAll('[data-i18n-key]').forEach(function (element) { element.textContent = t(element.getAttribute('data-i18n-key')); });
  }
  function translatePageContent() {
    // The authored page copy remains available in English when no translation service is configured.
  }
  function addLanguageSwitcher() {
    if (document.getElementById('language-switcher')) return;
    var theme = document.getElementById('theme-toggle');
    if (!theme) return;
    var label = document.createElement('label');
    label.className = 'language-switcher';
    label.innerHTML = '<span class="sr-only">' + t('language') + '</span><i data-lucide="languages" class="h-4 w-4" aria-hidden="true"></i><select id="language-switcher" aria-label="' + t('language') + '"></select>';
    var select = label.querySelector('select');
    LANGUAGES.forEach(function (language) { var option = document.createElement('option'); option.value = language[0]; option.textContent = language[1]; option.selected = language[0] === getLanguage(); select.appendChild(option); });
    select.addEventListener('change', function () { localStorage.setItem('jansetu-language', select.value); translateSharedUI(); initChatbot(); translatePageContent(); });
    theme.parentNode.insertBefore(label, theme);
  }
  function initChatbot() {
    var existing = document.getElementById('jansetu-chatbot');
    if (existing) { existing.remove(); }
    var wrapper = document.createElement('div');
    wrapper.id = 'jansetu-chatbot';
    wrapper.innerHTML = '<button type="button" class="chatbot-launcher" id="chatbot-launcher" aria-expanded="false" aria-controls="chatbot-panel"><i data-lucide="message-circle" class="h-4 w-4"></i><span>' + t('chat') + '</span></button>' +
      '<section class="chatbot-panel hidden" id="chatbot-panel" aria-label="' + t('chatTitle') + '"><div class="chatbot-heading"><div><h2>' + t('chatTitle') + '</h2><p>' + t('chatHint') + '</p></div><button type="button" id="chatbot-close" aria-label="' + t('close') + '"><i data-lucide="x" class="h-4 w-4"></i></button></div><div class="chatbot-messages" id="chatbot-messages" aria-live="polite"></div><form id="chatbot-form"><label for="chatbot-input" class="sr-only">' + t('chat') + '</label><input id="chatbot-input" maxlength="1200" placeholder="' + t('placeholder') + '" autocomplete="off" required><button type="submit" aria-label="' + t('send') + '"><i data-lucide="send" class="h-4 w-4"></i></button></form><p class="chatbot-disclaimer">' + t('disclaimer') + '</p></section>';
    document.body.appendChild(wrapper);
    var launcher = document.getElementById('chatbot-launcher'); var panel = document.getElementById('chatbot-panel'); var messages = document.getElementById('chatbot-messages'); var input = document.getElementById('chatbot-input'); var history = [];
    function addMessage(message, type) { var item = document.createElement('div'); item.className = 'chatbot-message ' + type; item.textContent = message; messages.appendChild(item); messages.scrollTop = messages.scrollHeight; }
    function localChatReply(question) {
      var text = question.toLowerCase();
      if (/farmer|farming|crop|किसान|फसल/.test(text)) return 'For farming support, explore PM-KISAN, Mukhyamantri Kisan Kalyan Yojana, crop insurance and Kisan Credit Card in the Knowledge Base. Verify current rules on the linked official portal.';
      if (/student|scholarship|college|school|छात्र|स्कॉलरशिप/.test(text)) return 'For education support, check MMVY, Post-Matric Scholarship, Gaon Ki Beti and Central Sector Scholarship. Use the Eligibility Checker with your course, marks and income details.';
      if (/woman|women|girl|maternity|महिला|लड़की/.test(text)) return 'For women and girl-child support, explore Ladli Behna, Sukanya Samriddhi and Matru Vandana. Open the scheme details to verify current eligibility.';
      if (/dbt|delay|payment|rejected|grievance|complaint|शिकायत|भुगतान/.test(text)) return 'For a delayed payment or rejected application, open Grievance Redressal. Include the scheme, issue type, timeline and response received. Never share Aadhaar, OTP, passwords or bank details.';
      if (/course|learn|skill|कोर्स|पढ़/.test(text)) return 'Open Find Courses for NPTEL, SWAYAM, DIKSHA, Skill India and employment-learning resources.';
      return 'I can help you explore welfare schemes, scholarships, farm support, eligibility and grievance steps. Try asking about farmer support, scholarships or a delayed DBT payment.';
    }
    function setOpen(open) { panel.classList.toggle('hidden', !open); launcher.setAttribute('aria-expanded', String(open)); if (open) input.focus(); }
    launcher.addEventListener('click', function () { setOpen(panel.classList.contains('hidden')); });
    document.getElementById('chatbot-close').addEventListener('click', function () { setOpen(false); launcher.focus(); });
    document.getElementById('chatbot-form').addEventListener('submit', function (event) {
      event.preventDefault(); var question = input.value.trim(); if (!question) return; addMessage(question, 'user'); history.push({ role: 'user', content: question }); input.value = ''; input.disabled = true;
      window.setTimeout(function () { addMessage(localChatReply(question), 'bot'); input.disabled = false; input.focus(); }, 180);
    });
    addMessage(t('chatHint'), 'bot'); if (window.lucide) window.lucide.createIcons();
  }
  window.JanSetuI18n = { t: t, language: getLanguage, languages: LANGUAGES };
  function updateThemeButton(button, isDark) {
    button.innerHTML = '<i data-lucide="' + (isDark ? 'sun' : 'moon') + '" class="h-4 w-4"></i><span class="sr-only">' + (isDark ? 'Switch to bright mode' : 'Switch to dark mode') + '</span>';
    button.setAttribute('aria-label', isDark ? 'Switch to bright mode' : 'Switch to dark mode');
    button.setAttribute('title', isDark ? 'Switch to bright mode' : 'Switch to dark mode');
    if (window.lucide) window.lucide.createIcons();
  }

  function init() {
    var savedTheme = localStorage.getItem('jansetu-theme');
    var isDark = savedTheme === 'dark';
    document.body.classList.toggle('dark-mode', isDark);

    document.querySelectorAll('[data-lucide]').forEach(function () {
      if (window.lucide) window.lucide.createIcons();
    });
    addLanguageSwitcher();
    translateSharedUI();
    initChatbot();
    translatePageContent();
    window.setTimeout(translatePageContent, 120);
    var translateTimer;
    var main = document.querySelector('main');
    if (main && window.MutationObserver) new MutationObserver(function () { window.clearTimeout(translateTimer); translateTimer = window.setTimeout(translatePageContent, 180); }).observe(main, { childList: true, subtree: true });

    var themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      updateThemeButton(themeToggle, isDark);
      themeToggle.addEventListener('click', function () {
        isDark = !document.body.classList.contains('dark-mode');
        document.body.classList.toggle('dark-mode', isDark);
        localStorage.setItem('jansetu-theme', isDark ? 'dark' : 'light');
        updateThemeButton(themeToggle, isDark);
      });
    }

    var toggle = document.getElementById('mobile-nav-toggle');
    var menu = document.getElementById('mobile-nav');
    if (toggle && menu) {
      toggle.addEventListener('click', function () {
        var isOpen = !menu.classList.contains('hidden');
        menu.classList.toggle('hidden', isOpen);
        toggle.setAttribute('aria-expanded', String(!isOpen));
      });
    }

    var current = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(function (link) {
      var target = link.getAttribute('href').split('/').pop() || 'index.html';
      if (target === current) link.setAttribute('aria-current', 'page');
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
}());
