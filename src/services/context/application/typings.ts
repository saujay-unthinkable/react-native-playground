export type ApplicationType = {
  theme: string;
  toggleTheme: () => void;
  hasUserLoggedIn: boolean;
  setHasUserLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  authenticateUser: (accessToken: string, refreshToken: string) => Promise<void>;
  logoutUser: () => Promise<void>;
};
