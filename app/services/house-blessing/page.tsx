import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'House Blessing | Values Department Government',
  description: 'Traditional house blessing ceremonies with prayer, scripture readings, and sacred rites. Bring spiritual protection and peace to your home.',
  keywords: ['house blessing', 'home blessing', 'blessing ceremony', 'spiritual protection', 'sacred rites', 'prayer service'],
  openGraph: {
    title: 'House Blessing | Values Department',
    description: 'We offer traditional house blessing services to bring spiritual protection, peace, and blessings to your home.',
    type: 'website',
  },
};

export default function HouseBlessing() {
  const offerings = [
    'Traditional house blessing ceremony with prayers and scripture',
    'Use of holy water, incense, and sacred symbols',
    'Blessing of each room and common areas',
    'Family participation and personalized prayers',
    'Certificate of blessing provided'
  ];

  const requirements = [
    {
      title: 'Property Information',
      description: "Full address of the home to be blessed and property owner's name"
    },
    {
      title: 'Scheduling Details',
      description: 'Preferred date, time, and duration for the blessing ceremony'
    },
    {
      title: 'Contact Information',
      description: 'Primary contact person, phone number, and email for coordination'
    },
    {
      title: 'Special Requests',
      description: 'Any specific prayers, readings, or cultural considerations for the blessing'
    }
  ];

  const processSteps = [
    {
      number: 1,
      title: 'Contact Our Office',
      description: "Reach out to schedule your house blessing and provide basic information about your home and preferences.",
      duration: '1-2 business days'
    },
    {
      number: 2,
      title: 'Initial Consultation',
      description: 'A clergy member will discuss the ceremony details, answer questions, and confirm the blessing format.',
      duration: '15-30 minutes'
    },
    {
      number: 3,
      title: 'Blessing Ceremony',
      description: 'The priest conducts the traditional blessing rite, moving through each room with prayers and sacred elements.',
      duration: '30-60 minutes'
    },
    {
      number: 4,
      title: 'Certificate & Follow-up',
      description: 'Receive a certificate of blessing and optional follow-up prayer support for your home.',
      duration: 'Ongoing'
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">House Blessing</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">Bring spiritual protection and peace to your home through our traditional house blessing ceremonies. We perform sacred rites that sanctify your living space.</p>
        </header>

        <section className="bg-white rounded-xl shadow-lg p-8 mb-12" aria-labelledby="overview-heading">
          <h2 id="overview-heading" className="text-3xl font-bold text-gray-900 mb-6">Overview</h2>
          <div className="prose prose-lg max-w-none text-gray-600">
            <p className="mb-4">A house blessing is a sacred ceremony that invites God's presence and protection into your home. Our clergy perform traditional rites using holy water, incense, prayers, and scripture to bless each room and create a space of peace and spiritual safety.</p>
            <p>Whether you're moving into a new home, celebrating a special occasion, or seeking spiritual renewal, we provide compassionate and meaningful house blessing services.</p>
          </div>
        </section>

        <section className="mb-12" aria-labelledby="offerings-heading">
          <h2 id="offerings-heading" className="text-3xl font-bold text-gray-900 mb-8 text-center">Blessing Services</h2>
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
          <h2 className="text-3xl font-bold text-white mb-4">Bless Your Home Today</h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">Ready to bring spiritual blessing to your home? Contact our office to schedule your house blessing ceremony.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="inline-block bg-white text-blue-600 font-semibold px-8 py-4 rounded-lg hover:bg-blue-50">Schedule Blessing</Link>
            <Link href="/services" className="inline-block bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg hover:bg-blue-800">All Services</Link>
          </div>
        </section>
      </div>
    </main>
  );
}
