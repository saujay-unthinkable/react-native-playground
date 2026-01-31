import { UserProfileData } from "@/types/http";

export type UserContextType = {
  isUserLoading: boolean;
  isAuthenticated: boolean;
  userProfile: UserProfileData | null;
  setUser: (userData: UserProfileData) => void;
  resetUser: () => void;
  fetchUser: () => Promise<void>;
};
