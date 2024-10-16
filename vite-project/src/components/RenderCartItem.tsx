import { FC } from "react";
import { FaTrashCan } from "react-icons/fa6";
import { ICartItemType } from "../typings/typing";
import { useCart } from "../common/hooks/useCart";
import { IoIosAdd } from "react-icons/io";
import { RiSubtractLine } from "react-icons/ri";
import { FaSortUp } from "react-icons/fa";

interface ICartItemProps {
  cartItem: ICartItemType;
}

const RenderCartItem: FC<ICartItemProps> = ({ cartItem }) => {
  const { cartItems, removeFromCart, updateCartItem } = useCart();

  const handleQty = (item: any, action: string) => {
    // const n = cartItems.find((Citem) => Citem.id === item.id);
    if (action === "add") {
      const updatedData = {
        merge: false,
        products: [
          {
            id: item.id,
            quantity: item.quantity + 1,
          },
        ],
      };
      console.log(updatedData, "nO");
      updateCartItem(updatedData);
    }

    if (action === "reduce" && item.quantity !== 1) {
      const updatedData = {
        merge: false,
        products: [
          {
            id: item.id,
            quantity: item.quantity - 1,
          },
        ],
      };
      console.log(updatedData, "nO");
      updateCartItem(updatedData);
    }
  };
  const handleDeleteCart = (id: number) => {
    removeFromCart(id);
  };
  return (
    <div className="py-2 w-full px-4 border rounded-lg shadow-lg min-h-28">
      <div className="flex justify-between items-center px-2">
        <div className="flex items-center">
          <img
            src={cartItem?.thumbnail}
            className="h-20 min-w-24 object-contain"
          />
          <div className="ml-2">
            <h1 className="text-lg font-bold">{cartItem?.title}</h1>
            <p className="flex items-center text-md font-semibold text-gray-500">
              Quantity:
              <span className="ml-3 cursor-pointer" onClick={()=>handleQty(cartItem,"reduce")}>
                <RiSubtractLine />
              </span>
              <span className="ml-2">{cartItem?.quantity}</span>
              <span
                className="ml-2 cursor-pointer"
                onClick={() => handleQty(cartItem, "add")}
              >
                <IoIosAdd />
              </span>
            </p>
            <div
              className="flex items-center mt-2 hover:cursor-pointer"
              onClick={() => handleDeleteCart(cartItem.id)}
            >
              <FaTrashCan size={14} className="text- text-gray-400" />
              <p className="text-md text-gray-400 ml-2 hover:text-gray-500">
                Remove Item
              </p>
            </div>
          </div>
        </div>
        <div className="">
          <p className="text-lg font-semibold text-start">
            price:$<span className="ml-2">{cartItem?.price}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RenderCartItem;
