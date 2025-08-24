
import * as yup from 'yup';

export interface BookingFormValues {
	firstName: string;
	lastName: string;
	address: string;
	city: string;
	state: string;
	zip: string;
	phone1: string;
	phone2: string;
}

export interface PaymentFormValues {
	cardType: string;
	cardNumber: string;
	exp: string;
	cvc: string;
	country: string;
}

export interface PaymentFormSchema extends BookingFormValues, PaymentFormValues {}

export const paymentFormSchema = yup.object().shape({
	firstName: yup.string().required('First name is required'),
	lastName: yup.string().required('Last name is required'),
	address: yup.string().required('Address is required'),
	city: yup.string().required('City is required'),
	state: yup.string().required('State is required'),
	zip: yup.string().required('Zip code is required'),
	phone1: yup.string().required('Phone number is required'),
	phone2: yup.string().required('Phone number is required'),
	cardType: yup.string().required(),
	cardNumber: yup.string().required('Card number is required'),
	exp: yup.string().required('Expiration date is required'),
	cvc: yup.string().required('CVC is required'),
	country: yup.string().required('Country is required'),
});
