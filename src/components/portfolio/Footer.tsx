import React from 'react';
import { Github, Mail, MessageCircle, ArrowUp } from 'lucide-react';
import { socialLinks } from '@/data/portfolioData';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center">
                <span className="text-sm font-bold text-[hsl(160,10%,4%)]">PE</span>
              </div>
              <span className="text-white font-semibold text-lg">
                Product<span className="text-emerald-400">Engineer</span>
              </span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-md mb-6">
              I’m James Campbell — a product-focused full-stack engineer using AI as a multiplier to help founders ship faster.
              I bridge vision and execution, turning ideas into reliable, production-ready SaaS and AI products.
            </p>
            <div className="flex items-center gap-3">
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center hover:bg-emerald-500/10 transition-colors group"
              >
                <Github size={16} className="text-gray-500 group-hover:text-emerald-400 transition-colors" />
              </a>
              <a
                href={socialLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center hover:bg-emerald-500/10 transition-colors group"
              >
                <MessageCircle size={16} className="text-gray-500 group-hover:text-emerald-400 transition-colors" />
              </a>
              <a
                href={`mailto:${socialLinks.email}`}
                className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center hover:bg-emerald-500/10 transition-colors group"
              >
                <Mail size={16} className="text-gray-500 group-hover:text-emerald-400 transition-colors" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">Navigation</h4>
            <div className="space-y-2">
              {[
                { label: 'About', id: 'philosophy' },
                { label: 'Products', id: 'products' },
                { label: 'Challenges', id: 'challenges' },
                { label: 'Technology', id: 'tech' },
                { label: 'Blog', id: 'blog' },
                { label: 'Timeline', id: 'timeline' },
                { label: 'Contact', id: 'contact' },
              ].map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="block text-sm text-gray-500 hover:text-emerald-400 transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">Services</h4>
            <div className="space-y-2">
              {[
                'SaaS Development',
                'AI Integration',
                'System Architecture',
                'MVP Development',
                'Performance Optimization',
                'Technical Consulting',
              ].map((service) => (
                <span key={service} className="block text-sm text-gray-500">
                  {service}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">
            &copy; {new Date().getFullYear()} ProductEngineer. Built with React & Tailwind CSS.
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs text-gray-500 hover:text-emerald-400 transition-colors group"
          >
            <span>Back to top</span>
            <ArrowUp size={14} className="transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
