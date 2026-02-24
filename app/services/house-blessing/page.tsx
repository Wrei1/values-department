import Link from 'next/link';

export default function HouseBlessing() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">House Blessing</h1>
        <p className="text-lg text-gray-600 mb-6">Arrange a house blessing with our team. Placeholder page — content coming soon.</p>
        <Link href="/services" className="text-blue-600 hover:underline">Back to Services</Link>
      </div>
    </main>
  );
}
