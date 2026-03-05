
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const galleryImages = [
  {
    src: '/lovable-uploads/896f57e8-2e28-4948-9a76-272b7423f902.png',
    alt: 'Opening Ceremony',
    caption: 'Opening Ceremony from Season 3'
  },
  {
    src: '/lovable-uploads/896f57e8-2e28-4948-9a76-272b7423f902.png',
    alt: 'Committee Session',
    caption: 'Security Council in Session'
  },
  {
    src: '/lovable-uploads/896f57e8-2e28-4948-9a76-272b7423f902.png',
    alt: 'Delegate Caucus',
    caption: 'Delegates in an Unmoderated Caucus'
  },
  {
    src: '/lovable-uploads/896f57e8-2e28-4948-9a76-272b7423f902.png',
    alt: 'Award Ceremony',
    caption: 'Season 2 Award Ceremony'
  },
  {
    src: '/lovable-uploads/896f57e8-2e28-4948-9a76-272b7423f902.png',
    alt: 'Guest Speaker',
    caption: 'Distinguished Diplomat Address'
  },
  {
    src: '/lovable-uploads/896f57e8-2e28-4948-9a76-272b7423f902.png',
    alt: 'Social Event',
    caption: 'Delegate Social Night'
  }
];

export default function AboutGallery() {
  return (
    <section className="py-20 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h2 className="text-3xl font-bold mb-4">turonmun in Action</h2>
          <div className="w-20 h-1 bg-diplomatic-600 mx-auto mb-4" />
          <p className="text-neutral-600">
            Moments from our previous conferences showcasing the turonmun experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <Card key={index} className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="aspect-video overflow-hidden">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <CardContent className="p-4">
                <p className="text-sm text-neutral-600">{image.caption}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
