import { GET_ME } from "@/constants/api-endpoints";
import { api } from "@/services/api";
import { AuthContext } from "@/services/context/user";
import { getAccessToken } from "@/services/secure-storage";
import { UserProfileData } from "@/types/http";
import { useEffect, useState } from "react";

const fetchUserProfile = async () => {
  try {
    const response = await api.get(GET_ME);

    if (response.data) {
      return response.data?.data as UserProfileData;
    }

    throw response;
  } catch (error) {
    console.log("[Error fetching user data]:", error);
    return {} as UserProfileData;
  }
};

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [isUserLoading, setIsUserLoading] = useState<boolean>(true);
  const [isAuthenticated, setAuthenticated] = useState<boolean>(false);
  const [userProfile, setUserProfile] = useState<UserProfileData | null>(null);

  useEffect(() => {
    const bootstrap = async () => {
      console.log("Bootstrapping <UserProvider/>");
      try {
        const token = getAccessToken();

        if (!token) {
          setAuthenticated(false);
          return;
        }

        setAuthenticated(true);

        await fetchProfileStatus();
      } finally {
        setIsUserLoading(false);
      }
    };

    bootstrap();
  }, []);

  async function fetchProfileStatus() {
    const userProfileData = await fetchUserProfile();
    setUserProfile(userProfileData);
    return userProfileData;
  }

  async function refreshProfile() {
    await fetchProfileStatus();
  }

  return (
    <AuthContext.Provider
      value={{
        loading: isUserLoading,
        isAuthenticated,
        userProfile,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default UserProvider;
