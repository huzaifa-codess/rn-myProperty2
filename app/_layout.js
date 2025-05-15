import { useFonts } from "expo-font";
import { Drawer } from "expo-router/drawer";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { AppState, StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    Poppins_Bold: require("../assets/fonts/Poppins-Bold.ttf"),
    Poppins_Medium: require("../assets/fonts/Poppins-Medium.ttf"),
    Poppins_Regular: require("../assets/fonts/Poppins-Regular.ttf"),
    Poppins_SemiBold: require("../assets/fonts/Poppins-SemiBold.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
    const subscription = AppState.addEventListener("change", () => {
      StatusBar.setBarStyle("light-content");
    });
    return () => {
      subscription.remove();
    };
  }, [loaded]);

  if (!loaded) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          headerShown: true,
        }}
      >
        <Drawer.Screen
          name="(tabs)"
          options={{
            drawerLabel: "Home",
            title: "Main",
          }}
        />
        <Drawer.Screen
          name="profile"
          options={{ drawerLabel: "Profile", title: "My Profile" }}
        />
        <Drawer.Screen
          name="settings"
          options={{ drawerLabel: "Settings", title: "Settings" }}
        />
        <Drawer.Screen
          name="support"
          options={{ drawerLabel: "Support", title: "Support" }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
