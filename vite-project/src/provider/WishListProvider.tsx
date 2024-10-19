import { createContext, ReactNode, useContext, useState } from "react";
import { IProductsType } from "../typings/typing";

interface IWishListProviderProps {
  children: ReactNode;
}

interface IWishListContextType {
  wishList: IProductsType[];
  setWishList: (val: []) => void;
  addWishList: (val: IProductsType) => void;
  removeWishList: (val: number) => void;
  isInWishList: (val: number) => boolean;
}

export const WishListContext = createContext({} as IWishListContextType);

export const WishListProvider = ({ children }: IWishListProviderProps) => {
  const [wishList, setWishList] = useState<IProductsType[]>([]);

  const addWishList = (product: IProductsType) => {
    // console.log(product, "wprod");
    setWishList((prev) => [...prev, product]);
  };
  //   console.log(wishList, "wl");
  const removeWishList = (id: number) => {
    setWishList((prev) => prev.filter((item) => item.id !== id));
  };

  const isInWishList = (id: number) => {
    return wishList.some((item) => item.id === id);
  };

  return (
    <WishListContext.Provider
      value={{
        wishList,
        addWishList,
        setWishList,
        removeWishList,
        isInWishList,
      }}
    >
      {children}
    </WishListContext.Provider>
  );
};
