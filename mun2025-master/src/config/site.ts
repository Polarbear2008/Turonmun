export const siteConfig = {
  title: import.meta.env.VITE_APP_TITLE || 'FPS Model United Nations',
  description: import.meta.env.VITE_APP_DESCRIPTION || 'Official website for FPS Model United Nations conferences',
  url: import.meta.env.VITE_APP_URL || 'https://fpsmun.uz',
  conferenceDate: new Date(import.meta.env.VITE_APP_CONFERENCE_DATE || '2025-04-02T09:00:00'),
  conferenceLocation: import.meta.env.VITE_APP_CONFERENCE_LOCATION || 'Fergana Presidential School, Uzbekistan',
  registrationOpen: import.meta.env.VITE_APP_REGISTRATION_OPEN === 'true',
  social: {
    twitter: 'https://twitter.com/fpsmun',
    facebook: 'https://facebook.com/fpsmun',
    instagram: 'https://instagram.com/fpsmun',
    telegram: 'https://t.me/fpsmun',
  },
  contact: {
    email: 'info@fpsmun.uz',
    phone: '+998 90 123 45 67',
  },
  navigation: [
    {
      title: 'About',
      href: '/about',
    },
    {
      title: 'Committees',
      href: '/committees',
    },
    {
      title: 'Past Conferences',
      href: '/past-conferences',
    },
    {
      title: 'Schedule',
      href: '/schedule',
    },
    {
      title: 'Resources',
      href: '/resources',
    },
    {
      title: 'Contact',
      href: '/contact',
    },
  ],
}
