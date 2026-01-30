import { OtpInput as RNOtpInput } from "react-native-otp-entry";

const OtpInput = () => (
  <RNOtpInput numberOfDigits={6} onTextChange={(text) => console.log(text)} />
);

export default OtpInput;
