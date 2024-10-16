import { ToastContainer } from "react-toastify";
import "./App.css";
import CartPage from "./pages/CartPage";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ProductsProvider } from "./provider/ProductsProvider";
import LandingPage from "./pages/LandingPage";
import AdminDashboard from "./pages/admin/AdminDashboard";

function App() {
  return (
    <>
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
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
