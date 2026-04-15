import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'House-to-House Visitation | Values Department Government',
  description: 'Personalized home visits for pastoral care, community support, and spiritual guidance directly at your home. Schedule a visitation from our clergy team today.',
  keywords: ['house-to-house visitation', 'pastoral visit', 'home visit', 'community outreach', 'spiritual support', 'pastoral care'],
  openGraph: {
    title: 'House-to-House Visitation | Values Department',
    description: 'We bring pastoral care and spiritual support to your home with compassionate house-to-house visits. Our team provides guidance, prayer, and community connection.',
    type: 'website',
  },
};

export default function HouseToHouseVisitation() {
  const offerings = [
    'Pastoral home visits for prayer and spiritual support',
    'Counseling and conversation with clergy members',
    'Community outreach for elderly and homebound individuals',
    'Guidance on sacraments, blessings, and family needs',
    'Referrals to community resources and support services'
  ];

  const requirements = [
    {
      title: 'Preferred Visit Details',
      description: 'Your preferred date, time, and brief reason for requesting a home visit.'
    },
    {
      title: 'Contact Information',
      description: 'Primary contact name, phone number, and email for scheduling and follow-up.'
    },
    {
      title: 'Home Location',
      description: 'Full address of the home or residence where the visit will take place.'
    },
    {
      title: 'Support Needs',
      description: 'Any specific spiritual, emotional, or practical support you would like during the visit.'
    }
  ];

  const processSteps = [
    {
      number: 1,
      title: 'Submit Your Request',
      description: 'Provide your home visit details and contact information so our team can review your needs.',
      duration: '1-2 business days'
    },
    {
      number: 2,
      title: 'Visit Coordination',
      description: 'A staff member will reach out to confirm scheduling and clarify how we can support you best.',
      duration: '1-2 business days'
    },
    {
      number: 3,
      title: 'Home Visitation',
      description: 'A clergy member visits your home to offer prayer, counsel, and spiritual care in a comfortable setting.',
      duration: '30-60 minutes'
    },
    {
      number: 4,
      title: 'Follow-Up Support',
      description: 'We provide ongoing encouragement, referrals, or additional visits as needed after the initial home visit.',
      duration: 'Ongoing'
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">House-to-House Visitation</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">Receive personalized pastoral care and community support in the comfort of your home. Our clergy visit homebound families, elderly members, and anyone who needs spiritual guidance without leaving their residence.</p>
        </header>

        <section className="bg-white rounded-xl shadow-lg p-8 mb-12" aria-labelledby="overview-heading">
          <h2 id="overview-heading" className="text-3xl font-bold text-gray-900 mb-6">Overview</h2>
          <div className="prose prose-lg max-w-none text-gray-600">
            <p className="mb-4">House-to-house visitation is designed to bring compassion and spiritual care directly to those who cannot easily visit our offices or parish. Our pastoral team offers prayer, conversation, and trusted support while respecting each household's needs and privacy.</p>
            <p>Whether you seek prayer, counseling, or simply a caring presence, our home visitation service ensures meaningful connection and pastoral care for every member of the community.</p>
          </div>
        </section>

        <section className="mb-12" aria-labelledby="offerings-heading">
          <h2 id="offerings-heading" className="text-3xl font-bold text-gray-900 mb-8 text-center">Visitation Services</h2>
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
          <h2 className="text-3xl font-bold text-white mb-4">Schedule a Home Visit</h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">If you or a loved one would benefit from a pastoral visit at home, reach out to our office and we will coordinate a compassionate in-home visit.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="inline-block bg-white text-blue-600 font-semibold px-8 py-4 rounded-lg hover:bg-blue-50">Request a Visit</Link>
            <Link href="/services" className="inline-block bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg hover:bg-blue-800">View All Services</Link>
          </div>
        </section>
      </div>
    </main>
  );
}
