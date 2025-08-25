
import React from "react";
import { Hash, LucideMapPin } from "lucide-react";
import Image from "next/image";
import Typography from "../ui/Typography";

interface PropertyProfileHeaderProps {
  imageUrl: string;
  title: string;
  id: string;
  address: string;
}

const DetailsProfileHeader: React.FC<PropertyProfileHeaderProps> = ({
  imageUrl,
  title,
  id,
  address,
}) => (
  <div className="flex items-center gap-6 pb-4 border-b border-gray-100 border-muted">
    <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
      <Image
        src={imageUrl}
        alt={title}
        width={96}
        height={96}
        className="object-cover w-full h-full"
      />
    </div>
    <div className="flex flex-col gap-1">
      <Typography.Heading level={4} className="text-2xl font-bold text-foreground dark:text-foreground">
        {title}
      </Typography.Heading>
      <div className="space-y-2 text-muted-foreground text-sm">
        <span className="flex items-center gap-1">
          <Hash   className="w-4 h-4 text-primary" />
          <Typography.Text size="sm" as="span" className="inline">
            {id}
          </Typography.Text>
        </span>
        <span className="flex items-center gap-1">
          <LucideMapPin className="w-4 h-4 text-primary" />
          <Typography.Text size="sm" as="span" className="inline">
            {address}
          </Typography.Text>
        </span>
      </div>
    </div>
  </div>
);

export default DetailsProfileHeader;
