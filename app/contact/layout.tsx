import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Values Department Government Services',
  description: 'Contact the Values Department for marriage counseling, pre-marriage counseling inquiries, and family support services. Submit your inquiry and our team will respond promptly.',
  keywords: [
    'contact values department',
    'counseling inquiry',
    'marriage counseling contact',
    'government services contact',
    'family services inquiry',
    'counseling appointment',
    'contact government counseling',
    'marriage services inquiry',
    'get help counseling'
  ],
  openGraph: {
    title: 'Contact Us | Values Department',
    description: 'Get in touch with our counseling services team for professional support and guidance.',
    type: 'website',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
