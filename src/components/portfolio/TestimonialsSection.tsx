import React from 'react';
import { Quote, Star } from 'lucide-react';

import { testimonialsData } from '@/data/portfolioData';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const TestimonialsSection: React.FC = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal();
  const { ref: carouselRef, isVisible: carouselVisible } = useScrollReveal(0.15);

  return (
    <section id="testimonials" className="relative py-24 sm:py-32">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={titleRef}
          className={`text-center mb-14 transition-all duration-700 ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block text-emerald-400 text-sm font-semibold uppercase tracking-widest mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            What People Say
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A few words from founders and teams I’ve worked with.
          </p>
        </div>

        {/* Carousel */}
        <div
          ref={carouselRef}
          className={`transition-all duration-700 ${
            carouselVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <Carousel
            className="max-w-6xl mx-auto"
            opts={{ align: 'start', loop: true }}
          >
            <CarouselContent>
              {testimonialsData.map((t) => (
                <CarouselItem key={t.name + t.company} className="md:basis-1/2">
                  <TestimonialCard testimonial={t} />
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Hide arrows on very small screens to avoid overflow */}
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

const TestimonialCard: React.FC<{
  testimonial: (typeof testimonialsData)[0];
}> = ({ testimonial }) => {
  const initials = testimonial.name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join('');

  return (
    <div className="h-full p-6 sm:p-7 rounded-2xl glass glass-hover transition-all duration-300 hover:-translate-y-0.5">
      {/* Quote */}
      <div className="flex items-start justify-between gap-4 mb-5">
        <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
          <Quote size={18} className="text-emerald-400" />
        </div>
        <div className="flex items-center gap-1 text-amber-400">
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <Star key={i} size={14} className="fill-amber-400" />
          ))}
        </div>
      </div>

      <p className="text-gray-300/90 leading-relaxed mb-6">
        “{testimonial.quote}”
      </p>

      {/* Person */}
      <div className="flex items-center gap-4">
        <Avatar size="md">
          {testimonial.avatarUrl ? (
            <AvatarImage src={testimonial.avatarUrl} alt={testimonial.name} />
          ) : null}
          <AvatarFallback className="bg-emerald-500/10 text-emerald-200">
            {initials}
          </AvatarFallback>
        </Avatar>

        <div className="min-w-0">
          <div className="font-semibold text-white truncate">{testimonial.name}</div>
          <div className="text-sm text-gray-500 truncate">
            {testimonial.title}
            {testimonial.company ? (
              <>
                <span className="mx-1">•</span>
                <span className="text-gray-400">{testimonial.company}</span>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
