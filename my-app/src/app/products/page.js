import fetchProducts from "../lib/fetchProducts";
import ProductList from "./ProductList";

export default async function ProductPage() {
  const products = await fetchProducts();
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <ProductList products={products} />
    </div>
  );
}
