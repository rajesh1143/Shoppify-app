import { CART_EMPTY_IMG } from "../common/constants/constants";
import { useNavigate } from "react-router-dom";

const EmptyCartView = () => {
  const navigate = useNavigate();

  const handleNavigation = () => navigate("/");
  return (
    <div className="flex flex-col items-center justify-center">
      <img src={CART_EMPTY_IMG} />
      <p className="text-3xl font-bold">
        Your Cart is <span className="text-red-500">Empty!</span>
      </p>
      <p className="text-lg text-gray-400 mt-2">
        Please Add some items to the cart and check again.
      </p>
      <button
        className="py-4 px-2 w-48 bg-red-500 rounded-xl text-white font-md mt-4"
        onClick={handleNavigation}
      >
        Return to Shop
      </button>
    </div>
  );
};

export default EmptyCartView;
