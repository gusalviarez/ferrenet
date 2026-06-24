import { View, Text, TouchableOpacity } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function ConfirmationScreen() {
  const params = useLocalSearchParams<{
    fullName: string;
    total: string;
    reference: string;
    bank: string;
  }>();

  const orderId = `FER-${Date.now().toString(36).toUpperCase()}`;

  return (
    <View className="flex-1 bg-slate-50 items-center justify-center p-8">
      <View className="bg-green-100 rounded-full w-24 h-24 items-center justify-center mb-6">
        <Ionicons name="checkmark-circle" size={56} color="#22C55E" />
      </View>

      <Text className="text-2xl font-bold text-slate-900 mb-2">
        Pedido confirmado
      </Text>
      <Text className="text-sm text-slate-500 text-center mb-6">
        Gracias por tu compra, {params.fullName}. Tu pedido ha sido registrado.
      </Text>

      <View className="bg-white rounded-xl p-4 w-full mb-6">
        <View className="flex-row justify-between py-2 border-b border-slate-100">
          <Text className="text-sm text-slate-500">Orden</Text>
          <Text className="text-sm font-bold text-slate-900">{orderId}</Text>
        </View>
        <View className="flex-row justify-between py-2 border-b border-slate-100">
          <Text className="text-sm text-slate-500">Total</Text>
          <Text className="text-sm font-bold text-brand-500">
            ${params.total}
          </Text>
        </View>
        <View className="flex-row justify-between py-2 border-b border-slate-100">
          <Text className="text-sm text-slate-500">Banco</Text>
          <Text className="text-sm text-slate-900">{params.bank}</Text>
        </View>
        <View className="flex-row justify-between py-2">
          <Text className="text-sm text-slate-500">Referencia</Text>
          <Text className="text-sm text-slate-900">{params.reference}</Text>
        </View>
      </View>

      <TouchableOpacity
        className="bg-brand-500 rounded-xl px-8 py-4 w-full items-center"
        onPress={() => router.push("/catalog")}
        activeOpacity={0.7}
      >
        <Text className="text-white font-bold text-base">
          Seguir comprando
        </Text>
      </TouchableOpacity>
    </View>
  );
}
