import * as yup from "yup";

export type PaymentFormSchema = {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  cardType: string;
  country: string;
};

export const paymentFormSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  address: yup.string().required("Address is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  zip: yup.string().required("Zip code is required"),
  phone: yup.string().required("Phone number is required"),
  cardType: yup.string().required("Card type is required"),
  country: yup.string().required("Country is required"),
});