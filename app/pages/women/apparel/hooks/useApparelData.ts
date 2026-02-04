import { useState, useEffect } from "react";
import axios from "axios";
import { Product, FilterOptions } from "../types/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export function useApparelData(
  selectedSizes: string[],
  selectedColors: string[],
  priceRange: [number, number]
) {
  const [products, setProducts] = useState<Product[]>([]);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    sizes: [],
    colors: [],
    priceRange: { min: 0, max: 10000 },
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params: Record<string, string | number> = {
          subCategory: "Apparel",
          category: "Women",
        };
        if (selectedSizes.length) params.sizes = selectedSizes.join(",");
        if (selectedColors.length) params.colors = selectedColors.join(",");
        if (priceRange[0] > 0) params.minPrice = priceRange[0];
        if (priceRange[1] < 10000) params.maxPrice = priceRange[1];

        const productsRes = await axios.get(`${API_URL}/api/products`, {
          params,
        });

        if (productsRes.data.success) {
          const apparelProducts = productsRes.data.data.filter(
            (p: Product) =>
              p.subCategory?.trim().toLowerCase() === "apparel" &&
              p.category?.trim().toLowerCase() === "women"
          );
          setProducts(apparelProducts);

          const sizes = [
            ...new Set(apparelProducts.flatMap((p: Product) => p.sizes || [])),
          ] as string[];
          const colors = [
            ...new Map(
              apparelProducts
                .flatMap((p: Product) => p.colors || [])
                .map((c: { name: string; hex: string }) => [c.name, c])
            ).values(),
          ] as { name: string; hex: string }[];
          const prices = apparelProducts.map((p: Product) => p.finalPrice);
          const minPrice = prices.length ? Math.min(...prices) : 0;
          const maxPrice = prices.length ? Math.max(...prices) : 10000;

          setFilterOptions({
            sizes,
            colors,
            priceRange: { min: minPrice, max: maxPrice },
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedSizes, selectedColors, priceRange]);

  return { products, filterOptions, loading };
}
