import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCart } from "./CartContext";

export function useCartActions({
  
  prepareCartItem,
  isFormValid,
}) {
  const navigate = useNavigate();
const { cartItems, addToCart } = useCart();
  // إضافة للسلة
  const handleAddOnly = (e) => {
    e?.preventDefault();

    if (!isFormValid) {
      toast.error("⚠️ يرجى إكمال جميع البيانات أولاً", {
        position: "bottom-center",
        autoClose: 3000,
      });
      return;
    }

    const cartItem = prepareCartItem();

    addToCart(cartItem);
  };

  // شراء الآن
  const handleBuyNow = (e) => {
    e?.preventDefault();

    if (!isFormValid) {
      toast.error("⚠️ يرجى إكمال جميع البيانات أولاً", {
        position: "bottom-center",
        autoClose: 3000,
      });
      return;
    }

    const cartItem = prepareCartItem();

    const productExists = cartItems.some(
      (item) => item.id === cartItem.id
    );

    // لو مش موجود → أضيفيه
    if (!productExists) {
      addToCart(cartItem);
    }

    // في الحالتين → Checkout
    navigate("/checkout");
  };

  return {
    handleAddOnly,
    handleBuyNow,
  };
}

