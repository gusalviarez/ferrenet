import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { useCartStore } from "../../store/cart";

export default function TabLayout() {
  const itemCount = useCartStore((s) => s.items.length);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#0D72FF",
        tabBarInactiveTintColor: "#94A3B8",
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopColor: "#E2E8F0",
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="catalog"
        options={{
          tabBarLabel: "Catalogo",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="grid-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          tabBarLabel: "Carrito",
          tabBarIcon: ({ color, size }) => (
            <View>
              <Ionicons name="cart-outline" size={size} color={color} />
              {itemCount > 0 && (
                <View className="absolute -right-2 -top-1 bg-red-500 rounded-full w-4 h-4 items-center justify-center">
                  <Text className="text-white text-[10px] font-bold">
                    {itemCount}
                  </Text>
                </View>
              )}
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
