import { UserProfileData } from "@/types/http";
import { createContext, useContext } from "react";

type UserProfileState = {
  loading: boolean;
  isAuthenticated: boolean;
  userProfile: UserProfileData | null;
  refreshProfile: () => Promise<void>;
};

export const AuthContext = createContext<UserProfileState>(null as any);

export const useUser = () => useContext(AuthContext);
