
import React from 'react';

const timelineEvents = [
  {
    year: '2020',
    title: 'turonmun Foundation',
    description: 'Established with a vision to create a premier MUN experience focused on fostering diplomatic excellence and international cooperation among students.',
    milestones: [
      'Founding team assembled from 5 countries',
      'First committees designed',
      'Initial partnership with 3 educational institutions'
    ]
  },
  {
    year: '2021',
    title: 'First Virtual Conference',
    description: 'Successfully adapted to the global pandemic with our first fully virtual conference, expanding our reach internationally.',
    milestones: [
      'Developed custom virtual debate platform',
      'Recruited delegates from 15 countries',
      'First international speaker series launched'
    ]
  },
  {
    year: '2022',
    title: 'International Expansion',
    description: 'Extended our reach to over 50 countries worldwide, establishing turonmun as a truly global conference.',
    milestones: [
      'Launched regional qualification events',
      'Established scholarship program for delegates from developing nations',
      'Published first edition of turonmun Journal of International Affairs'
    ]
  },
  {
    year: '2023',
    title: 'Innovation in Diplomacy',
    description: 'Introduced new committee formats and diplomatic scenarios, pushing the boundaries of traditional MUN.',
    milestones: [
      'Created crisis committees with real-time developments',
      'Integrated AI-powered research assistants',
      'Partnered with diplomatic missions for authentic training'
    ]
  },
  {
    year: '2024',
    title: 'Season 4 Launch',
    description: 'Our most ambitious season yet, combining in-person and virtual components for maximum global participation.',
    milestones: [
      'Expecting delegates from 30+ countries',
      '10 specialized committees addressing critical global issues',
      'New youth leadership training program'
    ],
    current: true
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
            Tracing our path of growth and impact in the MUN community from our founding to the present day.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {timelineEvents.map((event, index) => (
            <div key={index} className="flex gap-4 mb-12">
              <div className="flex flex-col items-center">
                <div className={`w-6 h-6 rounded-full ${event.current ? 'bg-diplomatic-600 animate-pulse' : 'bg-diplomatic-500'} flex items-center justify-center`}>
                  {event.current && <div className="w-3 h-3 bg-white rounded-full"></div>}
                </div>
                {index !== timelineEvents.length - 1 && (
                  <div className="w-0.5 h-full bg-diplomatic-200" />
                )}
              </div>
              <div className={`flex-1 pb-8 ${event.current ? 'bg-diplomatic-50 p-6 rounded-lg border-l-4 border-diplomatic-500' : ''}`}>
                <div className="text-sm text-diplomatic-600 font-semibold mb-1">
                  {event.year} {event.current && <span className="ml-2 inline-block px-2 py-0.5 bg-diplomatic-100 text-diplomatic-700 rounded-full text-xs">CURRENT</span>}
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
