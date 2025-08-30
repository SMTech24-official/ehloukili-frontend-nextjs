
'use client';

import { Table } from '@/components/shared/Table';
import { Button } from '@/components/ui/Button';
import { useDashboard } from '@/providers/DashboardProvider';
import { useLoading } from '@/providers/LoadingProvider';
import { useGetAllContactsQuery } from '@/redux/api/contactApi';
import React, { useEffect, useMemo, useState } from 'react';
import { X } from 'lucide-react';

// Define interface for Contact based on API response
interface IContact {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read: number;
  created_at: string;
  updated_at: string;
}

// Modal component for contact details
interface ContactDetailsModalProps {
  open: boolean;
  onClose: () => void;
  contact: IContact | null;
}

const ContactDetailsModal: React.FC<ContactDetailsModalProps> = ({ open, onClose, contact }) => {
  if (!open || !contact) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 bg-opacity-50">
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4 p-6 relative overflow-y-auto max-h-[90vh]"
        role="dialog"
        aria-labelledby="modal-title"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Modal Content */}
        <h2 id="modal-title" className="text-2xl font-semibold mb-4">
          Contact Details
        </h2>
        <div className="space-y-4">
          <div>
            <span className="font-medium text-gray-700">ID:</span>
            <p className="text-gray-900">{contact.id}</p>
          </div>
          <div>
            <span className="font-medium text-gray-700">Name:</span>
            <p className="text-gray-900">{contact.name}</p>
          </div>
          <div>
            <span className="font-medium text-gray-700">Email:</span>
            <p className="text-gray-900">{contact.email}</p>
          </div>
          <div>
            <span className="font-medium text-gray-700">Subject:</span>
            <p className="text-gray-900">{contact.subject}</p>
          </div>
          <div>
            <span className="font-medium text-gray-700">Message:</span>
            <p className="text-gray-900 whitespace-pre-wrap">{contact.message}</p>
          </div>
          <div>
            <span className="font-medium text-gray-700">Status:</span>
            <p className={contact.is_read ? 'text-green-600' : 'text-red-600'}>
              {contact.is_read ? 'Read' : 'Unread'}
            </p>
          </div>
          <div>
            <span className="font-medium text-gray-700">Created At:</span>
            <p className="text-gray-900">{new Date(contact.created_at).toLocaleString()}</p>
          </div>
          <div>
            <span className="font-medium text-gray-700">Updated At:</span>
            <p className="text-gray-900">{new Date(contact.updated_at).toLocaleString()}</p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="mt-6 flex justify-end">
          <Button
            color="primary"
            size="md"
            className="!text-white"
            onClick={onClose}
            aria-label="Close"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

// Define table columns for contacts
const columns = [
  { header: 'ID', accessor: 'id' as keyof IContact, minWidth: '80px' },
  { header: 'Name', accessor: 'name' as keyof IContact, minWidth: '150px' },
  { header: 'Email', accessor: 'email' as keyof IContact, minWidth: '200px' },
  { header: 'Subject', accessor: 'subject' as keyof IContact, minWidth: '200px' },
  {
    header: 'Message',
    accessor: 'message' as keyof IContact,
    minWidth: '300px',
    render: (item: IContact) => (
      <span className="block truncate max-w-[300px]" title={item.message}>
        {item.message}
      </span>
    ),
  },
  {
    header: 'Status',
    accessor: 'is_read' as keyof IContact,
    minWidth: '100px',
    render: (item: IContact) => (
      <span className={item.is_read ? 'text-green-600' : 'text-red-600'}>
        {item.is_read ? 'Read' : 'Unread'}
      </span>
    ),
  },
  {
    header: 'Created At',
    accessor: 'created_at' as keyof IContact,
    minWidth: '160px',
    render: (item: IContact) => new Date(item.created_at).toLocaleString(),
  },
];

const ContactPage = () => {
  const { setPageTitle, setPageSubtitle } = useDashboard();
  const { setLoading, setLoadingText } = useLoading();
  const { data, isLoading } = useGetAllContactsQuery();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<IContact | null>(null);

  useEffect(() => {
    setPageTitle('Contacts');
    setPageSubtitle('Manage Contacts');
  }, [setPageTitle, setPageSubtitle]);

  // Global loading overlay for fetching contacts
  useEffect(() => {
    if (isLoading) {
      setLoadingText('Loading your contacts...');
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [isLoading, setLoading, setLoadingText]);

  // Sort contacts by created_at desc
  const contacts: IContact[] = useMemo(() => {
    if (!data?.data?.data?.data) return [];
    return [...data.data.data.data].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  }, [data]);

  // Table data: use full Contact objects
  const tableData = contacts;

  // Handle opening the modal
  const handleViewDetails = (contact: IContact) => {
    setSelectedContact(contact);
    setModalOpen(true);
  };

  return (
    <div className="w-full space-y-8">
      {/* Table */}
      <Table
        columns={columns}
        data={tableData}
        renderActions={(contact: IContact) => (
          <Button
            color="primary"
            size="sm"
            className="!text-white"
            onClick={() => handleViewDetails(contact)}
            aria-label={`View details for contact ${contact.name}`}
          >
            View Details
          </Button>
        )}
      />

      {/* Contact Details Modal */}
      <ContactDetailsModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedContact(null);
        }}
        contact={selectedContact}
      />
    </div>
  );
};

export default ContactPage;