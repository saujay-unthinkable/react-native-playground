import { GET_ME } from "@/constants/api-endpoints";
import { api } from "@/services/api";
import { AuthContext } from "@/services/context/user";
import { getAccessToken } from "@/services/secure-storage";
import { UserProfileData } from "@/types/http";
import { useEffect, useState } from "react";

const fetchUserProfile = async () => {
  try {
    const res = await api.get(GET_ME);

    if (res.data) {
      return res.data?.data as UserProfileData;
    }

    throw res;
  } catch (error) {
    console.log("[Error fetching user data]:", error);
    return {} as UserProfileData;
  }
};

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthenticated, setAuthenticated] = useState<boolean>(false);
  const [userProfile, setUserProfile] = useState<UserProfileData | null>(null);

  useEffect(() => {
    bootstrap();
  }, []);

  async function bootstrap() {
    console.log("Bootstrapping authentication...");
    try {
      const token = getAccessToken();

      if (!token) {
        setAuthenticated(false);
        return;
      }

      setAuthenticated(true);

      await fetchProfileStatus();
    } finally {
      setLoading(false);
    }
  }

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
        loading,
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
