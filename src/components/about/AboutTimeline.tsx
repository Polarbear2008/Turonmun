
import React from 'react';

const timelineEvents = [
  {
    year: 'June 28, 2024',
    title: 'FPSMUN Founded',
    description: 'The beginning of our journey with a vision to create a premier MUN experience.',
    milestones: [
      'Official founding of FPSMUN',
      'Telegram channel created',
      'Registered through mymun.com'
    ]
  },
  {
    year: 'July 1, 2024',
    title: 'Season 1 Registration Opens',
    description: 'Launching our first season with great enthusiasm and participation.',
    milestones: [
      'Registration for first season begins',
      '80 delegates from across Uzbekistan participated',
      'Held on July 28, 2024'
    ]
  },
  {
    year: 'November 3, 2024',
    title: 'Season 2',
    description: 'Expanding our reach with more committees and participants.',
    milestones: [
      '2 committees',
      'Participation fee: 69,000 UZS',
      'Location: Presidential School in Fergana'
    ]
  },
  {
    year: 'January 4, 2025',
    title: 'Season 3',
    description: 'Our biggest event yet with expanded committees and delegate participation.',
    milestones: [
      '5 committees',
      '105 delegates',
      'Location: Presidential School in Fergana'
    ]
  },
  {
    year: 'January 25, 2025',
    title: 'Historic Partnership',
    description: 'Game-changing partnership with Nukus Presidential School MUN.',
    milestones: [
      'First MUN conference in Karakalpakstan',
      'Expanding MUN culture in new regions',
      'Strengthening national MUN community'
    ]
  },
  {
    year: 'May 1, 2025',
    title: 'Global Recognition',
    description: 'FerganaPSMUN 2024 wins multiple awards on MyMUN.',
    milestones: [
      'Best Small Conference',
      'Best Socials',
      'Best Logistics',
      'First for Central Asia on this scale'
    ]
  },
  {
    year: 'May 12, 2025',
    title: 'Rebranding to TuronMUN',
    description: 'A new era and identity begins.',
    milestones: [
      'Transition from FPSMUN to TuronMUN',
      'New vision for the future',
      'Continued commitment to excellence in MUN'
    ]
  }
];

export default function AboutTimeline() {
  return (
    <section className="py-20 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Our Journey</h2>
          <div className="w-20 h-1 bg-diplomatic-600 mx-auto mb-4" />
          <p className="text-neutral-600">
            Our journey from humble beginnings to becoming a recognized name in the MUN community.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {timelineEvents.map((event, index) => (
            <div key={index} className="flex gap-4 mb-12">
              <div className="flex flex-col items-center">
                <div className="w-6 h-6 rounded-full bg-diplomatic-500 flex items-center justify-center">
                </div>
                {index !== timelineEvents.length - 1 && (
                  <div className="w-0.5 h-full bg-diplomatic-200" />
                )}
              </div>
              <div className="flex-1 pb-8">
                <div className="text-sm text-diplomatic-600 font-semibold mb-1">
                  {event.year}
                </div>
                <h3 className="text-2xl font-bold mb-2">{event.title}</h3>
                <p className="text-neutral-600 mb-4">{event.description}</p>
                {event.milestones && (
                  <ul className="space-y-1">
                    {event.milestones.map((milestone, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-diplomatic-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                        <span className="text-sm text-neutral-700">{milestone}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
