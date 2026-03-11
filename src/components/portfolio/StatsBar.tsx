import React from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const stats = [
  { label: 'Years of Experience', value: '11+' },
  { label: 'Products Shipped', value: '14+' },
  { label: 'Technologies Mastered', value: '25+' },
  { label: 'Systems Architected', value: '50+' },
];

const StatsBar: React.FC = () => {
  const { ref, isVisible } = useScrollReveal(0.3);

  return (
    <div ref={ref} className="relative py-16 sm:py-20">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/[0.03] to-transparent" />
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`text-center transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="text-3xl sm:text-4xl font-bold text-emerald-400 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsBar;
