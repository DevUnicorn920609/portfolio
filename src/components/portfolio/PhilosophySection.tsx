import React from 'react';
import { CheckCircle2, Lightbulb, Layers, Puzzle, Sparkles, Zap } from 'lucide-react';

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
            About
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Bridging Vision & AI Capability
          </h2>
        </div>

        {/* About content */}
        <div
          ref={textRef}
          className={`max-w-6xl mx-auto mb-16 transition-all duration-700 delay-200 ${
            textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* Story */}
            <div className="lg:col-span-7 relative rounded-2xl glass overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent pointer-events-none" />
              <div className="relative p-6 sm:p-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-5">
                  <Sparkles size={14} className="text-emerald-300" />
                  <span className="text-xs font-semibold text-emerald-300 uppercase tracking-wider">
                    AI as a multiplier
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-white leading-tight mb-4">
                  I'm <span className="text-gradient">James Campbell</span> — a full-stack product engineer
                  building faster with AI, without sacrificing quality.
                </h3>

                <div className="space-y-4 text-gray-400 leading-relaxed">
                  <p>
                    Over the past few years, I’ve built{' '}
                    <span className="text-white font-medium">40+ production applications</span> using
                    AI-assisted development — not as a shortcut, but as a way to iterate quickly while
                    keeping the bar high for reliability and maintainability.
                  </p>
                  <p>
                    What drives me: most people can’t access this power. Non-technical founders, small
                    business owners, and creative professionals have incredible ideas — but the AI
                    development landscape can feel overwhelming.
                  </p>
                  <p>
                    I bridge the gap between <span className="text-white font-medium">human vision</span> and{' '}
                    <span className="text-white font-medium">AI capability</span>, translating complex technical
                    decisions into clear, understandable choices. You don’t need to know what a REST API
                    is — you just need to know your product works.
                  </p>
                </div>

                <div className="mt-7 flex flex-wrap gap-3">
                  {[
                    { k: '11+', v: 'Years building' },
                    { k: '40+', v: 'AI-assisted builds' },
                    { k: '14+', v: 'Products shipped' },
                  ].map((m) => (
                    <div
                      key={m.v}
                      className="px-4 py-3 rounded-xl bg-white/5 border border-white/5"
                    >
                      <div className="text-lg font-bold text-emerald-400 leading-none">{m.k}</div>
                      <div className="text-xs text-gray-500 mt-1">{m.v}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Side cards */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 sm:p-7 rounded-2xl glass glass-hover">
                <h4 className="text-lg font-semibold text-white mb-4">Who I help</h4>
                <div className="space-y-3">
                  {[ 
                    'Non-technical founders going from idea → MVP',
                    'Teams adding AI features (agents, chat, automations)',
                    'SaaS companies improving performance, reliability, and architecture',
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckCircle2 size={18} className="text-emerald-400 mt-0.5" />
                      <p className="text-sm text-gray-400 leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 sm:p-7 rounded-2xl glass glass-hover">
                <h4 className="text-lg font-semibold text-white mb-2">What you get</h4>
                <p className="text-sm text-gray-400 leading-relaxed mb-4">
                  Clear tradeoffs, fast delivery, and production-ready engineering — with weekly progress
                  you can actually see.
                </p>

                <div className="flex flex-wrap gap-2">
                  {['MVP Build', 'SaaS', 'AI Integration', 'Scaling', 'Clean Architecture'].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 text-xs font-medium text-gray-300 bg-white/5 rounded-lg border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href="#contact"
                  className="mt-5 inline-flex items-center justify-center w-full px-4 py-3 rounded-xl bg-emerald-500 text-[hsl(160,10%,4%)] font-semibold hover:bg-emerald-400 transition-colors"
                >
                  Let’s talk about your idea
                </a>
              </div>
            </div>
          </div>
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
