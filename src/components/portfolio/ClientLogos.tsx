import React from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const productNames = [
  'Frontier Tower', 'Igloo', 'Remini', 'Entrives', 'Clarko AI',
  'BuildUGC', 'Klowi', 'Headspace', 'FullEnrich', 'SprintIQ',
  'SaaSPriceLab', 'RentOut', 'OpenRouter',
];

const ClientLogos: React.FC = () => {
  const { ref, isVisible } = useScrollReveal(0.3);

  return (
    <div
      ref={ref}
      className={`py-12 overflow-hidden transition-all duration-700 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <p className="text-center text-xs text-gray-600 uppercase tracking-widest mb-8">
        Products I've helped build
      </p>

      {/* Scrolling marquee */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[hsl(160,10%,4%)] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[hsl(160,10%,4%)] to-transparent z-10" />

        <div className="flex animate-marquee">
          {[...productNames, ...productNames].map((name, i) => (
            <div
              key={`${name}-${i}`}
              className="flex-shrink-0 mx-8 text-gray-600 text-sm font-medium hover:text-emerald-400/60 transition-colors cursor-default whitespace-nowrap"
            >
              {name}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default ClientLogos;
