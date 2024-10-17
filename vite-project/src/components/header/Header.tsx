// import React from 'react'

import {
  LOGO_URL,
  newProduct,
  profileDropDownOption,
} from "../../common/constants/constants";
import { IoCart } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { useCart } from "../../common/hooks/useCart";
import { CSSProperties, FC, ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DropDown from "../dropdown/DropDown";
import EditModal from "../editModel/EditModel";
import { useProducts } from "../../provider/ProductsProvider";

interface IHeaderProps {
  children?: ReactNode;
  isAdmin: boolean;
  style?: CSSProperties;
}

const Header: FC<IHeaderProps> = ({ children, isAdmin, style }) => {
  const [cartLength, setCartLength] = useState<number | undefined>(undefined);
  const [isProfileClicked, setIsProfileClicked] = useState<boolean>(false);
  // const [isEditMode, setIsEditMode] = useState<boolean>(false);
  // const { setIsProductUpdated } = useProducts();
  const { cartItems } = useCart();
  // const { addProduct } = useProducts();
  const navigate = useNavigate();

  useEffect(() => {
    let length = 0;
    const cartL = cartItems?.map((item) => (length += item.quantity));
    setCartLength([...cartL].reverse()[0]);
    // setCartLength(cartL);
  }, [cartItems]);

  const handleCartPageNavigation = () => navigate("/cart");
  const handleHomeNavigation = () => navigate("/");

  const handleProfile = () => {
    setIsProfileClicked(!isProfileClicked);
  };

  const handleAdmin = () => {
    // setIsProductUpdated(false);
    // setIsEditMode(true);
    // setIsProfileClicked(false);
    navigate("/admin")
  };

  return (
    <>
      <header
        className={`py-4 px-4 fixed top-0 w-full z-10 bg-white shadow-md ${
          isAdmin ? "left-100" : "left-0"
        }`}
        style={style}
      >
        <nav className="flex justify-between items-center px-1">
          <div className="flex flex-col items-center cursor-pointer">
            {!isAdmin && (
              <img
                src={LOGO_URL}
                className="h-12 w-12"
                onClick={handleHomeNavigation}
              />
            )}
            <h1 className="text-sm font-bold">
              {isAdmin ? "Products Management" : "Shoppify"}
            </h1>
            {/* <h1 className="text-xl font-bold">
              {isAdmin ? "Products Management" : "Shoppify"}
            </h1> */}
          </div>
          <ul className="flex items-center gap-x-4">
            <li>{children}</li>
            <li className="flex cursor-pointer">
              <IoCart size={34} onClick={handleCartPageNavigation} />
              {cartLength && (
                <span className="flex justify-center items-center font-bold bg-blue-100 rounded-2xl p-1 h-6 w-6 text-center ml-[-5px] mt-[-5px]">
                  {cartLength}
                </span>
              )}
            </li>
            <li className="cursor-pointer">
              <CgProfile size={32} onClick={handleProfile} />
            </li>
          </ul>
        </nav>
        {/* {isAdmin && (
          <button
            type="button"
            className="py-4 bg-blue-500 px-6 rounded-md text-white font-semibold hover:bg-blue-600"
          >
            Add Product
          </button>
        )} */}
        {isProfileClicked && (
          <DropDown
            options={profileDropDownOption}
            style={{ top: "5rem", right: "1.5rem" }}
            isAdmin={handleAdmin}
          />
        )}
      </header>
      {/* {isEditMode && (
        <EditModal
          isNew={true}
          product={newProduct}
          setIsEditMode={setIsEditMode}
        />
      )} */}
    </>
  );
};

export default Header;
