import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useCartStore } from "../../store/cart";

export default function CheckoutScreen() {
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.getSubtotal());
  const delivery = useCartStore((s) => s.getDeliveryCost());
  const total = useCartStore((s) => s.getTotal());

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    notes: "",
  });

  if (items.length === 0) {
    return (
      <View className="flex-1 bg-white items-center justify-center p-8">
        <Ionicons name="cart-outline" size={64} color="#CBD5E1" />
        <Text className="text-lg font-bold text-slate-400 mt-4">
          No hay productos en el carrito
        </Text>
        <TouchableOpacity
          className="mt-4 bg-brand-500 rounded-xl px-6 py-3"
          onPress={() => router.push("/catalog")}
        >
          <Text className="text-white font-bold">Ir al catalogo</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const updatedForm = (key: string, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = () => {
    if (!form.fullName || !form.phone || !form.address) {
      Alert.alert("Campos requeridos", "Completa nombre, telefono y direccion");
      return;
    }
    router.push({ pathname: "/checkout/payment", params: form });
  };

  return (
    <View className="flex-1 bg-slate-50">
      <ScrollView className="flex-1" contentContainerStyle={{ padding: 16 }}>
        <View className="bg-white rounded-xl p-4 mb-4">
          <Text className="text-lg font-bold text-slate-900 mb-4">
            Datos de envio
          </Text>

          <View className="mb-3">
            <Text className="text-xs font-medium text-slate-500 mb-1">
              Nombre completo *
            </Text>
            <TextInput
              className="bg-slate-50 rounded-lg px-3 py-3 text-slate-900 border border-slate-200"
              placeholder="Juan Perez"
              placeholderTextColor="#94A3B8"
              value={form.fullName}
              onChangeText={(v) => updatedForm("fullName", v)}
            />
          </View>

          <View className="mb-3">
            <Text className="text-xs font-medium text-slate-500 mb-1">
              Telefono *
            </Text>
            <TextInput
              className="bg-slate-50 rounded-lg px-3 py-3 text-slate-900 border border-slate-200"
              placeholder="0412-1234567"
              placeholderTextColor="#94A3B8"
              keyboardType="phone-pad"
              value={form.phone}
              onChangeText={(v) => updatedForm("phone", v)}
            />
          </View>

          <View className="mb-3">
            <Text className="text-xs font-medium text-slate-500 mb-1">
              Direccion *
            </Text>
            <TextInput
              className="bg-slate-50 rounded-lg px-3 py-3 text-slate-900 border border-slate-200"
              placeholder="Calle, casa, apartamento"
              placeholderTextColor="#94A3B8"
              value={form.address}
              onChangeText={(v) => updatedForm("address", v)}
            />
          </View>

          <View className="flex-row gap-3">
            <View className="flex-1">
              <Text className="text-xs font-medium text-slate-500 mb-1">
                Ciudad
              </Text>
              <TextInput
                className="bg-slate-50 rounded-lg px-3 py-3 text-slate-900 border border-slate-200"
                placeholder="Ciudad"
                placeholderTextColor="#94A3B8"
                value={form.city}
                onChangeText={(v) => updatedForm("city", v)}
              />
            </View>
            <View className="flex-1">
              <Text className="text-xs font-medium text-slate-500 mb-1">
                Estado
              </Text>
              <TextInput
                className="bg-slate-50 rounded-lg px-3 py-3 text-slate-900 border border-slate-200"
                placeholder="Estado"
                placeholderTextColor="#94A3B8"
                value={form.state}
                onChangeText={(v) => updatedForm("state", v)}
              />
            </View>
          </View>

          <View className="mt-3">
            <Text className="text-xs font-medium text-slate-500 mb-1">
              Notas adicionales
            </Text>
            <TextInput
              className="bg-slate-50 rounded-lg px-3 py-3 text-slate-900 border border-slate-200"
              placeholder="Punto de referencia, instrucciones..."
              placeholderTextColor="#94A3B8"
              multiline
              numberOfLines={2}
              value={form.notes}
              onChangeText={(v) => updatedForm("notes", v)}
            />
          </View>
        </View>

        <View className="bg-white rounded-xl p-4 mb-4">
          <Text className="text-lg font-bold text-slate-900 mb-3">
            Resumen del pedido
          </Text>
          {items.map((item) => (
            <View
              key={item.product.id}
              className="flex-row justify-between py-1"
            >
              <Text className="text-sm text-slate-600 flex-1" numberOfLines={1}>
                {item.quantity}x {item.product.name}
              </Text>
              <Text className="text-sm text-slate-900 ml-2">
                ${(item.product.price * item.quantity).toFixed(2)}
              </Text>
            </View>
          ))}
          <View className="border-t border-slate-100 mt-2 pt-2">
            <View className="flex-row justify-between py-1">
              <Text className="text-sm text-slate-500">Subtotal</Text>
              <Text className="text-sm text-slate-900">
                ${subtotal.toFixed(2)}
              </Text>
            </View>
            <View className="flex-row justify-between py-1">
              <Text className="text-sm text-slate-500">Envio estandar</Text>
              <Text className="text-sm text-slate-900">
                ${delivery.toFixed(2)}
              </Text>
            </View>
            <View className="flex-row justify-between py-1 mt-1 border-t border-slate-100">
              <Text className="text-base font-bold text-slate-900">Total</Text>
              <Text className="text-base font-bold text-brand-500">
                ${total.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View className="p-4 border-t border-slate-200 bg-white">
        <TouchableOpacity
          className="bg-brand-500 rounded-xl py-4 items-center"
          onPress={handleSubmit}
          activeOpacity={0.7}
        >
          <Text className="text-white font-bold text-base">
            Continuar al pago
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
