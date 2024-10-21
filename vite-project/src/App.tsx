import { ToastContainer } from "react-toastify";
import CartPage from "./pages/CartPage";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ProductsProvider } from "./provider/ProductsProvider";
import LandingPage from "./pages/LandingPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import WishListPage from "./pages/WishListPage";
import { WishListProvider } from "./provider/WishListProvider";
import ProductsDetailPage from "./pages/ProductsDetailPage";
import { CartProvider } from "./provider/CartProvider";

function App() {
  return (
    <CartProvider>
      <WishListProvider>
        <Router>
          <div className="flex flex-col">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/my-wishlist" element={<WishListPage />} />
              <Route
                path="/products-detail/:id"
                element={<ProductsDetailPage />}
              />
            </Routes>
          </div>
        </Router>
        <ToastContainer />
      </WishListProvider>
    </CartProvider>
  );
}

export default App;
