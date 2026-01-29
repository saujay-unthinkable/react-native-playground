import { PickedFile } from "@/types/media";

export interface ProfileDetail {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  dob: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  pincode: string;
  aadhaar: string;
  profileImage: PickedFile | null;
  kycDocument: PickedFile | null;
}
