
import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Routes } from "react-router-dom";
import AppLayOut from "./ui/AppLayOut";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import WhatsAppButton from "./ui/WhatsAppButton";

// Create QueryClient outside the component
const queryClient = new QueryClient();

// Lazy-loaded pages
const Offers = lazy(() => import("./features/WinterPattern/Offers"));
const Turbon = lazy(() => import("./pages/Turbon"));
const SummerHalfColon = lazy(() => import("./pages/SummerHalfColon"));
const SummerColon = lazy(() => import("./pages/SummerColon"));
const MainPage = lazy(() => import("./pages/MainPage"));
const ProductDetails = lazy(() => import("./ui/ProductDetails"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage"));
const Clothes = lazy(() => import("./pages/Clothes"));
const ClothesHomePage = lazy(() => import("./features/clothes/ClothesHomePage"));
const TurbonHomePage = lazy(() => import("./features/TurbonParts/TurbonHomePage"));
const WinterPatterned = lazy(() => import("./pages/WinterPatterned"));
const WinterHomePage = lazy(() => import("./features/WinterLined/WinterLinedHomePage"));
const WinterLined = lazy(() => import("./pages/WinterLined"));

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        toastClassName="wl-toast"
      />

      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<AppLayOut />}>
            <Route index element={<MainPage />} />
            <Route path="WinterCollection" element={<WinterPatterned />} />
            <Route path="product/:id" element={<ProductDetails />} />
            <Route path="Offers" element={<Offers />} />
            <Route path="SummerHalfColon" element={<SummerHalfColon />} />
            <Route path="SummerColon" element={<SummerColon />} />
            <Route path="Checkout" element={<CheckoutPage />} />
            <Route path="winterHomePage" element={<WinterHomePage />} />
            <Route path="winter/:category" element={<WinterLined />} />
            <Route path="clothes" element={<ClothesHomePage />} />
            <Route path="clothes/:category" element={<Clothes />} />
            <Route path="Turbon" element={<TurbonHomePage />} />
            <Route path="turbon/:category" element={<Turbon />} />
          </Route>
        </Routes>
      </Suspense>

      <WhatsAppButton message="مرحبا، عايز أطلب منتجات من الموقع" />
    </QueryClientProvider>
  );
}

export default App;
