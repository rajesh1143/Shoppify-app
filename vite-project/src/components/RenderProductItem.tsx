import React, { useState } from "react";
import { IProductsType } from "../typings/typing";
import { useCart } from "../common/hooks/useCart";
import { IoIosStarHalf } from "react-icons/io";
// import { useGetAllProducts } from "../common/hooks/useGetAllProducts";
import Button from "./button/Button";
// import { useAddCart } from "../common/hooks/useAddCart";

interface IProductItemProp {
  item: IProductsType[];
  isEditMode?: boolean;
}

const RenderProductItem: React.FC<IProductItemProp> = ({
  item,
  isEditMode,
}) => {
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const { addToCart, cartItems, updateCartItem, isUpdating } = useCart();

  const handleAddCart = (id: number) => {
    let user_id = 1;
    const quantity = 1;

    const existingCartItem = cartItems.find((item) => item.id === id);

    if (existingCartItem) {
      const updatedCartItem = {
        merge: false,
        products: [
          {
            id,
            quantity: existingCartItem.quantity + 1,
          },
        ],
      };
      updateCartItem(updatedCartItem);
      setSelectedItem(updatedCartItem?.products[0]?.id);
    } else {
      const addedCartItem = {
        userId: user_id++,
        products: [{ id, quantity }],
      };
      addToCart(addedCartItem);
      setSelectedItem(addedCartItem?.products[0]?.id);
    }
  };

  // const getLabel = () => {
  //   const isItemExist = cartItems?.find(
  //     (cartItem) => cartItem?.id === item?.id
  //   );
  //   if (isItemExist) {
  //     return "Added to Cart";
  //   } else {
  //     return "Add to Cart";
  //   }
  // };
  // console.log(item);
  return (
    <>
      {item?.map((items) => (
        <>
          <div key={items?.id} className="flex flex-col grow border rounded-lg shadow-lg p-4 relative">
            <img
              src={items?.thumbnail}
              className="h-40 w-full object-contain"
            />
            <div className="grow">
              <h1 className="text-xl font-bold mb-2">{items?.title}</h1>
              <p className="text-base text-gray-400 mb-2">
                {items?.description}
              </p>
              <p className="text-lg font-semibold mb-2">
                Price:${items?.price}
              </p>
              <p className="flex items-center text-sm mb-2">
                Ratings:
                <span
                  className={`my-1 ${
                    items.rating < 3 ? "text-red-500" : "text-yellow-500"
                  }`}
                >
                  <IoIosStarHalf size={18} />
                </span>
                {items?.rating}
              </p>
            </div>
            <Button
              key={items?.id}
              children={
                <button
                  key={items?.id}
                  className={`py-3 mb-2 w-full text-lg text-white font-semibold rounded-md shadow-lg hover:translate-y-[1px] ${isUpdating && selectedItem === items.id ? "bg-blue-300" : "bg-blue-500"}`}
                  disabled={
                    isEditMode || (isUpdating && selectedItem === items.id)
                  }
                  onClick={() => {
                    handleAddCart(items?.id as number);
                  }}
                >
                  {isUpdating && selectedItem === items.id
                    ? "Adding..."
                    : "Add to Cart"}
                </button>
              }
            />
          </div>
        </>
      ))}
    </>
  );
};

export default RenderProductItem;
