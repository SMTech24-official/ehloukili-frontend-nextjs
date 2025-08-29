import * as yup from 'yup';

export interface ContactInfo {
  sellerType: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

export interface PropertyInfo {
  listingType: string;
  propertyType: string;
  address: string;
  city: string;
  state: string;
  zip: string;
}

export interface PropertyDetails {
  bedrooms: number;
  bathrooms: number;
  area: number;
  lotSize: number;
  yearBuilt: number;
  propertyState: string;
  description: string;
}


export interface FeaturesAmenities {
  interior: string[];
  exterior: string[];
}

export interface SubmitPropertyFormSchema extends ContactInfo, PropertyInfo, PropertyDetails {
  features: FeaturesAmenities;
  documents: File[];
  media: File[];
  price: number;
  country: string;
  // image: File | null;
}

export const submitPropertyFormSchema: yup.ObjectSchema<SubmitPropertyFormSchema> = yup.object({
  sellerType: yup.string().required('Seller type is required'),
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  phone: yup.string().required('Phone number is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  listingType: yup.string().required('Listing type is required'),
  propertyType: yup.string().required('Property type is required'),
  address: yup.string().required('Street address is required'),
  city: yup.string().required('City is required'),
  state: yup.string().required('State is required'),
  zip: yup.string().required('Zip code is required'),
  bedrooms: yup.number().min(0).required('Bedrooms required'),
  bathrooms: yup.number().min(0).required('Bathrooms required'),
  area: yup.number().min(0).required('Area required'),
  lotSize: yup.number().min(0).required('Lot size required'),
  yearBuilt: yup.number().min(1800).max(new Date().getFullYear()).required('Year built required'),
  propertyState: yup.string().required('Property state is required'),
  description: yup.string().required('Description is required'),
  features: yup.object({
    interior: yup.array().of(yup.string().required()).required(),
    exterior: yup.array().of(yup.string().required()).required(),
  }).required(),
  documents: yup.array().of(yup.mixed<File>().defined()).required(),
  media: yup.array().of(yup.mixed<File>().defined()).required(),
  price: yup.number().min(0).required('Price is required'),
  country: yup.string().required('Country is required'),
  // image: yup.mixed<File>().nullable().required('Image is required'),
});
