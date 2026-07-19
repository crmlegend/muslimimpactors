export type RegionalProfileSource = {
  fullCitation: string
  shortCitation: string
  sourceType: 'government_record' | 'web_article'
  title: string
  url: string
}

export type RegionalModernProfile = {
  category: string
  countryCode: string
  displayPriority: number
  displayRegion: 'na' | 'uk' | 'eu'
  displayTitle: string
  fullBio: string[]
  hoverBannerText: string
  name: string
  nationality: string
  personType: 'ruler_statesperson' | 'scholar'
  shortBio: string
  slug: string
  sources: RegionalProfileSource[]
}

export const regionalProfileReleaseMarker = 'regional-modern-profiles-20260718'

export const regionalModernProfiles: RegionalModernProfile[] = [
  {
    category: 'Canadian civic leadership',
    countryCode: 'CA',
    displayPriority: 30,
    displayRegion: 'na',
    displayTitle: 'Lieutenant governor and community leader',
    fullBio: [
      "Salma Lakhani was installed as Alberta's nineteenth lieutenant governor in August 2020. Her official biography describes decades of community service focused on education, health care, support for new immigrants, and assistance for women facing barriers. Before entering public office, she also helped manage an early childhood education centre and worked with organizations serving vulnerable Albertans.",
      "Lakhani was born in Kampala, Uganda, and studied clinical biochemistry at the University of Manchester. Alberta's lieutenant governor website identifies her as Canada's first Muslim lieutenant governor and the first person of South Asian heritage and African birth to hold the office. Her archive profile emphasizes public service, pluralism, inclusion, and the civic contribution of volunteers.",
    ],
    hoverBannerText:
      'Alberta public service, volunteer leadership, education, inclusion, and support for newcomers and vulnerable communities.',
    name: 'Salma Lakhani',
    nationality: 'Canada',
    personType: 'ruler_statesperson',
    shortBio:
      'Salma Lakhani is an Alberta public official and longtime community volunteer whose work has emphasized education, health care, inclusion, and support for newcomers and vulnerable people.',
    slug: 'salma-lakhani',
    sources: [
      {
        fullCitation:
          'Office of the Lieutenant Governor of Alberta. "About Her Honour." Official biography of Salma Lakhani. Accessed July 18, 2026.',
        shortCitation: 'Alberta Lieutenant Governor: Salma Lakhani official biography',
        sourceType: 'government_record',
        title: 'About Her Honour',
        url: 'https://lieutenantgovernor.ab.ca/about/about-her-honour/',
      },
      {
        fullCitation:
          'Office of the Lieutenant Governor of Alberta. "Learn about the Lieutenant Governor." Accessed July 18, 2026.',
        shortCitation: 'Alberta Lieutenant Governor: office and firsts',
        sourceType: 'government_record',
        title: 'Learn about the Lieutenant Governor',
        url: 'https://lieutenantgovernor.ab.ca/students/learn-about-the-lieutenant-governor/',
      },
    ],
  },
  {
    category: 'Canadian public service',
    countryCode: 'CA',
    displayPriority: 45,
    displayRegion: 'na',
    displayTitle: 'Member of Parliament and lawyer',
    fullBio: [
      'Iqra Khalid is a lawyer and Canadian parliamentarian who was first elected to represent Mississauga-Erin Mills in 2015. Her official biography traces her path from Pakistan to Canada, legal studies, work in immigration and municipal law, and community organizing. In Parliament she has served in justice, human-rights, public-accounts, privacy, ethics, and national-security roles.',
      "Khalid has used public office to address discrimination, Islamophobia, women's safety, immigration, access to justice, and constituent services. In a 2019 public statement about federal terrorism-report language, she identified herself as a Canadian Muslim and argued for language that respects Muslim and Sikh communities. Her archive profile focuses on democratic participation, legal service, and bridge-building in a diverse Canadian constituency.",
    ],
    hoverBannerText:
      'Canadian parliamentary service connecting law, human rights, constituent advocacy, inclusion, and opposition to Islamophobia.',
    name: 'Iqra Khalid',
    nationality: 'Canada',
    personType: 'ruler_statesperson',
    shortBio:
      'Iqra Khalid is a Canadian lawyer and Member of Parliament whose public work includes justice, human rights, national security, constituent advocacy, and opposition to Islamophobia.',
    slug: 'iqra-khalid',
    sources: [
      {
        fullCitation:
          'House of Commons of Canada. "Iqra Khalid, Member of Parliament for Mississauga-Erin Mills." Official member profile. Accessed July 18, 2026.',
        shortCitation: 'House of Commons: Iqra Khalid member profile',
        sourceType: 'government_record',
        title: 'Iqra Khalid, Member of Parliament',
        url: 'https://www.ourcommons.ca/members/en/Iqra-Khalid(88849)',
      },
      {
        fullCitation:
          'Iqra Khalid, Member of Parliament. "Statement on amendments to the 2018 Public Report on the Terrorism Threat to Canada." April 26, 2019. Accessed July 18, 2026.',
        shortCitation: 'Iqra Khalid: statement on inclusive public-safety language',
        sourceType: 'web_article',
        title: 'Statement on amendments to the terrorism threat report',
        url: 'https://iqrakhalid.libparl.ca/2019/04/26/statement-on-amendments-to-the-2018-public-report-on-the-terrorism-threat-to-canada/',
      },
    ],
  },
  {
    category: 'Urban leadership',
    countryCode: 'GB',
    displayPriority: 10,
    displayRegion: 'uk',
    displayTitle: 'Mayor of London and former human-rights solicitor',
    fullBio: [
      "Sadiq Khan is the Mayor of London and began a third term in May 2024. Born and raised in London, he worked as a human-rights solicitor before serving as a local councillor and then as a Member of Parliament. His official City Hall biography describes work on housing, transport, air quality, economic opportunity, public safety, and London's response to major civic challenges.",
      'Khan has also spoken publicly about his Muslim identity and about building trust across religious and cultural differences. In a City Hall address on social integration, he connected active citizenship with shared experience and stronger community relationships. His archive profile presents city leadership as practical service carried out in a diverse global metropolis.',
    ],
    hoverBannerText:
      'London leadership spanning human rights, transport, housing, clean air, economic opportunity, and community cohesion.',
    name: 'Sadiq Khan',
    nationality: 'United Kingdom',
    personType: 'ruler_statesperson',
    shortBio:
      'Sadiq Khan is the Mayor of London and a former human-rights solicitor whose public work spans transport, housing, air quality, economic opportunity, safety, and social integration.',
    slug: 'sadiq-khan',
    sources: [
      {
        fullCitation:
          'Greater London Authority. "Sadiq Khan." Official biography of the Mayor of London. Accessed July 18, 2026.',
        shortCitation: 'London City Hall: Sadiq Khan official biography',
        sourceType: 'government_record',
        title: 'Sadiq Khan',
        url: 'https://www.london.gov.uk/who-we-are/what-mayor-does/mayor-and-his-team/sadiq-khan',
      },
      {
        fullCitation:
          'Greater London Authority. "Sadiq Khan: building bridges rather than walls." May 30, 2017. Accessed July 18, 2026.',
        shortCitation: 'London City Hall: Sadiq Khan on social integration',
        sourceType: 'government_record',
        title: 'Building bridges rather than walls',
        url: 'https://www.london.gov.uk/press-releases/mayoral/sadiq-khan-building-bridges-rather-than-walls',
      },
    ],
  },
  {
    category: 'Scottish public service',
    countryCode: 'GB',
    displayPriority: 35,
    displayRegion: 'uk',
    displayTitle: 'Former First Minister of Scotland',
    fullBio: [
      'Humza Yousaf served as First Minister of Scotland from March 2023 to May 2024 after holding ministerial responsibility for health, justice, transport, and external affairs. His Scottish Parliament record documents service as a Glasgow MSP and a series of cabinet roles across devolved government.',
      'When Parliament nominated Yousaf as first minister in March 2023, the official record noted the historic significance of a Muslim and minority-ethnic leader heading a devolved government in the United Kingdom. His archive profile focuses on representation, public administration, health and justice policy, and the responsibilities attached to visible leadership.',
    ],
    hoverBannerText:
      'Scottish public service across health, justice, transport, external affairs, representation, and national leadership.',
    name: 'Humza Yousaf',
    nationality: 'United Kingdom',
    personType: 'ruler_statesperson',
    shortBio:
      'Humza Yousaf is a former First Minister of Scotland whose public career has included ministerial leadership in health, justice, transport, and external affairs.',
    slug: 'humza-yousaf',
    sources: [
      {
        fullCitation:
          'The Scottish Parliament. "Humza Yousaf MSP." Current and previous members profile. Accessed July 18, 2026.',
        shortCitation: 'Scottish Parliament: Humza Yousaf member record',
        sourceType: 'government_record',
        title: 'Humza Yousaf',
        url: 'https://www.parliament.scot/home/msps/current-and-previous-msps/humza-yousaf',
      },
      {
        fullCitation:
          'The Scottish Parliament. "Election of the First Minister." Official Report, March 28, 2023. Accessed July 18, 2026.',
        shortCitation: 'Scottish Parliament: election of Humza Yousaf as First Minister',
        sourceType: 'government_record',
        title: 'Election of the First Minister',
        url: 'https://www.parliament.scot/chamber-and-committees/official-report/search-what-was-said-in-parliament/meeting-of-parliament-28-03-2023?iob=129883&meeting=15230',
      },
    ],
  },
  {
    category: 'German civic leadership',
    countryCode: 'DE',
    displayPriority: 20,
    displayRegion: 'eu',
    displayTitle: 'Member of the German Bundestag',
    fullBio: [
      'Aydan Özoguz has served in the German Bundestag since 2009. Her official parliamentary biography records work as Federal Government Commissioner for Migration, Refugees and Integration from 2013 to 2018 and as a vice president of the Bundestag from 2021 to 2025. In the current parliamentary term she continues to serve through committee and international parliamentary work.',
      "Özoguz's public career connects democratic representation with migration, integration, citizenship, and institutional participation. An archived Bundestag biography identifies her as Muslim. Her archive profile focuses on long-term parliamentary service and on the place of minority communities within German civic life.",
    ],
    hoverBannerText:
      'German parliamentary service focused on migration, integration, citizenship, representation, and democratic participation.',
    name: 'Aydan Özoguz',
    nationality: 'Germany',
    personType: 'ruler_statesperson',
    shortBio:
      'Aydan Ozoguz is a German parliamentarian whose public work has centered on migration, integration, citizenship, representation, and democratic participation.',
    slug: 'aydan-ozoguz',
    sources: [
      {
        fullCitation:
          'German Bundestag. "Aydan Ozoguz." Official member biography for the 21st electoral term. Accessed July 18, 2026.',
        shortCitation: 'German Bundestag: Aydan Özoguz current biography',
        sourceType: 'government_record',
        title: 'Aydan Ozoguz',
        url: 'https://www.bundestag.de/abgeordnete/biografien/O/oezoguz_aydan-1046460',
      },
      {
        fullCitation:
          'German Bundestag. "Aydan Ozoguz." Archived member biography for the 20th electoral term. Accessed July 18, 2026.',
        shortCitation: 'German Bundestag archive: Aydan Özoguz biography',
        sourceType: 'government_record',
        title: 'Aydan Ozoguz, archived biography',
        url: 'https://www.bundestag.de/webarchiv/abgeordnete/biografien20/O/oezoguz_aydan-857820',
      },
    ],
  },
  {
    category: 'Education and public service',
    countryCode: 'DE',
    displayPriority: 40,
    displayRegion: 'eu',
    displayTitle: 'Bundestag member, scholar, and educator',
    fullBio: [
      'Lamya Kaddor is a member of the German Bundestag, an Islamic studies scholar, author, and educator. Her official parliamentary biography records years teaching Islamic religious education in public schools and work on education, domestic policy, and foreign affairs.',
      "The Bundestag biography identifies Kaddor's religion as Islam and documents her involvement in initiatives addressing antisemitism, Islamophobia, extremism prevention, and Muslim-Jewish dialogue. Her archive profile highlights the connection between scholarship, classroom experience, democratic debate, and practical coalition-building across communities.",
    ],
    hoverBannerText:
      'German public service connecting Islamic studies, education, democratic debate, anti-hate work, and Muslim-Jewish dialogue.',
    name: 'Lamya Kaddor',
    nationality: 'Germany',
    personType: 'scholar',
    shortBio:
      'Lamya Kaddor is a German parliamentarian, Islamic studies scholar, author, and educator whose work includes anti-hate initiatives, extremism prevention, and interfaith dialogue.',
    slug: 'lamya-kaddor',
    sources: [
      {
        fullCitation:
          'German Bundestag. "Lamya Kaddor." Official member biography for the 21st electoral term. Accessed July 18, 2026.',
        shortCitation: 'German Bundestag: Lamya Kaddor official biography',
        sourceType: 'government_record',
        title: 'Lamya Kaddor',
        url: 'https://www.bundestag.de/abgeordnete/biografien/K/kaddor_lamya-1045258',
      },
      {
        fullCitation:
          'German Bundestag. "Lamya Kaddor on the Federal Ministry of the Interior budget." Plenary speech, July 15, 2026. Accessed July 18, 2026.',
        shortCitation: 'German Bundestag: Lamya Kaddor plenary contribution',
        sourceType: 'government_record',
        title: 'Lamya Kaddor plenary speech',
        url: 'https://www.bundestag.de/mediathek/video?videoid=7655640',
      },
    ],
  },
]
