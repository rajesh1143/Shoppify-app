import { useState } from "react";
import { BASE_API_URL } from "../service/service";
import { IDeletedItemProps } from "../../typings/typing";

export const useDeleteProducts = () => {
  const [deletedItem, setDeletedItem] = useState({} as IDeletedItemProps);
  const [isDeletedItem,setIsDeletedItem] = useState(false);
  const deleteProduct = async (id: number) => {
    setIsDeletedItem(false);
    try {
      const response = await fetch(`${BASE_API_URL}/products/${id}`);
      const deletedData = await response.json();
      if (deletedData.isDeleted) {
        setDeletedItem(deletedData);
      }
      setIsDeletedItem(true);
      console.log(deletedItem, "di");
      // return true;
    } catch (err) {
      console.log(err);
    }
  };

  return { deleteProduct, deletedItem, isDeletedItem };
};
