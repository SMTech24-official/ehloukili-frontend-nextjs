/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";
import { Table } from '@/components/shared/Table';
import { Button } from '@/components/ui/Button';
import { useDashboard } from '@/providers/DashboardProvider';
import { Eye, Pencil, Plus, Search, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useEffect } from 'react';

interface Property {
    name: string;
    status: 'Booked' | 'Available';
    postDate: string;
    location: string;
    image: string;
}

const properties: Property[] = [
    { name: 'Serenity at Whispering Pines Retreat', status: 'Booked', postDate: '12 March 2025', location: '3891 Ranchview Dr. Richardson, California', image: '/page_images/contactUs2.jpg' },
    { name: 'Serenity at Whispering Pines Retreat', status: 'Booked', postDate: '12 March 2025', location: '3891 Ranchview Dr. Richardson, California', image: '/page_images/contactUs2.jpg' },
    { name: 'Serenity at Whispering Pines Retreat', status: 'Booked', postDate: '12 March 2025', location: '3891 Ranchview Dr. Richardson, California', image: '/page_images/contactUs2.jpg' },
    { name: 'Serenity at Whispering Pines Retreat', status: 'Booked', postDate: '12 March 2025', location: '3891 Ranchview Dr. Richardson, California', image: '/page_images/contactUs2.jpg' },
    { name: 'Serenity at Whispering Pines Retreat', status: 'Booked', postDate: '12 March 2025', location: '3891 Ranchview Dr. Richardson, California', image: '/page_images/contactUs2.jpg' },
    { name: 'Serenity at Whispering Pines Retreat', status: 'Booked', postDate: '12 March 2025', location: '3891 Ranchview Dr. Richardson, California', image: '/page_images/contactUs2.jpg' },
    { name: 'Serenity at Whispering Pines Retreat', status: 'Booked', postDate: '12 March 2025', location: '3891 Ranchview Dr. Richardson, California', image: '/page_images/contactUs2.jpg' },
    { name: 'Serenity at Whispering Pines Retreat', status: 'Booked', postDate: '12 March 2025', location: '3891 Ranchview Dr. Richardson, California', image: '/page_images/contactUs2.jpg' },
    { name: 'Serenity at Whispering Pines Retreat', status: 'Booked', postDate: '12 March 2025', location: '3891 Ranchview Dr. Richardson, California', image: '/page_images/contactUs2.jpg' },
    { name: 'Serenity at Whispering Pines Retreat', status: 'Booked', postDate: '12 March 2025', location: '3891 Ranchview Dr. Richardson, California', image: '/page_images/contactUs2.jpg' },
    { name: 'Serenity at Whispering Pines Retreat', status: 'Booked', postDate: '12 March 2025', location: '3891 Ranchview Dr. Richardson, California', image: '/page_images/contactUs2.jpg' },
    { name: 'Serenity at Whispering Pines Retreat', status: 'Booked', postDate: '12 March 2025', location: '3891 Ranchview Dr. Richardson, California', image: '/page_images/contactUs2.jpg' },
    { name: 'Serenity at Whispering Pines Retreat', status: 'Booked', postDate: '12 March 2025', location: '3891 Ranchview Dr. Richardson, California', image: '/page_images/contactUs2.jpg' },
    { name: 'Serenity at Whispering Pines Retreat', status: 'Booked', postDate: '12 March 2025', location: '3891 Ranchview Dr. Richardson, California', image: '/page_images/contactUs2.jpg' },
    { name: 'Serenity at Whispering Pines Retreat', status: 'Booked', postDate: '12 March 2025', location: '3891 Ranchview Dr. Richardson, California', image: '/page_images/contactUs2.jpg' },
];

const columns: { header: string; accessor: keyof Property; render?: (item: Property) => React.ReactNode, minWidth?: string }[] = [
    {
        header: 'Properties Name',
        accessor: 'name',
        render: (item) => (
            <div className="flex items-center gap-3">
                <Image src={item.image} alt={item.name} width={40} height={40} className="rounded-full object-cover" />
                <span className="font-medium text-gray-900 dark:text-white">{item.name}</span>
            </div>
        ),
        minWidth: '300px'
    },
    {
        header: 'Status',
        accessor: 'status',
        render: (item) => (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.status === 'Booked'
                ? 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200'
                : 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200'}`
            }>
                {item.status}
            </span>
        ),
        minWidth: '120px'
    },
    { header: 'Post Date', accessor: 'postDate', minWidth: '150px' },
    { header: 'Post Date', accessor: 'postDate', minWidth: '150px' },
    { header: 'Post Date', accessor: 'postDate', minWidth: '150px' },
    { header: 'Post Date', accessor: 'postDate', minWidth: '150px' },
    { header: 'Post Date', accessor: 'postDate', minWidth: '150px' },
    { header: 'Properties Location', accessor: 'location', minWidth: '350px' },
];

export default function PropertiesPage() {
    const { setPageTitle, setPageSubtitle } = useDashboard();

    useEffect(() => {
        setPageTitle('My Properties');
        setPageSubtitle('View and manage your property listings.');
    }, [setPageTitle, setPageSubtitle]);

    const renderActions = (item: Property) => (
        <div className="flex items-center justify-end gap-2">
            <Button color="ghost" title="View"><Eye size={18} /></Button>
            <Button color="ghost" title="Edit"><Pencil size={18} /></Button>
            <Button color="ghost" title="Delete" className="text-red-500 hover:text-red-700"><Trash2 size={18} /></Button>
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
                    data={properties}
                    renderActions={renderActions}
                />
            </div>
        </div>
    );
}
