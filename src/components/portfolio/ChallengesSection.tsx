import React, { useState } from 'react';
import { TrendingUp, Brain, Zap, Boxes, ChevronRight, type LucideIcon } from 'lucide-react';
import { challengesData } from '@/data/portfolioData';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const iconMap: Record<string, LucideIcon> = {
  'trending-up': TrendingUp,
  'brain': Brain,
  'zap': Zap,
  'boxes': Boxes,
};

const ChallengesSection: React.FC = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal();
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  return (
    <section id="challenges" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-700 ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block text-emerald-400 text-sm font-semibold uppercase tracking-widest mb-4">
            Engineering
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Challenges I've Solved
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Real engineering problems from real products, solved with thoughtful architecture and pragmatic solutions.
          </p>
        </div>

        {/* Challenge Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {challengesData.map((challenge, index) => {
            const Icon = iconMap[challenge.icon] || Boxes;
            return (
              <ChallengeCard
                key={challenge.title}
                challenge={challenge}
                Icon={Icon}
                index={index}
                isExpanded={expandedCard === index}
                onToggle={() => setExpandedCard(expandedCard === index ? null : index)}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

const ChallengeCard: React.FC<{
  challenge: typeof challengesData[0];
  Icon: LucideIcon;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}> = ({ challenge, Icon, index, isExpanded, onToggle }) => {
  const { ref, isVisible } = useScrollReveal(0.15);

  return (
    <div
      ref={ref}
      className={`group relative rounded-2xl glass overflow-hidden transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="p-6 sm:p-8">
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500/20 to-green-500/10 flex items-center justify-center border border-emerald-500/20 transition-all duration-300 group-hover:scale-110 group-hover:border-emerald-500/40">
            <Icon size={24} className="text-emerald-400" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors">
              {challenge.title}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-3">
              {challenge.description}
            </p>

            {/* Metric */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-xs font-medium text-emerald-300">{challenge.metrics}</span>
            </div>

            {/* Expandable Details */}
            <button
              onClick={onToggle}
              className="flex items-center gap-1 text-sm text-gray-500 hover:text-emerald-400 transition-colors"
            >
              <span>{isExpanded ? 'Hide details' : 'View details'}</span>
              <ChevronRight
                size={14}
                className={`transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`}
              />
            </button>

            <div
              className={`overflow-hidden transition-all duration-500 ${
                isExpanded ? 'max-h-48 mt-4 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="space-y-2">
                {challenge.details.map((detail) => (
                  <div key={detail} className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-emerald-400/60" />
                    <span className="text-sm text-gray-400">{detail}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Animated diagram visualization */}
        <div className="mt-6 relative h-1 rounded-full bg-white/5 overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-500 to-green-400 rounded-full transition-all duration-1000"
            style={{
              width: isVisible ? `${70 + index * 8}%` : '0%',
              transitionDelay: `${index * 200 + 500}ms`,
            }}
          />
        </div>
      </div>

      {/* Hover border glow */}
      <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-emerald-500/20 transition-colors duration-500 pointer-events-none" />
    </div>
  );
};

export default ChallengesSection;
