import { useApplication } from "@/services/context/application";
import { Redirect } from "expo-router";

export default function Index() {
  const { hasUserLoggedIn } = useApplication();

  console.log("Index route - hasUserLoggedIn:", hasUserLoggedIn);

  return hasUserLoggedIn
    ? <Redirect href="/home" />
    : <Redirect href="/onboarding" />;
}
