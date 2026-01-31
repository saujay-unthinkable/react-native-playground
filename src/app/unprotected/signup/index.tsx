import { POST_SIGNUP_OTP_REQUEST } from "@/constants/api-endpoints";
import { StyledPageWrapper, StyledSafeAreaView } from "@/helpers/styles";
import { usePost } from "@/hooks/use-https";
import Button from "@/ui/button";
import Text from "@/ui/text";
import TextInput from "@/ui/text-input";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { getPhoneNumberError } from "../../../app-screens/helpers/login-screen";
import {
  StyledBrandView,
  StyledFormView,
  StyledSignupView,
} from "../../../app-screens/styles/signup-screen";

const Signup = () => {
  const router = useRouter();
  const [mobileNumber, setMobileNumber] = useState("+91");
  const [mobileNumberError, setMobileNumberError] = useState("");

  const {
    data: requestOtpData,
    error: requestOtpError,
    loading: requestOtpLoading,
    execute: requestOtp,
  } = usePost(POST_SIGNUP_OTP_REQUEST, {
    lazy: true,
  });

  const validateInput = (num: string, updateError = false) => {
    const error = getPhoneNumberError(num);

    if (updateError) {
      setMobileNumberError(error);
    }

    return !!error;
  };

  const handleChange = (text: string) => {
    const num = text?.trim();
    setMobileNumber(num);
    validateInput(num, true);
  };

  const handleSubmit = async () => {
    if (validateInput(mobileNumber)) {
      return;
    }

    // await requestOtp({
    //   mobile: mobileNumber,
    // });

    router.push({
      pathname: "/unprotected/otp",
      params: {
        mobileNumber,
      },
    });
  };

  const isDisabled = useMemo(() => validateInput(mobileNumber), [mobileNumber]);

  console.log("[Request OTP]:", requestOtpError, requestOtpData);

  return (
    <StyledSafeAreaView backgroundColor="color-neutral-200">
      <StyledPageWrapper spacingHorizontal="none">
        <StyledSignupView>
          <StyledBrandView></StyledBrandView>
          <StyledFormView>
            <Text
              i18n="Help Us With Your Contact"
              variant="h4.regular"
              spacingBottom="xxxxl"
              spacingTop="md"
            />
            <TextInput
              value={mobileNumber}
              i18nLabel="Enter Your Mobile No."
              inputMode="tel"
              labelVariant="body_xs.regular"
              marginBottom="xxxl"
              i18nErrorMessage={mobileNumberError}
              onChangeText={handleChange}
            />

            <Button
              disabled={isDisabled}
              spacingBottom={12}
              loading={requestOtpLoading}
              onPress={handleSubmit}
            >
              Get OTP
            </Button>
            <Text
              i18n="By continuing you are agreeing to Speedia's terms of use and privacy policy"
              variant="body_xs.regular"
              color="color-neutral-1000"
            ></Text>
          </StyledFormView>
        </StyledSignupView>
      </StyledPageWrapper>
    </StyledSafeAreaView>
  );
};

export default Signup;
