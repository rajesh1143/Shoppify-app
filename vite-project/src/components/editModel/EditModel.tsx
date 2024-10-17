/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import RenderProductItem from "../RenderProductItem";
import { IProductsType } from "../../typings/typing";
import { useProducts } from "../../provider/ProductsProvider";
import { IoIosClose } from "react-icons/io";
import Loader from "../Loader/Loader";

interface EditModalProps {
  isNew?: boolean;
  isEditMode:boolean;
  product: IProductsType;
  setIsEditMode: (val: boolean) => void;
  // setIsDropdownOpen: (val: boolean) => void;
}
const EditModal: React.FC<EditModalProps> = ({
  isNew,
  product,
  isEditMode,
  // onClose,
  setIsEditMode,
}) => {
  const [updatedProduct, setUpdatedProduct] = useState<IProductsType>(product);
  const [newData,setNewData] = useState([]);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const { updateProduct, addProduct, isProductUpdated } = useProducts();

  console.log(product,"ss")

  useEffect(() => {
    if (isProductUpdated) {
      setIsUpdating(false);
      console.log("rren")
      setIsEditMode(false);
    }
  }, [isProductUpdated]);

  console.log(isProductUpdated,"isprod")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedProduct({ ...updatedProduct, [name]: value });
  };

  const getDiff = (
    prevProduct: Record<string, any>,
    updatedProduct: Record<string, any>
  ) => {
    const newObj: Record<string, any> = {};

    Object.keys(prevProduct).forEach((key) => {
      if (prevProduct[key] !== updatedProduct[key]) {
        newObj[key] = updatedProduct[key];
      }
    });

    return newObj;
  };

  const handleSave = () => {
    if (isNew) {
      setIsUpdating(true);
      addProduct(updatedProduct);
    } else {
      const updatedData = getDiff(product, updatedProduct);
      setIsUpdating(true);
      updateProduct(product?.id as number, updatedData);
    }
  };
  const handleClose = () => {
    setIsEditMode(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
      <div className="relative w-3/5 h-auto bg-white p-6 rounded-lg shadow-lg z-10">
        <div>
          <button
            className="absolute top-2 right-4 font-bold rounded-md hover:bg-gray-200"
            onClick={handleClose}
          >
            <IoIosClose size={34} />
          </button>
        </div>
        {isUpdating && (
          <Loader
            loaderText={isNew ? "Adding New Product..." : "Updating Changes..."}
            showSpinner={false}
            blurBackground={true}
            isModel={true}
          />
        )}
        <div className="flex space-x-8">
          <div className="w-1/2">
            <RenderProductItem item={[updatedProduct]} isEditMode={isEditMode}/>
          </div>
          <div className="w-1/2">
            <h2 className="text-2xl font-bold mb-4">
              {isNew ? "Add Product" : "Edit Product"}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block font-medium">Title</label>
                <input
                  type="text"
                  name="title"
                  value={updatedProduct?.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div>
                <label className="block font-medium">Description</label>
                <input
                  type="text"
                  name="description"
                  value={updatedProduct.description}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div>
                <label className="block font-medium">ThumbNail</label>
                <input
                  type="text"
                  name="thumbnail"
                  value={updatedProduct?.thumbnail}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div>
                <label className="block font-medium">Price</label>
                <input
                  type="number"
                  name="price"
                  value={updatedProduct?.price}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              {/* <div>
                <label className="block font-medium">Ratings</label>
                <input
                  type="number"
                  name="Ratings"
                  value={updatedProduct?.rating}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div> */}
            </div>
            <div className="mt-6">
              <button
                className="px-4 py-2 bg-blue-600 text-white text-md font-bold rounded hover:bg-blue-700"
                onClick={handleSave}
                // disabled
              >
                {/* {isUpdating ? "Loading..." : "Save"} */}
                {isNew ? "Add" : "Update"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EditModal;
