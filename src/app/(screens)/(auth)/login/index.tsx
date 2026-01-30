import { StyledTextInputsView } from "@/app-screens/styles/login";
import { AuthMode } from "@/app-screens/typings/login";
import {
  POST_LOGIN_OTP_REQUEST,
  POST_LOGIN_VERIFY_OTP,
  POST_SIGNUP_OTP_REQUEST,
  POST_SIGNUP_VERIFY_OTP,
} from "@/constants/api-endpoints";
import { StyledPageWrapper, StyledSafeAreaView } from "@/helpers/styles";
import { usePost } from "@/hooks/use-https";
import { useApplication } from "@/services/context/application";
import { setAccessToken, setRefreshToken } from "@/services/secure-storage";
import { AuthVerificationResponse } from "@/types/http";
import Button from "@/ui/button";
import Icon from "@/ui/icon";
import Text from "@/ui/text";
import TextInput from "@/ui/text-input";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { getPhoneNumberError } from "./helpers";

const Login = () => {
  const params = useLocalSearchParams();
  const authMode = params?.authMode as AuthMode;
  const isLogin = authMode === AuthMode.login;
  const router = useRouter();
  const { setHasUserLoggedIn } = useApplication();

  const [isPhoneView, setIsPhoneView] = useState<boolean>(true);
  const [errors, setErrors] = useState<{
    common?: string;
    phoneNumber?: string;
    otp?: string;
  }>();
  const [inputs, setInputs] = useState<{
    mobile: string;
    otp: string;
  }>({
    mobile: "",
    otp: "",
  });

  const {
    data: requestOtpData,
    error: requestOtpError,
    loading: requestOtpLoading,
    execute: requestOtp,
  } = usePost(POST_SIGNUP_OTP_REQUEST, {
    lazy: true,
  });

  const {
    data: verifyOtpData,
    error: verifyOtpError,
    loading: verifyOtpLoading,
    execute: verifyOtp,
  } = usePost<AuthVerificationResponse>(POST_SIGNUP_VERIFY_OTP, {
    lazy: true,
  });

  const handleTextInputChange = (text: string, field: string) => {
    setInputs((prev) => ({ ...prev, [field]: text }));
  };

  const validateInput = () => {
    const error = getPhoneNumberError(inputs.mobile);

    setErrors((prev) => {
      return {
        ...prev,
        phoneNumber: error,
      };
    });

    return !!error;
  };

  const handleAuthentication = async () => {
    if (validateInput()) {
      return;
    }

    await requestOtp(
      {
        mobile: inputs.mobile,
      },
      isLogin ? POST_LOGIN_OTP_REQUEST : POST_SIGNUP_OTP_REQUEST,
    );
  };

  const handleVerification = async () => {
    const path = isLogin ? POST_LOGIN_VERIFY_OTP : POST_SIGNUP_VERIFY_OTP;
    const payload = {
      mobile: inputs.mobile,
      otp: inputs.otp,
    };

    await verifyOtp(payload, path);
  };

  const handleCredentials = (response: AuthVerificationResponse) => {
    setHasUserLoggedIn(true);
    setAccessToken(response?.data?.access);
    setRefreshToken(response?.data?.refresh);
    router.dismissAll();
    router.replace("/home");
  };

  useEffect(() => {
    if (requestOtpLoading || requestOtpError || !requestOtpData) {
      setErrors((prev) => ({
        ...prev,
        phoneNumber: requestOtpError,
      }));
      return;
    }

    if (requestOtpData) {
      setIsPhoneView(false);
    }
  }, [requestOtpLoading, requestOtpError, requestOtpData]);

  useEffect(() => {
    if (verifyOtpLoading || verifyOtpLoading || !verifyOtpData) {
      setErrors((prev) => ({ ...prev, otp: verifyOtpError }));
      return;
    }

    handleCredentials(verifyOtpData?.data);
  }, [verifyOtpLoading, verifyOtpError, verifyOtpData]);

  console.log("[Request OTP]:", requestOtpError, requestOtpData);
  console.log("[Verify OTP]:", verifyOtpError, verifyOtpData);

  return (
    <StyledSafeAreaView>
      <StyledPageWrapper spacingTop="xxxxxl">
        <View style={styles.container}>
          <Text color="color-primary-500" align="center" style={styles.title}>
            Welcome to the Speedia!
          </Text>
          <StyledTextInputsView>
            {isPhoneView ? (
              <TextInput
                i18nLabel="Phone number"
                borderVariant="whole"
                borderRadius={8}
                inputMode="tel"
                paddingHorizontal={8}
                leftIcon={<Icon name="phone" />}
                i18nErrorMessage={errors?.phoneNumber}
                onChangeText={(text) => handleTextInputChange(text, "mobile")}
              />
            ) : (
              <TextInput
                value={inputs.otp}
                i18nLabel="OTP"
                borderVariant="whole"
                borderRadius={8}
                inputMode="tel"
                paddingHorizontal={8}
                leftIcon={<Icon name="key" />}
                i18nErrorMessage={errors?.otp}
                onChangeText={(text) => handleTextInputChange(text, "otp")}
              />
            )}
          </StyledTextInputsView>
        </View>
        {isPhoneView ? (
          <>
            <Button
              onPress={handleAuthentication}
              loading={requestOtpLoading}
              spacingBottom={16}
            >
              {isLogin ? "Login" : "Signup"}
            </Button>
          </>
        ) : (
          <Button
            loading={verifyOtpLoading}
            onPress={handleVerification}
            spacingBottom={16}
          >
            Verify
          </Button>
        )}
      </StyledPageWrapper>
    </StyledSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: "center",
  },
  button: {
    fontSize: 18,
    color: "#007AFF",
    textDecorationLine: "underline",
    padding: 15,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
});

export default Login;
