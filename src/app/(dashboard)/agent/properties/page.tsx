/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { Table } from '@/components/shared/Table';
import { Button } from '@/components/ui/Button';
import { useDashboard } from '@/providers/DashboardProvider';
import { Eye, Pencil, Plus, Search, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState, useMemo } from 'react';
import ConfirmModal from '@/components/shared/ConfirmModal';
import { useRouter } from 'next/navigation';
import { useGetOwnPropertiesQuery, useDeletePropertyMutation, useUpdatePropertyMutation } from '@/redux/api/propertiesApi';
import PropertyEditModal from '@/components/pages/dashboard/PropertyEditModal';
import { toast } from 'sonner';
import { useLoading } from '@/providers/LoadingProvider';

const columns = [
    {
        header: 'Property Name',
        accessor: 'property_name',
        render: (item: any) => (
            <div className="flex items-center gap-3">
                <Image
                    src={
                        item?.photos?.length > 0 ?
                        process.env.NEXT_PUBLIC_IMAGE_URL + (item?.photos?.[0]?.url || '') :
                         '/placeholder.svg'
                    }
                    alt={item.property_type || 'Property'}
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                />
                <span className="font-medium text-gray-900 dark:text-white">
                    {item.property_type} - {item.street_address}
                </span>
            </div>
        ),
        minWidth: '300px',
    },
    {
        header: 'Status',
        accessor: 'status',
        render: (item: any) => (
            <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${item.status === 'booked'
                    ? 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200'
                    : 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200'}`}
            >
                {item.status?.charAt(0).toUpperCase() + item.status?.slice(1)}
            </span>
        ),
        minWidth: '120px',
    },
    {
        header: 'Post Date',
        accessor: 'created_at',
        render: (item: any) => (
            <span>{item.created_at ? new Date(item.created_at).toLocaleDateString() : '-'}</span>
        ),
        minWidth: '150px',
    },
    {
        header: 'Location',
        accessor: 'location',
        render: (item: any) => (
            <span>{[item.street_address, item.city, item.state, item.country].filter(Boolean).join(', ')}</span>
        ),
        minWidth: '350px',
    },
];

export default function PropertiesPage() {
    const { setPageTitle, setPageSubtitle } = useDashboard();
    const router = useRouter();
    const { setLoading, setLoadingText } = useLoading();
         // Edit modal state
    const [editOpen, setEditOpen] = useState(false);
    const [editItem, setEditItem] = useState<any | null>(null);
    // Delete modal state
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [deletingItem, setDeletingItem] = useState<any | null>(null);
    // Mutations
    const [deleteProperty, { isLoading: isDeleting }] = useDeletePropertyMutation();
    const [updateProperty, { isLoading: isUpdating }] = useUpdatePropertyMutation();

    // API integration
    const { data, isLoading, isError, error } = useGetOwnPropertiesQuery();

    // Pagination state
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [search, setSearch] = useState('');

    useEffect(() => {
        setPageTitle('My Properties');
        setPageSubtitle('Manage your property listings and details');
    }, [setPageTitle, setPageSubtitle]);

    // Global loading
    useEffect(() => {
        setLoading(isLoading);
        setLoadingText(isLoading ? 'Loading properties...' : '');
        return () => {
            setLoading(false);
            setLoadingText('');
        };
    }, [isLoading, setLoading, setLoadingText]);

    // Data transformation and search
    const properties = useMemo(() => {
        if (!data?.data) return [];
        let filtered = data.data;
        if (search) {
            filtered = filtered.filter((item: any) =>
                (item.property_type + ' ' + item.street_address + ' ' + item.city + ' ' + item.state + ' ' + item.country)
                    .toLowerCase()
                    .includes(search.toLowerCase())
            );
        }
        return filtered;
    }, [data, search]);

    // Pagination logic
    const total = properties.length;
    const totalPages = Math.ceil(total / pageSize);
    const paginated = useMemo(() => {
        const start = (page - 1) * pageSize;
        return properties.slice(start, start + pageSize);
    }, [properties, page, pageSize]);

    // Set page size externally if needed (for future use, e.g. dropdown)
    // Example: setPageSize(20) to change page size

    // Empty state
    if (!isLoading && !paginated.length) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[300px]">
                <Image src="/images/empty-state.svg" alt="No properties" width={180} height={180} />
                <div className="mt-4 text-lg font-semibold text-gray-500 dark:text-gray-300">No properties found.</div>
            </div>
        );
    }

    // Error state
    if (isError) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[300px]">
                <div className="text-red-500 font-semibold text-lg mb-2">Failed to load properties.</div>
                <div className="text-gray-500 dark:text-gray-300">
                    {(() => {
                        if (!error) return 'Please try again later.';
                        if ('message' in error && typeof error.message === 'string') return error.message;
                        if ('data' in error && typeof error.data === 'string') return error.data;
                        return 'Please try again later.';
                    })()}
                </div>
            </div>
        );
    }



    // Delete handlers
    const handleDeleteClick = (item: any) => {
        setDeletingItem(item);
        setConfirmOpen(true);
    };
    const handleConfirmDelete = async () => {
        if (!deletingItem) return;
        setLoading(true);
        try {
            await deleteProperty(deletingItem.id).unwrap();
            toast.success('Property deleted successfully.');
        } catch (err: any) {
            toast.error(err?.data?.message || 'Failed to delete property.');
        }
        setLoading(false);
        setConfirmOpen(false);
        setDeletingItem(null);
    };
    const handleCancelDelete = () => {
        setConfirmOpen(false);
        setDeletingItem(null);
    };

    // Edit handlers
    const handleEditClick = (item: any) => {
        setEditItem(item);
        setEditOpen(true);
    };
    const handleEditClose = () => {
        setEditOpen(false);
        setEditItem(null);
    };

    // Actions for table
    const renderActions = (item: any) => (
        <div className="flex items-center justify-end gap-2">
            <Button onClick={() => router.push(`/agent/properties/${item.id}`)} color="ghost" title="View">
                <Eye size={18} />
            </Button>
            <Button color="ghost" title="Edit" onClick={() => handleEditClick(item)}>
                <Pencil size={18} />
            </Button>
            <Button color="ghost" title="Delete" className="text-red-500 hover:text-red-700" onClick={() => handleDeleteClick(item)} isLoading={isDeleting && deletingItem?.id === item.id} disabled={isDeleting}>
                <Trash2 size={18} />
            </Button>
        </div>
    );

    // Pagination controls
    const handlePrev = () => setPage((p) => Math.max(1, p - 1));
    const handleNext = () => setPage((p) => Math.min(totalPages, p + 1));

    return (
        <div className="space-y-6 w-full">
            <div className="flex justify-between items-center flex-wrap gap-4">
                <div className="relative">
                    <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by property name..."
                        value={search}
                        onChange={e => {
                            setSearch(e.target.value);
                            setPage(1);
                        }}
                        className="pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg w-full sm:w-80 bg-white dark:bg-[var(--color-neutral-800)] focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-shadow"
                    />
                </div>
                <Button color="primary" className="flex items-center gap-2 !text-white" onClick={() => router.push('/submit-property')}>
                    <Plus size={20} />
                    <span>Add New Property</span>
                </Button>
            </div>
            <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 w-full">
                <Table columns={columns} data={paginated} renderActions={renderActions} />
            </div>
            {/* Pagination controls */}
            {totalPages > 1 && (
                <div className="flex justify-end items-center gap-2 mt-4">
                    <Button color="ghost" onClick={handlePrev} disabled={page === 1}>Prev</Button>
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                        Page {page} of {totalPages}
                    </span>
                    <Button color="ghost" onClick={handleNext} disabled={page === totalPages}>Next</Button>
                </div>
            )}
            {/* Delete warning modal */}
            <ConfirmModal
                open={confirmOpen}
                title="Delete Property?"
                description={`Are you sure you want to delete "${deletingItem?.property_type} - ${deletingItem?.street_address}"? This action cannot be undone.`}
                confirmText={isDeleting ? 'Deleting...' : 'Yes, Delete'}
                cancelText="Cancel"
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
                loading={isDeleting}
            />
            {/* Edit modal (reusable, fields/validation like SubmitPropertyPage) */}
            {editOpen && (
                <PropertyEditModal
                    open={editOpen}
                    onClose={handleEditClose}
                    property={editItem}
                    updateProperty={updateProperty}
                    setLoading={setLoading}
                    setEditOpen={setEditOpen}
                    setEditItem={setEditItem}
                    loading={isUpdating}
                />
            )}
        </div>
    );
}
