import React, { useState, useEffect } from 'react';
import { ArrowDown, BookOpen, Mail } from 'lucide-react';
import FloatingShapes from './FloatingShapes';
import { avatarUrl } from '@/data/portfolioData';
import heroImage from '@/assets/hero.png';

const HeroSection: React.FC = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[calc(100vh-4rem)] lg:min-h-[calc(100vh-5rem)] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-center bg-cover bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(160,10%,4%)] via-[hsl(160,12%,6%)] to-[hsl(160,10%,4%)] opacity-85" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(52,211,153,0.08)_0%,transparent_70%)]" />
      <FloatingShapes />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Avatar */}
        <div
          className={`mt-6 sm:mt-8 lg:mt-10 mb-8 transition-all duration-1000 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="relative inline-block">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden ring-2 ring-emerald-400/30 ring-offset-4 ring-offset-[hsl(160,10%,4%)] mx-auto">
              <img
                src={avatarUrl}
                alt="Product Engineer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-400 rounded-full border-2 border-[hsl(160,10%,4%)] flex items-center justify-center">
              <div className="w-2 h-2 bg-[hsl(160,10%,4%)] rounded-full" />
            </div>
          </div>
        </div>

        {/* Badge */}
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 transition-all duration-1000 delay-200 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-sm text-emerald-300 font-medium">Available for new projects</span>
        </div>

        {/* Headline */}
        <h1
          className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 transition-all duration-1000 delay-300 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="text-white">Product Engineer</span>
          <br />
          <span className="text-gradient">Building SaaS & AI Platforms</span>
        </h1>

        {/* Subtext */}
        <p
          className={`text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed transition-all duration-1000 delay-500 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          I help startups turn ideas into real products. With 11+ years of experience building
          SaaS platforms, AI tools, and scalable web applications, I focus on solving difficult
          engineering problems and delivering production-ready software.
        </p>

        {/* Stats */}
        <div
          className={`flex flex-wrap justify-center gap-8 sm:gap-12 mb-12 transition-all duration-1000 delay-600 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {[
            { value: '11+', label: 'Years Experience' },
            { value: '14+', label: 'Products Shipped' },
            { value: '50+', label: 'Systems Designed' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-emerald-400">{stat.value}</div>
              <div className="text-xs sm:text-sm text-gray-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-1000 delay-700 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <button
            onClick={() => scrollTo('products')}
            className="group flex items-center gap-2 px-8 py-4 bg-emerald-500 text-[hsl(160,10%,4%)] font-semibold rounded-xl hover:bg-emerald-400 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/25 hover:-translate-y-0.5"
          >
            Explore My Work
            <ArrowDown size={18} className="transition-transform group-hover:translate-y-0.5" />
          </button>
          <button
            onClick={() => scrollTo('blog')}
            className="group flex items-center gap-2 px-8 py-4 glass text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300 hover:-translate-y-0.5"
          >
            <BookOpen size={18} />
            Engineering Blog
          </button>
          <button
            onClick={() => scrollTo('contact')}
            className="group flex items-center gap-2 px-8 py-4 glass text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300 hover:-translate-y-0.5"
          >
            <Mail size={18} />
            Contact Me
          </button>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs text-gray-600 uppercase tracking-widest">Scroll</span>
        <div className="w-5 h-8 rounded-full border border-gray-700 flex items-start justify-center p-1">
          <div className="w-1 h-2 bg-emerald-400 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
