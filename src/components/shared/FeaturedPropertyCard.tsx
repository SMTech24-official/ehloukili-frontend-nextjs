'use client'
import { Bath, Bed, LocateFixedIcon, Square } from "lucide-react";
import Image from "next/image";
import { Heading, Text } from '@/components/ui/Typography';
import { useRouter } from "next/navigation";

interface FeaturedPropertyCardProps {
    id: string;
    title: string;
    address: string;
    price: string;
    badge: 'For Sale' | 'For Rent';
    bedrooms: number;
    bathrooms: number;
    sqft: number;
    imageUrl: string;
}

const FeaturedPropertyCard: React.FC<FeaturedPropertyCardProps> = ({
    id,
    title,
    address,
    price,
    badge,
    bedrooms,
    bathrooms,
    sqft,
    imageUrl,
}) => {
    const router = useRouter();
    return (
        <div
            onClick={() => router.push(`/property/${id}`)}
            className="group cursor-pointer bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden min-w-[18rem]">
            <div className="relative h-60 overflow-hidden">
                <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${badge === 'For Sale'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-blue-100 text-blue-700'
                        }`}>
                        {badge}
                    </span>
                </div>
            </div>
            <div className="p-5">
                <Heading level={5} className="mb-1 line-clamp-1" weight="semibold">
                    {title}
                </Heading>
                <div className="flex items-center gap-1 mb-3 border-b border-[var(--color-neutral-100)] pb-3 ">
                    <LocateFixedIcon className="w-4 h-4" />
                    <Text size="sm" color="light" className="line-clamp-1">
                        {address}
                    </Text>
                </div>

                <div className='flex flex-wrap justify-between items-center'>
                    <div className="flex items-center gap-4 mb-3">
                        <div className="flex items-center gap-1">
                            <Bed className="w-4 h-4" />
                            <Text size="sm" color="muted">
                                {bedrooms}
                            </Text>
                        </div>
                        <div className="flex items-center gap-1">
                            <Bath className="w-4 h-4" />
                            <Text size="sm" color="muted">
                                {bathrooms}
                            </Text>
                        </div>
                        <div className="flex items-center gap-1">
                            <Square className="w-4 h-4" />
                            <Text size="sm" color="muted">
                                {sqft.toLocaleString()}
                            </Text>
                        </div>
                    </div>

                    <Text size="xl" weight="bold" color="secondary">
                        {price}
                    </Text>
                </div>
            </div>
        </div>
    );
};

export default FeaturedPropertyCard;