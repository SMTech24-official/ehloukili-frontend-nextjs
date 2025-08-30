/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Table } from '@/components/shared/Table';
import { Button } from '@/components/ui/Button';
import { useDashboard } from '@/providers/DashboardProvider';
import { useLoading } from '@/providers/LoadingProvider';
import { Eye, Search, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import ConfirmModal from '@/components/shared/ConfirmModal';
import { useRouter } from 'next/navigation';
import { useAllAgentsQuery, useDeleteUserMutation } from '@/redux/api/authApi';
import { Text } from '@/components/ui/Typography';
import { toast } from 'sonner';

interface IUser {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string | null;
    zip_code: string;
    country: string;
}

const AdminAgentsPage = () => {
    const { setPageTitle, setPageSubtitle } = useDashboard();
    const { setLoading, setLoadingText } = useLoading();
    const router = useRouter();
    const { data, isLoading, error } = useAllAgentsQuery(undefined);
    const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [deletingItem, setDeletingItem] = useState<IUser | null>(null);

    useEffect(() => {
        setPageTitle('All Agents');
        setPageSubtitle('Agents Information');
    }, [setPageTitle, setPageSubtitle]);

    useEffect(() => {
        if (isLoading || isDeleting) {
            setLoadingText('Loading agents...');
            setLoading(true);
        } else {
            setLoading(false);
        }
    }, [isLoading, isDeleting, setLoading, setLoadingText]);

    const handleDeleteClick = (item: IUser) => {
        setDeletingItem(item);
        setConfirmOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (deletingItem) {
            try {
                await deleteUser(deletingItem.id.toString()).unwrap();
                toast.success(`Tenant ${deletingItem.first_name} ${deletingItem.last_name} deleted successfully`);
            } catch (err: any) {
                const errorMessage = err?.data?.message || 'Failed to delete tenant';
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

    if (error) {
        let errorMessage = 'An error occurred while loading tenants.';
        if ('message' in error && typeof error.message === 'string') {
            errorMessage = error.message;
        } else if ('status' in error && typeof error.status === 'number') {
            errorMessage = `Error code: ${error.status}`;
        }
        return (
            <div className="container mx-auto px-4 py-8 flex items-center justify-center h-screen">
                <Text color="error">{errorMessage}</Text>
            </div>
        );
    }

    const columns: { header: string; accessor: keyof IUser; render?: (item: IUser) => React.ReactNode; minWidth?: string }[] = [
        {
            header: 'Full Name',
            accessor: 'first_name',
            render: (item: IUser) => `${item.first_name} ${item.last_name}`,
            minWidth: '200px',
        },
        {
            header: 'Email',
            accessor: 'email',
            minWidth: '200px',
        },
        {
            header: 'Phone',
            accessor: 'phone',
            minWidth: '150px',
        },
        {
            header: 'Address',
            accessor: 'address',
            minWidth: '250px',
        },
        {
            header: 'City',
            accessor: 'city',
            minWidth: '150px',
        },
        {
            header: 'State',
            accessor: 'state',
            render: (item: IUser) => item.state || 'N/A',
            minWidth: '150px',
        },
        {
            header: 'Zip Code',
            accessor: 'zip_code',
            minWidth: '100px',
        },
    ];


    const users = data?.agents || [];

    return (
        <div className="space-y-6 w-full">
            <div className="flex justify-between items-center flex-wrap gap-4">
                <div className="relative">
                    <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by tenant name..."
                        className="pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg w-full sm:w-80 bg-white dark:bg-[var(--color-neutral-800)] focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-shadow"
                    />
                </div>
            </div>
            <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 w-full">
                <Table
                    columns={columns}
                    data={users as IUser[]}
                    renderActions={(item: IUser) => (
                        <div className="flex items-center justify-end gap-2">
                            <Button
                                onClick={() => router.push(`/admin/agents/${item.id}`)}
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
                            >
                                <Trash2 size={18} />
                            </Button>
                        </div>
                    )}
                />
            </div>
            <ConfirmModal
                open={confirmOpen}
                title="Delete Agent?"
                description={`Are you sure you want to delete "${deletingItem?.first_name} ${deletingItem?.last_name}"? This action cannot be undone.`}
                confirmText="Yes, Delete"
                cancelText="Cancel"
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />
        </div>
    );
};

export default AdminAgentsPage;
