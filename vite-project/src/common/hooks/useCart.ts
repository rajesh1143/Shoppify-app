import { useContext } from "react";
import { CartContext } from "../../provider/CartProvider";

export const useCart = () => {
  const context = useContext(CartContext);

  return context;
};
