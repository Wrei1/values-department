'use client';

import { useState, useMemo, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface Inquiry {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  serviceType: string;
  message: string;
  status: 'pending' | 'approved' | 'rejected' | 'in-review' | 'completed';
  createdAt: Timestamp | null;
}

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [serviceTypeFilter, setServiceTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  // Fetch inquiries from Firestore with real-time updates
  useEffect(() => {
    setIsLoading(true);
    setError('');

    try {
      const q = query(
        collection(db, 'inquiries'),
        orderBy('createdAt', 'desc')
      );

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const inquiriesData: Inquiry[] = snapshot.docs.map(doc => ({
            id: doc.id,
            fullName: doc.data().fullName || '',
            email: doc.data().email || '',
            phone: doc.data().phone || '',
            serviceType: doc.data().serviceType || '',
            message: doc.data().message || '',
            status: doc.data().status || 'pending',
            createdAt: doc.data().createdAt || null,
          }));
          
          setInquiries(inquiriesData);
          setIsLoading(false);
        },
        (err) => {
          console.error('Error fetching inquiries:', err);
          setError('Failed to load inquiries. Please check your Firebase configuration.');
          setIsLoading(false);
        }
      );

      return () => unsubscribe();
    } catch (err) {
      console.error('Error setting up Firestore listener:', err);
      setError('Failed to connect to database. Please try again later.');
      setIsLoading(false);
    }
  }, []);

  const serviceTypes = ['Marriage Counseling', 'Pre-Marriage Counseling', 'Marriage Registration', 'General Inquiry', 'Other'];
  const statuses = ['pending', 'approved', 'rejected', 'in-review', 'completed'];

  // Filter inquiries based on selected filters
  const filteredInquiries = useMemo(() => {
    return inquiries.filter((inquiry) => {
      const matchesServiceType = serviceTypeFilter === 'all' || inquiry.serviceType === serviceTypeFilter;
      const matchesStatus = statusFilter === 'all' || inquiry.status === statusFilter;
      return matchesServiceType && matchesStatus;
    });
  }, [inquiries, serviceTypeFilter, statusFilter]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'in-review':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (timestamp: Timestamp | null) => {
    if (!timestamp) return 'N/A';
    
    try {
      const date = timestamp.toDate();
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return 'Invalid date';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Inquiry Management
          </h1>
          <p className="mt-2 text-base text-gray-600 sm:text-lg">
            View and manage all submitted inquiries and contact form submissions
          </p>
        </header>

        {/* Stats Summary */}
        <section className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-labelledby="stats-heading">
          <h2 id="stats-heading" className="sr-only">Inquiry Statistics</h2>
          <div className="rounded-lg bg-white p-4 sm:p-5 shadow" role="region" aria-label="Total inquiries count">
            <p className="text-sm font-medium text-gray-600">Total Inquiries</p>
            <p className="mt-1 text-2xl font-semibold text-gray-900" aria-live="polite">
              {isLoading ? '...' : inquiries.length}
            </p>
          </div>
          <div className="rounded-lg bg-white p-4 sm:p-5 shadow" role="region" aria-label="Pending inquiries count">
            <p className="text-sm font-medium text-gray-600">Pending</p>
            <p className="mt-1 text-2xl font-semibold text-yellow-700" aria-live="polite">
              {isLoading ? '...' : inquiries.filter(i => i.status === 'pending').length}
            </p>
          </div>
          <div className="rounded-lg bg-white p-4 sm:p-5 shadow" role="region" aria-label="Approved inquiries count">
            <p className="text-sm font-medium text-gray-600">Approved</p>
            <p className="mt-1 text-2xl font-semibold text-green-700" aria-live="polite">
              {isLoading ? '...' : inquiries.filter(i => i.status === 'approved').length}
            </p>
          </div>
          <div className="rounded-lg bg-white p-4 sm:p-5 shadow" role="region" aria-label="In review inquiries count">
            <p className="text-sm font-medium text-gray-600">In Review</p>
            <p className="mt-1 text-2xl font-semibold text-blue-700" aria-live="polite">
              {isLoading ? '...' : inquiries.filter(i => i.status === 'in-review').length}
            </p>
          </div>
        </section>

        {/* Error Message */}
        {error && (
          <div className="mb-6 rounded-lg bg-red-50 border-l-4 border-red-500 p-4" role="alert">
            <div className="flex items-center">
              <svg className="h-5 w-5 text-red-400 mr-3" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="text-sm font-medium text-red-800">{error}</p>
            </div>
          </div>
        )}

        {/* Filters */}
        <section className="mb-6 rounded-lg bg-white p-5 sm:p-6 shadow" aria-labelledby="filters-heading">
          <h2 id="filters-heading" className="mb-4 text-base font-semibold text-gray-900 sm:text-lg">Filters</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Service Type Filter */}
            <div>
              <label htmlFor="service-type-filter" className="block text-sm font-medium text-gray-700 mb-2">
                Service Type
              </label>
              <select
                id="service-type-filter"
                value={serviceTypeFilter}
                onChange={(e) => setServiceTypeFilter(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 px-3 py-3 text-base shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[48px]"
                aria-label="Filter inquiries by service type"
              >
                <option value="all">All Service Types</option>
                {serviceTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                id="status-filter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 px-3 py-3 text-base shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[48px]"
                aria-label="Filter inquiries by status"
              >
                <option value="all">All Statuses</option>
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Active Filters Display */}
          {(serviceTypeFilter !== 'all' || statusFilter !== 'all') && (
            <div className="mt-4 flex flex-wrap items-center gap-2" role="region" aria-label="Active filters">
              <span className="text-sm font-medium text-gray-700">Active filters:</span>
              {serviceTypeFilter !== 'all' && (
                <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1.5 text-sm font-medium text-blue-800">
                  {serviceTypeFilter}
                  <button
                    onClick={() => setServiceTypeFilter('all')}
                    className="ml-2 inline-flex h-5 w-5 min-h-[24px] min-w-[24px] flex-shrink-0 items-center justify-center rounded-full text-blue-600 hover:bg-blue-200 hover:text-blue-700 focus:bg-blue-500 focus:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-1"
                    aria-label={`Remove ${serviceTypeFilter} filter`}
                  >
                    <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                      <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
                    </svg>
                  </button>
                </span>
              )}
              {statusFilter !== 'all' && (
                <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1.5 text-sm font-medium text-green-800">
                  {statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1).replace('-', ' ')}
                  <button
                    onClick={() => setStatusFilter('all')}
                    className="ml-2 inline-flex h-5 w-5 min-h-[24px] min-w-[24px] flex-shrink-0 items-center justify-center rounded-full text-green-600 hover:bg-green-200 hover:text-green-700 focus:bg-green-500 focus:text-white focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-1"
                    aria-label={`Remove ${statusFilter} filter`}
                  >
                    <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                      <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
                    </svg>
                  </button>
                </span>
              )}
              <button
                onClick={() => {
                  setServiceTypeFilter('all');
                  setStatusFilter('all');
                }}
                className="min-h-[32px] px-2 py-1 text-sm font-medium text-blue-600 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
                aria-label="Clear all filters"
              >
                Clear all
              </button>
            </div>
          )}

          <p className="mt-3 text-sm text-gray-600" aria-live="polite" aria-atomic="true">
            Showing {filteredInquiries.length} of {inquiries.length} inquiries
          </p>
        </section>

        {/* Inquiries Table */}
        <div className="overflow-hidden rounded-lg bg-white shadow">
          {/* Desktop Table */}
          <div className="hidden overflow-x-auto lg:block">
            <table className="min-w-full divide-y divide-gray-200" role="table" aria-label="Inquiries table">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Service Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Date Submitted
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {isLoading ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-sm text-gray-500">
                      <div className="flex items-center justify-center">
                        <svg className="animate-spin h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                        </svg>
                        <span className="ml-3">Loading inquiries...</span>
                      </div>
                    </td>
                  </tr>
                ) : filteredInquiries.length > 0 ? (
                  filteredInquiries.map((inquiry) => (
                    <tr key={inquiry.id} className="transition-colors hover:bg-gray-50">
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                        #{inquiry.id.substring(0, 8)}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                        {inquiry.fullName}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        {inquiry.email}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        {inquiry.serviceType}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        {formatDate(inquiry.createdAt)}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm">
                        <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${getStatusColor(inquiry.status)}`}>
                          {inquiry.status.replace('-', ' ')}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                        <button
                          onClick={() => setSelectedInquiry(inquiry)}
                          className="min-h-[32px] px-3 py-1.5 text-blue-600 transition-colors hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 rounded-md font-medium"
                          aria-label={`View details for inquiry from ${inquiry.fullName}`}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-sm text-gray-500">
                      No inquiries found matching the selected filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile/Tablet Cards */}
          <div className="lg:hidden">
            {isLoading ? (
              <div className="p-8 text-center text-sm text-gray-500">
                <div className="flex items-center justify-center">
                  <svg className="animate-spin h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                  <span className="ml-3">Loading inquiries...</span>
                </div>
              </div>
            ) : filteredInquiries.length > 0 ? (
              filteredInquiries.map((inquiry) => (
                <div
                  key={inquiry.id}
                  className="border-b border-gray-200 p-4 last:border-b-0"
                  role="article"
                  aria-label={`Inquiry from ${inquiry.fullName}`}
                >
                  <div className="mb-3 flex items-start justify-between">
                    <div>
                      <h3 className="text-base font-medium text-gray-900">{inquiry.fullName}</h3>
                      <p className="text-xs text-gray-500">ID: #{inquiry.id.substring(0, 8)}</p>
                    </div>
                    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${getStatusColor(inquiry.status)}`}>
                      {inquiry.status.replace('-', ' ')}
                    </span>
                  </div>
                  <dl className="space-y-2 text-sm">
                    <div>
                      <dt className="inline font-medium text-gray-700">Email: </dt>
                      <dd className="inline text-gray-600">{inquiry.email}</dd>
                    </div>
                    <div>
                      <dt className="inline font-medium text-gray-700">Service: </dt>
                      <dd className="inline text-gray-600">{inquiry.serviceType}</dd>
                    </div>
                    <div>
                      <dt className="inline font-medium text-gray-700">Submitted: </dt>
                      <dd className="inline text-gray-600">{formatDate(inquiry.createdAt)}</dd>
                    </div>
                  </dl>
                  <button
                    onClick={() => setSelectedInquiry(inquiry)}
                    className="mt-3 min-h-[44px] inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 transition-colors hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
                    aria-label={`View full details for inquiry from ${inquiry.fullName}`}
                  >
                    View Details →
                  </button>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-sm text-gray-500">
                No inquiries found matching the selected filters.
              </div>
            )}
          </div>
        </div>

        {/* Detail Modal/Panel */}
        {selectedInquiry && (
          <div
            className="fixed inset-0 z-50 overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="inquiry-detail-title"
          >
            <div className="flex min-h-screen items-center justify-center p-4">
              {/* Overlay */}
              <div
                className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                onClick={() => setSelectedInquiry(null)}
                aria-hidden="true"
              />
              
              {/* Modal */}
              <div className="relative z-50 w-full max-w-2xl rounded-lg bg-white shadow-xl">
                <div className="border-b border-gray-200 px-6 py-4">
                  <div className="flex items-start justify-between">
                    <h2 id="inquiry-detail-title" className="text-xl font-semibold text-gray-900">
                      Inquiry Details
                    </h2>
                    <button
                      onClick={() => setSelectedInquiry(null)}
                      className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-md text-gray-500 transition-colors hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      aria-label="Close inquiry details modal"
                    >
                      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                <div className="px-6 py-4">
                  <dl className="space-y-4">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">ID</dt>
                      <dd className="mt-1 text-sm text-gray-900">#{selectedInquiry.id}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Name</dt>
                      <dd className="mt-1 text-sm text-gray-900">{selectedInquiry.fullName}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Email</dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        <a href={`mailto:${selectedInquiry.email}`} className="text-blue-600 hover:text-blue-500">
                          {selectedInquiry.email}
                        </a>
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Phone</dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        <a href={`tel:${selectedInquiry.phone}`} className="text-blue-600 hover:text-blue-500">
                          {selectedInquiry.phone}
                        </a>
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Service Type</dt>
                      <dd className="mt-1 text-sm text-gray-900">{selectedInquiry.serviceType}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Date Submitted</dt>
                      <dd className="mt-1 text-sm text-gray-900">{formatDate(selectedInquiry.createdAt)}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Status</dt>
                      <dd className="mt-1">
                        <span className={`inline-flex rounded-full px-3 py-1 text-sm font-medium capitalize ${getStatusColor(selectedInquiry.status)}`}>
                          {selectedInquiry.status.replace('-', ' ')}
                        </span>
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Message</dt>
                      <dd className="mt-1 text-sm leading-relaxed text-gray-900">{selectedInquiry.message}</dd>
                    </div>
                  </dl>
                </div>
                
                <div className="border-t border-gray-200 px-6 py-4">
                  <div className="flex flex-col sm:flex-row justify-end gap-3">
                    <button
                      onClick={() => setSelectedInquiry(null)}
                      className="min-h-[48px] w-full sm:w-auto rounded-md bg-white px-5 py-3 text-base font-medium text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      aria-label="Close inquiry details"
                    >
                      Close
                    </button>
                    <button 
                      className="min-h-[48px] w-full sm:w-auto rounded-md bg-blue-600 px-5 py-3 text-base font-medium text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      aria-label="Update inquiry status"
                    >
                      Update Status
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
