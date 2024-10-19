import React, { useEffect, useMemo, useState } from "react";
import { BASE_API_URL } from "../service/service";
import { IProductsType } from "../../typings/typing";
import { Flip, toast } from "react-toastify";

export const useGetAllProducts = () => {
  const [productsList, setProducts] = React.useState<IProductsType[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  useEffect(() => {
    const fetchProducts = () => {
      setLoading(true);
      setTimeout(async () => {
        try {
          const response = await fetch(`${BASE_API_URL}/products?limit=0`);
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

  const updateProduct = (id: number, updatedProduct: any) => {
    // setIsProductUpdated(false);
    setTimeout(async () => {
      try {
        const response = await fetch(`${BASE_API_URL}/products/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedProduct),
        });
        if (!response.ok) throw new Error("Failed to fetch products");
        const updatedData = await response.json();
        // const filtered = products.filter((item) => item.id !== updatedData.id);
        // setProducts([updatedData, ...filtered]);
        setProducts((prev) =>
          prev?.map((product) =>
            product.id === updatedData?.id ? updatedData : product
          )
        );
        if (response.ok) {
          // setIsProductUpdated(true);
          toast.success("Product Updated Successfully!", {
            position: "bottom-right",
            autoClose: 500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Flip,
          });
        }
      } catch (err) {
        console.log(err);
      }
    }, 1500);
  };

  const removeProduct = async (id: number) => {
    // setIsProductUpdated(false);
    try {
      const response = await fetch(`${BASE_API_URL}/products/${id}`, {
        method: "DELETE",
      });
      const deletedData = await response.json();

      setProducts((prev) => prev.filter((item) => item.id !== deletedData.id));
      if (deletedData?.isDeleted) {
        toast.success("Product Deleted Successfully!", {
          position: "bottom-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Flip,
        });
        // setIsProductUpdated(true);
      }else{
        toast.error("Error Deleting Product", {
          position: "bottom-right",
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Flip,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return { productsList,updateProduct, loading,removeProduct };
};
