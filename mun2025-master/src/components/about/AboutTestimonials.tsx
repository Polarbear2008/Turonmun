
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const testimonials = [
  {
    quote: "turonmun provided me with invaluable experience in diplomacy and public speaking. It truly shaped my academic career.",
    author: "Alex Martinez",
    role: "Former Delegate, Harvard University",
    image: '/lovable-uploads/896f57e8-2e28-4948-9a76-272b7423f902.png'
  },
  {
    quote: "The level of professionalism and authenticity in turonmun's committees is unmatched. A truly educational experience.",
    author: "Sophia Wang",
    role: "High School Advisor, International Academy",
    image: '/lovable-uploads/896f57e8-2e28-4948-9a76-272b7423f902.png'
  },
  {
    quote: "Participating in turonmun opened doors to international opportunities and shaped my understanding of global politics.",
    author: "James Okonjo",
    role: "Delegate, Seasons 1-3",
    image: '/lovable-uploads/896f57e8-2e28-4948-9a76-272b7423f902.png'
  }
];

export default function AboutTestimonials() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Voices from Our Community</h2>
          <div className="w-20 h-1 bg-diplomatic-600 mx-auto mb-4" />
          <p className="text-neutral-600">
            Hear from past delegates and advisors about their turonmun experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex flex-col h-full">
                  <div className="mb-4 text-4xl text-diplomatic-300">"</div>
                  <p className="text-neutral-700 mb-6 flex-grow italic">
                    {testimonial.quote}
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.author}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold">{testimonial.author}</h4>
                      <p className="text-sm text-neutral-500">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
