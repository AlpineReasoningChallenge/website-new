// Facts that appear in more than one place. Change them here, not in the pages.

export const site = {
  name: 'Alpine Reasoning Challenge',
  shortName: 'ARC',
  url: 'https://archallenge.org',
  description:
    'Alpine Reasoning Challenge (ARC) is a nonprofit run by Calgary students. We write and run free STEM contests and classes for young people across the city.',
  email: 'info@archallenge.org',
  newsletter: 'https://alpinereasoning.substack.com/',
  instagram: 'https://www.instagram.com/archallenge_/',
  discord: 'https://discord.gg/un5cdbqEAF',
};

export const nav = [
  { label: 'Contests', href: '/contests/' },
  { label: 'Classes', href: '/classes/' },
  { label: 'Past papers', href: '/archive/' },
  { label: 'About', href: '/about/' },
  { label: 'Sponsor us', href: '/sponsors/' },
  { label: 'Contact', href: '/contact/' },
];

export type Registration =
  | { status: 'soon' }
  | { status: 'open'; url: string }
  | { status: 'closed' };

// The event shown in the "Next event" card on the home page.
// When the form is live, set registration to { status: 'open', url: '...' }.
export const nextEvent = {
  name: 'Rocky Mountain Junior Science Contest',
  shortName: 'RMJSC',
  href: '/rmjsc/',
  isoDate: '2027-01-24',
  month: 'Jan',
  day: '24',
  weekdayYear: 'Sunday, 2027',
  fullDate: 'Sunday, January 24, 2027',
  facts: [
    { label: 'Where', value: 'Calgary, venue to be announced' },
    { label: 'Who', value: 'Grades 7 to 9, in teams of 3' },
    { label: 'Cost', value: 'Free, lunch included' },
  ],
  note: 'You can sign up on your own. We will put you on a team.',
  registration: { status: 'soon' } as Registration,
};

export const contests = {
  rmjsc: {
    name: 'Rocky Mountain Junior Science Contest',
    href: '/rmjsc/',
    date: 'Sun, Jan 24, 2027',
    summary:
      'Our longest-running contest. Teams of three work through lab, experiment-design and trivia rounds built on the Alberta grade 7 to 9 science curriculum. It has run every year since 2020.',
    facts: ['In person', 'Teams of 3', 'Solo sign-ups welcome'],
  },
  sst: {
    name: 'Summit STEM Triathlon',
    href: '/sst/',
    date: 'Date to be announced',
    summary:
      'A one-day contest for teams of two. Each of its three rounds comes from a different part of STEM, and the mix changes every year. In 2026 it was math, hands-on engineering and algorithmic thinking.',
    facts: ['In person', 'Teams of 2'],
  },
};

export const classes = {
  href: '/classes/',
  summary:
    'In summer 2023 our student instructors taught Junior Olympiad Math, a free series on Zoom. Every contest day also includes a workshop. More classes are planned, and we will post them here once they have dates.',
  topics: ['Algebra', 'Number theory', 'Combinatorics', 'Geometry'],
};

// Placeholder list taken from the old site and the finance sheet. Confirm before launch.
export const supporters = [
  'CNOOC',
  'ABCRC',
  'World Health Institute',
  'Western Mechatronics',
  'AUAV Tech',
];

export const faq = [
  {
    q: 'Does it cost anything?',
    a: 'No. Every ARC contest and class is free, including lunch and snacks at in-person events. Sponsors and donors cover the costs.',
  },
  {
    q: 'Who runs ARC?',
    a: 'Junior high and high school students, all volunteers. ARC has been an incorporated Alberta nonprofit since October 2024.',
  },
  {
    q: 'What ages is it for?',
    a: 'It depends on the event, and each event lists who can enter. The Rocky Mountain Junior Science Contest is built on the Alberta junior high science curriculum. The 2026 Summit STEM Triathlon was open to grade 10 and under.',
  },
  {
    q: 'Does my child need a team?',
    a: 'No. Students who sign up alone are put on a team on the day.',
  },
  {
    q: 'Where are events held?',
    a: 'In Calgary. Past in-person contests were at the University of Calgary. We post each venue once it is booked.',
  },
];
