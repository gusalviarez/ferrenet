import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { getProductById } from "../../data/products";
import { useCartStore } from "../../store/cart";

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const product = getProductById(id ?? "");
  const addItem = useCartStore((s) => s.addItem);
  const cartItems = useCartStore((s) => s.items);
  const itemCount = useCartStore((s) => s.getItemCount());

  if (!product) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-slate-500">Producto no encontrado</Text>
      </View>
    );
  }

  const cartItem = cartItems.find((i) => i.product.id === product.id);

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1">
        <Image
          source={{ uri: product.image }}
          className="w-64 h-64 self-center my-6 rounded-xl"
          resizeMode="cover"
        />

        <View className="p-4">
          <Text className="text-xs text-brand-500 font-semibold uppercase tracking-wider">
            {product.brand ?? ''}
          </Text>
          <Text className="text-2xl font-bold text-slate-900 mt-1">
            {product.name}
          </Text>
          <Text className="text-3xl font-bold text-brand-500 mt-2">
            ${product.price.toFixed(2)}
          </Text>

          <View className="flex-row items-center gap-5 mt-4 py-3 border-y border-slate-100">
            <View className="flex-row items-center gap-1">
              <Ionicons name="cube-outline" size={14} color="#94A3B8" />
              <Text className="text-xs text-slate-400">
                SKU: {product.sku}
              </Text>
            </View>
            <View className="flex-row items-center gap-1">
              <Ionicons name="pricetag-outline" size={14} color="#94A3B8" />
              <Text className="text-xs text-slate-400">
                / {product.unit ?? 'unidad'}
              </Text>
            </View>
            {(product.stock ?? 0) > 0 ? (
              <View className="flex-row items-center gap-1">
                <Ionicons name="checkmark-circle" size={14} color="#22C55E" />
                <Text className="text-xs text-green-500">
                  {product.stock ?? 0} en stock
                </Text>
              </View>
            ) : (
              <Text className="text-xs text-red-400">Agotado</Text>
            )}
          </View>

          <Text className="text-base text-slate-600 leading-6 mt-4">
            {product.description ?? ''}
          </Text>
        </View>
      </ScrollView>

      <View className="p-4 border-t border-slate-200 bg-white">
        {cartItem ? (
          <View className="flex-row items-center gap-2">
            <View className="flex-1 flex-row items-center justify-between bg-slate-100 rounded-xl px-4 py-3">
              <TouchableOpacity
                className="w-8 h-8 items-center justify-center bg-white rounded-lg"
                onPress={() => {
                  useCartStore
                    .getState()
                    .updateQuantity(product.id, cartItem.quantity - 1);
                }}
              >
                <Ionicons name="remove" size={16} color="#0D72FF" />
              </TouchableOpacity>
              <Text className="text-base font-bold text-slate-900">
                {cartItem.quantity}
              </Text>
              <TouchableOpacity
                className="w-8 h-8 items-center justify-center bg-white rounded-lg"
                onPress={() => {
                  useCartStore
                    .getState()
                    .updateQuantity(product.id, cartItem.quantity + 1);
                }}
              >
                <Ionicons name="add" size={16} color="#0D72FF" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              className="bg-brand-500 rounded-xl px-6 py-3"
              onPress={() => router.push("/cart")}
              activeOpacity={0.7}
            >
              <View className="flex-row items-center gap-2">
                <Ionicons name="cart" size={18} color="#FFFFFF" />
                <Text className="text-white font-bold text-sm">
                  Ver carrito ({itemCount})
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            className="bg-brand-500 rounded-xl py-4 items-center"
            onPress={() => addItem(product)}
            activeOpacity={0.7}
          >
            <Text className="text-white font-bold text-base">
              Agregar al carrito - ${product.price.toFixed(2)}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
