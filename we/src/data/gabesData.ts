import type { CulturalDimension, Delegation, Language, PlaceStory } from '../types/gabes';

export const GABES_CENTER = { lat: 33.8815, lng: 10.0982 };

export const CULTURAL_DIMENSIONS: CulturalDimension[] = [
  {
    key: 'geography',
    label: { en: 'Geography', ar: 'الجغرافيا', fr: 'Géographie' },
    description: {
      en: 'From Mediterranean gulf tides to arid mountain ridges and oasis valleys.',
      ar: 'من مدّ وجزر خليج قابس إلى المرتفعات الجبلية وواحات الجنوب.',
      fr: 'Des marées du golfe méditerranéen aux crêtes arides et vallées oasiennes.',
    },
    accentHex: '#1d4ed8',
  },
  {
    key: 'nature',
    label: { en: 'Nature', ar: 'الطبيعة', fr: 'Nature' },
    description: {
      en: 'The world’s rare coastal palm oasis, turquoise shoreline, and geothermal springs.',
      ar: 'الواحة الساحلية الفريدة في العالم، الشواطئ الفيروزية والعيون الحارة.',
      fr: 'L’unique oasis maritime au monde, rivages turquoise et sources thermales.',
    },
    accentHex: '#1f7d72',
  },
  {
    key: 'culture',
    label: { en: 'Culture', ar: 'الثقافة', fr: 'Culture' },
    description: {
      en: 'Amazigh and Arab-Andalusian traditions, wedding songs, henna rituals, and hospitality.',
      ar: 'التقاليد الأمازيغية والعربية، طقوس الحناء القابسية، والأغاني الشعبية.',
      fr: 'Traditions amazighes et arabes, rituels du henné et hospitalité du Sud.',
    },
    accentHex: '#b45309',
  },
  {
    key: 'heritage',
    label: { en: 'Heritage', ar: 'التراث', fr: 'Patrimoine' },
    description: {
      en: 'Subterranean troglodyte craters, Roman Tacapes, and stone cliff villages.',
      ar: 'البيوت المحفورة تحت الأرض، تاكابيس الرومانية والقرى الجبلية.',
      fr: 'Maisons troglodytes, vestiges de Tacapes et villages perchés en pierre.',
    },
    accentHex: '#9a3412',
  },
  {
    key: 'experiences',
    label: { en: 'Experiences', ar: 'التجارب', fr: 'Expériences' },
    description: {
      en: 'Walking oasis seguias, sunrise over Zarat boats, and desert ridge trails.',
      ar: 'جولات في السواقي، شروق الشمس في الزارات، ومسارات جبال مطماطة.',
      fr: 'Balades le long des seguias, aube à Zarat et sentiers des crêtes.',
    },
    accentHex: '#0f766e',
  },
  {
    key: 'local_life',
    label: { en: 'Local Life', ar: 'الحياة اليومية', fr: 'Vie locale' },
    description: {
      en: 'Bustling souks, palm-leaf basket weavers, margoum looms, and olive harvests.',
      ar: 'الأسواق الشعبية، ضفر السعف، نسيج المرقوم، ومواسم جني التمور والزيتون.',
      fr: 'Souks vivants, vannerie en feuilles de palmier, métiers à tisser et récoltes.',
    },
    accentHex: '#7c2d12',
  },
  {
    key: 'stories',
    label: { en: 'Stories', ar: 'القصص', fr: 'Récits' },
    description: {
      en: 'Human portraits and living memories preserved across generations of Gabès.',
      ar: 'حكايات الناس وذاكرة المكان المتوارثة عبر الأجيال في ولاية قابس.',
      fr: 'Portraits humains et mémoires vivantes transmis au fil des générations.',
    },
    accentHex: '#4338ca',
  },
];

export const DELEGATIONS: Delegation[] = [
  {
    id: 'gabes-ville',
    name: { en: 'Gabès Medina & Jara', ar: 'قابس المدينة وجارة', fr: 'Gabès Médina & Jara' },
    center: { lat: 33.8815, lng: 10.0982 },
    landscape: { en: 'Maritime Crossroads', ar: 'ملتقى البحر والواحة', fr: 'Carrefour maritime' },
    summary: {
      en: 'Historic urban heart of Gabès uniting the Mediterranean corniche, Souk El Jara, and ancient Tacapes.',
      ar: 'القلب التاريخي لولاية قابس حيث يلتقي الكورنيش البحري بسوق جارة العريق وتاكابيس القديمة.',
      fr: 'Cœur urbain historique reliant la corniche méditerranéenne, Souk El Jara et l’antique Tacapes.',
    },
  },
  {
    id: 'gabes-ouest',
    name: { en: 'Gabès West & Chenini', ar: 'قابس الغربية وشنني', fr: 'Gabès Ouest & Chenini' },
    center: { lat: 33.8768, lng: 10.0562 },
    landscape: { en: 'Coastal Palm Oasis', ar: 'الواحة البحرية', fr: 'Oasis côtière' },
    summary: {
      en: 'Home to the iconic Chenini palm grove, three-tier oasis agriculture, and sweet desert pomegranate orchards.',
      ar: 'موطن واحة شنني الساحلية بنظام الزراعة ثلاثية الطوابق والرمان القابسي المشهور.',
      fr: 'Berceau de la palmeraie de Chenini, de son agriculture à trois étages et de ses grenadiers.',
    },
  },
  {
    id: 'gabes-sud',
    name: { en: 'Gabès South & Sidi Boulbaba', ar: 'قابس الجنوبية وسيدي بولبابة', fr: 'Gabès Sud & Sidi Boulbaba' },
    center: { lat: 33.854, lng: 10.105 },
    landscape: { en: 'Sanctuary & Dunes', ar: 'مقامات وكثبان ساحلية', fr: 'Sanctuaire & rivages' },
    summary: {
      en: 'Southern gateway known for Sidi Boulbaba heritage, coastal neighborhoods, and vibrant student life.',
      ar: 'البوابة الجنوبية المعروفة بمقام سيدي بولبابة والأحياء الساحلية والحياة الجامعية.',
      fr: 'Porte sud connue pour le mausolée Sidi Boulbaba, les quartiers côtiers et la vie universitaire.',
    },
  },
  {
    id: 'ghannouch',
    name: { en: 'Ghannouch', ar: 'غنوش', fr: 'Ghannouch' },
    center: { lat: 33.9389, lng: 10.0628 },
    landscape: { en: 'Northern Gulf Coast', ar: 'ساحل الخليج الشمالي', fr: 'Littoral nord du Golfe' },
    summary: {
      en: 'Coastal town along the Gulf of Gabès blending fishing harbors, family beaches, and northern oasis gardens.',
      ar: 'مدينة ساحلية على خليج قابس تجمع بين مرفأ الصيد البحري والواحات الشمالية.',
      fr: 'Ville côtière du golfe de Gabès mêlant port de pêche, plages familiales et jardins oasiens.',
    },
  },
  {
    id: 'el-metouia',
    name: { en: 'El Métouia', ar: 'المطوية', fr: 'El Métouia' },
    center: { lat: 33.96, lng: 10.0025 },
    landscape: { en: 'Oasis & Sebkha', ar: 'واحة وسبخة ساحلية', fr: 'Oasis & sebkha' },
    summary: {
      en: 'Refined oasis settlement celebrated for traditional embroidery, citrus gardens, and seasonal wetlands.',
      ar: 'واحة عريقة تشتهر بالصناعات التقليدية وبساتين القوارص والسباخ الجاذبة للطيور المهاجرة.',
      fr: 'Oasis réputée pour sa broderie traditionnelle, ses vergers et ses zones humides saisonnières.',
    },
  },
  {
    id: 'oudhref',
    name: { en: 'Oudhref', ar: 'وذرف', fr: 'Oudhref' },
    center: { lat: 33.9875, lng: 9.9614 },
    landscape: { en: 'Weaving Oasis', ar: 'واحة النسيج', fr: 'Oasis du tissage' },
    summary: {
      en: 'Capital of southern Tunisian hand-woven wool margoum and klim rugs crafted by women artisans.',
      ar: 'عاصمة نسيج المرقوم والكليم التقليدي التي تحفظها حرفيات وذرف عبر القرون.',
      fr: 'Capitale du tissage artisanal de margoum et de klim perpétué par les artisanes locales.',
    },
  },
  {
    id: 'el-hamma',
    name: { en: 'El Hamma', ar: 'الحامة', fr: 'El Hamma' },
    center: { lat: 33.8915, lng: 9.7963 },
    landscape: { en: 'Thermal & Steppe', ar: 'عيون حارة وبوابة الصحراء', fr: 'Thermes & steppe' },
    summary: {
      en: 'Ancient Aquae Tacapitanae renowned for healing geothermal springs and sunlit desert-edge oases.',
      ar: 'مدينة المياه الحارة منذ العهد الروماني، وبوابة طبيعية نحو شط الفجاج والصحراء.',
      fr: 'L’antique Aquae Tacapitanae, célèbre pour ses sources thermales et ses oasis pré-sahariennes.',
    },
  },
  {
    id: 'mareth',
    name: { en: 'Mareth & Zarat', ar: 'مارث والزارات', fr: 'Mareth & Zarat' },
    center: { lat: 33.6331, lng: 10.2928 },
    landscape: { en: 'Olive Plains & Sea', ar: 'سهول الزيتون والبحر', fr: 'Plaines oléicoles & mer' },
    summary: {
      en: 'Expansive southern delegation spanning Zarat fishing shores, olive groves, and historic defensive lines.',
      ar: 'معتمدية شاسعة تمتد من شاطئ الصيد بالزارات إلى بساتين الزيتون وخط مارث التاريخي.',
      fr: 'Vaste délégation reliant les rives de Zarat, les oliveraies et la ligne historique de Mareth.',
    },
  },
  {
    id: 'matmata',
    name: { en: 'Matmata', ar: 'مطماطة', fr: 'Matmata' },
    center: { lat: 33.5444, lng: 9.9717 },
    landscape: { en: 'Troglodyte Highlands', ar: 'هضاب البيوت المحفورة', fr: 'Plateaux troglodytes' },
    summary: {
      en: 'World-famous lunar plateau of subterranean crater homes engineered for natural climate harmony.',
      ar: 'الهضبة العالمية الشهيرة ببيوتها المحفورة في الصخر لحفظ البرودة صيفاً والدفء شتاءً.',
      fr: 'Haut plateau célèbre pour ses habitations souterraines offrant une climatisation naturelle.',
    },
  },
  {
    id: 'nouvelle-matmata',
    name: { en: 'Nouvelle Matmata & Toujane', ar: 'مطماطة الجديدة وتوجان', fr: 'Nouvelle Matmata & Toujane' },
    center: { lat: 33.56, lng: 10.05 },
    landscape: { en: 'Amazigh Ridges', ar: 'قمم وجبال أمازيغية', fr: 'Crêtes amazighes' },
    summary: {
      en: 'Gateway to terraced mountain villages like Toujane, wild rosemary honey, and sweeping canyon horizons.',
      ar: 'طريق القرى الجبلية الأمازيغية مثل توجان، وعسل الجبال والمناظر البانورامية الساحرة.',
      fr: 'Porte des villages perchés comme Toujane, réputés pour le miel de montagne et les panoramas.',
    },
  },
  {
    id: 'menzel-el-habib',
    name: {
      en: 'Menzel El Habib',
      ar: 'منزل الحبيب',
      fr: 'Menzel El Habib',
    },
    center: { lat: 34.2299, lng: 9.5985 },
    landscape: {
      en: 'Semi-Arid Hinterland',
      ar: 'الداخل شبه الجاف',
      fr: 'Arrière-pays semi-aride',
    },
    summary: {
      en: 'An inland delegation of Gabès surrounded by rural landscapes and seasonal salt-flat environments.',
      ar: 'معتمدية داخلية من ولاية قابس تتميز بالمشهد الريفي والبيئات الملحية الموسمية.',
      fr: 'Une délégation intérieure de Gabès marquée par ses paysages ruraux et ses zones salines saisonnières.',
    },
  },
];

function buildAdditionalPlace(data: {
  id: string;
  slug: string;
  delegationId: string;
  dimension: Exclude<PlaceStory['dimension'], 'all'>;
  title: { en: string; ar: string; fr: string };
  subtitle: { en: string; ar: string; fr: string };
  coordinates: { lat: number; lng: number };
  elevationMeters: number;
  image: string;
  access: { en: string; ar: string; fr: string };
  summary: { en: string; ar: string; fr: string };
  highlight: { en: string; ar: string; fr: string };
}): PlaceStory {
  const {
    title,
    subtitle,
    summary,
    access,
    highlight,
    ...placeData
  } = data;

  return {
    ...placeData,
    title,
    subtitle,
    summary,
    secondaryDimensions: ['geography', 'stories'],
    imageCaption: {
      en: 'Representative regional image. It does not necessarily depict this exact location.',
      ar: 'صورة تمثيلية من الجهة، ولا تعني بالضرورة أنها تُظهر هذا الموقع تحديداً.',
      fr: 'Image représentative de la région, ne montrant pas nécessairement ce lieu précis.',
    },
    gallery: [
      {
        src: data.image,
        caption: {
          en: 'Representative image of the Gabès region, not an exact photograph of this location.',
          ar: 'صورة تمثيلية لجهة قابس وليست صورة مؤكدة لهذا الموقع.',
          fr: 'Image représentative de la région de Gabès, et non une photographie exacte du lieu.',
        },
      },
    ],
    storyLead: {
      en: `Discover ${title.en}, a destination within the diverse landscapes of Gabès.`,
      ar: `اكتشف ${title.ar}، وجهة ضمن المشاهد الطبيعية والثقافية المتنوعة لولاية قابس.`,
      fr: `Découvrez ${title.fr}, une destination au cœur des paysages variés de Gabès.`,
    },
    storyBody: {
      en: `${summary.en} Its identity is connected to the surrounding landscape, local communities, and the wider heritage of southern Tunisia.`,
      ar: `${summary.ar} وترتبط هويته بالمشهد الطبيعي والمجتمع المحلي والتراث الأوسع للجنوب التونسي.`,
      fr: `${summary.fr} Son identité est liée au paysage environnant, aux communautés locales et au patrimoine du Sud tunisien.`,
    },
    culturalNote: {
      en: `The local identity of ${title.en} forms part of the wider cultural heritage of Gabès.`,
      ar: `تمثل الهوية المحلية لـ${title.ar} جزءاً من التراث الثقافي الأوسع لولاية قابس.`,
      fr: `L'identité locale de ${title.fr} participe au patrimoine culturel de Gabès.`,
    },
    localLife: {
      en: 'Explore the surroundings respectfully and discover local life through residents and regional guides.',
      ar: 'اكتشف المحيط باحترام وتعرّف على الحياة المحلية من خلال السكان والمرشدين.',
      fr: 'Explorez les environs avec respect et découvrez la vie locale auprès des habitants et des guides.',
    },
    visitingInfo: {
      bestSeason: {
        en: 'October – April',
        ar: 'أكتوبر – أفريل',
        fr: 'Octobre – Avril',
      },
      access,
      highlight,
    },
  };
}

export const PLACES: PlaceStory[] = [
  {
    id: 'chenini-oasis',
    slug: 'chenini-coastal-oasis',
    delegationId: 'gabes-ouest',
    dimension: 'nature',
    secondaryDimensions: ['geography', 'experiences'],
    title: {
      en: 'Chenini Coastal Oasis',
      ar: 'واحة شنني البحرية',
      fr: 'Oasis côtière de Chenini',
    },
    subtitle: {
      en: 'Where towering date palms meet the Mediterranean breeze',
      ar: 'حيث تعانق أشجار النخيل نسيم البحر الأبيض المتوسط',
      fr: 'Là où la palmeraie millénaire respire l’air marin',
    },
    coordinates: { lat: 33.8768, lng: 10.0562 },
    elevationMeters: 14,
    image: '/images/gabes_oasis_chenini.webp',
    imageCaption: {
      en: 'Three-tier agroforestry beneath golden afternoon light in Chenini, Gabès.',
      ar: 'نظام الزراعة ثلاثية الطوابق في واحة شنني قابس وقت الأصيل.',
      fr: 'Culture oasienne à trois étages sous la lumière dorée de Chenini.',
    },
    gallery: [
      {
        src: '/images/gabes_oasis_chenini.webp',
        caption: {
          en: 'Three-tier oasis gardens irrigated beneath towering date palms in Chenini.',
          ar: 'حدائق الواحة ثلاثية الطوابق المروية تحت ظلال النخيل في شنني.',
          fr: 'Jardins oasiens à trois étages irrigués sous les palmiers-dattiers.',
        },
      },
      {
        src: '/images/gabes_jara_souk_crafts.webp',
        caption: {
          en: 'Freshly harvested Gabès henna leaves and handwoven palm-frond baskets from the oasis.',
          ar: 'أوراق الحناء القابسية المقطوفة من الواحة وقفف السعف التقليدية.',
          fr: 'Feuilles de henné récoltées dans l’oasis et vannerie en palme tressée.',
        },
      },
      {
        src: '/images/gabes_maritime_corniche.webp',
        caption: {
          en: 'Where the oasis greenery meets the calm Mediterranean shoreline of the Gulf of Gabès.',
          ar: 'حيث يلتقي خضار الواحة بمياه خليج قابس الهادئة عند الغروب.',
          fr: 'Là où la verdure oasienne rejoint le rivage méditerranéen du golfe.',
        },
      },
    ],
    summary: {
      en: 'One of the rarest ecosystems on Earth: an ancient freshwater palm oasis thriving directly beside the Mediterranean Sea.',
      ar: 'نظام بيئي نادر في العالم: واحة نخيل ساحلية خضراء تنبض بالحياة على ضفاف المتوسط.',
      fr: 'L’un des écosystèmes les plus rares au monde : une oasis côtière prospérant au bord de la mer.',
    },
    storyLead: {
      en: 'For centuries, farmers in Chenini sculpted a microclimate of shade and water beneath the desert sun.',
      ar: 'منذ قرون، نحت فلاحو شنني مناخاً مصغراً من الظل والماء تحت شمس الجنوب.',
      fr: 'Depuis des siècles, les jardiniers de Chenini ont façonné un microclimat d’ombre et d’eau.',
    },
    storyBody: {
      en: 'In Chenini, life grows in three vertical layers: towering date palms filter the fierce Maghreb sun, shielding pomegranate, fig, and olive trees below, while ground plots yield fragrant henna, mulukhiyah, and herbs. Traditional earthen seguias distribute spring water through community-governed turns passed down orally across generations.',
      ar: 'في شنني، تنمو الحياة في ثلاث طبقات متكاملة: تحجب النخيل العالية حرارة الشمس، فتظلل أشجار الرمان والتين والزيتون في الوسط، بينما تزدهر على الأرض زراعات الحناء القابسية والملوخية والخضروات. وتوزع السواقي الترابية المياه وفق نظام جماعي متوارث.',
      fr: 'À Chenini, la vie s’organise en trois strates : les palmiers-dattiers filtrent le soleil, protégeant grenadiers, figuiers et oliviers, tandis qu’au sol poussent le henné parfumé et les herbes. Les seguias en terre distribuent l’eau selon un tour d’eau communautaire ancestral.',
    },
    culturalNote: {
      en: 'Dawn brings the harvest of Legmi—freshly tapped palm sap drunk chilled before sunrise—and the scent of crushed Gabèsian henna.',
      ar: 'مع الفجر، يُجمع اللاقمي الطازج من قلب النخيل وتفوح روائح أوراق الحناء المجففة.',
      fr: 'À l’aube, on récolte le legmi, sève fraîche de palmier, dans le parfum des feuilles de henné.',
    },
    localLife: {
      en: 'Guided oasis walks with local gardeners, small wooden tea stops along the paths, and seasonal date and pomegranate harvests.',
      ar: 'مسارات مشي بين البساتين برفقة الفلاحين واستراحات الشاي الأخضر تحت سعف النخيل.',
      fr: 'Balades guidées avec les oasis-cultivateurs, haltes de thé et cueillettes saisonnières.',
    },
       visitingInfo: {
      bestSeason: {
        en: 'Year-round',
        ar: 'طوال السنة',
        fr: 'Toute l’année',
      },
      access: {
        en: '5 min south of central Gabès',
        ar: '5 دقائق جنوب وسط مدينة قابس',
        fr: '5 min au sud du centre de Gabès',
      },
      highlight: {
        en: 'Architectural courtyard & regional historical context',
        ar: 'الفناء المعماري والعمق التاريخي لتاكابيس',
        fr: 'Cour architecturale et histoire millénaire de Tacapes',
      },
    },
  },

  buildAdditionalPlace({
    id: 'ras-el-oued',
    slug: 'ras-el-oued',
    delegationId: 'gabes-ouest',
    dimension: 'nature',
    title: {
      en: 'Ras El Oued',
      ar: 'رأس الوادي',
      fr: 'Ras El Oued',
    },
    subtitle: {
      en: 'A lesser-known landscape of western Gabès',
      ar: 'مشهد طبيعي من المناطق الغربية لقابس',
      fr: 'Un paysage méconnu de l’ouest de Gabès',
    },
    coordinates: { lat: 33.89, lng: 10.05 }, // Approximate — verify exact site
    elevationMeters: 20,
    image: '/images/gabes_oasis_chenini.webp',
    access: {
      en: 'Western Gabès — exact access point to be confirmed',
      ar: 'غرب قابس — نقطة الوصول الدقيقة تحتاج إلى التثبت',
      fr: 'Ouest de Gabès — accès exact à confirmer',
    },
    summary: {
      en: 'A location identified in the western Gabès area. Its precise geographical identity and visitor features require further documentation.',
      ar: 'موقع ضمن منطقة قابس الغربية، وتحتاج خصائصه الجغرافية والسياحية إلى توثيق إضافي.',
      fr: 'Un lieu situé dans la zone occidentale de Gabès, dont les caractéristiques précises restent à documenter.',
    },
    highlight: {
      en: 'Discover the surrounding landscape',
      ar: 'اكتشاف المشهد الطبيعي المحيط',
      fr: 'Découverte du paysage environnant',
    },
  }),

  buildAdditionalPlace({
    id: 'tamezret-village',
    slug: 'tamezret-village',
    delegationId: 'matmata',
    dimension: 'heritage',
    title: {
      en: 'Tamezret Amazigh Village',
      ar: 'قرية تمزرط الأمازيغية',
      fr: 'Village amazigh de Tamezret',
    },
    subtitle: {
      en: 'An Amazigh village overlooking the Dahar highlands',
      ar: 'قرية أمازيغية تطل على مرتفعات الظاهر',
      fr: 'Un village amazigh dominant les hauteurs du Dahar',
    },
    coordinates: { lat: 33.537229, lng: 9.864137 },
    elevationMeters: 460,
    image: '/images/gabes_toujane_village.webp',
    access: {
      en: 'Near Matmata, along the Matmata–Douz road',
      ar: 'بالقرب من مطماطة، على طريق مطماطة دوز',
      fr: 'Près de Matmata, sur la route Matmata–Douz',
    },
    summary: {
      en: 'Tamezret is a hilltop Amazigh village known for its traditional architecture and troglodytic horizontal dwellings.',
      ar: 'تمزرط قرية أمازيغية مبنية فوق مرتفع، تشتهر بعمارتها التقليدية ومساكنها المحفورة أفقياً.',
      fr: 'Tamezret est un village amazigh perché, connu pour son architecture traditionnelle et son habitat troglodytique horizontal.',
    },
    highlight: {
      en: 'Explore the village streets and panoramic viewpoints',
      ar: 'اكتشاف أزقة القرية وإطلالاتها البانورامية',
      fr: 'Parcourir les ruelles et les belvédères du village',
    },
  }),

  buildAdditionalPlace({
    id: 'zrig-oasis',
    slug: 'zrig-oasis',
    delegationId: 'gabes-sud',
    dimension: 'nature',
    title: {
      en: 'Zrig',
      ar: 'زريق',
      fr: 'Zrig',
    },
    subtitle: {
      en: 'A southern Gabès neighbourhood and its surrounding landscape',
      ar: 'منطقة زريق ومحيطها في جنوب قابس',
      fr: 'Zrig et ses environs au sud de Gabès',
    },
    coordinates: { lat: 33.85575, lng: 10.09593 },
    elevationMeters: 10,
    image: '/images/gabes_oasis_chenini.webp',
    access: {
      en: 'Southern Gabès, near Sidi Boulbaba',
      ar: 'جنوب قابس بالقرب من سيدي بولبابة',
      fr: 'Sud de Gabès, près de Sidi Boulbaba',
    },
    summary: {
      en: 'Zrig is a locality in Gabès Sud. The specific oasis boundaries and agricultural features need separate verification.',
      ar: 'زريق منطقة تقع في قابس الجنوبية، أما حدود الواحة وخصائصها الزراعية فتحتاج إلى توثيق منفصل.',
      fr: 'Zrig est une localité de Gabès Sud. Les limites et caractéristiques de l’oasis restent à vérifier.',
    },
    highlight: {
      en: 'Discover the southern landscape',
      ar: 'اكتشاف المشهد الطبيعي الجنوبي',
      fr: 'Découvrir le paysage du sud',
    },
  }),

 /*  buildAdditionalPlace({
    id: 'menzel-el-habib-salt-lake',
    slug: 'menzel-el-habib-salt-lake',
    delegationId: 'menzel-el-habib',
    dimension: 'geography',
    title: {
      en: 'Menzel El Habib Salt Landscapes',
      ar: 'المشهد الملحي بمنزل الحبيب',
      fr: 'Paysages salins de Menzel El Habib',
    },
    subtitle: {
      en: 'The inland landscapes of the Menzel El Habib area',
      ar: 'المشاهد الطبيعية الداخلية بمنطقة منزل الحبيب',
      fr: 'Les paysages intérieurs de Menzel El Habib',
    },
    coordinates: { lat: 34.2299, lng: 9.5985 }, // Town reference, NOT verified lake coordinates
    elevationMeters: 88,
    image: '/images/gabes_maritime_corniche.webp',
    access: {
      en: 'Menzel El Habib — exact salt-flat location to be confirmed',
      ar: 'منزل الحبيب — الموقع الدقيق للسبخة يحتاج إلى التثبت',
      fr: 'Menzel El Habib — emplacement exact de la sebkha à confirmer',
    },
    summary: {
      en: 'An inland destination proposed for documenting the saline landscapes around Menzel El Habib. The exact lake or sebkha has not yet been identified.',
      ar: 'وجهة مقترحة لتوثيق المشاهد الملحية حول منزل الحبيب، ولم يتم بعد تحديد موقع السبخة بدقة.',
      fr: 'Une destination proposée pour documenter les paysages salins autour de Menzel El Habib. La sebkha exacte reste à identifier.',
    },
    highlight: {
      en: 'Landscape exploration and photography',
      ar: 'استكشاف المشهد والتصوير',
      fr: 'Exploration du paysage et photographie',
    },
  }), */

  buildAdditionalPlace({
    id: 'mareth-military-museum',
    slug: 'mareth-military-museum',
    delegationId: 'mareth',
    dimension: 'heritage',
    title: {
      en: 'Mareth Military Museum',
      ar: 'المتحف العسكري لخط مارث',
      fr: 'Musée militaire de la ligne de Mareth',
    },
    subtitle: {
      en: 'A historical defence line from the Second World War',
      ar: 'خط دفاع تاريخي من الحرب العالمية الثانية',
      fr: 'Une ligne défensive historique de la Seconde Guerre mondiale',
    },
    coordinates: { lat: 33.59586, lng: 10.31186 },
    elevationMeters: 15,
    image: '/images/gabes_toujane_village.webp',
    access: {
      en: 'Near Mareth, along the RN1',
      ar: 'بالقرب من مارث على الطريق الوطنية رقم 1',
      fr: 'Près de Mareth, le long de la RN1',
    },
    summary: {
      en: 'The Mareth Defence Line preserves the memory of the fortifications and military events of the Second World War in southern Tunisia.',
      ar: 'يحفظ خط مارث الدفاعي ذاكرة التحصينات والأحداث العسكرية التي شهدها الجنوب التونسي خلال الحرب العالمية الثانية.',
      fr: 'La ligne de Mareth conserve la mémoire des fortifications et des événements militaires de la Seconde Guerre mondiale dans le Sud tunisien.',
    },
    highlight: {
      en: 'Explore the historical fortifications and museum',
      ar: 'اكتشاف التحصينات التاريخية والمتحف',
      fr: 'Découvrir les fortifications historiques et le musée',
    },
  }),

  buildAdditionalPlace({
    id: 'hotel-sidi-driss',
    slug: 'hotel-sidi-driss',
    delegationId: 'matmata',
    dimension: 'heritage',
    title: {
      en: 'Hotel Sidi Driss',
      ar: 'فندق سيدي إدريس',
      fr: 'Hôtel Sidi Driss',
    },
    subtitle: {
      en: 'The famous troglodyte courtyard featured in Star Wars',
      ar: 'الفندق التروغلودي الشهير الذي ظهر في حرب النجوم',
      fr: 'La célèbre cour troglodytique vue dans Star Wars',
    },
    coordinates: { lat: 33.54271, lng: 9.96728 },
    elevationMeters: 420,
    image: '/images/gabes_matmata_troglodyte.webp',
    access: {
      en: 'Old Matmata',
      ar: 'مطماطة القديمة',
      fr: 'Matmata ancienne',
    },
    summary: {
      en: 'Hotel Sidi Driss is a traditional troglodyte hotel in Matmata, internationally known for its connection with the Star Wars film series.',
      ar: 'فندق سيدي إدريس منشأة تقليدية محفورة في الأرض بمطماطة، اشتهرت عالمياً بارتباطها بسلسلة أفلام حرب النجوم.',
      fr: 'L’hôtel Sidi Driss est un établissement troglodytique traditionnel de Matmata, connu internationalement pour son lien avec la saga Star Wars.',
    },
    highlight: {
      en: 'Visit the iconic underground courtyard',
      ar: 'زيارة الفناء التحت أرضي الشهير',
      fr: 'Visiter la cour souterraine emblématique',
    },
  }),

  buildAdditionalPlace({
    id: 'ghannouch-fishing-port',
    slug: 'ghannouch-fishing-port',
    delegationId: 'ghannouch',
    dimension: 'experiences',
    title: {
      en: 'Ghannouch Fishing Port',
      ar: 'ميناء الصيد بغنوش',
      fr: 'Port de pêche de Ghannouch',
    },
    subtitle: {
      en: 'A working harbour on the northern Gulf of Gabès',
      ar: 'ميناء بحري نشط على الساحل الشمالي لخليج قابس',
      fr: 'Un port actif sur le littoral nord du golfe de Gabès',
    },
    coordinates: { lat: 33.92333, lng: 10.10333 },
    elevationMeters: 2,
    image: '/images/gabes_maritime_corniche.webp',
    access: {
      en: 'Ghannouch coastal area',
      ar: 'المنطقة الساحلية بغنوش',
      fr: 'Zone côtière de Ghannouch',
    },
    summary: {
      en: 'Ghannouch is an important coastal and port area connected to fishing and maritime activity in the Gulf of Gabès.',
      ar: 'تُعد غنوش منطقة ساحلية ومينائية مرتبطة بنشاط الصيد البحري والحياة البحرية بخليج قابس.',
      fr: 'Ghannouch est une zone côtière et portuaire liée à la pêche et à l’activité maritime du golfe de Gabès.',
    },
    highlight: {
      en: 'Observe the harbour and daily fishing activity',
      ar: 'مشاهدة الميناء ونشاط الصيد اليومي',
      fr: 'Observer le port et l’activité quotidienne de pêche',
    },
  }),

  buildAdditionalPlace({
    id: 'beni-zelten-village',
    slug: 'beni-zelten-village',
    delegationId: 'nouvelle-matmata',
    dimension: 'heritage',
    title: {
      en: 'Beni Zelten Mountain Village',
      ar: 'قرية بني زلطن الجبلية',
      fr: 'Village montagnard de Beni Zelten',
    },
    subtitle: {
      en: 'Traditional mountain settlement and historic troglodyte heritage',
      ar: 'تجمع جبلي تقليدي وتراث من المساكن المحفورة',
      fr: 'Village montagnard traditionnel et patrimoine troglodytique',
    },
    coordinates: { lat: 33.54598, lng: 10.09816 },
    elevationMeters: 240,
    image: '/images/gabes_toujane_village.webp',
    access: {
      en: 'Beni Zelten, Nouvelle Matmata area',
      ar: 'بني زلطن، منطقة مطماطة الجديدة',
      fr: 'Beni Zelten, secteur de Nouvelle Matmata',
    },
    summary: {
      en: 'Beni Zelten is a mountain village with traditional stone structures and troglodyte dwellings forming part of the Dahar heritage.',
      ar: 'بني زلطن قرية جبلية تضم مباني حجرية تقليدية ومساكن محفورة تشكل جزءاً من تراث جبال الظاهر.',
      fr: 'Beni Zelten est un village de montagne avec des constructions en pierre et des habitations troglodytiques appartenant au patrimoine du Dahar.',
    },
    highlight: {
      en: 'Discover the historic village and traditional architecture',
      ar: 'اكتشاف القرية التاريخية والعمارة التقليدية',
      fr: 'Découvrir le village historique et son architecture traditionnelle',
    },
  }),
];

export const JOURNEY_STAGES = [
  {
    id: 'world' as const,
    progress: 0,
    lat: 20,
    lng: 12,
    distance: 310,
    stepNum: '01',
    title: {
      en: 'The World',
      ar: 'العالم',
      fr: 'Le Monde',
    },
    subtitle: {
      en: 'Spin the 3D Earth or scroll to begin the journey toward southern Tunisia.',
      ar: 'أدر الكرة الأرضية أو مرّر للأسفل لتبدأ رحلتك نحو الجنوب التونسي.',
      fr: 'Faites pivoter le globe ou faites défiler pour amorcer le voyage.',
    },
  },
  {
    id: 'africa' as const,
    progress: 0.34,
    lat: 27,
    lng: 10.5,
    distance: 215,
    stepNum: '02',
    title: {
      en: 'North Africa',
      ar: 'شمال إفريقيا',
      fr: 'Afrique du Nord',
    },
    subtitle: {
      en: 'Crossing the Mediterranean basin where Saharan caravan routes meet coastal ports.',
      ar: 'نحو حوض المتوسط حيث تلتقي مسالك الصحراء بالموانئ الساحلية.',
      fr: 'Cap sur le bassin méditerranéen, trait d’union entre mer et Sahara.',
    },
  },
  {
    id: 'tunisia' as const,
    progress: 0.68,
    lat: 33.8,
    lng: 9.8,
    distance: 155,
    stepNum: '03',
    title: {
      en: 'Tunisia',
      ar: 'تونس',
      fr: 'Tunisie',
    },
    subtitle: {
      en: 'Descending toward the Gulf of Gabès—the unique tidal curve of southern Tunisia.',
      ar: 'الاقتراب من خليج قابس، المنحنى الساحلي الفريد في الجنوب التونسي.',
      fr: 'Descente vers le golfe de Gabès, courbe littorale emblématique du Sud tunisien.',
    },
  },
  {
    id: 'gabes' as const,
    progress: 1,
    lat: 33.8815,
    lng: 10.0982,
    distance: 118,
    stepNum: '04',
    title: {
      en: 'Gabès',
      ar: 'قابس',
      fr: 'Gabès',
    },
    subtitle: {
      en: 'Where sea, palm oasis, and Amazigh mountains unite. Every place has a story.',
      ar: 'حيث يلتقي البحر والواحة والجبل. لكل مكان حكاية.',
      fr: 'Là où mer, oasis et montagnes s’unissent. Chaque lieu a une histoire.',
    },
  },
];

export const UI_COPY: Record<
  Language,
  {
    brand: string;
    tagline: string;
    navGlobe: string;
    navMap: string;
    navDimensions: string;
    navAbout: string;
    enterGabes: string;
    continueScrolling: string;
    scrollHint: string;
    backToGlobe: string;
    allDimensions: string;
    allDelegations: string;
    searchPlaces: string;
    placesCount: (n: number) => string;
    layerMap: string;
    layerHybrid: string;
    layerSatellite: string;
    tilt3D: string;
    resetView: string;
    storyHistory: string;
    culturalIdentity: string;
    localLifeHeading: string;
    visitingInfoHeading: string;
    bestSeasonLabel: string;
    accessLabel: string;
    highlightLabel: string;
    delegationLabel: string;
    coordinatesLabel: string;
    elevationLabel: string;
    previousStory: string;
    nextStory: string;
    backToList: string;
    aboutTitle: string;
    aboutMission: string;
    audienceHeading: string;
    audiences: string[];
    visionQuote: string;
    downloadZipLabel: string;
    close: string;
    errorMessage: string;
    errorRetry: string;
    languageLabel: string;
    journeyStagesLabel: string;
    journeySliderLabel: string;
    noResults: string;
    clearFilters: string;
  }
> = {
  en: {
    brand: 'WE ARE GABÈS',
    tagline: 'Every place has a story.',
    navGlobe: 'World Globe',
    navMap: 'Gabès Map',
    navDimensions: '7 Dimensions',
    navAbout: 'About',
    enterGabes: 'Enter Gabès',
    continueScrolling: 'Scroll to zoom toward Gabès',
    scrollHint: 'Scroll wheel zooms the journey · Drag rotates Earth',
    backToGlobe: 'Back to 3D Globe',
    allDimensions: 'All',
    allDelegations: 'All Delegations',
    searchPlaces: 'Search oasis, Matmata, souk, Zarat…',
    placesCount: (n) => `${n} curated ${n === 1 ? 'place' : 'places'}`,
    layerMap: 'Relief Map',
    layerHybrid: 'Hybrid Satellite',
    layerSatellite: 'Pure Satellite',
    tilt3D: '3D Terrain',
    resetView: 'Reset View',
    storyHistory: 'Place & History',
    culturalIdentity: 'Cultural Identity',
    localLifeHeading: 'Local Life & Craft',
    visitingInfoHeading: 'Visiting Details',
    bestSeasonLabel: 'Best season',
    accessLabel: 'Access',
    highlightLabel: 'Signature moment',
    delegationLabel: 'Delegation',
    coordinatesLabel: 'Coordinates',
    elevationLabel: 'Elevation',
    previousStory: 'Previous',
    nextStory: 'Next',
    backToList: 'All Places',
    aboutTitle: 'Digital Geographic & Cultural Identity Platform',
    aboutMission:
      'WE ARE GABÈS transforms regional discovery into an interactive geographic journey—moving seamlessly from the 3D World Globe into North Africa, Tunisia, Gabès Governorate, its delegations, its landscapes, and its living stories.',
    audienceHeading: 'Built For',
    audiences: [
      'Tunisian & international travelers seeking authentic southern heritage',
      'Tunisians living abroad reconnecting with regional roots',
      'Students, urbanists, and cultural researchers',
      'Investors & partners exploring Gabès’s geographic assets',
      'Residents of Gabès rediscovering every delegation’s story',
    ],
    visionQuote: 'The World → Africa → Tunisia → Gabès → Its Delegations → Its Places → Its Stories.',
    downloadZipLabel: 'Download Complete Project (.zip)',
    close: 'Close',
    errorMessage: 'Something went wrong while loading this view.',
    errorRetry: 'Reload',
    languageLabel: 'Language',
    journeyStagesLabel: 'Journey stages',
    journeySliderLabel: 'Travel from the World to Gabès',
    noResults: 'No places match this filter.',
    clearFilters: 'Reset filters',
  },
  ar: {
    brand: 'WE ARE GABÈS',
    tagline: 'لكل مكان حكاية.',
    navGlobe: 'الرحلة الكونية',
    navMap: 'خريطة قابس',
    navDimensions: 'الأبعاد السبعة',
    navAbout: 'عن المنصة',
    enterGabes: 'ادخل إلى قابس',
    continueScrolling: 'مرّر للاقتراب نحو ولاية قابس',
    scrollHint: 'التمرير بالماوس يقود الرحلة · السحب يدير الكرة الأرضية',
    backToGlobe: 'العودة إلى الكرة الأرضية',
    allDimensions: 'الكل',
    allDelegations: 'كل المعتمديات',
    searchPlaces: 'ابحث عن واحة، مطماطة، سوق، الزارات…',
    placesCount: (n) => `${n} معالم ومواقع`,
    layerMap: 'خريطة التضاريس',
    layerHybrid: 'قمر صناعي + أسماء',
    layerSatellite: 'قمر صناعي',
    tilt3D: 'تضاريس 3D',
    resetView: 'إعادة الضبط',
    storyHistory: 'القصة والتاريخ',
    culturalIdentity: 'الخصوصية الثقافية',
    localLifeHeading: 'الحياة اليومية والحرف',
    visitingInfoHeading: 'معلومات الزيارة',
    bestSeasonLabel: 'أفضل موسم',
    accessLabel: 'الوصول',
    highlightLabel: 'تجربة مميزة',
    delegationLabel: 'المعتمدية',
    coordinatesLabel: 'الإحداثيات',
    elevationLabel: 'الارتفاع',
    previousStory: 'السابق',
    nextStory: 'التالي',
    backToList: 'كل الأماكن',
    aboutTitle: 'منصة الهوية الجغرافية والثقافية لولاية قابس',
    aboutMission:
      'منصة رقمية تفاعلية تنقل الزائر في رحلة بصرية وجغرافية متكاملة: من الكرة الأرضية إلى شمال إفريقيا، تونس، ولاية قابس، معتمدياتها، معالمها، وحكايات أهلها.',
    audienceHeading: 'الجمهور المستهدف',
    audiences: [
      'السياح التونسيون والأجانب الباحثون عن الأصالة',
      'التونسيون المقيمون بالخارج المرتبطون بجذورهم',
      'الطلبة والباحثون في الجغرافيا والتراث',
      'المستثمرون والمهتمون بمقومات الجهة',
      'أبناء قابس لاكتشاف قصص كل معتمدية وقرية',
    ],
    visionQuote: 'العالم ← إفريقيا ← تونس ← قابس ← المعتمديات ← الأماكن ← القصص.',
    downloadZipLabel: 'تحميل المشروع كاملاً (.zip)',
    close: 'إغلاق',
    errorMessage: 'حدث خطأ أثناء تحميل هذا العرض.',
    errorRetry: 'إعادة التحميل',
    languageLabel: 'اللغة',
    journeyStagesLabel: 'مراحل الرحلة',
    journeySliderLabel: 'السفر من العالم إلى قابس',
    noResults: 'لا توجد نتائج مطابقة لهذا البحث.',
    clearFilters: 'إعادة ضبط الفلترة',
  },
  fr: {
    brand: 'WE ARE GABÈS',
    tagline: 'Chaque lieu a une histoire.',
    navGlobe: 'Globe 3D',
    navMap: 'Carte de Gabès',
    navDimensions: '7 Dimensions',
    navAbout: 'À propos',
    enterGabes: 'Entrer à Gabès',
    continueScrolling: 'Faites défiler vers Gabès',
    scrollHint: 'La molette pilote le voyage · Glissez pour tourner le globe',
    backToGlobe: 'Retour au Globe 3D',
    allDimensions: 'Tout',
    allDelegations: 'Toutes les délégations',
    searchPlaces: 'Chercher oasis, Matmata, souk, Zarat…',
    placesCount: (n) => `${n} ${n === 1 ? 'lieu répertorié' : 'lieux répertoriés'}`,
    layerMap: 'Carte Relief',
    layerHybrid: 'Satellite Hybride',
    layerSatellite: 'Satellite Pur',
    tilt3D: 'Relief 3D',
    resetView: 'Réinitialiser',
    storyHistory: 'Histoire & Récit',
    culturalIdentity: 'Identité Culturelle',
    localLifeHeading: 'Vie locale & Artisanat',
    visitingInfoHeading: 'Informations pratiques',
    bestSeasonLabel: 'Meilleure saison',
    accessLabel: 'Accès',
    highlightLabel: 'Moment fort',
    delegationLabel: 'Délégation',
    coordinatesLabel: 'Coordonnées',
    elevationLabel: 'Altitude',
    previousStory: 'Précédent',
    nextStory: 'Suivant',
    backToList: 'Tous les lieux',
    aboutTitle: 'Plateforme d’Identité Géographique & Culturelle',
    aboutMission:
      'WE ARE GABÈS transforme la découverte territoriale en un voyage cinématographique : du Globe 3D vers l’Afrique du Nord, la Tunisie, le gouvernorat de Gabès, ses délégations, ses lieux et ses récits.',
    audienceHeading: 'Publics visés',
    audiences: [
      'Voyageurs tunisiens et internationaux en quête d’authenticité',
      'Diaspora tunisienne attachée à ses racines régionales',
      'Étudiants, géographes et chercheurs en patrimoine',
      'Investisseurs et partenaires explorant les atouts de Gabès',
      'Habitants de Gabès redécouvrant la mémoire de chaque lieu',
    ],
    visionQuote: 'Le Monde → Afrique → Tunisie → Gabès → Ses Délégations → Ses Lieux → Ses Récits.',
    downloadZipLabel: 'Télécharger le projet complet (.zip)',
    close: 'Fermer',
    errorMessage: 'Une erreur est survenue au chargement de cette vue.',
    errorRetry: 'Recharger',
    languageLabel: 'Langue',
    journeyStagesLabel: 'Étapes du voyage',
    journeySliderLabel: 'Voyager du monde jusqu’à Gabès',
    noResults: 'Aucun lieu ne correspond à ce filtre.',
    clearFilters: 'Réinitialiser les filtres',
  },
};

export function normalizeSearch(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f\u0610-\u061a\u064b-\u065f\u0670\u06d6-\u06ed\u0640]/g, '')
    .replace(/[إأآٱ]/g, 'ا')
    .replace(/[ىی]/g, 'ي')
    .replace(/ک/g, 'ك')
    .replace(/ة/g, 'ه');
}
