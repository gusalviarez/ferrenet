import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useCartStore } from "../../store/cart";

export default function CartScreen() {
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const subtotal = useCartStore((s) => s.getSubtotal());
  const delivery = useCartStore((s) => s.getDeliveryCost());
  const total = useCartStore((s) => s.getTotal());

  if (items.length === 0) {
    return (
      <View style={{ flex: 1, backgroundColor: "#F8FAFC" }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 16,
            paddingVertical: 12,
            backgroundColor: "#FFFFFF",
            borderBottomWidth: 1,
            borderBottomColor: "#E2E8F0",
          }}
        >
          <Image
            source={require("../../assets/images/Ferrenet-logo.png")}
            style={{ height: 45, width: 110 }}
            resizeMode="contain"
          />
          <TouchableOpacity onPress={() => router.push("/catalog")} activeOpacity={0.7}>
            <Ionicons name="search-outline" size={24} color="#0F172A" />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            padding: 32,
          }}
        >
          <Ionicons name="cart-outline" size={80} color="#CBD5E1" />
          <Text
            style={{
              fontSize: 20,
              fontWeight: "700",
              color: "#94A3B8",
              marginTop: 16,
            }}
          >
            Carrito vacio
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: "#94A3B8",
              textAlign: "center",
              marginTop: 4,
              paddingHorizontal: 32,
            }}
          >
            Agrega productos desde el catalogo
          </Text>
          <TouchableOpacity
            style={{
              marginTop: 24,
              backgroundColor: "#0D72FF",
              borderRadius: 12,
              paddingHorizontal: 32,
              paddingVertical: 12,
            }}
            onPress={() => router.push("/catalog")}
            activeOpacity={0.7}
          >
            <Text style={{ color: "#FFFFFF", fontWeight: "700" }}>
              Ir al catalogo
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#F8FAFC" }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 16,
          paddingVertical: 12,
          backgroundColor: "#FFFFFF",
          borderBottomWidth: 1,
          borderBottomColor: "#E2E8F0",
        }}
      >
        <Image
          source={require("../../assets/images/Ferrenet-logo.png")}
          style={{ height: 45, width: 110 }}
          resizeMode="contain"
        />
        <TouchableOpacity onPress={() => router.push("/catalog")} activeOpacity={0.7}>
          <Ionicons name="search-outline" size={24} color="#0F172A" />
        </TouchableOpacity>
      </View>
      <FlatList
        style={{ flex: 1 }}
        data={items}
        keyExtractor={(item) => item.product.id}
        contentContainerStyle={{ padding: 12, paddingBottom: 24 }}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 12,
              padding: 12,
              marginBottom: 8,
              flexDirection: "row",
              gap: 12,
            }}
          >
            <Image
              source={{ uri: item.product.image }}
              style={{ width: 80, height: 80, borderRadius: 8 }}
              resizeMode="cover"
            />
            <View style={{ flex: 1 }}>
              <Text
                style={{ fontSize: 14, fontWeight: "600", color: "#0F172A" }}
                numberOfLines={1}
              >
                {item.product.name}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: "#94A3B8",
                  marginTop: 2,
                }}
              >
                {item.product.brand ?? ""}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "700",
                  color: "#0D72FF",
                  marginTop: 4,
                }}
              >
                ${item.product.price.toFixed(2)}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 8,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 4,
                    backgroundColor: "#F1F5F9",
                    borderRadius: 8,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      width: 28,
                      height: 28,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onPress={() =>
                      updateQuantity(item.product.id, item.quantity - 1)
                    }
                  >
                    <Ionicons name="remove" size={14} color="#0D72FF" />
                  </TouchableOpacity>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "700",
                      color: "#0F172A",
                      minWidth: 20,
                      textAlign: "center",
                    }}
                  >
                    {item.quantity}
                  </Text>
                  <TouchableOpacity
                    style={{
                      width: 28,
                      height: 28,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onPress={() =>
                      updateQuantity(item.product.id, item.quantity + 1)
                    }
                  >
                    <Ionicons name="add" size={14} color="#0D72FF" />
                  </TouchableOpacity>
                </View>
                <Text
                  style={{ fontSize: 14, fontWeight: "700", color: "#0F172A" }}
                >
                  ${(item.product.price * item.quantity).toFixed(2)}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={{ justifyContent: "center" }}
              onPress={() => removeItem(item.product.id)}
            >
              <Ionicons name="trash-outline" size={18} color="#EF4444" />
            </TouchableOpacity>
          </View>
        )}
        ListFooterComponent={
          <View
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 12,
              padding: 16,
              marginTop: 8,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingVertical: 4,
              }}
            >
              <Text style={{ fontSize: 14, color: "#64748B" }}>Subtotal</Text>
              <Text style={{ fontSize: 14, color: "#0F172A" }}>
                ${subtotal.toFixed(2)}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingVertical: 4,
              }}
            >
              <Text style={{ fontSize: 14, color: "#64748B" }}>Envio</Text>
              <Text style={{ fontSize: 14, color: "#0F172A" }}>
                ${delivery.toFixed(2)}
              </Text>
            </View>
            <View
              style={{
                borderTopWidth: 1,
                borderTopColor: "#F1F5F9",
                marginTop: 8,
                paddingTop: 8,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "700",
                  color: "#0F172A",
                }}
              >
                Total
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "700",
                  color: "#0D72FF",
                }}
              >
                ${total.toFixed(2)}
              </Text>
            </View>
          </View>
        }
      />

      <View
        style={{
          padding: 16,
          borderTopWidth: 1,
          borderTopColor: "#E2E8F0",
          backgroundColor: "#FFFFFF",
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "#0D72FF",
            borderRadius: 12,
            paddingVertical: 16,
            alignItems: "center",
          }}
          onPress={() => router.push("/checkout")}
          activeOpacity={0.7}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <Ionicons name="card-outline" size={18} color="#FFFFFF" />
            <Text style={{ color: "#FFFFFF", fontWeight: "700", fontSize: 16 }}>
              Proceder al pago - ${total.toFixed(2)}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
