
import React from 'react';
import { Calendar, Trophy, Flag, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { CustomButton } from '@/components/ui/custom-button';

const seasons = [
  {
    number: 1,
    year: "2024",
    name: "Season One",
    description: "Our first season brought together young diplomats from across Uzbekistan for an unforgettable MUN experience.",
    highlights: [
      "July 28, 2024",
      "80 delegates participated",
      "Participants from all over Uzbekistan"
    ],
    icon: Calendar
  },
  {
    number: 2,
    year: "2024",
    name: "Season Two",
    description: "Expanding our reach with more committees and participants in our second season.",
    highlights: [
      "November 3, 2024",
      "2 committees",
      "Participation fee: 69,000 UZS",
      "Location: Presidential School in Fergana"
    ],
    icon: Trophy
  },
  {
    number: 3,
    year: "2025",
    name: "Season Three",
    description: "Our biggest event yet with expanded committees and delegate participation.",
    highlights: [
      "January 4, 2025",
      "5 committees",
      "105 delegates",
      "Location: Presidential School in Fergana",
      "Participation fee: 69,000 UZS"
    ],
    icon: Flag
  },
  {
    number: 4,
    year: "2025",
    name: "Season Four",
    description: "Our upcoming season with more opportunities for young diplomats to excel.",
    highlights: [
      "April 2, 2025",
      "4 committees",
      "Application Deadline: March 23, 2025",
      "Location: Presidential School in Fergana",
      "Participation fee: 79,000 UZS"
    ],
    icon: Sparkles
  }
];

export default function AboutSeasons() {
  return (
    <section className="py-20 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Our Seasons of Diplomacy</h2>
          <div className="w-20 h-1 bg-diplomatic-600 mx-auto mb-4" />
          <p className="text-neutral-600">
            Our journey through the seasons, showcasing our growth and the impact we've made in the MUN community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {seasons.map((season) => (
            <Card key={season.number} className={`border-none ${season.current ? 'shadow-xl ring-2 ring-diplomatic-500 ring-opacity-50' : 'shadow-lg'} hover:shadow-xl transition-shadow duration-300`}>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <season.icon className="w-12 h-12 text-diplomatic-600 mr-4" />
                  <div>
                    <span className="text-sm font-semibold text-diplomatic-600">SEASON {season.number} • {season.year}</span>
                    <h3 className="text-2xl font-bold">{season.name}</h3>
                  </div>
                </div>
                <p className="text-neutral-600 mb-4">{season.description}</p>
                <ul className="space-y-2 mb-4">
                  {season.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-2 h-2 bg-diplomatic-500 rounded-full mr-2"></span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <CustomButton variant="primary" to="/committees">
            Explore Current Committees
          </CustomButton>
        </div>
      </div>
    </section>
  );
}
