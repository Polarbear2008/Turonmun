export const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { 
    name: 'Event Updates', 
    path: '/event-updates',
    hasDropdown: true,
    dropdownItems: [
      { name: 'Committees', path: '/committees' },
      { name: 'Schedule', path: '/schedule' },
    ]
  },
  { 
    name: 'Past Conferences', 
    path: '/past-conferences',
    hasDropdown: true,
    dropdownItems: [
      { name: 'Season 1', path: '/seasons/1' },
      { name: 'Season 2', path: '/seasons/2' },
      { name: 'Season 3', path: '/seasons/3' },
      { name: 'Season 4', path: '/seasons/4' },
      { name: 'TuronMUN x CAMU', path: '/seasons/camu' }
    ]
  },
  { name: 'Contact', path: '/contact' },
];

export default navLinks;
