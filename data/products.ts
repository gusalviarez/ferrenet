import { Product, CategoryId } from "../types";
import epaRaw from "./epa_construccion.json";

function classifyProduct(name: string): CategoryId {
  const n = name.toLowerCase();

  if (n.includes("bloque") || n.includes("ladrillo") || n.includes("trincote"))
    return "bloques";

  if (
    n.includes("malla") ||
    n.includes("cedazo") ||
    n.includes("mosquitero") ||
    n.includes("gallinero") ||
    n.includes("pajarera") ||
    n.includes("raschel") ||
    n.includes("sombra")
  )
    return "mallas";

  if (n.includes("tubo")) return "tuberias";

  if (n.includes("arena") || n.includes("piedra") || n.includes("arrocillo") || n.includes("gravilla") || n.includes("granito"))
    return "arena";

  if (n.includes("cemento") || n.includes("cal ") || n.includes("yeso") || n.includes("estuco"))
    return "cementos";

  if (
    n.includes("varilla") ||
    n.includes("perfil") ||
    n.includes("barra") ||
    n.includes("angulo") ||
    n.includes("riel") ||
    n.includes("esquinero") ||
    n.includes("omega") ||
    n.includes("zuncho")
  )
    return "varillas";

  if (
    n.includes("aditivo") ||
    n.includes("impermeabilizante") ||
    n.includes("sellador") ||
    n.includes("sika") ||
    n.includes("mastique") ||
    n.includes("mortero") ||
    n.includes("pasta") ||
    n.includes("pego") ||
    n.includes("pega") ||
    n.includes("pegamento") ||
    n.includes("multiseal") ||
    n.includes("microfibra") ||
    n.includes("instalkreto") ||
    n.includes("premezcla")
  )
    return "aditivos";

  if (
    n.includes("pintura") ||
    n.includes("aquaflex") ||
    n.includes("impermanto") ||
    n.includes("primer") ||
    n.includes("mantoflex") ||
    n.includes("oxido") ||
    n.includes("oxiforte") ||
    n.includes("rustex") ||
    n.includes("esmalte")
  )
    return "pinturas";

  if (n.includes("moldura") || n.includes("rodapie") || n.includes("tapaluz"))
    return "molduras";

  if (
    n.includes("polietileno") ||
    n.includes("plastico ") ||
    n.includes("stretch") ||
    n.includes("burbuja") ||
    n.includes("lamina polipropileno")
  )
    return "plasticos";

  if (
    n.includes("carretilla") ||
    n.includes("batea") ||
    n.includes("tanque") ||
    n.includes("tambor") ||
    n.includes("carrucha") ||
    n.includes("escalera") ||
    n.includes("contenedor")
  )
    return "herramientas";

  return "otros";
}

const epaProducts: Product[] = epaRaw
  .filter((item: any) => item.name && item.price != null && item.image_url)
  .map((item: any) => ({
    id: item.sku,
    name: item.name,
    price: item.price,
    image: item.image_url,
    category: classifyProduct(item.name),
    stock: item.in_stock ? 1 : 0,
    sku: item.sku,
  }));

export const products: Product[] = epaProducts;

export const getProductById = (id: string): Product | undefined =>
  products.find((p) => p.id === id);

export const getProductsByCategory = (categoryId: string): Product[] =>
  products.filter((p) => p.category === categoryId);

export const getFeaturedProducts = (): Product[] =>
  products.filter((p) => p.featured);
