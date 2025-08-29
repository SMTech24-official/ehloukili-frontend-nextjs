
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import FileDropzonePreview from '@/components/shared/FileDropzonePreview';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Spinner from '@/components/ui/Spinner';
import { Heading, Text } from '@/components/ui/Typography';
import { useCreatePropertyMutation } from '@/redux/api/propertiesApi';
import { submitPropertyFormSchema, SubmitPropertyFormSchema } from '@/schema/submitPropertyForm.schema';
import { geocodeAddress } from '@/utils/geocode';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { allCountry } from '../../../../public/data/countries';

const SELLER_TYPES = [
	{ value: 'agent', label: 'Agent' },
	{ value: 'owner', label: 'Owner' },
	{ value: 'builder', label: 'Builder' },
];
const LISTING_TYPES = [
	{ value: 'rent', label: 'Rent' },
	{ value: 'sale', label: 'Sale' },
];
const PROPERTY_TYPES = [
	{ value: 'townhouse', label: 'Town House' },
	{ value: 'apartment', label: 'Apartment' },
	{ value: 'villa', label: 'Villa' },
	{ value: 'condo', label: 'Condo' },
];
const PROPERTY_STATES = [
	{ value: 'new', label: 'New' },
	{ value: 'used', label: 'Used' },
];
const INTERIOR_AMENITIES = [
	'Air Conditioning',
	'Walk-in Closet',
	'Laundry Room',
	'Furnished',
	'Heating',
	'Fireplace',
	'Smart Home System',
	'Equipped Kitchen',
];
const EXTERIOR_FEATURES = [
	'Garden',
	'Swimming Pool',
	'Security 24/7',
	'Event Room',
	'Terrace/Balcony',
	'Parking Space',
	'Gym',
	'Pet Friendly',
];

const defaultValues: SubmitPropertyFormSchema = {
	sellerType: 'agent',
	firstName: '',
	lastName: '',
	phone: '',
	email: '',
	listingType: 'rent',
	propertyType: 'townhouse',
	address: '',
	city: '',
	state: '',
	zip: '',
	bedrooms: 3,
	bathrooms: 3,
	area: 250,
	lotSize: 300,
	yearBuilt: 2023,
	propertyState: 'new',
	description: '',
	features: { interior: [], exterior: [] },
	documents: [],
	media: [],
	price: 0,
	country: '',
};

export default function SubmitPropertyPage() {
	const [createProperty, { isLoading }] = useCreatePropertyMutation();
	const {
		control,
		handleSubmit,
		setValue,
		getValues,
		formState: { errors, isSubmitting },
	} = useForm<SubmitPropertyFormSchema>({
		defaultValues,
		resolver: yupResolver(submitPropertyFormSchema),
		mode: 'onTouched',
	});

	const router = useRouter();

	const handleDocFiles = useCallback((newFiles: File[]) => {
		const currentDocs = getValues('documents') || [];
		const uniqueFiles = newFiles.filter(
			newFile => !currentDocs.some(doc => doc.name === newFile.name && doc.size === newFile.size)
		);
		if (uniqueFiles.length < newFiles.length) {
			toast.warning('Duplicate files were ignored.');
		}
		setValue('documents', [...currentDocs, ...uniqueFiles], { shouldValidate: true });
	}, [getValues, setValue]);

	const handleMediaFiles = useCallback((newFiles: File[]) => {
		const currentMedia = getValues('media') || [];
		const uniqueFiles = newFiles.filter(
			newFile => !currentMedia.some(media => media.name === newFile.name && media.size === newFile.size)
		);
		if (uniqueFiles.length < newFiles.length) {
			toast.warning('Duplicate files were ignored.');
		}
		setValue('media', [...currentMedia, ...uniqueFiles], { shouldValidate: true });
	}, [getValues, setValue]);

	const handleRemoveDoc = useCallback((index: number) => {
		const currentDocs = getValues('documents') || [];
		setValue('documents', currentDocs.filter((_, i) => i !== index), { shouldValidate: true });
	}, [getValues, setValue]);

	const handleRemoveMedia = useCallback((index: number) => {
		const currentMedia = getValues('media') || [];
		setValue('media', currentMedia.filter((_, i) => i !== index), { shouldValidate: true });
	}, [getValues, setValue]);

	const onSubmit = async (values: SubmitPropertyFormSchema) => {
		try {
			const geo = await geocodeAddress(values.address, values.city, values.state, '').catch(err => {
				console.error('Geocode error:', err);
				return { lat: null, lng: null };
			});
			const lat = geo?.lat ?? null;
			const lng = geo?.lng ?? null;

			const formData = new FormData();
			if (values.sellerType === 'agent') {
				formData.append('agent_name', `${values.firstName} ${values.lastName}`);
			}
			formData.append('first_name', values.firstName);
			formData.append('last_name', values.lastName);
			formData.append('phone_number', values.phone);
			formData.append('email', values.email);
			formData.append('property_type', values.propertyType);
			formData.append('country', values.country);
			formData.append('street_address', values.address);
			formData.append('listing_type', values.listingType);
			formData.append('city', values.city);
			formData.append('state', values.state);
			formData.append('zip_code', values.zip);
			formData.append('property_status', values.propertyState);
			formData.append('bedrooms', values.bedrooms.toString());
			formData.append('bathrooms', values.bathrooms.toString());
			formData.append('lot_area', values.lotSize.toString());
			formData.append('unit_area', values.area.toString());
			formData.append('year_built', values.yearBuilt.toString());
			formData.append('property_description', values.description);
			values.features.interior.forEach((feature, index) => {
				formData.append(`interior_features[${index}]`, feature);
			});
			values.features.exterior.forEach((feature, index) => {
				formData.append(`exterior_features[${index}]`, feature);
			});
			values.documents.forEach((file, index) => {
				formData.append(`documents[${index}]`, file);
			});
			values.media.forEach((file, index) => {
				formData.append(`photos[${index}]`, file);
			});
			if (lat !== null) formData.append('latitude', lat.toString());
			if (lng !== null) formData.append('longitude', lng.toString());
			formData.append('price', values.price.toString());

			// Debug FormData contents
			for (const [key, value] of formData.entries()) {
				console.log(`${key}: ${value instanceof File ? value.name : value}`);
			}

			await createProperty(formData).unwrap();
			toast.success(
				<div className="flex items-center gap-3">
					<span className="text-green-600">
						<svg width="32" height="32" fill="none" viewBox="0 0 24 24">
							<circle cx="12" cy="12" r="10" fill="#DCFCE7" />
							<path d="M8 12.5l2.5 2.5L16 9.5" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
					</span>
					<span className="text-base font-semibold">Property submitted successfully!</span>
				</div>,
				{ duration: 4000 }
			);
			router.push('/agent/properties');
		} catch (err: any) {
			toast.error(
				<div className="flex items-center gap-3">
					<span className="text-red-600">
						<svg width="32" height="32" fill="none" viewBox="0 0 24 24">
							<circle cx="12" cy="12" r="10" fill="#FEE2E2" />
							<path d="M9 9l6 6m0-6l-6 6" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
					</span>
					{/* write the valid error message */}
					<span className="text-base font-semibold">{err.message || 'Failed to submit property. Please try again.'}</span>
				</div>,
				{ duration: 4000 }
			);
		}
	};

	return (
		<main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl md:pt-20 pt-10">
			<div className="text-center mb-10 lg:mb-16">
				<Heading level={3} className="text-3xl md:text-4xl font-bold mb-2">Submit Your Property</Heading>
				<Text color="muted" className="text-lg !text-center">Take the first step towards stress-free hosting and maximizing your rental income.</Text>
			</div>
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
				{Object.keys(errors).length > 0 && (
					<div className="text-red-500" role="alert">
						Please fix the following errors:
						<ul>
							{Object.entries(errors).map(([key, error]) => (
								<li key={key}>{key}: {error.message}</li>
							))}
						</ul>
					</div>
				)}
				<section className="border-b border-b-gray-100 pb-8">
					<Heading level={5} className="text-lg font-semibold mb-4">Contact Information</Heading>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
						<div className="col-span-2">
							<Controller
								name="sellerType"
								control={control}
								render={({ field }) => (
									<Select {...field} label="Seller Type" options={SELLER_TYPES} error={errors.sellerType?.message} required />
								)}
							/>
						</div>
						<Controller
							name="country"
							control={control}
							render={({ field }) => (
								<Select
									{...field}
									label="Country"
									options={allCountry?.map((c: any) => ({ value: c.name, label: c.name }))}
									error={errors.country?.message}
									required
								/>
							)}
						/>
						<Controller
							name="price"
							control={control}
							render={({ field }) => (
								<Input {...field} type="number" label="Price" error={errors.price?.message} required min={0} />
							)}
						/>
						<Controller
							name="firstName"
							control={control}
							render={({ field }) => (
								<Input {...field} label="First Name" placeholder="Enter First name" error={errors.firstName?.message} required autoComplete="given-name" />
							)}
						/>
						<Controller
							name="lastName"
							control={control}
							render={({ field }) => (
								<Input {...field} label="Last Name" placeholder="Enter Last Name" error={errors.lastName?.message} required autoComplete="family-name" />
							)}
						/>
						<Controller
							name="phone"
							control={control}
							render={({ field }) => (
								<Input {...field} label="Phone Number" placeholder="Enter Phone Number" error={errors.phone?.message} required autoComplete="tel" />
							)}
						/>
						<Controller
							name="email"
							control={control}
							render={({ field }) => (
								<Input {...field} label="Email" placeholder="Enter Email" error={errors.email?.message} required autoComplete="email" />
							)}
						/>
					</div>
				</section>
				<section className="border-b border-b-gray-100 pb-8">
					<Heading level={5} className="text-lg font-semibold mb-4">Property Information</Heading>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
						<Controller
							name="listingType"
							control={control}
							render={({ field }) => (
								<Select {...field} label="Listing Type" options={LISTING_TYPES} error={errors.listingType?.message} required />
							)}
						/>
						<Controller
							name="propertyType"
							control={control}
							render={({ field }) => (
								<Select {...field} label="Property Type" options={PROPERTY_TYPES} error={errors.propertyType?.message} required />
							)}
						/>
						<Controller
							name="address"
							control={control}
							render={({ field }) => (
								<Input {...field} label="Street Address" placeholder="Enter Street Address" error={errors.address?.message} required autoComplete="address-line1" />
							)}
						/>
						<Controller
							name="city"
							control={control}
							render={({ field }) => (
								<Input {...field} label="City" placeholder="Enter City" error={errors.city?.message} required autoComplete="address-level2" />
							)}
						/>
						<Controller
							name="state"
							control={control}
							render={({ field }) => (
								<Input {...field} label="State" placeholder="Enter State" error={errors.state?.message} required autoComplete="address-level1" />
							)}
						/>
						<Controller
							name="zip"
							control={control}
							render={({ field }) => (
								<Input {...field} label="Zip Code" placeholder="Enter Zip Code" error={errors.zip?.message} required autoComplete="postal-code" />
							)}
						/>
					</div>
				</section>
				<section className="border-b border-b-gray-100 pb-8">
					<Heading level={5} className="text-lg font-semibold mb-4">Property Details</Heading>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
						<Controller
							name="bedrooms"
							control={control}
							render={({ field }) => (
								<Input {...field} type="number" label="Bedrooms" error={errors.bedrooms?.message} required min={0} />
							)}
						/>
						<Controller
							name="bathrooms"
							control={control}
							render={({ field }) => (
								<Input {...field} type="number" label="Bathrooms" error={errors.bathrooms?.message} required min={0} />
							)}
						/>
						<Controller
							name="area"
							control={control}
							render={({ field }) => (
								<Input {...field} type="number" label="Unit Area (m²)" error={errors.area?.message} required min={0} />
							)}
						/>
						<Controller
							name="lotSize"
							control={control}
							render={({ field }) => (
								<Input {...field} type="number" label="Lot Area (m²)" error={errors.lotSize?.message} required min={0} />
							)}
						/>
						<Controller
							name="propertyState"
							control={control}
							render={({ field }) => (
								<Select {...field} label="State" options={PROPERTY_STATES} error={errors.propertyState?.message} required />
							)}
						/>
						<Controller
							name="yearBuilt"
							control={control}
							render={({ field }) => (
								<Input {...field} type="number" label="Year Built" error={errors.yearBuilt?.message} required min={1800} max={new Date().getFullYear()} />
							)}
						/>
					</div>
					<Controller
						name="description"
						control={control}
						render={({ field }) => (
							<textarea
								{...field}
								className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent min-h-[60px]"
								placeholder="Enter Property Description"
								required
								rows={2}
							/>
						)}
					/>
				</section>
				<section className="border-b border-b-gray-100 pb-8">
					<Heading level={5} className="text-lg font-semibold mb-4">Features & Amenities</Heading>
					<div className="grid grid-cols-1 gap-8">
						<div>
							<Text className="font-medium mb-2">Interior Amenities</Text>
							<div className="grid grid-cols-2 gap-2">
								{INTERIOR_AMENITIES.map((item) => (
									<Controller
										key={item}
										name="features.interior"
										control={control}
										render={({ field }) => (
											<label className="flex items-center gap-2 cursor-pointer">
												<input
													type="checkbox"
													checked={field.value?.includes(item) || false}
													onChange={e => {
														const checked = e.target.checked;
														const newValue = checked
															? [...(field.value || []), item]
															: (field.value || []).filter((v: string) => v !== item);
														field.onChange(newValue);
													}}
												/>
												<span>{item}</span>
											</label>
										)}
									/>
								))}
							</div>
						</div>
						<div>
							<Text className="font-medium mb-2">Exterior Features</Text>
							<div className="grid grid-cols-2 gap-2">
								{EXTERIOR_FEATURES.map((item) => (
									<Controller
										key={item}
										name="features.exterior"
										control={control}
										render={({ field }) => (
											<label className="flex items-center gap-2 cursor-pointer">
												<input
													type="checkbox"
													checked={field.value?.includes(item) || false}
													onChange={e => {
														const checked = e.target.checked;
														const newValue = checked
															? [...(field.value || []), item]
															: (field.value || []).filter((v: string) => v !== item);
														field.onChange(newValue);
													}}
												/>
												<span>{item}</span>
											</label>
										)}
									/>
								))}
							</div>
						</div>
					</div>
				</section>
				<section className="border-b border-b-gray-100 pb-8">
					<Heading level={5} className="text-lg font-semibold mb-4">Property Document</Heading>
					<Controller
						name="documents"
						control={control}
						render={({ field }) => (
							<FileDropzonePreview
								label="Upload property documents"
								onFiles={handleDocFiles}
								onRemoveFile={handleRemoveDoc}
								files={field.value}
								multiple
								accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
								fileLabelPrefix="Property Document"
							/>
						)}
					/>
				</section>
				<section>
					<Heading level={5} className="text-lg font-semibold mb-4">Photos & Media</Heading>
					<Controller
						name="media"
						control={control}
						render={({ field }) => (
							<FileDropzonePreview
								label="Upload property photos and media"
								onFiles={handleMediaFiles}
								onRemoveFile={handleRemoveMedia}
								files={field.value}
								multiple
								accept="image/*,video/*"
								fileLabelPrefix="Property Photo"
							/>
						)}
					/>
				</section>
				<Button type="submit" className="w-full !text-white mt-8" disabled={isSubmitting || isLoading} isLoading={isSubmitting || isLoading}>
					{(isSubmitting || isLoading) ? (
						<>
							<Spinner size={20} className="mr-2" />
							Submitting...
						</>
					) : (
						'Submit My Property'
					)}
				</Button>
			</form>
		</main>
	);
}