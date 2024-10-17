import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import EditModal from "../../components/editModel/EditModel";
import { IProductsType } from "../../typings/typing";
import { useProducts } from "../../provider/ProductsProvider";
import { columns, newProduct } from "../../common/constants/constants";
import DataTable from "../../components/table/Table";
import Page from "../../components/page/Page";
import Button from "../../components/button/Button";

const ProductsManagement = () => {
  // const [rowData,setRowData] = useState<ITrowsProps[]>([]);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState({} as IProductsType);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  //   const { products } = useGetAllProducts();
  const { products, removeProduct, setIsProductUpdated } = useProducts();

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  console.log(isEdit, "isedit");

  const handleAddProduct = () => {
    setIsProductUpdated(false);
    setIsEdit(true);
    setIsAdding(true);
  };

  const handleEdit = (id: number) => {
    setIsAdding(false);
    setIsProductUpdated(false);
    const getSelectedRow = products.find((item) => item.id === id);
    setSelectedItem(getSelectedRow as IProductsType);
    setIsEdit(true);
  };

  const handleDelete = (id: number) => {
    removeProduct(id);
  };

  const rows =
    products?.length > 0 &&
    products.map((item) => ({
      id: item?.id,
      title: item?.title,
      description: item?.description,
      image: <img src={item?.thumbnail} className="h-10 w-10" />,
      price: item?.price,
      rating: item?.rating,
      actions: (
        <div className="flex items-center gap-x-5">
          <button
            className="text-blue-500 cursor-pointer"
            onClick={() => handleEdit(item?.id as number)}
          >
            <FaEdit size={21} />
          </button>
          <button
            className="text-red-500 cursor-pointer"
            onClick={() => handleDelete(item.id as number)}
          >
            <FaTrashCan size={21} />
          </button>
        </div>
      ),
    }));

  return (
    <>
      <Page
        title="Products Management"
        isLoading={isLoading}
        action={
          <Button
            className="py-3 bg-blue-500 px-6 rounded-md text-white font-semibold hover:bg-blue-600"
            type="button"
            label="Add Product"
            onClick={handleAddProduct}
          />
        }
        children={
          <div
            className="p-2"
            style={{
              overflowY: "auto",
              flex: 1,
              maxHeight: 800,
              width: "fit-content",
            }}
          >
            <DataTable rows={rows} columns={columns} />
          </div>
        }
      />

      {isEdit && (
        <EditModal
          product={isAdding ? newProduct : selectedItem}
          isEditMode={isEdit}
          setIsEditMode={setIsEdit}
          isNew={isAdding}
        />
      )}
    </>
  );
};

export default ProductsManagement;
