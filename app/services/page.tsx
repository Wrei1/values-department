import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Services | Values Department Government Counseling',
  description: 'Explore our government counseling services including marriage counseling and pre-marriage counseling programs. Professional guidance for couples and families.',
  keywords: [
    'counseling services',
    'marriage counseling services',
    'pre-marriage counseling',
    'government counseling programs',
    'family support services',
    'relationship guidance',
    'couples counseling',
    'marriage preparation',
    'family counseling'
  ],
  openGraph: {
    title: 'Our Services | Values Department',
    description: 'Professional marriage and pre-marriage counseling services provided by the Values Department.',
    type: 'website',
  },
};

export default function Services() {
  const services = [
    {
      title: 'Marriage Counseling',
      description: 'Professional guidance for married couples to strengthen their relationship, improve communication, and work through challenges together. Our experienced counselors provide a safe, confidential space for healing and growth.',
      href: '/marriage',
      icon: (
        <svg 
          className="w-12 h-12 text-blue-600" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
          />
        </svg>
      ),
      features: [
        'Conflict resolution strategies',
        'Communication skills development',
        'Trust rebuilding exercises',
        'Long-term relationship planning'
      ]
    },
    {
      title: 'Pre-Marriage Counseling',
      description: 'Prepare for a successful marriage with comprehensive pre-marital guidance. Learn essential skills for building a strong foundation, understanding expectations, and navigating life together as partners.',
      href: '/pre-marriage',
      icon: (
        <svg 
          className="w-12 h-12 text-blue-600" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" 
          />
        </svg>
      ),
      features: [
        'Relationship assessment',
        'Financial planning discussions',
        'Family values alignment',
        'Future goal setting'
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <header className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Our Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive counseling services designed to support and strengthen relationships at every stage
          </p>
        </header>

        {/* Services Grid */}
        <section aria-labelledby="services-list">
          <h2 id="services-list" className="sr-only">Available Counseling Services</h2>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
          {services.map((service) => (
            <article
              key={service.href}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="p-8">
                {/* Icon */}
                <div className="flex items-center justify-center w-20 h-20 bg-blue-50 rounded-full mb-6" aria-hidden="true">
                  {service.icon}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features List */}
                <h4 className="sr-only">Key Features</h4>
                <ul className="space-y-3 mb-6" role="list">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg 
                        className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path 
                          fillRule="evenodd" 
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                          clipRule="evenodd" 
                        />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Learn More Link */}
                <Link
                  href={service.href}
                  className="inline-flex items-center justify-center w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300"
                  aria-label={`Learn more about ${service.title}`}
                >
                  Learn More
                  <svg 
                    className="w-5 h-5 ml-2" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M17 8l4 4m0 0l-4 4m4-4H3" 
                    />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>
        </section>

        {/* Call to Action */}
        <div className="bg-blue-600 rounded-2xl shadow-xl p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Need Help Choosing?
          </h2>
          <p className="text-blue-100 text-lg mb-6 max-w-2xl mx-auto">
            Our team is here to help you find the right service for your needs. Contact us for a free consultation.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300"
            aria-label="Contact us for help choosing a service"
          >
            Contact Us Today
          </Link>
        </div>
      </div>
    </main>
  );
}
