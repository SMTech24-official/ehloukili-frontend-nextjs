'use client'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';


interface LogoProps {
    className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "w-52" }) => {
    const router =  useRouter()
    return (
        <Image onClick={() => router.push('/')} src="/logo.svg" alt="Logo" width={40} height={40} priority className={className} />
    );
};

export default Logo;