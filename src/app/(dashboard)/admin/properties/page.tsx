/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import PropertyEditModal from '@/components/pages/dashboard/PropertyEditModal';
import ConfirmModal from '@/components/shared/ConfirmModal';
import { Table } from '@/components/shared/Table';
import { Button } from '@/components/ui/Button';
import { useDashboard } from '@/providers/DashboardProvider';
import { useLoading } from '@/providers/LoadingProvider';
import { useChangePropertyStatusMutation, useDeletePropertyMutation, useGetAllPropertiesQuery, useUpdatePropertyMutation } from '@/redux/api/propertiesApi';
import * as Switch from "@radix-ui/react-switch";
import { Eye, Pencil, Search, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function AdminPropertiesPage() {
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
    const [changePropertyStatus, { isLoading: isUpdatingStatus }] = useChangePropertyStatusMutation();

    // Pagination and filter state
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(12);
    const [search, setSearch] = useState('');
    const [filters, setFilters] = useState<{
        property_type?: string;
        property_status?: string;
        isHomePageView?: boolean;
        isActive?: boolean;
    }>({});

    // API integration with pagination and filters
    const { data, isLoading, isError, error } = useGetAllPropertiesQuery({
        per_page: pageSize,
        page,
        city: search || undefined,
        ...filters,
    });

    useEffect(() => {
        setPageTitle('My Properties');
        setPageSubtitle('Manage your property listings and details');
    }, [setPageTitle, setPageSubtitle]);

    // Global loading
    useEffect(() => {
        setLoading(isLoading || isUpdatingStatus);
        setLoadingText(isLoading ? 'Loading properties...' : isUpdatingStatus ? 'Updating status...' : '');
        return () => {
            setLoading(false);
            setLoadingText('');
        };
    }, [isLoading, isUpdatingStatus, setLoading, setLoadingText]);

    // Extract pagination metadata
    const properties = data?.data || [];
    const meta = data?.meta || { current_page: 1, last_page: 1, per_page: 12, total: 0, from: 0, to: 0 };
    const { current_page, last_page, total } = meta;

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

    // Status toggle handler
    const handleStatusToggle = async (id: string, isHomePageView: boolean) => {
        try {
            await changePropertyStatus({ id, statusData: { isHomePageView } }).unwrap();
            toast.success(`Property ${isHomePageView ? 'added to' : 'removed from'} homepage.`);
        } catch (err: any) {
            toast.error(err?.data?.message || 'Failed to update homepage status.');
        }
    };

    // Filter handler
    const handleFilterChange = (key: keyof typeof filters, value: any) => {
        setFilters((prev) => ({
            ...prev,
            [key]: value === '' ? undefined : value,
        }));
        setPage(1); // Reset to first page on filter change
    };

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
        // Property Status used, new

        {
            header: 'Property Status',
            accessor: 'property_status',
            render: (item: any) => (
                <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${item.property_status === 'used'
                        ? 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200'
                        : item.property_status === 'new'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                            : 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200'}`}
                >
                    {item.property_status?.charAt(0).toUpperCase() + item.property_status?.slice(1)}
                </span>
            ),
            minWidth: '120px',
        },
        {
            header: 'Status',
            accessor: 'status',
            render: (item: any) => (
                <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${item.status === 'booked'
                        ? 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200'
                        : item.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                            : 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200'}`}
                >
                    {item.status?.charAt(0).toUpperCase() + item.status?.slice(1)}
                </span>
            ),
            minWidth: '120px',
        },
        {
            header: 'isActive',
            accessor: 'isActive',
            render: (item: any) => (
                <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${item.isActive
                        ? 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200'
                        : 'bg-amber-300 text-amber-800 dark:bg-amber-900 dark:text-amber-200'}`}
                >
                    {item.isActive ? 'Active' : 'Inactive'}
                </span>
            ),
            minWidth: '120px',
        },
        {
            header: 'Home Page View',
            accessor: 'isHomePageView',
            render: (item: any) => (
                <Switch.Root
                    className="w-10 h-6 rounded-full relative outline-none cursor-pointer transition-colors bg-gray-200 dark:bg-gray-700 data-[state=checked]:bg-green-500 data-[state=checked]:dark:bg-green-400"
                    checked={item.isHomePageView}
                    onCheckedChange={(checked) => {
                        changePropertyStatus({ id: item.id, statusData: { isHomePageView: checked } });
                    }}
                    disabled={isUpdatingStatus}
                >
                    <Switch.Thumb
                        className="block w-5 h-5 rounded-full shadow transition-transform translate-x-0.5 data-[state=checked]:translate-x-4 bg-white dark:bg-gray-200 data-[state=checked]:bg-green-100 data-[state=checked]:dark:bg-green-200"
                    />
                </Switch.Root>
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


    // Actions for table
    const renderActions = (item: any) => (
        <div className="flex items-center justify-end gap-2">
            <Button onClick={() => router.push(`/admin/properties/${item.id}`)} color="ghost" title="View">
                <Eye size={18} />
            </Button>
            <Button color="ghost" title="Edit" onClick={() => handleEditClick(item)}>
                <Pencil size={18} />
            </Button>
            <Button color="ghost" title="Delete" className="text-red-500 hover:text-red-700" onClick={() => handleDeleteClick(item)} isLoading={isDeleting && deletingItem?.id === item.id} disabled={isDeleting}>
                <Trash2 size={18} />
            </Button>
            <Button
                color="ghost"
                title={item.isActive ? 'Reject' : 'Accept'}
                className={item.isActive ? '!text-red-500 !hover:text-red-700' : '!text-green-500 !hover:text-green-700'}
                onClick={() => changePropertyStatus({ id: item.id, statusData: { isActive: !item.isActive } })}
                isLoading={isUpdatingStatus}
                disabled={isUpdatingStatus}
            >
                {item.isActive ? 'Reject' : 'Accept'}
            </Button>
        </div>
    );

    // Pagination controls
    const handlePrev = () => setPage((p) => Math.max(1, p - 1));
    const handleNext = () => setPage((p) => Math.min(last_page, p + 1));
    const handlePageChange = (newPage: number) => setPage(newPage);

    // Determine content
    let tableContent;
    if (isError) {
        tableContent = (
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
    } else if (!isLoading && !properties.length) {
        tableContent = (
            <div className="flex flex-col items-center justify-center min-h-[300px]">
                <Image src="/images/empty-state.svg" alt="No properties" width={180} height={180} />
                <div className="mt-4 text-lg font-semibold text-gray-500 dark:text-gray-300">No properties found.</div>
            </div>
        );
    } else {
        tableContent = (
            <Table
                columns={columns}
                data={properties}
                renderActions={renderActions}
            />
        );
    }

    return (
        <div className="space-y-6 w-full">
            <div className="flex justify-between items-center flex-wrap gap-4">
                <div className="flex flex-wrap items-center gap-4">
                    <div className="relative">
                        <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by City..."
                            value={search}
                            onChange={e => {
                                setSearch(e.target.value);
                                setPage(1);
                            }}
                            className="pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg w-full sm:w-80 bg-white dark:bg-[var(--color-neutral-800)] focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-shadow"
                        />
                    </div>
                    <select
                        value={filters.property_type || ''}
                        onChange={(e) => handleFilterChange('property_type', e.target.value)}
                        className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-[var(--color-neutral-800)] focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-shadow"
                    >
                        <option value="">All Property Types</option>
                        <option value="condo">Condo</option>
                        <option value="townhouse">Townhouse</option>
                        <option value="apartment">Apartment</option>
                        <option value="house">House</option>
                    </select>
                    <select
                        value={filters.property_status || ''}
                        onChange={(e) => handleFilterChange('property_status', e.target.value)}
                        className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-[var(--color-neutral-800)] focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-shadow"
                    >
                        <option value="">All Statuses</option>
                        <option value="new">New</option>
                        <option value="used">Used</option>
                    </select>
                    <div className="flex items-center gap-2">
                        <label className="text-sm text-gray-600 dark:text-gray-300">Home Page View</label>
                        <Switch.Root
                            className="w-10 h-6 rounded-full relative outline-none cursor-pointer transition-colors bg-gray-200 dark:bg-gray-700 data-[state=checked]:bg-green-500 data-[state=checked]:dark:bg-green-400"
                            checked={filters.isHomePageView}
                            onCheckedChange={(checked) => handleFilterChange('isHomePageView', checked)}
                        >
                            <Switch.Thumb
                                className="block w-5 h-5 rounded-full shadow transition-transform translate-x-0.5 data-[state=checked]:translate-x-4 bg-white dark:bg-gray-200 data-[state=checked]:bg-green-100 data-[state=checked]:dark:bg-green-200"
                            />
                        </Switch.Root>
                    </div>
                    <div className="flex items-center gap-2">
                        <label className="text-sm text-gray-600 dark:text-gray-300">Active</label>
                        <Switch.Root
                            className="w-10 h-6 rounded-full relative outline-none cursor-pointer transition-colors bg-gray-200 dark:bg-gray-700 data-[state=checked]:bg-green-500 data-[state=checked]:dark:bg-green-400"
                            checked={filters.isActive}
                            onCheckedChange={(checked) => handleFilterChange('isActive', checked)}
                        >
                            <Switch.Thumb
                                className="block w-5 h-5 rounded-full shadow transition-transform translate-x-0.5 data-[state=checked]:translate-x-4 bg-white dark:bg-gray-200 data-[state=checked]:bg-green-100 data-[state=checked]:dark:bg-green-200"
                            />
                        </Switch.Root>
                    </div>
                </div>
            </div>
            <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 w-full">
                {tableContent}
            </div>
            {/* Pagination controls */}
            {last_page > 1 && (
                <div className="flex justify-between items-center gap-2 mt-4">
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                        Showing {meta.from} to {meta.to} of {total} properties
                    </div>
                    <div className="flex items-center gap-2">
                        <Button color="ghost" onClick={handlePrev} disabled={page === 1}>Previous</Button>
                        {Array.from({ length: last_page }, (_, i) => i + 1).map((pageNum) => (
                            <Button
                                key={pageNum}
                                color={pageNum === current_page ? 'primary' : 'ghost'}
                                onClick={() => handlePageChange(pageNum)}
                            >
                                {pageNum}
                            </Button>
                        ))}
                        <Button color="ghost" onClick={handleNext} disabled={page === last_page}>Next</Button>
                    </div>
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