import { Link, Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "No encontrado" }} />
      <View style={styles.container}>
        <Text style={styles.title}>Pagina no encontrada</Text>
        <Link href="/catalog" style={styles.link}>
          <Text style={styles.linkText}>Ir al catalogo</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#F8FAFC",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0F172A",
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: "#0D72FF",
    fontWeight: "600",
  },
});
