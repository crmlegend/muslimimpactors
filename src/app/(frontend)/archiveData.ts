export type SearchItem = {
  href: string
  meta: string
  summary: string
  title: string
  type: 'Personality' | 'Theme' | 'Story' | 'Source' | 'Article' | 'Essay' | 'Blog' | 'Contributor'
}

export type Personality = {
  category: string
  editorsPick: boolean
  era: string
  href: string
  imageUrl?: string
  initials: string
  name: string
  popularity: number
  region: string
  role: string
  slug: string
  summary: string
  theme: 'american_muslims' | 'muslims_in_history'
  todayRelevance?: string
  tone: string
  wikipediaTitle: string
}

export type StoryRow = {
  body: string
  embedId?: string
  href: string
  length: string
  name: string
  role: string
  slug: string
  story: string
  summary: string
}

export type StoryChapter = {
  duration: string
  startSeconds: number
  title: string
  transcript: string
  views: number
}

export type YoutubeVideo = {
  embedId: string
  language: 'English'
  note: string
  source: string
  title: string
  topic: string
}

export type SponsorRow = {
  adLabel?: string
  bannerImage?: string
  details?: {
    body: string
    heading: string
  }[]
  focus: string
  href: string
  name: string
  slug: string
  summary: string
  type: string
  websiteLabel?: string
  websiteUrl?: string
}

export const manuscriptImage = '/manuscript-panel.svg'

const tones = [
  '#0D76BC',
  '#173653',
  '#F2673C',
  '#DF5A32',
  '#4B8DC4',
  '#5D6F7F',
  '#C95135',
  '#2C6F9E',
]

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

const initialsFor = (value: string) =>
  value
    .replace(/^al-/i, '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()

const wikipediaTitleOverrides: Record<string, string> = {
  'Abu al-Hasan al-Ashari': 'Abu_al-Hasan_al-Ashari',
  'Ahmad al-Tijani': 'Ahmad_al-Tijani',
  'Al-Biruni': 'Al-Biruni',
  'Al-Farabi': 'Al-Farabi',
  'Al-Ghazali': 'Al-Ghazali',
  'Al-Jazari': 'Ismail_al-Jazari',
  'Al-Khwarizmi': 'Muhammad_ibn_Musa_al-Khwarizmi',
  'Al-Razi': 'Abu_Bakr_al-Razi',
  'Fatima al-Fihri': 'Fatima_al-Fihri',
  'Fatima al-Zahra': 'Fatima',
  'Ibn Rushd': 'Averroes',
  'Ibn Sina': 'Avicenna',
  'Ibn al-Haytham': 'Ibn_al-Haytham',
  'Imam Abu Hanifa': 'Abu_Hanifa',
  'Imam Ahmad ibn Hanbal': 'Ahmad_ibn_Hanbal',
  'Imam Malik': 'Malik_ibn_Anas',
  'Imam Muslim': 'Muslim_ibn_al-Hajjaj',
  'Imam al-Bukhari': 'Muhammad_al-Bukhari',
  "Imam al-Shafi'i": "Al-Shafi'i",
  'Jalal al-Din Rumi': 'Rumi',
  'Mimar Sinan': 'Mimar_Sinan',
  'Muhammad Iqbal': 'Muhammad_Iqbal',
  'Omar Khayyam': 'Omar_Khayyam',
  Saladin: 'Saladin',
  'Suleiman the Magnificent': 'Suleiman_the_Magnificent',
}

const wikipediaTitleFor = (name: string) =>
  wikipediaTitleOverrides[name] || name.replace(/['’]/g, '').replace(/\s+/g, '_')

const portraitImageOverrides: Record<string, string> = {
  'Ahmed Kousay al-Taie':
    'https://upload.wikimedia.org/wikipedia/commons/7/75/SgtAhmedKousayAltaie.png',
  'André Carson':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Andr%C3%A9_Carson_116th_Congress_portrait.jpg/330px-Andr%C3%A9_Carson_116th_Congress_portrait.jpg',
  'Aziz Sancar':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Aziz_Sancar_0060.jpg/330px-Aziz_Sancar_0060.jpg',
  'Fareed Zakaria':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Fareed_Zakaria%2C_Peabody_Awards_%282012%29_%28cropped%29.jpg/330px-Fareed_Zakaria%2C_Peabody_Awards_%282012%29_%28cropped%29.jpg',
  'Hamdi Ulukaya':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Hamdi_Ulukaya%2C_official_portrait%2C_Homeland_Security_Council.jpg/330px-Hamdi_Ulukaya%2C_official_portrait%2C_Homeland_Security_Council.jpg',
  'Huma Abedin':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Huma_Abedin_%2852456232291%29_%28cropped%29.jpg/330px-Huma_Abedin_%2852456232291%29_%28cropped%29.jpg',
  'Ilhan Omar':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Ilhan_Omar%2C_official_portrait%2C_116th_Congress_%28cropped%29_A.jpg/330px-Ilhan_Omar%2C_official_portrait%2C_116th_Congress_%28cropped%29_A.jpg',
  'James Yee': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/James_Yee.JPG/330px-James_Yee.JPG',
  'Jawed Karim':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Jawed_Karim_2008.jpg/330px-Jawed_Karim_2008.jpg',
  'Kareem Rashad Sultan Khan':
    'https://upload.wikimedia.org/wikipedia/commons/e/e3/KareemRashadSultanKhan.jpg',
  'Keith Ellison':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Keith_Ellison_portrait.jpg/330px-Keith_Ellison_portrait.jpg',
  'Khaled Hosseini':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Khaled_Hosseini%2C_2013_%28cropped%29.jpg/330px-Khaled_Hosseini%2C_2013_%28cropped%29.jpg',
  'Malcolm X':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Malcolm_X_1963_press_photo.jpg/330px-Malcolm_X_1963_press_photo.jpg',
  'Muhammad Ali':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Muhammad_Ali_NYWTS.jpg/330px-Muhammad_Ali_NYWTS.jpg',
  'Nusrat Choudhury':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Nursat_Choudhury_%28Judge%29.jpg/330px-Nursat_Choudhury_%28Judge%29.jpg',
  'Rashida Tlaib':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Tlaib_Rashida_119th_Congress_%283x4_cropped%29.jpg/330px-Tlaib_Rashida_119th_Congress_%283x4_cropped%29.jpg',
  'Shahid Khan':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Shahid_Khan_2015.jpg/330px-Shahid_Khan_2015.jpg',
  'Talal Asad': 'https://upload.wikimedia.org/wikipedia/commons/8/88/Professor_Talal_Asad_01_%28cropped%29.jpg',
  'Zahid Quraishi':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Judge_Zahid_Quraishi_%28cropped%29.png/330px-Judge_Zahid_Quraishi_%28cropped%29.png',
}

const blockedWikipediaSummaryTitles = new Set([
  'Al-Firdausi',
  'Al-Layth_ibn_Sad',
  'Ibn_Ajiba',
  'Kamal_al-Din_Behzad',
  'Maryam_al-Asturlabi',
  'Shuhda_al-Katiba',
  'Sutayta_al-Mahamali',
])

export const canFetchWikipediaSummary = (wikipediaTitle: string) =>
  !blockedWikipediaSummaryTitles.has(wikipediaTitle)

const categoryContexts: Record<string, string> = {
  'Architecture and art':
    'This profile belongs to the visual culture strand of the archive: buildings, workshops, patronage, craft lineages, museum records, and image-rights review.',
  'Astronomy and mathematics':
    'This profile connects observation, calculation, instruments, tables, teaching traditions, and later transmission into other scholarly languages.',
  'Calligraphy and book arts':
    'This profile should connect manuscript culture, teaching circles, calligraphy, illustration, patronage, and surviving material evidence.',
  'Education and reform':
    'This profile belongs to the institutional and reform strand: schools, teaching networks, public debate, literacy, and social renewal.',
  'Geography and travel':
    'This profile can connect routes, cities, courts, pilgrimage, ethnographic observation, maps, trade, and travel writing.',
  'Hadith scholarship':
    'This profile should connect transmission networks, teachers, students, collections, methodology, manuscript witnesses, and later commentary.',
  'History and historiography':
    'This profile sits in the archive’s historical-method strand, joining chronology, causality, biography, political context, and source criticism.',
  'Law and governance':
    'This profile can connect legal reasoning, public office, institutions, policy, patronage, judicial practice, and debates about authority.',
  'Libraries and translation':
    'This profile connects books, translation circles, libraries, patrons, language expertise, and the movement of knowledge across regions.',
  'Literature and language':
    'This profile belongs to the literary-intellectual strand: prose, rhetoric, language, adab, public argument, and social observation.',
  'Literature and poetry':
    'This profile can connect poetry, performance, court culture, devotional language, translation, reception, and later public memory.',
  'Medicine and hospitals':
    'This profile should connect clinical writing, hospitals, pharmacology, anatomy, ethics, teaching, and the movement of medical texts.',
  'Medicine and philosophy':
    'This profile joins medicine, metaphysics, logic, classification, teaching, translation, and later commentary traditions.',
  'Philosophy and law':
    'This profile can connect legal reasoning, philosophical commentary, medicine, political service, and intellectual reception.',
  'Philosophy and theology':
    'This profile belongs to the intellectual-history strand, connecting logic, metaphysics, theology, ethics, debate, and institutional learning.',
  'Philosophy and translation':
    'This profile connects philosophical vocabulary, translation culture, mathematics, scientific writing, and cross-linguistic transmission.',
  'Science and craft':
    'This profile should connect craft practice, instruments, workshop knowledge, diagrams, experimental claims, and material culture.',
  'Sufism and ethics':
    'This profile can connect spiritual instruction, ethical formation, teaching lineages, poetry, community practice, and reception history.',
  'Sufism and tafsir':
    'This profile connects Qur’anic commentary, devotional reading, spiritual training, teaching circles, and regional scholarly traditions.',
  'Tafsir and hadith':
    'This profile joins Qur’anic commentary, hadith, language, legal reasoning, and encyclopedic scholarly production.',
  'Tafsir and history':
    'This profile links commentary, universal history, biography, legal discussions, and the use of earlier reports.',
  'Tafsir and language':
    'This profile connects Arabic language, rhetoric, lexicography, commentary, and the interpretive history of Qur’anic vocabulary.',
  'Tafsir and law':
    'This profile connects Qur’anic commentary, legal reasoning, devotional reading, and how jurists used scripture in public guidance.',
  'Tafsir and theology':
    'This profile connects commentary, creed, philosophy, legal method, and debates over interpretation.',
  'Women in Islamic history':
    'This profile belongs to the women’s-history strand: learning, transmission, patronage, family memory, institutions, public service, and source confidence.',
  'American civic leadership':
    'This profile belongs to the United States civic-leadership strand: public office, rights, representation, policy, community service, and documented public impact.',
  'American arts and media':
    'This profile connects creative work, public culture, representation, institutions, awards, interviews, and how Muslim identity appears in American media.',
  'American scholarship and science':
    'This profile connects research, universities, laboratories, public knowledge, teaching, expert commentary, and source-backed intellectual contribution in the United States.',
  'American service and armed forces':
    'This profile connects military service, public duty, civic memory, legal debates, memorialization, and verified records of service.',
  'American sports and public life':
    'This profile connects athletic achievement, public service, activism, philanthropy, community memory, and the broader cultural life of American Muslims.',
  'American business and philanthropy':
    'This profile connects enterprise, philanthropy, civic institutions, public service, and the practical ways American Muslims support communities.',
  'American literature and thought':
    'This profile connects authors, journalists, memoirists, scholars, public ideas, education, and the circulation of American Muslim voices.',
}

const personalityRows = [
  'Ibn Khaldun|732-808 AH / 1332-1406 CE|Historian and social theorist|History and historiography|North Africa|Known for historical method, social cohesion, political analysis, and the Muqaddimah.',
  'Al-Biruni|362-440 AH / 973-1048 CE|Astronomer, mathematician, comparative scholar|Astronomy and mathematics|Khwarazm and Ghaznavid domains|A careful observer of geography, astronomy, chronology, and comparative cultures.',
  'Fatima al-Fihri|3rd century AH / 9th century CE|Founder and patron of learning|Women in Islamic history|Fez|Associated with institutional learning, endowment culture, and the al-Qarawiyyin tradition.',
  'Ibn Sina|370-428 AH / 980-1037 CE|Physician and philosopher|Medicine and philosophy|Persia and Central Asia|Central figure in medicine, philosophy, logic, and later scholastic transmission.',
  'Al-Razi|251-313 AH / 865-925 CE|Physician, chemist, and clinical author|Medicine and hospitals|Rayy and Baghdad|Remembered for clinical observation, medical writing, and hospital practice.',
  'Al-Khwarizmi|c. 164-232 AH / c. 780-847 CE|Mathematician and astronomer|Astronomy and mathematics|Khwarazm and Baghdad|Associated with algebra, calculation, astronomical tables, and mathematical transmission.',
  'Al-Farabi|c. 259-339 AH / c. 872-950 CE|Philosopher and political thinker|Philosophy and theology|Transoxiana and Syria|Known for philosophy, music theory, logic, and visions of the virtuous city.',
  'Al-Ghazali|450-505 AH / 1058-1111 CE|Theologian, jurist, and spiritual author|Philosophy and theology|Tus and Nishapur|A major voice in ethics, law, theology, philosophy, and spiritual reform.',
  'Ibn Rushd|520-595 AH / 1126-1198 CE|Jurist, physician, and philosopher|Philosophy and law|Cordoba and Marrakesh|Known for legal method, philosophical commentary, medicine, and public service.',
  'Ibn Battuta|703-779 AH / 1304-1369 CE|Traveler and legal scholar|Geography and travel|Morocco and wider Afro-Eurasia|His travel narrative connects courts, cities, scholars, and trade routes across regions.',
  'Imam al-Bukhari|194-256 AH / 810-870 CE|Hadith scholar|Hadith scholarship|Bukhara|Compiled a major hadith collection and became central to Sunni hadith study.',
  'Imam Muslim|204-261 AH / 819-875 CE|Hadith scholar|Hadith scholarship|Nishapur|Known for hadith collection, transmission criteria, and scholarly rigor.',
  'Imam Abu Hanifa|80-150 AH / 699-767 CE|Jurist and legal founder|Law and governance|Kufa|A foundational figure in legal reasoning, juristic debate, and the Hanafi tradition.',
  'Imam Malik|93-179 AH / 711-795 CE|Jurist and hadith scholar|Law and governance|Medina|Associated with Medinan practice, hadith transmission, and the Maliki legal school.',
  "Imam al-Shafi'i|150-204 AH / 767-820 CE|Jurist and legal theorist|Law and governance|Gaza, Mecca, Egypt|Important for legal theory, hadith-centered reasoning, and the Shafi'i school.",
  'Imam Ahmad ibn Hanbal|164-241 AH / 780-855 CE|Hadith scholar and jurist|Hadith scholarship|Baghdad|Remembered for hadith scholarship, legal tradition, and principled public witness.',
  'Al-Tabari|224-310 AH / 839-923 CE|Historian, exegete, and jurist|Tafsir and history|Tabaristan and Baghdad|Produced influential works in Qur’anic commentary and universal history.',
  'Ibn Kathir|701-774 AH / 1301-1373 CE|Historian and Qur’anic commentator|Tafsir and history|Damascus|Known for tafsir, biography, and historical compilation.',
  'Al-Qurtubi|c. 600-671 AH / c. 1204-1273 CE|Qur’anic commentator and jurist|Tafsir and law|Cordoba and Egypt|His commentary blends legal, linguistic, and devotional readings.',
  'Al-Suyuti|849-911 AH / 1445-1505 CE|Polymath and prolific author|Tafsir and hadith|Cairo|Remembered for encyclopedic scholarship across hadith, tafsir, language, and history.',
  "Al-Nawawi|631-676 AH / 1233-1277 CE|Jurist, hadith scholar, and ethicist|Hadith scholarship|Damascus|Known for concise ethical works, hadith commentary, and Shafi'i legal writing.",
  'Ibn Taymiyyah|661-728 AH / 1263-1328 CE|Theologian and jurist|Philosophy and theology|Harran and Damascus|A debated and influential voice in theology, law, public ethics, and reform.',
  'Ibn al-Qayyim|691-751 AH / 1292-1350 CE|Jurist, theologian, and spiritual author|Philosophy and theology|Damascus|Known for legal, spiritual, and ethical writings linked to reformist scholarship.',
  'Al-Juwayni|419-478 AH / 1028-1085 CE|Theologian and legal theorist|Philosophy and theology|Nishapur|An influential teacher and author in theology, law, and intellectual method.',
  'Al-Maturidi|c. 238-333 AH / c. 853-944 CE|Theologian|Philosophy and theology|Samarqand|Associated with theological reasoning, creed, and the Maturidi school.',
  "Abu al-Hasan al-Ash'ari|260-324 AH / 874-936 CE|Theologian|Philosophy and theology|Basra and Baghdad|A central figure in Sunni theological articulation and debate.",
  'Al-Kindi|c. 185-256 AH / c. 801-873 CE|Philosopher and translator|Philosophy and translation|Kufa and Baghdad|Known for philosophy, translation culture, mathematics, and scientific writing.',
  'Jabir ibn Hayyan|2nd century AH / 8th century CE|Alchemical authorial figure|Science and craft|Kufa|Associated with laboratory traditions, classification, and early chemical literature.',
  'Ibn al-Haytham|354-430 AH / 965-1040 CE|Optics scholar and mathematician|Astronomy and mathematics|Basra and Cairo|Known for optics, visual theory, experimental reasoning, and mathematics.',
  'Nasir al-Din al-Tusi|597-672 AH / 1201-1274 CE|Astronomer, mathematician, and theologian|Astronomy and mathematics|Tus and Maragha|Linked to observatory science, astronomy, geometry, and philosophical theology.',
  'Omar Khayyam|439-517 AH / 1048-1131 CE|Mathematician, astronomer, and poet|Astronomy and mathematics|Nishapur|Remembered for mathematics, calendar work, poetry, and philosophical reflection.',
  'Al-Jazari|6th century AH / 12th century CE|Engineer and inventor|Science and craft|Diyarbakir|Known for mechanical devices, water clocks, automata, and illustrated engineering.',
  'Abbas ibn Firnas|c. 194-274 AH / c. 810-887 CE|Inventor, poet, and polymath|Science and craft|Al-Andalus|Associated with experimentation, astronomy, materials, and flight traditions.',
  'Ibn al-Nafis|607-687 AH / 1213-1288 CE|Physician and legal scholar|Medicine and hospitals|Damascus and Cairo|Known for medical commentary, anatomy, and pulmonary circulation discussions.',
  'Al-Zahrawi|325-404 AH / 936-1013 CE|Surgeon and medical author|Medicine and hospitals|Cordoba|A major author on surgery, instruments, clinical method, and medical craft.',
  'Ibn Zuhr|c. 487-557 AH / c. 1094-1162 CE|Physician|Medicine and hospitals|Seville|Known for clinical medicine, observation, and medical writing in al-Andalus.',
  'Hunayn ibn Ishaq|194-260 AH / 809-873 CE|Translator and physician|Libraries and translation|Hira and Baghdad|A key figure in translation, medicine, language, and scholarly transmission.',
  'Ibn Bajjah|d. 533 AH / 1138 CE|Philosopher, physician, and musician|Philosophy and theology|Zaragoza and Fez|Known for philosophy, science, music, and intellectual life in al-Andalus.',
  'Ibn Tufayl|c. 500-581 AH / c. 1105-1185 CE|Philosopher and physician|Philosophy and theology|Guadix and Marrakesh|Known for philosophical fiction, medicine, and courtly intellectual circles.',
  'Mulla Sadra|c. 979-1050 AH / c. 1571-1640 CE|Philosopher and theologian|Philosophy and theology|Shiraz|Associated with transcendent philosophy, metaphysics, and theological synthesis.',
  'Shah Waliullah|1114-1176 AH / 1703-1762 CE|Scholar and reformer|Law and renewal|Delhi|Known for hadith scholarship, social reform, Qur’anic translation, and intellectual renewal.',
  'Sayyid Ahmad Khan|1232-1315 AH / 1817-1898 CE|Educator and reformer|Education and reform|India|Associated with modern education, social reform, and institutional debate.',
  'Muhammad Iqbal|1294-1357 AH / 1877-1938 CE|Poet-philosopher|Literature and poetry|Punjab|Known for poetry, philosophy, selfhood, renewal, and political imagination.',
  'Zaynab al-Ghazali|1335-1426 AH / 1917-2005 CE|Writer and activist|Women in Islamic history|Egypt|A modern writer and organizer whose life connects activism, memory, and public religion.',
  'Aisha bint Abi Bakr|d. 58 AH / 678 CE|Scholar, transmitter, and early community figure|Women in Islamic history|Medina|A major transmitter of knowledge and early authority in law, hadith, and memory.',
  'Khadija bint Khuwaylid|d. 3 BH / 619 CE|Patron and early Muslim figure|Women in Islamic history|Mecca|Remembered for support, leadership, trade, and the earliest Muslim community.',
  'Fatima al-Zahra|d. 11 AH / 632 CE|Early Muslim figure|Women in Islamic history|Medina|Central to family memory, devotional literature, and ethical imagination across traditions.',
  'Umm Salama|d. c. 62 AH / c. 681 CE|Scholar and early community figure|Women in Islamic history|Medina|Known for legal memory, counsel, and hadith transmission.',
  'Hafsa bint Umar|d. c. 45 AH / c. 665 CE|Early Muslim figure and manuscript guardian|Women in Islamic history|Medina|Associated with the preservation history of written Qur’anic materials.',
  "Rabi'a al-Adawiyya|c. 95-185 AH / c. 713-801 CE|Spiritual teacher and poet|Sufism and ethics|Basra|Known for devotional language, love of God, and later spiritual memory.",
  "Nana Asma'u|1210-1280 AH / 1793-1864 CE|Scholar, poet, and educator|Women in Islamic history|Sokoto|Associated with women’s education, poetry, networks of teachers, and reform.",
  'Lubna of Cordoba|4th century AH / 10th century CE|Librarian, secretary, and scholar|Libraries and translation|Cordoba|Remembered in accounts of libraries, learning, administration, and manuscript culture.',
  'Sutayta al-Mahamali|d. 377 AH / 987 CE|Mathematician and legal scholar|Women in Islamic history|Baghdad|Associated with mathematics, legal knowledge, and scholarly life in Baghdad.',
  'Maryam al-Asturlabi|4th century AH / 10th century CE|Instrument maker|Science and craft|Aleppo|Known in tradition for astrolabe making and technical skill.',
  'Shuhda al-Katiba|484-574 AH / 1091-1178 CE|Calligrapher and hadith scholar|Calligraphy and book arts|Baghdad|Associated with manuscript culture, teaching, and elegant calligraphy.',
  'Al-Shifa bint Abdullah|early 1st century AH / 7th century CE|Educator and early community figure|Women in Islamic history|Mecca and Medina|Remembered for literacy, teaching, and public responsibility.',
  'Karima al-Marwaziyya|d. 463 AH / 1070 CE|Hadith scholar|Women in Islamic history|Mecca|Known for transmission of Sahih al-Bukhari and scholarly authority.',
  "Nusaybah bint Ka'b|1st century AH / 7th century CE|Early Muslim figure|Women in Islamic history|Medina|Remembered for courage, witness, and early community service.",
  "Al-Mas'udi|c. 283-346 AH / c. 896-956 CE|Historian and geographer|Geography and travel|Baghdad and wider routes|Known for geography, history, ethnography, and broad world description.",
  'Ibn Jubayr|540-614 AH / 1145-1217 CE|Traveler and writer|Geography and travel|Valencia|His travel writing records pilgrimage routes, cities, ships, and social observation.',
  'Al-Idrisi|493-560 AH / 1100-1165 CE|Geographer and cartographer|Geography and travel|Ceuta and Sicily|Known for cartography, geography, travel knowledge, and courtly scholarship.',
  'Yaqut al-Hamawi|574-626 AH / 1179-1229 CE|Geographer and biographer|Geography and travel|Syria and Iraq|Compiled geographical and biographical knowledge across cities and regions.',
  'Ibn Fadlan|4th century AH / 10th century CE|Envoy and travel writer|Geography and travel|Abbasid lands and Volga region|Known for a travel account linking diplomacy, ethnography, and encounter.',
  'Al-Maqrizi|766-845 AH / 1364-1442 CE|Historian|History and historiography|Cairo|Associated with Egyptian history, urban memory, institutions, and economic observation.',
  'Ibn Asakir|499-571 AH / 1105-1176 CE|Historian and hadith scholar|History and historiography|Damascus|Known for biographical history and the scholarly memory of Damascus.',
  'Al-Dhahabi|673-748 AH / 1274-1348 CE|Historian and hadith critic|History and historiography|Damascus|A major biographer and hadith critic with wide chronological reach.',
  'Ibn Hajar al-Asqalani|773-852 AH / 1372-1449 CE|Hadith scholar and historian|Hadith scholarship|Cairo|Known for hadith commentary, biography, and legal scholarship.',
  'Jalal al-Din Rumi|604-672 AH / 1207-1273 CE|Poet and spiritual teacher|Literature and poetry|Balkh and Konya|Known for poetry, teaching circles, and expansive spiritual language.',
  'Saadi Shirazi|c. 589-691 AH / c. 1210-1291 CE|Poet and moralist|Literature and poetry|Shiraz|Remembered for prose, poetry, ethics, travel memory, and literary craft.',
  'Hafez Shirazi|c. 727-792 AH / c. 1325-1390 CE|Poet|Literature and poetry|Shiraz|Known for lyric poetry, literary beauty, and layered devotional imagery.',
  'Al-Mutanabbi|303-354 AH / 915-965 CE|Poet|Literature and poetry|Kufa and Aleppo|A major Arabic poet of ambition, power, language, and self-fashioning.',
  "Al-Ma'arri|363-449 AH / 973-1057 CE|Poet and philosopher|Literature and poetry|Ma'arrat al-Numan|Known for literary brilliance, ethical reflection, and philosophical skepticism.",
  'Yunus Emre|c. 638-720 AH / c. 1240-1320 CE|Poet and spiritual singer|Literature and poetry|Anatolia|A beloved voice in Turkish devotional poetry and public spirituality.',
  'Bulleh Shah|1091-1171 AH / 1680-1757 CE|Poet and spiritual writer|Literature and poetry|Punjab|Known for vernacular poetry, social critique, and mystical longing.',
  'Amir Khusrau|651-725 AH / 1253-1325 CE|Poet, musician, and court intellectual|Literature and poetry|Delhi|A major Indo-Persian literary figure linked to music, poetry, and court culture.',
  'Fuzuli|c. 900-963 AH / c. 1494-1556 CE|Poet|Literature and poetry|Iraq and Azerbaijan|Known for Turkish, Persian, and Arabic literary expression.',
  'Nizami Ganjavi|c. 535-605 AH / c. 1141-1209 CE|Poet|Literature and poetry|Ganja|Famous for narrative poetry, romance, ethics, and courtly imagination.',
  'Ibn Arabi|560-638 AH / 1165-1240 CE|Mystic philosopher and author|Sufism and ethics|Murcia and Damascus|A major figure in metaphysics, spiritual writing, and interpretive traditions.',
  'Abdul Qadir Gilani|470-561 AH / 1077-1166 CE|Spiritual teacher and jurist|Sufism and ethics|Gilan and Baghdad|Associated with teaching, ethics, sermons, and later Qadiri memory.',
  'Al-Junayd|d. 298 AH / 910 CE|Spiritual teacher|Sufism and ethics|Baghdad|Known for sober spiritual language, discipline, and early Sufi teaching.',
  'Al-Hallaj|244-309 AH / 858-922 CE|Mystic and poet|Sufism and ethics|Persia and Baghdad|A dramatic figure in spiritual literature, public controversy, and martyr memory.',
  'Al-Qushayri|376-465 AH / 986-1072 CE|Theologian and Sufi author|Sufism and ethics|Nishapur|Known for spiritual instruction, theology, and the Qushayri Risala.',
  'Ahmad al-Tijani|1150-1230 AH / 1737-1815 CE|Spiritual teacher|Sufism and ethics|North Africa|Associated with Tijani networks, devotional practice, and social formation.',
  'Ahmad Sirhindi|971-1034 AH / 1564-1624 CE|Scholar and spiritual reformer|Sufism and ethics|Sirhind|Known for reformist letters, spiritual discipline, and Mughal-era debates.',
  'Mimar Sinan|895-996 AH / 1490-1588 CE|Architect|Architecture and art|Ottoman domains|A master architect associated with mosques, civic buildings, and Ottoman urban form.',
  'Kamal al-Din Behzad|c. 855-942 AH / c. 1450-1535 CE|Painter and manuscript artist|Architecture and art|Herat and Tabriz|Known for manuscript painting, composition, and Persianate visual culture.',
  'Yahya ibn Mahmud al-Wasiti|7th century AH / 13th century CE|Illustrator and calligrapher|Calligraphy and book arts|Baghdad|Associated with illustrated manuscripts, narrative scenes, and book arts.',
  'Osman Hamdi Bey|1258-1326 AH / 1842-1910 CE|Painter, archaeologist, and museum founder|Architecture and art|Istanbul|Known for art, archaeology, museology, and late Ottoman cultural institutions.',
  'Mihrimah Sultan|928-985 AH / 1522-1578 CE|Patron of architecture|Architecture and art|Istanbul|Remembered for patronage, civic architecture, and Ottoman cultural networks.',
  'Zaha Hadid|1370-1437 AH / 1950-2016 CE|Architect|Architecture and art|Iraq and United Kingdom|A modern architectural figure useful for connecting heritage, form, and contemporary design.',
  'Saladin|532-589 AH / 1137-1193 CE|Ruler and military leader|Law and governance|Egypt and Syria|Remembered for statecraft, patronage, military leadership, and contested memory.',
  'Nur al-Din Zengi|511-569 AH / 1118-1174 CE|Ruler and patron|Law and governance|Syria|Associated with institutions, public works, patronage, and regional politics.',
  'Umar ibn Abd al-Aziz|61-101 AH / 681-720 CE|Caliph and reforming ruler|Law and governance|Umayyad domains|Remembered for justice narratives, administrative reform, and pious rulership.',
  'Harun al-Rashid|149-193 AH / 766-809 CE|Abbasid caliph|Law and governance|Baghdad|Linked to Abbasid court culture, patronage, diplomacy, and literary memory.',
  "Al-Ma'mun|170-218 AH / 786-833 CE|Abbasid caliph and patron|Libraries and translation|Baghdad|Associated with translation, debate, astronomy, and the politics of knowledge.",
  'Suleiman the Magnificent|900-974 AH / 1494-1566 CE|Ottoman sultan and lawgiver|Law and governance|Ottoman domains|Known for law, architecture, imperial administration, and cultural patronage.',
  'Akbar|949-1014 AH / 1542-1605 CE|Mughal emperor|Law and governance|South Asia|A major ruler connected to administration, patronage, debate, and imperial culture.',
  'Aurangzeb|1028-1118 AH / 1618-1707 CE|Mughal emperor|Law and governance|South Asia|A complex political figure tied to law, empire, piety, and historical debate.',
  'Abd al-Rahman III|277-350 AH / 891-961 CE|Andalusian ruler|Law and governance|Cordoba|Associated with state formation, diplomacy, architecture, and Andalusian urban culture.',
  'Mehmed II|835-886 AH / 1432-1481 CE|Ottoman sultan|Law and governance|Istanbul|Known for conquest, governance, legal organization, and patronage.',
  'Tipu Sultan|1163-1213 AH / 1750-1799 CE|Ruler and military reformer|Law and governance|Mysore|Connected to anti-colonial memory, military innovation, and statecraft.',
  'Usman dan Fodio|1168-1232 AH / 1754-1817 CE|Scholar, reformer, and founder|Education and reform|West Africa|A scholar-reformer linked to education, governance, poetry, and public renewal.',
  'Mansa Musa|c. 680-737 AH / c. 1280-1337 CE|Malian ruler and patron|Law and governance|Mali|Remembered for pilgrimage, patronage, trans-Saharan networks, and wealth narratives.',
  'Ibn Hazm|384-456 AH / 994-1064 CE|Jurist, theologian, and literary author|Law and governance|Cordoba|Known for legal debate, theology, literature, and Andalusian intellectual life.',
  'Al-Shatibi|d. 790 AH / 1388 CE|Legal theorist|Law and governance|Granada|Associated with objectives of law, legal method, and Andalusian scholarship.',
  'Al-Mawardi|364-450 AH / 974-1058 CE|Jurist and political theorist|Law and governance|Basra and Baghdad|Known for governance theory, law, ethics, and public administration.',
  'Nizam al-Mulk|408-485 AH / 1018-1092 CE|Vizier and institutional patron|Education and reform|Seljuk domains|Associated with political counsel, madrasas, and administrative culture.',
  'Ibn Qudamah|541-620 AH / 1147-1223 CE|Jurist and theologian|Law and governance|Jerusalem and Damascus|Known for Hanbali law, theology, and teaching.',
  'Al-Sarakhsi|d. c. 483 AH / 1090 CE|Jurist|Law and governance|Transoxiana|A major Hanafi legal author connected to method, commentary, and prison scholarship narratives.',
  'Al-Kasani|d. 587 AH / 1191 CE|Jurist|Law and governance|Aleppo|Known for legal exposition and Hanafi jurisprudence.',
  'Al-Marghinani|530-593 AH / 1135-1197 CE|Jurist|Law and governance|Farghana|Associated with legal manuals, teaching, and Hanafi transmission.',
  'Fakhr al-Din al-Razi|544-606 AH / 1150-1210 CE|Theologian and commentator|Tafsir and theology|Rayy and Herat|Known for tafsir, theology, philosophy, and argumentative method.',
  'Al-Baydawi|d. c. 685 AH / c. 1286 CE|Qur’anic commentator and jurist|Tafsir and theology|Shiraz|Associated with concise tafsir, legal thought, and theological synthesis.',
  'Al-Zamakhshari|467-538 AH / 1075-1144 CE|Linguist and Qur’anic commentator|Tafsir and language|Khwarazm|Known for Arabic language, rhetoric, and influential commentary.',
  'Al-Wahidi|d. 468 AH / 1076 CE|Qur’anic scholar|Tafsir and language|Nishapur|Remembered for exegetical works and reports on occasions of revelation.',
  'Al-Raghib al-Isfahani|d. c. 502 AH / c. 1108 CE|Lexicographer and ethical author|Tafsir and language|Isfahan|Known for Qur’anic vocabulary, ethics, and language study.',
  'Ibn Ajiba|1160-1224 AH / 1747-1809 CE|Commentator and spiritual author|Sufism and tafsir|Morocco|Associated with tafsir, spiritual commentary, and Moroccan scholarly traditions.',
  'Al-Tirmidhi|209-279 AH / 824-892 CE|Hadith scholar|Hadith scholarship|Tirmidh|Known for hadith compilation, legal headings, and transmitter evaluation.',
  'Abu Dawud|202-275 AH / 817-889 CE|Hadith scholar|Hadith scholarship|Sijistan|Compiled an important hadith collection with legal organization.',
  "Al-Nasa'i|214-303 AH / 829-915 CE|Hadith scholar|Hadith scholarship|Khurasan and Egypt|Known for hadith compilation, travel, and transmitter criticism.",
  'Ibn Majah|209-273 AH / 824-887 CE|Hadith scholar|Hadith scholarship|Qazvin|Associated with hadith collection and transmission networks.',
  'Sufyan al-Thawri|97-161 AH / 716-778 CE|Jurist and hadith scholar|Hadith scholarship|Kufa|Known for asceticism, hadith, law, and moral authority.',
  "Al-Layth ibn Sa'd|94-175 AH / 713-791 CE|Jurist and scholar|Law and governance|Egypt|A major Egyptian jurist remembered for learning, generosity, and legal judgment.",
  "Al-Awza'i|88-157 AH / 707-774 CE|Jurist|Law and governance|Syria|Associated with Syrian legal tradition, public ethics, and early jurisprudence.",
  'Hasan al-Basri|21-110 AH / 642-728 CE|Preacher and spiritual teacher|Sufism and ethics|Basra|Known for moral counsel, early piety, and spiritual instruction.',
  'Al-Jahiz|159-255 AH / 776-868 CE|Essayist and literary thinker|Literature and language|Basra|A major prose stylist associated with adab, argument, science, and society.',
  'Al-Firdausi|329-411 AH / 940-1020 CE|Epic poet|Literature and poetry|Tus|Known for epic literature, kingship memory, and Persian literary imagination.',
  'Ibn Khalikan|608-681 AH / 1211-1282 CE|Biographer and judge|History and historiography|Irbil and Damascus|Known for biographical literature, judgeship, and scholarly networks.',
] as const

const americanMuslimRows = [
  'Muhammad Ali|1942-2016|Athlete, humanitarian, and public conscience|American sports and public life|Kentucky and national public life|Remembered for boxing, anti-war witness, civil-rights-era visibility, philanthropy, and global humanitarian memory.',
  'Malcolm X|1925-1965|Minister, organizer, and human rights advocate|American civic leadership|Nebraska, Michigan, New York, and wider public life|A major American Muslim voice whose life connects civil rights, international human rights, self-education, and public transformation.',
  'Kareem Abdul-Jabbar|1947-|Athlete, author, and public intellectual|American sports and public life|New York and California|Known for basketball, writing, cultural criticism, education, and long public advocacy.',
  'Keith Ellison|1963-|Attorney general and former U.S. representative|American civic leadership|Minnesota|Among the best-known Muslim elected officials in the United States, linked to public service, law, and civic representation.',
  'Ilhan Omar|1982-|U.S. representative|American civic leadership|Minnesota|A public figure connected to refugee experience, congressional service, representation, and national policy debates.',
  'Rashida Tlaib|1976-|U.S. representative and attorney|American civic leadership|Michigan|Known for congressional service, community advocacy, and Palestinian American representation.',
  'André Carson|1974-|U.S. representative|American civic leadership|Indiana|A Muslim member of Congress whose profile connects public safety, civic service, and national representation.',
  'Huma Abedin|1976-|Public servant and author|American civic leadership|New York and Washington, D.C.|Known for public service, political work, memoir, and Muslim American public visibility.',
  'Nusrat Choudhury|1976-|Federal judge and civil-rights attorney|American civic leadership|New York|A legal figure connected to civil rights, federal service, and representation in the judiciary.',
  'Zahid Quraishi|1975-|Federal judge and former military prosecutor|American service and armed forces|New Jersey|Known for judicial service, military legal service, and public milestones for Muslim Americans.',
  'Humayun Khan|1976-2004|U.S. Army officer|American service and armed forces|Virginia and Iraq|Remembered for military service, sacrifice, public memorialization, and American Muslim civic memory.',
  'Kareem Rashad Sultan Khan|1987-2007|U.S. Army soldier|American service and armed forces|New Jersey and Iraq|Remembered for U.S. Army service and as a prominent example in discussions of Muslim American military sacrifice.',
  'James Yee|1968-|Former U.S. Army chaplain and author|American service and armed forces|Washington state and national public life|Known for military chaplaincy, legal controversy, writing, and debates over civil liberties.',
  'Ahmed Kousay al-Taie|1965-2012|U.S. Army soldier and interpreter|American service and armed forces|Iraq and the United States|Remembered for U.S. Army service, language work, captivity, and recovery of remains.',
  'Shirin Neshat|1957-|Visual artist and filmmaker|American arts and media|New York|An artist whose work connects identity, gender, exile, visual culture, and museum exhibition.',
  'Shahzia Sikander|1969-|Artist|American arts and media|New York and Texas|Known for contemporary art, manuscript traditions, animation, public art, and global exhibition history.',
  'Mahershala Ali|1974-|Actor|American arts and media|California|An award-winning actor whose public profile connects performance, representation, and American Muslim visibility.',
  'Dave Chappelle|1973-|Comedian and writer|American arts and media|Ohio and national public life|A major comic voice whose public biography includes American Muslim identity and cultural influence.',
  'Hasan Minhaj|1985-|Comedian, writer, and presenter|American arts and media|California and New York|Known for political comedy, storytelling, media criticism, and South Asian Muslim American experience.',
  'Yasiin Bey|1973-|Musician and actor|American arts and media|New York|Known for hip-hop, acting, public thought, and a creative career often discussed with Muslim identity.',
  'Iman|1955-|Model, entrepreneur, and philanthropist|American arts and media|New York|Known for fashion, business, philanthropy, refugee memory, and global public culture.',
  'Ahmad Jamal|1930-2023|Jazz pianist and composer|American arts and media|Pennsylvania and national music culture|A major jazz musician connected to performance, composition, influence, and American Muslim cultural history.',
  'Hamdi Ulukaya|1972-|Entrepreneur and philanthropist|American business and philanthropy|New York and Idaho|Known for Chobani, refugee employment, philanthropy, and business-led social impact.',
  'Shahid Khan|1950-|Business leader and sports owner|American business and philanthropy|Illinois and Florida|A prominent entrepreneur whose public profile connects manufacturing, sports ownership, philanthropy, and immigrant success.',
  'Jawed Karim|1979-|Technology entrepreneur|American business and philanthropy|California|Known as a YouTube co-founder, linking technology, entrepreneurship, and public digital culture.',
  'Fareed Zakaria|1964-|Journalist and author|American literature and thought|New York and Washington, D.C.|Known for journalism, books, interviews, and public analysis of world affairs.',
  'Reza Aslan|1972-|Writer, scholar, and media producer|American literature and thought|California|Known for books, religious studies, television work, and public commentary.',
  'Khaled Hosseini|1965-|Novelist and humanitarian|American literature and thought|California|Known for fiction, refugee advocacy, and humanitarian work connected to Afghanistan and the United States.',
  'Laila Lalami|1968-|Novelist and essayist|American literature and thought|California|Known for fiction, essays, migration narratives, and public literary work.',
  'G. Willow Wilson|1982-|Writer|American literature and thought|United States|Known for fiction, comics, and creating prominent Muslim representation in American popular culture.',
  'Ayesha Jalal|1956-|Historian and academic|American scholarship and science|Massachusetts|Known for South Asian history, public scholarship, and university teaching.',
  'Talal Asad|1932-|Anthropologist|American scholarship and science|New York|An influential scholar of religion, secularism, anthropology, and modernity.',
  'Akbar Ahmed|1943-|Anthropologist, author, and former diplomat|American scholarship and science|Washington, D.C.|Known for public scholarship, teaching, interfaith dialogue, and writing on Muslim societies.',
  'Zia Mian|1960-|Physicist and peace-studies scholar|American scholarship and science|New Jersey|Known for nuclear-policy research, peace studies, public scholarship, and academic service.',
  'Muhammad Suhail Zubairy|1952-|Physicist|American scholarship and science|Texas|Known for quantum optics, research leadership, teaching, and scientific publication.',
  'Aziz Sancar|1946-|Biochemist and Nobel laureate|American scholarship and science|North Carolina|Known for DNA repair research, teaching, and scientific service in the United States.',
] as const

const americanEditorsPickNames = new Set([
  'Keith Ellison',
  'Ilhan Omar',
  'Rashida Tlaib',
  'André Carson',
  'Huma Abedin',
  'Nusrat Choudhury',
  'Zahid Quraishi',
  'Hamdi Ulukaya',
  'Shahid Khan',
  'Jawed Karim',
  'Aziz Sancar',
  'Muhammad Suhail Zubairy',
  'Zia Mian',
  'Ayesha Jalal',
  'Talal Asad',
  'Akbar Ahmed',
  'Humayun Khan',
  'Kareem Rashad Sultan Khan',
  'James Yee',
  'Ahmed Kousay al-Taie',
])

const historicalEditorsPickNames = new Set([
  'Ibn Khaldun',
  'Al-Biruni',
  'Fatima al-Fihri',
  'Ibn Sina',
  'Aisha bint Abi Bakr',
  'Al-Khwarizmi',
  'Ibn al-Haytham',
  'Mimar Sinan',
])

const todayRelevanceFor = (name: string, theme: Personality['theme']) => {
  if (name === 'Keith Ellison') {
    return 'Featured for readers reviewing American Muslim civic leadership, public law, public service, and practical contribution to United States institutions.'
  }

  if (name === 'Ilhan Omar') {
    return 'Featured for readers reviewing representation, refugee experience, congressional service, and public policy work in the United States.'
  }

  if (name === 'Rashida Tlaib') {
    return 'Featured for readers reviewing constituent service, congressional advocacy, legal training, and public representation in United States civic life.'
  }

  if (name === 'André Carson') {
    return 'Featured for readers reviewing public safety, congressional service, civic work, and Muslim American representation in national institutions.'
  }

  if (name === 'Nusrat Choudhury') {
    return 'Featured for readers reviewing civil-rights law, federal judicial service, and professional contribution to United States public institutions.'
  }

  if (name === 'Zahid Quraishi') {
    return 'Featured for readers reviewing military legal service, federal judicial work, and professional public service in the United States.'
  }

  if (name === 'Hamdi Ulukaya') {
    return 'Featured for readers reviewing enterprise, employment, refugee support, philanthropy, and business-led civic contribution in the United States.'
  }

  if (name === 'Shahid Khan') {
    return 'Featured for readers reviewing manufacturing, entrepreneurship, sports ownership, philanthropy, and immigrant contribution to American economic life.'
  }

  if (name === 'Aziz Sancar') {
    return 'Featured for readers reviewing scientific research, university teaching, public knowledge, and Nobel-recognized scholarship in the United States.'
  }

  if (name === 'Zia Mian') {
    return 'Featured for readers reviewing nuclear-policy research, peace studies, public scholarship, and civic responsibility in American academic life.'
  }

  if (name === 'Humayun Khan') {
    return 'Featured for readers reviewing military service, sacrifice, citizenship, and the public memory of American Muslim service members.'
  }

  if (name === 'Muhammad Ali') {
    return 'Highlighted for readers thinking about courage, public conscience, sports, humanitarian service, and how American Muslims contribute to civic life beyond one profession.'
  }

  if (name === 'Ibn Khaldun') {
    return 'Highlighted for readers thinking about social cohesion, institutions, historical causality, and how societies explain their own rise and decline.'
  }

  return theme === 'american_muslims'
    ? 'Included in the United States index as a source-backed entry point for public service, culture, scholarship, creativity, or humanitarian contribution.'
    : undefined
}

const buildPersonalityList = ({
  editorPickNames,
  rows,
  startingPopularity,
  theme,
}: {
  editorPickNames: Set<string>
  rows: readonly string[]
  startingPopularity: number
  theme: Personality['theme']
}): Personality[] =>
  rows.map((row, index) => {
  const [name, era, role, category, region, summary] = row.split('|')

  return {
    category,
    editorsPick: editorPickNames.has(name),
    era,
    href: `/personalities/${slugify(name)}`,
    imageUrl: portraitImageOverrides[name],
    initials: initialsFor(name),
    name,
    popularity: startingPopularity - index * 5,
    region,
    role,
    slug: slugify(name),
    summary,
    theme,
    todayRelevance: todayRelevanceFor(name, theme),
    tone: tones[index % tones.length],
    wikipediaTitle: wikipediaTitleFor(name),
  }
  })

export const americanMuslimPersonalities = buildPersonalityList({
  editorPickNames: americanEditorsPickNames,
  rows: americanMuslimRows,
  startingPopularity: 1280,
  theme: 'american_muslims',
})

export const historicalPersonalities = buildPersonalityList({
  editorPickNames: historicalEditorsPickNames,
  rows: personalityRows,
  startingPopularity: 980,
  theme: 'muslims_in_history',
})

export const personalities: Personality[] = [...americanMuslimPersonalities, ...historicalPersonalities]

export const getWikipediaUrl = (person: Pick<Personality, 'wikipediaTitle'>) =>
  `https://en.wikipedia.org/wiki/${person.wikipediaTitle}`

export const getWikiShiaSearchUrl = (person: Pick<Personality, 'name'>) =>
  `https://en.wikishia.net/index.php?search=${encodeURIComponent(person.name)}`

export const getPersonalityReferences = (person: Personality) =>
  person.theme === 'american_muslims'
    ? [
        {
          label: 'Wikipedia biography',
          note: 'Open encyclopedia reference; import requires attribution and compatible licensing.',
          url: getWikipediaUrl(person),
        },
        {
          label: 'Wikipedia list of American Muslims',
          note: 'Starter index for names and categories. Use original editorial prose and verify every claim.',
          url: 'https://en.wikipedia.org/wiki/List_of_American_Muslims',
        },
        ...(person.category === 'American service and armed forces'
          ? [
              {
                label: 'Military History Fandom category',
                note: 'Starter category for service-related names. Verify each biography with stronger sources.',
                url: 'https://military-history.fandom.com/wiki/Category:American_Muslims',
              },
            ]
          : []),
      ]
    : [
        {
          label: 'Wikipedia',
          note: 'Open encyclopedia reference; import requires attribution and compatible licensing.',
          url: getWikipediaUrl(person),
        },
        {
          label: 'WikiShia lookup',
          note: 'Use as a reference lookup when relevant; verify page, license, and editorial fit before importing.',
          url: getWikiShiaSearchUrl(person),
        },
      ]

export const getPersonalityDetailSections = (person: Personality) => [
  {
    body: `${person.name} is presented as ${person.role.toLowerCase()} associated with ${person.region}. The working chronology for this record is ${person.era}. ${person.summary}`,
    heading: 'Biography and setting',
  },
  {
    body:
      categoryContexts[person.category] ||
      'This profile connects biography, works, institutions, places, and source-backed context so readers can move from a public overview into deeper research.',
    heading: 'Research context',
  },
  {
    body:
      person.theme === 'american_muslims'
        ? 'The record should expand with verified biography, public service, community impact, interviews, published work, institutional sources, and rights-cleared images or video. Open web lists below are reference starting points, not a substitute for editorial review.'
        : 'The record should expand with primary works, teacher-student links, places, manuscript or media records, scholarly debates, and citations. Wikipedia and WikiShia links below are reference starting points, not a substitute for editorial review.',
    heading: 'Editorial expansion plan',
  },
  {
    body: `For publication, editors should add citations beneath each major claim, record whether the source is primary or secondary, and preserve attribution if any open-licensed wiki text is adapted.`,
    heading: 'Source and attribution notes',
  },
]

export const featuredPersonality =
  americanMuslimPersonalities.find((person) => person.name === 'Keith Ellison') ||
  americanMuslimPersonalities[0]

const editorPickOrder = [
  'Keith Ellison',
  'Ilhan Omar',
  'Rashida Tlaib',
  'André Carson',
  'Huma Abedin',
  'Nusrat Choudhury',
  'Zahid Quraishi',
  'Hamdi Ulukaya',
  'Shahid Khan',
  'Jawed Karim',
  'Aziz Sancar',
  'Muhammad Suhail Zubairy',
  'Zia Mian',
]

export const editorsPicks = editorPickOrder
  .map((name) => americanMuslimPersonalities.find((person) => person.name === name))
  .filter((person): person is Personality => Boolean(person))

const homepageSpotlightNames = [
  'Keith Ellison',
  'Ilhan Omar',
  'Rashida Tlaib',
  'André Carson',
  'Huma Abedin',
  'Nusrat Choudhury',
  'Zahid Quraishi',
  'Humayun Khan',
  'Kareem Rashad Sultan Khan',
  'James Yee',
  'Ahmed Kousay al-Taie',
  'Hamdi Ulukaya',
  'Shahid Khan',
  'Jawed Karim',
  'Aziz Sancar',
  'Muhammad Suhail Zubairy',
  'Zia Mian',
  'Ayesha Jalal',
  'Talal Asad',
  'Akbar Ahmed',
  'Fareed Zakaria',
  'Khaled Hosseini',
  'Laila Lalami',
]

export const popularPersonalities = homepageSpotlightNames
  .map((name) => americanMuslimPersonalities.find((person) => person.name === name))
  .filter((person): person is Personality => Boolean(person))

export const personalityCategories = Array.from(
  new Set(personalities.map((person) => person.category)),
).sort()

export const americanMuslimCategories = Array.from(
  new Set(americanMuslimPersonalities.map((person) => person.category)),
).sort()

export const historicalPersonalityCategories = Array.from(
  new Set(historicalPersonalities.map((person) => person.category)),
).sort()

export const storyRows: StoryRow[] = [
  {
    body: 'This story introduces the project’s United States focus through public law, civic representation, public service, faith, identity, and how American Muslims have aided wider communities.',
    embedId: 'BpeZAm7rKHY',
    href: '/stories/american-muslim-public-life-and-humanity',
    length: '09:13',
    name: 'Keith Ellison',
    role: 'Attorney General and civic leader',
    slug: 'american-muslim-public-life-and-humanity',
    story: 'American Muslim public life and humanity',
    summary:
      'A front-door story for American Muslim civic leadership, public service, and institutional contribution.',
  },
  {
    body: 'This chapter frames Muhammad Ali as an athlete whose public choices turned fame into moral argument, humanitarian memory, and civic education.',
    embedId: 'tjPHL5f5JQs',
    href: '/stories/muhammad-ali-courage-conscience-and-service',
    length: '08:20',
    name: 'Muhammad Ali',
    role: 'Athlete, humanitarian, and public conscience',
    slug: 'muhammad-ali-courage-conscience-and-service',
    story: 'Courage, conscience, and service',
    summary:
      'A chaptered profile path for Muhammad Ali, public conscience, sport, faith, and humanitarian memory.',
  },
  {
    body: 'This chapter models how the archive can document American Muslim military service with biography, public memory, family testimony, and source confidence.',
    embedId: 'BpeZAm7rKHY',
    href: '/stories/service-sacrifice-and-american-muslim-memory',
    length: '06:35',
    name: 'Humayun Khan',
    role: 'U.S. Army officer',
    slug: 'service-sacrifice-and-american-muslim-memory',
    story: 'Service, sacrifice, and American Muslim memory',
    summary:
      'A story path for military service, civic memory, and American Muslim sacrifice.',
  },
  {
    body: 'This chapter shows how business, employment, philanthropy, and refugee support can be presented as public-service work in a research archive.',
    embedId: 'BpeZAm7rKHY',
    href: '/stories/enterprise-philanthropy-and-community-care',
    length: '05:25',
    name: 'Hamdi Ulukaya',
    role: 'Entrepreneur and philanthropist',
    slug: 'enterprise-philanthropy-and-community-care',
    story: 'Enterprise, philanthropy, and community care',
    summary:
      'A public-benefit story connecting business leadership, refugee support, and civic contribution.',
  },
  {
    body: 'This chapter frames research as service: laboratory work, teaching, institutions, and the public value of knowledge.',
    embedId: 'BpeZAm7rKHY',
    href: '/stories/science-research-and-public-good',
    length: '05:40',
    name: 'Aziz Sancar',
    role: 'Biochemist and Nobel laureate',
    slug: 'science-research-and-public-good',
    story: 'Science, research, and public good',
    summary:
      'A research-story model for science, higher education, and public knowledge.',
  },
  {
    body: 'This chapter explores art as a public archive: image, memory, migration, gender, institutions, and the responsibilities of credit and context.',
    embedId: 'BpeZAm7rKHY',
    href: '/stories/art-memory-and-american-muslim-visibility',
    length: '04:55',
    name: 'Shirin Neshat',
    role: 'Visual artist and filmmaker',
    slug: 'art-memory-and-american-muslim-visibility',
    story: 'Art, memory, and American Muslim visibility',
    summary:
      'A visual-culture story for art, identity, migration, and museum context.',
  },
  {
    body: 'This story page combines a short documentary segment, an edited transcript passage, a related personality dossier, and source notes. It is written as an editorial model for chapter-based biography.',
    embedId: '5dM9DRrgneA',
    href: '/stories/writing-history-as-a-science-of-society',
    length: '06:20',
    name: 'Ibn Khaldun',
    role: 'Historian and social theorist',
    slug: 'writing-history-as-a-science-of-society',
    story: 'Writing history as a science of society',
    summary: 'A chaptered introduction to historical method, social cohesion, and the Muqaddimah.',
  },
  {
    body: 'This chapter presents a comparative scholar at work: measuring places, reading cultures, recording calendars, and treating observation as a discipline.',
    embedId: '3bs1DkR5a0o',
    href: '/stories/measuring-the-earth-reading-cultures',
    length: '04:45',
    name: 'Al-Biruni',
    role: 'Astronomer, mathematician, comparative scholar',
    slug: 'measuring-the-earth-reading-cultures',
    story: 'Measuring the earth, reading cultures carefully',
    summary: 'A story path for astronomy, geography, chronology, and comparative scholarship.',
  },
  {
    body: 'This chapter uses institution history to show how endowments, teaching spaces, manuscripts, and community memory can be woven into one public page.',
    embedId: 'YF40jI1FU5U',
    href: '/stories/a-waqf-a-mosque-and-a-lasting-institution',
    length: '03:35',
    name: 'Fatima al-Fihri',
    role: 'Founder and patron of learning',
    slug: 'a-waqf-a-mosque-and-a-lasting-institution',
    story: 'A waqf, a mosque, and a lasting institution',
    summary: 'A research path for women, learning institutions, patronage, and Fez.',
  },
  {
    body: 'This chapter shows how medicine, philosophy, classification, and translation can be arranged into a readable public story with sources below.',
    embedId: 'c8HlFFDTBWQ',
    href: '/stories/medicine-method-and-the-canon-tradition',
    length: '05:10',
    name: 'Ibn Sina',
    role: 'Physician and philosopher',
    slug: 'medicine-method-and-the-canon-tradition',
    story: 'Medicine, method, and the Canon tradition',
    summary: 'A chapter on medical learning, method, commentary, and reception.',
  },
  {
    body: 'An editorial model for engineering history, using illustrated devices, workshop culture, and technical explanations for general readers.',
    embedId: 'mYzPxwnGs34',
    href: '/stories/machines-water-and-illustrated-engineering',
    length: '04:10',
    name: 'Al-Jazari',
    role: 'Engineer and inventor',
    slug: 'machines-water-and-illustrated-engineering',
    story: 'Machines, water, and illustrated engineering',
    summary: 'A visual story for mechanisms, craft, automata, and design history.',
  },
  {
    body: 'This story shows how architecture pages can connect place, patronage, drawings, civic life, and an image-rights trail.',
    embedId: 'liiD4BwujMU',
    href: '/stories/building-an-ottoman-cityscape',
    length: '05:45',
    name: 'Mimar Sinan',
    role: 'Architect',
    slug: 'building-an-ottoman-cityscape',
    story: 'Building an Ottoman cityscape',
    summary: 'A narrative path for architecture, patronage, urban life, and visual evidence.',
  },
]

type ChapterTemplate = Omit<StoryChapter, 'views' | 'startSeconds'> & { startSeconds?: number }

const chapterTemplates: Record<string, ChapterTemplate[]> = {
  'Al-Biruni': [
    {
      duration: '03:42',
      title: 'Chronology as a scholarly instrument',
      transcript:
        'This segment introduces Al-Biruni through chronology, observation, and the discipline of comparing calendars and historical claims.',
    },
    {
      duration: '04:18',
      title: 'Measuring distance, earth, and place',
      transcript:
        'The chapter connects astronomical measurement, geography, and the habit of testing inherited reports against calculation.',
    },
    {
      duration: '05:06',
      title: 'Reading cultures with care',
      transcript:
        'Al-Biruni is framed as a comparative scholar whose writing asks readers to understand other learned worlds on their own terms.',
    },
    {
      duration: '02:49',
      title: 'Instruments, tables, and transmission',
      transcript:
        'A short bridge into the archive modules for instruments, manuscripts, translations, and later reception.',
    },
  ],
  'Ibn Khaldun': [
    {
      duration: '04:10',
      title: 'History as more than reports',
      transcript:
        'The opening chapter explains why Ibn Khaldun treated history as a disciplined inquiry into society, power, and causality.',
    },
    {
      duration: '03:38',
      title: 'Asabiyyah and social cohesion',
      transcript:
        'This segment introduces group feeling as a way to read political formation, solidarity, and decline.',
    },
    {
      duration: '05:12',
      title: 'Cities, dynasties, and institutions',
      transcript:
        'The story moves from biography into institutions, urban life, taxation, learning, and the rhythms of rule.',
    },
    {
      duration: '02:57',
      title: 'Reading the Muqaddimah today',
      transcript:
        'A closing segment shows how the record can link texts, translations, expert essays, and source notes.',
    },
  ],
  'Ibn Sina': [
    {
      duration: '03:55',
      title: 'Medicine, logic, and classification',
      transcript:
        'This chapter introduces Ibn Sina through medical organization, philosophical method, and the Canon tradition.',
    },
    {
      duration: '04:22',
      title: 'The Canon as a teaching system',
      transcript:
        'The record connects clinical writing, commentary, translation, and the long afterlife of medical education.',
    },
    {
      duration: '03:31',
      title: 'Philosophy beside practice',
      transcript:
        'This segment explains how metaphysics, logic, and medical practice can be presented together for public readers.',
    },
  ],
}

const defaultChapters = (person: Personality): ChapterTemplate[] => [
  {
    duration: '03:20',
    title: `Setting the scene for ${person.name}`,
    transcript: `${person.name} is introduced through place, chronology, teachers, institutions, and the sources that anchor the record.`,
  },
  {
    duration: '04:05',
    title: `Major works and public memory`,
    transcript: `This chapter links the personality to works, institutions, later reception, source confidence, and editorial questions.`,
  },
  {
    duration: '02:48',
    title: `Why this record matters now`,
    transcript: `A short interpretive segment connects biography to readers, educators, and researchers using the archive.`,
  },
]

export const youtubeVideos: YoutubeVideo[] = [
  {
    embedId: 'BpeZAm7rKHY',
    language: 'English',
    note:
      'English-language seed embed for the United States homepage focus and American Muslim history.',
    source: 'PBS / WETA / YouTube',
    title: 'American Muslims: A History Revealed',
    topic: 'American Muslims in the United States',
  },
  {
    embedId: 'tjPHL5f5JQs',
    language: 'English',
    note:
      'English-language seed embed for Muhammad Ali and public-memory story pages. Replace with approved/licensed media before launch.',
    source: 'Biography / YouTube',
    title: 'Muhammad Ali biography',
    topic: 'Muhammad Ali',
  },
  {
    embedId: '5dM9DRrgneA',
    language: 'English',
    note:
      'English-language seed embed for history, social theory, and Ibn Khaldun-related story pages.',
    source: 'Al Mayadeen English / YouTube',
    title: 'Figures in History: Ibn Khaldun',
    topic: 'Ibn Khaldun',
  },
  {
    embedId: '3bs1DkR5a0o',
    language: 'English',
    note:
      'English-language seed embed for astronomy, geography, instruments, and Al-Biruni-related pages.',
    source: 'Al Jazeera English / YouTube',
    title: 'Science in a Golden Age: Astronomy',
    topic: 'Al-Biruni',
  },
  {
    embedId: 'K5XKjk0-hCo',
    language: 'English',
    note:
      'English-language seed embed for translation, libraries, Abbasid Baghdad, and knowledge culture.',
    source: 'Khan Academy / YouTube',
    title: 'The House of Wisdom, Baghdad',
    topic: 'House of Wisdom',
  },
  {
    embedId: 'c8HlFFDTBWQ',
    language: 'English',
    note: 'English-language seed embed for medicine, hospitals, Avicenna, and medical culture.',
    source: 'Al Jazeera English / YouTube',
    title: 'Islamic Medicine | Al Jazeera World',
    topic: 'Ibn Sina',
  },
  {
    embedId: 'mYzPxwnGs34',
    language: 'English',
    note: 'English-language seed embed for engineering, automata, diagrams, and Al-Jazari.',
    source: 'Al Jazeera English / YouTube',
    title: 'The Book of Knowledge of Ingenious Mechanical Devices',
    topic: 'Al-Jazari',
  },
  {
    embedId: 'YF40jI1FU5U',
    language: 'English',
    note: 'English-language seed embed for Fatima al-Fihri, al-Qarawiyyin, and institutional learning.',
    source: 'DW History and Culture / YouTube',
    title: "Fatima al-Fihri, founder of the world's first university",
    topic: 'Fatima al-Fihri',
  },
  {
    embedId: 'liiD4BwujMU',
    language: 'English',
    note: 'English-language seed embed for Ottoman architecture and Mimar Sinan.',
    source: 'TRT World / YouTube',
    title: 'Ottoman Architect Mimar Sinan: The Master of Geometry',
    topic: 'Mimar Sinan',
  },
  {
    embedId: 'jvnU0v6hcUo',
    language: 'English',
    note: 'English-language seed embed for Mansa Musa, West Africa, travel, and Islam in Africa.',
    source: 'CrashCourse / YouTube',
    title: 'Mansa Musa and Islam in Africa: Crash Course World History',
    topic: 'Mansa Musa',
  },
]

const videoByEmbedId = Object.fromEntries(youtubeVideos.map((video) => [video.embedId, video]))
const videoByTopic = Object.fromEntries(youtubeVideos.map((video) => [video.topic, video]))

const personalityVideoTopics: Record<string, string> = {
  'Ahmed Kousay al-Taie': 'American Muslims in the United States',
  'Al-Biruni': 'Al-Biruni',
  'Al-Jazari': 'Al-Jazari',
  'Aziz Sancar': 'American Muslims in the United States',
  'Fatima al-Fihri': 'Fatima al-Fihri',
  'Hamdi Ulukaya': 'American Muslims in the United States',
  'Humayun Khan': 'American Muslims in the United States',
  'Ibn Khaldun': 'Ibn Khaldun',
  'Ibn Sina': 'Ibn Sina',
  'Kareem Abdul-Jabbar': 'American Muslims in the United States',
  'Malcolm X': 'American Muslims in the United States',
  'Mansa Musa': 'Mansa Musa',
  'Mimar Sinan': 'Mimar Sinan',
  'Muhammad Ali': 'Muhammad Ali',
  'Shirin Neshat': 'American Muslims in the United States',
}

const categoryVideoTopics: Record<string, string> = {
  'Architecture and art': 'House of Wisdom',
  'Astronomy and mathematics': 'Al-Biruni',
  'Calligraphy and book arts': 'House of Wisdom',
  'Education and reform': 'House of Wisdom',
  'Geography and travel': 'Al-Biruni',
  'Hadith scholarship': 'House of Wisdom',
  'History and historiography': 'Ibn Khaldun',
  'Law and governance': 'Ibn Khaldun',
  'Libraries and translation': 'House of Wisdom',
  'Literature and language': 'House of Wisdom',
  'Literature and poetry': 'House of Wisdom',
  'Medicine and hospitals': 'Ibn Sina',
  'Medicine and philosophy': 'Ibn Sina',
  'Philosophy and law': 'Ibn Khaldun',
  'Philosophy and theology': 'House of Wisdom',
  'Philosophy and translation': 'House of Wisdom',
  'Science and craft': 'Al-Jazari',
  'Sufism and ethics': 'House of Wisdom',
  'Sufism and tafsir': 'House of Wisdom',
  'Tafsir and hadith': 'House of Wisdom',
  'Tafsir and history': 'Ibn Khaldun',
  'Tafsir and language': 'House of Wisdom',
  'Tafsir and law': 'Ibn Khaldun',
  'Tafsir and theology': 'House of Wisdom',
  'Women in Islamic history': 'Fatima al-Fihri',
  'American arts and media': 'American Muslims in the United States',
  'American business and philanthropy': 'American Muslims in the United States',
  'American civic leadership': 'American Muslims in the United States',
  'American literature and thought': 'American Muslims in the United States',
  'American scholarship and science': 'American Muslims in the United States',
  'American service and armed forces': 'American Muslims in the United States',
  'American sports and public life': 'American Muslims in the United States',
}

export const getPersonalityVideo = (person: Personality, story?: Pick<StoryRow, 'embedId'>) => {
  if (story?.embedId && videoByEmbedId[story.embedId]) {
    return {
      ...videoByEmbedId[story.embedId],
      note: 'Story-specific YouTube embed connected to this page.',
    }
  }

  const directTopic = personalityVideoTopics[person.name]
  const categoryTopic = categoryVideoTopics[person.category]
  const fallbackTopic = person.popularity % 2 === 0 ? 'House of Wisdom' : 'Ibn Khaldun'
  const video =
    (directTopic && videoByTopic[directTopic]) ||
    (categoryTopic && videoByTopic[categoryTopic]) ||
    videoByTopic[fallbackTopic] ||
    youtubeVideos[0]

  return {
    ...video,
    note:
      directTopic && video.topic === directTopic
        ? 'Person-specific seed embed. Replace from the CMS if the editorial team approves a better source.'
        : `Theme-level seed embed for ${person.category}. Replace with a dedicated ${person.name} video during editorial review.`,
  }
}

export const getPersonalityStory = (person: Personality) =>
  storyRows.find((story) => story.name === person.name) || {
    body: `${person.name} story module with video, transcript, source notes, and related archive records.`,
    embedId: getPersonalityVideo(person).embedId,
    href: `${person.href}#media`,
    length: '03:20',
    name: person.name,
    role: person.role,
    slug: `${person.slug}-story`,
    story: `${person.name}: life, work, and legacy`,
    summary: person.summary,
  }

export const getStoryChapters = (person: Personality): StoryChapter[] =>
  (chapterTemplates[person.name] || defaultChapters(person)).map((chapter, index) => ({
    ...chapter,
    startSeconds: chapter.startSeconds ?? index * 220,
    views: 738 - index * 83,
  }))

export const getRelatedStoriesForPerson = (person: Personality) => {
  const direct = storyRows.filter((story) => story.name !== person.name)
  return direct.slice(0, 7)
}

export const getStoryDetailSections = (story: StoryRow, person: Personality) => [
  {
    heading: 'Full story frame',
    body: [
      `${story.body} The public story page is designed to work like a chapter in a documentary archive: a visitor can watch the video, jump to a timestamp, read the relevant transcript, open the person dossier, and check the sources that support the narration.`,
      `For ${person.name}, the story should connect the basic biography to the larger question behind the record: ${person.summary}`,
    ],
  },
  {
    heading: 'Narrative outline',
    body: getStoryChapters(person).map(
      (chapter, index) =>
        `${String(index + 1).padStart(2, '0')}. ${chapter.title}: ${chapter.transcript}`,
    ),
  },
  {
    heading: 'Source and editorial notes',
    body: [
      'The embedded YouTube video is a placeholder external reference for local testing. Before launch, editors should confirm embedding rights, replace the video with a licensed or owned media asset where possible, and keep a visible credit/source note beside the player.',
      'Reader comments remain gated behind sign-in. Internal editors can still revise the story, transcript, sources, and rights notes from the admin workspace, with audit logs recording who changed what and when.',
    ],
  },
]

export const sponsorRows: SponsorRow[] = [
  {
    adLabel: 'Travel partner',
    focus: 'Cultural travel and regional discovery support for public learning programs.',
    href: '/sponsors/switzerland-of-asia',
    name: 'Switzerland of Asia',
    slug: 'switzerland-of-asia',
    summary:
      'Sponsor placement for travel, hospitality, and cultural destination support connected to public education and documentary storytelling.',
    type: 'Travel and culture',
  },
  {
    adLabel: 'Development partner',
    details: [
      {
        heading: 'Group overview',
        body: 'Hashim Group Companies in Turkey offer property and real-estate project services. Public sponsor details can be expanded by the editorial team after legal and brand review.',
      },
      {
        heading: 'Public references',
        body: 'The sponsor record can link to the official Hashim Property website and approved project video references once final sponsor copy is confirmed.',
      },
    ],
    focus: 'Development visibility and sponsor support for public archive presentation.',
    href: '/sponsors/hashim-group',
    bannerImage: '/hashim-group-banner.png',
    name: 'Hashim Group',
    slug: 'hashim-group',
    summary:
      'Hashim Group sponsor page with document-derived public overview fields prepared for admin review and future expansion.',
    type: 'Organization',
    websiteLabel: 'Visit Hashim Property',
    websiteUrl: 'https://hashimproperty.com/',
  },
  {
    adLabel: 'Community benefit',
    focus: 'Health, public benefit, and community-facing research support.',
    href: '/sponsors/patient-benefits-foundation',
    name: 'Patient Benefits Foundation',
    slug: 'patient-benefits-foundation',
    summary:
      'Sponsor placement for health, welfare, and public-benefit initiatives connected to community service documentation.',
    type: 'Foundation',
  },
  {
    adLabel: 'Airline partner',
    focus: 'Travel access and international connectivity for public programming.',
    href: '/sponsors/emirates',
    name: 'Emirates',
    slug: 'emirates',
    summary:
      'Sponsor placement for global travel and international connectivity support around review events and public programming.',
    type: 'Corporate sponsor',
  },
]

export const getSponsorForRecord = (slug: string) =>
  sponsorRows[
    Math.abs(
      slug.split('').reduce((total, character) => total + character.charCodeAt(0), 0),
    ) % sponsorRows.length
  ]

export const themes = [
  'American civic leadership',
  'American service and armed forces',
  'American sports and public life',
  'American arts and media',
  'American scholarship and science',
  'American business and philanthropy',
  'American literature and thought',
  'Hadith scholarship',
  'Medicine and hospitals',
  'Law and governance',
  'Astronomy and mathematics',
  'Libraries and translation',
  'Women in Islamic history',
  'Tafsir and language',
  'Sufism and ethics',
  'Geography and travel',
  'Literature and poetry',
  'Architecture and art',
  'Education and reform',
  'Calligraphy and book arts',
  'Science and craft',
  'Philosophy and theology',
]

export const timelineEvents = [
  {
    body:
      'Muhammad Ali becomes a central American Muslim public figure whose biography links sport, faith, anti-war conscience, humanitarian work, and global public memory.',
    date: '1942-2016',
    href: '/personalities/muhammad-ali',
    people: ['Muhammad Ali'],
    title: 'Muhammad Ali and public conscience',
    type: 'Personality',
    year: 1942,
  },
  {
    body:
      'Malcolm X anchors a research path for civil rights, human rights, self-education, public transformation, and American Muslim civic memory.',
    date: '1925-1965',
    href: '/personalities/malcolm-x',
    people: ['Malcolm X'],
    title: 'Malcolm X and human rights memory',
    type: 'Personality',
    year: 1965,
  },
  {
    body:
      'Humayun Khan is used as a service-memory record linking American Muslim military service, family testimony, sacrifice, and public civic debate.',
    date: '2004',
    href: '/stories/service-sacrifice-and-american-muslim-memory',
    people: ['Humayun Khan'],
    title: 'Service, sacrifice, and American Muslim memory',
    type: 'Story',
    year: 2004,
  },
  {
    body:
      'Khadija bint Khuwaylid is linked to the earliest Muslim community, trade, patronage, and the personal setting of revelation.',
    date: 'd. 619 CE / 3 BH',
    href: '/personalities/khadija-bint-khuwaylid',
    people: ['Khadija bint Khuwaylid'],
    title: 'Early patronage and community formation',
    type: 'Personality',
    year: 619,
  },
  {
    body:
      'Aisha bint Abi Bakr becomes a major anchor for hadith transmission, legal memory, and early community history.',
    date: 'd. 678 CE / 58 AH',
    href: '/personalities/aisha-bint-abi-bakr',
    people: ['Aisha bint Abi Bakr'],
    title: 'Transmission, legal memory, and early authority',
    type: 'Personality',
    year: 678,
  },
  {
    body:
      'Al-Ma\'mun and Baghdad are used as an index point for translation circles, libraries, astronomy, and court patronage.',
    date: 'early 9th century CE / 3rd century AH',
    href: '/articles/house-of-wisdom',
    people: ['Al-Ma\'mun', 'Hunayn ibn Ishaq', 'Al-Kindi'],
    title: 'House of Wisdom and Abbasid translation culture',
    type: 'Institution',
    year: 830,
  },
  {
    body:
      'Al-Khwarizmi connects algebra, calculation, astronomical tables, and the movement of mathematical vocabulary.',
    date: 'c. 820 CE / 3rd century AH',
    href: '/personalities/al-khwarizmi',
    people: ['Al-Khwarizmi'],
    title: 'Algebra, tables, and calculation',
    type: 'Personality',
    year: 820,
  },
  {
    body:
      'Fatima al-Fihri and the al-Qarawiyyin tradition create an editorial path for endowment, learning, Fez, and source confidence.',
    date: '9th century CE / 3rd century AH',
    href: '/stories/a-waqf-a-mosque-and-a-lasting-institution',
    people: ['Fatima al-Fihri'],
    title: 'Institutional learning in Fez',
    type: 'Institution',
    year: 859,
  },
  {
    body:
      'Al-Razi links clinical observation, hospital practice, medical ethics, and the development of medical writing.',
    date: '865-925 CE / 251-313 AH',
    href: '/personalities/al-razi',
    people: ['Al-Razi'],
    title: 'Clinical observation and medical authorship',
    type: 'Personality',
    year: 900,
  },
  {
    body:
      'Al-Biruni-era research joins astronomy, geography, chronology, measurement, and comparative cultural study.',
    date: '973-1048 CE / 362-440 AH',
    href: '/stories/measuring-the-earth-reading-cultures',
    people: ['Al-Biruni'],
    title: 'Observation, geography, and comparative method',
    type: 'Story',
    year: 1010,
  },
  {
    body:
      'Ibn Sina’s Canon tradition connects medicine, logic, classification, hospitals, teaching, and later commentary.',
    date: '980-1037 CE / 370-428 AH',
    href: '/stories/medicine-method-and-the-canon-tradition',
    people: ['Ibn Sina'],
    title: 'Medicine, method, and the Canon tradition',
    type: 'Story',
    year: 1020,
  },
  {
    body:
      'Al-Ghazali’s works let the archive connect theology, law, ethics, philosophy, education, and spiritual reform.',
    date: '1058-1111 CE / 450-505 AH',
    href: '/personalities/al-ghazali',
    people: ['Al-Ghazali'],
    title: 'Ethics, law, theology, and reform',
    type: 'Personality',
    year: 1095,
  },
  {
    body:
      'Al-Jazari’s illustrated engineering can support diagrams, workshop notes, animated explainers, and object-centered stories.',
    date: 'late 12th-early 13th century CE',
    href: '/stories/machines-water-and-illustrated-engineering',
    people: ['Al-Jazari'],
    title: 'Machines, water, and illustrated engineering',
    type: 'Story',
    year: 1206,
  },
  {
    body:
      'Ibn Rushd anchors legal method, medicine, philosophical commentary, Andalusian debate, and reception history.',
    date: '1126-1198 CE / 520-595 AH',
    href: '/personalities/ibn-rushd',
    people: ['Ibn Rushd'],
    title: 'Law, philosophy, medicine, and commentary',
    type: 'Personality',
    year: 1180,
  },
  {
    body:
      'Rumi’s public memory connects poetry, spiritual instruction, performance, translation, and global reception.',
    date: '1207-1273 CE / 604-672 AH',
    href: '/personalities/jalal-al-din-rumi',
    people: ['Jalal al-Din Rumi'],
    title: 'Poetry, teaching circles, and spiritual language',
    type: 'Personality',
    year: 1245,
  },
  {
    body:
      'Mansa Musa’s pilgrimage and patronage open a West African path through learning, travel, wealth narratives, and trans-Saharan networks.',
    date: 'c. 1280-1337 CE / c. 680-737 AH',
    href: '/personalities/mansa-musa',
    people: ['Mansa Musa'],
    title: 'West African patronage and public memory',
    type: 'Personality',
    year: 1324,
  },
  {
    body:
      'Ibn Khaldun’s Muqaddimah page sequence connects biography, video chapters, text excerpts, expert essays, and source notes.',
    date: '14th century CE / 8th century AH',
    href: '/articles/muqaddimah',
    people: ['Ibn Khaldun'],
    title: 'The Muqaddimah and historical causality',
    type: 'Major work',
    year: 1377,
  },
  {
    body:
      'Mimar Sinan’s buildings create a visual timeline path for patronage, Ottoman urban life, mosque architecture, and rights-cleared imagery.',
    date: '1490-1588 CE / 895-996 AH',
    href: '/stories/building-an-ottoman-cityscape',
    people: ['Mimar Sinan'],
    title: 'Architecture, patronage, and Ottoman cityscape',
    type: 'Story',
    year: 1550,
  },
  {
    body:
      'Nana Asma\'u anchors women’s education, poetry, reform, teaching networks, and West African manuscript culture.',
    date: '1793-1864 CE / 1210-1280 AH',
    href: '/personalities/nana-asmau',
    people: ['Nana Asma\'u'],
    title: 'Women’s education and reform networks',
    type: 'Personality',
    year: 1840,
  },
  {
    body:
      'Muhammad Iqbal helps connect modern poetry, philosophy, renewal, political imagination, and public pedagogy.',
    date: '1877-1938 CE / 1294-1357 AH',
    href: '/personalities/muhammad-iqbal',
    people: ['Muhammad Iqbal'],
    title: 'Modern poetry, philosophy, and renewal',
    type: 'Personality',
    year: 1930,
  },
]

export const sourceRows = [
  {
    note: 'Public starter list used only for names/categories in the American Muslim seed dataset. Profile prose remains original editorial summary pending review.',
    status: 'Attribution required',
    title: 'Wikipedia: List of American Muslims',
    type: 'Open web source',
  },
  {
    note: 'Military-history category used as a starter index for American Muslim service-related records. Verify each record before publication.',
    status: 'Attribution required',
    title: 'Military History Fandom: American Muslims category',
    type: 'Open web source',
  },
  {
    note: 'A source record can store credit, rights status, public-domain reasoning, watermark settings, and where the image appears.',
    status: 'Public domain review',
    title: 'Manuscript scan: Zakhirat al-muead',
    type: 'Image source',
  },
  {
    note: 'A book source can store author, title, publisher, year, page range, edition notes, archive URL, and citation text.',
    status: 'Publication source',
    title: 'Muqaddimah edition and translation',
    type: 'Book source',
  },
  {
    note: 'A private transcript can store interviewee, interviewer, date, location, media type, approval status, and access limits.',
    status: 'Restricted source',
    title: 'Expert interview transcript',
    type: 'Private transcript',
  },
  {
    note: 'Open web articles should preserve source URL, access date, license, revision/date viewed, and attribution language.',
    status: 'Attribution required',
    title: 'Open encyclopedia reference',
    type: 'Web source',
  },
]

export const blogPosts = [
  {
    date: 'Editorial note',
    href: '/blog',
    summary: 'A model post for explaining attribution, source hierarchy, and uncertainty.',
    title: 'How we mark source confidence on disputed biographies',
  },
  {
    date: 'Contributor process',
    href: '/blog',
    summary: 'Shows how editors can import an expert essay, edit it, and preserve approval status.',
    title: 'From expert submission to approved essay',
  },
  {
    date: 'Media note',
    href: '/blog',
    summary: 'A policy note for AI-assisted media, watermarks, credits, and review gates.',
    title: 'Building short archive videos with clear AI disclosure',
  },
]

export const articleRows = [
  {
    href: '/articles/house-of-wisdom',
    kind: 'Institution',
    slug: 'house-of-wisdom',
    summary:
      'An encyclopedia-style article shape for translation circles, libraries, patronage, and scholarly debate in Abbasid Baghdad.',
    title: 'House of Wisdom',
  },
  {
    href: '/articles/muqaddimah',
    kind: 'Major work',
    slug: 'muqaddimah',
    summary:
      'A public article for the structure, themes, reception, and source history of Ibn Khaldun’s major work.',
    title: 'The Muqaddimah',
  },
  {
    href: '/articles/bimaristan',
    kind: 'Concept',
    slug: 'bimaristan',
    summary:
      'A research article model for hospitals, medical education, charitable institutions, and urban welfare.',
    title: 'Bimaristan',
  },
  {
    href: '/articles/astrolabe',
    kind: 'Object',
    slug: 'astrolabe',
    summary:
      'A source-backed article model for instruments, astronomy, navigation, teaching, and craft knowledge.',
    title: 'Astrolabe',
  },
  {
    href: '/articles/source-confidence',
    kind: 'Policy',
    slug: 'source-confidence',
    summary:
      'How the archive labels source confidence, open-licensed starter references, expert review, and rights status.',
    title: 'Source Confidence and Attribution',
  },
  {
    href: '/articles/islamic-golden-age',
    kind: 'Historical Event',
    slug: 'islamic-golden-age',
    summary:
      'A broad reference article connecting knowledge culture, institutions, translation, medicine, astronomy, law, and literature.',
    title: 'Islamic Golden Age',
  },
  {
    href: '/articles/madrasas-and-waqf',
    kind: 'Institution',
    slug: 'madrasas-and-waqf',
    summary:
      'A public reference article for endowments, institutions, teaching spaces, and the care needed around historical claims.',
    title: 'Madrasas and Waqf',
  },
]

export type ArticleDetail = {
  infobox: Array<{ label: string; value: string }>
  relatedPeople: string[]
  sections: Array<{ body: string[]; heading: string }>
  sourceLinks: Array<{ label: string; url: string }>
  tableOfContents: string[]
}

const articleDetailMap: Record<string, ArticleDetail> = {
  'house-of-wisdom': {
    infobox: [
      { label: 'Article type', value: 'Institution and translation culture' },
      { label: 'Primary place', value: 'Baghdad' },
      { label: 'Main period', value: 'Abbasid period, especially 8th-10th centuries CE' },
      { label: 'Connected themes', value: 'Libraries, translation, astronomy, medicine, philosophy' },
    ],
    relatedPeople: ['Al-Ma\'mun', 'Hunayn ibn Ishaq', 'Al-Kindi', 'Al-Khwarizmi'],
    sections: [
      {
        heading: 'Overview',
        body: [
          'The House of Wisdom is used here as a gateway article for Abbasid-era knowledge culture in Baghdad: translation, court patronage, libraries, astronomical work, medical writing, mathematics, and philosophical vocabulary. The public page should avoid treating it as a single modern university-like institution; the stronger editorial approach is to describe a cluster of activities, people, libraries, patrons, and translation practices that later memory grouped under the Bayt al-Hikma tradition.',
          'For MVP testing, this article models how an encyclopedia page can carry more detail than a story card while still keeping sources, rights notes, and related personalities immediately visible.',
        ],
      },
      {
        heading: 'Translation and language work',
        body: [
          'Abbasid translation activity moved Greek, Syriac, Persian, Sanskrit, and other bodies of learning into Arabic scholarly usage. Translators did more than substitute words: they built technical vocabulary, compared manuscript witnesses, revised earlier versions, and made texts teachable for astronomers, physicians, philosophers, mathematicians, and court scholars.',
          'Hunayn ibn Ishaq is a useful anchor for this section because his career connects medicine, language skill, manuscript comparison, and the practical craft of making older learning usable in Arabic.',
        ],
      },
      {
        heading: 'Patronage and institutions',
        body: [
          'Caliphal and elite patronage mattered because translation, copying, instrument-making, and commentary required money, time, books, and professional networks. Al-Ma\'mun is often associated with this culture, but the article should also show the broader ecology: courts, private libraries, hospitals, observatories, mosques, teaching circles, and book markets.',
          'This section is deliberately written as a source-confidence zone. Editors can mark which claims are widely accepted, which are debated, and which depend on later historical memory.',
        ],
      },
      {
        heading: 'What readers can open next',
        body: [
          'Readers should be able to jump from this page to personalities such as Al-Khwarizmi, Al-Kindi, Hunayn ibn Ishaq, Al-Biruni, Ibn Sina, and Al-Jazari; to themes such as Libraries and Translation; and to source records that explain which images or quotations are licensed for publication.',
        ],
      },
    ],
    sourceLinks: [
      { label: 'Wikipedia: House of Wisdom', url: 'https://en.wikipedia.org/wiki/House_of_Wisdom' },
      { label: 'Wikipedia: Hunayn ibn Ishaq', url: 'https://en.wikipedia.org/wiki/Hunayn_ibn_Ishaq' },
      { label: 'Wikipedia: Al-Ma\'mun', url: 'https://en.wikipedia.org/wiki/Al-Ma%27mun' },
    ],
    tableOfContents: ['Overview', 'Translation and language work', 'Patronage and institutions', 'What readers can open next'],
  },
  muqaddimah: {
    infobox: [
      { label: 'Article type', value: 'Major work' },
      { label: 'Author', value: 'Ibn Khaldun' },
      { label: 'Composed', value: '14th century CE / 8th century AH' },
      { label: 'Connected themes', value: 'Historiography, society, political authority, economy, education' },
    ],
    relatedPeople: ['Ibn Khaldun', 'Al-Maqrizi', 'Ibn Khalikan', 'Al-Tabari'],
    sections: [
      {
        heading: 'Overview',
        body: [
          'The Muqaddimah is the introductory volume to Ibn Khaldun’s larger history and one of the most useful anchor texts for this archive’s public mission: it lets readers see a historical thinker asking how societies form, how power is organized, why dynasties rise and decline, and why historical reports require disciplined criticism.',
          'This page should be presented as both a book article and a research hub. A reader can begin with the overview, then open story chapters on social cohesion, urban life, taxation, education, and historical method.',
        ],
      },
      {
        heading: 'Historical method',
        body: [
          'Ibn Khaldun warns that reports about the past can be distorted by partisanship, habit, exaggeration, misunderstanding of social conditions, or blind trust in transmitters. The archive page should translate that insight into a modern reading tool: every major claim needs a source, a confidence note, and a visible path to supporting material.',
          'This section is also where editors can attach excerpts, expert essays, and side-by-side notes showing how historians interpret the work differently.',
        ],
      },
      {
        heading: 'Asabiyyah and political life',
        body: [
          'One of the best-known ideas associated with the Muqaddimah is asabiyyah, often discussed as group feeling, social cohesion, solidarity, or collective force. The page should explain the idea carefully without flattening it into a single modern slogan. Ibn Khaldun uses it to think about tribe, rule, discipline, urban luxury, and the changing strength of dynasties.',
          'For public readers, this section can link to maps, timelines, and examples from North African and wider Islamic history.',
        ],
      },
      {
        heading: 'Education, economy, and urban life',
        body: [
          'The Muqaddimah is valuable because it does not isolate politics from other parts of society. It includes remarks on crafts, cities, taxation, education, language, scholarship, and the habits formed by different kinds of livelihood. That breadth makes it ideal for a research-based site where readers can move from a personality page into themes and related articles.',
        ],
      },
      {
        heading: 'Reception and editorial caution',
        body: [
          'Modern readers often call Ibn Khaldun a founder or forerunner of sociology, economics, or philosophy of history. This can be useful as a doorway, but the article should keep the older intellectual setting visible and explain that modern labels are interpretive, not the whole story.',
        ],
      },
    ],
    sourceLinks: [
      { label: 'Wikipedia: Muqaddimah', url: 'https://en.wikipedia.org/wiki/Muqaddimah' },
      { label: 'Wikipedia: Ibn Khaldun', url: 'https://en.wikipedia.org/wiki/Ibn_Khaldun' },
      { label: 'WikiShia search: Ibn Khaldun', url: 'https://en.wikishia.net/index.php?search=Ibn%20Khaldun' },
    ],
    tableOfContents: [
      'Overview',
      'Historical method',
      'Asabiyyah and political life',
      'Education, economy, and urban life',
      'Reception and editorial caution',
    ],
  },
  bimaristan: {
    infobox: [
      { label: 'Article type', value: 'Concept and institution' },
      { label: 'Connected field', value: 'Medicine and hospitals' },
      { label: 'Public modules', value: 'Definitions, places, personalities, source notes' },
    ],
    relatedPeople: ['Ibn Sina', 'Al-Razi', 'Ibn al-Nafis', 'Al-Zahrawi'],
    sections: [
      {
        heading: 'Overview',
        body: [
          'A bimaristan article should explain hospitals as institutions of care, teaching, urban charity, administration, and medical record keeping. It should distinguish between different regions and periods rather than implying one fixed model everywhere.',
        ],
      },
      {
        heading: 'Clinical learning and public welfare',
        body: [
          'This section can connect medical authors to hospitals, pharmacies, endowments, licensing debates, and the social meaning of public care. It is also a strong place for images, floor plans, source excerpts, and historian notes.',
        ],
      },
    ],
    sourceLinks: [
      { label: 'Wikipedia: Bimaristan', url: 'https://en.wikipedia.org/wiki/Bimaristan' },
      { label: 'Wikipedia: Islamic medicine', url: 'https://en.wikipedia.org/wiki/Medicine_in_the_medieval_Islamic_world' },
    ],
    tableOfContents: ['Overview', 'Clinical learning and public welfare'],
  },
  astrolabe: {
    infobox: [
      { label: 'Article type', value: 'Object and instrument' },
      { label: 'Connected field', value: 'Astronomy, navigation, education' },
      { label: 'Public modules', value: 'Object gallery, diagrams, people, source records' },
    ],
    relatedPeople: ['Al-Biruni', 'Maryam al-Asturlabi', 'Al-Khwarizmi', 'Ibn al-Haytham'],
    sections: [
      {
        heading: 'Overview',
        body: [
          'An astrolabe page should make an object legible to a general visitor: what it is, how it was used, which problems it helped solve, and how instrument-making connects mathematics, craft, astronomy, navigation, and teaching.',
        ],
      },
      {
        heading: 'Craft, calculation, and teaching',
        body: [
          'The best public version of this article would combine a diagram, a short video, a glossary, and linked personality records. It can also hold rights-cleared museum images once the archive has permission or public-domain confirmation.',
        ],
      },
    ],
    sourceLinks: [{ label: 'Wikipedia: Astrolabe', url: 'https://en.wikipedia.org/wiki/Astrolabe' }],
    tableOfContents: ['Overview', 'Craft, calculation, and teaching'],
  },
}

export const getArticleDetail = (article: (typeof articleRows)[number]): ArticleDetail =>
  articleDetailMap[article.slug] || {
    infobox: [
      { label: 'Article type', value: article.kind },
      { label: 'Review state', value: 'Seed draft for editorial expansion' },
      { label: 'Public modules', value: 'Overview, table of contents, related records, source links' },
    ],
    relatedPeople: ['Ibn Khaldun', 'Al-Biruni', 'Ibn Sina', 'Fatima al-Fihri'],
    sections: [
      {
        heading: 'Overview',
        body: [
          `${article.summary} This seed article is structured for expansion into a source-backed encyclopedia page with visible citations, related personalities, and reusable media blocks.`,
        ],
      },
      {
        heading: 'Editorial expansion plan',
        body: [
          'Editors can add section-level citations, expert-reviewed notes, images with rights records, timeline anchors, and links to story chapters. Each claim should be supported by a source record before publication.',
        ],
      },
    ],
    sourceLinks: [
      {
        label: 'Wikipedia search starter',
        url: `https://en.wikipedia.org/w/index.php?search=${encodeURIComponent(article.title)}`,
      },
    ],
    tableOfContents: ['Overview', 'Editorial expansion plan'],
  }

export const contributors = [
  {
    focus: 'Medieval social thought, historiography, and public education.',
    name: 'Dr. Maryam Siddiqui',
    role: 'Historian and editorial reviewer',
  },
  {
    focus: 'Manuscripts, metadata, rights notes, and archive citations.',
    name: 'Omar Faruqi',
    role: 'Research editor',
  },
  {
    focus: 'Narrative scripts, documentary story arcs, and transcript editing.',
    name: 'Layla Rahman',
    role: 'Writer and narrator',
  },
  {
    focus: 'Illustrated timelines, maps, visual essays, and image credits.',
    name: 'Yusuf Karim',
    role: 'Artist and visual researcher',
  },
  {
    focus: 'Hadith, law, tafsir, and scholarly-source review.',
    name: 'Dr. Hamza Qureshi',
    role: 'Subject reviewer',
  },
  {
    focus: 'Audio cleanup, documentary clips, and synthetic-media disclosure.',
    name: 'Sara Nadeem',
    role: 'Media producer',
  },
]

export const workflowTests = [
  'Create a new personality record and fill name, era, tradition, works, biography, timeline, sources, and source-confidence notes.',
  'Upload an image or PDF in Media and fill rights status, credit line, watermark flag, caption, and public delivery setting.',
  'Create an Expert Essay, attach the submitted Word/PDF file, paste extracted text, edit the draft, and check Expert Approved.',
  'Create a Story with video, audio, or text format, transcript segments, chapters, related personalities, and sources.',
  'Create a social post draft for LinkedIn or X, connect it to an article or story, and leave it in approval status.',
  'Create an AI work request for reader Q&A, summary, metadata suggestions, or video draft generation.',
  'Use the Preview button on supported records before publishing so editors can review the public page shape.',
]

export const searchItems: SearchItem[] = [
  ...personalities.slice(0, 12).map((person) => ({
    href: person.href,
    meta: `${person.role}, ${person.region}`,
    summary: person.summary,
    title: person.name,
    type: 'Personality' as const,
  })),
  ...themes.slice(0, 8).map((theme) => ({
    href: '/themes',
    meta: 'Research theme',
    summary: `Browse personalities, stories, sources, and timelines connected to ${theme.toLowerCase()}.`,
    title: theme,
    type: 'Theme' as const,
  })),
  ...storyRows.map((story) => ({
    href: story.href,
    meta: `${story.name}, ${story.length}`,
    summary: story.summary,
    title: story.story,
    type: 'Story' as const,
  })),
  ...articleRows.map((article) => ({
    href: article.href,
    meta: article.kind,
    summary: article.summary,
    title: article.title,
    type: 'Article' as const,
  })),
  ...sourceRows.map((source) => ({
    href: '/sources',
    meta: `${source.type}, ${source.status}`,
    summary: source.note,
    title: source.title,
    type: 'Source' as const,
  })),
  ...blogPosts.map((post) => ({
    href: post.href,
    meta: post.date,
    summary: post.summary,
    title: post.title,
    type: 'Blog' as const,
  })),
  ...contributors.map((contributor) => ({
    href: '/contributors',
    meta: contributor.role,
    summary: contributor.focus,
    title: contributor.name,
    type: 'Contributor' as const,
  })),
]

export const searchGroups = [
  'Personality',
  'Theme',
  'Story',
  'Source',
  'Article',
  'Essay',
  'Blog',
  'Contributor',
] as const
