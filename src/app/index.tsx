import { useAuth } from "@/services/context/auth";
import { Redirect } from "expo-router";

export default function Index() {
  const { hasUserLoggedIn } = useAuth();

  console.log("/app Index - hasUserLoggedIn:", hasUserLoggedIn);

  return hasUserLoggedIn ? (
    <Redirect href="/protected" />
  ) : (
    <Redirect href="/unprotected" />
  );
}
