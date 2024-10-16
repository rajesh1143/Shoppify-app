import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "react-data-grid/lib/styles.css";
import App from "./App.tsx";
import "./index.css";
import { CartProvider } from "./provider/CartProvider.tsx";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  // </StrictMode>
);
