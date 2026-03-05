
import React from 'react';
import { Calendar, Trophy, Flag, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { CustomButton } from '@/components/ui/custom-button';

const seasons = [
  {
    number: 1,
    year: "2020",
    name: "Inaugural Season",
    description: "Our first-ever season focused on establishing turonmun as a platform for diplomatic excellence and global cooperation.",
    highlights: [
      "10 participating schools",
      "4 committees",
      "200+ delegates"
    ],
    icon: Calendar
  },
  {
    number: 2,
    year: "2021",
    name: "Virtual Horizons",
    description: "Adapted to the global pandemic with our first fully virtual conference, expanding our reach internationally.",
    highlights: [
      "25 participating schools",
      "6 committees",
      "500+ delegates from 15 countries"
    ],
    icon: Trophy
  },
  {
    number: 3,
    year: "2022-2023",
    name: "Global Convergence",
    description: "Returned to in-person events while maintaining virtual options, creating a hybrid model that increased accessibility.",
    highlights: [
      "40 participating schools",
      "8 committees",
      "750+ delegates from 22 countries"
    ],
    icon: Flag
  },
  {
    number: 4,
    year: "2023-2024",
    name: "Diplomatic Excellence",
    description: "Our current season focuses on innovation in diplomatic simulations and tackling contemporary global challenges.",
    highlights: [
      "50+ participating schools",
      "10 committees",
      "Expected 1000+ delegates from 30+ countries"
    ],
    icon: Sparkles,
    current: true
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
            Exploring our journey from our founding to the present day, each season represents growth, innovation, and impact.
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
                {season.current && (
                  <div className="mb-4 inline-block px-3 py-1 bg-diplomatic-100 text-diplomatic-700 rounded-full text-sm font-semibold">
                    Current Season
                  </div>
                )}
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
