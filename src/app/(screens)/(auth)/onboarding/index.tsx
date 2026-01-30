import { SCREENS } from "@/constants/screens";
import { StyledPageWrapper, StyledSafeAreaView } from "@/helpers/styles";
import Button from "@/ui/button";
import Icon from "@/ui/icon";
import { useRouter } from "expo-router";
import React from "react";
import { StyledTopView } from "./styles";

const Onboarding = () => {
  const router = useRouter();

  const navigateTo = (pathname: string) => {
    router.push({
      pathname: pathname as any,
      params: {
        authMode: pathname === SCREENS.LOGIN ? "login" : "signup",
      },
    });
  };

  return (
    <StyledSafeAreaView>
      <StyledPageWrapper>
        <StyledTopView>
          <Icon name="dropbox" color="color-primary-500" size={128} />
        </StyledTopView>
        <Button onPress={() => navigateTo(SCREENS.LOGIN)} spacingBottom={12}>
          Login
        </Button>
        <Button onPress={() => navigateTo(SCREENS.SIGNUP)}>Signup</Button>
      </StyledPageWrapper>
    </StyledSafeAreaView>
  );
};

export default Onboarding;
