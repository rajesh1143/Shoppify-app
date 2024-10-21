import { FC, useEffect, useState } from "react";
import { IProductsType } from "../typings/typing";
import { useProducts } from "../provider/ProductsProvider";
import { useNavigate } from "react-router-dom";

interface ISimilarProductsProps {
  selectedItem: IProductsType;
}
const SimilarProducts: FC<ISimilarProductsProps> = ({ selectedItem }) => {
  const [similarProducts, setSimilarProducts] = useState<IProductsType[]>([]);
  const { allData } = useProducts();
  const navigate = useNavigate();

  useEffect(() => {
    const findSimilarProducts = allData.filter(
      (item) => item.category === selectedItem?.category
    );
    setSimilarProducts(
      findSimilarProducts.filter((item) => item.id !== selectedItem.id)
    );
  }, [selectedItem, allData]);
  //   console.log(similarProducts, "sm");
  //   console.log(selectedItem, "data");
  //   console.log(products, "products");
  return (
    <section className="mt-3 p-6">
      <h1 className="text-3xl font-bold">Similar Products</h1>
      <div className="flex items-center gap-x-4 mt-4 overflow-x-auto">
        {similarProducts?.map((item) => (
          <div
            className="h-92 min-w-80 border rounded shadow-md cursor-pointer p-4"
            onClick={() => navigate(`/products-detail/${item?.id}`)}
          >
            <img src={item?.thumbnail} className="h-full w-full" />
            <div className="flex justify-between">
              <h1
                className="text-lg font-bold mt-3 truncate w-48"
                title={item?.title}
              >
                {item?.title}
              </h1>
              <p className="text-xl text-gray-500 font-bold mt-2">
                $ {item?.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SimilarProducts;
