import { ProfileDetail } from "./types";

export const isEmailValid = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const isPincodeValid = (pincode: string) => /^\d{6}$/.test(pincode);

export const isAadhaarValid = (aadhaar: string) => /^\d{12}$/.test(aadhaar);

export const fieldValidators: Partial<
  Record<keyof ProfileDetail, (value: any) => string | undefined>
> = {
  firstName: (v) => (!v?.trim() ? "First name is required" : undefined),
  lastName: (v) => (!v?.trim() ? "Last name is required" : undefined),
  email: (v) =>
    !v?.trim()
      ? "Email is required"
      : !isEmailValid(v)
        ? "Enter a valid email address"
        : undefined,
  gender: (v) => (!v?.trim() ? "Gender is required" : undefined),
  dob: (v) => (!v?.trim() ? "Date of birth is required" : undefined),
  address1: (v) => (!v?.trim() ? "Address line 1 is required" : undefined),
  city: (v) => (!v?.trim() ? "City is required" : undefined),
  state: (v) => (!v?.trim() ? "State is required" : undefined),
  pincode: (v) =>
    !v?.trim()
      ? "Pincode is required"
      : !isPincodeValid(v)
        ? "Enter a valid 6-digit pincode"
        : undefined,
  aadhaar: (v) =>
    !v?.trim()
      ? "Aadhaar number is required"
      : !isAadhaarValid(v)
        ? "Enter a valid 12-digit Aadhaar number"
        : undefined,
};

export const constructProfilePayload = (profileDetail: ProfileDetail) => {
  return {
    first_name: profileDetail.firstName,
    last_name: profileDetail.lastName,
    dob: profileDetail.dob,
    gender: profileDetail.gender,
    email: profileDetail.email,
    adhar_number: profileDetail.aadhaar,
    profile_image: {
      file_name: profileDetail.profileImage?.name,
      mime_type: profileDetail.profileImage?.type,
      base64: profileDetail.profileImage?.base64,
    },
    kyc_document: {
      file_name: profileDetail.kycDocument?.name,
      mime_type: profileDetail.kycDocument?.type,
      base64: profileDetail.kycDocument?.base64,
    },
    address: {
      city: profileDetail.city,
      state: profileDetail.state,
      address_1: profileDetail.address1,
      address_2: profileDetail.address2,
      pincode: profileDetail.pincode,
    },
  };
};
