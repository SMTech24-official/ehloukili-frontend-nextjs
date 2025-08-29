/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { submitPropertyFormSchema, SubmitPropertyFormSchema } from '@/schema/submitPropertyForm.schema';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import FileDropzonePreview from '@/components/shared/FileDropzonePreview';
// No Dialog component found, use a simple custom modal
import Spinner from '@/components/ui/Spinner';
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

interface PropertyEditModalProps {
  open: boolean;
  onClose: () => void;
  property: any;
  updateProperty: any;
  setLoading: (loading: boolean) => void;
  setEditOpen: (open: boolean) => void;
  setEditItem: (item: any) => void;
  loading?: boolean;
}

import { toast } from 'sonner';

export default function PropertyEditModal({ open, onClose, property, updateProperty, setLoading, setEditOpen, setEditItem, loading }: PropertyEditModalProps) {
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SubmitPropertyFormSchema>({
    defaultValues: normalizeProperty(property),
    resolver: yupResolver(submitPropertyFormSchema),
    mode: 'onTouched',
  });

  useEffect(() => {
    if (property) {
      reset(normalizeProperty(property));
    }
  }, [property, reset]);

  // Helper to normalize API property to form fields
  function normalizeProperty(property: any): SubmitPropertyFormSchema {
    if (!property) return {} as any;
    return {
      sellerType: property.sellerType || property.seller_type || 'agent',
      firstName: property.firstName || property.first_name || '',
      lastName: property.lastName || property.last_name || '',
      phone: property.phone || property.phone_number || '',
      email: property.email || '',
      listingType: property.listingType || property.listing_type || 'rent',
      propertyType: property.propertyType || property.property_type || 'townhouse',
      address: property.address || property.street_address || '',
      city: property.city || '',
      state: property.state || '',
      zip: property.zip || property.zip_code || '',
      bedrooms: property.bedrooms ?? 3,
      bathrooms: property.bathrooms ?? 3,
      area: property.area || property.unit_area || 250,
      lotSize: property.lotSize || property.lot_area || 300,
      yearBuilt: property.yearBuilt || property.year_built || 2023,
      propertyState: property.propertyState || property.property_status || 'new',
      description: property.description || property.property_description || '',
      features: {
        interior: property.features?.interior || property.interior_features || [],
        exterior: property.features?.exterior || property.exterior_features || [],
      },
      documents: property.documents || [],
      media: property.media || property.photos || [],
      price: property.price ?? 0,
      country: property.country || '',
    };
  }

  // File handlers (optional, can be extended)
  const handleDocFiles = (newFiles: File[]) => {
    const currentDocs = getValues('documents') || [];
    setValue('documents', [...currentDocs, ...newFiles], { shouldValidate: true });
  };
  const handleMediaFiles = (newFiles: File[]) => {
    const currentMedia = getValues('media') || [];
    setValue('media', [...currentMedia, ...newFiles], { shouldValidate: true });
  };
  const handleRemoveDoc = (index: number) => {
    const currentDocs = getValues('documents') || [];
    setValue('documents', currentDocs.filter((_, i) => i !== index), { shouldValidate: true });
  };
  const handleRemoveMedia = (index: number) => {
    const currentMedia = getValues('media') || [];
    setValue('media', currentMedia.filter((_, i) => i !== index), { shouldValidate: true });
  };

  // Edit submit handler (like SubmitPropertyPage)
  const onSubmit = async (values: SubmitPropertyFormSchema) => {
    setLoading(true);
    try {
      const formData = new FormData();
      // Only send changed fields
      const original = normalizeProperty(property);

      // Helper to check if value changed
      const isChanged = (key: keyof SubmitPropertyFormSchema) => {
        if (key === 'documents' || key === 'media') return true; // always check files
        return JSON.stringify(values[key]) !== JSON.stringify(original[key]);
      };

      // Simple fields
      if (isChanged('sellerType')) formData.append('seller_type', values.sellerType);
      if (isChanged('firstName')) formData.append('first_name', values.firstName);
      if (isChanged('lastName')) formData.append('last_name', values.lastName);
      if (isChanged('phone')) formData.append('phone_number', values.phone);
      if (isChanged('email')) formData.append('email', values.email);
      if (isChanged('propertyType')) formData.append('property_type', values.propertyType);
      if (isChanged('country')) formData.append('country', values.country);
      if (isChanged('address')) formData.append('street_address', values.address);
      if (isChanged('city')) formData.append('city', values.city);
      if (isChanged('state')) formData.append('state', values.state);
      if (isChanged('zip')) formData.append('zip_code', values.zip);
      if (isChanged('propertyState')) formData.append('property_status', values.propertyState);
      if (isChanged('bedrooms')) formData.append('bedrooms', values.bedrooms.toString());
      if (isChanged('bathrooms')) formData.append('bathrooms', values.bathrooms.toString());
      if (isChanged('lotSize')) formData.append('lot_area', values.lotSize.toString());
      if (isChanged('area')) formData.append('unit_area', values.area.toString());
      if (isChanged('yearBuilt')) formData.append('year_built', values.yearBuilt.toString());
      if (isChanged('description')) formData.append('property_description', values.description);
      if (isChanged('price')) formData.append('price', values.price.toString());

      // Features (arrays)
      // If user changed features, send new; else, keep original (so backend keeps old)
      if (isChanged('features')) {
        values.features.interior.forEach((feature, index) => {
          formData.append(`interior_features[${index}]`, feature);
        });
        values.features.exterior.forEach((feature, index) => {
          formData.append(`exterior_features[${index}]`, feature);
        });
      } else {
        // If not changed, keep previous features
        (original.features.interior || []).forEach((feature: string, index: number) => {
          formData.append(`interior_features[${index}]`, feature);
        });
        (original.features.exterior || []).forEach((feature: string, index: number) => {
          formData.append(`exterior_features[${index}]`, feature);
        });
      }

      // Documents: send only new files as File, keep existing as is
      const origDocs = (property.documents || []).map((d: any) => d.name);
      const newDocs = (values.documents || []).filter((f: any) => f instanceof File);
      newDocs.forEach((file: File, idx: number) => {
        formData.append(`documents[${idx}]`, file);
      });
      // Keep existing docs (by name)
      origDocs.forEach((name: string, idx: number) => {
        if ((values.documents || []).some((f: any) => f.name === name && !(f instanceof File))) {
          formData.append(`existing_documents[${idx}]`, name);
        }
      });

      // Photos: send only new files as File, keep existing as is
      const origPhotos = (property.photos || []).map((p: any) => p.name);
      const newPhotos = (values.media || []).filter((f: any) => f instanceof File);
      newPhotos.forEach((file: File, idx: number) => {
        formData.append(`photos[${idx}]`, file);
      });
      origPhotos.forEach((name: string, idx: number) => {
        if ((values.media || []).some((f: any) => f.name === name && !(f instanceof File))) {
          formData.append(`existing_photos[${idx}]`, name);
        }
      });

      await updateProperty({ id: property.id, data: formData }).unwrap();
      toast.success('Property updated successfully.');
      setEditOpen(false);
      setEditItem(null);
    } catch (err: any) {
      toast.error(err?.data?.message || 'Failed to update property.');
    }
    setLoading(false);
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 bg-opacity-40">
      <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-lg w-full max-w-2xl p-6 relative max-h-[85vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4">Edit Property</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Controller
            name="sellerType"
            control={control}
            render={({ field }) => (
              <Select {...field} label="Seller Type" options={SELLER_TYPES} error={errors.sellerType?.message} required />
            )}
          />
          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <Select {...field} label="Country" options={allCountry?.map((c: any) => ({ value: c.name, label: c.name }))} error={errors.country?.message} required />
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
              <Input {...field} label="First Name" error={errors.firstName?.message} required />
            )}
          />
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <Input {...field} label="Last Name" error={errors.lastName?.message} required />
            )}
          />
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <Input {...field} label="Phone Number" error={errors.phone?.message} required />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input {...field} label="Email" error={errors.email?.message} required />
            )}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <Input {...field} label="Street Address" error={errors.address?.message} required />
            )}
          />
          <Controller
            name="city"
            control={control}
            render={({ field }) => (
              <Input {...field} label="City" error={errors.city?.message} required />
            )}
          />
          <Controller
            name="state"
            control={control}
            render={({ field }) => (
              <Input {...field} label="State" error={errors.state?.message} required />
            )}
          />
          <Controller
            name="zip"
            control={control}
            render={({ field }) => (
              <Input {...field} label="Zip Code" error={errors.zip?.message} required />
            )}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="font-medium mb-2">Interior Amenities</div>
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
            <div className="font-medium mb-2">Exterior Features</div>
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
        <div>
          <div className="font-medium mb-2">Property Documents</div>
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
        </div>
        <div>
          <div className="font-medium mb-2">Photos & Media</div>
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
        </div>
        <div className="flex justify-end gap-2 mt-6">
          <Button type="button" color="ghost" onClick={onClose} disabled={loading || isSubmitting}>Cancel</Button>
          <Button type="submit" className="!text-white" isLoading={loading || isSubmitting} disabled={loading || isSubmitting}>
            {loading || isSubmitting ? <Spinner size={18} className="mr-2" /> : null}
            Save Changes
          </Button>
        </div>
        </form>
      </div>
    </div>
  );
}
