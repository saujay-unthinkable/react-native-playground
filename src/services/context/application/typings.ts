export type ApplicationType = {
  theme: string;
  toggleTheme: () => void;
  hasUserLoggedIn: boolean;
  setHasUserLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};
