export const LOGO_URL =
  "https://th.bing.com/th/id/OIP.oDkau7Gbr6R_P82OEEswFwHaHa?w=162&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7";

export const CART_EMPTY_IMG =
  "https://th.bing.com/th/id/OIP.afy2IonIe5Dh5maHreIK5gHaFi?w=213&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7";

export const ERROR_IMG =
  "https://th.bing.com/th/id/OIP.GMAQ7JOmLAULFcxbTjA3TAHaHa?pid=ImgDet&w=178&h=178&c=7&dpr=1.5";

export const CAROUSEL_IMG_1 =
  "https://static.vecteezy.com/system/resources/previews/011/644/608/non_2x/diwali-discount-sale-banner-happy-diwali-online-shopping-banner-diwali-bumper-sale-free-vector.jpg";
export const CAROUSEL_IMG_2 =
  "https://img.freepik.com/premium-vector/happy-diwali-sale-banner-with-diya-oil-lamp-confetti-elements-pink-background-bokeh-effect_384372-393.jpg?size=626&ext=jpg";

export const WISHLIST_IMG ="https://clipground.com/images/wishlist-png-5.png"

export const productDropDownOption = [
  {
    text: "Delete",
    icon: "delete",
  },
  {
    text: "Edit",
    icon: "edit",
  },
];

export const profileDropDownOption = [
  {
    text: "Admin",
    icon: "admin",
  },
];

export const newProduct = {
  id:undefined,
  title: "Add Your Product Title",
  description: "Add your product description here..",
  category: "beauty",
  price: "add your product price",
  discountPercentage: 7.17,
  rating: 4.94,
  stock: 5,
  tags: ["beauty", "mascara"],
  brand: "Essence",
  sku: "RCH45Q1A",
  weight: 2,
  dimensions: {
    width: 23.17,
    height: 14.43,
    depth: 28.01,
  },
  warrantyInformation: "1 month warranty",
  shippingInformation: "Ships in 1 month",
  availabilityStatus: "Low Stock",
  reviews: [
    {
      rating: 2,
      comment: "Very unhappy with my purchase!",
      date: "2024-05-23T08:56:21.618Z",
      reviewerName: "John Doe",
      reviewerEmail: "john.doe@x.dummyjson.com",
    },
    {
      rating: 2,
      comment: "Not as described!",
      date: "2024-05-23T08:56:21.618Z",
      reviewerName: "Nolan Gonzalez",
      reviewerEmail: "nolan.gonzalez@x.dummyjson.com",
    },
    {
      rating: 5,
      comment: "Very satisfied!",
      date: "2024-05-23T08:56:21.618Z",
      reviewerName: "Scarlett Wright",
      reviewerEmail: "scarlett.wright@x.dummyjson.com",
    },
  ],
  returnPolicy: "30 days return policy",
  minimumOrderQuantity: 24,
  meta: {
    createdAt: "2024-05-23T08:56:21.618Z",
    updatedAt: "2024-05-23T08:56:21.618Z",
    barcode: "9164035109868",
    qrCode: "https://assets.dummyjson.com/public/qr-code.png",
  },
  images: ["add your product image here"],
  thumbnail: "add your product thumbnail",
};

export const columns = [
  { key: "id", name: "ID", width: "40px", resizable: true },
  { key: "title", name: "Title",width: "240px", resizable: true },
  { key: "description", name: "Description",width: "240px", resizable: true },
  { key: "image", name: "Image",width: "140px", resizable: true },
  { key: "price", name: "Price",width: "140px", resizable: true },
  { key: "rating", name: "Rating",width: "140px", resizable: true },
  { key: "actions", name: "Actions",width:"140px", resizable: true },
];