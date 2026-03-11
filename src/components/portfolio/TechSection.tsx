import React from 'react';
import { Monitor, Server, Database, Cloud, Brain, Wrench } from 'lucide-react';
import { techStack } from '@/data/portfolioData';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const iconMap: Record<string, React.FC<{ size?: number; className?: string }>> = {
  layout: Monitor,
  server: Server,
  database: Database,
  cloud: Cloud,
  brain: Brain,
  wrench: Wrench,
};

const TechSection: React.FC = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal();

  const techEntries = Object.entries(techStack);

  return (
    <section id="tech" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/[0.02] to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-700 ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block text-emerald-400 text-sm font-semibold uppercase tracking-widest mb-4">
            Stack
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Technology Ecosystem
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A versatile toolkit refined over 11+ years of building production systems.
          </p>
        </div>

        {/* Tech Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {techEntries.map(([key, category], index) => (
            <TechCard key={key} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const TechCard: React.FC<{
  category: typeof techStack.frontend;
  index: number;
}> = ({ category, index }) => {
  const { ref, isVisible } = useScrollReveal(0.15);
  const Icon = iconMap[category.icon] || Wrench;

  return (
    <div
      ref={ref}
      className={`group relative p-6 rounded-2xl glass glass-hover transition-all duration-700 hover:-translate-y-1 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center transition-all duration-300 group-hover:bg-emerald-500/20 group-hover:border-emerald-500/30 group-hover:scale-110">
          <Icon size={20} className="text-emerald-400" />
        </div>
        <h3 className="text-lg font-semibold text-white">{category.title}</h3>
      </div>

      {/* Technologies */}
      <div className="flex flex-wrap gap-2">
        {category.technologies.map((tech, i) => (
          <span
            key={tech}
            className="px-3 py-1.5 text-sm font-medium text-gray-300 bg-white/5 rounded-lg border border-white/5 transition-all duration-300 hover:bg-emerald-500/10 hover:border-emerald-500/20 hover:text-emerald-300 cursor-default"
            style={{
              transitionDelay: isVisible ? `${i * 50 + index * 80}ms` : '0ms',
            }}
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Hover glow */}
      <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-emerald-500/15 transition-colors duration-500 pointer-events-none" />
    </div>
  );
};

export default TechSection;
