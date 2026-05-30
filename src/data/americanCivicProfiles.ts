export type CuratedPersonType =
  | 'author'
  | 'historian'
  | 'institution_builder'
  | 'other'
  | 'poet_litterateur'
  | 'scholar'
  | 'scientist_physician'

export type CuratedProfileVideo = {
  externalVideoUrl: string
  note: string
  source: string
  title: string
  youtubeEmbedId: string
}

export type AmericanCivicProfileUpdate = {
  fullBio: string[]
  personType: CuratedPersonType
  slug: string
  sourceUrls: string[]
  video?: CuratedProfileVideo
}

export const noApprovedVideoNote =
  'No verified, person-specific public video has been approved yet. The public page intentionally shows a neutral video placeholder instead of an unrelated embed.'

export const americanCivicProfileUpdates: AmericanCivicProfileUpdate[] = [
  {
    fullBio: [
      'Muhammad Ali began life as Cassius Marcellus Clay Jr. in Louisville, Kentucky, and became one of the most recognizable athletes of the twentieth century. His boxing career made him a global figure, but his civic importance comes from the way he joined athletic excellence to public conscience. After embracing Islam and taking the name Muhammad Ali, he used fame to argue about race, dignity, war, and religious freedom in front of audiences far beyond sports.',
      'Ali refused induction into the U.S. military during the Vietnam War on religious and moral grounds, lost his title, and later returned to boxing after the Supreme Court overturned his conviction. The Muhammad Ali Center frames his legacy around confidence, conviction, dedication, giving, respect, and spirituality, making him a useful archive entry for sponsors who want this project to show how Muslim public lives can connect courage, service, and civic education.',
    ],
    personType: 'other',
    slug: 'muhammad-ali',
    sourceUrls: [
      'https://alicenter.org/meet-ali/six-core-principles/',
      'https://www.archives.gov/research/african-americans/individuals/muhammad-ali',
      'https://www.britannica.com/biography/Muhammad-Ali-boxer',
    ],
  },
  {
    fullBio: [
      'Malcolm X was born Malcolm Little in Omaha, Nebraska, and became one of the most important American Muslim voices in the civil-rights era. His early life included family disruption, prison, and intense self-education. In prison he joined the Nation of Islam, and after his release he became a disciplined organizer and speaker whose critique of racism, policing, media, and American hypocrisy reached national audiences.',
      'After leaving the Nation of Islam, Malcolm X made the pilgrimage to Mecca and embraced Sunni Islam, taking the name el-Hajj Malik el-Shabazz. That final period widened his language from Black nationalism toward international human rights and Muslim brotherhood while retaining his insistence on self-respect and self-defense. His profile belongs in the archive because it shows transformation, intellectual growth, and the public consequences of American Muslim moral witness.',
    ],
    personType: 'other',
    slug: 'malcolm-x',
    sourceUrls: [
      'https://www.nps.gov/semo/learn/historyculture/malcolm-x.htm',
      'https://home.nps.gov/articles/000/learning-from-malcolm-x.htm',
      'https://www.britannica.com/biography/Malcolm-X',
    ],
  },
  {
    fullBio: [
      'Kareem Abdul-Jabbar, born Ferdinand Lewis Alcindor Jr. in New York City, became a dominant college and professional basketball player before building a second public life as an author, educator, and social commentator. His UCLA and NBA careers made him one of basketballs central figures, and his skyhook, longevity, and championship record remain part of American sports memory.',
      'Abdul-Jabbar converted to Islam while at UCLA and publicly took his Muslim name in 1971. In later decades he became known for essays, books, historical writing, youth education, and public argument about race, citizenship, and social justice. The archive treats him as more than an athlete: his page shows how Muslim identity, Black intellectual life, and long-form civic commentary can sit beside elite performance.',
    ],
    personType: 'author',
    slug: 'kareem-abdul-jabbar',
    sourceUrls: [
      'https://www.hoophall.com/hall-of-famers/kareem-abdul-jabbar',
      'https://www.britannica.com/biography/Kareem-Abdul-Jabbar',
      'https://www.brown.edu/news/2017-10-16/abdul-jabbar',
    ],
  },
  {
    fullBio: [
      'Keith Ellison is a Minnesota lawyer and public official whose career connects civil-rights law, legislative service, and statewide public office. Before becoming Minnesota attorney general, he served in the Minnesota House and then represented Minnesotas 5th Congressional District in the U.S. House of Representatives from 2007 to 2019. His official biography emphasizes work on consumer, worker, environmental, civil-rights, and human-rights protections.',
      'In 2019 Ellison became Minnesota attorney general, describing the office as the Peoples Lawyer. His record also includes years as an attorney focused on civil-rights and defense law, including leadership of the Legal Rights Center. For the homepage, Ellison is a strong lead profile because he represents visible Muslim service inside mainstream American legal institutions and gives sponsors a concrete example of civic contribution.',
    ],
    personType: 'other',
    slug: 'keith-ellison',
    sourceUrls: ['https://ag.state.mn.us/Office/AGBio.asp'],
  },
  {
    fullBio: [
      'Ilhan Omar represents Minnesotas 5th Congressional District in the U.S. House of Representatives. Her official biography describes a path from Somalia to a Kenyan refugee camp and then to Minneapolis, where she became a policy analyst, organizer, and elected official. When sworn in to Congress in January 2019, she became the first African refugee to serve as a member of Congress, the first woman of color to represent Minnesota, and one of the first two Muslim American women elected to Congress.',
      "Omar's public profile sits at the intersection of refugee experience, local organizing, national representation, and policy debate. She has foregrounded education, wages, immigration, climate, and inclusive civic participation in her public narrative. In the archive, her profile helps the homepage show present-day Muslim American elected service in a way that is concrete, source-backed, and connected to institutions rather than slogans.",
    ],
    personType: 'other',
    slug: 'ilhan-omar',
    sourceUrls: ['https://omar.house.gov/about'],
  },
  {
    fullBio: [
      'Rashida Tlaib represents Michigans 12th Congressional District, including Detroit, Dearborn, Southfield, and surrounding communities. Her official biography presents her as the daughter of Palestinian immigrant parents, the oldest of fourteen children, and a lawyer shaped by neighborhood service in Detroit. Before Congress she served in the Michigan Legislature, where she became the first Muslim woman to serve in that body.',
      "Tlaib's work has focused heavily on constituent service, environmental justice, consumer and housing concerns, community benefits, and public accountability. Her path from legal advocacy to state and federal office makes her a core American civic impact profile: the archive can show both representation and the local policy issues that make that representation meaningful to residents.",
    ],
    personType: 'other',
    slug: 'rashida-tlaib',
    sourceUrls: ['https://tlaib.house.gov/about'],
  },
  {
    fullBio: [
      'André Carson represents Indianas 7th Congressional District and is one of the most visible Muslim members of Congress. His official biography emphasizes public safety, economic opportunity, federal investment in Indianapolis, and accessible constituent service. Before Congress, Carson worked in law enforcement and public service, giving his public profile a practical connection to neighborhood safety and local government.',
      'Carsons congressional work has included transportation, job access, youth opportunity, public meetings around Indianapolis, and service to Hoosier families. In this archive he helps balance the homepage: Muslim civic contribution is not only national symbolism, but also district-level work, casework, infrastructure, and ordinary public access to government.',
    ],
    personType: 'other',
    slug: 'andre-carson',
    sourceUrls: ['https://carson.house.gov/about/biography'],
  },
  {
    fullBio: [
      'Huma Abedin is a public servant and author best known for her long work with Hillary Rodham Clinton across campaigns, the Senate, the State Department, and national politics. Her memoir, Both/And: A Life in Many Worlds, presents her childhood between the United States and Saudi Arabia, her Indian and Pakistani family background, and her work inside the rooms of American diplomacy and presidential politics.',
      'Abedin is important to this archive because her public life is not based on elected office but on staff leadership, political operations, trust, and institutional memory. Her profile gives sponsors a more complete picture of civic impact: American Muslim contribution includes aides, organizers, advisers, and authors who shape public life from roles that are often less visible than elected positions.',
    ],
    personType: 'author',
    slug: 'huma-abedin',
    sourceUrls: ['https://www.simonandschuster.com/books/Both-And/Huma-Abedin/9781501194818'],
  },
  {
    fullBio: [
      'Nusrat Jahan Choudhury is a federal judge on the U.S. District Court for the Eastern District of New York. The Federal Judicial Center records her education at Columbia, Princeton, and Yale Law School, her clerkships in federal district and appellate courts, and her years at the American Civil Liberties Union working on national security, racial justice, and civil-rights litigation.',
      'Choudhury was confirmed by the Senate in 2023 and is widely noted as the first Muslim woman and first Bangladeshi American to serve as a life-tenured federal judge. Her archive profile should be at the top of the civic track because it shows professional excellence moving from public-interest litigation to the federal bench, with identity presented through service and legal craft rather than tokenism.',
    ],
    personType: 'other',
    slug: 'nusrat-choudhury',
    sourceUrls: ['https://www.fjc.gov/history/judges/choudhury-nusrat-jahan'],
  },
  {
    fullBio: [
      'Zahid Nisar Quraishi is a U.S. District Judge for the District of New Jersey. The Federal Judicial Center records his service as an Assistant U.S. Attorney, a U.S. magistrate judge, and a federal district judge, while U.S. Courts identifies him as a judicial milestone for Muslim American representation. He is also widely noted for prior service as a military prosecutor and Army officer.',
      'Quraishi was confirmed to the federal district court in 2021, becoming the first Muslim American Article III federal judge. His profile belongs in the American civic impact track because it combines military legal service, prosecution, private practice, magistrate service, and life-tenured judicial work. For sponsors, it is a concise example of representation backed by a concrete professional record.',
    ],
    personType: 'other',
    slug: 'zahid-quraishi',
    sourceUrls: [
      'https://www.fjc.gov/history/judges/quraishi-zahid-nisar',
      'https://www.uscourts.gov/about-federal-courts/about-federal-judges/judicial-milestones/zahid-n-quraishi',
      'https://www.judiciary.senate.gov/press/dem/releases/senate-confirms-zahid-quraishi-to-be-district-judge-for-district-of-new-jersey',
    ],
  },
  {
    fullBio: [
      'Humayun Saqib Muazzam Khan was a U.S. Army captain who was killed in Iraq in 2004. His story became nationally known through the public witness of his parents, Khizr and Ghazala Khan, who presented his military service and sacrifice as part of American Muslim civic memory. Accounts of his death emphasize that he moved toward danger to protect fellow soldiers.',
      "Khan's profile should be handled with restraint and respect. It is not a celebrity page; it is a service record and a family memory. In the archive, he stands for the Muslim Americans whose contribution to the United States includes military service, loss, and the public defense of constitutional belonging.",
    ],
    personType: 'other',
    slug: 'humayun-khan',
    sourceUrls: [
      'https://time.com/4429891/dnc-khizr-khan-donald-trump-constitution/',
      'https://www.newyorker.com/news/news-desk/humayun-khan-isnt-the-only-muslim-american-hero',
    ],
  },
  {
    fullBio: [
      'Kareem Rashad Sultan Khan was a Muslim American U.S. Army soldier from New Jersey who was killed in Iraq in 2007. Public memorial accounts record that he enlisted after high school and served in Operation Iraqi Freedom. His awards included the Bronze Star and Purple Heart, and he was buried with military honors at Arlington National Cemetery.',
      'Khan became a prominent example in conversations about Muslim American military service after his grave and story were shared nationally. The Travis Manion Foundation profile emphasizes his desire to show that Muslim Americans could serve and sacrifice for the country. His page should avoid generic patriotic filler and instead document the specific service, family, and public-memory trail around his life.',
    ],
    personType: 'other',
    slug: 'kareem-rashad-sultan-khan',
    sourceUrls: ['https://www.travismanion.org/fallen-heroes/cpl-kareem-rashad-sultan-khan-usa/'],
  },
  {
    fullBio: [
      'James Yee is a West Point graduate, former U.S. Army chaplain, and author of For God and Country: Faith and Patriotism Under Fire. He served as a Muslim chaplain at Guantanamo Bay and later became known publicly after his arrest, imprisonment, and the eventual collapse of the charges against him. His story raises questions about military service, religious accommodation, civil liberties, and post-9/11 suspicion.',
      "Yee's value to the archive is that his civic impact is complicated rather than ceremonial. He represents service inside the military chaplaincy, advocacy for the religious needs of detainees and service members, and public testimony about institutional failure. His page gives sponsors evidence that the project can handle difficult American Muslim histories responsibly.",
    ],
    personType: 'author',
    slug: 'james-yee',
    sourceUrls: [
      'https://humanrights.ucdavis.edu/projects/the-guantanamo-testimonials-project/testimonies/testimony-of-a-chaplain/talking-dog-blog-interview-james-yee.html',
      'https://news.cornell.edu/stories/2007/04/former-army-chaplain-james-yee-tells-guantanamo-experiences',
    ],
  },
  {
    fullBio: [
      'Ahmed Kousay al-Taie was an Iraqi-born U.S. Army soldier and interpreter who lived in the United States before serving in Iraq. He was kidnapped in Baghdad in 2006 and later killed by his captors. News accounts after the recovery of his remains described him as the last missing U.S. serviceman from the Iraq War to be recovered.',
      'Al-Taie belongs in the civic impact track because his work as a soldier and interpreter shows a form of service often left outside broad public summaries: language, cultural knowledge, and personal risk. His record should be presented with careful sourcing and without dramatized filler, because the facts of his service and recovery are already significant.',
    ],
    personType: 'other',
    slug: 'ahmed-kousay-al-taie',
    sourceUrls: [
      'https://www.deseret.com/2012/2/27/20395982/army-identifies-remains-of-last-missing-soldier-in-iraq/',
      'https://www.rferl.org/a/iraq_last_missing_soldier_identified/24498381.html',
    ],
  },
  {
    fullBio: [
      'Shirin Neshat is an Iranian-born artist and filmmaker based in New York, known for photography, video, film, and installation work that examines gender, power, exile, voice, and political memory. Museum and reference sources identify her major works with the visual language of black-and-white portraiture, calligraphy, music, and divided screens, including the video trilogy Turbulent, Rapture, and Fervor.',
      "Neshat's profile belongs in the American arts and media strand because she shows how Muslim and Iranian diasporic experience can become internationally recognized visual culture. Her work is not a simple identity illustration; it is an artistic investigation of public speech, silence, representation, and the ways women are seen in societies shaped by religion and state power.",
    ],
    personType: 'other',
    slug: 'shirin-neshat',
    sourceUrls: [
      'https://www.si.edu/newsdesk/releases/hirshhorn-presents-shirin-neshat-facing-history',
      'https://whitney.org/artists/5338',
      'https://www.britannica.com/biography/Shirin-Neshat',
    ],
  },
  {
    fullBio: [
      'Shahzia Sikander is a Pakistani American artist whose work helped revive and transform the practice of manuscript and miniature painting for contemporary art. Born in Lahore and based in New York, she works across drawing, painting, animation, mosaic, installation, and public art. Public profiles describe her as a major figure in expanding the language of South Asian manuscript traditions into global contemporary practice.',
      'Sikanders archive page should emphasize method as well as biography: she uses historical visual systems while refusing to keep them frozen as heritage objects. That makes her a strong sponsor-facing profile, because her work links art history, migration, gender, religion, and public space through a career that is institutionally recognized and visually distinctive.',
    ],
    personType: 'other',
    slug: 'shahzia-sikander',
    sourceUrls: [
      'https://art.state.gov/personnel/shahzia_sikander/',
      'https://www.britannica.com/biography/Shahzia-Sikander',
      'https://www.shahziasikander.com/',
    ],
  },
  {
    fullBio: [
      'Mahershala Ali is an American actor whose career spans film, television, and stage training. His major public milestone came with Academy Award wins for Moonlight and Green Book, and he is widely identified as the first Muslim actor to win an Oscar. His performances are often noted for restraint, interiority, and the ability to bring moral complexity to supporting and leading roles.',
      'Ali converted to Islam as an adult and has spoken publicly about faith, family, profiling, and belonging. In the archive, his page should not reduce him to a single award or identity marker. His civic value is representational but also artistic: a disciplined Muslim actor became central to some of the most discussed American screen stories of the past decade.',
    ],
    personType: 'other',
    slug: 'mahershala-ali',
    sourceUrls: [
      'https://www.britannica.com/biography/Mahershala-Ali',
      'https://www.cbsnews.com/news/mahershala-ali-becomes-first-muslim-to-win-acting-oscar/',
      'https://time.com/4667256/mahershala-ali-facts/',
    ],
  },
  {
    fullBio: [
      'Dave Chappelle is an American comedian and actor best known for stand-up and for co-creating, writing, and starring in Chappelles Show. His career has influenced sketch comedy, stand-up performance, and public debate about race, celebrity, speech, and entertainment power. He received the Mark Twain Prize for American Humor in 2019.',
      'Chappelle is also publicly identified as Muslim, and in interviews and performances he has discussed faith alongside comedy, discomfort, and American public life. His archive profile should be handled carefully: he is influential and sometimes controversial, so the page should focus on sourced career facts, artistic impact, and the way Muslim identity appears in a major American comedy career.',
    ],
    personType: 'other',
    slug: 'dave-chappelle',
    sourceUrls: [
      'https://www.britannica.com/biography/Dave-Chappelle',
      'https://apnews.com/article/48cab01d70064d6e8c1045d961ed7c1f',
    ],
  },
  {
    fullBio: [
      'Hasan Minhaj is an American comedian, writer, and presenter whose work blends stand-up, personal narrative, news, and political satire. He became widely known through The Daily Show, Homecoming King, the White House Correspondents Dinner, and Patriot Act with Hasan Minhaj. PBS and other public profiles describe him through political comedy, immigrant-family storytelling, and public commentary.',
      'Minhaj is important to the archive because he brought Muslim Indian American experience into mainstream comedy formats while also addressing policy, surveillance, free speech, student debt, technology, and international politics. His page should acknowledge both the craft of his storytelling and the responsibilities that come with comedy built around public claims.',
    ],
    personType: 'other',
    slug: 'hasan-minhaj',
    sourceUrls: [
      'https://www.pbs.org/wnet/amanpour-and-company/video/hasan-minhaj-on-paving-the-way-for-a-new-brown-america-efosd/',
      'https://time.com/6219770/hasan-minhaj-the-kings-jester-netflix/',
      'https://www.vice.com/en/article/patriot-acts-hasan-minhaj-on-the-value-of-being-an-outsider-in-america/',
    ],
  },
  {
    fullBio: [
      'Yasiin Bey, formerly known as Mos Def, is an American rapper, actor, and cultural figure from Brooklyn. He emerged as part of the late-1990s hip-hop landscape through Black Star and solo work including Black on Both Sides, while also building a screen career. His writing and performance are often associated with lyricism, social criticism, humor, faith, and Black urban experience.',
      'Bey adopted the name Yasiin Bey publicly after years of performing as Mos Def, and sources describe Yasiin as a name connected to the Qurans thirty-sixth surah. His archive entry should connect music, acting, and spiritual identity without flattening a long creative career into a single religious label.',
    ],
    personType: 'other',
    slug: 'yasiin-bey',
    sourceUrls: [
      'https://www.who2.com/bio/mos-def/',
      'https://www.thefader.com/2017/02/14/what-do-we-owe-yasiin-bey',
    ],
  },
  {
    fullBio: [
      'Iman Mohamed Abdulmajid is a Somali American model, entrepreneur, and philanthropist whose career helped reshape global fashion. After becoming one of the most recognizable models of her generation, she built IMAN Cosmetics to serve women of color whose skin tones had long been ignored by major beauty companies.',
      'Imans civic importance comes from the bridge between visibility and institution-building. Her work joined fashion, commerce, representation, and philanthropy, while her public life also kept attention on Somalia, refugees, and humanitarian narratives. In the archive, she belongs with business and media figures because she turned cultural visibility into a durable brand and public platform.',
    ],
    personType: 'institution_builder',
    slug: 'iman',
    sourceUrls: [
      'https://destinationiman.com/',
      'https://www.britannica.com/biography/Iman-model',
      'https://www.biography.com/celebrities/iman',
    ],
  },
  {
    fullBio: [
      'Ahmad Jamal, born Frederick Russell Jones in Pittsburgh, was an American jazz pianist, composer, bandleader, and educator. The National Endowment for the Arts recognized him as a 1994 NEA Jazz Master and described his use of space, ensemble leadership, and subtle virtuosity as hallmarks of an influential career. His 1958 album At the Pershing and his interpretation of Poinciana became defining records.',
      'Jamal converted to Islam and carried his Muslim name through a long public career in American music. His influence on Miles Davis and later musicians makes him a major cultural-impact figure, not only a niche jazz entry. In the archive, Jamal shows how Muslim American cultural contribution includes form, discipline, sound, and artistic lineage.',
    ],
    personType: 'other',
    slug: 'ahmad-jamal',
    sourceUrls: [
      'https://www.arts.gov/news/press-releases/2023/national-endowment-arts-statement-death-nea-jazz-master-ahmad-jamal',
      'https://www.arts.gov/honors/jazz/ahmad-jamal',
      'https://www.grammy.com/awards/lifetime-achievement-awards',
    ],
  },
  {
    fullBio: [
      'Hamdi Ulukaya is the Turkish-born founder and chief executive associated with Chobani and the founder of the Tent Partnership for Refugees. Tent describes his business philosophy as doing well by doing good and records that he launched the partnership in 2016 to mobilize major companies to integrate refugees through employment.',
      'Ulukayas archive profile should emphasize business as a civic platform. Chobani made him a prominent entrepreneur, but his broader public contribution is the argument that hiring refugees, building stable workplaces, and organizing corporate participation can be part of public service. That makes his page especially valuable for sponsors interested in measurable social impact.',
    ],
    personType: 'institution_builder',
    slug: 'hamdi-ulukaya',
    sourceUrls: [
      'https://www.tent.org/hamdi-ulukaya/',
      'https://time.com/6980486/tent-partnership-for-refugees/',
    ],
  },
  {
    fullBio: [
      'Shahid Khan is a Pakistani-born American business leader associated with Flex-N-Gate, the Jacksonville Jaguars, Fulham F.C., and sports ownership. His public profile connects manufacturing, immigration, major-league sports, and philanthropy. He is often presented as an example of immigrant enterprise moving from engineering and auto parts into ownership of highly visible American and international sports institutions.',
      "Khan's archive page should avoid generic billionaire language and instead focus on institution-building: a manufacturing company, professional teams, employment, civic presence in Jacksonville, and public representation of Muslim and South Asian American business success. For the homepage, he helps broaden civic impact beyond politics into economic life and sports culture.",
    ],
    personType: 'institution_builder',
    slug: 'shahid-khan',
    sourceUrls: [
      'https://www.si.com/nfl/2018/07/17/shahid-khan-jacksonville-jaguars',
      'https://en.wikipedia.org/wiki/Shahid_Khan',
    ],
  },
  {
    fullBio: [
      'Jawed Karim is a German-born American technology entrepreneur and computer scientist best known as a co-founder of YouTube. The University of Illinois Grainger College of Engineering identifies him as a YouTube co-founder and alumnus, while internet-history sources connect him to the first public YouTube upload, Me at the zoo, in April 2005.',
      "Karim's civic impact is digital rather than governmental: YouTube changed how people publish, learn, campaign, document events, archive memory, and build public audiences. His profile gives the homepage a technology story with a verified video artifact. The embedded video should be presented carefully as a platform-history reference, not as a conventional biography documentary.",
    ],
    personType: 'institution_builder',
    slug: 'jawed-karim',
    sourceUrls: [
      'https://grainger.illinois.edu/alumni/hall-of-fame/Jawed-Karim',
      'https://en.wikipedia.org/wiki/Me_at_the_zoo',
      'https://time.com/72892/the-first-youtube-video-was-uploaded-9-years-ago-today/',
    ],
    video: {
      externalVideoUrl: 'https://www.youtube.com/watch?v=jNQXAC9IVRw',
      note:
        'Verified platform-history video: Karim co-founded YouTube and uploaded the first public YouTube video. It is relevant to the record, but it is not a biography documentary.',
      source: 'YouTube / jawed',
      title: 'Me at the zoo',
      youtubeEmbedId: 'jNQXAC9IVRw',
    },
  },
  {
    fullBio: [
      'Fareed Zakaria is an Indian-born American journalist, author, and television host. His official biography identifies him as host of Fareed Zakaria GPS on CNN, a columnist for The Washington Post, and a bestselling author. His public work centers on international affairs, democracy, globalization, technology, and the changing role of the United States in world politics.',
      'Zakarias archive profile fits the American literature and thought strand because his impact is explanatory: interviews, columns, books, and television segments that translate global politics for broad audiences. The profile should present him as a public intellectual and journalist rather than a generic scholar, with source-backed attention to media institutions and published books.',
    ],
    personType: 'author',
    slug: 'fareed-zakaria',
    sourceUrls: ['https://fareedzakaria.com/about'],
  },
  {
    fullBio: [
      'Reza Aslan is an Iranian-born American writer, commentator, producer, and scholar of religions. His official biography identifies him as the author of internationally bestselling books including No god but God and Zealot, as well as a television and podcast producer and host. His work often places religious history into accessible public formats.',
      'Aslans archive profile should be written with precision because his public scholarship is widely read and sometimes debated. The value for Muslim Impactors is that he represents religion writing for mass audiences, media production, and the translation of complex religious and historical themes into popular books and programming.',
    ],
    personType: 'author',
    slug: 'reza-aslan',
    sourceUrls: ['https://www.rezaaslan.com/'],
  },
  {
    fullBio: [
      'Khaled Hosseini is an Afghan-born American novelist and humanitarian. His official site identifies him as the author of The Kite Runner, A Thousand Splendid Suns, and And the Mountains Echoed, as a Goodwill Envoy to UNHCR, and as founder of The Khaled Hosseini Foundation, which supports humanitarian assistance for the people of Afghanistan.',
      'Hosseinis profile gives the archive a literary path into migration, memory, family, and refugee experience. His novels became global reading experiences, but his public work also links storytelling to humanitarian attention. This makes him an especially useful sponsor-facing page: the record can show how literature and public responsibility reinforce one another.',
    ],
    personType: 'author',
    slug: 'khaled-hosseini',
    sourceUrls: ['https://khaledhosseini.com/', 'https://khaledhosseini.com/bio/'],
  },
  {
    fullBio: [
      'Laila Lalami is a Moroccan-born American novelist, essayist, and professor of creative writing at the University of California, Riverside. Her official biography lists works including The Moors Account, The Other Americans, Conditional Citizens, and The Dream Hotel, with major awards and finalist recognition from literary institutions.',
      'Lalamis civic importance comes from the way her fiction and essays examine migration, belonging, surveillance, citizenship, family, and the everyday consequences of public policy. In this archive, she belongs near the top American civic profiles because the project needs cultural and intellectual figures, not only officeholders, to show the full range of Muslim American contribution.',
    ],
    personType: 'author',
    slug: 'laila-lalami',
    sourceUrls: [
      'https://lailalalami.com/about/',
      'https://insideucr.ucr.edu/awards/2019/06/26/lalami-named-great-immigrant-great-american-national-foundation',
    ],
  },
  {
    fullBio: [
      'G. Willow Wilson is an American comics writer, novelist, and essayist. Publisher and reference profiles connect her to prose works such as Alif the Unseen and The Bird King and to comics work including Ms. Marvel, where she helped launch Kamala Khan as a major Muslim superhero in American popular culture.',
      'Wilsons archive profile should emphasize craft and representation together. The importance of Kamala Khan is not only that the character is Muslim, but that a Muslim writer helped build a warm, funny, family-centered superhero voice that reached mainstream readers. Wilsons work gives sponsors a clear example of cultural impact through story worlds and youth-facing media.',
    ],
    personType: 'author',
    slug: 'g-willow-wilson',
    sourceUrls: [
      'https://www.gwillowwilson.com/',
      'https://groveatlantic.com/author/g-willow-wilson/',
      'https://www.marvel.com/articles/comics/farewell-to-ms-marvel-an-open-letter-from-g-willow-wilson',
    ],
  },
  {
    fullBio: [
      'Ayesha Jalal is a Pakistani American historian and the Mary Richardson Professor of History at Tufts University. Her Tufts profile records a joint appointment with the Fletcher School and identifies her as a major scholar of South Asian history. Her work has shaped public understanding of Pakistan, Muslim politics, nationalism, and the partition-era world.',
      'Jalals archive profile should connect academic work to public memory. Her scholarship gives American readers a way to understand South Asian Muslim political history beyond simplified national narratives. She is a high-value homepage scholar because her career shows the civic role of rigorous historical interpretation inside American universities.',
    ],
    personType: 'historian',
    slug: 'ayesha-jalal',
    sourceUrls: ['https://as.tufts.edu/history/people/faculty/ayesha-jalal'],
  },
  {
    fullBio: [
      'Talal Asad is a distinguished anthropologist of religion, secularism, Islamic traditions, and the Middle East. The CUNY Graduate Center identifies him as Distinguished Professor Emeritus in anthropology and Middle Eastern studies, with an intellectual career that passed through institutions including Khartoum, Hull, the New School, Johns Hopkins, and CUNY.',
      'Asads importance lies in reshaping how scholars think about religion, secular power, tradition, and modernity. His work is dense and academic, but the archive can present it clearly: he is a public-impact scholar because concepts developed in his writing now inform religious studies, anthropology, political theory, and debates about secularism in democratic life.',
    ],
    personType: 'scholar',
    slug: 'talal-asad',
    sourceUrls: ['https://www.gc.cuny.edu/people/talal-asad'],
  },
  {
    fullBio: [
      'Akbar Ahmed is a Pakistani American anthropologist, author, poet, filmmaker, former diplomat, and professor at American Universitys School of International Service. Public biographies identify him with the Ibn Khaldun Chair of Islamic Studies and with a long career connecting scholarship, diplomacy, public education, and interfaith conversation.',
      'Ahmeds archive profile should show public scholarship as civic infrastructure. His work on Muslim societies, post-9/11 understanding, film, poetry, and dialogue has aimed at broad audiences, not only academic specialists. He helps the homepage demonstrate that Muslim impact includes bridge-building, teaching, diplomacy, and public-facing research.',
    ],
    personType: 'scholar',
    slug: 'akbar-ahmed',
    sourceUrls: [
      'https://www.american.edu/uploads/docs/akbarsahmedcvjanuary2018.pdf',
      'https://en.wikipedia.org/wiki/Akbar_Ahmed',
    ],
  },
  {
    fullBio: [
      'Zia Mian is a physicist and nuclear-policy scholar at Princeton Universitys Program on Science and Global Security. Princeton identifies him as co-director of the program and records research interests in nuclear arms control, nonproliferation, disarmament, and global peace and security. He has worked at Princeton since 1997.',
      'Mians civic impact comes from connecting technical expertise to public survival questions. His work on South Asian nuclear policy, disarmament, scientific advisory roles, and public writing makes him a strong example of scholarship serving peace. The archive should present him as a scientist whose civic contribution is risk reduction and public reasoning.',
    ],
    personType: 'scientist_physician',
    slug: 'zia-mian',
    sourceUrls: ['https://sgs.princeton.edu/team/zia-mian'],
  },
  {
    fullBio: [
      'Muhammad Suhail Zubairy is a Pakistani-born physicist and University Distinguished Professor at Texas A&M University. His Texas A&M profile identifies him with the Department of Physics and Astronomy and the Munnerlyn-Heep Chair in Quantum Optics. His work spans quantum optics, laser science, quantum information, and related areas of modern physics.',
      'Zubairys profile gives the American civic impact track a research-science dimension. His career shows how Muslim scientists contribute through laboratories, graduate training, textbooks, publications, and research communities. For sponsors, this page makes the archive feel materially stronger: it moves from generic admiration to named fields, institutions, and technical achievement.',
    ],
    personType: 'scientist_physician',
    slug: 'muhammad-suhail-zubairy',
    sourceUrls: ['https://artsci.tamu.edu/physics-astronomy/contact/profiles/m-suhail-zubairy.html'],
  },
  {
    fullBio: [
      'Aziz Sancar is a Turkish-born biochemist at the University of North Carolina School of Medicine and a recipient of the 2015 Nobel Prize in Chemistry. Nobel Prize materials identify his prize share for mechanistic studies of DNA repair and describe his work on how repair enzymes help correct DNA damaged by ultraviolet light.',
      'Sancars archive profile should foreground research, teaching, and the public value of basic science. His work increased understanding of DNA repair, cancer, aging, and cellular survival. As a Muslim scientist working in the United States, he gives the homepage a concrete, internationally recognized example of scientific contribution anchored in a university lab.',
    ],
    personType: 'scientist_physician',
    slug: 'aziz-sancar',
    sourceUrls: [
      'https://www.nobelprize.org/prizes/chemistry/2015/sancar/facts/',
      'https://pubmed.ncbi.nlm.nih.gov/27337655/',
    ],
  },
]

const profileUpdateMap = new Map(americanCivicProfileUpdates.map((profile) => [profile.slug, profile]))

export const getAmericanCivicProfileUpdate = (slug: string) => profileUpdateMap.get(slug)

export const getAmericanCivicProfileFullBio = (slug: string) =>
  getAmericanCivicProfileUpdate(slug)?.fullBio.join('\n\n')
