/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { IProductsContextType, IProductsType } from "../typings/typing";
import { BASE_API_URL } from "../common/service/service";
import { Flip, toast } from "react-toastify";

interface IProductsProviderProps {
  children: ReactNode;
}
export const ProductsContext = createContext({} as IProductsContextType);

export const ProductsProvider: FC<IProductsProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<IProductsType[]>([]);
  // const [adminData, setAdminData] = useState<IProductsType[]>([]);
  const [allData, setAllData] = useState<IProductsType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(15);
  const [skip, setSkip] = useState<number>(0);
  const [search, setSearch] = useState<string>("");
  const [isProductUpdated, setIsProductUpdated] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  useEffect(() => {
    const fetchProducts = () => {
      setLoading(true);
      setTimeout(async () => {
        try {
          const response = await fetch(
            `${BASE_API_URL}/products${
              search ? "/search" : ""
            }?limit=${limit}&skip=${skip}&q=${search}`
          );
          if (!response.ok) throw new Error("Failed to fetch products");
          const data = await response.json();
          if (search !== "") setProducts(data?.products);
          else setProducts((prev) => [...prev, ...data.products]);
          // else setProducts([...data.products]);
          setHasMore(data.products.length === limit);
        } catch (error) {
          console.log(error);
        }
        setLoading(false);
      }, 1000);
    };
    fetchProducts();
  }, [limit, skip, search, page]);

  const getProducts = async () => {
    const response = await fetch(`${BASE_API_URL}/products?limit=${0}`);
    const data = await response.json();
    setAllData(data?.products);
  };

  const addProduct = (newProduct: any) => {
    setIsUpdating(true);
    setIsProductUpdated(false);
    setTimeout(async () => {
      try {
        const response = await fetch(`${BASE_API_URL}/products/add`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newProduct),
        });
        const data = await response.json();
        setProducts((prev) => [data, ...prev]);
        setAllData((prev) => [data, ...prev]);
        setIsProductUpdated(true);
        setIsUpdating(false);
        toast.success("Product Added Successfully!", {
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
      } catch (err) {
        console.log(err);
      }
    }, 1000);
  };

  const updateProduct = (id: number, updatedProduct: any) => {
    setIsProductUpdated(false);
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
        setAllData((prev) =>
          prev?.map((product) =>
            product.id === updatedData?.id ? updatedData : product
          )
        );
        if (response.ok) {
          setIsProductUpdated(true);
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
    }, 1000);
  };

  const removeProduct = async (id: number) => {
    setIsProductUpdated(false);
    try {
      const response = await fetch(`${BASE_API_URL}/products/${id}`, {
        method: "DELETE",
      });
      const deletedData = await response.json();
      setProducts((prev) => prev.filter((item) => item.id !== deletedData.id));
      setAllData((prev) => prev.filter((item) => item.id !== deletedData.id));
      if (deletedData?.isDeleted) {
        toast.success("Product Deleted Successfully!", {
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
        setIsProductUpdated(true);
      } else {
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
  return (
    <ProductsContext.Provider
      value={{
        isProductUpdated,
        isUpdating,
        products,
        search,
        loading,
        page,
        limit,
        skip,
        hasMore,
        setLimit,
        setPage,
        setSkip,
        setSearch,
        setLoading,
        setHasMore,
        setProducts,
        setIsProductUpdated,
        addProduct,
        updateProduct,
        removeProduct,
        getProducts,
        allData,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductsProvider");
  }
  return context;
};
