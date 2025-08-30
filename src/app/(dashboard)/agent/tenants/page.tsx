/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import React, { useEffect } from 'react';
import { Eye, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Table } from '@/components/shared/Table';
import { Button } from '@/components/ui/Button';
import { useDashboard } from '@/providers/DashboardProvider';
import { useLoading } from '@/providers/LoadingProvider';
import { Text } from '@/components/ui/Typography';
import { useGetMessagesQuery } from '@/redux/api/MessageApi';

interface IMessage {
    id: number;
    property_id: number;
    user_id: number;
    message: string;
    created_at: string;
    updated_at: string;
    user: {
        id: number;
        first_name: string;
        last_name: string;
        email: string;
        role: string;
        phone: string;
    };
}



const TenantsPage = () => {
    const { setPageTitle, setPageSubtitle } = useDashboard();
    const { setLoading, setLoadingText } = useLoading();
    const router = useRouter();
    const { data, isLoading, error } = useGetMessagesQuery(undefined);

    useEffect(() => {
        setPageTitle('My Tenants');
        setPageSubtitle('Tenants Information');
    }, [setPageTitle, setPageSubtitle]);

    useEffect(() => {
        if (isLoading) {
            setLoadingText('Loading tenants...');
            setLoading(true);
        } else {
            setLoading(false);
        }
    }, [isLoading, setLoading, setLoadingText]);

    if (error) {
        let errorMessage = 'An error occurred while loading messages.';
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

    const columns: { header: string; accessor: any; render?: (item: IMessage) => React.ReactNode; minWidth?: string }[] = [
        {
            header: 'First Name',
            accessor: 'user?.first_name',
            render: (item: IMessage) => item.user.first_name,
            minWidth: '150px',
        },
        {
            header: 'Last Name',
            accessor: 'user?.last_name',
            render: (item: IMessage) => item.user.last_name,
            minWidth: '150px',
        },
        {
            header: 'Email',
            accessor: 'user?.email',
            render: (item: IMessage) => item.user.email,
            minWidth: '200px',
        },
        {
            header: 'Role',
            accessor: 'user?.role',
            render: (item: IMessage) => item.user.role,
            minWidth: '100px',
        },
        {
            header: 'Phone',
            accessor: 'user?.phone',
            render: (item: IMessage) => item.user.phone,
            minWidth: '150px',
        },
        {
            header: 'Property ID',
            accessor: 'property_id',
            minWidth: '100px',
        },
        {
            header: 'Last Message',
            accessor: 'message',
            minWidth: '200px',
        },
        // Remove the 'Actions' column from here and use Table's renderActions prop instead
    ];

    const messages = data?.messages || [];

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
                    data={messages as IMessage[]}
                    renderActions={(item: IMessage) => (
                        <div className="flex items-center justify-end gap-2">
                            <Button
                                onClick={() => router.push(`/agent/tenants/${item?.user?.id}`)}
                                color="ghost"
                                title="View"
                            >
                                <Eye size={18} />
                            </Button>
                        </div>
                    )}
                />
            </div>
        </div>
    );
};

export default TenantsPage;     
