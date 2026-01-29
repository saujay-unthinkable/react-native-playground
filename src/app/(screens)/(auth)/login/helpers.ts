import { REGEX } from "@/constants";

export const getPhoneNumberError = (num: string) => {
  const phoneNumber = num?.trim();

  if (!phoneNumber?.length) {
    return "Phone number cannot be empty.";
  }

  return REGEX.PHONE_NUMBER.test(phoneNumber) ? "" : "Invalid phone number.";
};
