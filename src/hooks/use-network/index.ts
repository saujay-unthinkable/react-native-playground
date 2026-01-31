import NetInfo from "@react-native-community/netinfo";
import { useEffect, useState } from "react";

export function useNetwork() {
  const [isConnected, setIsConnected] = useState(true);
  const [isInternetReachable, setIsInternetReachable] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      // console.log("[useNetwork]: state", state);
      setIsConnected(Boolean(state.isConnected));
      setIsInternetReachable(Boolean(state.isInternetReachable));
    });

    return unsubscribe;
  }, []);

  // console.log("[useNetwork]:", isConnected && isInternetReachable);

  return {
    isOnline: isConnected,
  };
}
