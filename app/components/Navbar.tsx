'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/marriage', label: 'Marriage' },
    { href: '/pre-marriage', label: 'Pre-Marriage Counseling' },
    { href: '/contact', label: 'Contact' },
  ];

  const isActive = (path: string) => pathname === path;

  // Handle Escape key to close mobile menu
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMenuOpen]);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Skip to main content link for keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-blue-600 focus:px-4 focus:py-2 focus:text-white focus:outline-none focus:ring-4 focus:ring-blue-300"
      >
        Skip to main content
      </a>
      <nav className="sticky top-0 z-50 bg-white shadow-md" role="navigation" aria-label="Main navigation">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 sm:h-18 items-center justify-between">
          {/* Logo/Brand */}
          <Link 
            href="/" 
            className="flex items-center space-x-2 rounded-md text-lg sm:text-xl font-bold text-blue-600 transition-colors hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 min-h-[44px]"
            aria-label="Values Department - Home"
          >
            <svg 
              className="w-7 h-7 sm:w-8 sm:h-8" 
              fill="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 18c-3.866 0-7-3.134-7-7s3.134-7 7-7 7 3.134 7 7-3.134 7-7 7zm-1-11h2v6h-2zm0 8h2v2h-2z"/>
            </svg>
            <span className="hidden sm:inline">Values Department</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden space-x-1 md:flex" role="list">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-md px-4 py-2 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  isActive(link.href)
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                }`}
                aria-current={isActive(link.href) ? 'page' : undefined}
                tabIndex={0}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            ref={menuButtonRef}
            onClick={handleMenuToggle}
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md p-2.5 text-gray-700 transition-colors hover:bg-blue-50 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 md:hidden"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-controls="mobile-menu"
          >
            {/* Animated Hamburger Icon */}
            <div className="relative h-6 w-6">
              <span className="sr-only">{isMenuOpen ? 'Close menu' : 'Open menu'}</span>
              <span
                className={`absolute left-0 top-0 block h-0.5 w-6 transform rounded-full bg-current transition-all duration-300 ease-in-out ${
                  isMenuOpen ? 'translate-y-2.5 rotate-45' : 'translate-y-0'
                }`}
                aria-hidden="true"
              />
              <span
                className={`absolute left-0 top-2.5 block h-0.5 w-6 transform rounded-full bg-current transition-all duration-300 ease-in-out ${
                  isMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}
                aria-hidden="true"
              />
              <span
                className={`absolute left-0 bottom-0 block h-0.5 w-6 transform rounded-full bg-current transition-all duration-300 ease-in-out ${
                  isMenuOpen ? '-translate-y-2.5 -rotate-45' : 'translate-y-0'
                }`}
                aria-hidden="true"
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu with Slide Animation */}
      <div
        className={`overflow-hidden border-t border-gray-200 bg-white transition-all duration-300 ease-in-out md:hidden ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
        id="mobile-menu"
        role="region"
        aria-label="Mobile navigation menu"
        aria-hidden={!isMenuOpen}
      >
        <nav className="space-y-1 px-4 pb-4 pt-2" role="list">
          {navLinks.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className={`block min-h-[44px] rounded-md px-4 py-3 text-base font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset ${
                isActive(link.href)
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600 active:bg-blue-100'
              }`}
              aria-current={isActive(link.href) ? 'page' : undefined}
              tabIndex={isMenuOpen ? 0 : -1}
              style={{
                transitionDelay: isMenuOpen ? `${index * 50}ms` : '0ms',
                transform: isMenuOpen ? 'translateX(0)' : 'translateX(-10px)',
                opacity: isMenuOpen ? 1 : 0,
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </nav>
    </>
  );
}
