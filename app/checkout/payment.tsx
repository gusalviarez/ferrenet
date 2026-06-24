import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useCartStore } from "../../store/cart";

const BANKS = [
  "Banco de Venezuela",
  "Banco Mercantil",
  "BBVA Provincial",
  "Banesco",
  "Banco Nacional de Credito",
  "Banco del Tesoro",
  "Bancaribe",
  "Banco Bicentenario",
];

export default function PaymentScreen() {
  const params = useLocalSearchParams<{
    fullName: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    notes: string;
  }>();

  const total = useCartStore((s) => s.getTotal());
  const clearCart = useCartStore((s) => s.clearCart);

  const [bank, setBank] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [referenceNumber, setReferenceNumber] = useState("");
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [showBankPicker, setShowBankPicker] = useState(false);

  const handleSubmit = () => {
    if (!bank || !phoneNumber || !referenceNumber) {
      Alert.alert("Campos requeridos", "Completa todos los campos del pago movil");
      return;
    }

    clearCart();
    router.push({
      pathname: "/checkout/confirmation",
      params: {
        fullName: params.fullName,
        total: total.toFixed(2),
        reference: referenceNumber,
        bank,
      },
    });
  };

  return (
    <View className="flex-1 bg-slate-50">
      <ScrollView className="flex-1" contentContainerStyle={{ padding: 16 }}>
        <View className="bg-brand-500 rounded-xl p-4 mb-4">
          <Text className="text-white text-sm opacity-80">Total a pagar</Text>
          <Text className="text-white text-3xl font-bold">
            ${total.toFixed(2)}
          </Text>
        </View>

        <View className="bg-white rounded-xl p-4 mb-4">
          <Text className="text-lg font-bold text-slate-900 mb-1">
            Pago Movil
          </Text>
          <Text className="text-xs text-slate-400 mb-4">
            Simulacion de pago. Todos los datos seran aceptados.
          </Text>

          <View className="mb-4">
            <Text className="text-xs font-medium text-slate-500 mb-2">
              Banco emisor *
            </Text>
            <TouchableOpacity
              className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-3 flex-row items-center justify-between"
              onPress={() => setShowBankPicker(!showBankPicker)}
            >
              <Text
                className={bank ? "text-slate-900" : "text-slate-400"}
              >
                {bank || "Selecciona un banco"}
              </Text>
              <Ionicons
                name={showBankPicker ? "chevron-up" : "chevron-down"}
                size={16}
                color="#94A3B8"
              />
            </TouchableOpacity>

            {showBankPicker && (
              <View className="bg-white border border-slate-200 rounded-lg mt-1 overflow-hidden">
                {BANKS.map((b) => (
                  <TouchableOpacity
                    key={b}
                    className={`px-3 py-3 border-b border-slate-100 ${
                      bank === b ? "bg-brand-50" : ""
                    }`}
                    onPress={() => {
                      setBank(b);
                      setShowBankPicker(false);
                    }}
                  >
                    <Text
                      className={
                        bank === b
                          ? "text-brand-500 font-semibold"
                          : "text-slate-700"
                      }
                    >
                      {b}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          <View className="mb-4">
            <Text className="text-xs font-medium text-slate-500 mb-1">
              Telefono (origen) *
            </Text>
            <TextInput
              className="bg-slate-50 rounded-lg px-3 py-3 text-slate-900 border border-slate-200"
              placeholder="0412-1234567"
              placeholderTextColor="#94A3B8"
              keyboardType="phone-pad"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
          </View>

          <View className="mb-4">
            <Text className="text-xs font-medium text-slate-500 mb-1">
              Numero de referencia *
            </Text>
            <TextInput
              className="bg-slate-50 rounded-lg px-3 py-3 text-slate-900 border border-slate-200"
              placeholder="# referencia del pago movil"
              placeholderTextColor="#94A3B8"
              value={referenceNumber}
              onChangeText={setReferenceNumber}
            />
          </View>

          <View className="mb-4">
            <Text className="text-xs font-medium text-slate-500 mb-2">
              Comprobante de pago (opcional)
            </Text>
            <TouchableOpacity
              className="bg-slate-50 border border-dashed border-slate-300 rounded-xl p-6 items-center"
              onPress={() => {
                setScreenshot("uploaded_screenshot");
                Alert.alert(
                  "Comprobante subido",
                  "En la version real se subiria una imagen. Para esta demo, se acepta como valido."
                );
              }}
            >
              {screenshot ? (
                <View className="items-center">
                  <Ionicons
                    name="checkmark-circle"
                    size={32}
                    color="#22C55E"
                  />
                  <Text className="text-green-500 font-medium mt-1">
                    Comprobante subido
                  </Text>
                </View>
              ) : (
                <View className="items-center">
                  <Ionicons
                    name="cloud-upload-outline"
                    size={32}
                    color="#94A3B8"
                  />
                  <Text className="text-slate-400 mt-1">
                    Toca para subir comprobante
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>

        <View className="bg-brand-50 rounded-xl p-4 mb-4 border border-brand-100">
          <View className="flex-row items-start gap-2">
            <Ionicons
              name="information-circle-outline"
              size={18}
              color="#0D72FF"
            />
            <View className="flex-1">
              <Text className="text-xs font-semibold text-brand-700 mb-1">
                Datos para el pago movil
              </Text>
              <Text className="text-xs text-brand-600">
                Banco: Banco de Venezuela{"\n"}
                CI: 12.345.678{"\n"}
                Telefono: 0412-1234567
              </Text>
              <Text className="text-xs text-brand-400 mt-1">
                Esta es una simulacion. Cualquier dato ingresado sera aceptado.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View className="p-4 border-t border-slate-200 bg-white">
        <TouchableOpacity
          className="bg-green-500 rounded-xl py-4 items-center"
          onPress={handleSubmit}
          activeOpacity={0.7}
        >
          <Text className="text-white font-bold text-base">
            Confirmar pago - ${total.toFixed(2)}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
