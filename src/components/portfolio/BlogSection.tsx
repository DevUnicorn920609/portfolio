import React, { useState, useMemo } from 'react';
import { Clock, ArrowRight, Tag, ChevronLeft } from 'lucide-react';

import { blogPosts } from '@/data/portfolioData';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const allCategories = ['All', ...Array.from(new Set(blogPosts.map(p => p.category)))];

const BlogSection: React.FC = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal();
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedPost, setSelectedPost] = useState<typeof blogPosts[0] | null>(null);

  const filteredPosts = useMemo(() => {
    if (activeCategory === 'All') return blogPosts;
    return blogPosts.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <section id="blog" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={titleRef}
          className={`text-center mb-12 transition-all duration-700 ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block text-emerald-400 text-sm font-semibold uppercase tracking-widest mb-4">
            Insights
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Engineering Blog
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Sharing lessons from building real products — SaaS architecture, AI integration, system design, and startup engineering.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          <Tag size={16} className="text-gray-500 mr-1" />
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-emerald-500 text-[hsl(160,10%,4%)] shadow-lg shadow-emerald-500/20'
                  : 'text-gray-400 glass hover:text-white hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        {!selectedPost && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, index) => (
              <BlogCard
                key={post.id}
                post={post}
                index={index}
                onClick={() => setSelectedPost(post)}
              />
            ))}
          </div>
        )}

        {/* Article Detail */}
        {selectedPost && (
          <ArticleDetail
            post={selectedPost}
            onClose={() => setSelectedPost(null)}
          />
        )}
      </div>
    </section>
  );
};

const BlogCard: React.FC<{
  post: typeof blogPosts[0];
  index: number;
  onClick: () => void;
}> = ({ post, index, onClick }) => {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <div
      ref={ref}
      onClick={onClick}
      className={`group relative p-6 rounded-2xl glass glass-hover cursor-pointer transition-all duration-700 hover:-translate-y-1 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Category badge */}
      <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4">
        <span className="text-xs font-medium text-emerald-300">{post.category}</span>
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-emerald-400 transition-colors leading-snug">
        {post.title}
      </h3>

      {/* Excerpt */}
      <p className="text-sm text-gray-400 leading-relaxed mb-4 line-clamp-3">
        {post.excerpt}
      </p>

      {/* Meta */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <span>{post.date}</span>
          <span className="w-1 h-1 rounded-full bg-gray-600" />
          <span className="flex items-center gap-1">
            <Clock size={12} />
            {post.readTime}
          </span>
        </div>
        <ArrowRight
          size={16}
          className="text-gray-600 group-hover:text-emerald-400 transition-all duration-300 group-hover:translate-x-1"
        />
      </div>

      {/* Hover border */}
      <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-emerald-500/20 transition-colors duration-500 pointer-events-none" />
    </div>
  );
};

const ArticleDetail: React.FC<{
  post: typeof blogPosts[0];
  onClose: () => void;
}> = ({ post, onClose }) => {
  return (
    <div className="animate-fade-in-up">
      {/* Back button */}
      <button
        onClick={onClose}
        className="flex items-center gap-2 text-gray-400 hover:text-emerald-400 transition-colors mb-8 group"
      >
        <ChevronLeft size={18} className="transition-transform group-hover:-translate-x-1" />
        <span className="text-sm font-medium">Back to articles</span>
      </button>

      {/* Article */}
      <article className="max-w-3xl mx-auto">
        {/* Meta */}
        <div className="flex items-center gap-3 mb-6">
          <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-medium text-emerald-300">
            {post.category}
          </span>
          <span className="text-sm text-gray-500">{post.date}</span>
          <span className="text-sm text-gray-500 flex items-center gap-1">
            <Clock size={12} />
            {post.readTime}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-8 leading-tight">
          {post.title}
        </h1>

        {/* Content */}
        <div className="prose prose-invert prose-emerald max-w-none">
          {post.content.split('\n\n').map((paragraph, i) => {
            if (paragraph.startsWith('## ')) {
              return (
                <h2 key={i} className="text-xl font-semibold text-white mt-8 mb-4">
                  {paragraph.replace('## ', '')}
                </h2>
              );
            }
            return (
              <p key={i} className="text-gray-400 leading-relaxed mb-4">
                {paragraph}
              </p>
            );
          })}
        </div>

        {/* Close */}
        <div className="mt-12 pt-8 border-t border-white/5">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors group"
          >
            <ChevronLeft size={18} className="transition-transform group-hover:-translate-x-1" />
            <span className="text-sm font-medium">Back to all articles</span>
          </button>
        </div>
      </article>
    </div>
  );
};

export default BlogSection;
