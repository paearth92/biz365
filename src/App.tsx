import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { CartProvider } from "./lib/cart-context";
import { CartDrawer } from "./components/CartDrawer";
import { ExperienceMotion } from "./components/ExperienceMotion";
import { HomePage } from "./pages/HomePage";
import { ShopPage } from "./pages/ShopPage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { CollectionPage } from "./pages/CollectionPage";
import { CartPage } from "./pages/CartPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { IndustriesPage } from "./pages/IndustriesPage";
import { HowItWorksPage } from "./pages/HowItWorksPage";
import { DashboardPage } from "./pages/DashboardPage";
import { ActivatePage } from "./pages/ActivatePage";
import { NotFoundPage } from "./pages/NotFoundPage";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <ExperienceMotion />
        <ScrollToTop />
        <CartDrawer />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/products/:slug" element={<ProductDetailPage />} />
          <Route path="/collections/:slug" element={<CollectionPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/industries" element={<IndustriesPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/activate/:code" element={<ActivatePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}
