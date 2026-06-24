import json
import re
import requests
import time
from urllib.parse import urljoin

BASE_URL = "https://ve.epaenlinea.com"
CATEGORY_PATH = "/productos/construccion.html"
OUTPUT_FILE = "data/epa_construccion.json"

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml",
    "Accept-Language": "es-VE,es;q=0.9,en;q=0.8",
}

TOTAL_PAGES = 10
DELAY = 1.5


def fetch_page(page: int) -> str | None:
    url = urljoin(BASE_URL, CATEGORY_PATH)
    if page > 1:
        url = f"{url}?p={page}"
    try:
        resp = requests.get(url, headers=HEADERS, timeout=30)
        resp.raise_for_status()
        return resp.text
    except requests.RequestException as e:
        print(f"  Error fetching page {page}: {e}")
        return None


def extract_jsonld(html: str) -> list[dict]:
    pattern = re.compile(
        r'<script type="application/ld\+json">\s*(\[.*?\])\s*</script>',
        re.DOTALL,
    )
    match = pattern.search(html)
    if not match:
        return []
    try:
        data = json.loads(match.group(1))
        if isinstance(data, list):
            return data
        return []
    except json.JSONDecodeError:
        return []


def extract_products_from_jsonld(jsonld: list[dict]) -> list[dict]:
    products = []
    for item in jsonld:
        if not isinstance(item, dict) or item.get("@type") != "Product":
            continue
        offers = item.get("offers", [])
        if isinstance(offers, dict):
            offers = [offers]
        price = None
        availability = None
        if offers:
            price = offers[0].get("price")
            availability = offers[0].get("availability", "")
        products.append(
            {
                "name": item.get("name", "").strip(),
                "price": float(price) if price is not None else None,
                "sku": item.get("sku", ""),
                "image_url": item.get("image", ""),
                "product_url": item.get("url", ""),
                "in_stock": "InStock" in (availability or ""),
            }
        )
    return products


def main():
    all_products = []
    seen_skus = set()

    for page in range(1, TOTAL_PAGES + 1):
        print(f"Page {page}/{TOTAL_PAGES}...")
        html = fetch_page(page)
        if not html:
            continue

        jsonld = extract_jsonld(html)
        products = extract_products_from_jsonld(jsonld)
        print(f"  Found {len(products)} products")

        new_count = 0
        for p in products:
            if p["sku"] and p["sku"] not in seen_skus:
                seen_skus.add(p["sku"])
                all_products.append(p)
                new_count += 1
        print(f"  {new_count} new after dedup")

        if page < TOTAL_PAGES:
            time.sleep(DELAY)

    print(f"\nTotal unique products scraped: {len(all_products)}")

    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(all_products, f, ensure_ascii=False, indent=2)

    print(f"Saved to {OUTPUT_FILE}")

    prices = [p["price"] for p in all_products if p["price"] is not None]
    if prices:
        print(f"Price range: ${min(prices):.2f} - ${max(prices):.2f}")
    in_stock = sum(1 for p in all_products if p["in_stock"])
    print(f"In stock: {in_stock}/{len(all_products)}")


if __name__ == "__main__":
    main()
