/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, FC, ReactNode, useState } from "react";
import { BASE_API_URL } from "../common/service/service";
import { ICartItemType } from "../typings/typing";
import { Flip, toast } from "react-toastify";

interface ICartProviderType {
  cartItems: ICartItemType[];
  setCartItems:(val:ICartItemType[])=>void;
  addToCart: (product: any) => void;
  removeFromCart: (id: number) => void;
  updateCartItem: (item: any) => void;
  isUpdating: boolean;
}

interface CartProviderProps {
  children: ReactNode;
}

export const CartContext = createContext({} as ICartProviderType);

export const CartProvider: FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<ICartItemType[]>([]);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  // console.log(cartItems,"ci")

  const addToCart = (product: any) => {
    setIsUpdating(true);
    setTimeout(async () => {
      try {
        const response = await fetch(`${BASE_API_URL}/carts/add`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(product),
        });
        const data = await response.json();
        setCartItems((prev) => [...prev, ...data.products]);
        setIsUpdating(false);
      } catch (err) {
        console.log(err);
      }
    }, 1000);
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
        toast.info("Item Removed Successfully!", {
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

  const updateCartItem = (item: any) => {
    setIsUpdating(true);
    setTimeout(async () => {
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
        // const filtered = cartItems?.filter((item) => item?.id !== data?.id);
        setCartItems((prev) =>
          prev.map((eachItem) =>
            eachItem.id === data.id ? data?.products[0] : eachItem
          )
        );
        setIsUpdating(false);
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
    }, 100);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        updateCartItem,
        isUpdating,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
