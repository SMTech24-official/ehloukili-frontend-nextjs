import Image from "next/image";
import { useRouter } from "next/navigation";
import { Property } from "../pages/sale/SalePropertiesGrid";
import { Heading, Text } from "../ui/Typography";

export const PropertyListItem: React.FC<Property> = ({
    id,
    title,
    address,
    price,
    badge,
    bedrooms,
    bathrooms,
    sqft,
    imageUrl,
    location,
    propertyType,
    status,
}) => {
    const router = useRouter();

    return (
        <div
            onClick={() => router.push(`/property/${id}`)}
            className="flex items-center gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow bg-white dark:bg-[var(--color-neutral-800)]">
            <div className="w-32 h-24 relative">
                <Image src={imageUrl} alt={title} height={96} width={128} className="w-full h-full object-cover rounded" />
                {badge && (
                    <span className="absolute top-2 left-2 px-2 py-1 text-xs font-medium text-white bg-teal-500 rounded">
                        {badge}
                    </span>
                )}
            </div>
            <div className="flex-1">
                <Heading level={5} className="mb-1">{title}</Heading>
                <Text size="sm" color="muted">{address}, {location}</Text>
                <Text size="lg" className="font-semibold text-teal-600 dark:text-teal-400">{price}</Text>
                <div className="flex gap-4 mt-2 text-sm text-gray-600 dark:text-gray-300">
                    <span>{bedrooms} Beds</span>
                    <span>{bathrooms} Baths</span>
                    <span>{sqft} sqft</span>
                    <span>{propertyType}</span>
                    <span className="capitalize">{status}</span>
                </div>
            </div>
        </div>
    );
};