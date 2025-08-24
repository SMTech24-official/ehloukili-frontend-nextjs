
'use client';

import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { Heading, Text } from '@/components/ui/Typography';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import Image from 'next/image';

// Dynamic import for map components to avoid SSR issues
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

const officeCoords = [40.58306, -73.96436]; // Example: Coney Island, NY

export default function ContactUsPage() {
	const [form, setForm] = useState({
		firstName: '',
		lastName: '',
		phone: '',
		email: '',
		message: '',
	});

	useEffect(() => {
		if (typeof window !== 'undefined') {
			import('leaflet').then((L) => {
				const DefaultIcon = L.Icon.Default.prototype as unknown as { _getIconUrl?: () => void };
				delete DefaultIcon._getIconUrl;
				L.Icon.Default.mergeOptions({
					iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
					iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
					shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
				});
			});
		}
	}, []);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// TODO: Integrate API call
		alert('Message sent!');
	};

	return (
		<main className="container mx-auto px-4 py-8 max-w-7xl md:pt-20 pt-10">
			{/* Heading */}
			<div className="text-center mb-10 flex flex-col gap-4 justify-center items-center">
				<Heading level={3} className="text-3xl md:text-4xl font-bold mb-2">Contact Us</Heading>
			<Text color="muted" className="text-lg !text-center">Have questions about our services? We&apos;re here to help. Reach out to our <br /> team for more information.</Text>
			</div>

			{/* Form & Illustration */}
			<div className="grid md:grid-cols-5 gap-8 mb-16 items-center">
				{/* Contact Form */}
				<form onSubmit={handleSubmit} className="bg-white col-span-3 rounded-lg px-8 shadow-sm py-4 space-y-5">
					<Heading level={5} className="text-xl font-semibold mb-4">Send Us a Message</Heading>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<Input label="First Name" name="firstName" value={form.firstName} onChange={handleChange} placeholder="Enter First name" required autoComplete="given-name" />
						<Input label="Last Name" name="lastName" value={form.lastName} onChange={handleChange} placeholder="Enter Last name" required autoComplete="family-name" />
					</div>
					<Input label="Phone Number" name="phone" value={form.phone} onChange={handleChange} placeholder="Enter Phone Number" required autoComplete="tel" />
					<Input label="Email" name="email" value={form.email} onChange={handleChange} placeholder="Enter Email" required autoComplete="email" />
								<div>
									<label htmlFor="contact-message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
									<textarea
										id="contact-message"
										name="message"
										value={form.message}
										onChange={handleChange}
										placeholder="Enter Message"
										required
										rows={4}
										className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
									/>
								</div>
					<Button type="submit" className="w-full !text-white">Send Message</Button>
				</form>
				{/* Illustration */}
				<div className="flex justify-center items-center col-span-2">
					<Image src="/page_images/contactUs.svg" alt="Contact illustration" width={350} height={250} className="object-contain max-h-72" />
				</div>
			</div>

			{/* Info & Map Section */}
			<div className="grid md:grid-cols-5 gap-8 items-start">
				{/* Contact Info */}
				<div className='col-span-2'>
					<div className="mb-6 rounded-lg overflow-hidden">
						<Image src="/page_images/contactUs2.jpg" alt="Office" width={500} height={250} className="object-cover w-full h-48" />
					</div>
					<Heading level={5} className="mb-4">Contact Information</Heading>
					<ul className="space-y-3 text-base">
						<li className="flex items-center gap-3">
							<Mail className="w-5 h-5 text-primary-600" />
							<span>info@ejuwest.com</span>
						</li>
						<li className="flex items-center gap-3">
							<Phone className="w-5 h-5 text-primary-600" />
							<span>+01234567890</span>
						</li>
						<li className="flex items-center gap-3">
							<MapPin className="w-5 h-5 text-primary-600" />
							<span>123 Hedding Street Suite 455 San Francisco, CA 94103</span>
						</li>
						<li className="flex items-start gap-3">
							<Clock className="w-5 h-5 text-primary-600 mt-1" />
							<span>
								<span>Monday - Friday: 9am - 5pm PST<br /></span>
								<span>Saturday - Sunday: Closed</span>
							</span>
						</li>
					</ul>
				</div>
				{/* Map */}
				<div className="rounded-lg overflow-hidden h-64 md:h-92 col-span-3">
					{typeof window !== 'undefined' && (
						<MapContainer
							center={officeCoords as [number, number]}
							zoom={13}
							style={{ height: '100%', width: '100%' }}
							className="rounded-lg"
						>
							<TileLayer
								url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
								attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
							/>
							<Marker position={officeCoords as [number, number]}>
								<Popup>
									<div className="text-center">
										<strong>Dometerra Office</strong>
										<br />123 Hedding Street Suite 455<br />San Francisco, CA 94103
									</div>
								</Popup>
							</Marker>
						</MapContainer>
					)}
					{typeof window === 'undefined' && (
						<div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
							<Text color="muted">Loading map...</Text>
						</div>
					)}
				</div>
			</div>
		</main>
	);
}
