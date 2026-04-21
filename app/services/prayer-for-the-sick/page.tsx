import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Prayer for the Sick | Values Department Government',
  description: 'Compassionate prayer services and pastoral visits for the sick and their families. Spiritual care and support during times of illness and health challenges.',
  keywords: ['prayer for the sick', 'pastoral visit', 'prayer request', 'sick ministry', 'spiritual care', 'pastoral care'],
  openGraph: {
    title: 'Prayer for the Sick | Values Department',
    description: 'We offer compassionate prayer services and pastoral support for those facing illness and their loved ones.',
    type: 'website',
  },
};

export default function PrayerForTheSick() {
  const offerings = [
    'Personal pastoral prayer and spiritual guidance for the sick',
    'Hospital and home visits for prayer service',
    'Prayer requests submitted and intercessory prayer support',
    'Family counseling and emotional support during illness',
    'Arranged anointing of the sick and communion services'
  ];

  const requirements = [
    {
      title: 'Patient Information',
      description: "Full name of the person, age, and nature of illness or health concern"
    },
    {
      title: 'Location Details',
      description: 'Hospital name and room number, or home address if receiving home-based prayer'
    },
    {
      title: 'Contact Information',
      description: 'Primary contact person, phone number, and best time to reach them'
    },
    {
      title: 'Special Requests',
      description: 'Any specific prayers, religious preferences, or family wishes for spiritual care'
    }
  ];

  const processSteps = [
    {
      number: 1,
      title: 'Submit Prayer Request',
      description: "Contact us with details about your loved one's condition and prayer needs. We will document everything with compassion.",
      duration: '1-2 business days'
    },
    {
      number: 2,
      title: 'Initial Pastoral Response',
      description: 'A clergy member will reach out to the family to understand the situation deeply and offer immediate spiritual support.',
      duration: '15-30 minutes'
    },
    {
      number: 3,
      title: 'Pastoral Visit & Prayer',
      description: 'We visit the patient to offer prayer, sacraments if desired, and provide comfort and hope during their illness.',
      duration: '30-60 minutes'
    },
    {
      number: 4,
      title: 'Ongoing Intercession',
      description: 'We maintain prayer support and may arrange follow-up visits or additional sacraments as the patient\'s condition changes.',
      duration: 'Ongoing support'
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Prayer for the Sick</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">During times of illness and health challenges, our pastoral team offers compassionate prayer, spiritual guidance, and support to the sick and their families.</p>
        </header>

        <section className="bg-white rounded-xl shadow-lg p-8 mb-12" aria-labelledby="overview-heading">
          <h2 id="overview-heading" className="text-3xl font-bold text-gray-900 mb-6">Overview</h2>
          <div className="prose prose-lg max-w-none text-gray-600">
            <p className="mb-4">When someone is facing illness or hospitalization, spiritual care becomes an important source of comfort and hope. Our prayer ministry provides personal pastoral visits, intercessory prayer, and the administration of sacraments such as the anointing of the sick.</p>
            <p>Whether your loved one is in a hospital, nursing facility, or at home, we respond with compassion and dedicate our prayers to their healing and spiritual well-being.</p>
          </div>
        </section>

        <section className="mb-12" aria-labelledby="offerings-heading">
          <h2 id="offerings-heading" className="text-3xl font-bold text-gray-900 mb-8 text-center">Prayer Services</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {offerings.map((item, i) => (
              <article key={i} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-600 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-start mb-3">
                  <svg className="w-6 h-6 text-blue-600 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd" />
                  </svg>
                  <h3 className="text-lg font-semibold text-gray-900">{item}</h3>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-12" aria-labelledby="requirements-heading">
          <h2 id="requirements-heading" className="text-3xl font-bold text-gray-900 mb-8 text-center">Information to Prepare</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {requirements.map((req, idx) => (
              <article key={idx} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{req.title}</h3>
                <p className="text-gray-600">{req.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-12" aria-labelledby="process-heading">
          <h2 id="process-heading" className="text-3xl font-bold text-gray-900 mb-8 text-center">How the Process Works</h2>
          <ol className="space-y-6" role="list">
            {processSteps.map((step) => (
              <li key={step.number} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <article className="flex flex-col sm:flex-row">
                  <div className="bg-blue-600 text-white flex items-center justify-center sm:w-24 p-6 sm:p-0" aria-label={`Step ${step.number}`}>
                    <div className="text-center">
                      <div className="text-sm font-semibold uppercase tracking-wide mb-1">Step</div>
                      <div className="text-4xl font-bold">{step.number}</div>
                    </div>
                  </div>
                  <div className="flex-1 p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 sm:mb-0">{step.title}</h3>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        {step.duration}
                      </span>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  </div>
                </article>
              </li>
            ))}
          </ol>
        </section>

        <section className="bg-blue-600 rounded-2xl shadow-xl p-8 sm:p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Reach Out for Prayer Support</h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">If you or a loved one are facing illness and need spiritual comfort and prayer, contact us today. Our pastoral team is ready to serve.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="inline-block bg-white text-blue-600 font-semibold px-8 py-4 rounded-lg hover:bg-blue-50">Request Prayer</Link>
            <Link href="/services" className="inline-block bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg hover:bg-blue-800">All Services</Link>
          </div>
        </section>
      </div>
    </main>
  );
}
