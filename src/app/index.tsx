import { useAuth } from "@/services/context/auth";

export default function Index() {
  const { hasUserLoggedIn } = useAuth();

  console.log(
    "/app Index - no-op; layouts handle routing. hasUserLoggedIn:",
    hasUserLoggedIn,
  );

  return null;
}
