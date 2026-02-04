import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pre-Marriage Counseling Program | Values Department Government',
  description: 'Government pre-marriage counseling program for engaged couples. Comprehensive preparation covering communication, finances, family planning, and relationship skills.',
  keywords: [
    'pre-marriage counseling',
    'premarital counseling',
    'engagement counseling',
    'marriage preparation',
    'government pre-marriage program',
    'couples preparation',
    'marriage readiness',
    'premarital education',
    'engaged couples counseling',
    'marriage preparation course'
  ],
  openGraph: {
    title: 'Pre-Marriage Counseling Program | Values Department',
    description: 'Comprehensive pre-marriage counseling program for engaged couples preparing for a successful marriage.',
    type: 'website',
  },
};

export default function PreMarriageCounseling() {
  const eligibilityRequirements = [
    'Engaged couples planning to marry within the next 12 months',
    'Both partners must be willing to participate fully in all sessions',
    'Minimum age requirement of 18 years (or 16 with guardian consent)',
    'Commitment to attend all scheduled counseling sessions',
    'Open-mindedness to discuss personal and relationship topics'
  ];

  const counselingTopics = [
    {
      title: 'Communication Skills',
      description: 'Learn effective communication techniques, active listening, and conflict resolution strategies to build a strong foundation.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      )
    },
    {
      title: 'Financial Planning',
      description: 'Discuss budgeting, financial goals, debt management, and strategies for building financial security together.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: 'Family Values & Expectations',
      description: 'Align your values, discuss family traditions, parenting philosophies, and long-term life goals.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      title: 'Intimacy & Relationships',
      description: 'Explore emotional and physical intimacy, boundaries, and maintaining a healthy romantic connection.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    },
    {
      title: 'Conflict Management',
      description: 'Develop healthy approaches to disagreements, problem-solving techniques, and maintaining respect during conflicts.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      title: 'Life Transitions',
      description: 'Prepare for major life changes, career decisions, relocations, and adapting to married life together.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    }
  ];

  const processSteps = [
    {
      step: 1,
      title: 'Registration',
      description: 'Complete the online registration form or visit our office to enroll in the pre-marriage counseling program.'
    },
    {
      step: 2,
      title: 'Initial Assessment',
      description: 'Attend an individual assessment session where you\'ll discuss your relationship history and goals.'
    },
    {
      step: 3,
      title: 'Counseling Sessions',
      description: 'Participate in 6-8 structured counseling sessions covering essential topics over 3-4 weeks.'
    },
    {
      step: 4,
      title: 'Completion Certificate',
      description: 'Receive your official certificate of completion, required for marriage registration.'
    }
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Pre-Marriage Counseling
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Prepare for a successful marriage with professional guidance and comprehensive pre-marital education
          </p>
        </header>

        {/* Overview Section */}
        <section className="bg-white rounded-xl shadow-lg p-8 mb-12" aria-labelledby="overview-heading">
          <h2 id="overview-heading" className="text-3xl font-bold text-gray-900 mb-6">
            Program Overview
          </h2>
          <div className="prose prose-lg max-w-none text-gray-600 space-y-4">
            <p>
              Our pre-marriage counseling program is designed to help engaged couples build a strong foundation 
              for their future together. Through professional guidance and structured sessions, you'll develop 
              essential skills for communication, conflict resolution, and partnership.
            </p>
            <p>
              The program consists of 6-8 sessions conducted over 3-4 weeks, covering crucial topics that will 
              prepare you for married life. All sessions are led by licensed counselors with extensive experience 
              in relationship therapy and family dynamics.
            </p>
            <p className="font-semibold text-gray-900">
              Upon completion, couples receive an official certificate required for marriage registration 
              through the Values Department.
            </p>
          </div>
        </section>

        {/* Eligibility Requirements */}
        <section className="mb-12" aria-labelledby="eligibility-heading">
          <h2 id="eligibility-heading" className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Eligibility Requirements
          </h2>
          <div className="bg-white rounded-xl shadow-lg p-8">
            <ul className="space-y-4" role="list">
              {eligibilityRequirements.map((requirement, index) => (
                <li key={index} className="flex items-start">
                  <svg 
                    className="w-6 h-6 text-green-500 mr-4 mt-0.5 flex-shrink-0" 
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
                  <span className="text-lg text-gray-700">{requirement}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Counseling Topics */}
        <section className="mb-12" aria-labelledby="topics-heading">
          <h2 id="topics-heading" className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Topics Covered
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {counselingTopics.map((topic, index) => (
              <article
                key={index}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="text-blue-600 mb-4" aria-hidden="true">
                  {topic.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {topic.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {topic.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* Process Steps */}
        <section className="mb-12" aria-labelledby="process-heading">
          <h2 id="process-heading" className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Counseling Process
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((item) => (
              <div
                key={item.step}
                className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Schedule Information */}
        <section className="bg-white rounded-xl shadow-lg p-8 mb-12" aria-labelledby="schedule-heading">
          <h2 id="schedule-heading" className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Schedule Information
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-blue-600 mb-3">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Duration</h3>
              <p className="text-gray-600">6-8 sessions over 3-4 weeks</p>
            </div>
            <div>
              <div className="text-blue-600 mb-3">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Session Length</h3>
              <p className="text-gray-600">90 minutes per session</p>
            </div>
            <div>
              <div className="text-blue-600 mb-3">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Format</h3>
              <p className="text-gray-600">Couples sessions with licensed counselors</p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-blue-600 rounded-2xl shadow-xl p-8 sm:p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Start Your Journey Together
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Invest in your future with professional pre-marriage counseling. Contact us today to register 
            for our next available session.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-block bg-white text-blue-600 font-semibold px-8 py-4 rounded-lg hover:bg-blue-50 transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300"
              aria-label="Contact us to register for counseling"
            >
              Register Now
            </Link>
            <Link
              href="/marriage"
              className="inline-block bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg hover:bg-blue-800 transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300"
              aria-label="Learn about marriage services"
            >
              Marriage Services
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
