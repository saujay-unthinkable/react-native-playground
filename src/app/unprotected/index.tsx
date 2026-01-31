import { Redirect } from "expo-router";

export default function UnprotectedIndex() {
  return <Redirect href="/unprotected/onboarding" />;
}
