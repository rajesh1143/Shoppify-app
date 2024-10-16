/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { IProductsType } from "../typings/typing";
import { BASE_API_URL } from "../common/service/service";
import { Flip, toast } from "react-toastify";

interface IProductsProviderProps {
  children: ReactNode;
}

interface IProductsContextType {
  products: IProductsType[];
  search: string;
  loading: boolean;
  hasMore: boolean;
  page: number;
  setPage: (val: number) => void;
  limit: number;
  setLimit: (val: number) => void;
  skip: number;
  setSkip: (val: number) => void;
  setSearch: (val: string) => void;
  setLoading: (val: boolean) => void;
  setProducts: (val: IProductsType[]) => void;
  setHasMore: (val: boolean) => void;
  isProductUpdated: boolean;
  setIsProductUpdated: (val: boolean) => void;
  addProduct: (prod: any) => void;
  updateProduct: (val: number, prod: Record<string, any>) => void;
  removeProduct: (id: number) => void;
}

export const ProductsContext = createContext({} as IProductsContextType);

export const ProductsProvider: FC<IProductsProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<IProductsType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(15);
  const [skip, setSkip] = useState<number>(0);
  const [search, setSearch] = useState<string>("");
  const [isProductUpdated, setIsProductUpdated] = useState<boolean>(false);

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
          setHasMore(data.products.length === limit);
        } catch (error) {
          console.log(error);
        }
        setLoading(false);
      }, 1000);
    };
    fetchProducts();
  }, [limit, skip, search, page]);

  const addProduct = (newProduct: any) => {
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
      } catch (err) {
        console.log(err);
      } finally {
        setIsProductUpdated(true);
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
        const updatedData = await response.json();
        // const filtered = products.filter((item) => item.id !== updatedData.id);
        // setProducts([updatedData, ...filtered]);
        setProducts((prev) =>
          prev?.map((product) =>
            product.id === updatedData?.id ? updatedData : product
          )
        );
      } catch (err) {
        console.log(err);
      } finally {
        setIsProductUpdated(true);
        toast.success("Product Updated Successfully!", {
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
    } catch (err) {
      console.log(err);
    } finally {
      // setIsProductUpdated(true);
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
    }
  };
  return (
    <ProductsContext.Provider
      value={{
        isProductUpdated,
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
