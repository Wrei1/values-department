'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FirebaseError } from 'firebase/app';
import { collection, query, orderBy, onSnapshot, Timestamp, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';

interface Inquiry {
  id: string;
  inquiryNumber?: number;
  fullName: string;
  email: string;
  phone: string;
  serviceType: string;
  status: 'pending' | 'approved' | 'rejected' | 'in-review' | 'completed';
  createdAt: Timestamp | null;
  message: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const formatFirestoreError = (err: unknown) => {
    if (err instanceof FirebaseError) {
      const code = err.code ? ` (${err.code})` : '';
      return `${err.message}${code}`.trim();
    }

    if (err instanceof Error) {
      return err.message;
    }

    return 'Unknown error.';
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const isAuthed = !!user;
      setIsAuthenticated(isAuthed);
      setAuthChecked(true);

      if (!isAuthed) {
        setError('Please sign in to view inquiries.');
        setIsLoading(false);
        router.push('/admin/login');
      }
    });

    return () => unsubscribe();
  }, [router]);

  // Fetch inquiries from Firestore with real-time updates
  useEffect(() => {
    if (!authChecked) return;
    if (!isAuthenticated) return;

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
            inquiryNumber: typeof doc.data().inquiryNumber === 'number' ? doc.data().inquiryNumber : undefined,
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
          const details = formatFirestoreError(err);
          setError(`Failed to load inquiries. ${details}`);
          setIsLoading(false);
        }
      );

      return () => unsubscribe();
    } catch (err) {
      console.error('Error setting up Firestore listener:', err);
      const details = formatFirestoreError(err);
      setError(`Failed to connect to database. ${details}`);
      setIsLoading(false);
    }
  }, [authChecked, isAuthenticated]);

  const totalSubmissions = inquiries.length;
  const pendingRequests = inquiries.filter(i => i.status === 'pending').length;
  const approvedRequests = inquiries.filter(i => i.status === 'approved').length;
  const rejectedRequests = inquiries.filter(i => i.status === 'rejected').length;

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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
        );
      case 'approved':
        return (
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        );
      case 'rejected':
        return (
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  const formatInquiryNumber = (id: string, inquiryNumber?: number) => {
    if (typeof inquiryNumber === 'number') return inquiryNumber.toString();
    const chunk = id.slice(-6);
    const parsed = Number.parseInt(chunk, 36);
    if (Number.isNaN(parsed)) return id.slice(-4);
    return parsed.toString();
  };

  const formatDateTime = (timestamp: Timestamp | null) => {
    if (!timestamp) return 'N/A';
    try {
      return timestamp.toDate().toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return 'N/A';
    }
  };

  const downloadFile = (content: string, filename: string, type: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const handleExportCsv = () => {
    if (inquiries.length === 0) return;

    const escapeCsv = (value: string) => {
      const safe = value.replace(/"/g, '""');
      return `"${safe}"`;
    };

    const headers = [
      'ID',
      'Full Name',
      'Email',
      'Phone',
      'Service Type',
      'Status',
      'Created At',
      'Message'
    ];

    const rows = inquiries.map((inquiry) => [
      inquiry.id,
      inquiry.fullName,
      inquiry.email,
      inquiry.phone,
      inquiry.serviceType,
      inquiry.status,
      formatDateTime(inquiry.createdAt),
      inquiry.message
    ].map((cell) => escapeCsv(String(cell))).join(','));

    const csv = [headers.join(','), ...rows].join('\n');
    downloadFile(csv, `inquiries-${new Date().toISOString().slice(0, 10)}.csv`, 'text/csv');
  };

  const handleGenerateReport = () => {
    if (inquiries.length === 0) return;

    const byStatus = inquiries.reduce<Record<string, number>>((acc, inquiry) => {
      acc[inquiry.status] = (acc[inquiry.status] || 0) + 1;
      return acc;
    }, {});

    const byService = inquiries.reduce<Record<string, number>>((acc, inquiry) => {
      acc[inquiry.serviceType] = (acc[inquiry.serviceType] || 0) + 1;
      return acc;
    }, {});

    const newest = inquiries[0];
    const oldest = inquiries[inquiries.length - 1];

    const reportLines = [
      'Values Department - Inquiries Report',
      `Generated: ${new Date().toLocaleString('en-US')}`,
      '',
      `Total inquiries: ${inquiries.length}`,
      `Date range: ${formatDateTime(oldest?.createdAt || null)} to ${formatDateTime(newest?.createdAt || null)}`,
      '',
      'By Status:',
      ...Object.entries(byStatus).map(([status, count]) => `- ${status}: ${count}`),
      '',
      'By Service Type:',
      ...Object.entries(byService).map(([service, count]) => `- ${service}: ${count}`)
    ];

    downloadFile(reportLines.join('\n'), `inquiries-report-${new Date().toISOString().slice(0, 10)}.txt`, 'text/plain');
  };

  const handleStatusUpdate = async (id: string, status: Inquiry['status']) => {
    try {
      const docRef = doc(db, 'inquiries', id);
      await updateDoc(docRef, {
        status,
        lastUpdated: Timestamp.now()
      });
    } catch (err) {
      console.error('Error updating inquiry status:', err);
      alert('Failed to update status. Please try again.');
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm('Are you sure you want to delete this inquiry? This action cannot be undone.');
    if (!confirmed) return;

    try {
      const docRef = doc(db, 'inquiries', id);
      await deleteDoc(docRef);
    } catch (err) {
      console.error('Error deleting inquiry:', err);
      alert('Failed to delete inquiry. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-0">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-2">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Admin Dashboard
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Manage and review submitted inquiries and registrations
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="mb-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Total Submissions */}
          <div className="overflow-hidden rounded-lg bg-white shadow">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 rounded-md bg-blue-500 p-3">
                  <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="truncate text-sm font-medium text-gray-500">Total Submissions</dt>
                    <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{totalSubmissions}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Pending Requests */}
          <div className="overflow-hidden rounded-lg bg-white shadow">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 rounded-md bg-yellow-500 p-3">
                  <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="truncate text-sm font-medium text-gray-500">Pending Requests</dt>
                    <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{pendingRequests}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Approved Requests */}
          <div className="overflow-hidden rounded-lg bg-white shadow">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 rounded-md bg-green-500 p-3">
                  <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="truncate text-sm font-medium text-gray-500">Approved Requests</dt>
                    <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{approvedRequests}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Rejected Requests */}
          <div className="overflow-hidden rounded-lg bg-white shadow">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 rounded-md bg-red-500 p-3">
                  <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="truncate text-sm font-medium text-gray-500">Rejected Requests</dt>
                    <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{rejectedRequests}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Inquiries Table */}
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="border-b border-gray-200 bg-white px-6 py-4">
            <h2 className="text-xl font-semibold text-gray-900">Recent Inquiries</h2>
          </div>
          
          {/* Desktop Table */}
          <div className="hidden overflow-x-auto md:block">
            <table className="min-w-full divide-y divide-gray-200">
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
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {isLoading ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-sm text-gray-500">
                      Loading inquiries...
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-sm text-red-600">
                      {error}
                    </td>
                  </tr>
                ) : inquiries.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-sm text-gray-500">
                      No inquiries yet. New submissions will appear here.
                    </td>
                  </tr>
                ) : (
                  inquiries.slice(0, 5).map((inquiry) => (
                  <tr key={inquiry.id} className="hover:bg-gray-50">
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                      #{formatInquiryNumber(inquiry.id, inquiry.inquiryNumber)}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                      {inquiry.fullName}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      {inquiry.email}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      {inquiry.serviceType}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                      <span className={`inline-flex items-center space-x-1 rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(inquiry.status)}`}>
                        {getStatusIcon(inquiry.status)}
                        <span className="capitalize">{inquiry.status.replace('-', ' ')}</span>
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      {inquiry.createdAt ? inquiry.createdAt.toDate().toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      }) : 'N/A'}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-3">
                        <Link
                          href={`/admin/inquiries/${inquiry.id}`}
                          className="text-blue-600 hover:text-blue-900 focus:outline-none focus:underline"
                          aria-label={`View details for ${inquiry.fullName}`}
                        >
                          View
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleStatusUpdate(inquiry.id, 'approved')}
                          disabled={inquiry.status === 'approved' || inquiry.status === 'rejected' || inquiry.status === 'completed'}
                          className="text-green-600 hover:text-green-800 focus:outline-none focus:underline disabled:cursor-not-allowed disabled:text-gray-400"
                          aria-label={`Approve inquiry from ${inquiry.fullName}`}
                        >
                          Approve
                        </button>
                        <button
                          type="button"
                          onClick={() => handleStatusUpdate(inquiry.id, 'rejected')}
                          disabled={inquiry.status === 'rejected' || inquiry.status === 'approved' || inquiry.status === 'completed'}
                          className="text-red-600 hover:text-red-800 focus:outline-none focus:underline disabled:cursor-not-allowed disabled:text-gray-400"
                          aria-label={`Reject inquiry from ${inquiry.fullName}`}
                        >
                          Reject
                        </button>
                        <button
                          type="button"
                          onClick={() => handleStatusUpdate(inquiry.id, 'in-review')}
                          disabled={inquiry.status === 'in-review' || inquiry.status === 'approved' || inquiry.status === 'rejected' || inquiry.status === 'completed'}
                          className="text-blue-600 hover:text-blue-800 focus:outline-none focus:underline disabled:cursor-not-allowed disabled:text-gray-400"
                          aria-label={`Mark inquiry from ${inquiry.fullName} as in review`}
                        >
                          In Review
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(inquiry.id)}
                          className="text-gray-500 hover:text-gray-700 focus:outline-none focus:underline"
                          aria-label={`Delete inquiry from ${inquiry.fullName}`}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden">
            {isLoading ? (
              <div className="p-6 text-center text-sm text-gray-500">
                Loading inquiries...
              </div>
            ) : error ? (
              <div className="p-6 text-center text-sm text-red-600">
                {error}
              </div>
            ) : inquiries.length === 0 ? (
              <div className="p-6 text-center text-sm text-gray-500">
                No inquiries yet. New submissions will appear here.
              </div>
            ) : (
              inquiries.slice(0, 5).map((inquiry) => (
              <div key={inquiry.id} className="border-b border-gray-200 p-4 last:border-b-0">
                <div className="mb-2 flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{inquiry.fullName}</p>
                    <p className="text-xs text-gray-500">#{formatInquiryNumber(inquiry.id, inquiry.inquiryNumber)}</p>
                  </div>
                  <span className={`inline-flex items-center space-x-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(inquiry.status)}`}>
                    {getStatusIcon(inquiry.status)}
                    <span className="capitalize">{inquiry.status.replace('-', ' ')}</span>
                  </span>
                </div>
                <div className="space-y-1 text-sm">
                  <p className="text-gray-600">{inquiry.email}</p>
                  <p className="text-gray-500">{inquiry.serviceType}</p>
                  <p className="text-gray-400">
                    {inquiry.createdAt ? inquiry.createdAt.toDate().toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    }) : 'N/A'}
                  </p>
                </div>
                <div className="mt-3 flex flex-wrap gap-3 text-sm font-medium">
                  <Link
                    href={`/admin/inquiries/${inquiry.id}`}
                    className="text-blue-600 hover:text-blue-900 focus:outline-none focus:underline"
                    aria-label={`View details for ${inquiry.fullName}`}
                  >
                    View Details
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleStatusUpdate(inquiry.id, 'approved')}
                    disabled={inquiry.status === 'approved' || inquiry.status === 'rejected' || inquiry.status === 'completed'}
                    className="text-green-600 hover:text-green-800 focus:outline-none focus:underline disabled:cursor-not-allowed disabled:text-gray-400"
                    aria-label={`Approve inquiry from ${inquiry.fullName}`}
                  >
                    Approve
                  </button>
                  <button
                    type="button"
                    onClick={() => handleStatusUpdate(inquiry.id, 'rejected')}
                    disabled={inquiry.status === 'rejected' || inquiry.status === 'approved' || inquiry.status === 'completed'}
                    className="text-red-600 hover:text-red-800 focus:outline-none focus:underline disabled:cursor-not-allowed disabled:text-gray-400"
                    aria-label={`Reject inquiry from ${inquiry.fullName}`}
                  >
                    Reject
                  </button>
                  <button
                    type="button"
                    onClick={() => handleStatusUpdate(inquiry.id, 'in-review')}
                    disabled={inquiry.status === 'in-review' || inquiry.status === 'approved' || inquiry.status === 'rejected' || inquiry.status === 'completed'}
                    className="text-blue-600 hover:text-blue-800 focus:outline-none focus:underline disabled:cursor-not-allowed disabled:text-gray-400"
                    aria-label={`Mark inquiry from ${inquiry.fullName} as in review`}
                  >
                    In Review
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(inquiry.id)}
                    className="text-gray-500 hover:text-gray-700 focus:outline-none focus:underline"
                    aria-label={`Delete inquiry from ${inquiry.fullName}`}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 rounded-lg bg-blue-50 p-6">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Quick Actions</h3>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/admin/inquiries"
              className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Inquiry
            </Link>
            <button
              type="button"
              onClick={handleExportCsv}
              disabled={inquiries.length === 0}
              className="inline-flex items-center rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
              aria-label="Export data"
            >
              <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Export Data
            </button>
            <button
              type="button"
              onClick={handleGenerateReport}
              disabled={inquiries.length === 0}
              className="inline-flex items-center rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
              aria-label="Generate report"
            >
              <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Generate Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
