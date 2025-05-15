import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { AppState, StatusBar } from "react-native";
export { Slot } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";

// Prevent auto hide splash screen
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  <GestureHandlerRootView style={{ flex: 1 }}>
    <Drawer
      screenOptions={{
        headerShown: true, // optional: show header on top
      }}
    >
      {/* Bottom Tabs ko ek Drawer screen ke andar daal diya */}
      <Drawer.Screen
        name="(tabs)"
        options={{
          drawerLabel: "Home",
          title: "Main",
        }}
      />

      {/* Drawer ke extra options */}
      <Drawer.Screen
        name="profile"
        options={{
          drawerLabel: "Profile",
          title: "My Profile",
        }}
      />
      <Drawer.Screen
        name="settings"
        options={{
          drawerLabel: "Settings",
          title: "Settings",
        }}
      />
    </Drawer>
  </GestureHandlerRootView>;
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
    const subscription = AppState.addEventListener("change", (_) => {
      StatusBar.setBarStyle("light-content");
    });
    return () => {
      subscription.remove();
    };
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false, animation: "ios_from_right" }}>
      {/* Splash screen index */}
      <Stack.Screen name="index" options={{ gestureEnabled: false }} />

      {/* Auth screens */}
      <Stack.Screen
        name="auth/loginScreen"
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen name="auth/verificationScreen" />
      <Stack.Screen
        name="auth/registerScreen"
        options={{ gestureEnabled: false }}
      />

      {/* Tabs */}
      <Stack.Screen name="(tabs)" options={{ gestureEnabled: false }} />

      {/* Other screens */}
      <Stack.Screen name="search/searchScreen" />
      <Stack.Screen name="notification/notificationScreen" />
      <Stack.Screen name="property/propertyScreen" />
      <Stack.Screen name="imageFullView/imageFullViewScreen" />
      <Stack.Screen name="message/messageScreen" />
      <Stack.Screen name="editProfile/editProfileScreen" />
      <Stack.Screen name="addNewListing/addNewListingScreen" />
      <Stack.Screen name="myListing/myListingScreen" />
      <Stack.Screen name="privacyPolicy/privacyPolicyScreen" />
      <Stack.Screen name="termsOfUse/termsOfUseScreen" />
      <Stack.Screen name="support/supportScreen" />
    </Stack>
  );
}
