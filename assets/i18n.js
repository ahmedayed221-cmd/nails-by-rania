/* Translation dictionaries for the site's static chrome (nav, hero, about,
   contact, lightbox labels, aria labels). Project content (titles,
   descriptions, categories) is translated inline in the PROJECTS array in
   index.html instead, since it's project data, not UI chrome — this file is
   the UI vocabulary shared across every project.

   Loaded as a plain global script (not a module) before the main inline
   script, matching this site's no-bundler setup. Exposes `LANGUAGES`,
   `CATEGORIES`, and `UI_STRINGS` on window. */

const LANGUAGES = [
  { code: "fr", label: "Français" },
  { code: "en", label: "English" },
  { code: "ar", label: "العربية" },
];

/* Category keys are the stable internal identifiers PROJECTS/filtering use —
   never the translated label, so switching language never breaks an active
   filter. */
const CATEGORIES = {
  all: { fr: "Tout", en: "All", ar: "الكل" },
  "nail-art": { fr: "Nail Art", en: "Nail Art", ar: "فن الأظافر" },
  photography: { fr: "Photographie", en: "Photography", ar: "التصوير الفوتوغرافي" },
  "case-studies": { fr: "Études de cas", en: "Case Studies", ar: "دراسات الحالة" },
};
const CATEGORY_KEYS = ["all", "nail-art", "photography", "case-studies"];

const UI_STRINGS = {
  fr: {
    meta: {
      title: "Nails by Rania — Portfolio",
      description: "Un portfolio épuré en mode sombre présentant photographie, design et études de cas.",
    },
    nav: { projects: "Projets", about: "À propos", contact: "Contact", talk: "Discutons", openMenu: "Ouvrir le menu" },
    hero: {
      eyebrow: "Photographie · Nail Art · Design",
      headingHTML: 'Un travail obsédé par le détail,<br class="hidden sm:block" /> photographié et présenté <span class="italic text-ink-400">avec soin.</span>',
      paragraph: "Une collection sélectionnée d'art des ongles peint à la main, de photographie en gros plan et d'études de cas — pensée pour les clientes qui accordent autant d'importance à la finition qu'à l'idée.",
      cta: "Voir la galerie",
      countTemplate: "{n} projets · mis à jour en 2026",
    },
    gallery: {
      count: (n) => (n === 1 ? "1 projet" : `${n} projets`),
      scrollPrev: "Précédent",
      scrollNext: "Suivant",
    },
    about: {
      eyebrow: "À propos",
      heading: "Les mains derrière le travail",
      paragraph1: "Je suis Rania, une nail artist qui travaille à la croisée du détail minutieux et de l'artisanat du quotidien — sets peints à la main, fleurs 3D sculptées, et la photographie en gros plan et les reels de processus qui les documentent. Chaque set présenté ici est parti d'un brief client pour devenir quelque chose que j'étais fière de photographier en gros plan.",
      paragraph2: "Ce portfolio est volontairement minimaliste : fond sombre, typographie à fort contraste, et une grille qui met le travail en avant. Filtrez par catégorie ci-dessus, ou ouvrez une pièce pour la description complète.",
      statProjects: "Projets",
      statCategories: "Catégories",
      statLatest: "Dernier travail",
    },
    contact: {
      eyebrow: "Contact",
      heading: "Un projet en tête ? Créons ensemble quelque chose qui mérite un second regard.",
    },
    footer: {
      copyright: "© 2026 Nails by Rania. Tous droits réservés.",
      builtWith: "Réalisé avec Tailwind CSS et JavaScript natif.",
    },
    lightbox: {
      client: "Client",
      date: "Date",
      category: "Catégorie",
      hint: "Utilisez ← → pour naviguer, Échap pour fermer",
      close: "Fermer",
      previous: "Précédent",
      next: "Suivant",
    },
  },

  en: {
    meta: {
      title: "Nails by Rania — Portfolio",
      description: "A minimalist dark-mode portfolio showcasing photography, design and case-study work.",
    },
    nav: { projects: "Projects", about: "About", contact: "Contact", talk: "Let's talk", openMenu: "Open menu" },
    hero: {
      eyebrow: "Photography · Nail Art · Design",
      headingHTML: 'Detail‑obsessed work,<br class="hidden sm:block" /> shot and shown <span class="italic text-ink-400">with care.</span>',
      paragraph: "A curated collection of hand-painted nail art, close-up photography and case studies — built for clients who care about the finish as much as the idea.",
      cta: "View the gallery",
      countTemplate: "{n} projects · updated 2026",
    },
    gallery: {
      count: (n) => (n === 1 ? "1 project" : `${n} projects`),
      scrollPrev: "Scroll to previous",
      scrollNext: "Scroll to next",
    },
    about: {
      eyebrow: "About",
      heading: "The hands behind the work",
      paragraph1: "I'm Rania, a nail artist working at the intersection of fine detail and everyday craft — hand-painted sets, sculpted 3D florals, and the close-up photography and process reels that document them. Every set on this site started as a client brief and ended up as something I was proud to shoot close up.",
      paragraph2: "This portfolio is intentionally minimal: dark background, high-contrast type, and a grid that puts the work first. Filter by category above, or open any piece for the full write-up.",
      statProjects: "Projects",
      statCategories: "Categories",
      statLatest: "Latest work",
    },
    contact: {
      eyebrow: "Contact",
      heading: "Have a project in mind? Let's make something worth a second look.",
    },
    footer: {
      copyright: "© 2026 Nails by Rania. All rights reserved.",
      builtWith: "Built with Tailwind CSS & vanilla JS.",
    },
    lightbox: {
      client: "Client",
      date: "Date",
      category: "Category",
      hint: "Use ← → to navigate, Esc to close",
      close: "Close",
      previous: "Previous",
      next: "Next",
    },
  },

  ar: {
    meta: {
      title: "Nails by Rania — معرض الأعمال",
      description: "معرض أعمال بسيط بتصميم داكن يعرض التصوير الفوتوغرافي والتصميم ودراسات الحالة.",
    },
    nav: { projects: "المشاريع", about: "نبذة", contact: "تواصل", talk: "لنتحدث", openMenu: "فتح القائمة" },
    hero: {
      eyebrow: "التصوير الفوتوغرافي · فن الأظافر · التصميم",
      headingHTML: 'عمل مهووس بالتفاصيل،<br class="hidden sm:block" /> يُصوَّر ويُعرض <span class="italic text-ink-400">بعناية فائقة.</span>',
      paragraph: "مجموعة منتقاة من فن الأظافر المرسوم يدويًا، والتصوير عن قرب، ودراسات الحالة — صُممت لعميلات يهتممن باللمسة النهائية بقدر اهتمامهن بالفكرة.",
      cta: "عرض المعرض",
      countTemplate: "{n} مشاريع · محدّث 2026",
    },
    gallery: {
      count: (n) => {
        if (n === 0) return "لا توجد مشاريع";
        if (n === 1) return "مشروع واحد";
        if (n === 2) return "مشروعان";
        return `${n} مشاريع`;
      },
      scrollPrev: "السابق",
      scrollNext: "التالي",
    },
    about: {
      eyebrow: "نبذة",
      heading: "الأيدي وراء العمل",
      paragraph1: "أنا رانيا، فنانة أظافر أعمل عند تقاطع الدقة الفائقة والحرفة اليومية — أطقم مرسومة يدويًا، وزهور ثلاثية الأبعاد منحوتة، وتصوير عن قرب ومقاطع توثّق مراحل العمل. كل طقم في هذا الموقع بدأ كطلب من عميلة وانتهى بشيء افتخرت بتصويره عن قرب.",
      paragraph2: "هذا المعرض بسيط عن قصد: خلفية داكنة، خط عالي التباين، وشبكة تضع العمل في المقام الأول. صفّي حسب الفئة أعلاه، أو افتحي أي قطعة للاطلاع على التفاصيل الكاملة.",
      statProjects: "مشاريع",
      statCategories: "فئات",
      statLatest: "أحدث عمل",
    },
    contact: {
      eyebrow: "تواصل",
      heading: "لديك فكرة مشروع؟ لنصنع معًا شيئًا يستحق نظرة ثانية.",
    },
    footer: {
      copyright: "© 2026 Nails by Rania. جميع الحقوق محفوظة.",
      builtWith: "صُنع باستخدام Tailwind CSS وجافاسكريبت خام.",
    },
    lightbox: {
      client: "العميلة",
      date: "التاريخ",
      category: "الفئة",
      hint: "استخدم ← → للتنقل، Esc للإغلاق",
      close: "إغلاق",
      previous: "السابق",
      next: "التالي",
    },
  },
};
