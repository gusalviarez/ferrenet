import "../global.css";

import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { StatusBar } from "expo-status-bar";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  return (
    <>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="product/[id]"
          options={{ headerShown: true, title: "Producto" }}
        />
        <Stack.Screen
          name="checkout/index"
          options={{ headerShown: true, title: "Checkout" }}
        />
        <Stack.Screen
          name="checkout/payment"
          options={{ headerShown: true, title: "Pago" }}
        />
        <Stack.Screen
          name="checkout/confirmation"
          options={{ headerShown: true, title: "Confirmacion" }}
        />
      </Stack>
    </>
  );
}
