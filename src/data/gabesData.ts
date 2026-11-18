/**
 * WE ARE GABÈS — corrected content draft
 *
 * Administrative structure: 13 official delegations.
 * IMPORTANT CONTENT QA:
 * - Some map centres are approximate display anchors, not official boundary centroids.
 * - Place coordinates/elevations, road distances, opening hours and seasonal advice still
 *   require GIS/local verification before public launch.
 * - NOT PUBLICATION-READY: replace and verify the El Hamma, Ouedhref, and Sidi Boulbaba
 *   image assignments. Current files are illustrative regional images, not verified
 *   photographs of those exact places. Do not publish them with place-specific captions.
 * - Historical/cultural descriptions have been softened where the original wording
 *   asserted details not established by the reviewed sources.
 * - Do not claim a protected Geographical Indication for Gabès henna without checking
 *   the current official register and supporting legal record.
 */
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
      en: 'A distinctive Mediterranean coastal oasis, shoreline landscapes, and thermal springs.',
      ar: 'الواحة الساحلية المميزة في المتوسط، والمشاهد الساحلية والعيون الحارة.',
      fr: 'Une oasis côtière remarquable en Méditerranée, des paysages littoraux et des sources thermales.',
    },
    accentHex: '#1f7d72',
  },
  {
    key: 'culture',
    label: { en: 'Culture', ar: 'الثقافة', fr: 'Culture' },
    description: {
      en: 'Local Amazigh and Arab traditions, craft practices, music, and hospitality.',
      ar: 'التقاليد المحلية الأمازيغية والعربية، والحرف والموسيقى والضيافة.',
      fr: 'Traditions locales amazighes et arabes, artisanat, musique et hospitalité du Sud.',
    },
    accentHex: '#b45309',
  },
  {
    key: 'heritage',
    label: { en: 'Heritage', ar: 'التراث', fr: 'Patrimoine' },
    description: {
      en: 'Traditional underground courtyard dwellings, Roman-era Tacapes, and stone-built mountain villages.',
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
    name: { en: 'Gabès Médina', ar: 'قابس المدينة', fr: 'Gabès Médina' },
    center: { lat: 33.8815, lng: 10.0982 },
    landscape: { en: 'Historic Urban Centre', ar: 'المركز الحضري التاريخي', fr: 'Centre urbain historique' },
    summary: {
      en: 'The urban centre of Gabès, including the historic Jara district and the wider Tacapes heritage area.',
      ar: 'المركز الحضري لقابس، ويشمل حي جارة التاريخي ومحيط التراث المرتبط بتاكابيس.',
      fr: 'Le centre urbain de Gabès, comprenant le quartier historique de Jara et le secteur patrimonial de Tacapes.',
    },
  },
  {
    id: 'gabes-ouest',
    name: { en: 'Gabès Ouest', ar: 'قابس الغربية', fr: 'Gabès Ouest' },
    center: { lat: 33.8768, lng: 10.0562 },
    landscape: { en: 'Coastal Oasis', ar: 'الواحة الساحلية', fr: 'Oasis côtière' },
    summary: {
      en: 'Includes the Chenini oasis area, known for its coastal oasis landscape and multi-layered cultivation.',
      ar: 'تضم منطقة واحة شنني المعروفة بمشهدها الواحي الساحلي ونظام الزراعة متعدد الطبقات.',
      fr: 'Comprend le secteur de l’oasis de Chenini, connu pour son paysage oasien côtier et ses cultures étagées.',
    },
  },
  {
    id: 'gabes-sud',
    name: { en: 'Gabès Sud', ar: 'قابس الجنوبية', fr: 'Gabès Sud' },
    center: { lat: 33.854, lng: 10.105 },
    landscape: { en: 'Southern Urban Area', ar: 'المجال الحضري الجنوبي', fr: 'Secteur urbain sud' },
    summary: {
      en: 'The southern part of the Gabès urban area, including the Sidi Boulbaba heritage site.',
      ar: 'الجزء الجنوبي من المجال الحضري لقابس، ويضم موقع سيدي بولبابة.',
      fr: 'La partie sud de l’agglomération de Gabès, comprenant le site patrimonial de Sidi Boulbaba.',
    },
  },
  {
    id: 'ghannouch',
    name: { en: 'Ghannouch', ar: 'غنوش', fr: 'Ghannouch' },
    center: { lat: 33.9389, lng: 10.0628 },
    landscape: { en: 'Northern Gulf Coast', ar: 'الساحل الشمالي للخليج', fr: 'Littoral nord du golfe' },
    summary: {
      en: 'A coastal delegation on the Gulf of Gabès, with fishing and coastal landscapes.',
      ar: 'معتمدية ساحلية على خليج قابس تتميز بالمشهد البحري ونشاط الصيد.',
      fr: 'Une délégation côtière du golfe de Gabès, marquée par les paysages maritimes et la pêche.',
    },
  },
  {
    id: 'el-metouia',
    name: { en: 'El Métouia', ar: 'المطوية', fr: 'El Métouia' },
    center: { lat: 33.96, lng: 10.0025 },
    landscape: { en: 'Oasis & Wetlands', ar: 'الواحة والمناطق الرطبة', fr: 'Oasis & zones humides' },
    summary: {
      en: 'An oasis delegation with agricultural landscapes and nearby seasonal wetland environments.',
      ar: 'معتمدية ذات طابع فلاحي وواحي، وبالقرب منها مناطق رطبة موسمية.',
      fr: 'Une délégation à caractère agricole et oasien, proche de zones humides saisonnières.',
    },
  },
  {
    id: 'ouedhref',
    name: { en: 'Ouedhref', ar: 'وذرف', fr: 'Ouedhref' },
    center: { lat: 33.9875, lng: 9.9614 },
    landscape: { en: 'Craft & Agricultural Heritage', ar: 'التراث الحرفي والفلاحي', fr: 'Patrimoine artisanal et agricole' },
    summary: {
      en: 'A delegation associated with local craft activity, including traditional wool weaving.',
      ar: 'معتمدية ترتبط بأنشطة حرفية محلية، من بينها النسيج التقليدي للصوف.',
      fr: 'Une délégation associée à des activités artisanales locales, notamment le tissage traditionnel de la laine.',
    },
  },
  {
    id: 'menzel-el-habib',
    name: { en: 'Menzel El Habib', ar: 'منزل الحبيب', fr: 'Menzel El Habib' },
    center: { lat: 34.20, lng: 9.95 }, // Approximate map focus; verify against an authoritative GIS layer.
    landscape: { en: 'Inland Rural Landscapes', ar: 'المشاهد الريفية الداخلية', fr: 'Paysages ruraux intérieurs' },
    summary: {
      en: 'An inland delegation of Gabès Governorate. Add locally verified points of interest before publishing detailed visitor information.',
      ar: 'معتمدية داخلية من ولاية قابس. تُضاف إليها المعالم ومعلومات الزيارة بعد التثبت محلياً.',
      fr: 'Une délégation intérieure du gouvernorat de Gabès. Ajouter des points d’intérêt après vérification locale.',
    },
  },
  {
    id: 'el-hamma',
    name: { en: 'El Hamma', ar: 'الحامة', fr: 'El Hamma' },
    center: { lat: 33.8915, lng: 9.7963 },
    landscape: { en: 'Thermal & Oasis Landscapes', ar: 'المشاهد الحرارية والواحية', fr: 'Paysages thermaux et oasiens' },
    summary: {
      en: 'Known for its thermal-water activity and oasis landscapes. Specific historical identifications should be supported by archaeological sources.',
      ar: 'معروفة بنشاط المياه الحارة ومشاهدها الواحية. يلزم مصدر أثري قبل اعتماد التفاصيل التاريخية.',
      fr: 'Connue pour ses eaux thermales et ses paysages oasiens. Les identifications historiques précises nécessitent des sources archéologiques.',
    },
  },
  {
    id: 'el-hamma-ouest',
    name: { en: 'El Hamma Ouest', ar: 'الحامة الغربية', fr: 'El Hamma Ouest' },
    center: { lat: 33.88, lng: 9.72 }, // Approximate map focus; verify against an authoritative GIS layer.
    landscape: { en: 'Western Rural Landscapes', ar: 'المشاهد الريفية الغربية', fr: 'Paysages ruraux de l’ouest' },
    summary: {
      en: 'An official delegation of Gabès Governorate. Detailed attractions and visitor information remain to be documented.',
      ar: 'معتمدية رسمية من ولاية قابس. ما زالت المعالم ومعلومات الزيارة التفصيلية بحاجة إلى توثيق.',
      fr: 'Une délégation officielle du gouvernorat de Gabès. Les sites et informations pratiques restent à documenter.',
    },
  },
  {
    id: 'matmata',
    name: { en: 'Matmata', ar: 'مطماطة', fr: 'Matmata' },
    center: { lat: 33.5444, lng: 9.9717 },
    landscape: { en: 'Troglodyte Highlands', ar: 'مرتفعات البيوت المحفورة', fr: 'Hauts plateaux troglodytiques' },
    summary: {
      en: 'Known for its distinctive underground courtyard dwellings and the surrounding highland landscape.',
      ar: 'معروفة بمساكنها ذات الأفنية المحفورة تحت الأرض وبمشهدها الجبلي.',
      fr: 'Connue pour ses habitations à cour creusées dans le sol et ses paysages de hauteur.',
    },
  },
  {
    id: 'nouvelle-matmata',
    name: { en: 'Nouvelle Matmata', ar: 'مطماطة الجديدة', fr: 'Nouvelle Matmata' },
    center: { lat: 33.56, lng: 10.05 },
    landscape: { en: 'Highland Settlement', ar: 'تجمعات المرتفعات', fr: 'Habitat des hauteurs' },
    summary: {
      en: 'An official delegation distinct from Matmata and Dekhilet Toujane.',
      ar: 'معتمدية رسمية مستقلة عن مطماطة ودخيلة توجان.',
      fr: 'Une délégation officielle distincte de Matmata et de Dekhilet Toujane.',
    },
  },
  {
    id: 'mareth',
    name: { en: 'Mareth', ar: 'مارث', fr: 'Mareth' },
    center: { lat: 33.6331, lng: 10.2928 },
    landscape: { en: 'Coastal & Agricultural Landscapes', ar: 'المشاهد الساحلية والفلاحية', fr: 'Paysages côtiers et agricoles' },
    summary: {
      en: 'A delegation extending to coastal sectors including Zarat; Zarat is not a separate delegation.',
      ar: 'معتمدية تضم قطاعات ساحلية من بينها الزارات؛ والزارات ليست معتمدية مستقلة.',
      fr: 'Une délégation comprenant des secteurs côtiers dont Zarat ; Zarat n’est pas une délégation distincte.',
    },
  },
  {
    id: 'dekhilet-toujane',
    name: { en: 'Dekhilet Toujane', ar: 'دخيلة توجان', fr: 'Dekhilet Toujane' },
    center: { lat: 33.4686, lng: 10.1303 }, // Approximate map focus near Toujane; verify GIS boundary centroid.
    landscape: { en: 'Mountain Villages', ar: 'القرى الجبلية', fr: 'Villages de montagne' },
    summary: {
      en: 'The delegation that includes Toujane, a mountain village in the Dahar area.',
      ar: 'المعتمدية التي تضم قرية توجان الجبلية بمنطقة الظاهر.',
      fr: 'La délégation qui comprend Toujane, village de montagne du Dahar.',
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
    summary: {
      en: 'A distinctive coastal oasis landscape beside the Mediterranean Sea, recognised for its traditional oasis agriculture.',
      ar: 'واحة نخيل ساحلية مميزة على ضفاف المتوسط، معروفة بنظامها التقليدي للزراعة الواحية.',
      fr: 'Un paysage d’oasis côtière remarquable au bord de la Méditerranée, connu pour son agriculture oasienne traditionnelle.',
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
      en: 'The oasis landscape is shaped by palm cultivation, garden crops, and the local knowledge associated with their care.',
      ar: 'تتشكل حياة الواحة حول زراعة النخيل والمحاصيل البستانية والمعارف المحلية المرتبطة بالعناية بها.',
      fr: 'La vie de l’oasis s’organise autour des palmiers, des cultures de jardin et des savoir-faire locaux.',
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
      en: 'An open-air courtyard surrounded by rooms carved into the ground in Matmata.',
      ar: 'فناء مفتوح تحيط به الغرف المنحوتة في الصخر بمطماطة القديمة.',
      fr: 'Cour à ciel ouvert entourée de pièces creusées dans le sol à Matmata.',
    },
    summary: {
      en: 'Centuries-old underground dwellings hollowed into ochre sandstone, staying cool through Saharan summers and warm in winter.',
      ar: 'مساكن تاريخية منحوتة في الصخر الرملي تحافظ طبيعياً على اعتدال الحرارة طوال الفصول.',
      fr: 'Demeures séculaires creusées dans la roche tendre, offrant une fraîcheur naturelle toute l’année.',
    },
    storyLead: {
      en: 'In Matmata, traditional builders developed underground courtyard houses adapted to the local environment.',
      ar: 'طوّر سكان مطماطة نمطاً من المساكن ذات الأفنية المحفورة تحت الأرض والمتأقلمة مع البيئة المحلية.',
      fr: 'À Matmata, les habitants ont développé des maisons à cour creusées dans le sol et adaptées à l’environnement local.',
    },
    storyBody: {
      en: 'Each home begins with a deep circular courtyard open to the sky. From its base, vaulted bedrooms, kitchens, and grain storage rooms radiate outward into thick compacted earth. The layout of the courtyard and surrounding rooms provides shade and helps moderate indoor temperatures.',
      ar: 'يبدأ كل بيت بحفرة دائرية واسعة مفتوحة على السماء، تتفرع من قاعدتها غرف المعيشة والمطابخ ومخازن الحبوب داخل الجبل. يساعد تصميم الفناء والغرف المحيطة به على توفير الظل وتلطيف درجات الحرارة داخل المسكن.',
      fr: 'Chaque maison s’articule autour d’une cour circulaire à ciel ouvert d’où rayonnent chambres voûtées et greniers. L’organisation autour de la cour contribue à créer de l’ombre et à modérer la température intérieure.',
    },
    culturalNote: {
      en: 'Known internationally through cinema, while local foodways and hospitality remain important parts of the visitor experience.',
      ar: 'ارتبط اسم مطماطة بالسينما العالمية، كما تظل الضيافة والمأكولات المحلية جزءاً مهماً من تجربة الزائر.',
      fr: 'Connue du grand public grâce au cinéma, Matmata reste marquée par l’hospitalité et les traditions culinaires locales.',
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
      en: 'Souk El Jara & Traditional Crafts',
      ar: 'سوق جارة والحرف التقليدية',
      fr: 'Souk El Jara & artisanat traditionnel',
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
      en: 'Gabès henna is associated with local agricultural and craft heritage; any official geographical-indication status should be confirmed from the current official register.',
      ar: 'ترتبط الحناء القابسية بالتراث الفلاحي والحرفي المحلي؛ ويجب التثبت من أي تسجيل رسمي للمؤشر الجغرافي قبل ذكره.',
      fr: 'Le henné de Gabès est associé au patrimoine agricole et artisanal local ; tout statut officiel d’indication géographique doit être vérifié dans le registre en vigueur.',
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
      ar: 'ساحل متوسطي يتأثر بحركة المدّ والجزر وتنتشر فيه قوارب الصيد التقليدية',
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
    summary: {
      en: 'Known in antiquity as Syrtis Minor, the Gulf of Gabès is notable for its broad tidal flats and coastal ecosystems.',
      ar: 'عُرف قديماً باسم سيرت الصغرى، ويتميّز بمسطحاته الساحلية الواسعة وتأثر أجزاء منه بحركة المدّ والجزر.',
      fr: 'Connu dans l’Antiquité sous le nom de Petite Syrte, le golfe se distingue par ses vastes zones intertidales et ses écosystèmes côtiers.',
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
    delegationId: 'dekhilet-toujane',
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
    summary: {
      en: 'A mountain village in the Dahar area, with stone-built houses and views over the surrounding valleys.',
      ar: 'قرية جبلية في منطقة الظاهر، تتميز بالمساكن الحجرية والإطلالات على الأودية المحيطة.',
      fr: 'Un village de montagne du Dahar, avec des maisons en pierre et des vues sur les vallées environnantes.',
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
      en: 'Local food products, textile practices, and hospitality are part of the village’s living heritage; specific product claims should be locally confirmed.',
      ar: 'تُعدّ المنتجات المحلية وممارسات النسيج والضيافة جزءاً من التراث الحي للقرية؛ ويلزم التثبت محلياً من تفاصيل المنتجات.',
      fr: 'Les produits locaux, les pratiques textiles et l’hospitalité font partie du patrimoine vivant du village ; les détails sur les produits sont à confirmer localement.',
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
      en: 'Thermal waters and oasis landscapes west of Gabès',
      ar: 'ينابيع استشفائية دافئة وواحات خضراء على مشارف الصحراء',
      fr: 'Eaux thermales et paysages oasiens à l’ouest de Gabès',
    },
    coordinates: { lat: 33.8915, lng: 9.7963 },
    elevationMeters: 62,
    image: '/src/assets/images/gabes_oasis_chenini_1794999255057.jpg',
    imageCaption: {
      en: 'Sunlit palm groves nourished by warm mineral springs in El Hamma.',
      ar: 'بساتين النخيل المروية بمياه العيون الحارة في الحامة.',
      fr: 'Palmeraie irriguée par les eaux minérales chaudes d’El Hamma.',
    },
    summary: {
      en: 'Thermal-water activity and oasis landscapes are among the features associated with El Hamma.',
      ar: 'ترتبط الحامة بالمياه الحارة والمشاهد الواحية.',
      fr: 'El Hamma est notamment associée aux eaux thermales et aux paysages oasiens.',
    },
    storyLead: {
      en: 'Thermal-water sites and oasis gardens form part of El Hamma’s local landscape.',
      ar: 'تشكّل مواقع المياه الحارة والحدائق الواحية جزءاً من المشهد المحلي في الحامة.',
      fr: 'Les sites thermaux et les jardins oasiens font partie du paysage local d’El Hamma.',
    },
    storyBody: {
      en: 'El Hamma is known for its thermal-water activity and surrounding oasis landscapes. The exact identification of the ancient Roman site-name associated with this area should be confirmed through specialist archaeological sources before publication.',
      ar: 'تُعرف الحامة بمياهها الحارة ومشاهدها الواحية. ويجب التثبت من التسمية الرومانية القديمة المرتبطة بالمنطقة بالرجوع إلى مصادر أثرية مختصة.',
      fr: 'El Hamma est connue pour ses eaux thermales et ses paysages oasiens. L’identification précise du site antique associé à la région doit être confirmée par des sources archéologiques spécialisées.',
    },
    culturalNote: {
      en: 'The thermal-water heritage is part of El Hamma’s identity; current facilities, services, and visitor access should be checked before travel.',
      ar: 'ترتبط الحامة بتراث المياه الحارة؛ ويجب التثبت من المرافق والخدمات وإمكانية الزيارة قبل السفر.',
      fr: 'Le thermalisme fait partie de l’identité locale ; vérifier les établissements, services et conditions d’accès avant le déplacement.',
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
    delegationId: 'ouedhref',
    dimension: 'culture',
    secondaryDimensions: ['local_life', 'stories'],
    title: {
      en: 'Oudhref Margoum & Klim Looms',
      ar: 'نسيج وذرف التقليدي',
      fr: 'Métiers à tisser d’Oudhref',
    },
    subtitle: {
      en: 'Traditional wool weaving and local textile knowledge',
      ar: 'النسيج التقليدي ومعارف الحرف المحلية في وذرف',
      fr: 'Tissage traditionnel de la laine et savoir-faire textile local',
    },
    coordinates: { lat: 33.9875, lng: 9.9614 },
    elevationMeters: 22,
    image: '/src/assets/images/gabes_jara_souk_crafts_1794999258465.jpg',
    imageCaption: {
      en: 'Natural wool dyes, woven fibers, and ancestral craftsmanship from northern Gabès.',
      ar: 'الأصباغ الطبيعية والمنسوجات التقليدية المستلهمة من تراث شمال قابس.',
      fr: 'Teintures naturelles et savoir-faire textile ancestral du nord de Gabès.',
    },
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
      en: 'Traditional wool weaving is associated with Oudhref. Specific dye materials, colour traditions, workshop locations, and opportunities to meet weavers should be confirmed with local artisans before being presented as visitor experiences.',
      ar: 'يرتبط اسم وذرف بالحياكة والنسيج التقليدي للصوف. أمّا مواد الصباغة والألوان والورشات المتاحة للزيارة فتحتاج إلى تثبّت مباشر من الحرفيين المحليين.',
      fr: 'Le nom d’Oudhref est associé au tissage traditionnel de la laine. Les teintures, les palettes de couleurs et les ateliers ouverts aux visiteurs restent à confirmer auprès des artisans locaux.',
    },
    culturalNote: {
      en: 'The tools, terminology, songs, and working practices associated with local weaving should be documented through interviews with practitioners.',
      ar: 'ينبغي توثيق أدوات النسيج وتسمياتها والأغاني والممارسات المرتبطة به عبر شهادات الحرفيين المحليين.',
      fr: 'Les outils, les termes, les chants et les gestes du tissage local sont à documenter auprès des artisan·e·s.',
    },
    localLife: {
      en: 'Ask locally whether family workshops or cooperative spaces are currently active and open to visitors.',
      ar: 'يُنصح بالتثبت محلياً من وجود ورشات عائلية أو فضاءات تعاونيات تستقبل الزوار.',
      fr: 'Vérifier localement quels ateliers familiaux ou espaces coopératifs accueillent effectivement les visiteurs.',
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
        en: 'Local weaving practices (confirm availability before visiting)',
        ar: 'التعرّف على النسيج المحلي بعد التثبت من إمكانية الزيارة',
        fr: 'Découverte du tissage local (visites à confirmer)',
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
    image: '/src/assets/images/gabes_maritime_corniche_1794999256668.jpg',
    imageCaption: {
      en: 'Coastal view of the Gulf of Gabès; this image does not identify the archaeological remains of Tacapes or the Sidi Boulbaba mausoleum.',
      ar: 'مشهد ساحلي لخليج قابس؛ الصورة لا تمثل بقايا تاكابيس الأثرية ولا مقام سيدي بولبابة.',
      fr: 'Vue du littoral du golfe de Gabès ; cette image ne représente ni les vestiges de Tacapes ni le mausolée de Sidi Boulbaba.',
    },
    summary: {
      en: 'A story connecting two distinct layers of Gabès heritage: ancient Tacapes and the Sidi Boulbaba mausoleum. Their locations and visual documentation should be presented separately.',
      ar: 'حكاية تجمع بين طبقتين مختلفتين من تراث قابس: تاكابيس القديمة ومقام سيدي بولبابة. من الأفضل عرض كل موقع ومعلوماته وصوره بشكل مستقل.',
      fr: 'Un récit reliant deux strates distinctes du patrimoine de Gabès : l’antique Tacapes et le mausolée de Sidi Boulbaba. Les lieux et leurs visuels doivent être présentés séparément.',
    },
    storyLead: {
      en: 'Before the modern city rose around the gulf, Roman naturalists marveled at Tacapes’s lush tiered gardens.',
      ar: 'قبل نشأة المدينة الحديثة، سجّل الرحالة الرومان دهشتهم من خصوبة حدائق تاكابيس.',
      fr: 'Bien avant la ville moderne, les naturalistes romains s’émerveillaient des jardins de Tacapes.',
    },
    storyBody: {
      en: 'Ancient sources, including Pliny the Elder, describe the agricultural abundance associated with Tacapes. Sidi Boulbaba is a separate religious heritage site in Gabès; avoid implying that the two sites are the same place or that the current image documents either one.',
      ar: 'تذكر المصادر القديمة، ومنها كتابات بلينيوس الأكبر، خصوبة المجال الزراعي المرتبط بتاكابيس. أمّا مقام سيدي بولبابة فهو معلم ديني وتراثي مستقل داخل قابس؛ لذلك يجب عدم الخلط بين الموقعين أو الإيحاء بأن الصورة الحالية توثّق أحدهما.',
      fr: 'Les sources antiques, dont les écrits de Pline l’Ancien, évoquent l’abondance agricole associée à Tacapes. Le mausolée de Sidi Boulbaba constitue un site patrimonial religieux distinct ; ne pas confondre les deux lieux ni laisser entendre que l’image actuelle représente l’un d’eux.',
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
      en: 'Descending toward the Gulf of Gabès and the coastal landscapes of southern Tunisia.',
      ar: 'الاقتراب من خليج قابس ومشاهده الساحلية في الجنوب التونسي.',
      fr: 'Descente vers le golfe de Gabès et les paysages côtiers du Sud tunisien.',
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
    allDelegations: 'All 13 Delegations',
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
    visionQuote: 'The World → Africa → Tunisia → Gabès Governorate → Its 13 Delegations → Its Places → Its Stories.',
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
    allDelegations: 'كل المعتمديات (13)',
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
    visionQuote: 'العالم ← إفريقيا ← تونس ← ولاية قابس ← معتمدياتها الثلاث عشرة ← الأماكن ← القصص.',
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
    allDelegations: 'Les 13 délégations',
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
    visionQuote: 'Le Monde → Afrique → Tunisie → Gouvernorat de Gabès → Ses 13 délégations → Ses lieux → Ses récits.',
    downloadZipLabel: 'Télécharger le projet complet (.zip)',
    close: 'Fermer',
    noResults: 'Aucun lieu ne correspond à ce filtre.',
    clearFilters: 'Réinitialiser les filtres',
  },
};
