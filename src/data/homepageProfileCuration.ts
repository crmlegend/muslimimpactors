export type HomepageProfileCuration = {
  banner: string
  priority: number
  slug: string
}

export const reviewedUSHomepageProfiles: HomepageProfileCuration[] = [
  {
    banner:
      'Among the best-known Muslim elected officials in the United States, linked to public service, law, and civic representation.',
    priority: 1,
    slug: 'keith-ellison',
  },
  {
    banner:
      'A public figure connected to refugee experience, congressional service, representation, and national policy debates.',
    priority: 10,
    slug: 'ilhan-omar',
  },
  {
    banner:
      'Known for congressional service, community advocacy, and Palestinian American representation.',
    priority: 20,
    slug: 'rashida-tlaib',
  },
  {
    banner:
      'A Muslim member of Congress whose profile connects public safety, civic service, and national representation.',
    priority: 30,
    slug: 'andr-carson',
  },
  {
    banner:
      'Known for public service, political work, memoir, and Muslim American public visibility.',
    priority: 40,
    slug: 'huma-abedin',
  },
  {
    banner:
      'A legal figure connected to civil rights, federal service, and representation in the judiciary.',
    priority: 50,
    slug: 'nusrat-choudhury',
  },
  {
    banner:
      'Known for judicial service, military legal service, and public milestones for Muslim Americans.',
    priority: 60,
    slug: 'zahid-quraishi',
  },
  {
    banner:
      'Remembered for military service, sacrifice, public memorialization, and American Muslim civic memory.',
    priority: 70,
    slug: 'humayun-khan',
  },
  {
    banner:
      'Remembered for U.S. Army service and as a prominent example in discussions of Muslim American military sacrifice.',
    priority: 80,
    slug: 'kareem-rashad-sultan-khan',
  },
  {
    banner:
      'Known for military chaplaincy, legal controversy, writing, and debates over civil liberties.',
    priority: 90,
    slug: 'james-yee',
  },
  {
    banner: 'Remembered for U.S. Army service, language work, captivity, and recovery of remains.',
    priority: 100,
    slug: 'ahmed-kousay-al-taie',
  },
  {
    banner: 'Known for Chobani, refugee employment, philanthropy, and business-led social impact.',
    priority: 110,
    slug: 'hamdi-ulukaya',
  },
  {
    banner:
      'A prominent entrepreneur whose public profile connects manufacturing, sports ownership, philanthropy, and immigrant success.',
    priority: 120,
    slug: 'shahid-khan',
  },
  {
    banner:
      'Known as a YouTube co-founder, linking technology, entrepreneurship, and public digital culture.',
    priority: 130,
    slug: 'jawed-karim',
  },
  {
    banner: 'Known for DNA repair research, teaching, and scientific service in the United States.',
    priority: 140,
    slug: 'aziz-sancar',
  },
  {
    banner: 'Known for quantum optics, research leadership, teaching, and scientific publication.',
    priority: 150,
    slug: 'muhammad-suhail-zubairy',
  },
  {
    banner:
      'Known for nuclear-policy research, peace studies, public scholarship, and academic service.',
    priority: 160,
    slug: 'zia-mian',
  },
  {
    banner: 'Known for South Asian history, public scholarship, and university teaching.',
    priority: 170,
    slug: 'ayesha-jalal',
  },
  {
    banner: 'An influential scholar of religion, secularism, anthropology, and modernity.',
    priority: 180,
    slug: 'talal-asad',
  },
  {
    banner:
      'Known for public scholarship, teaching, interfaith dialogue, and writing on Muslim societies.',
    priority: 190,
    slug: 'akbar-ahmed',
  },
  {
    banner: 'Known for journalism, books, interviews, and public analysis of world affairs.',
    priority: 200,
    slug: 'fareed-zakaria',
  },
  {
    banner:
      'Known for fiction, refugee advocacy, and humanitarian work connected to Afghanistan and the United States.',
    priority: 210,
    slug: 'khaled-hosseini',
  },
  {
    banner: 'Known for fiction, essays, migration narratives, and public literary work.',
    priority: 220,
    slug: 'laila-lalami',
  },
  {
    banner: 'Known for books, religious studies, television work, and public commentary.',
    priority: 230,
    slug: 'reza-aslan',
  },
  {
    banner:
      'Known for fiction, comics, and creating prominent Muslim representation in American popular culture.',
    priority: 240,
    slug: 'g-willow-wilson',
  },
  {
    banner:
      'An artist whose work connects identity, gender, exile, visual culture, and museum exhibition.',
    priority: 250,
    slug: 'shirin-neshat',
  },
  {
    banner:
      'Known for contemporary art, manuscript traditions, animation, public art, and global exhibition history.',
    priority: 260,
    slug: 'shahzia-sikander',
  },
  {
    banner:
      'An award-winning actor whose public profile connects performance, representation, and American Muslim visibility.',
    priority: 270,
    slug: 'mahershala-ali',
  },
  {
    banner:
      'A major comic voice whose public biography includes American Muslim identity and cultural influence.',
    priority: 280,
    slug: 'dave-chappelle',
  },
  {
    banner:
      'Known for political comedy, storytelling, media criticism, and South Asian Muslim American experience.',
    priority: 290,
    slug: 'hasan-minhaj',
  },
  {
    banner:
      'Known for hip-hop, acting, public thought, and a creative career often discussed with Muslim identity.',
    priority: 300,
    slug: 'yasiin-bey',
  },
  {
    banner: 'Known for fashion, business, philanthropy, refugee memory, and global public culture.',
    priority: 310,
    slug: 'iman',
  },
  {
    banner:
      'A major jazz musician connected to performance, composition, influence, and American Muslim cultural history.',
    priority: 320,
    slug: 'ahmad-jamal',
  },
  {
    banner:
      'Remembered for boxing, anti-war witness, civil-rights-era visibility, philanthropy, and global humanitarian memory.',
    priority: 330,
    slug: 'muhammad-ali',
  },
  {
    banner:
      'A major American Muslim voice whose life connects civil rights, international human rights, self-education, and public transformation.',
    priority: 340,
    slug: 'malcolm-x',
  },
  {
    banner:
      'Known for basketball, writing, cultural criticism, education, and long public advocacy.',
    priority: 350,
    slug: 'kareem-abdul-jabbar',
  },
]

export const reviewedUSHomepageProfilesBySlug = new Map(
  reviewedUSHomepageProfiles.map((profile) => [profile.slug, profile]),
)
