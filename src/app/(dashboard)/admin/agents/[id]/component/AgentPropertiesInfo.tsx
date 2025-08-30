/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import ConfirmModal from '@/components/shared/ConfirmModal';
import { Table } from '@/components/shared/Table';
import { Button } from '@/components/ui/Button';
import { Eye, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDeletePropertyMutation } from '@/redux/api/propertiesApi';
import { toast } from 'sonner';

interface Property {
  id: number;
  name: string;
  status: string;
  created_at: string;
  street_address: string;
  city: string;
  country: string;
  photos: { url: string }[];
}

interface AgentPropertiesInfoProps {
  properties: Property[];
}

const AgentPropertiesInfo = ({ properties }: AgentPropertiesInfoProps) => {
  const router = useRouter();
  const [deleteProperty, { isLoading: isDeleting }] = useDeletePropertyMutation();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deletingItem, setDeletingItem] = useState<Property | null>(null);

  const handleDeleteClick = (item: Property) => {
    setDeletingItem(item);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (deletingItem) {
      try {
        await deleteProperty(deletingItem.id.toString()).unwrap();
        toast.success(`Property deleted successfully`);
      } catch (err: any) {
        const errorMessage = err?.data?.message || 'Failed to delete property';
        toast.error(errorMessage);
      }
    }
    setConfirmOpen(false);
    setDeletingItem(null);
  };

  const handleCancelDelete = () => {
    setConfirmOpen(false);
    setDeletingItem(null);
  };

  const handleActionChange = async (item: Property, action: string) => {
    if (action === 'accept' || action === 'reject') {
      try {
        // Assuming an API endpoint exists for accept/reject actions
        // This would need to be implemented based on your backend
        toast.success(`Property ${action}ed successfully`);
      } catch (err: any) {
        const errorMessage = err?.data?.message || `Failed to ${action} property`;
        toast.error(errorMessage);
      }
    }
  };

  const renderActions = (item: Property) => (
    <div className="flex items-center justify-end gap-2 flex-wrap">
      <Button
        onClick={() => router.push(`/admin/properties/${item.id}`)}
        color="ghost"
        title="View"
      >
        <Eye size={18} />
      </Button>
      <Button
        color="ghost"
        title="Delete"
        className="text-red-500 hover:text-red-700"
        onClick={() => handleDeleteClick(item)}
        disabled={isDeleting}
      >
        <Trash2 size={18} />
      </Button>
      <select
        className="border border-gray-300 rounded-md p-0.5"
        onChange={(e) => handleActionChange(item, e.target.value)}
      >
        <option value="">Select Action</option>
        <option value="accept">Accept</option>
        <option value="reject">Reject</option>
      </select>
    </div>
  );

  const columns: { header: string; accessor: keyof Property; render?: (item: Property) => React.ReactNode; minWidth?: string }[] = [
    {
      header: 'Properties Name',
      accessor: 'name',
      render: (item) => (
        <div className="flex items-center gap-3">
          <Image
            src={item.photos?.[0]?.url ? `${process.env.NEXT_PUBLIC_IMAGE_URL}${item.photos[0].url}` : '/page_images/contactUs2.jpg'}
            alt={item.street_address}
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
          <span className="font-medium text-gray-900 dark:text-white">{item.street_address}</span>
        </div>
      ),
      minWidth: '300px',
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (item) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            item.status === 'available'
              ? 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200'
              : 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200'
          }`}
        >
          {item.status}
        </span>
      ),
      minWidth: '120px',
    },
    {
      header: 'Post Date',
      accessor: 'created_at',
      render: (item) => new Date(item.created_at).toLocaleDateString(),
      minWidth: '150px',
    },
    {
      header: 'Properties Location',
      accessor: 'street_address',
      render: (item) => `${item.street_address}, ${item.city}, ${item.country}`,
      minWidth: '350px',
    },
  ];

  return (
    <div>
      <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 w-full">
        <Table
          columns={columns}
          data={properties}
          renderActions={renderActions}
        />
      </div>
      <ConfirmModal
        open={confirmOpen}
        title="Delete Property?"
        description={`Are you sure you want to delete "${deletingItem?.street_address}"? This action cannot be undone.`}
        confirmText="Yes, Delete"
        cancelText="Cancel"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
};

export default AgentPropertiesInfo;