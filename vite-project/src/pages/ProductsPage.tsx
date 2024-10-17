import { useEffect } from "react";
// import { useGetAllProducts } from "../common/hooks/useGetAllProducts";
import RenderProductItem from "../components/RenderProductItem";
import Header from "../components/header/Header";
import Search from "../components/search/Search";
import { useProducts } from "../provider/ProductsProvider";
// import { ERROR_IMG } from "../common/constants/constants";
import Loader from "../components/Loader/Loader";
import TitleCard from "../components/TitleCard/TitleCard";

const ProductsPage = () => {
  // const [page, setPage] = useState<number>(1);
  // const [limit, setLimit] = useState<number>(10);
  // const [skip, setSkip] = useState<number>(0);
  // const [search, setSearch] = useState<string>("");
  // const [isSearching, setIsSearching] = useState<boolean>(false);
  // const [initalLoading, setIntialLoading] = useState(false);

  // const { products, loading, hasMore } = useGetAllProducts({
  //   limit,
  //   skip,
  //   page,
  //   search,
  // });

  const {
    products,
    search,
    hasMore,
    loading,
    // page,
    limit,
    setPage,
    setLimit,
    setSkip,
    setSearch,
    setLoading,
    setHasMore,
    setProducts,
  } = useProducts();

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 5 && hasMore && !loading) {
      setPage((prev: number) => prev + 1);
      setLimit(15);
      setSkip((prev: number) => prev + limit);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasMore, loading]);

  // console.log("component-rendered");

  const onChange = (searchVal: string) => {
    setLoading(true);
    setSearch(searchVal);
    setPage(1);
    setSkip(0);
    setProducts([]);
    setHasMore(false);
  };

  return (
    <>
      <Header isAdmin={false} children={<Search onChange={onChange} />} />
      {!loading && (
        <div className="py-4 px-4 fixed top-0 left-0 grow w-full z-11 bg-white mt-24">
          <h1 className="font-bold text-md">
            Showing: {products.length} products
          </h1>
        </div>
      )}
      <div className="mt-16">
        {!loading && (
          <TitleCard
            title="Discover Your Next Favourite!"
            subTitle="Explore Our curated selection of must-have items and unbeatable deals."
            isSearch={search !== ""}
          />
        )}
        <div className="grid grid-cols-4 gap-4 p-4">
          <RenderProductItem  item={products} />
        </div>

        {loading && products.length === 0 && search !== "" && (
          <Loader
            loaderText="Searching for your products... Hang tight!"
            showSpinner
          />
        )}

        {loading && products.length === 0 && search === "" && (
          <Loader
            loaderText="Hang tight! we are fetching best deals just for you..."
            showSpinner
          />
        )}

        {!loading && products.length === 0 && (
          <div className="flex justify-center items-center">
            {/* <img src={ERROR_IMG} className="h-[400px] w-[450px]" /> */}
            <p className="text-lg font-bold my-4 text-center">
              Something Gone Wrong,Failed to fetch
            </p>
          </div>
        )}

        {hasMore && (
          <p className="text-lg font-bold my-8 text-center">
            Loading More Products...
          </p>
        )}

        {/* {!loading && !hasMore && products.length !== 0 && (
          <p className="text-lg font-bold my-8 text-center">
            No More items to fetch
          </p>
        )} */}
      </div>
    </>
  );
};

export default ProductsPage;
