import { WISHLIST_IMG } from "../common/constants/constants";
import { useWishList } from "../common/hooks/useWishList";
import Button from "../components/button/Button";
import Header from "../components/header/Header";
import RenderProductItem from "../components/RenderProductItem";
import { FaRegHeart } from "react-icons/fa";

const WishListPage = () => {
  const { wishList, setWishList } = useWishList();
  //   console.log(wishList, "w");
  const handleClearWishList = () => {
    setWishList([]);
  };
  return (
    <div className="relative">
      <Header isAdmin={false} isWishList={true} />
      {wishList.length !== 0 && (
        <>
          <header className="flex justify-center items-center gap-x-4 py-6 px-6 mt-28">
            <h1 className="text-4xl font-bold">Your WishList</h1>
            <span className="text-red-500">
              <FaRegHeart size={40} />
            </span>
          </header>
          <Button
            label="Clear All"
            className="py-2 px-4 rounded text-white font-semibold bg-blue-500 hover:bg-blue-600 absolute top-32 right-10"
            onClick={handleClearWishList}
          />
          <div className="grid grid-cols-4 gap-4 p-8">
            <RenderProductItem item={wishList} />
          </div>
        </>
      )}
      {wishList.length === 0 && (
        <div className="flex flex-col justify-center items-center mt-72">
          <img src={WISHLIST_IMG} className="h-48 w-48" />
          <h1 className="text-3xl font-semibold">Your WishList is Empty!</h1>
          {/* <p>Please add some</p> */}
        </div>
      )}
    </div>
  );
};

export default WishListPage;
