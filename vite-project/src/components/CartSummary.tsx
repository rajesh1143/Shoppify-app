import { FC } from "react";
import { useCart } from "../common/hooks/useCart";
import Button from "./button/Button";

const CartSummary: FC = () => {
  const { cartItems } = useCart();

  const getSummary = () => {
    let total = 0;
    let discount = 0;

    cartItems?.forEach((item) => {
      const itemTotal = item?.price * item?.quantity;
      const discountTotal = (item.discountPercentage / 100) * itemTotal;
      total += itemTotal;
      discount += discountTotal;
    });

    const finalTotal = total - discount;

    return { total, discount, finalTotal };
  };

  const { total, discount, finalTotal } = getSummary();
  return (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl font-semibold mb-4">Cart Summary</h2>

      <div className="flex flex-col space-y-4">
        <div className="flex justify-between">
          <span className="text-lg">Sub Total:</span>
          <span className="text-lg">${total?.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-lg">Discount:</span>
          <span className="text-lg">${discount?.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-lg">Shipping Charges:</span>
          <span className="text-lg">Free Delivery</span>
        </div>

        <div className="flex justify-between text-xl font-semibold">
          <span>Total:</span>
          <span>${finalTotal?.toFixed(2)}</span>
        </div>
      </div>
      <Button
        className="w-full mt-10 px-4 py-4 bg-blue-600 text-white rounded hover:bg-blue-700"
        label="Checkout"
        disabled={true}
      />
    </div>
  );
};

export default CartSummary;
