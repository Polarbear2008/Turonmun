
import React from 'react';
import { Mail, Linkedin, Twitter } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const teamMembers = [
  {
    name: 'Sarah Johnson',
    role: 'Secretary General',
    image: '/lovable-uploads/896f57e8-2e28-4948-9a76-272b7423f902.png',
    bio: 'Sarah brings 5 years of MUN experience and a passion for international diplomacy. She has a background in International Relations.',
    social: {
      email: 'sarah@turonmun.org',
      linkedin: 'https://linkedin.com/in/sarah-johnson',
      twitter: 'https://twitter.com/sarahmun'
    }
  },
  {
    name: 'Michael Chen',
    role: 'Director General',
    image: '/lovable-uploads/896f57e8-2e28-4948-9a76-272b7423f902.png',
    bio: 'Michael oversees all committee operations and has participated in over 20 international MUN conferences.',
    social: {
      email: 'michael@turonmun.org',
      linkedin: 'https://linkedin.com/in/michael-chen',
      twitter: 'https://twitter.com/michaelmun'
    }
  },
  {
    name: 'Emily Rodriguez',
    role: 'Head of Operations',
    image: '/lovable-uploads/896f57e8-2e28-4948-9a76-272b7423f902.png',
    bio: 'Emily manages logistics and event planning with expertise in organizing large-scale international gatherings.',
    social: {
      email: 'emily@turonmun.org',
      linkedin: 'https://linkedin.com/in/emily-rodriguez',
      twitter: 'https://twitter.com/emilymun'
    }
  },
  {
    name: 'David Kim',
    role: 'Chief of Staff',
    image: '/lovable-uploads/896f57e8-2e28-4948-9a76-272b7423f902.png',
    bio: 'David coordinates our team of volunteers and has a background in organizational leadership and management.',
    social: {
      email: 'david@turonmun.org',
      linkedin: 'https://linkedin.com/in/david-kim',
      twitter: 'https://twitter.com/davidmun'
    }
  },
  {
    name: 'Priya Patel',
    role: 'Director of Outreach',
    image: '/lovable-uploads/896f57e8-2e28-4948-9a76-272b7423f902.png',
    bio: 'Priya leads our global recruitment initiatives and partnership development with educational institutions.',
    social: {
      email: 'priya@turonmun.org',
      linkedin: 'https://linkedin.com/in/priya-patel',
      twitter: 'https://twitter.com/priyamun'
    }
  },
  {
    name: 'Carlos Mendoza',
    role: 'Technology Director',
    image: '/lovable-uploads/896f57e8-2e28-4948-9a76-272b7423f902.png',
    bio: 'Carlos manages our digital infrastructure and online conference platforms.',
    social: {
      email: 'carlos@turonmun.org',
      linkedin: 'https://linkedin.com/in/carlos-mendoza',
      twitter: 'https://twitter.com/carlosmun'
    }
  },
  {
    name: 'Aisha Rahman',
    role: 'Academic Director',
    image: '/lovable-uploads/896f57e8-2e28-4948-9a76-272b7423f902.png',
    bio: 'Aisha designs our educational content and committee topics with a focus on current global issues.',
    social: {
      email: 'aisha@turonmun.org',
      linkedin: 'https://linkedin.com/in/aisha-rahman',
      twitter: 'https://twitter.com/aishamun'
    }
  },
  {
    name: 'Thomas Wilson',
    role: 'Finance Director',
    image: '/lovable-uploads/896f57e8-2e28-4948-9a76-272b7423f902.png',
    bio: 'Thomas manages our budget and financial partnerships to ensure sustainable operations.',
    social: {
      email: 'thomas@turonmun.org',
      linkedin: 'https://linkedin.com/in/thomas-wilson',
      twitter: 'https://twitter.com/thomasmun'
    }
  }
];

export default function AboutTeam() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Meet Our Leadership Team</h2>
          <div className="w-20 h-1 bg-diplomatic-600 mx-auto mb-4" />
          <p className="text-neutral-600">
            Our diverse team of experienced professionals is dedicated to creating exceptional MUN experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="aspect-square rounded-full overflow-hidden mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-1 text-center">{member.name}</h3>
                <p className="text-diplomatic-600 text-center font-medium mb-2">{member.role}</p>
                <p className="text-neutral-600 text-sm mb-4 text-center">{member.bio}</p>
                <div className="flex justify-center space-x-3">
                  <a href={`mailto:${member.social.email}`} className="text-neutral-500 hover:text-diplomatic-600 transition-colors">
                    <Mail className="h-5 w-5" />
                  </a>
                  <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-diplomatic-600 transition-colors">
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a href={member.social.twitter} target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-diplomatic-600 transition-colors">
                    <Twitter className="h-5 w-5" />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
