import Menu from "../../components/menu/Menu";
import ProductsManagement from "./ProductsManagement";

const AdminDashboard = () => {
  // const [rows,setRows] = useState<ITrowsProps[]>([]);
  // const {products } = useGetAllProducts();

  // useEffect(()=>{
  //     prepareRows();
  // },[products])

  // const prepareRows = () => {
  //     const tableRows = products?.map((item)=> (
  //         {
  //             id:item?.id,
  //             title:item?.title,
  //             description:item?.description,
  //             image:<img src={item.images[0]} className="h-10 w-10"/>,
  //             price:item?.price,
  //             rating:item?.rating,
  //             actions:actions
  //         }
  //     ))
  //     console.log(tableRows,"tr")
  //     setRows(tableRows);
  // }
  // console.log(rows,"rows")
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-2">
        <Menu />
      </div>
      <div className="col-span-10">
        <ProductsManagement />
      </div>
    </div>
  );
};

export default AdminDashboard;
