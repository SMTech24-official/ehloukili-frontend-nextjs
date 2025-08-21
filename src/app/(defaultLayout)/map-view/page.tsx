"use client";
import dynamic from 'next/dynamic';

const MapView = dynamic(() => import('@/features/map/MapView'), { ssr: false });

export default function MapViewPage() {
	return <MapView />;
}

