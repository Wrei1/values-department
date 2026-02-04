import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/marriage', label: 'Marriage' },
    { href: '/pre-marriage', label: 'Pre-Marriage Counseling' },
    { href: '/contact', label: 'Contact' }
  ];

  return (
    <footer className="bg-gray-900 text-gray-300" role="contentinfo" aria-label="Site footer">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 grid gap-8 md:grid-cols-3">
          {/* Office Information */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Values Department</h3>
            <address className="text-sm leading-relaxed not-italic">
              <p className="mb-2">Government Administrative Building</p>
              <p className="mb-2">123 Main Street, Suite 400</p>
              <p className="mb-4">City, State 12345</p>
            </address>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Contact Us</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center">
                <svg 
                  className="mr-2 h-5 w-5 flex-shrink-0" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
                  />
                </svg>
                <a href="tel:+15551234567" className="transition-colors hover:text-white focus:outline-none focus:underline">
                  +1 (555) 123-4567
                </a>
              </div>
              <div className="flex items-center">
                <svg 
                  className="mr-2 h-5 w-5 flex-shrink-0" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                  />
                </svg>
                <a href="mailto:info@valuesdept.gov" className="transition-colors hover:text-white focus:outline-none focus:underline">
                  info@valuesdept.gov
                </a>
              </div>
              <div className="flex items-start">
                <svg 
                  className="mr-2 mt-0.5 h-5 w-5 flex-shrink-0" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
                  />
                </svg>
                <div>
                  <p>Monday - Friday</p>
                  <p>8:00 AM - 5:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm" role="list">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="inline-block transition-colors hover:text-white focus:outline-none focus:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col items-center justify-between text-sm md:flex-row">
            <p className="mb-4 md:mb-0">
              &copy; {currentYear} Values Department. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link href="#" className="transition-colors hover:text-white focus:outline-none focus:underline">
                Privacy Policy
              </Link>
              <Link href="#" className="transition-colors hover:text-white focus:outline-none focus:underline">
                Terms of Service
              </Link>
              <Link href="#" className="transition-colors hover:text-white focus:outline-none focus:underline">
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
