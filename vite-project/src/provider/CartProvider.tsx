/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, FC, ReactNode, useState } from "react";
import { BASE_API_URL } from "../common/service/service";
import { ICartItemType } from "../typings/typing";
import { Flip, toast } from "react-toastify";

interface ICartProviderType {
  cartItems: ICartItemType[];
  addToCart: (product: any) => void;
  removeFromCart: (id: number) => void;
  updateCartItem: (item: any) => void;
}

interface CartProviderProps {
  children: ReactNode;
}

export const CartContext = createContext({} as ICartProviderType);

export const CartProvider: FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<ICartItemType[]>([]);

  // console.log(cartItems,"ci")

  const addToCart = async (product: any) => {
    try {
      const response = await fetch(`${BASE_API_URL}/carts/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      const data = await response.json();
      setCartItems((prev) => [...prev, ...data.products]);
    } catch (err) {
      console.log(err);
    }
  };

  const removeFromCart = async (id: number) => {
    try {
      const response = await fetch(`${BASE_API_URL}/carts/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      console.log(data, "datafp");
      if (data?.isDeleted) {
        const filteredItems = cartItems?.filter(
          (item) => item?.id !== data?.id
        );
        setCartItems(filteredItems);
        toast.info('Item Removed Successfully!', {
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
    } catch (err) {
      console.log(err);
    }
  };

  const updateCartItem = async (item:any) => {
    // console.log(item, "uprod");
    try {
      const response = await fetch(
        `${BASE_API_URL}/carts/${item?.products[0]?.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item),
        }
      );
      const data = await response.json();
      const filtered = cartItems?.filter((item) => item?.id !== data?.id);
      setCartItems([...filtered,...data.products])
      // toast.success('Item added to the cart!', {
      //   position: "bottom-right",
      //   autoClose: 1500,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "colored",
      //   transition: Flip,
      //   });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateCartItem }}
    >
      {children}
    </CartContext.Provider>
  );
};
