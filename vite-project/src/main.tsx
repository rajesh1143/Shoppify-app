import { createRoot } from "react-dom/client";
import "react-data-grid/lib/styles.css";
import App from "./App.tsx";
import "./index.css";
import { ProductsProvider } from "./provider/ProductsProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <ProductsProvider>
    <App />
  </ProductsProvider>
);
