import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import * as React from "react";

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          "Baloo Chettan 2 Medium": require("../assets/fonts/Baloo_Chettan_2/BalooChettan2-Medium.ttf"),
          "space-mono": require("../assets/fonts/SpaceMono-Regular.ttf"),
          Montserrat: require("../assets/fonts/Montserrat/Montserrat-Regular.ttf"),
          "Montserrat-bold": require("../assets/fonts/Montserrat/Montserrat-Bold.ttf"),
          Inter: require("../assets/fonts/inter/Inter-Regular.ttf"),
          "Inter-bold": require("../assets/fonts/inter/Inter-Bold.ttf"),
          "Inter-semibold": require("../assets/fonts/inter/Inter-SemiBold.ttf"),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
