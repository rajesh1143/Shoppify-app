import React, { useEffect, useState } from "react";
import { IProductsType } from "../typings/typing";
import { useCart } from "../common/hooks/useCart";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoIosStarHalf } from "react-icons/io";
// import { useGetAllProducts } from "../common/hooks/useGetAllProducts";
import { useProducts } from "../provider/ProductsProvider";
import EditModal from "./editModel/EditModel";
import DropDown from "./dropdown/DropDown";
import { productDropDownOption } from "../common/constants/constants";
import Loader from "./Loader/Loader";
// import { useAddCart } from "../common/hooks/useAddCart";

interface IProductItemProp {
  item: IProductsType;
  // isEditMode?:boolean;
}

const RenderProductItem: React.FC<IProductItemProp> = ({ item }) => {
  // const [isDisabled,setIsDisabled] = useState<false>(true);
  // const [isHovered, setIsHovered] = useState<boolean>(false);
  // const [isDropDownOpen, setIsDropDownOpen] = useState<boolean>(false);
  // const [isModelOpen, setIsModelOpen] = useState<boolean>(false);
  // const [isEditMode, setIsMode] = useState<boolean>(false);
  // const [selectedItem,] = useState({} as IProductsType);
  const { addToCart, cartItems, updateCartItem } = useCart();
  // const [isUpdating, setIsUpdating] = useState<boolean>(false);
  // const {removeProduct} = useGetAllProducts({});
  // const { isProductUpdated } = useProducts();

  // console.log(isModelOpen, "isModel");

  // useEffect(() => {
  //   if (isProductUpdated) {
  //     setIsDropDownOpen(false);
  //     // setIsUpdating(false);
  //   }
  //   if (isModelOpen) {
  //     setIsDropDownOpen(false);
  //     setIsHovered(false);
  //   }
  // }, [isProductUpdated, isModelOpen]);

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
    } else {
      const addedCartItem = {
        userId: user_id++,
        products: [{ id, quantity }],
      };
      addToCart(addedCartItem);
    }
  };

  // const handleMouseEnter = () => setIsHovered(true);

  // const handleMouseLeave = () => {
  //   setIsHovered(false);
  //   setIsDropDownOpen(false);
  // };

  // const handleDelete = (id: number) => {
  //   // setIsUpdating(true);
  //   removeProduct(id);
  //   setIsDropDownOpen(false);
  // };

  // const handleActionsDropDown = () => {
  //   setIsDropDownOpen(!isDropDownOpen);
  // };

  // const handleEdit = (id: number) => {
  //   const findSelectedItem: IProductsType = products?.find(
  //     (item) => item.id === id
  //   );
  //   setSelectedItem(findSelectedItem);
  //   setIsModelOpen(true);
  // };

  const getLabel = () => {
    const isItemExist = cartItems?.find(
      (cartItem) => cartItem?.id === item?.id
    );
    if (isItemExist) {
      return "Added to Cart";
    } else {
      return "Add to Cart";
    }
  };

  // const handleClose = () => {
  //   setIsModelOpen(false);
  //   setSelectedItem(undefined);
  // };
  return (
    <>
      <div
        className="flex flex-col grow border rounded-lg shadow-lg p-4 min-h-[370px] w-[390px] relative"
        // onMouseEnter={handleMouseEnter}
        // onMouseLeave={handleMouseLeave}
      >
        {/* {isHovered && !isModelOpen && (
          <span className="absolute top-2 right-2 cursor-pointer">
            <BsThreeDotsVertical size={21} onClick={handleActionsDropDown} />
          </span>
        )} */}
        {/* {isDropDownOpen && isHovered && !isModelOpen && (
          <DropDown
            options={productDropDownOption}
            item={item}
            style={{ top: "32px", right: "16px" }}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )} */}
        {/* {isUpdating && (
          <Loader
            loaderText="Deleting..."
            showSpinner={false}
            blurBackground={true}
            overlay={true}
          />
        )} */}
        <img src={item?.thumbnail} className="h-40 w-full object-contain" />
        <div className="grow">
          <h1 className="text-xl font-bold mb-2">{item?.title}</h1>
          <p className="text-base text-gray-400 mb-2">{item?.description}</p>
          <p className="text-lg font-semibold mb-2">Price:${item?.price}</p>
          <p className="flex items-center text-sm mb-2">
            Ratings:
            <span
              className={`my-1 ${
                item.rating < 3 ? "text-red-500" : "text-yellow-500"
              }`}
            >
              <IoIosStarHalf size={18} />
            </span>
            {item?.rating}
          </p>
        </div>
        <div>
          <button
            className={`py-3 mb-2 w-full text-lg text-white font-semibold rounded-md shadow-lg hover:translate-y-[1px] ${
              getLabel() === "Added to Cart" ? "bg-green-500" : "bg-blue-500"
            }`}
            // disabled={isDisabled}
            onClick={() => handleAddCart(item?.id)}
            // disabled={isModelOpen}
          >
            {getLabel()}
          </button>
          {/* <button onClick={() => handleDelete(item?.id)}>Delete</button> */}
        </div>
      </div>
      {/* {isModelOpen && (
        <EditModal
          product={selectedItem}
          // onClose={handleClose}
          setIsEditMode={setIsModelOpen}
        />
      )} */}
    </>
  );
};

export default RenderProductItem;
