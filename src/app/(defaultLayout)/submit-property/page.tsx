
'use client';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Heading, Text } from '@/components/ui/Typography';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import FileDropzonePreview from '@/components/shared/FileDropzonePreview';
import { submitPropertyFormSchema, SubmitPropertyFormSchema } from '@/schema/submitPropertyForm.schema';
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
};

export default function SubmitPropertyPage() {
	const {
		control,
		handleSubmit,
		setValue,
		formState: { errors, isSubmitting },
	} = useForm<SubmitPropertyFormSchema>({
		defaultValues,
		resolver: yupResolver(submitPropertyFormSchema),
		mode: 'onTouched',
	});

	// Interactive: update form state on file drop
	const handleDocFiles = (files: File[]) => {
		setValue('documents', files);
	};
	const handleMediaFiles = (files: File[]) => {
		setValue('media', files);
	};

	const onSubmit = async () => {
		await new Promise((res) => setTimeout(res, 1200));
		alert('Property submitted!');
	};

	return (
		<main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl md:pt-20 pt-10">
			<div className="text-center mb-10 lg:mb-16">
				<Heading level={3} className="text-3xl md:text-4xl font-bold mb-2">Submit Your Property</Heading>
				<Text color="muted" className="text-lg !text-center">Take the first step towards stress-free hosting and maximizing your rental income.</Text>
			</div>
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
				{/* Contact Information */}
				<section className="border-b border-b-gray-100 pb-8">
					<Heading level={5} className="text-lg font-semibold mb-4">Contact Information</Heading>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
					<div className='col-span-2'>
                        	<Controller
							name="sellerType"
							control={control}
							render={({ field }) => (
								<Select {...field} label="Seller Type" options={SELLER_TYPES} error={errors.sellerType?.message} required />
							)}
						/>
                    </div>
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

				{/* Property Information */}
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

				{/* Property Details */}
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

				{/* Features & Amenities */}
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


				{/* Property Document */}
				<section className="border-b border-b-gray-100 pb-8">
					<Heading level={5} className="text-lg font-semibold mb-4">Property Document</Heading>
					<Controller
						name="documents"
						control={control}
						render={({ field }) => (
							<FileDropzonePreview
								label="Upload property documents"
								onFiles={files => { field.onChange(files); handleDocFiles(files); }}
								files={field.value}
								multiple
								accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
								fileLabelPrefix="Property Document"
							/>
						)}
					/>
				</section>

				{/* Photos & Media */}
				<section>
					<Heading level={5} className="text-lg font-semibold mb-4">Photos & Media</Heading>
					<Controller
						name="media"
						control={control}
						render={({ field }) => (
							<FileDropzonePreview
								label="Upload property photos and media"
								onFiles={files => { field.onChange(files); handleMediaFiles(files); }}
								files={field.value}
								multiple
								accept="image/*,video/*"
								fileLabelPrefix="Property Photo"
							/>
						)}
					/>
				</section>

				<Button type="submit" className="w-full !text-white mt-8" disabled={isSubmitting} isLoading={isSubmitting}>
					Submit My Property
				</Button>
			</form>
		</main>
	);
}
