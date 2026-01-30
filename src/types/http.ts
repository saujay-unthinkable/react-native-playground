export interface HttpHooksError {
  errMsg: string;
  errResponse: any;
}

export interface HttpHooksResponse<T> {
  loading: boolean;
  data?: HttpResponse<T>;
  execute: (
    args?: unknown,
    url?: string,
  ) => Promise<HttpResponse<T> | undefined>;
  error: string;
  errorDetails: HttpHooksError | null;
  ok?: boolean | null;
}

export interface HttpHooksOptions {
  payload?: unknown;
  params?: object;
  lazy?: boolean;
  sendSdkToken?: boolean;
  arrayFormat?: "indices" | "brackets" | "repeat" | "comma" | undefined;
}

export interface ApiResponse<T> {
  code: number;
  data: T;
  message: string;
}

export type HttpResponse<T> = ApiResponse<T>;

export type ISODateString = string;

export interface FileResource {
  file_name: string;
  file_size_bytes: number;
  mime_type: string;
  url: string;
}

export interface Address {
  id: number;
  address_1: string;
  address_2: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  created_at: ISODateString;
  updated_at: ISODateString;
}

export type Gender = "MALE" | "FEMALE" | "OTHER";

export interface Customer {
  id: string;
  first_name: string;
  last_name: string;
  dob: string; // yyyy-mm-dd
  gender: Gender;
  aadhaar_number: string;
  is_profile_completed: boolean;
  created_at: ISODateString;
}

export type VerificationStatus = "PENDING" | "VERIFIED" | "REJECTED";

export interface User {
  id: string;
  mobile: string;
  email: string;
  is_active: boolean;
  verification_process_status: VerificationStatus;
  verification_notes: string;
  created_at: ISODateString;
  updated_at: ISODateString;
  verified_on?: ISODateString | null;
  declined_on?: ISODateString | null;
}

export interface UserProfileData {
  address: Address;
  customer: Customer;
  kyc_document: FileResource;
  profile_image: FileResource;
  user: User;
}

export type GetProfileResponse = HttpResponse<UserProfileData>;

interface AuthData {
  access: string;
  refresh: string;
}

export interface AuthVerificationResponse {
  data: AuthData;
}
