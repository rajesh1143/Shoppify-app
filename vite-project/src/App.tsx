import { ToastContainer } from "react-toastify";
import "./App.css";
import CartPage from "./pages/CartPage";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ProductsProvider } from "./provider/ProductsProvider";
import LandingPage from "./pages/LandingPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import WishListPage from "./pages/WishListPage";
import { WishListProvider } from "./provider/WishListProvider";
import ProductsDetailPage from "./pages/ProductsDetailPage";

function App() {
  return (
    <WishListProvider>
      <Router>
        <div className="flex flex-col">
          <Routes>
            <Route
              path="/"
              element={
                <ProductsProvider>
                  <LandingPage />
                </ProductsProvider>
              }
            />
            <Route
              path="/admin"
              element={
                <ProductsProvider>
                  <AdminDashboard />
                </ProductsProvider>
              }
            />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/my-wishlist" element={<WishListPage />} />
            <Route
              path="/products-detail/:id"
              element={
                <ProductsProvider>
                  <ProductsDetailPage />
                </ProductsProvider>
              }
            />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </WishListProvider>
  );
}

export default App;
