/* Terra Nova — NASA-verified image gallery data (additive module).
   RULES: only the NASA images supplied by the project owner (or found on the exact NASA pages he supplied) are listed here.
   A site with no verified NASA image has an empty list and the gallery shows the "unavailable" message instead.
   Nothing here is substituted from any other source. Every text is [English, العربية, Français]. */
(function () {
  var A = "https://assets.science.nasa.gov/dynamicimage/assets/science/";
  var TL = A + "psd/solar-system/planetary-expeditions/2025-06-gift-iceland/";
  var TLQ = "?w=1600&h=1067&fit=clip&crop=faces%2Cfocalpoint";

  window.TN_GALLERY = {
    cats: {
      landscape:   ["Landscape & Geology", "المناظر الطبيعية والجيولوجيا", "Paysages & géologie"],
      research:    ["Researchers & Field Research", "الباحثون والأبحاث الميدانية", "Chercheurs & recherche de terrain"],
      experiments: ["Scientific Experiments", "التجارب العلمية", "Expériences scientifiques"],
      compare:     ["Earth vs. Moon / Mars", "الأرض مقابل القمر / المريخ", "Terre vs Lune / Mars"],
      iceland:     ["Iceland Field Research", "الأبحاث الميدانية في آيسلندا", "Recherche de terrain en Islande"],
      project:     ["Project images (original site photos — not NASA-credited)", "صور المشروع الأصلية (ليست منسوبة لناسا)", "Images du projet (photos d’origine — non créditées NASA)"]
    },
    order: ["landscape", "research", "experiments", "compare", "iceland", "project"],
    dateKeys: { cap: ["Captured", "تاريخ التصوير", "Prise de vue"], pub: ["Published", "تاريخ النشر", "Publié"], exp: ["Expedition", "تاريخ البعثة", "Expédition"], yr: ["Year", "السنة", "Année"] },
    ui: {
      title: ["NASA image gallery", "معرض صور ناسا", "Galerie d’images NASA"],
      sub: ["Only images published by NASA, each linked to its original NASA page. Every image shows a place on Earth.", "صور منشورة من ناسا فقط، وكل صورة مرتبطة بصفحتها الأصلية عند ناسا. جميع الصور تُظهر أماكن على كوكب الأرض.", "Uniquement des images publiées par la NASA, chacune liée à sa page d’origine. Toutes les images montrent des lieux sur Terre."],
      earth: ["Earth", "الأرض", "Terre"],
      credit: ["NASA Image Credit", "حقوق الصورة (ناسا)", "Crédit image NASA"],
      view: ["View Original NASA Source", "عرض المصدر الأصلي عند ناسا", "Voir la source NASA d’origine"],
      id: ["Image ID", "رقم الصورة", "ID de l’image"],
      none: ["NASA-verified images for this location are currently unavailable.", "NASA-verified images for this location are currently unavailable.", "NASA-verified images for this location are currently unavailable."],
      close: ["Close", "إغلاق", "Fermer"], prev: ["Previous", "السابق", "Précédent"], next: ["Next", "التالي", "Suivant"],
      full: ["Fullscreen", "ملء الشاشة", "Plein écran"], fail: ["The image could not be loaded. Open the original NASA page instead.", "تعذّر تحميل الصورة. افتح صفحة ناسا الأصلية.", "Image indisponible. Ouvrez la page NASA d’origine."],
      before: ["Before", "قبل", "Avant"], after: ["After", "بعد", "Après"], slider: ["Compare before and after", "قارن بين قبل وبعد", "Comparer avant et après"],
      more: ["Additional NASA resources", "مصادر إضافية من ناسا", "Ressources NASA complémentaires"],
      of: ["of", "من", "sur"],
      projcredit: ["Image source", "مصدر الصورة", "Source de l’image"],
      projnote: ["Original image from the supplied project document — not a NASA image", "الصورة الأصلية من وثيقة المشروع — وليست صورة من ناسا", "Image d’origine du document du projet — pas une image NASA"],
      proj: ["Project image", "صورة المشروع", "Image du projet"]
    },

    sites: {
      /* ───────── EARTH ↔ MARS ───────── */
      haughton: { items: [{
        id: "haughton-misr", cat: "landscape", pia: "PIA03714",
        src: A + "psd/photojournal/pia/pia03/pia03714/PIA03714.jpg",
        page: "https://science.nasa.gov/photojournal/mars-researchers-rendezvous-on-remote-arctic-island/",
        title: ["Devon Island from orbit (MISR / Terra)", "جزيرة ديفون من المدار (MISR / Terra)", "L’île Devon vue de l’orbite (MISR / Terra)"],
        desc: ["A satellite view of Devon Island, Nunavut, home of the Haughton-Mars Project. It shows the region, not a close-up of the crater itself.", "صورة فضائية لجزيرة ديفون في نونافوت، موقع مشروع هوتون–المريخ. تُظهر المنطقة المحيطة وليست لقطة قريبة للفوهة نفسها.", "Vue satellite de l’île Devon (Nunavut), site du projet Haughton-Mars. Elle montre la région, pas un gros plan du cratère."],
        credit: "NASA/GSFC/LaRC/JPL, MISR Team",
        date: { k: "cap", v: ["June 28, 2001", "28 يونيو 2001", "28 juin 2001"] }
      }] },

      mcmurdo: { items: [{
        id: "mcmurdo-landsat", cat: "landscape",
        src: A + "esd/eo/images/imagerecords/2000/2140/landsat7_dry_valley_lrg.jpg",
        page: "https://science.nasa.gov/earth/earth-observatory/mcmurdo-dry-valleys-2140/",
        title: ["McMurdo Dry Valleys (Landsat 7)", "وديان ماكموردو الجافة (Landsat 7)", "Vallées sèches de McMurdo (Landsat 7)"],
        desc: ["A Landsat 7 view of the polar desert of Victoria Land: ice-free valleys, frozen lakes and bare rock between the Antarctic ice sheet and the sea.", "منظر من القمر Landsat 7 للصحراء القطبية في أرض فيكتوريا: وديان خالية من الجليد وبحيرات متجمدة وصخور عارية بين الغطاء الجليدي والبحر.", "Vue Landsat 7 du désert polaire de la Terre Victoria : vallées libres de glace, lacs gelés et roche nue entre la calotte et la mer."],
        credit: "Robert Simmon, based on NASA GSFC Oceans and Ice Branch and Landsat 7 Science Team data"
      }, {
        id: "mcmurdo-aster", cat: "landscape", pia: "PIA12461",
        src: "https://assets.science.nasa.gov/content/dam/science/psd/photojournal/pia/pia12/pia12461/PIA12461.jpg",
        page: "https://science.nasa.gov/photojournal/dry-valleys-antarctica/",
        title: ["Dry Valleys, Antarctica (ASTER / Terra)", "الوديان الجافة، القارة القطبية الجنوبية (ASTER / Terra)", "Vallées sèches, Antarctique (ASTER / Terra)"],
        desc: ["Wright Valley crosses the scene, with the partly fog-covered Victoria Valley to its left. NASA notes scientists consider the Dry Valleys the closest terrestrial environment to Mars.", "يعبر وادي رايت الصورة، وإلى يساره وادي فيكتوريا المغطى جزئياً بالضباب. وتذكر ناسا أن العلماء يعدّون الوديان الجافة أقرب بيئة أرضية إلى المريخ.", "La vallée Wright traverse l’image, avec la vallée Victoria en partie sous la brume à sa gauche. La NASA note que les Vallées sèches sont l’environnement terrestre le plus proche de Mars."],
        credit: "NASA/GSFC/METI/ERSDAC/JAROS, and U.S./Japan ASTER Science Team",
        date: { k: "cap", v: ["December 8, 2002", "8 ديسمبر 2002", "8 décembre 2002"] }
      }] },

      mdrs: { items: [] },
      mojave: { items: [] },

      iceland: { note: ["These photos were taken in Southwest Iceland (Fagradalsfjall, near Grindavík) during NASA’s 2025 “Team Lava” fieldwork. They are not confirmed images of the Interior Highlands site shown on the map.", "هذه الصور التُقطت في جنوب غرب آيسلندا (فاغرادالسفيال قرب غريندافيك) خلال العمل الميداني لفريق «Team Lava» التابع لناسا عام 2025، وليست صوراً مؤكدة لموقع المرتفعات الداخلية المعروض على الخريطة.", "Ces photos ont été prises dans le sud-ouest de l’Islande (Fagradalsfjall, près de Grindavík) lors des travaux de terrain 2025 de l’équipe « Team Lava » de la NASA. Ce ne sont pas des images confirmées du site des Hautes Terres intérieures."],
        links: [{ u: "https://science.nasa.gov/solar-system/planetary-analogs/", t: ["NASA Planetary Analogs", "المحاكيات الكوكبية — ناسا", "Analogues planétaires — NASA"] }],
        items: [{
          id: "iceland-flow", cat: "iceland",
          src: TL + "IMG_9573.jpg" + TLQ,
          page: "https://science.nasa.gov/solar-system/planetary-analogs/nasas-goddard-instrument-field-team-iceland-2025/team-lava/",
          title: ["Team Lava inspects a lava flow", "فريق Team Lava يفحص تدفق حمم", "Team Lava inspecte une coulée de lave"],
          desc: ["Scientists hike along the boundary between rough black lava flows and orange-brown oxidized terrain near Grindavík, Southwest Iceland.", "علماء يسيرون على الحدّ بين تدفقات الحمم السوداء الخشنة والأرض المؤكسدة البرتقالية–البنية قرب غريندافيك في جنوب غرب آيسلندا.", "Des scientifiques longent la limite entre des coulées de lave noires et un terrain oxydé orange-brun près de Grindavík, dans le sud-ouest de l’Islande."],
          credit: "NASA/Yesenia Arroyo",
          date: { k: "exp", v: ["2025", "2025", "2025"] }
        }, {
          id: "iceland-basalt", cat: "iceland",
          src: TL + "IMG_9596.jpg" + TLQ,
          page: "https://science.nasa.gov/solar-system/planetary-analogs/nasas-goddard-instrument-field-team-iceland-2025/team-lava/",
          title: ["Close-up of vesicular basalt", "لقطة قريبة لبازلت حويصلي", "Gros plan sur du basalte vésiculaire"],
          desc: ["Gloved hands hold a piece of porous, bubble-filled basalt — the texture left when gas escapes from cooling lava.", "أيدٍ مرتدية قفازات تحمل قطعة بازلت مسامية مليئة بالفقاعات، وهي بنية تتكوّن عند تسرّب الغاز من الحمم أثناء تبرّدها.", "Des mains gantées tiennent un morceau de basalte poreux, rempli de bulles, texture laissée par les gaz qui s’échappent de la lave."],
          credit: "NASA/Yesenia Arroyo",
          date: { k: "exp", v: ["2025", "2025", "2025"] }
        }, {
          id: "iceland-team", cat: "iceland",
          src: TL + "IMG_9589.jpg" + TLQ,
          page: "https://science.nasa.gov/solar-system/planetary-analogs/nasas-goddard-instrument-field-team-iceland-2025/team-lava/",
          title: ["Team members discuss field observations", "أعضاء الفريق يناقشون الملاحظات الميدانية", "L’équipe discute des observations de terrain"],
          desc: ["Jacob Richardson, Patrick Whelley, Sarah Sutton and Alexandra Matiella Novak stand on black lava rock in Southwest Iceland.", "جاكوب ريتشاردسون وباتريك ويلي وسارة ساتون وأليكساندرا ماتييلا نوفاك واقفون على صخور حمم سوداء في جنوب غرب آيسلندا.", "Jacob Richardson, Patrick Whelley, Sarah Sutton et Alexandra Matiella Novak sur la roche de lave noire du sud-ouest de l’Islande."],
          credit: "NASA/Yesenia Arroyo",
          date: { k: "exp", v: ["2025", "2025", "2025"] }
        }] },

      wadirum: { items: [{
        id: "wadirum-ali", cat: "landscape",
        src: A + "esd/eo/images/imagerecords/49000/49945/wadirum_ali_2001208_lrg.jpg",
        page: "https://science.nasa.gov/earth/earth-observatory/wadi-rum-jordan-49945/",
        title: ["Wadi Rum from space (EO-1 ALI)", "وادي رم من الفضاء (EO-1 ALI)", "Wadi Rum vu de l’espace (EO-1 ALI)"],
        desc: ["Mountains of granite and sandstone rise beside valleys filled with red sand in southwestern Jordan.", "جبال من الغرانيت والحجر الرملي ترتفع بجانب وديان مليئة بالرمال الحمراء في جنوب غرب الأردن.", "Des montagnes de granite et de grès dominent des vallées de sable rouge dans le sud-ouest de la Jordanie."],
        credit: "NASA Earth Observatory / Jesse Allen and Robert Simmon, using EO-1 ALI data provided courtesy of the NASA EO-1 team and USGS",
        date: { k: "cap", v: ["July 27, 2001", "27 يوليو 2001", "27 juillet 2001"] }
      }] },

      atacama: { items: [{
        id: "atacama-aster", cat: "landscape",
        src: A + "esd/eo/images/imagerecords/4000/4123/aster_andes_artii_lrg.jpg",
        page: "https://science.nasa.gov/earth/earth-observatory/atacama-desert-chile-4123/",
        title: ["Atacama Desert, Chile (ASTER)", "صحراء أتاكاما، تشيلي (ASTER)", "Désert d’Atacama, Chili (ASTER)"],
        desc: ["A NASA ASTER satellite view of the Atacama Desert region of northern Chile, between the Andes and the Pacific coast.", "منظر فضائي من أداة ASTER التابعة لناسا لمنطقة صحراء أتاكاما شمال تشيلي بين جبال الأنديز وساحل المحيط الهادئ.", "Vue satellite ASTER de la NASA du désert d’Atacama, dans le nord du Chili, entre les Andes et la côte pacifique."],
        credit: "NASA Earth Observatory (ASTER) — full credit line on the original NASA page"
      }, {
        id: "atacama-salar", cat: "landscape", pia: "PIA23420",
        src: A + "psd/photojournal/pia/pia23/pia23420/PIA23420.jpg",
        page: "https://science.nasa.gov/photojournal/salar-de-atacama-chile/",
        title: ["Salar de Atacama, Chile", "سالار دي أتاكاما، تشيلي", "Salar d’Atacama, Chili"],
        desc: ["A satellite view of the Salar de Atacama, the large salt flat of the Atacama Desert.", "منظر فضائي لسالار دي أتاكاما، السبخة الملحية الكبيرة في صحراء أتاكاما.", "Vue satellite du Salar d’Atacama, le grand salar du désert d’Atacama."],
        credit: "NASA — full credit line on the original NASA page"
      }, {
        id: "atacama-streambed", cat: "research", pia: "PIA16191",
        src: A + "psd/photojournal/pia/pia16/pia16191/PIA16191.jpg",
        page: "https://science.nasa.gov/photojournal/dry-streambed-on-alluvial-fan-in-northern-chile/",
        title: ["Dry streambed on an alluvial fan", "مجرى مائي جاف على مروحة غرينية", "Lit de rivière à sec sur un cône alluvial"],
        desc: ["Field photo of a dry streambed in the Atacama, showing the patchy mix of grain sizes deposited together. NASA compared it with streambed rock outcrops seen by Curiosity on Mars.", "صورة ميدانية لمجرى مائي جاف في أتاكاما تُظهر خليطاً متبايناً من أحجام الحبيبات المترسبة معاً. قارنتها ناسا بنتوءات صخرية لمجرى قديم رصدتها كيريوسيتي على المريخ.", "Photo de terrain d’un lit de rivière à sec dans l’Atacama, montrant un mélange hétérogène de tailles de grains. La NASA l’a comparé à des affleurements de lit de rivière vus par Curiosity sur Mars."],
        credit: "NASA/UC Berkeley",
        date: { k: "pub", v: ["September 27, 2012", "27 سبتمبر 2012", "27 septembre 2012"] }
      }] },

      /* ───────── EARTH ↔ MOON ───────── */
      lavabeds: { items: [{
        id: "lavabeds-tube", cat: "research",
        src: "https://science.nasa.gov/wp-content/uploads/2023/11/lavabedsnikkiwhelley.jpg?w=800",
        page: "https://science.nasa.gov/solar-system/planetary-analogs/",
        title: ["Researcher inside a lava tube", "باحثة داخل أنبوب حمم بركانية", "Chercheuse dans un tunnel de lave"],
        desc: ["Researcher Sanaz Esmaeili explores a lava tube — the kind of cave that may also exist beneath the Moon’s surface.", "الباحثة ساناز إسماعيلي تستكشف أنبوب حمم بركانية، وهو نوع الكهوف الذي قد يوجد أيضاً تحت سطح القمر.", "La chercheuse Sanaz Esmaeili explore un tunnel de lave, type de grotte qui pourrait exister sous la surface lunaire."],
        credit: "NASA/UMD/Nikki Whelley"
      }] },

      cinder: {
        links: [],
        items: [{
          id: "cinder-grover", cat: "research",
          src: "https://science.nasa.gov/wp-content/uploads/2024/06/s72-54907.jpg",
          page: "https://science.nasa.gov/image-detail/s72-54907/", pia: "S72-54907",
          title: ["Apollo 17 astronauts on “Grover”", "رائدا أبولو 17 على المركبة «غروفر»", "Les astronautes d’Apollo 17 sur « Grover »"],
          desc: ["Eugene Cernan and Harrison “Jack” Schmitt during geology training at the Cinder Lake Crater Field, driving a training replica of the lunar rover. Training took place on Earth.", "يوجين سيرنان وهاريسون «جاك» شميت أثناء التدريب الجيولوجي في حقل فوهات سيندر ليك على نموذج تدريبي للعربة القمرية. التدريب جرى على الأرض.", "Eugene Cernan et Harrison « Jack » Schmitt lors de l’entraînement géologique à Cinder Lake, au volant d’une réplique d’entraînement du rover lunaire. L’entraînement a eu lieu sur Terre."],
          credit: "NASA/USGS",
          date: { k: "yr", v: ["1972", "1972", "1972"] }
        }, {
          id: "cinder-before", cat: "landscape", pair: "cinder", side: "before",
          src: A + "esd/multimedia/images-of-change/craters-1-and-2-before_md-2048px-80.jpg",
          page: "https://science.nasa.gov/earth/arizonas-lunar-craters/",
          title: ["Cinder Lake craters — before", "فوهات سيندر ليك — قبل", "Cratères de Cinder Lake — avant"],
          desc: ["Aerial view of the two crater fields made with dynamite for Apollo training. The first field was designed to simulate the Sea of Tranquility.", "منظر جوي لحقلي الفوهات اللذين صُنعا بالديناميت لتدريب رواد أبولو. صُمم الحقل الأول لمحاكاة بحر الهدوء.", "Vue aérienne des deux champs de cratères créés à la dynamite pour l’entraînement Apollo. Le premier simulait la mer de la Tranquillité."],
          credit: "Aerial photography from the National Agricultural Imagery Program (NAIP). Source: USGS National Land Imaging Image Collections. Published by NASA — not captured directly by NASA.",
          date: { k: "cap", v: ["1968 and 1974 imagery", "صور عامي 1968 و1974", "Imagerie de 1968 et 1974"] }
        }, {
          id: "cinder-after", cat: "landscape", pair: "cinder", side: "after",
          src: A + "esd/multimedia/images-of-change/craters-1-and-2-after_md-2048px-80.jpg",
          page: "https://science.nasa.gov/earth/arizonas-lunar-craters/",
          title: ["Cinder Lake craters — after", "فوهات سيندر ليك — بعد", "Cratères de Cinder Lake — après"],
          desc: ["The same fields in 2017: unlike the airless Moon, which preserves craters for eons, the Arizona craters have eroded.", "الحقلان نفسهما عام 2017: على عكس القمر الخالي من الهواء الذي يحفظ الفوهات لدهور، تآكلت فوهات أريزونا.", "Les mêmes champs en 2017 : contrairement à la Lune sans atmosphère, qui conserve ses cratères pendant des éons, ceux de l’Arizona se sont érodés."],
          credit: "Aerial photography from the National Agricultural Imagery Program (NAIP). Source: USGS National Land Imaging Image Collections. Published by NASA — not captured directly by NASA.",
          date: { k: "cap", v: ["2017", "2017", "2017"] }
        }] },

      askja: {
        links: [{ u: "https://science.nasa.gov/solar-system/analog-explorer/", t: ["NASA Planetary Analog Explorer", "مستكشف المحاكيات الكوكبية — ناسا", "Explorateur d’analogues planétaires — NASA"] }],
        items: [{
          id: "askja-eo1", cat: "landscape", pia: "PIA18799",
          src: A + "psd/photojournal/pia/pia18/pia18799/PIA18799.jpg",
          page: "https://science.nasa.gov/photojournal/iceland-volcanic-eruption-monitored-by-nasa-eo-1-spacecraft/",
          title: ["Iceland eruption seen by EO-1", "ثوران بركاني في آيسلندا رصدته EO-1", "Éruption en Islande observée par EO-1"],
          desc: ["A space view of a volcanic eruption in Iceland. Askja lies north of the eruption area shown — this is not a direct shot of the Askja caldera.", "منظر فضائي لثوران بركاني في آيسلندا. تقع أسكيا شمال منطقة الثوران الظاهرة، وهذه ليست لقطة مباشرة لكالديرا أسكيا.", "Vue spatiale d’une éruption en Islande. L’Askja se trouve au nord de la zone d’éruption : ce n’est pas une image directe de la caldeira."],
          credit: "NASA/JPL-Caltech/GSFC/Ashley Davies"
        }] },

      luna: { items: [],
        links: [{ u: "https://www.nasa.gov/centers-and-facilities/ames/the-lunar-lab-and-regolith-testbeds/", t: ["Separate NASA facility: NASA Lunar Lab and Regolith Testbeds (not LUNA)", "منشأة مختلفة لدى ناسا: NASA Lunar Lab and Regolith Testbeds (وليست LUNA)", "Autre installation NASA : NASA Lunar Lab and Regolith Testbeds (pas LUNA)"] }] }
    }
  };
})();