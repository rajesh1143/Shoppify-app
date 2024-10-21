import { useEffect, useState } from "react";
import Header from "../components/header/Header";
import { useProducts } from "../provider/ProductsProvider";
import { useParams } from "react-router-dom";
import { IProductsType } from "../typings/typing";
import Loader from "../components/Loader/Loader";
import Button from "../components/button/Button";
import { FaHeart } from "react-icons/fa6";
import { MdShoppingCart } from "react-icons/md";
import { useWishList } from "../common/hooks/useWishList";
import { useCart } from "../common/hooks/useCart";

const ProductsDetailPage = () => {
  const [data, setData] = useState({} as IProductsType);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedImg, setSelectedImg] = useState<string>("");
  const { products } = useProducts();
  const {addWishList} = useWishList();
  const {addToCart} = useCart();
  const { id } = useParams();

  useEffect(() => {
    if (products.length !== 0) {
      setLoading(true);
      setTimeout(() => {
        const findSelectedItem = products?.find((item) => item.id == id);
        setData(findSelectedItem as IProductsType);
        setSelectedImg(findSelectedItem?.thumbnail as string);
        setLoading(false);
      }, 1000);
    }
  }, [id, products]);

  const handleImgSelection = (img: string) => {
    setSelectedImg(img);
  };

  const handleAddWishList = () => {
    addWishList(data);
  }
  
  const handleAddToCart = () => {
    addToCart(data)
  }
  
  return (
    <div>
      <Header isAdmin={false} />
      {loading ? (
        <div className="mt-32">
          <Loader
            isModel={true}
            loaderText="Hang tight! Your Product is being fetching..."
            showSpinner={false}
          />
        </div>
      ) : (
        <div className="mt-36 px-20 py-6">
          <div className="flex gap-x-8">
            <div
              className="shadow-lg bg-red-100"
              style={{ height: "500px", width: "550px" }}
            >
              <img src={selectedImg} className="h-full w-full" />
              <div className="flex gap-4 mt-4">
                {data?.images?.map((item, i) => (
                  <div
                    key={i}
                    className="h-32 w-32 rounded shadow-md cursor-pointer"
                    onClick={() => handleImgSelection(item)}
                  >
                    <img src={item} className="h-full w-full" />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h1 className="text-4xl font-bold">{data?.title}</h1>
              <p className="text-xl font-semibold text-gray-400 mt-3">
                {data?.description}
              </p>
              <h3 className="text-3xl font-bold mt-3">${data?.price}</h3>
              <h2 className="text-lg mt-3 font-semibold">
                In Stock: Only {data?.stock}{" "}
                <span className="text-lg text-red-500 font-semibold">
                  Left,<span className="text-xl font-bold ml-2">Hurry!</span>
                </span>
              </h2>
              <h2 className="text-lg font-semibold mt-3">
                {data?.shippingInformation}
              </h2>
              <div className="flex items-center gap-x-4 mt-3">
                <Button
                  className="flex items-center gap-x-2 py-3 px-8 bg-red-400 text-white rounded font-semibold cursor-pointer hover:bg-red-500"
                  label="WishList"
                  icon={<FaHeart size={16}/>}
                  onClick={handleAddWishList}
                />
                <Button
                  className="flex items-center gap-x-2 py-3 px-8 bg-blue-400 text-white rounded font-semibold cursor-pointer hover:bg-blue-500"
                  label="Add to Cart"
                  icon={<MdShoppingCart size={16}/>}
                  onClick={handleAddToCart}
                />
              </div>
              <div id="product-detail-section">
                <h1 className="text-red-500 text-xl font-semiboldf mt-3">
                  Product Detail
                </h1>
              </div>
              <h3 className="text-lg font-semibold mt-2">Category: {data?.category}</h3>
              <h3 className="text-lg font-semibold mt-2">SKU: {data?.sku}</h3>
              <h3 className="text-lg font-semibold mt-2">Weight: {data?.weight}</h3>
              <h3 className="text-lg font-semibold mt-2">Return Policy: {data?.returnPolicy}</h3>
              <h3 className="text-lg font-semibold mt-2">Warranty Information: {data?.warrantyInformation}</h3>
            </div>
          </div>
        </div>
      )}<div>
        <hr className="mt-32"/>
      </div>
    </div>
  );
};

export default ProductsDetailPage;
