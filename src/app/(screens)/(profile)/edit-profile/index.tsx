import { PUT_ME } from "@/constants/api-endpoints";
import { StyledPageWrapper, StyledSafeAreaView } from "@/helpers/styles";
import { usePut } from "@/hooks/use-https";
import Button from "@/ui/button";
import Icon from "@/ui/icon";
import Text from "@/ui/text";
import TextInput from "@/ui/text-input";
import { pickDocument } from "@/utils/file-picker";
import { pickImage } from "@/utils/image-picker";
import { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import {
  constructProfilePayload,
  fieldValidators,
  isAadhaarValid,
  isEmailValid,
  isPincodeValid,
} from "./helpers";
import { ProfileDetail } from "./types";

const CompleteProfile = () => {
  const [form, setForm] = useState<ProfileDetail>({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    dob: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    pincode: "",
    aadhaar: "",
    profileImage: null,
    kycDocument: null,
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof ProfileDetail, string>>
  >({});

  const {
    loading: postProfileLoading,
    error: postProfileError,
    data: postProfileResponse,
    execute: postProfile,
  } = usePut(PUT_ME, {
    lazy: true,
  });

  const handleProfileImageRequest = async () => {
    const imageFile = await pickImage();

    if (!imageFile) {
      return;
    }

    setForm((prev) => ({
      ...prev,
      profileImage: imageFile,
    }));
  };

  const handleDocumentRequest = async () => {
    const doc = await pickDocument();
    if (!doc) {
      return;
    }

    setForm((prev) => ({
      ...prev,
      kycDocument: doc,
    }));
  };

  const handleChange = (key: keyof ProfileDetail, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));

    if (fieldValidators[key]) {
      const error = fieldValidators[key]?.(value);

      setErrors((prev) => ({
        ...prev,
        [key]: error,
      }));
    }
  };

  const validateForm = () => {
    const nextErrors: typeof errors = {};

    if (!form.profileImage) {
      nextErrors.profileImage = "Profile image is required";
    }

    if (!form.firstName.trim()) {
      nextErrors.firstName = "First name is required";
    }

    if (!form.lastName.trim()) {
      nextErrors.lastName = "Last name is required";
    }

    if (!form.email.trim()) {
      nextErrors.email = "Email is required";
    } else if (!isEmailValid(form.email)) {
      nextErrors.email = "Enter a valid email address";
    }

    if (!form.gender.trim()) {
      nextErrors.gender = "Gender is required";
    }

    if (!form.dob.trim()) {
      nextErrors.dob = "Date of birth is required";
    }

    if (!form.address1.trim()) {
      nextErrors.address1 = "Address line 1 is required";
    }

    if (!form.city.trim()) {
      nextErrors.city = "City is required";
    }

    if (!form.state.trim()) {
      nextErrors.state = "State is required";
    }

    if (!form.pincode.trim()) {
      nextErrors.pincode = "Pincode is required";
    } else if (!isPincodeValid(form.pincode)) {
      nextErrors.pincode = "Enter a valid 6-digit pincode";
    }

    if (!form.aadhaar.trim()) {
      nextErrors.aadhaar = "Aadhaar number is required";
    } else if (!isAadhaarValid(form.aadhaar)) {
      nextErrors.aadhaar = "Enter a valid 12-digit Aadhaar number";
    }

    if (!form.kycDocument) {
      nextErrors.kycDocument = "KYC document is required";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async () => {
    // 1. Validate inputs.
    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    // 2. Call profile completion API.
    const payload = constructProfilePayload(form);
    await postProfile(payload);
  };

  console.log("[PostProfile]:", postProfileError, postProfileResponse);

  return (
    <StyledSafeAreaView>
      <StyledPageWrapper spacingTop="xxxxl">
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.title} align="center">
            Complete Your Profile
          </Text>

          <View style={styles.imageContainer}>
            <TouchableOpacity onPress={handleProfileImageRequest}>
              <View style={styles.avatar}>
                {form.profileImage ? (
                  <Image
                    source={{ uri: form.profileImage.uri }}
                    style={styles.avatarImage}
                  />
                ) : (
                  <Icon name="camera" size={28} />
                )}
              </View>
            </TouchableOpacity>

            <Text color="color-neutral-600">Tap to select profile picture</Text>
          </View>

          <Section title="Personal Details">
            <TextInput
              i18nLabel="First Name"
              borderVariant="whole"
              i18nErrorMessage={errors.firstName}
              onChangeText={(v) => handleChange("firstName", v)}
            />
            <TextInput
              i18nLabel="Last Name"
              borderVariant="whole"
              i18nErrorMessage={errors.lastName}
              onChangeText={(v) => handleChange("lastName", v)}
            />
            <TextInput
              i18nLabel="Email"
              inputMode="email"
              borderVariant="whole"
              i18nErrorMessage={errors.email}
              onChangeText={(v) => handleChange("email", v)}
            />
            <TextInput
              i18nLabel="Gender"
              i18nPlaceholder="Male / Female / Other"
              borderVariant="whole"
              i18nErrorMessage={errors.gender}
              onChangeText={(v) => handleChange("gender", v)}
            />
            <TextInput
              i18nLabel="Date of Birth"
              i18nPlaceholder="DD-MM-YYYY"
              borderVariant="whole"
              i18nErrorMessage={errors.dob}
              onChangeText={(v) => handleChange("dob", v)}
            />
          </Section>

          <Section title="Address Details">
            <TextInput
              i18nLabel="Address Line 1"
              borderVariant="whole"
              i18nErrorMessage={errors.address1}
              onChangeText={(v) => handleChange("address1", v)}
            />
            <TextInput
              i18nLabel="Address Line 2"
              borderVariant="whole"
              i18nErrorMessage={errors.address2}
              onChangeText={(v) => handleChange("address2", v)}
            />
            <TextInput
              i18nLabel="City"
              borderVariant="whole"
              i18nErrorMessage={errors.city}
              onChangeText={(v) => handleChange("city", v)}
            />
            <TextInput
              i18nLabel="State"
              borderVariant="whole"
              i18nErrorMessage={errors.state}
              onChangeText={(v) => handleChange("state", v)}
            />
            <TextInput
              i18nLabel="Pincode"
              inputMode="numeric"
              borderVariant="whole"
              i18nErrorMessage={errors.pincode}
              onChangeText={(v) => handleChange("pincode", v)}
            />
          </Section>

          <Section title="KYC Details">
            <TextInput
              i18nLabel="Aadhaar Number"
              inputMode="numeric"
              borderVariant="whole"
              i18nErrorMessage={errors.aadhaar}
              onChangeText={(v) => handleChange("aadhaar", v)}
            />

            <Button
              type="outline"
              titleColor="color-neutral-1100"
              onPress={handleDocumentRequest}
            >
              Select KYC Document
            </Button>

            {form.kycDocument && (
              <View style={styles.filePreview}>
                <Icon name="file" size={20} />
                <View style={{ flex: 1 }}>
                  <Text numberOfLines={1}>{form.kycDocument.name}</Text>
                  {form.kycDocument.size && (
                    <Text color="color-neutral-600">
                      {(form.kycDocument.size / 1024).toFixed(1)} KB
                    </Text>
                  )}
                </View>

                <Button full={false} onPress={handleDocumentRequest}>
                  Change
                </Button>
              </View>
            )}
          </Section>

          <Button
            loading={postProfileLoading}
            spacingTop={24}
            onPress={handleSubmit}
          >
            Submit & Continue
          </Button>
        </ScrollView>
      </StyledPageWrapper>
    </StyledSafeAreaView>
  );
};

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <View style={styles.sectionContent}>{children}</View>
  </View>
);

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  avatar: {
    height: 96,
    width: 96,
    borderRadius: 48,
    backgroundColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  avatarImage: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  sectionContent: {
    gap: 4,
  },
  filePreview: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#f5f5f5",
    marginTop: 8,
  },
});

export default CompleteProfile;
