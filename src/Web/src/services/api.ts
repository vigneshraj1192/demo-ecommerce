export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
}

export interface CartItem {
  productId: number;
  productName: string;
  unitPrice: number;
  quantity: number;
}

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch('/api/products');
  return res.json();
}

export async function searchProducts(query: string): Promise<Product[]> {
  const res = await fetch(`/api/products/search?query=${encodeURIComponent(query)}`);
  return res.json();
}
