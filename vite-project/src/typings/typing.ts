/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IProductsType {
  id: number|undefined;
  title: string;
  description: string;
  category: string;
  price: number|string;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
  }[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
  images: string[];
  thumbnail: string;
}

export interface IDeletedItemProps extends IProductsType {
  isDeleted:boolean;
}

export interface ICartItemType {
  id: number;
  title: string;
  price: string;
  quantity: number;
  total: number;
  discountPercentage: number;
  discountedPrice: number;
  thumbnail: string;
}

export interface IProductsContextType {
  products: IProductsType[];
  search: string;
  loading: boolean;
  hasMore: boolean;
  page: number;
  setPage: (val: number) => void;
  limit: number;
  setLimit: (val: number) => void;
  skip: number;
  setSkip: (val: number) => void;
  setSearch: (val: string) => void;
  setLoading: (val: boolean) => void;
  setProducts: (val: IProductsType[]) => void;
  setHasMore: (val: boolean) => void;
  isProductUpdated: boolean;
  isUpdating: boolean;
  setIsProductUpdated: (val: boolean) => void;
  addProduct: (prod: any) => void;
  updateProduct: (val: number, prod: Record<string, any>) => void;
  removeProduct: (id: number) => void;
  getProducts: () => void;
  allData: IProductsType[];
}

export interface ICartProviderType {
  cartItems: ICartItemType[];
  setCartItems:(val:ICartItemType[])=>void;
  addToCart: (product: any) => void;
  removeFromCart: (id: number) => void;
  updateCartItem: (item: any) => void;
  isUpdating: boolean;
}

export interface IWishListContextType {
  wishList: IProductsType[];
  setWishList: (val: []) => void;
  addWishList: (val: IProductsType) => void;
  removeWishList: (val: number) => void;
  isInWishList: (val: number) => boolean;
}