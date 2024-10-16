import { FC } from "react";
import { FaTrashCan } from "react-icons/fa6";
import { ICartItemType } from "../typings/typing";
import { useCart } from "../common/hooks/useCart";

interface ICartItemProps {
  cartItem: ICartItemType;
}

const RenderCartItem: FC<ICartItemProps> = ({ cartItem }) => {
  const { removeFromCart } = useCart();
  const handleDeleteCart = (id: number) => {
    removeFromCart(id);
  };
  return (
    <div className="py-2 w-full px-4 border rounded-lg shadow-lg min-h-28">
      <div className="flex justify-between items-center px-2">
        <div className="flex items-center">
          <img src={cartItem?.thumbnail} className="h-20 min-w-24 object-contain" />
          <div className="ml-2">
            <h1 className="text-lg font-bold">{cartItem?.title}</h1>
            <div className="flex items-center mt-2 hover:cursor-pointer" onClick={()=>handleDeleteCart(cartItem.id)}>
              <FaTrashCan size={14} className="text- text-gray-400" />
              <p className="text-md text-gray-400 ml-2 hover:text-gray-500">Remove Item</p>
            </div>
          </div>
        </div>
        <div>
          <p>
            quantity:<span className="ml-2">{cartItem?.quantity}</span>
          </p>
        </div>
        <div>
          <p>
            price:$<span className="ml-2">{cartItem?.price}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RenderCartItem;
