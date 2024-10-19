import { useContext } from "react";
import { WishListContext } from "../../provider/WishListProvider";

export const useWishList = () => {
  const context = useContext(WishListContext);
  if (!context) {
    throw new Error("useWishList must be used within a WhishListContext");
  }
  return context;
};
