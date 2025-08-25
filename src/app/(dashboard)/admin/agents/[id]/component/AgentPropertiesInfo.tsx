'use client'

import ConfirmModal from "@/components/shared/ConfirmModal";
import { Table } from "@/components/shared/Table";
import Button from "@/components/ui/Button";
import { Eye, Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";


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


const AgentPropertiesInfo = () => {

    const router = useRouter();


    const [confirmOpen, setConfirmOpen] = useState(false);
    const [deletingItem, setDeletingItem] = useState<Property | null>(null);

    const handleDeleteClick = (item: Property) => {
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

    const renderActions = (item: Property) => (
        <div className="flex items-center justify-end gap-2 flex-wrap">
            <Button onClick={() => router.push(`/admin/properties/${1}`)} color="ghost" title="View"><Eye size={18} /></Button>
            <Button color="ghost" title="Edit"><Pencil size={18} /></Button>
            <Button color="ghost" title="Delete" className="text-red-500 hover:text-red-700" onClick={() => handleDeleteClick(item)}><Trash2 size={18} /></Button>
                {/* accept reject select field action */}
            <select className="border border-gray-300 rounded-md p-0.5">
                <option value="">Select Action</option>
                <option value="accept">Accept</option>
                <option value="reject">Reject</option>
            </select>
        </div>
    );

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
        { header: 'Properties Location', accessor: 'location', minWidth: '350px' },
    ];

    return (
        <div>
            <div className='overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 w-full'>
                <Table
                    columns={columns}
                    data={properties}
                    renderActions={renderActions}
                />
            </div>
            <ConfirmModal
                open={confirmOpen}
                title="Delete Property?"
                description={`Are you sure you want to delete "${deletingItem?.name}"? This action cannot be undone.`}
                confirmText="Yes, Delete"
                cancelText="Cancel"
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />
        </div>
    );
};

export default AgentPropertiesInfo;