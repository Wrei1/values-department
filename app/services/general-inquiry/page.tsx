import Link from 'next/link';

export default function GeneralInquiry() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">General Inquiry</h1>
        <p className="text-lg text-gray-600 mb-6">General questions and requests. Placeholder page.</p>
        <Link href="/contact" className="text-blue-600 hover:underline">Contact Us</Link>
      </div>
    </main>
  );
}
