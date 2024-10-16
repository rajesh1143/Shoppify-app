import React, { useEffect, useMemo, useState } from "react";
import { BASE_API_URL } from "../service/service";
import { IProductsType } from "../../typings/typing";

export const useGetAllProducts = () => {
  const [products, setProducts] = React.useState<IProductsType[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  useEffect(() => {
    const fetchProducts = () => {
      setLoading(true);
      setTimeout(async () => {
        try {
          const response = await fetch(`${BASE_API_URL}/products`);
          if (!response.ok) throw new Error("Failed to fetch products");
          const data = await response.json();
          setProducts(data?.products);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      }, 1000);
    };
    fetchProducts();
  }, []);

  return { products, loading };
};
