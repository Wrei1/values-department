'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { doc, getDoc, updateDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface InquiryDetails {
  id: string;
  inquiryNumber?: number;
  fullName: string;
  email: string;
  phone: string;
  serviceType: string;
  message: string;
  status: 'pending' | 'approved' | 'rejected' | 'in-review' | 'completed';
  createdAt: Timestamp;
  lastUpdated?: Timestamp;
  assignedTo?: string;
  notes?: string;
}

export default function InquiryDetailsPage() {
  const router = useRouter();
  const params = useParams<{ id?: string | string[] }>();
  const inquiryId = Array.isArray(params?.id) ? params?.id[0] : params?.id;
  const [inquiry, setInquiry] = useState<InquiryDetails | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [notes, setNotes] = useState('');
  const [notesDraft, setNotesDraft] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInquiry = async () => {
      if (!inquiryId) {
        setError('Invalid inquiry ID');
        setLoading(false);
        return;
      }

      try {
        const docRef = doc(db, 'inquiries', inquiryId);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          const safeNotes = typeof data.notes === 'string' ? data.notes : '';
          setInquiry({
            id: docSnap.id,
            inquiryNumber: typeof data.inquiryNumber === 'number' ? data.inquiryNumber : undefined,
            fullName: data.fullName,
            email: data.email,
            phone: data.phone,
            serviceType: data.serviceType,
            message: data.message,
            status: data.status || 'pending',
            createdAt: data.createdAt,
            lastUpdated: data.lastUpdated,
            assignedTo: data.assignedTo,
            notes: safeNotes
          });
          setNotes(safeNotes);
          setNotesDraft(safeNotes);
        } else {
          setError('Inquiry not found');
        }
      } catch (err) {
        console.error('Error fetching inquiry:', err);
        setError('Failed to load inquiry');
      } finally {
        setLoading(false);
      }
    };

    fetchInquiry();
  }, [inquiryId]);

  const handleStatusUpdate = async (newStatus: 'approved' | 'rejected' | 'in-review' | 'completed') => {
    if (!inquiry) return;
    
    setIsUpdating(true);
    
    try {
      if (!inquiryId) return;
      const docRef = doc(db, 'inquiries', inquiryId);
      await updateDoc(docRef, {
        status: newStatus,
        lastUpdated: Timestamp.now()
      });
      
      setInquiry({
        ...inquiry,
        status: newStatus,
        lastUpdated: Timestamp.now()
      });
      
      setShowSuccessMessage(true);
      
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Failed to update status. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSaveNotes = async () => {
    if (!inquiry) return;
    
    setIsUpdating(true);
    
    try {
      if (!inquiryId) return;
      const docRef = doc(db, 'inquiries', inquiryId);
      await updateDoc(docRef, {
        notes: notesDraft,
        lastUpdated: Timestamp.now()
      });
      
      setInquiry({
        ...inquiry,
        notes: notesDraft,
        lastUpdated: Timestamp.now()
      });

      setNotes(notesDraft);
      
      setShowSuccessMessage(true);
      
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    } catch (err) {
      console.error('Error saving notes:', err);
      alert('Failed to save notes. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'in-review':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (timestamp: Timestamp | undefined) => {
    if (!timestamp) return 'N/A';
    const date = timestamp.toDate();
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatInquiryNumber = (id: string, inquiryNumber?: number) => {
    if (typeof inquiryNumber === 'number') return inquiryNumber.toString();
    const chunk = id.slice(-6);
    const parsed = Number.parseInt(chunk, 36);
    if (Number.isNaN(parsed)) return id.slice(-4);
    return parsed.toString();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"></div>
              <p className="mt-4 text-gray-600">Loading inquiry details...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !inquiry) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg bg-red-50 p-6 text-center">
            <svg className="mx-auto h-12 w-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="mt-4 text-xl font-semibold text-gray-900">{error || 'Inquiry not found'}</h2>
            <p className="mt-2 text-gray-600">The inquiry you're looking for doesn't exist or has been deleted.</p>
            <Link
              href="/admin/inquiries"
              className="mt-6 inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Back to Inquiries
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-6 flex" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link href="/admin" className="text-gray-500 transition-colors hover:text-gray-700 focus:outline-none focus:underline">
                Dashboard
              </Link>
            </li>
            <li className="flex items-center">
              <svg className="h-5 w-5 flex-shrink-0 text-gray-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <Link href="/admin/inquiries" className="ml-2 text-gray-500 transition-colors hover:text-gray-700 focus:outline-none focus:underline">
                Inquiries
              </Link>
            </li>
            <li className="flex items-center">
              <svg className="h-5 w-5 flex-shrink-0 text-gray-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <span className="ml-2 font-medium text-gray-900" aria-current="page">
                #{formatInquiryNumber(inquiry.id, inquiry.inquiryNumber)}
              </span>
            </li>
          </ol>
        </nav>

        {/* Success Message */}
        {showSuccessMessage && (
          <div className="mb-6 rounded-lg bg-green-50 p-4 shadow" role="alert">
            <div className="flex items-center">
              <svg className="mr-3 h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <p className="text-sm font-medium text-green-800">Changes saved successfully!</p>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Inquiry #{formatInquiryNumber(inquiry.id, inquiry.inquiryNumber)}
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Submitted on {formatDate(inquiry.createdAt)}
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <span className={`inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium capitalize ${getStatusColor(inquiry.status)}`}>
              <span className="mr-2 h-2 w-2 rounded-full bg-current"></span>
              {inquiry.status}
            </span>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-6 lg:col-span-2">
            {/* Contact Information Card */}
            <div className="overflow-hidden rounded-lg bg-white shadow">
              <div className="border-b border-gray-200 px-6 py-4">
                <h2 className="text-lg font-semibold text-gray-900">Contact Information</h2>
              </div>
              <div className="px-6 py-5">
                <dl className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Full Name</dt>
                    <dd className="mt-1 text-base text-gray-900">{inquiry.fullName}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Email Address</dt>
                    <dd className="mt-1 text-base">
                      <a href={`mailto:${inquiry.email}`} className="text-blue-600 transition-colors hover:text-blue-800 focus:outline-none focus:underline">
                        {inquiry.email}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Phone Number</dt>
                    <dd className="mt-1 text-base">
                      <a href={`tel:${inquiry.phone}`} className="text-blue-600 transition-colors hover:text-blue-800 focus:outline-none focus:underline">
                        {inquiry.phone}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Service Type</dt>
                    <dd className="mt-1 text-base text-gray-900">{inquiry.serviceType}</dd>
                  </div>
                </dl>
              </div>
            </div>

            {/* Message Card */}
            <div className="overflow-hidden rounded-lg bg-white shadow">
              <div className="border-b border-gray-200 px-6 py-4">
                <h2 className="text-lg font-semibold text-gray-900">Message</h2>
              </div>
              <div className="px-6 py-5">
                <p className="text-base leading-relaxed text-gray-700">{inquiry.message}</p>
              </div>
            </div>

            {/* Internal Notes Card */}
            <div className="overflow-hidden rounded-lg bg-white shadow">
              <div className="border-b border-gray-200 px-6 py-4">
                <h2 className="text-lg font-semibold text-gray-900">Internal Notes</h2>
              </div>
              <div className="px-6 py-5">
                <label htmlFor="notes" className="sr-only">Add internal notes</label>
                <textarea
                  id="notes"
                  rows={4}
                  value={notesDraft}
                  onChange={(e) => setNotesDraft(e.target.value)}
                  className="block w-full rounded-md border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  placeholder="Add internal notes about this inquiry..."
                  aria-label="Internal notes"
                />
                <div className="mt-3 flex justify-end">
                  <button
                    onClick={handleSaveNotes}
                    disabled={isUpdating || notesDraft.trim() === notes.trim()}
                    className="inline-flex items-center rounded-md bg-gray-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-400"
                  >
                    {isUpdating ? 'Saving...' : 'Save Notes'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Actions Card */}
            <div className="overflow-hidden rounded-lg bg-white shadow">
              <div className="border-b border-gray-200 px-6 py-4">
                <h2 className="text-lg font-semibold text-gray-900">Actions</h2>
              </div>
              <div className="space-y-3 px-6 py-5">
                <button
                  onClick={() => handleStatusUpdate('approved')}
                  disabled={isUpdating || inquiry.status === 'approved' || inquiry.status === 'rejected' || inquiry.status === 'completed'}
                  className="flex w-full items-center justify-center rounded-md bg-green-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-green-400"
                  aria-label="Approve inquiry"
                >
                  <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {inquiry.status === 'approved' ? 'Approved' : 'Approve'}
                </button>

                <button
                  onClick={() => handleStatusUpdate('rejected')}
                  disabled={isUpdating || inquiry.status === 'rejected' || inquiry.status === 'approved' || inquiry.status === 'completed'}
                  className="flex w-full items-center justify-center rounded-md bg-red-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-red-400"
                  aria-label="Reject inquiry"
                >
                  <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {inquiry.status === 'rejected' ? 'Rejected' : 'Reject'}
                </button>

                <button
                  onClick={() => handleStatusUpdate('in-review')}
                  disabled={isUpdating || inquiry.status === 'in-review' || inquiry.status === 'approved' || inquiry.status === 'rejected' || inquiry.status === 'completed'}
                  className="flex w-full items-center justify-center rounded-md bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-blue-400"
                  aria-label="Mark inquiry as in review"
                >
                  <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Mark as In Review
                </button>
                <button
                  onClick={() => handleStatusUpdate('completed')}
                  disabled={isUpdating || inquiry.status !== 'approved'}
                  className="flex w-full items-center justify-center rounded-md bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-blue-400"
                  aria-label="Mark inquiry as completed"
                >
                  <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {inquiry.status === 'completed' ? 'Completed' : 'Mark as Completed'}
                </button>

                <div className="border-t border-gray-200 pt-3">
                  <Link
                    href="/admin/inquiries"
                    className="flex w-full items-center justify-center rounded-md bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Inquiries
                  </Link>
                </div>
              </div>
            </div>

            {/* Details Card */}
            <div className="overflow-hidden rounded-lg bg-white shadow">
              <div className="border-b border-gray-200 px-6 py-4">
                <h2 className="text-lg font-semibold text-gray-900">Details</h2>
              </div>
              <div className="px-6 py-5">
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Inquiry ID</dt>
                    <dd className="mt-1 text-sm text-gray-900">#{formatInquiryNumber(inquiry.id, inquiry.inquiryNumber)}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Date Submitted</dt>
                    <dd className="mt-1 text-sm text-gray-900">{formatDate(inquiry.createdAt)}</dd>
                  </div>
                  {inquiry.lastUpdated && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Last Updated</dt>
                      <dd className="mt-1 text-sm text-gray-900">{formatDate(inquiry.lastUpdated)}</dd>
                    </div>
                  )}
                  {inquiry.assignedTo && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Assigned To</dt>
                      <dd className="mt-1 text-sm text-gray-900">{inquiry.assignedTo}</dd>
                    </div>
                  )}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
