import {
  StyledBrandView,
  StyledFormView,
  StyledMobileInfoView,
  StyledNavigationBarView,
} from "@/app-screens/styles/otp-screen";
import { StyledPageWrapper, StyledSafeAreaView } from "@/helpers/styles";
import { useAuth } from "@/services/context/auth";
import Button from "@/ui/button";
import Icon from "@/ui/icon";
import OtpInput from "@/ui/otp-input";
import Text from "@/ui/text";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";

const Otp = () => {
  const params = useLocalSearchParams();
  const router = useRouter();
  const { authenticateUser } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  console.log("[Params]:", params);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await authenticateUser("accessToken", "refreshToken");
    } catch (error) {
      console.error("Error during authentication:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <StyledSafeAreaView backgroundColor="color-neutral-300">
      <StyledPageWrapper spacingHorizontal="none">
        <StyledBrandView></StyledBrandView>
        <StyledFormView>
          <StyledNavigationBarView>
            <Icon name="arrow-left" onPress={() => router.back()} />
            <Text i18n="OTP Verification" spacingLeft="md" />
          </StyledNavigationBarView>
          <StyledMobileInfoView>
            <Text
              i18n={`We've Sent A 6 Digit Code To ${params?.mobileNumber}`}
              variant="body_xs.regular"
              color="color-neutral-600"
            ></Text>
            <Text i18n="Change" variant="body_xs.regular"></Text>
          </StyledMobileInfoView>
          <OtpInput />
          <Button i18n="Submit" onPress={handleSubmit} loading={isSubmitting} />
        </StyledFormView>
      </StyledPageWrapper>
    </StyledSafeAreaView>
  );
};

export default Otp;
