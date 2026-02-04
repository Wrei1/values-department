import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Marriage Counseling Services | Values Department Government',
  description: 'Professional government marriage counseling services for married couples. Learn about requirements, process, and how to strengthen your marriage through expert guidance.',
  keywords: [
    'marriage counseling',
    'marriage services',
    'government marriage counseling',
    'couples therapy',
    'marriage guidance',
    'relationship counseling',
    'marriage requirements',
    'marriage documentation',
    'married couples counseling',
    'marriage support services'
  ],
  openGraph: {
    title: 'Marriage Counseling Services | Values Department',
    description: 'Professional guidance for married couples to strengthen relationships and improve communication.',
    type: 'website',
  },
};

export default function Marriage() {
  const requirements = [
    {
      title: 'Valid Identification',
      description: 'Both partners must present valid government-issued photo ID (passport, driver\'s license, or national ID card)'
    },
    {
      title: 'Age Requirements',
      description: 'Both parties must be of legal age (18 years or older) or have legal guardian consent if applicable'
    },
    {
      title: 'Legal Status Documentation',
      description: 'Proof of single status, or divorce/death certificate if previously married'
    },
    {
      title: 'Medical Certificate',
      description: 'Recent medical examination certificate (issued within the last 3 months)'
    },
    {
      title: 'Counseling Completion',
      description: 'Certificate of completion from pre-marriage counseling program (if required)'
    }
  ];

  const processSteps = [
    {
      number: 1,
      title: 'Initial Consultation',
      description: 'Schedule an appointment with our office to discuss requirements and begin the process. Bring preliminary documentation for review.',
      duration: '30-45 minutes'
    },
    {
      number: 2,
      title: 'Submit Documentation',
      description: 'Provide all required documents including identification, legal status certificates, and medical records.',
      duration: '1-2 business days'
    },
    {
      number: 3,
      title: 'Pre-Marriage Counseling',
      description: 'Complete mandatory counseling sessions covering communication, financial planning, and relationship building.',
      duration: '3-4 weeks'
    },
    {
      number: 4,
      title: 'Document Review & Approval',
      description: 'Our team reviews your submitted documents and counseling completion certificate for final approval.',
      duration: '3-5 business days'
    },
    {
      number: 5,
      title: 'Schedule Ceremony',
      description: 'Once approved, schedule your marriage ceremony date and receive your official marriage license.',
      duration: '1-2 weeks'
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Marriage Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Official marriage registration and counseling services provided by the Values Department. 
            We support couples in building strong, lasting partnerships through professional guidance and legal services.
          </p>
        </header>

        {/* Overview Section */}
        <section className="bg-white rounded-xl shadow-lg p-8 mb-12" aria-labelledby="overview-heading">
          <h2 id="overview-heading" className="text-3xl font-bold text-gray-900 mb-6">
            Overview
          </h2>
          <div className="prose prose-lg max-w-none text-gray-600">
            <p className="mb-4">
              The Values Department provides comprehensive marriage services including legal registration, 
              counseling support, and ongoing resources for married couples. Our mission is to strengthen 
              families and promote healthy relationships within our community.
            </p>
            <p>
              Whether you're planning your wedding or seeking support for your existing marriage, our 
              experienced team is here to guide you through every step of the process with professionalism 
              and care.
            </p>
          </div>
        </section>

        {/* Requirements Section */}
        <section className="mb-12" aria-labelledby="requirements-heading">
          <h2 id="requirements-heading" className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Required Documentation
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {requirements.map((req, index) => (
              <article
                key={index}
                className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-600 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-start mb-3">
                  <svg 
                    className="w-6 h-6 text-blue-600 mr-3 mt-1 flex-shrink-0" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {req.title}
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {req.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* Process Steps Section */}
        <section className="mb-12" aria-labelledby="process-heading">
          <h2 id="process-heading" className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Step-by-Step Process
          </h2>
          <ol className="space-y-6" role="list">
            {processSteps.map((step) => (
              <li
                key={step.number}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <article className="flex flex-col sm:flex-row">
                  {/* Step Number */}
                  <div className="bg-blue-600 text-white flex items-center justify-center sm:w-24 p-6 sm:p-0" aria-label={`Step ${step.number}`}>
                    <div className="text-center">
                      <div className="text-sm font-semibold uppercase tracking-wide mb-1">Step</div>
                      <div className="text-4xl font-bold">{step.number}</div>
                    </div>
                  </div>
                  
                  {/* Step Content */}
                  <div className="flex-1 p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 sm:mb-0">
                        {step.title}
                      </h3>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        <svg 
                          className="w-4 h-4 mr-1" 
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
                        {step.duration}
                      </span>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </article>
              </li>
            ))}
          </ol>
        </section>

        {/* Call to Action */}
        <section className="bg-blue-600 rounded-2xl shadow-xl p-8 sm:p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Our dedicated team is here to support you every step of the way. Schedule a consultation 
            to get started with your marriage registration process.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-block bg-white text-blue-600 font-semibold px-8 py-4 rounded-lg hover:bg-blue-50 transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300"
              aria-label="Contact us to schedule a consultation"
            >
              Schedule Consultation
            </Link>
            <Link
              href="/pre-marriage"
              className="inline-block bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg hover:bg-blue-800 transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300"
              aria-label="Learn about pre-marriage counseling"
            >
              Pre-Marriage Counseling
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
