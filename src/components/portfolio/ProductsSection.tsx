import React, { useState, useMemo } from 'react';
import { ExternalLink, Filter } from 'lucide-react';
import { portfolioItems } from '@/data/portfolioData';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const categories = ['All', 'SaaS', 'AI', 'Platform', 'Service'];

const getCategoryForItem = (item: typeof portfolioItems[0]): string[] => {
  const cats: string[] = [];
  const desc = (item.description + ' ' + item.tech.join(' ')).toLowerCase();
  if (desc.includes('saas') || desc.includes('sass') || desc.includes('management') || desc.includes('enrichment') || desc.includes('pricing') || desc.includes('rental') || desc.includes('productivity')) cats.push('SaaS');
  if (desc.includes('ai') || desc.includes('ml') || desc.includes('openai') || desc.includes('llm') || desc.includes('intelligence')) cats.push('AI');
  if (desc.includes('platform') || desc.includes('infrastructure') || desc.includes('digital')) cats.push('Platform');
  if (desc.includes('service') || desc.includes('booking') || desc.includes('photography')) cats.push('Service');
  if (cats.length === 0) cats.push('Platform');
  return cats;
};

const ProductsSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [showAll, setShowAll] = useState(false);
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal();

  const filteredItems = useMemo(() => {
    if (activeFilter === 'All') return portfolioItems;
    return portfolioItems.filter(item => getCategoryForItem(item).includes(activeFilter));
  }, [activeFilter]);

  const displayedItems = showAll ? filteredItems : filteredItems.slice(0, 8);

  return (
    <section id="products" className="relative py-24 sm:py-32">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/[0.02] to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={titleRef}
          className={`text-center mb-12 transition-all duration-700 ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block text-emerald-400 text-sm font-semibold uppercase tracking-widest mb-4">
            Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Products I've Helped Build
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            From early-stage startups to established platforms, here are some of the products I've engineered.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          <Filter size={16} className="text-gray-500 mr-1" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setActiveFilter(cat); setShowAll(false); }}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                activeFilter === cat
                  ? 'bg-emerald-500 text-[hsl(160,10%,4%)] shadow-lg shadow-emerald-500/20'
                  : 'text-gray-400 glass hover:text-white hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayedItems.map((item, index) => (
            <ProductCard key={item.id} item={item} index={index} />
          ))}
        </div>

        {/* Show More */}
        {filteredItems.length > 8 && !showAll && (
          <div className="text-center mt-12">
            <button
              onClick={() => setShowAll(true)}
              className="px-8 py-3 glass text-emerald-400 font-medium rounded-xl hover:bg-emerald-500/10 transition-all duration-300 hover:-translate-y-0.5"
            >
              View All {filteredItems.length} Projects
            </button>
          </div>
        )}
        {showAll && filteredItems.length > 8 && (
          <div className="text-center mt-12">
            <button
              onClick={() => setShowAll(false)}
              className="px-8 py-3 glass text-gray-400 font-medium rounded-xl hover:bg-white/5 transition-all duration-300"
            >
              Show Less
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

const ProductCard: React.FC<{
  item: typeof portfolioItems[0];
  index: number;
}> = ({ item, index }) => {
  const { ref, isVisible } = useScrollReveal(0.1);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div
      ref={ref}
      className={`group relative rounded-2xl overflow-hidden glass transition-all duration-700 hover:-translate-y-2 hover:shadow-xl hover:shadow-emerald-500/10 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${(index % 4) * 80}ms` }}
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[hsl(160,8%,8%)]">
        <img
          src={item.image}
          alt={item.name}
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover object-top transition-all duration-700 group-hover:scale-105 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-emerald-400/30 border-t-emerald-400 rounded-full animate-spin" />
          </div>
        )}

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(160,10%,4%)] via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

        {/* Visit link */}
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-3 right-3 w-9 h-9 rounded-lg bg-black/50 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-emerald-500 hover:text-[hsl(160,10%,4%)] translate-y-2 group-hover:translate-y-0"
        >
          <ExternalLink size={16} />
        </a>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-base font-semibold text-white group-hover:text-emerald-400 transition-colors">
            {item.name}
          </h3>
        </div>

        <p className="text-sm text-gray-500 mb-3 line-clamp-2 leading-relaxed">
          {item.description}
        </p>

        <div className="text-xs text-emerald-400/80 font-medium mb-3">
          {item.role}
        </div>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1.5">
          {item.tech.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 text-[10px] font-medium text-gray-400 bg-white/5 rounded-md"
            >
              {tech}
            </span>
          ))}
          {item.tech.length > 4 && (
            <span className="px-2 py-0.5 text-[10px] font-medium text-gray-500 bg-white/5 rounded-md">
              +{item.tech.length - 4}
            </span>
          )}
        </div>
      </div>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
};

export default ProductsSection;
