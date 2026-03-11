import React from 'react';
import { Lightbulb, Layers, Zap, Puzzle } from 'lucide-react';

import { useScrollReveal } from '@/hooks/useScrollReveal';

const philosophyCards = [
  {
    icon: Lightbulb,
    title: 'Product Thinking',
    description: 'Every line of code should serve a user need. I start with the problem, not the technology.',
    color: 'from-emerald-400 to-green-500',
  },
  {
    icon: Layers,
    title: 'Clean Architecture',
    description: 'Systems that are easy to understand, extend, and maintain. Complexity is the enemy of reliability.',
    color: 'from-teal-400 to-emerald-500',
  },
  {
    icon: Zap,
    title: 'Rapid Iteration',
    description: 'Ship fast, learn faster. Build MVPs in weeks, not months, and iterate based on real feedback.',
    color: 'from-green-400 to-emerald-500',
  },
  {
    icon: Puzzle,

    title: 'Problem Solving',
    description: 'Complex technical challenges are opportunities. I break them down into manageable, solvable pieces.',
    color: 'from-emerald-400 to-teal-500',
  },
];

const PhilosophySection: React.FC = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal();
  const { ref: textRef, isVisible: textVisible } = useScrollReveal();

  return (
    <section id="philosophy" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-700 ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block text-emerald-400 text-sm font-semibold uppercase tracking-widest mb-4">
            Philosophy
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            How I Build Products
          </h2>
        </div>

        {/* Philosophy Text */}
        <div
          ref={textRef}
          className={`max-w-3xl mx-auto text-center mb-16 transition-all duration-700 delay-200 ${
            textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-lg text-gray-400 leading-relaxed mb-4">
            I enjoy building real products that people use. Over the past decade I have worked with
            startups and technology companies to transform ideas into scalable software systems.
          </p>
          <p className="text-lg text-gray-400 leading-relaxed">
            My work focuses on clean architecture, rapid iteration, and solving complex technical
            challenges. I don't just write code — I help shape the product.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {philosophyCards.map((card, index) => (
            <PhilosophyCard key={card.title} card={card} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const PhilosophyCard: React.FC<{
  card: typeof philosophyCards[0];
  index: number;
}> = ({ card, index }) => {
  const { ref, isVisible } = useScrollReveal(0.2);
  const Icon = card.icon;

  return (
    <div
      ref={ref}
      className={`group relative p-6 rounded-2xl glass glass-hover transition-all duration-700 hover:-translate-y-1 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 100 + 200}ms` }}
    >
      {/* Icon */}
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
        <Icon size={22} className="text-[hsl(160,10%,4%)]" />
      </div>

      {/* Content */}
      <h3 className="text-lg font-semibold text-white mb-2">{card.title}</h3>
      <p className="text-sm text-gray-400 leading-relaxed">{card.description}</p>

      {/* Hover glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </div>
  );
};

export default PhilosophySection;
