"use client";
import { Table } from '@/components/shared/Table';
import { Button } from '@/components/ui/Button';
import { useDashboard } from '@/providers/DashboardProvider';
import { Eye, Pencil, Plus, Search, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import ConfirmModal from '@/components/shared/ConfirmModal';
import { useRouter } from 'next/navigation';

interface ITenant {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    state: string;
    city: string;
    zip_code: string;
}

const tenantData: ITenant[] = [
    {
        id: "T123",
        name: "John Doe",
        email: "john.doe@email.com",
        phone: "+1 555-987-6543",
        address: "123 Main St. Anytown, USA",
        state: "California",
        city: "Anytown",
        zip_code: "12345"
    },
    {
        id: "T124",
        name: "Jane Smith",
        email: "jane.smith@email.com",
        phone: "+1 555-123-4567",
        address: "456 Elm St. Othertown, USA",
        state: "California",
        city: "Othertown",
        zip_code: "67890"
    }
];

const columns: { header: string; accessor: keyof ITenant; render?: (item: ITenant) => React.ReactNode, minWidth?: string }[] = [
    {
        header: 'Full Name',
        accessor: 'name',
        minWidth: '200px'
    },
    {
        header: 'Email',
        accessor: 'email',
        minWidth: '200px'
    },
    {
        header: 'Phone',
        accessor: 'phone',
        minWidth: '150px'
    },
    {
        header: 'Address',
        accessor: 'address',
        minWidth: '250px'
    },
    {
        header: 'City',
        accessor: 'city',
        minWidth: '150px'
    },
    {
        header: 'State',
        accessor: 'state',
        minWidth: '150px'
    },
    {
        header: 'Zip Code',
        accessor: 'zip_code',
        minWidth: '100px'
    }
];


const TenantsPage = () => {
  const { setPageTitle, setPageSubtitle } = useDashboard();
    const router = useRouter();

    useEffect(() => {
        setPageTitle('My Tenants');
        setPageSubtitle('Tenants Information');
    }, [setPageTitle, setPageSubtitle]);

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [deletingItem, setDeletingItem] = useState<ITenant | null>(null);

    const handleDeleteClick = (item: ITenant) => {
        setDeletingItem(item);
        setConfirmOpen(true);
    };

    const handleConfirmDelete = () => {
        // Demo: just close modal and log
        setConfirmOpen(false);
        if (deletingItem) {
            // Replace with actual delete logic
            console.log('Deleted:', deletingItem);
        }
        setDeletingItem(null);
    };

    const handleCancelDelete = () => {
        setConfirmOpen(false);
        setDeletingItem(null);
    };

    const renderActions = (item: ITenant) => (
        <div className="flex items-center justify-end gap-2">
            <Button onClick={() => router.push(`/agent/tenants/${1}`)} color="ghost" title="View"><Eye size={18} /></Button>
            <Button color="ghost" title="Edit"><Pencil size={18} /></Button>
            <Button color="ghost" title="Delete" className="text-red-500 hover:text-red-700" onClick={() => handleDeleteClick(item)}><Trash2 size={18} /></Button>
        </div>
    );
    return (
          <div className="space-y-6 w-full">
            <div className="flex justify-between items-center flex-wrap gap-4">
                <div className="relative">
                    <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by property name..."
                        className="pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg w-full sm:w-80 bg-white dark:bg-[var(--color-neutral-800)] focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-shadow"
                    />
                </div>
                <Button color="primary" className="flex items-center gap-2 !text-white">
                    <Plus size={20} />
                    <span>Add New Property</span>
                </Button>
            </div>
            <div className='overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 w-full'>
                <Table
                    columns={columns}
                    data={tenantData || [] as ITenant[]}
                    renderActions={renderActions}
                />
            </div>
            <ConfirmModal
                open={confirmOpen}
                title="Delete Tenant?"
                description={`Are you sure you want to delete "${deletingItem?.name}"? This action cannot be undone.`}
                confirmText="Yes, Delete"
                cancelText="Cancel"
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />
        </div>
    );
};

export default TenantsPage;