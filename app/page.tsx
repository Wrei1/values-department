import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Values Department | Government Marriage & Family Counseling Services',
  description: 'Official government Values Department providing professional marriage counseling, pre-marriage counseling, and family support services. Strengthen families and communities through expert guidance.',
  keywords: [
    'values department',
    'government counseling services',
    'marriage counseling',
    'pre-marriage counseling',
    'family services',
    'relationship counseling',
    'government family support',
    'marriage guidance',
    'family counseling services',
    'official marriage services'
  ],
  openGraph: {
    title: 'Values Department | Government Marriage & Family Counseling Services',
    description: 'Strengthening families and communities through professional counseling and support services.',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-20">
        {/* Hero Section */}
        <section className="mb-12 text-center sm:mb-16 lg:mb-20" aria-labelledby="hero-heading">
          <h1 id="hero-heading" className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:mb-6 sm:text-4xl md:text-5xl lg:text-6xl">
            Values Department
          </h1>
          <p className="mx-auto max-w-3xl px-2 text-base leading-relaxed text-gray-600 sm:px-0 sm:text-lg md:text-xl lg:text-2xl">
            Strengthening families and communities through professional counseling and support services
          </p>
        </section>

        {/* Services Section */}
        <section className="mb-12 sm:mb-16 lg:mb-20" aria-labelledby="services-heading">
          <h2 id="services-heading" className="mb-8 text-center text-2xl font-bold tracking-tight text-gray-900 sm:mb-10 sm:text-3xl lg:text-4xl">
            Our Services
          </h2>
          <div className="mx-auto grid max-w-5xl gap-5 sm:gap-6 md:grid-cols-2 md:gap-8">
            {/* Marriage Counseling */}
            <article className="rounded-xl bg-white p-5 shadow-lg transition-shadow duration-300 hover:shadow-xl sm:p-6 lg:p-8">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 sm:mb-6 sm:h-16 sm:w-16">
                <svg 
                  className="w-7 h-7 sm:w-8 sm:h-8 text-white" 
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
              </div>
              <h3 className="mb-3 text-center text-lg font-bold text-gray-900 sm:mb-4 sm:text-xl lg:text-2xl">
                Marriage Counseling
              </h3>
              <p className="text-center text-sm leading-relaxed text-gray-600 sm:text-base">
                Professional support for couples seeking to strengthen their relationship, resolve conflicts, and build a lasting partnership
              </p>
            </article>

            {/* Pre-Marriage Counseling */}
            <article className="rounded-xl bg-white p-5 shadow-lg transition-shadow duration-300 hover:shadow-xl sm:p-6 lg:p-8">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 sm:mb-6 sm:h-16 sm:w-16">
                <svg 
                  className="w-7 h-7 sm:w-8 sm:h-8 text-white" 
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
              </div>
              <h3 className="mb-3 text-center text-lg font-bold text-gray-900 sm:mb-4 sm:text-xl lg:text-2xl">
                Pre-Marriage Counseling
              </h3>
              <p className="text-center text-sm leading-relaxed text-gray-600 sm:text-base">
                Prepare for a successful marriage with guidance on communication, expectations, and building a strong foundation together
              </p>
            </article>
          </div>
        </section>

        {/* Call to Action */}
        <section className="mx-auto max-w-4xl rounded-2xl bg-blue-600 p-6 text-center shadow-2xl sm:p-8 lg:p-12" aria-labelledby="cta-heading">
          <h2 id="cta-heading" className="mb-3 text-xl font-bold text-white sm:mb-4 sm:text-2xl lg:text-3xl">
            Ready to Get Started?
          </h2>
          <p className="mx-auto mb-6 max-w-2xl text-sm leading-relaxed text-blue-100 sm:mb-8 sm:text-base lg:text-lg">
            Our experienced counselors are here to help. Reach out today to schedule a consultation or learn more about our services.
          </p>
          <Link 
            href="/contact" 
            className="inline-block min-h-[44px] rounded-lg bg-white px-6 py-3 text-sm font-semibold text-blue-600 transition-colors duration-200 hover:bg-blue-50 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-offset-2 focus:ring-offset-blue-600 sm:px-8 sm:text-base lg:py-4 lg:text-lg"
            aria-label="Contact us to schedule a consultation"
          >
            Contact Us
          </Link>
        </section>
      </div>
    </main>
  )
}
