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
];

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
    image: '/src/assets/images/gabes_oasis_chenini_1794999255057.jpg',
    imageCaption: {
      en: 'Three-tier agroforestry beneath golden afternoon light in Chenini, Gabès.',
      ar: 'نظام الزراعة ثلاثية الطوابق في واحة شنني قابس وقت الأصيل.',
      fr: 'Culture oasienne à trois étages sous la lumière dorée de Chenini.',
    },
    gallery: [
      {
        src: '/src/assets/images/gabes_oasis_chenini_1794999255057.jpg',
        caption: {
          en: 'Three-tier oasis gardens irrigated beneath towering date palms in Chenini.',
          ar: 'حدائق الواحة ثلاثية الطوابق المروية تحت ظلال النخيل في شنني.',
          fr: 'Jardins oasiens à trois étages irrigués sous les palmiers-dattiers.',
        },
      },
      {
        src: '/src/assets/images/gabes_jara_souk_crafts_1794999258465.jpg',
        caption: {
          en: 'Freshly harvested Gabès henna leaves and handwoven palm-frond baskets from the oasis.',
          ar: 'أوراق الحناء القابسية المقطوفة من الواحة وقفف السعف التقليدية.',
          fr: 'Feuilles de henné récoltées dans l’oasis et vannerie en palme tressée.',
        },
      },
      {
        src: '/src/assets/images/gabes_maritime_corniche_1794999256668.jpg',
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
        en: 'March – May & October – November',
        ar: 'مارس – ماي وأكتوبر – نوفمبر',
        fr: 'Mars – Mai & Octobre – Novembre',
      },
      access: {
        en: '10 min west of downtown Gabès',
        ar: '10 دقائق غرب وسط مدينة قابس',
        fr: '10 min à l’ouest du centre de Gabès',
      },
      highlight: {
        en: 'Golden-hour walk along the palm seguias',
        ar: 'نزهة وقت الغروب بجانب السواقي والظلال',
        fr: 'Promenade au coucher du soleil le long des seguias',
      },
    },
  },
  {
    id: 'matmata-troglodytes',
    slug: 'matmata-troglodyte-courtyards',
    delegationId: 'matmata',
    dimension: 'heritage',
    secondaryDimensions: ['geography', 'culture'],
    title: {
      en: 'Matmata Troglodyte Courtyards',
      ar: 'بيوت مطماطة المحفورة',
      fr: 'Maisons troglodytes de Matmata',
    },
    subtitle: {
      en: 'Subterranean earth architecture carved for silence and thermal harmony',
      ar: 'هندسة معمارية أمازيغية محفورة في قلب الصخر الرملي',
      fr: 'Architecture souterraine sculptée dans la terre ocre',
    },
    coordinates: { lat: 33.5444, lng: 9.9717 },
    elevationMeters: 420,
    image: '/src/assets/images/gabes_matmata_troglodyte_1794999256442.jpg',
    imageCaption: {
      en: 'Open-sky courtyard craters connecting cool sandstone rooms in Matmata.',
      ar: 'فناء مفتوح تحيط به الغرف المنحوتة في الصخر بمطماطة القديمة.',
      fr: 'Cratère à ciel ouvert desservant les pièces creusées dans le grès à Matmata.',
    },
    gallery: [
      {
        src: '/src/assets/images/gabes_matmata_troglodyte_1794999256442.jpg',
        caption: {
          en: 'Open-sky troglodyte crater courtyards carved into warm ochre sandstone.',
          ar: 'الأفنية الدائرية المفتوحة المحفورة في الصخر الرملي الدافئ بمطماطة.',
          fr: 'Cours troglodytes à ciel ouvert creusées dans le grès ocre.',
        },
      },
      {
        src: '/src/assets/images/gabes_toujane_village_1794999257994.jpg',
        caption: {
          en: 'Surrounding Matmata ridge villages built from dry-stone terraces.',
          ar: 'القرى الجبلية المجاورة في مرتفعات مطماطة المشيدة بالحجارة الجافة.',
          fr: 'Villages perchés voisins des crêtes de Matmata en pierre sèche.',
        },
      },
      {
        src: '/src/assets/images/gabes_oudhref_margoum_1795010551117.jpg',
        caption: {
          en: 'Traditional southern Amazigh wool weaving preserved across mountain homes.',
          ar: 'نسيج الصوف الأمازيغي التقليدي المحفوظ في بيوت الجبل.',
          fr: 'Tissage amazigh traditionnel conservé dans les demeures du Sud.',
        },
      },
    ],
    summary: {
      en: 'Centuries-old underground dwellings hollowed into ochre sandstone, staying cool through Saharan summers and warm in winter.',
      ar: 'مساكن تاريخية منحوتة في الصخر الرملي تحافظ طبيعياً على اعتدال الحرارة طوال الفصول.',
      fr: 'Demeures séculaires creusées dans la roche tendre, offrant une fraîcheur naturelle toute l’année.',
    },
    storyLead: {
      en: 'Instead of building upward against the wind, Matmata’s Amazigh builders carved downward into the living earth.',
      ar: 'بدل البناء نحو الأعلى في مواجهة الرياح، حفر سكان مطماطة بيوتهم داخل الأرض.',
      fr: 'Plutôt que d’ériger des murs face au vent, les bâtisseurs amazighs ont sculpté le sous-sol.',
    },
    storyBody: {
      en: 'Each home begins with a deep circular courtyard open to the sky. From its base, vaulted bedrooms, kitchens, and grain storage rooms radiate outward into thick compacted earth. Whitewashed arches and blue threshold motifs frame each doorway, blending bioclimatic genius with enduring family hospitality.',
      ar: 'يبدأ كل بيت بحفرة دائرية واسعة مفتوحة على السماء، تتفرع من قاعدتها غرف المعيشة والمطابخ ومخازن الحبوب داخل الجبل. وتُطلى مداخل الغرف بالجير الأبيض وتُزين برموز أمازيغية لحفظ البركة والهوية.',
      fr: 'Chaque maison s’articule autour d’une cour circulaire à ciel ouvert d’où rayonnent chambres voûtées et greniers. Les portes blanchies à la chaux portent des motifs protecteurs amazighs.',
    },
    culturalNote: {
      en: 'Known across world cinema yet deeply rooted in Amazigh oral heritage, olive-press traditions, and rosemary-infused bread.',
      ar: 'ارتبطت مطماطة بالسينما العالمية لكنها تظل رمزاً حياً للضيافة الأمازيغية وخبز الطابونة وزيت الزيتون.',
      fr: 'Célèbre au cinéma mondial, Matmata demeure avant tout un haut lieu d’hospitalité amazighe.',
    },
    localLife: {
      en: 'Families welcome travelers into courtyard homes with wild thyme tea, freshly baked tabouna bread, honey, and olive oil.',
      ar: 'استقبال الزوار داخل البيوت التقليدية مع الشاي بالزعتر وخبز الطابونة والعسل الجبلي.',
      fr: 'Accueil chez l’habitant autour du thé au thym, du pain tabouna chaud et du miel.',
    },
    visitingInfo: {
      bestSeason: {
        en: 'February – May & September – December',
        ar: 'فيفري – ماي وسبتمبر – ديسمبر',
        fr: 'Février – Mai & Septembre – Décembre',
      },
      access: {
        en: '42 km southwest of Gabès city via scenic plateau road',
        ar: '42 كم جنوب غرب مدينة قابس عبر طريق جبلي بانورامي',
        fr: '42 km au sud-ouest de Gabès par la route du plateau',
      },
      highlight: {
        en: 'Morning courtyard light & Berber heritage rooms',
        ar: 'أشعة الصباح في الأفنية المحفورة وتقاليد الضيافة',
        fr: 'Lumière matinale dans les cours et maisons d’hôtes',
      },
    },
  },
  {
    id: 'souk-el-jara',
    slug: 'souk-el-jara-crafts',
    delegationId: 'gabes-ville',
    dimension: 'local_life',
    secondaryDimensions: ['culture', 'stories'],
    title: {
      en: 'Souk El Jara & Henna Guilds',
      ar: 'سوق جارة وحرف الحناء',
      fr: 'Souk El Jara & artisans du henné',
    },
    subtitle: {
      en: 'Arched alleys of palm-leaf baskets, earthen pottery, and desert spices',
      ar: 'أزقة عتيقة تفوح بعبق الحناء القابسية والسعف والفخار',
      fr: 'Allées voûtées de vannerie, poteries et épices du Sud',
    },
    coordinates: { lat: 33.8828, lng: 10.0961 },
    elevationMeters: 8,
    image: '/src/assets/images/gabes_jara_souk_crafts_1794999258465.jpg',
    imageCaption: {
      en: 'Woven palm qoffa baskets, dried Gabès henna leaves, and terracotta vessels at Souk El Jara.',
      ar: 'سلال السعف القفف، أوراق الحناء القابسية والفخار التقليدي في سوق جارة.',
      fr: 'Couffins tressés, feuilles de henné de Gabès et poteries au Souk El Jara.',
    },
    gallery: [
      {
        src: '/src/assets/images/gabes_jara_souk_crafts_1794999258465.jpg',
        caption: {
          en: 'Sunlit stone arches framing palm baskets, spices, and dried Gabès henna.',
          ar: 'أقواس السوق الحجرية وتفاصيل الحناء القابسية والقفف والفخار.',
          fr: 'Arcades de pierre abritant vannerie, épices et henné séché de Gabès.',
        },
      },
      {
        src: '/src/assets/images/gabes_oudhref_margoum_1795010551117.jpg',
        caption: {
          en: 'Regional margoum wool rugs brought from northern Gabès artisan workshops.',
          ar: 'منسوجات المرقوم القادمة من ورشات الحرفيات بشمال الولاية.',
          fr: 'Tapis margoum issus des ateliers artisanaux du nord de Gabès.',
        },
      },
      {
        src: '/src/assets/images/gabes_sidi_boulbaba_1795010551490.jpg',
        caption: {
          en: 'Historic whitewashed heritage courtyards just minutes from Jara market.',
          ar: 'المعالم التاريخية والأروقة البيضاء القريبة من سوق جارة.',
          fr: 'Cours patrimoniales historiques à quelques minutes du marché de Jara.',
        },
      },
    ],
    summary: {
      en: 'The beating commercial and artisanal pulse of Gabès, celebrated across Tunisia for pure oasis henna and woven palm crafts.',
      ar: 'القلب التجاري والحرفي النابض في قابس، المشهور وطنيا بالحناء الأصيلة وصناعة السعف.',
      fr: 'Le cœur commerçant et artisanal de Gabès, réputé dans toute la Tunisie pour son henné pur.',
    },
    storyLead: {
      en: 'Every morning in Jara, weavers and herbalists arrange centuries of oasis craft beneath vaulted stone arches.',
      ar: 'كل صباح في جارة، يرصّ الحرفيون والعشابون إرث قرون من مهارات الواحة تحت الأقواس الحجرية.',
      fr: 'Chaque matin à Jara, vanniers et herboristes déploient un savoir-faire oasien séculaire.',
    },
    storyBody: {
      en: 'Souk El Jara bridges sea trade and caravan routes. Its stalls showcase deep-green Gabèsian henna leaves prized for bridal ceremonies, tightly braided halfa and palm-frond baskets, hand-thrown clay tajines, and aromatic mixtures of cumin, coriander, and dried desert roses.',
      ar: 'يربط سوق جارة تاريخياً بين تجارة البحر ومسالك القوافل. تعرض دكاكينه الحناء القابسية الخضراء المطلوبة في الأعراس التونسية، والقفف المنسوجة من سعف النخيل والحلفاء، وأواني الفخار والتوابل العطرية.',
      fr: 'Souk El Jara relie négoce maritime et routes caravanières. On y trouve le célèbre henné vert de Gabès, des paniers en palme tressée, des poteries en terre cuite et des épices parfumées.',
    },
    culturalNote: {
      en: 'Gabès henna carries Geographical Indication recognition—an emblem of regional pride and women’s artisanal mastery.',
      ar: 'تحمل الحناء القابسية علامة المنشأ المميّز بوصفها رمزاً للهوية والبراعة النسائية بالجهة.',
      fr: 'Le henné de Gabès bénéficie d’une reconnaissance d’origine, fierté culturelle de toute la région.',
    },
    localLife: {
      en: 'Morning bargaining, spice grinding, custom basket weaving, and neighborhood cafés echoing with local stories.',
      ar: 'حركية الصباح، طحن التوابل الطازجة، وحكايات الكبار في المقاهي الشعبية المجاورة.',
      fr: 'Effervescence matinale, mouture d’épices et discussions animées autour des cafés voisins.',
    },
    visitingInfo: {
      bestSeason: {
        en: 'Year-round (liveliest mornings 08:30–13:00)',
        ar: 'طوال السنة (الذروة صباحاً من 8:30 إلى 13:00)',
        fr: 'Toute l’année (le matin de 8h30 à 13h00)',
      },
      access: {
        en: 'Central Jara district, walkable from Gabès Medina',
        ar: 'حي جارة العتيق بوسط مدينة قابس',
        fr: 'Quartier historique de Jara, au centre de Gabès',
      },
      highlight: {
        en: 'Pure oasis henna, halfa baskets & terracotta stalls',
        ar: 'أوراق الحناء الأصلية، قفف السعف والفخار التقليدي',
        fr: 'Henné de l’oasis, vannerie et étals d’épices',
      },
    },
  },
  {
    id: 'gulf-of-gabes-corniche',
    slug: 'gulf-of-gabes-shoreline',
    delegationId: 'mareth',
    dimension: 'geography',
    secondaryDimensions: ['nature', 'experiences'],
    title: {
      en: 'Gulf of Gabès & Zarat Coast',
      ar: 'خليج قابس وساحل الزارات',
      fr: 'Golfe de Gabès & littoral de Zarat',
    },
    subtitle: {
      en: 'Tidal Mediterranean waters, golden dunes, and wooden fishing boats',
      ar: 'الموقع الساحلي الوحيد بالمتوسط ذو المدّ والجزر الواضح وقوارب الصيد الخشبية',
      fr: 'Eaux tidales de Méditerranée, dunes dorées et barques de pêche',
    },
    coordinates: { lat: 33.6692, lng: 10.351 },
    elevationMeters: 2,
    image: '/src/assets/images/gabes_maritime_corniche_1794999256668.jpg',
    imageCaption: {
      en: 'Traditional wooden fishing boats resting along the calm Gulf of Gabès shoreline at dusk.',
      ar: 'قوارب الصيد التقليدية على رمال خليج قابس عند الغروب.',
      fr: 'Barques traditionnelles sur le rivage paisible du golfe de Gabès au crépuscule.',
    },
    gallery: [
      {
        src: '/src/assets/images/gabes_maritime_corniche_1794999256668.jpg',
        caption: {
          en: 'Wooden fishing boats moored along the tidal sands of Zarat and Gabès.',
          ar: 'قوارب الصيد الخشبية على رمال خليج قابس وساحل الزارات.',
          fr: 'Barques de pêche en bois sur les rivages à marée du golfe.',
        },
      },
      {
        src: '/src/assets/images/gabes_oasis_chenini_1794999255057.jpg',
        caption: {
          en: 'Coastal palm groves rising just steps inland from the Mediterranean shore.',
          ar: 'واحات النخيل الساحلية الممتدة على مقربة من شاطئ البحر.',
          fr: 'Palmeraie côtière s’élevant à quelques pas du littoral méditerranéen.',
        },
      },
      {
        src: '/src/assets/images/gabes_sidi_boulbaba_1795010551490.jpg',
        caption: {
          en: 'Warm evening light over historic whitewashed architecture near the coast.',
          ar: 'أضواء الغروب على العمارة التراثية القريبة من الساحل.',
          fr: 'Lumière du soir sur le patrimoine blanchi à la chaux près du littoral.',
        },
      },
    ],
    summary: {
      en: 'Known since antiquity as Syrtis Minor, the Gulf of Gabès features the strongest tidal rhythm in the entire Mediterranean.',
      ar: 'عُرف قديماً بسيرت الصغرى، ويتميز بأقوى ظاهرة مدّ وجزر في حوض البحر الأبيض المتوسط.',
      fr: 'Connu sous le nom de Petite Syrte, le golfe possède les marées les plus marquées de Méditerranée.',
    },
    storyLead: {
      en: 'Twice a day, the sea retreats gently across shallow golden flats, revealing ancient intertidal fishing grounds.',
      ar: 'مرتين في اليوم، ينحسر البحر برفق كاشفاً عن مسطحات رملية غنية بالحياة البحرية.',
      fr: 'Deux fois par jour, la mer se retire doucement sur les hauts-fonds sablonneux du golfe.',
    },
    storyBody: {
      en: 'From Ghannouch and Gabès Corniche down to Zarat, the coastline defines the rhythm of coastal families. Fishermen still mend nets by hand along painted wooden boats, using passive tidal traps called charfia to harvest sea bream, octopus, and cuttlefish in harmony with the moon.',
      ar: 'من شاطئ غنوش وكورنيش قابس حتى الزارات، يرسم البحر إيقاع الحياة اليومية. ما زال البحارة يصلحون شباكهم بجانب الفلوكات الخشبية ويعتمدون تقنيات الصيد الساحلي التقليدي المرتبطة بدورة القمر.',
      fr: 'De Ghannouch à Zarat, la côte rythme la vie des familles maritimes. Les pêcheurs réparent leurs filets près des barques peintes et perpétuent la pêche côtière traditionnelle.',
    },
    culturalNote: {
      en: 'Coastal Gabès cuisine pairs grilled Mediterranean fish with oasis vegetables, barley couscous, and fiery southern harissa.',
      ar: 'يمزج المطبخ الساحلي القابسي بين السمك الطازج وكسكسي الشعير والهريسة العربي وخضروات الواحة.',
      fr: 'La gastronomie côtière marie poissons grillés, couscous d’orge et harissa traditionnelle.',
    },
    localLife: {
      en: 'Sunrise harbor landings, evening family walks along the corniche, and quiet beaches stretching south toward Djerba.',
      ar: 'وصول مراكب الصيد فجراً ونزهات العائلات على الكورنيش وقت الغروب.',
      fr: 'Retour des barques à l’aube et promenades familiales au coucher du soleil.',
    },
    visitingInfo: {
      bestSeason: {
        en: 'May – October for swimming; all year for sunsets',
        ar: 'ماي – أكتوبر للسباحة وطوال السنة للنزهات الساحلية',
        fr: 'Mai – Octobre pour la baignade ; toute l’année pour les balades',
      },
      access: {
        en: 'Gabès Corniche (city) & Zarat Beach (30 min south)',
        ar: 'كورنيش قابس (وسط المدينة) وشاطئ الزارات (30 دق جنوباً)',
        fr: 'Corniche de Gabès et plage de Zarat (30 min au sud)',
      },
      highlight: {
        en: 'Painted wooden boats & golden-hour horizon',
        ar: 'قوارب الصيد التقليدية وأفق الغروب فوق الخليج',
        fr: 'Barques traditionnelles et horizon doré sur le golfe',
      },
    },
  },
  {
    id: 'toujane-village',
    slug: 'toujane-cliffside-village',
    delegationId: 'nouvelle-matmata',
    dimension: 'stories',
    secondaryDimensions: ['heritage', 'culture'],
    title: {
      en: 'Toujane Cliffside Village',
      ar: 'قرية توجان الجبلية',
      fr: 'Village perché de Toujane',
    },
    subtitle: {
      en: 'Dry-stone houses cascading across twin mountain ridges',
      ar: 'بيوت حجرية متدرجة فوق سفوح جبال مطماطة',
      fr: 'Maisons en pierre sèche accrochées aux crêtes',
    },
    coordinates: { lat: 33.4686, lng: 10.1303 },
    elevationMeters: 540,
    image: '/src/assets/images/gabes_toujane_village_1794999257994.jpg',
    imageCaption: {
      en: 'Terraced dry-stone homes of Toujane overlooking the southern valley in Gabès Governorate.',
      ar: 'العمارة الجبلية الحجرية لقرية توجان المطلة على وديان الجنوب.',
      fr: 'Architecture de pierre sèche à Toujane dominant la vallée méridionale.',
    },
    gallery: [
      {
        src: '/src/assets/images/gabes_toujane_village_1794999257994.jpg',
        caption: {
          en: 'Dry-stone Amazigh houses stepping down the limestone slopes of Toujane.',
          ar: 'البيوت الحجرية الأمازيغية المتدرجة على سفوح جبال توجان.',
          fr: 'Maisons en pierre sèche s’étageant sur les versants calcaires de Toujane.',
        },
      },
      {
        src: '/src/assets/images/gabes_matmata_troglodyte_1794999256442.jpg',
        caption: {
          en: 'Neighboring troglodyte craters across the Matmata highland road.',
          ar: 'العمارة التحت أرضية المجاورة على طول الطريق الجبلي لمطماطة.',
          fr: 'Habitations troglodytes voisines le long de la route des plateaux.',
        },
      },
      {
        src: '/src/assets/images/gabes_oudhref_margoum_1795010551117.jpg',
        caption: {
          en: 'Hand-spun crimson and ochre wool textiles woven in mountain cooperatives.',
          ar: 'أغطية الكليم والمنسوجات الصوفية الحمراء المنسوجة يدوياً.',
          fr: 'Textiles en laine filée main tissés dans les coopératives de montagne.',
        },
      },
    ],
    summary: {
      en: 'One of southern Tunisia’s most poetic Amazigh villages, perched on limestone cliffs overlooking sweeping valleys.',
      ar: 'من أجمل القرى الأمازيغية الجبلية في الجنوب، تتعانق فيها البيوت الحجرية مع الصخر والوادي.',
      fr: 'L’un des plus beaux villages amazighs du Sud, blotti sur les crêtes calcaires.',
    },
    storyLead: {
      en: 'Built from the very stone of the mountain, Toujane appears at first glance to grow straight out of the cliff.',
      ar: 'بُنيت توجان من حجارة الجبل نفسها حتى لتبدو جزءاً طبيعياً من الصخر.',
      fr: 'Bâtie avec la pierre même de la montagne, Toujane semble émerger de la falaise.',
    },
    storyBody: {
      en: 'Split across a rugged valley into upper and lower quarters, Toujane safeguards mountain rainwater cisterns (majel), terraced olive plots, and women’s cooperatives weaving red-and-ochre klim carpets. Every stone alley frames panoramic views stretching from the Dahar hills toward the Gulf.',
      ar: 'تنقسم توجان على ضفتي الوادي، وتحتفظ بنظام الماجل لتجميع مياه الأمطار ومدرجات الزيتون وتعاونيات النساء لنسج الكليم والبطانيات الصوفية. وتفتح أزقتها على مشاهد جبلية تمتد نحو الأفق.',
      fr: 'Divisée de part et d’autre du ravin, Toujane préserve ses citernes pluviales (majel), ses terrasses d’oliviers et ses ateliers féminins de tissage de klim rouge et ocre.',
    },
    culturalNote: {
      en: 'Renowned for pure wild rosemary mountain honey, hand-spun wool textiles, and timeless Amazigh hospitality.',
      ar: 'تشتهر القرية بعسل الإكليل الجبلي الأصيل ونسيج الصوف اليدوي وكرم أهلها.',
      fr: 'Réputée pour son miel sauvage de romarin, ses lainages filés main et son accueil chaleureux.',
    },
    localLife: {
      en: 'Artisan loom visits, mountain ridge viewpoints, and quiet conversations with village elders.',
      ar: 'زيارة ورش النسيج والتأمل من الشرفات الجبلية والحديث مع شيوخ القرية.',
      fr: 'Visites d’ateliers de tissage, belvédères panoramiques et rencontres avec les habitants.',
    },
    visitingInfo: {
      bestSeason: {
        en: 'March – May & September – November',
        ar: 'مارس – ماي وسبتمبر – نوفمبر',
        fr: 'Mars – Mai & Septembre – Novembre',
      },
      access: {
        en: '55 km south of Gabès via Mareth or Matmata mountain road',
        ar: '55 كم جنوب قابس عبر طريق مارث أو مطماطة الجبلي',
        fr: '55 km au sud de Gabès via Mareth ou Matmata',
      },
      highlight: {
        en: 'Panoramic ridge overlook & artisan klim workshops',
        ar: 'الإطلالة الجبلية الساحرة وورش نسج الكليم',
        fr: 'Belvédère sur la vallée et ateliers de tissage',
      },
    },
  },
  {
    id: 'el-hamma-springs',
    slug: 'el-hamma-thermal-oasis',
    delegationId: 'el-hamma',
    dimension: 'experiences',
    secondaryDimensions: ['nature', 'heritage'],
    title: {
      en: 'El Hamma Thermal Springs',
      ar: 'عيون الحامة الحارة',
      fr: 'Sources thermales d’El Hamma',
    },
    subtitle: {
      en: 'Geothermal oasis waters treasured since Roman Aquae Tacapitanae',
      ar: 'ينابيع استشفائية دافئة وواحات خضراء على مشارف الصحراء',
      fr: 'Eaux géothermales bienfaisantes depuis l’antique Aquae Tacapitanae',
    },
    coordinates: { lat: 33.8915, lng: 9.7963 },
    elevationMeters: 62,
    image: '/src/assets/images/gabes_el_hamma_springs_1795010550586.jpg',
    imageCaption: {
      en: 'Morning steam rising over mineral thermal pools beneath palm trees in El Hamma.',
      ar: 'بخار الفجر الدافئ فوق أحواض المياه المعدنية وظلال النخيل في الحامة.',
      fr: 'Vapeur matinale au-dessus des bassins thermaux et palmiers d’El Hamma.',
    },
    gallery: [
      {
        src: '/src/assets/images/gabes_el_hamma_springs_1795010550586.jpg',
        caption: {
          en: 'Geothermal water channels and limestone steps framed by date palms at dawn.',
          ar: 'قنوات المياه الحارة والمدرجات الحجرية وسط النخيل عند شروق الشمس.',
          fr: 'Canaux d’eau géothermale et marches calcaires sous les palmiers à l’aube.',
        },
      },
      {
        src: '/src/assets/images/gabes_oasis_chenini_1794999255057.jpg',
        caption: {
          en: 'Lush oasis plots watered by natural springs on the desert frontier.',
          ar: 'بساتين الواحة الخصبة المروية بالعيون الطبيعية على مشارف الصحراء.',
          fr: 'Jardins oasiens irrigués par les sources naturelles aux portes du désert.',
        },
      },
      {
        src: '/src/assets/images/gabes_jara_souk_crafts_1794999258465.jpg',
        caption: {
          en: 'Natural desert herbs, clay pots, and market spices from Gabès Governorate.',
          ar: 'الأعشاب الطبيعية والفخار والتوابل الأصيلة من أسواق الجهة.',
          fr: 'Herbes du désert, poteries et épices traditionnelles du gouvernorat.',
        },
      },
    ],
    summary: {
      en: 'Mineral-rich thermal springs emerging beneath desert-edge palm groves, uniting wellness traditions with ancient Roman history.',
      ar: 'عيون معدنية دافئة تنبع وسط الواحة وتجمع بين السياحة الاستشفائية والتاريخ الروماني.',
      fr: 'Sources minérales chaudes jaillissant sous les palmiers, entre thermalisme et histoire antique.',
    },
    storyLead: {
      en: 'Steam rises softly at dawn over El Hamma’s pools, where travelers have rested for over two millennia.',
      ar: 'يرتفع البخار الدافئ عند الفجر فوق أحواض الحامة التي استقبلت المسافرين منذ ألفي عام.',
      fr: 'À l’aube, une brume tiède s’élève des bassins où les voyageurs se reposent depuis deux millénaires.',
    },
    storyBody: {
      en: 'Known to the Romans as Aquae Tacapitanae, El Hamma sits at the crossroads between Gabès’s coast and the Chott El Fejej salt flats. Today, families and visitors gather at its traditional hammams and thermal baths before exploring surrounding palm gardens.',
      ar: 'عُرفت في العهد الروماني باسم أكوا تاكابيتانا، وتقع الحامة على الطريق الرابط بين ساحل قابس وشط الفجاج. يقصدها الزوار للاستشفاء في الحمامات المعدنية والاستمتاع بهدوء واحاتها.',
      fr: 'Nommée Aquae Tacapitanae à l’époque romaine, El Hamma relie le golfe aux étendues de Chott El Fejej. Ses bains thermaux accueillent visiteurs et habitants tout au long de l’année.',
    },
    culturalNote: {
      en: 'Thermal bathing rituals remain central to seasonal gatherings, traditional weddings, and winter wellness travel.',
      ar: 'تظل طقوس الاستحمام بالماء الحار جزءاً أصيلاً من التقاليد الاجتماعية والرحلات الشتوية.',
      fr: 'Les bains thermaux rythment la vie sociale et les séjours hivernaux de bien-être.',
    },
    localLife: {
      en: 'Early-morning hammam sessions, bustling date markets, and warm desert sunsets toward Kebili.',
      ar: 'جلسات الاستشفاء الصباحية وأسواق التمور وإطلالات الغروب نحو الغرب.',
      fr: 'Bains matinaux, marchés aux dattes et couchers de soleil vers le désert.',
    },
    visitingInfo: {
      bestSeason: {
        en: 'October – April (ideal thermal weather)',
        ar: 'أكتوبر – أفريل (أفضل موسم للمياه الحارة)',
        fr: 'Octobre – Avril (saison idéale pour les thermes)',
      },
      access: {
        en: '30 km west of Gabès city along national road GP16',
        ar: '30 كم غرب مدينة قابس عبر الطريق الوطنية 16',
        fr: '30 km à l’ouest de Gabès par la route GP16',
      },
      highlight: {
        en: 'Natural geothermal baths & oasis gardens',
        ar: 'الحمامات المعدنية الطبيعية وواحة الحامة',
        fr: 'Sources chaudes naturelles et jardins d’oasis',
      },
    },
  },
  {
    id: 'oudhref-weaving',
    slug: 'oudhref-margoum-looms',
    delegationId: 'oudhref',
    dimension: 'culture',
    secondaryDimensions: ['local_life', 'stories'],
    title: {
      en: 'Oudhref Margoum & Klim Looms',
      ar: 'نسيج وذرف التقليدي',
      fr: 'Métiers à tisser d’Oudhref',
    },
    subtitle: {
      en: 'Geometric wool storytelling woven by master women artisans',
      ar: 'حكايات الصوف والهندسة الأمازيغية بأنامل حرفيات وذرف',
      fr: 'Récits géométriques en laine tissés par les maîtres artisanes',
    },
    coordinates: { lat: 33.9875, lng: 9.9614 },
    elevationMeters: 22,
    image: '/src/assets/images/gabes_oudhref_margoum_1795010551117.jpg',
    imageCaption: {
      en: 'Master weaver working geometric crimson and saffron wool patterns in Oudhref.',
      ar: 'حرفية تنسج نقوش المرقوم الهندسية باللونين القرمزي والزعفراني في وذرف.',
      fr: 'Tisserande réalisant les motifs géométriques du margoum sur métier vertical à Oudhref.',
    },
    gallery: [
      {
        src: '/src/assets/images/gabes_oudhref_margoum_1795010551117.jpg',
        caption: {
          en: 'Upright wooden loom weaving ancestral Amazigh diamond motifs in Oudhref.',
          ar: 'السداة الخشبية التقليدية ونسيج الأشكال المعينة الأمازيغية في وذرف.',
          fr: 'Métier vertical en bois tissant les losanges ancestraux d’Oudhref.',
        },
      },
      {
        src: '/src/assets/images/gabes_jara_souk_crafts_1794999258465.jpg',
        caption: {
          en: 'Finished crafts and natural botanical dyes displayed in regional souks.',
          ar: 'المنتجات الحرفية والأصباغ النباتية الطبيعية في أسواق قابس.',
          fr: 'Créations artisanales et teintures botaniques exposées dans les souks.',
        },
      },
      {
        src: '/src/assets/images/gabes_toujane_village_1794999257994.jpg',
        caption: {
          en: 'Shared southern textile heritage stretching from northern oases to mountain villages.',
          ar: 'تراث النسيج المشترك الممتد من واحات الشمال إلى القرى الجبلية.',
          fr: 'Patrimoine textile partagé entre les oasis du nord et les villages de montagne.',
        },
      },
    ],
    summary: {
      en: 'An oasis town whose women weavers keep alive Tunisia’s most recognizable geometric margoum and klim tapestry traditions.',
      ar: 'مدينة واحية تحفظ نساءها فن المرقوم والكليم برسومه الهندسية الأصيلة.',
      fr: 'Ville oasienne où les tisserandes perpétuent l’art du margoum et du klim géométrique.',
    },
    storyLead: {
      en: 'On upright wooden looms in Oudhref, every diamond and zigzag motif encodes memory, family, and protection.',
      ar: 'على السداة الخشبية في وذرف، يحمل كل شكل معين أو خط متعرج معنى من الذاكرة والهوية.',
      fr: 'Sur les métiers verticaux d’Oudhref, chaque losange et chevron porte une mémoire familiale.',
    },
    storyBody: {
      en: 'Colored with pomegranate rind, madder root, and desert herbs, Oudhref textiles blend crisp ivory wool with deep crimson, indigo, and saffron. Today, artisan workshops connect rural weavers directly with designers, museums, and cultural travelers.',
      ar: 'تُصبغ الخيوط بقشور الرمان وأعشاب الصحراء، لتمتزج ألوان الأبيض العاجي والأحمر القاني والزعفران في قطع فنية تسافر من وذرف إلى المعارض العالمية.',
      fr: 'Teintes à l’écorce de grenade et aux plantes locales, les laines mêlent ivoire, carmin et safran dans des pièces uniques destinées aux galeries et voyageurs.',
    },
    culturalNote: {
      en: 'Weaving songs traditionally accompany the rhythmic beat of the wooden comb (khallala) on the loom.',
      ar: 'ترافق أغاني التراث إيقاع الخلالة الخشبية أثناء شدّ خيوط السداة.',
      fr: 'Des chants traditionnels accompagnent le battement rythmé du peigne sur le métier.',
    },
    localLife: {
      en: 'Home weaving studios, cooperative showrooms, and peaceful palm-shaded lanes.',
      ar: 'ورشات النسيج العائلية وقاعات عرض التعاونيات وأزقة الواحة الهادئة.',
      fr: 'Ateliers familiaux, coopératives d’artisanes et ruelles ombragées.',
    },
    visitingInfo: {
      bestSeason: {
        en: 'Year-round',
        ar: 'طوال السنة',
        fr: 'Toute l’année',
      },
      access: {
        en: '18 km northwest of Gabès city',
        ar: '18 كم شمال غرب مدينة قابس',
        fr: '18 km au nord-ouest de Gabès',
      },
      highlight: {
        en: 'Live loom demonstrations & natural dye ateliers',
        ar: 'عروض حية للنسيج اليدوي والأصباغ الطبيعية',
        fr: 'Démonstrations de tissage et teintures végétales',
      },
    },
  },
  {
    id: 'sidi-boulbaba-tacapes',
    slug: 'tacapes-sidi-boulbaba',
    delegationId: 'gabes-sud',
    dimension: 'heritage',
    secondaryDimensions: ['stories', 'culture'],
    title: {
      en: 'Ancient Tacapes & Sidi Boulbaba',
      ar: 'تاكابيس ومقام سيدي بولبابة',
      fr: 'Antique Tacapes & Sidi Boulbaba',
    },
    subtitle: {
      en: 'Roman maritime crossroads and spiritual landmark of southern Tunisia',
      ar: 'شاهد على عراقة تاكابيس الرومانية والمعلم الروحي لولاية قابس',
      fr: 'Carrefour antique de Tacapes et haut lieu spirituel de Gabès',
    },
    coordinates: { lat: 33.8645, lng: 10.1008 },
    elevationMeters: 12,
    image: '/src/assets/images/gabes_sidi_boulbaba_1795010551490.jpg',
    imageCaption: {
      en: 'Whitewashed domes and arched limestone colonnade of Sidi Boulbaba in Gabès South.',
      ar: 'القباب البيضاء والأقواس الحجرية لمقام سيدي بولبابة في قابس الجنوبية.',
      fr: 'Coupoles blanchies à la chaux et colonnade voûtée de Sidi Boulbaba.',
    },
    gallery: [
      {
        src: '/src/assets/images/gabes_sidi_boulbaba_1795010551490.jpg',
        caption: {
          en: 'Sunlit courtyard arches and domes of Sidi Boulbaba heritage sanctuary.',
          ar: 'أقواس الفناء المشمس وقباب معلم سيدي بولبابة التاريخي.',
          fr: 'Arcades ensoleillées et coupoles du sanctuaire historique Sidi Boulbaba.',
        },
      },
      {
        src: '/src/assets/images/gabes_maritime_corniche_1794999256668.jpg',
        caption: {
          en: 'Gulf shoreline navigated since the era of Roman Tacapes.',
          ar: 'شواطئ الخليج التي احتضنت ميناء تاكابيس الرومانية قديماً.',
          fr: 'Rivages du golfe fréquentés depuis l’époque de l’antique Tacapes.',
        },
      },
      {
        src: '/src/assets/images/gabes_oasis_chenini_1794999255057.jpg',
        caption: {
          en: 'Lush southern palm gardens celebrated in Pliny the Elder’s historical accounts.',
          ar: 'البساتين الغنّاء التي دوّنها المؤرخون القدامى كأعجوبة زراعية.',
          fr: 'Jardins luxuriants décrits dans les récits antiques de Pline l’Ancien.',
        },
      },
    ],
    summary: {
      en: 'Traces of Pliny’s famed multi-crop oasis city Tacapes alongside the historic mausoleum of Sidi Boulbaba.',
      ar: 'إرث مدينة تاكابيس الرومانية التي أبهرت المؤرخين القدامى، بجوار مقام سيدي بولبابة التاريخي.',
      fr: 'Mémoire de l’antique cité oasienne de Tacapes aux côtés du mausolée historique Sidi Boulbaba.',
    },
    storyLead: {
      en: 'Before the modern city rose around the gulf, Roman naturalists marveled at Tacapes’s lush tiered gardens.',
      ar: 'قبل نشأة المدينة الحديثة، سجّل الرحالة الرومان دهشتهم من خصوبة حدائق تاكابيس.',
      fr: 'Bien avant la ville moderne, les naturalistes romains s’émerveillaient des jardins de Tacapes.',
    },
    storyBody: {
      en: 'Pliny the Elder wrote in the 1st century CE of Tacapes’s miraculous oasis beneath date palms, vines, and figs. Nearby, the whitewashed domes and arched courtyards of Sidi Boulbaba stand as a revered spiritual and architectural anchor for the people of Gabès.',
      ar: 'وصف بلينيوس الأكبر في القرن الأول للميلاد خصوبة تاكابيس التي جمعت النخيل والكروم والتين والزيتون في بقعة واحدة. وعلى مقربة منها يقف مقام سيدي بولبابة بقبابه البيضاء كمعلم تاريخي وروحي جامع لأهالي الجهة.',
      fr: 'Pline l’Ancien décrivait au Ier siècle l’abondance miraculeuse de Tacapes. Non loin, les coupoles blanches de Sidi Boulbaba constituent un repère spirituel et architectural majeur.',
    },
    culturalNote: {
      en: 'Traditional religious chants, charitable gatherings, and historical memory intertwine across generations.',
      ar: 'تلتقي الأناشيد الروحية والتجمعات التراثية وذاكرة المدينة عبر القرون.',
      fr: 'Chants traditionnels et mémoire urbaine se croisent ici depuis des siècles.',
    },
    localLife: {
      en: 'Quiet courtyard mornings, neighborhood heritage walks, and proximity to university campuses.',
      ar: 'هدوء الساحات الصباحية وجولات استكشاف المعالم في قابس الجنوبية.',
      fr: 'Matinées paisibles dans les cours et promenades patrimoniales.',
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
    noResults: 'Aucun lieu ne correspond à ce filtre.',
    clearFilters: 'Réinitialiser les filtres',
  },
};
