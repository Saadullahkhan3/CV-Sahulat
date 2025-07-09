"use client";

import { Heart, Code, Linkedin, Github, Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:contact@example.com', label: 'Email' }
  ];

  return (
    <footer className="py-16 px-4 border-t border-white/10 bg-gradient-to-t from-slate-900 to-transparent">
      <div className="container mx-auto">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
              CV Sahulat
            </h3>
            <p className="text-slate-400 leading-relaxed">
              Professional CV solutions that help you stand out in your career journey. 
              Create impressive resumes with modern templates and expert guidance.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <div className="space-y-2">
              {['Services', 'Templates', 'About', 'Contact'].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="block text-slate-400 hover:text-cyan-400 transition-colors duration-300"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Get in Touch</h4>
            <div className="space-y-2 text-slate-400">
              <p>Ready to elevate your career?</p>
              <p>Let's create something amazing together.</p>
              <div className="flex gap-4 pt-2">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-white/5 hover:bg-white/10 rounded-lg flex items-center justify-center text-slate-400 hover:text-cyan-400 transition-all duration-300 hover:scale-110"
                      aria-label={social.label}
                    >
                      <Icon size={18} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div className="text-slate-400 text-center md:text-left">
              <p>© {currentYear} CV Sahulat. All rights reserved.</p>
            </div>

            {/* Powered by */}
            <div className="flex items-center gap-2 text-slate-400">
              <span>Powered by</span>
              <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                SUK
              </span>
              <Heart className="w-4 h-4 text-red-400 animate-pulse" />
            </div>

            {/* Built with */}
            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <Code size={16} />
              <span>Built with Next.js & Tailwind CSS</span>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
      </div>
    </footer>
  );
}