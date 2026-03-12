import React, { useState } from 'react';
import { Send, Github, Mail, MessageCircle, FileDown, CircleCheck, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';

import { useScrollReveal } from '@/hooks/useScrollReveal';
import { socialLinks } from '@/data/portfolioData';

const ContactSection: React.FC = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Name is required';
    if (!formData.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = 'Invalid email address';
    if (!formData.message.trim()) errs.message = 'Message is required';
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitError(null);
    setSubmitting(true);

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error('Missing EmailJS environment variables. Please check your .env file.');
      }

      // NOTE: These parameter keys must match your EmailJS template variables.
      // Common patterns: from_name, from_email, message, reply_to
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          // If your EmailJS template only renders `{{message}}`, this ensures
          // you still receive name + email + message in the email content.
          message: `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`,
          reply_to: formData.email,
          to_email: socialLinks.email,
        },
        { publicKey }
      );

      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to send message. Please try again.';
      setSubmitError(message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-700 ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block text-emerald-400 text-sm font-semibold uppercase tracking-widest mb-4">
            Connect
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Building something interesting?
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            If you're building a SaaS product, startup platform, or AI tool and need an experienced engineer, let's talk.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 max-w-5xl mx-auto">
          {/* Form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="p-8 rounded-2xl glass text-center animate-scale-in">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                  <CircleCheck size={32} className="text-emerald-400" />

                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Message Sent!</h3>
                <p className="text-gray-400 mb-6">Thanks for reaching out. I'll get back to you soon.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2 text-sm glass text-emerald-400 rounded-lg hover:bg-emerald-500/10 transition-all"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {submitError && (
                  <div className="p-4 rounded-xl border border-red-500/30 bg-red-500/10 text-red-200 text-sm">
                    {submitError}
                  </div>
                )}
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="Your name"
                    className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all ${
                      errors.name ? 'border-red-500/50' : 'border-white/10 focus:border-emerald-500/50'
                    }`}
                  />
                  {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="your@email.com"
                    className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all ${
                      errors.email ? 'border-red-500/50' : 'border-white/10 focus:border-emerald-500/50'
                    }`}
                  />
                  {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    placeholder="Tell me about your project..."
                    rows={5}
                    className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all resize-none ${
                      errors.message ? 'border-red-500/50' : 'border-white/10 focus:border-emerald-500/50'
                    }`}
                  />
                  {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message}</p>}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-emerald-500 text-[hsl(160,10%,4%)] font-semibold rounded-xl hover:bg-emerald-400 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2 space-y-6">
            {/* Social Links */}
            <div className="p-6 rounded-2xl glass">
              <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">Connect</h3>
              <div className="space-y-3">
                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-emerald-500/10 transition-colors">
                    <Github size={18} className="text-gray-400 group-hover:text-emerald-400 transition-colors" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">GitHub</div>
                    <div className="text-xs text-gray-500">View my code</div>
                  </div>
                </a>

                <a
                  href={socialLinks.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-emerald-500/10 transition-colors">
                    <MessageCircle size={18} className="text-gray-400 group-hover:text-emerald-400 transition-colors" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">WhatsApp</div>
                    <div className="text-xs text-gray-500">Chat with me</div>
                  </div>
                </a>

                <a
                  href={`mailto:${socialLinks.email}`}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-emerald-500/10 transition-colors">
                    <Mail size={18} className="text-gray-400 group-hover:text-emerald-400 transition-colors" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">Email</div>
                    <div className="text-xs text-gray-500">{socialLinks.email}</div>
                  </div>
                </a>
              </div>
            </div>

            {/* Quick Info */}
            <div className="p-6 rounded-2xl glass">
              <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">Quick Info</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Experience</span>
                  <span className="text-white font-medium">11+ years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Focus</span>
                  <span className="text-white font-medium">SaaS & AI</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Products</span>
                  <span className="text-white font-medium">14+ shipped</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Availability</span>
                  <span className="text-emerald-400 font-medium">Open to work</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
