(() => {
  const canonical = (value) => value
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u2013\u2014]/g, '-')
    .replace(/\s+/g, ' ')
    .trim();

  const ar = {
    'Home': 'الرئيسية',
    'About': 'من نحن',
    'Properties': 'العقارات',
    'Sell With Us': 'بع عقارك معنا',
    'Contact': 'تواصل معنا',
    "Let's talk": 'لنتحدث',
    'Open menu': 'فتح القائمة',
    'Close menu': 'إغلاق القائمة',
    'Primary navigation': 'التنقل الرئيسي',
    'Language': 'اللغة',
    'Curated homes': 'منازل مختارة بعناية',
    'View': 'عرض',
    'Skip to content': 'انتقل إلى المحتوى',
    'Explore': 'استكشف',
    'Visit': 'زيارتنا',
    'Connect': 'تواصل',
    'Mon-Fri, 9am-6pm': 'الإثنين–الجمعة، 9 ص–6 م',
    'Equal Housing Opportunity': 'فرص سكن متكافئة',
    'Privacy': 'الخصوصية',
    'Terms': 'الشروط',
    "We're online": 'نحن متصلون',
    'Talk with an agent': 'تحدث مع مستشار',
    'Talk with a Havencrest agent': 'تحدث مع مستشار هافنكريست',
    'Havencrest Advisor': 'مستشار هافنكريست',
    'Online · Usually replies in minutes': 'متصل · يرد عادة خلال دقائق',
    'Close agent chat': 'إغلاق المحادثة',
    'Hi, welcome to Havencrest.': 'مرحباً بك في هافنكريست.',
    "Tell us what you're looking for and an advisor will personally follow up.": 'أخبرنا عمّا تبحث عنه وسيتواصل معك أحد مستشارينا شخصياً.',
    "I'm looking to buy": 'أبحث عن عقار للشراء',
    "I'm planning to sell": 'أخطط لبيع عقاري',
    'Book a consultation': 'احجز استشارة',
    'Email for reply': 'البريد الإلكتروني للرد',
    'Write your message...': 'اكتب رسالتك...',
    'Send message': 'إرسال الرسالة',
    'Private & confidential': 'خاص وسري',
    'Call (512) 739-4218': 'اتصل على (512) 739-4218',
    'Back to top': 'العودة إلى الأعلى',
    'Curated homes. Considered living.': 'منازل مختارة بعناية. أسلوب حياة مدروس.',
    'Find a place that': 'اعثر على مكان',
    'feels like yours.': 'يشبهك حقاً.',
    'Thoughtful real estate guidance for remarkable homes across Austin and the Hill Country.': 'استشارات عقارية مدروسة لمنازل استثنائية في أوستن ومنطقة هيل كانتري.',
    'Explore properties': 'استكشف العقارات',
    'Scroll to discover': 'مرّر للاكتشاف',
    'Location': 'الموقع',
    'City or neighborhood': 'المدينة أو الحي',
    'Property type': 'نوع العقار',
    'Any property': 'أي عقار',
    'House': 'منزل',
    'Condo': 'شقة',
    'Land': 'أرض',
    'Price range': 'نطاق السعر',
    'Any price': 'أي سعر',
    'Search homes': 'ابحث عن منازل',
    'The Havencrest difference': 'ما يميز هافنكريست',
    'Real estate, handled': 'عقارات تُدار',
    'with': 'بكل',
    'intention.': 'عناية.',
    'We believe buying or selling a home deserves more than a transaction. It deserves clear advice, local perspective, and a partner who listens closely.': 'نؤمن بأن شراء المنزل أو بيعه يستحق أكثر من مجرد صفقة؛ فهو يستحق نصيحة واضحة وخبرة محلية وشريكاً يصغي باهتمام.',
    'Get to know us': 'تعرّف علينا',
    'Career sales': 'إجمالي المبيعات',
    'Years of expertise': 'سنوات من الخبرة',
    'Referral-based business': 'أعمال عبر التوصيات',
    'Client satisfaction': 'رضا العملاء',
    'Homes are more than square footage.': 'المنازل أكبر من مجرد مساحة.',
    'They hold the shape of your life.': 'إنها تحتضن تفاصيل حياتك.',
    '01 / Perspective': '01 / منظور',
    '02 / Setting': '02 / محيط',
    '03 / Detail': '03 / تفاصيل',
    '04 / Connection': '04 / تواصل',
    'Light that changes how a room feels.': 'ضوء يغيّر الإحساس بالمكان.',
    'Architecture in conversation with its landscape.': 'عمارة تنسجم مع محيطها.',
    'Materials chosen to become better with time.': 'مواد مختارة لتزداد جمالاً مع الزمن.',
    'Spaces that make everyday living feel effortless.': 'مساحات تجعل الحياة اليومية أكثر سلاسة.',
    'Previous gallery image': 'الصورة السابقة',
    'Next gallery image': 'الصورة التالية',
    'Selected residences': 'مساكن مختارة',
    'Properties worth': 'عقارات تستحق',
    'discovering.': 'الاكتشاف.',
    'View all properties': 'عرض جميع العقارات',
    'Exceptional homes': 'منازل استثنائية',
    'Considered living': 'حياة مدروسة',
    'Local expertise': 'خبرة محلية',
    'For sellers': 'للبائعين',
    'Your home deserves': 'منزلك يستحق',
    'a': 'إطلاقاً',
    'considered launch.': 'مدروساً.',
    'From precise positioning and thoughtful styling to global digital exposure, we present your property at its absolute best-and negotiate with your goals at the center.': 'من التسعير الدقيق والتجهيز المدروس إلى الانتشار الرقمي العالمي، نقدّم عقارك بأفضل صورة ونتفاوض واضعين أهدافك في المقام الأول.',
    'Strategic pricing & positioning': 'تسعير وتموضع استراتيجي',
    'Editorial photography & film': 'تصوير وفيلم احترافي',
    'Targeted digital campaigns': 'حملات رقمية مستهدفة',
    'Discover our approach': 'اكتشف منهجنا',
    'Explore the area': 'استكشف المنطقة',
    'Neighborhoods with': 'أحياء تتمتع',
    'a sense of place.': 'بروح المكان.',
    'From walkable urban pockets to quiet Hill Country retreats, discover where your next chapter could unfold.': 'من الأحياء الحضرية الحيوية إلى ملاذات هيل كانتري الهادئة، اكتشف المكان الذي قد يبدأ فيه فصلك القادم.',
    'Downtown Austin': 'وسط مدينة أوستن',
    'Urban energy, effortless access': 'حيوية المدينة وسهولة الوصول',
    'Westlake': 'ويست ليك',
    'Space, views, exceptional schools': 'مساحات وإطلالات ومدارس متميزة',
    'Hill Country': 'هيل كانتري',
    'Open skies, slower rhythms': 'آفاق مفتوحة وإيقاع أكثر هدوءاً',
    'Havencrest made a complex move feel remarkably simple. They understood what we wanted before we could fully articulate it-and found us a home we never wanted to leave.': 'جعلت هافنكريست انتقالاً معقداً يبدو في غاية السهولة. فهموا ما نريده قبل أن نستطيع التعبير عنه بالكامل، ووجدوا لنا منزلاً لم نرغب في مغادرته.',
    "Let's begin": 'لنبدأ',
    'Your next move starts': 'خطوتك القادمة تبدأ',
    'with a': 'بـ',
    'conversation.': 'محادثة.',
    "Tell us what home means to you. We'll take it from there.": 'أخبرنا ماذا يعني لك المنزل، وسنتولى الباقي.',
    'Talk with an advisor': 'تحدث مع مستشار',
    'Havencrest Realty · Austin': 'هافنكريست للعقارات · أوستن',
    'Experience, guided': 'خبرة تقودها',
    'by empathy.': 'العناية.',
    'Our point of view': 'وجهة نظرنا',
    'The best real estate advice starts with': 'أفضل استشارة عقارية تبدأ',
    'listening.': 'بالاستماع.',
    'For nearly two decades, Havencrest has represented remarkable homes and the people who give them meaning.': 'منذ ما يقارب عقدين، تمثل هافنكريست منازل استثنائية والأشخاص الذين يمنحونها معناها.',
    'We pair disciplined market intelligence with a deeply personal approach-giving clients the confidence to make decisions that feel right now and years from now.': 'نجمع بين فهم دقيق للسوق ونهج شخصي عميق، لنمنح عملاءنا الثقة لاتخاذ قرارات مناسبة اليوم ولسنوات قادمة.',
    'Start a conversation': 'ابدأ محادثة',
    'Independent by design': 'مستقلون عن قصد',
    'Small enough to care.': 'قريبون بما يكفي للاهتمام.',
    'Experienced enough to': 'وذوو خبرة كافية',
    'deliver.': 'لتحقيق النتائج.',
    'Our independence lets us focus on what matters: fewer clients, stronger strategy, sharper execution, and a relationship that never feels transactional.': 'يتيح لنا استقلالنا التركيز على ما يهم: عدد أقل من العملاء، واستراتيجية أقوى، وتنفيذ أدق، وعلاقة لا تبدو تجارية أبداً.',
    'Years local': 'عاماً من الخبرة المحلية',
    'Families advised': 'عائلة تمت خدمتها',
    'A portfolio shaped by perspective': 'محفظة صاغتها الرؤية',
    'Places with a': 'أماكن ذات',
    'point of view.': 'رؤية خاصة.',
    'Scroll to explore': 'مرّر للاستكشاف',
    'Residence': 'مسكن',
    'Waterfront': 'واجهة مائية',
    'Estate': 'عقار فاخر',
    'Modern': 'حديث',
    'What guides us': 'ما يوجّهنا',
    'Standards you can': 'معايير يمكنك',
    'feel.': 'أن تلمسها.',
    'Every interaction is shaped by the same principles-clarity, care, discretion, and a commitment to doing the work properly.': 'كل تعامل تحكمه المبادئ نفسها: الوضوح والعناية والخصوصية والالتزام بإنجاز العمل كما ينبغي.',
    'Clarity over pressure': 'الوضوح قبل الضغط',
    'Clear facts, candid perspective, and space to decide with confidence.': 'حقائق واضحة ورؤية صريحة ومساحة لاتخاذ القرار بثقة.',
    'Details matter': 'التفاصيل مهمة',
    'From positioning to paperwork, precision changes the outcome.': 'من التموضع إلى الإجراءات، الدقة تغيّر النتيجة.',
    'Relationships endure': 'علاقات تدوم',
    'Most of our business comes from people we have served before.': 'معظم أعمالنا تأتي من أشخاص سبق أن خدمناهم.',
    'A better real estate experience': 'تجربة عقارية أفضل',
    'Work with people who': 'اعمل مع أشخاص',
    'understand the weight of moving.': 'يفهمون أهمية الانتقال.',
    'Meet your advisors': 'تعرّف على مستشاريك',
    'Your property,': 'عقارك،',
    'exceptionally presented.': 'يُقدَّم بصورة استثنائية.',
    'The Havencrest method': 'منهج هافنكريست',
    'Not simply listed.': 'ليس مجرد إدراج.',
    'Distinctly launched.': 'بل إطلاق متميز.',
    'Exceptional results begin before your property reaches the market.': 'تبدأ النتائج الاستثنائية قبل وصول عقارك إلى السوق.',
    'We combine rigorous pricing intelligence, editorial creative, and highly targeted exposure into one considered campaign-designed around your home and your priorities.': 'نجمع بين تحليل التسعير الدقيق والإبداع التحريري والانتشار المستهدف في حملة مدروسة صُممت حول منزلك وأولوياتك.',
    'Our promise': 'وعدنا',
    'Every detail earns its place.': 'لكل تفصيل غايته.',
    'From first conversation to close': 'من المحادثة الأولى حتى الإتمام',
    'A considered process.': 'عملية مدروسة.',
    'A stronger position.': 'وموقف أقوى.',
    'One senior point of contact. One clear plan. Every phase handled with purpose.': 'جهة اتصال خبيرة واحدة، وخطة واضحة واحدة، وكل مرحلة تُدار بهدف.',
    'Position': 'التموضع',
    'We assess the market, identify your buyer, and establish a pricing strategy built to create momentum.': 'نقيّم السوق ونحدد المشتري المناسب ونضع استراتيجية تسعير تولّد الزخم.',
    'Prepare': 'التجهيز',
    'Styling, repairs, staging, and details are thoughtfully coordinated before a single image is captured.': 'يتم تنسيق التصميم والإصلاحات والتجهيز وكل التفاصيل بعناية قبل التقاط أي صورة.',
    'Present': 'التقديم',
    'Editorial photography, cinematic film, copy, and digital assets give your property a distinct point of view.': 'يمنح التصوير الاحترافي والفيلم السينمائي والمحتوى الرقمي عقارك هوية متميزة.',
    'Perform': 'التنفيذ',
    'Targeted distribution, private outreach, buyer qualification, and disciplined negotiation drive the result.': 'الانتشار المستهدف والتواصل الخاص وتأهيل المشترين والتفاوض المنضبط تقود إلى النتيجة.',
    'Measured by outcomes': 'نتائج قابلة للقياس',
    'Marketing that looks': 'تسويق يبدو',
    'beautiful-and': 'جميلاً ويحقق',
    'works.': 'النتائج.',
    'Average list-to-sale price': 'متوسط نسبة سعر البيع إلى العرض',
    'Average time to contract': 'متوسط المدة حتى التعاقد',
    'More qualified digital views': 'مشاهدات رقمية مؤهلة أكثر',
    'Curious what your home could command?': 'هل تتساءل عن قيمة منزلك؟',
    "Let's build the right": 'لنضع الاستراتيجية',
    'strategy together.': 'المناسبة معاً.',
    'Request a private consultation': 'اطلب استشارة خاصة',
    "Let's make your": 'لنجعل خطوتك',
    'next move matter.': 'القادمة ذات أثر.',
    'Begin a conversation': 'ابدأ محادثة',
    "Tell us where you'd": 'أخبرنا إلى أين',
    'like to': 'تود أن',
    'go next.': 'تتجه تالياً.',
    'Whether you are ready to move or simply exploring what is possible, your message stays private and receives a personal response.': 'سواء كنت مستعداً للانتقال أو تستكشف الخيارات، ستبقى رسالتك خاصة وستتلقى رداً شخصياً.',
    'Call': 'اتصال',
    'Email': 'البريد الإلكتروني',
    'Studio': 'المكتب',
    'Thank you.': 'شكراً لك.',
    'Your inquiry has been received. An advisor will be in touch shortly.': 'تم استلام استفسارك وسيتواصل معك أحد مستشارينا قريباً.',
    'Your name': 'اسمك',
    'Full name': 'الاسم الكامل',
    'Email address': 'البريد الإلكتروني',
    'How can we help?': 'كيف يمكننا مساعدتك؟',
    "I'd like a property valuation": 'أرغب في تقييم عقاري',
    'Private advisory': 'استشارة خاصة',
    'Tell us a little more': 'أخبرنا بالمزيد',
    "Share what you're looking for...": 'شاركنا ما تبحث عنه...',
    'Send private inquiry': 'إرسال استفسار خاص',
    'By appointment': 'بموعد مسبق',
    'Our collection': 'مجموعتنا',
    'Exceptional homes,': 'منازل استثنائية،',
    'thoughtfully selected.': 'مختارة بعناية.',
    'Explore distinctive residences across Austin and the Hill Country.': 'استكشف مساكن مميزة في أوستن ومنطقة هيل كانتري.',
    'properties available': 'عقارات متاحة',
    'All': 'الكل',
    'Houses': 'منازل',
    'Condos': 'شقق',
    'Collection update': 'تحديث المجموعة',
    'No exact matches yet.': 'لا توجد نتائج مطابقة حالياً.',
    'Adjust your search or speak with an advisor for private and pre-market opportunities.': 'عدّل بحثك أو تحدث مع مستشار حول الفرص الخاصة وما قبل الطرح.',
    'New Listing': 'إدراج جديد',
    'For Sale': 'للبيع',
    'Private Listing': 'عرض خاص',
    'Coming Soon': 'قريباً',
    'Beds': 'غرف نوم',
    'Baths': 'حمامات',
    'Spanish Oaks, Austin': 'سبانيش أوكس، أوستن',
    'South Congress, Austin': 'ساوث كونغرس، أوستن',
    'Tarrytown, Austin': 'تاريتاون، أوستن',
    'Westlake Hills, Austin': 'ويست ليك هيلز، أوستن',
    'Barton Hills, Austin': 'بارتون هيلز، أوستن',
    'Dripping Springs, TX': 'دريبينغ سبرينغز، تكساس',
    'Austin, Texas 78703': 'أوستن، تكساس 78703',
    'Instagram': 'إنستغرام',
    'LinkedIn': 'لينكدإن',
    'Residence overview': 'نظرة عامة على المسكن',
    'A home designed for': 'منزل مصمم',
    'life in balance.': 'لحياة متوازنة.',
    'Property details': 'تفاصيل العقار',
    'Schedule a private showing': 'احجز معاينة خاصة',
    'This address': 'هذا العنوان',
    "can't be found.": 'غير موجود.',
    'The page may have moved, but your next home could still be here.': 'ربما انتقلت الصفحة، لكن منزلك القادم قد يكون هنا.',
    'Return home': 'العودة للرئيسية',
    'Your privacy is part of our commitment to discreet, considered service.': 'خصوصيتك جزء من التزامنا بخدمة راقية ومدروسة.',
    'Information we collect': 'المعلومات التي نجمعها',
    'We collect only the details you choose to share through inquiry forms, property requests, and direct communication. This information is used to respond to your request and provide relevant real estate advisory services.': 'نجمع فقط التفاصيل التي تختار مشاركتها عبر نماذج الاستفسار وطلبات العقارات والتواصل المباشر، ونستخدمها للرد على طلبك وتقديم الخدمات العقارية المناسبة.',
    'How information is handled': 'كيفية التعامل مع المعلومات',
    'Personal information is not sold. Access is limited to the Havencrest advisory team and trusted service providers required to deliver the requested service.': 'لا يتم بيع المعلومات الشخصية، ويقتصر الوصول إليها على فريق هافنكريست ومقدمي الخدمات الموثوقين اللازمين لتقديم الخدمة المطلوبة.',
    'These terms govern your use of the Havencrest Realty website.': 'تنظم هذه الشروط استخدامك لموقع هافنكريست للعقارات.',
    'Property information': 'معلومات العقارات',
    'Listings, pricing, availability, dimensions, and related details are subject to change and should be independently verified before making a real estate decision.': 'قد تتغير العروض والأسعار والتوافر والمساحات والتفاصيل ذات الصلة، ويجب التحقق منها بشكل مستقل قبل اتخاذ قرار عقاري.',
    'Website use': 'استخدام الموقع',
    'Website content is provided for general information and does not constitute legal, tax, lending, or investment advice.': 'يُقدم محتوى الموقع للمعلومات العامة ولا يشكل استشارة قانونية أو ضريبية أو تمويلية أو استثمارية.'
  };

  const originalText = new WeakMap();
  const originalAttributes = new WeakMap();
  let activeLanguage = 'en';

  const translateTextNode = (node, language) => {
    if (!originalText.has(node)) originalText.set(node, node.nodeValue);
    const source = originalText.get(node);
    const trimmed = source.trim();
    if (!trimmed) return;
    let translated = language === 'ar' ? ar[canonical(trimmed)] : null;
    if (language === 'ar' && !translated) {
      const fact = canonical(trimmed).match(/^([\d,.]+)\s+(Beds|Baths|sq ft)$/);
      if (fact) {
        const units = { Beds: 'غرف نوم', Baths: 'حمامات', 'sq ft': 'قدم²' };
        translated = `${fact[1]} ${units[fact[2]]}`;
      }
    }
    const next = translated || trimmed;
    node.nodeValue = source.replace(trimmed, next);
  };

  const translateAttributes = (element, language) => {
    const attributes = ['aria-label', 'placeholder', 'title'];
    if (!originalAttributes.has(element)) {
      const values = {};
      attributes.forEach((attribute) => {
        if (element.hasAttribute(attribute)) values[attribute] = element.getAttribute(attribute);
      });
      originalAttributes.set(element, values);
    }
    const originals = originalAttributes.get(element);
    Object.entries(originals).forEach(([attribute, source]) => {
      const translated = language === 'ar' ? ar[canonical(source)] : null;
      element.setAttribute(attribute, translated || source);
    });
  };

  const translateTree = (root, language) => {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) {
      const parent = walker.currentNode.parentElement;
      if (!parent || ['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(parent.tagName) || parent.closest('[data-no-translate]')) continue;
      nodes.push(walker.currentNode);
    }
    nodes.forEach((node) => translateTextNode(node, language));
    root.querySelectorAll('[aria-label], [placeholder], [title]').forEach((element) => translateAttributes(element, language));
  };

  const updateTitle = (language) => {
    const englishTitle = document.documentElement.dataset.englishTitle || document.title;
    document.documentElement.dataset.englishTitle = englishTitle;
    if (language !== 'ar') {
      document.title = englishTitle;
      return;
    }
    const parts = englishTitle.split(/\s+[–-]\s+/);
    const page = ar[canonical(parts[0])] || parts[0];
    document.title = parts.length > 1 ? `${page} – هافنكريست للعقارات` : 'هافنكريست للعقارات';
  };

  const syncLanguageNavigation = (language) => {
    document.querySelectorAll('a[href]').forEach((link) => {
      const source = link.getAttribute('href');
      if (!source || source.startsWith('#') || /^(mailto:|tel:|javascript:)/i.test(source)) return;
      let url;
      try { url = new URL(source, window.location.href); } catch (error) { return; }
      if (url.origin !== window.location.origin) return;
      if (language === 'ar') url.searchParams.set('lang', 'ar');
      else url.searchParams.delete('lang');
      link.setAttribute('href', `${url.pathname}${url.search}${url.hash}`);
    });

    document.querySelectorAll('form').forEach((form) => {
      if ((form.getAttribute('method') || 'get').toLowerCase() !== 'get') return;
      let languageInput = form.querySelector('input[data-language-query]');
      if (language === 'ar' && !languageInput) {
        languageInput = document.createElement('input');
        languageInput.type = 'hidden';
        languageInput.name = 'lang';
        languageInput.value = 'ar';
        languageInput.dataset.languageQuery = '';
        form.appendChild(languageInput);
      } else if (language !== 'ar') {
        languageInput?.remove();
      }
    });
  };

  const applyLanguage = (language) => {
    activeLanguage = language === 'ar' ? 'ar' : 'en';
    document.documentElement.lang = activeLanguage;
    document.documentElement.dir = activeLanguage === 'ar' ? 'rtl' : 'ltr';
    document.body.classList.toggle('language-ar', activeLanguage === 'ar');
    translateTree(document.body, activeLanguage);
    updateTitle(activeLanguage);
    document.querySelectorAll('[data-language]').forEach((button) => {
      const selected = button.dataset.language === activeLanguage;
      button.setAttribute('aria-pressed', String(selected));
      button.classList.toggle('is-active', selected);
    });
    syncLanguageNavigation(activeLanguage);
    const url = new URL(window.location.href);
    if (activeLanguage === 'ar') url.searchParams.set('lang', 'ar');
    else url.searchParams.delete('lang');
    window.history.replaceState({}, '', url);
    window.dispatchEvent(new CustomEvent('havencrest:languagechange', { detail: { language: activeLanguage } }));
  };

  const initialize = () => {
    const requested = new URLSearchParams(window.location.search).get('lang');
    applyLanguage(requested === 'ar' ? 'ar' : 'en');
    document.addEventListener('click', (event) => {
      const button = event.target.closest('[data-language]');
      if (button) applyLanguage(button.dataset.language);
    });
    const observer = new MutationObserver((mutations) => {
      if (activeLanguage !== 'ar') return;
      mutations.forEach((mutation) => mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) translateTextNode(node, activeLanguage);
        else if (node.nodeType === Node.ELEMENT_NODE) translateTree(node, activeLanguage);
      }));
    });
    observer.observe(document.body, { childList: true, subtree: true });
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialize);
  else initialize();
})();
