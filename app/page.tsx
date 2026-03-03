import Link from 'next/link';
import Image from 'next/image';
import prayerforthesick from './Images/prayerforthesick.png';
import CivilWedLogo from './Images/CivilWedLogo.png';
import NecrologicalLogo from './Images/NecrologicalLogo.png';
import HouseBlessingLogo from './Images/houseblessinglogo.png';
import HouseToHouseLogo from './Images/House-to-House Visitation logo.png';
import DefaultLogo from './Images/Logo.jpg';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Values Department | Government Marriage & Family Counseling Services',
  description: 'Official government Values Department providing marriage counseling, wedding services, and community support. Strengthen families and communities through expert guidance.',
  keywords: [
    'values department',
    'government counseling services',
    'marriage counseling',
    'wedding services',
    'civil wedding',
    'private wedding',
    'house blessing',
    'prayer for the sick',
    'necrological service',
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
  const services = [
    {
      title: 'Civil Wedding',
      description: 'Clear guidance and support for civil wedding requirements, scheduling, and certificates.'
    },

    {
      title: 'Necrological Service',
      description: 'Compassionate support and coordination for families during times of loss.'
    },
    {
      title: 'House blessing',
      description: 'Arrange house blessing services with scheduling support and preparation guidance.'
    },
    {
      title: 'House to house visitation',
      description: 'Community visitation and outreach support for counseling and family guidance.'
    },
    {
      title: 'Prayer for the sick',
      description: 'Request prayer and compassionate support with scheduling and follow-up.'
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-20">
        {/* Hero Section */}
        <section className="mb-12 text-center sm:mb-16 lg:mb-20" aria-labelledby="hero-heading">
          <h1 id="hero-heading" className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:mb-6 sm:text-4xl md:text-5xl lg:text-6xl">
            Municipal Values Formation and Chaplaincy
          </h1>
          <p className="mx-auto max-w-3xl px-2 text-base leading-relaxed text-gray-600 sm:px-0 sm:text-lg md:text-xl lg:text-2xl">
            <strong>MISSION STATEMENT</strong> <br />
            
The mission of the Municipal Values Formation and Chaplaincy Service Unit is to foster a culture of integrity, compassion, and service among local government employees and the community. Through spiritual guidance, moral development, and transformative programs, we aim to promote ethical conduct, strengthen community ties, and support the holistic well-being of Individuals, ensuring that they live out values of respect, empathy, and accountability in both personal and professional spheres. <br /> <br />
          </p>
           <p className="mx-auto max-w-3xl px-2 text-base leading-relaxed text-gray-600 sm:px-0 sm:text-lg md:text-xl lg:text-2xl">

            
<strong>VISION STATEMENT</strong><br /> 
The vision of the Municipal Values Formation and Chaplaincy Service Unit is to create a transformative environment where local government employees and the community are empowered by strong moral values, spiritual growth, and a commitment to service, fostering a culture of integrity, compassion, and social responsibility for the greater good of society.
          </p>
        </section>

        {/* Services Section */}
        <section className="mb-12 sm:mb-16 lg:mb-20" aria-labelledby="services-heading">
          <h2 id="services-heading" className="mb-8 text-center text-2xl font-bold tracking-tight text-gray-900 sm:mb-10 sm:text-3xl lg:text-4xl">
            Our Services
          </h2>
          <div className="mx-auto grid max-w-6xl gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const imgMap: Record<string, any> = {
                'Civil Wedding': CivilWedLogo,
                'Necrological Service': NecrologicalLogo,
                'House blessing': HouseBlessingLogo,
                'House to house visitation': HouseToHouseLogo,
                'Prayer for the sick': prayerforthesick,
              };
              const imgSrc = imgMap[service.title] ?? DefaultLogo;

              const href = service.title === 'Civil Wedding'
                ? '/marriage'
                : service.title === 'Necrological Service'
                ? '/services/necrological-service'
                : service.title === 'House blessing'
                ? '/services/house-blessing'
                : service.title === 'House to house visitation'
                ? '/services/house-to-house-visitation'
                : service.title === 'Prayer for the sick'
                ? '/services/prayer-for-the-sick'
                : '/services';

              return (
                <Link key={service.title} href={href} className="rounded-xl bg-white p-0 shadow-lg transition-shadow duration-300 hover:shadow-xl block">
                  <div className="flex flex-col items-stretch">
                    <div className="relative w-full h-44 flex items-center justify-center rounded-t-xl bg-white">
                      <Image
                        src={imgSrc}
                        alt={`${service.title} logo`}
                        fill
                        className="object-contain p-6"
                      />
                    </div>

                    <div className="w-full p-6 flex flex-col justify-center text-center">
                      <h3 className="mb-3 text-lg font-bold text-gray-900 sm:mb-4 sm:text-xl lg:text-2xl">
                        {service.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-gray-600 sm:text-base">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
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
