import { StyledPageWrapper, StyledSafeAreaView } from "@/helpers/styles";
import Icon from "@/ui/icon";
import OtpInput from "@/ui/otp-input";
import Text from "@/ui/text";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  StyledBrandView,
  StyledFormView,
  StyledMobileInfoView,
  StyledNavigationBarView,
} from "./styles";

const Otp = () => {
  const params = useLocalSearchParams();
  const router = useRouter();
  console.log("[Params]:", params);

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
        </StyledFormView>
      </StyledPageWrapper>
    </StyledSafeAreaView>
  );
};

export default Otp;
