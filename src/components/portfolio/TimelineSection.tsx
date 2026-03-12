import React from 'react';
import { timelineData } from '@/data/portfolioData';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const TimelineSection: React.FC = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal();

  return (
    <section id="timeline" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/[0.02] to-transparent pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-700 ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block text-emerald-400 text-sm font-semibold uppercase tracking-widest mb-4">
            Journey
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Builder Timeline
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A decade of building, learning, and evolving as a product engineer.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500/30 via-emerald-500/10 to-transparent sm:-translate-x-px" />

          <div className="space-y-12 sm:space-y-16">
            {timelineData.map((item, index) => (
              <TimelineItem key={item.year} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const TimelineItem: React.FC<{
  item: typeof timelineData[0];
  index: number;
}> = ({ item, index }) => {
  const { ref, isVisible } = useScrollReveal(0.2);
  const isLeft = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`relative flex items-start will-change-transform will-change-opacity transition-[transform,opacity,filter] duration-700 ease-out ${
        isVisible
          ? 'opacity-100 translate-y-0 blur-0'
          : `opacity-0 translate-y-10 blur-sm ${
              isLeft ? 'sm:-translate-x-8' : 'sm:translate-x-8'
            }`
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Dot */}
      <div className="absolute left-4 sm:left-1/2 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[hsl(160,10%,4%)] -translate-x-1.5 sm:-translate-x-1.5 z-10 mt-2">
        <div
          className={`absolute inset-0 rounded-full bg-emerald-400 transition-all duration-1000 ${
            isVisible ? 'animate-ping opacity-30' : 'opacity-0'
          }`}
          style={{ animationIterationCount: 1, animationDuration: '1.5s' }}
        />
      </div>

      {/* Content - Mobile: always right, Desktop: alternating */}
      <div className={`ml-12 sm:ml-0 sm:w-1/2 ${isLeft ? 'sm:pr-12 sm:text-right' : 'sm:pl-12 sm:ml-auto'}`}>
        {/* Year badge */}
        <div className={`inline-flex items-center px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-3 ${isLeft ? 'sm:float-right sm:ml-3' : ''}`}>
          <span className="text-xs font-semibold text-emerald-300 font-mono">{item.year}</span>
        </div>

        <div className="clear-both" />

        {/* Card */}
        <div className="p-5 rounded-xl glass glass-hover transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-500/10">
          <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
          <p className="text-sm text-gray-400 leading-relaxed mb-4">{item.description}</p>

          {/* Highlights */}
          <div className={`flex flex-wrap gap-2 ${isLeft ? 'sm:justify-end' : ''}`}>
            {item.highlights.map((h) => (
              <span
                key={h}
                className="px-2.5 py-1 text-xs font-medium text-emerald-300/80 bg-emerald-500/10 rounded-md"
              >
                {h}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineSection;
