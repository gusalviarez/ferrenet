import { useState, useMemo, useRef, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { products } from "../../data/products";
import { categories } from "../../data/categories";
import { CategoryId } from "../../types";
import { useCartStore } from "../../store/cart";

export default function CatalogScreen() {
  const [width, setWidth] = useState(400);
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef<TextInput>(null);
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    setWidth(window.innerWidth);
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const cols = 5;
  const pad = 12;
  const gap = 6;
  const cardWidth = (width - pad * 2 - gap * (cols - 1)) / cols;

  const filteredProducts = useMemo(() => {
    let result = products;
    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(q));
    }
    return result;
  }, [selectedCategory, searchQuery]);

  const openSearch = () => {
    setSearchOpen(true);
    setTimeout(() => searchRef.current?.focus(), 100);
  };

  const closeSearch = () => {
    setSearchOpen(false);
    setSearchQuery("");
  };

  const renderCard = (item: (typeof products)[0]) => (
    <TouchableOpacity
      key={item.id}
      activeOpacity={0.8}
      onPress={() => router.push(`/product/${item.id}`)}
      style={{
        width: cardWidth,
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        overflow: "hidden",
        padding: 8,
      }}
    >
      <Image
        source={{ uri: item.image }}
        style={{
          width: cardWidth - 16,
          height: cardWidth - 16,
          borderRadius: 8,
          backgroundColor: "#E2E8F0",
        }}
        resizeMode="cover"
      />
      <Text
        style={{
          fontSize: 13,
          fontWeight: "600",
          color: "#0F172A",
          marginTop: 8,
          lineHeight: 18,
        }}
        numberOfLines={2}
      >
        {item.name}
      </Text>
      <Text
        style={{
          fontSize: 15,
          fontWeight: "700",
          color: "#0D72FF",
          marginTop: 4,
        }}
      >
        ${item.price.toFixed(2)}
      </Text>
      <TouchableOpacity
        style={{
          backgroundColor: "#0D72FF",
          borderRadius: 8,
          width: 32,
          height: 32,
          alignItems: "center",
          justifyContent: "center",
          marginTop: 8,
        }}
        onPress={(e) => {
          e.stopPropagation();
          addItem(item);
        }}
        activeOpacity={0.7}
      >
        <Ionicons name="add" size={18} color="#FFFFFF" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

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
        {searchOpen ? (
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center", gap: 8 }}>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#F1F5F9",
                borderRadius: 8,
                paddingHorizontal: 12,
                paddingVertical: 8,
              }}
            >
              <Ionicons name="search-outline" size={18} color="#94A3B8" />
              <TextInput
                ref={searchRef}
                style={{ flex: 1, marginLeft: 8, fontSize: 14, color: "#0F172A" }}
                placeholder="Buscar productos..."
                placeholderTextColor="#94A3B8"
                value={searchQuery}
                onChangeText={setSearchQuery}
                returnKeyType="search"
              />
            </View>
            <TouchableOpacity onPress={closeSearch} activeOpacity={0.7}>
              <Text style={{ fontSize: 14, fontWeight: "500", color: "#0D72FF" }}>
                Cancelar
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <Image
              source={require("../../assets/images/Ferrenet-logo.png")}
              style={{ height: 45, width: 110 }}
              resizeMode="contain"
            />
            <TouchableOpacity onPress={openSearch} activeOpacity={0.7}>
              <Ionicons name="search-outline" size={24} color="#0F172A" />
            </TouchableOpacity>
          </>
        )}
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: pad, paddingBottom: 24 }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "700",
            color: "#0F172A",
            marginBottom: 8,
          }}
        >
          Categorias
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginBottom: 16 }}
        >
          <View style={{ flexDirection: "row", gap: 8 }}>
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <TouchableOpacity
                  key={cat.id}
                  onPress={() =>
                    setSelectedCategory(isActive ? null : cat.id)
                  }
                  activeOpacity={0.7}
                  style={{
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                    borderRadius: 999,
                    borderWidth: 1,
                    borderColor: isActive ? "#0D72FF" : "#E2E8F0",
                    backgroundColor: isActive ? "#0D72FF" : "#FFFFFF",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <Ionicons
                    name={cat.icon as any}
                    size={14}
                    color={isActive ? "#FFFFFF" : "#64748B"}
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "500",
                      color: isActive ? "#FFFFFF" : "#64748B",
                    }}
                  >
                    {cat.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>

        <Text
          style={{
            fontSize: 16,
            fontWeight: "700",
            color: "#0F172A",
            marginBottom: 8,
          }}
        >
          {selectedCategory
            ? categories.find((c) => c.id === selectedCategory)?.name
            : "Todos los productos"}
        </Text>

        {filteredProducts.length === 0 && (
          <Text
            style={{
              fontSize: 14,
              color: "#94A3B8",
              textAlign: "center",
              marginTop: 32,
            }}
          >
            No se encontraron productos
          </Text>
        )}

        {filteredProducts.map((item, index) => {
          if (index % cols !== 0) return null;
          const items = [];
          for (let i = 0; i < cols; i++) {
            if (filteredProducts[index + i]) items.push(filteredProducts[index + i]);
          }
          return (
            <View
              key={item.id}
              style={{
                flexDirection: "row",
                marginBottom: gap,
                gap: gap,
              }}
            >
              {items.map((ci) => renderCard(ci))}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}
