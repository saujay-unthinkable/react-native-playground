export type AuthContextType = {
  theme: string;
  toggleTheme: () => void;
  isAuthLoading: boolean;
  hasUserLoggedIn: boolean;
  setHasUserLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  authenticateUser: (
    accessToken: string,
    refreshToken: string,
  ) => Promise<void>;
  logoutUser: () => Promise<void>;
};
