import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Login | Values Department Government Portal',
  description: 'Secure admin login portal for Values Department staff. Access the admin dashboard to manage inquiries and counseling services.',
  keywords: [
    'admin login',
    'values department admin',
    'government portal login',
    'admin dashboard',
    'staff portal',
    'secure login'
  ],
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
