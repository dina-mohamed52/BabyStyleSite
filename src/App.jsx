import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import AppLayOut from "./ui/AppLayOut";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Offers from "./features/home/Offers";
import Turbon from "./pages/Turbon";
import SummerHalfColon from "./pages/SummerHalfColon";
import SummerColon from "./pages/SummerColon";
import MainPage from "./pages/MainPage";
import ProductDetails from "./ui/ProductDetails";
import WhatsAppButton from "./ui/WhatsAppButton";
import CheckoutPage from "./pages/CheckoutPage";
import Clothes from "./pages/Clothes";
import ClothesHomePage from "./features/clothes/ClothesHomePage";
import TurbonHomePage from "./features/TurbonParts/TurbonHomePage";
import BackToSchoolModal from "./ui/BackToSchoolModal";

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ToastContainer />
        <BackToSchoolModal />
        <Routes>
          <Route path="/" element={<AppLayOut />}>
            <Route index element={<MainPage />} />
            <Route path="/WinterCollection" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />

    
            <Route path="/Offers" element={<Offers />} />
            <Route path="/SummerHalfColon" element={<SummerHalfColon />} />
            <Route path="/SummerColon" element={<SummerColon />} />
            <Route path="/Checkout" element={<CheckoutPage />} />
            <Route path="/clothes" element={<ClothesHomePage />} />
            <Route path="/clothes/:category" element={<Clothes />} />
            <Route path="/Turbon" element={<TurbonHomePage />} />
            <Route path="/turbon/:category" element={<Turbon />} />
          
          </Route>
        </Routes>
        <WhatsAppButton message="مرحبا، عايز أطلب منتجات من الموقع" />
      </QueryClientProvider>
    </>
  );
}

export default App;
