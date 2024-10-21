import { useCart } from "../common/hooks/useCart";
import Button from "../components/button/Button";
import CartSummary from "../components/CartSummary";
import EmptyCartView from "../components/EmptyCartView";
import Header from "../components/header/Header";
import RenderCartItem from "../components/RenderCartItem";

const CartPage = () => {
  const { cartItems, setCartItems } = useCart();

  const handleClearAllCart = () => setCartItems([]);

  return (
    <>
      <Header isAdmin={false} />
      <div className="flex flex-col md:flex-row p-4 space-y-4 md:space-y-0 md:space-x-6 mt-32 overflow-hidden">
        <div className="w-full h-full bg-white rounded-lg p-4">
          {cartItems?.length !== 0 && (
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold mb-4">Your Cartitems</h1>
              <Button
                className="underline text-lg font-semibold text-red-500"
                label="Clear All"
                onClick={handleClearAllCart}
              />
            </div>
          )}
          <div className="flex flex-col gap-y-4 overflow-y-auto max-h-[calc(100vh-120px)]">
            {cartItems?.map((item) => (
              <RenderCartItem key={item?.id} cartItem={item} />
            ))}
            {cartItems.length === 0 && <EmptyCartView />}
          </div>
        </div>
        {cartItems.length !== 0 && (
          <div className="w-full md:w-1/3 h-1/2 shadow-md rounded-lg p-6">
            <CartSummary />
          </div>
        )}
      </div>
    </>
  );
};

export default CartPage;
