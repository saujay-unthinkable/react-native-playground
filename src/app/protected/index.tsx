import { useUser } from "@/services/context/user";
import { Redirect } from "expo-router";

export default function UnprotectedIndex() {
  console.log("/protected Index");
  const { userProfile } = useUser();

  const isProfileCompleted = !!userProfile?.customer?.is_profile_completed;

  return isProfileCompleted ? (
    <Redirect href="/protected/home" />
  ) : (
    <Redirect href="/protected/edit-profile" />
  );
}
