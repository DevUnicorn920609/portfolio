import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const CTASection: React.FC = () => {
  const { ref, isVisible } = useScrollReveal(0.2);

  return (
    <div ref={ref} className="py-24 sm:py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`relative p-8 sm:p-12 lg:p-16 rounded-3xl overflow-hidden transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-green-500/5 to-teal-500/10 border border-emerald-500/20 rounded-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(52,211,153,0.1)_0%,transparent_60%)]" />

          {/* Content */}
          <div className="relative text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
              Ready to build your next product?
            </h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto mb-8">
              I'm currently available for new projects. Let's discuss how I can help you design, build, and scale your SaaS platform or AI tool.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="group flex items-center gap-2 px-8 py-4 bg-emerald-500 text-[hsl(160,10%,4%)] font-semibold rounded-xl hover:bg-emerald-400 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/25"
              >
                Start a Conversation
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 text-white font-medium rounded-xl border border-white/10 hover:bg-white/5 transition-all duration-300"
              >
                View My Work
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTASection;
