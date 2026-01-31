import { GET_ME } from "@/constants/api-endpoints";
import { api } from "@/services/api";
import { UserContext } from "@/services/context/user";
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

  const setUser = (userData: UserProfileData) => {
    setUserProfile(userData);
  };

  const resetUser = () => {
    setUserProfile(null);
  };

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

        await fetchUser();
      } finally {
        setIsUserLoading(false);
      }
    };

    bootstrap();
  }, []);

  async function fetchUser() {
    const userProfileData = await fetchUserProfile();
    setUserProfile(userProfileData);
    return;
  }

  return (
    <UserContext.Provider
      value={{
        isUserLoading,
        isAuthenticated,
        userProfile,
        fetchUser,
        setUser,
        resetUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
