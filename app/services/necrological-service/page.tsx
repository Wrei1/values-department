import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Necrological Services | Values Department Government',
  description: 'Pastoral and liturgical necrological services, pastoral visits, and coordination with funeral homes. Guidance for planning funerals and memorials with compassion and care.',
  keywords: ['necrological service', 'funeral service', 'pastoral care', 'funeral coordination', 'memorial service', 'funeral music'],
  openGraph: {
    title: 'Necrological Services | Values Department',
    description: 'We provide compassionate necrological and funeral services, pastoral visits, and practical coordination support for families.',
    type: 'website',
  },
};

export default function NecrologicalService() {
  const offerings = [
    'Funeral Mass or memorial service with chosen readings and prayers',
    'Pastoral visit and family counseling',
    'Coordination with funeral homes and cemeteries',
    'Music, choir, and lector arrangements',
    'Grief resources and follow-up support'
  ];

  const requirements = [
    {
      title: 'Basic Information',
      description: "Full name of the deceased, date of birth/death, and contact person for coordination"
    },
    {
      title: 'Location Details',
      description: 'Venue for the service (church, funeral home, graveside) and full address'
    },
    {
      title: 'Documentation',
      description: 'Death certificate and any relevant permits or cemetery paperwork'
    },
    {
      title: 'Preferences',
      description: 'Preferred readings, hymns, pallbearers, and any cultural or family customs'
    }
  ];

  const processSteps = [
    {
      number: 1,
      title: 'Notify the Office',
      description: "Contact our office with immediate details so we can begin pastoral support and scheduling.",
      duration: 'As soon as possible'
    },
    {
      number: 2,
      title: 'Pastoral Visit & Planning',
      description: 'A clergy member will visit (or meet virtually) to offer support, discuss the service format, and gather readings and music choices.',
      duration: '30-60 minutes'
    },
    {
      number: 3,
      title: 'Coordination with Providers',
      description: 'We coordinate with the funeral home, musicians, and cemetery to confirm logistics and permits.',
      duration: '1-3 business days'
    },
    {
      number: 4,
      title: 'Service & Support',
      description: 'We conduct the liturgy or memorial and provide onsite pastoral support for the family.',
      duration: 'Service time (varies)'
    },
    {
      number: 5,
      title: 'Follow-up Care',
      description: 'Post-service grief resources and optional counseling referrals are provided to family members.',
      duration: 'Ongoing'
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Necrological Services</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">Compassionate pastoral care and liturgical services for the deceased and their families. We assist with planning, coordination, and emotional support through every step.</p>
        </header>

        <section className="bg-white rounded-xl shadow-lg p-8 mb-12" aria-labelledby="overview-heading">
          <h2 id="overview-heading" className="text-3xl font-bold text-gray-900 mb-6">Overview</h2>
          <div className="prose prose-lg max-w-none text-gray-600">
            <p className="mb-4">Our ministry provides respectful, organized, and pastoral support for funerals, memorials, and related rites. We work closely with families and service providers to honor cultural and personal wishes while handling practical arrangements.</p>
            <p>If you need urgent assistance outside regular hours, please contact our emergency line or leave a message and we will respond promptly.</p>
          </div>
        </section>

        <section className="mb-12" aria-labelledby="offerings-heading">
          <h2 id="offerings-heading" className="text-3xl font-bold text-gray-900 mb-8 text-center">Services Offered</h2>
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
          <h2 className="text-3xl font-bold text-white mb-4">We're Here to Help</h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">If you'd like to arrange a necrological service, schedule a pastoral visit, or need urgent support, contact our office and we'll respond promptly.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="inline-block bg-white text-blue-600 font-semibold px-8 py-4 rounded-lg hover:bg-blue-50">Contact Office</Link>
            <Link href="/services" className="inline-block bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg hover:bg-blue-800">All Services</Link>
          </div>
        </section>
      </div>
    </main>
  );
}
