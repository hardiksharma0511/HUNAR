import { Link, useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";
import { Button } from "../components/ui/Button";
import { Spinner } from "../components/ui/Spinner";
import { MadhubaniDivider } from "../components/decorative/PatternDivider";

const CartPage = () => {
  const { cart, loading, updateQuantity, removeItem } = useCart();
  const navigate = useNavigate();

  if (loading) return <Spinner className="py-40" />;

  const items = cart?.items || [];
  const itemsTotal = items.reduce((sum, i) => sum + (i.product.discountPrice || i.product.price) * i.quantity, 0);
  const shippingFee = itemsTotal > 999 || itemsTotal === 0 ? 0 : 79;
  const total = itemsTotal + shippingFee;

  if (items.length === 0) {
    return (
      <div className="section-padding container-hunar text-center">
        <ShoppingBag className="w-16 h-16 mx-auto text-terracotta/30" />
        <h1 className="font-display text-3xl mt-4">Your cart is empty</h1>
        <p className="text-charcoal/60 mt-2">Discover handmade treasures waiting to be loved.</p>
        <Link to="/products">
          <Button className="mt-6">Explore Collection</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="section-padding container-hunar">
      <h1 className="font-display text-3xl md:text-4xl mb-2">Your Cart</h1>
      <MadhubaniDivider className="mb-8" />
      <div className="grid lg:grid-cols-[1fr,320px] gap-10">
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.product._id} className="flex gap-4 bg-sand/40 rounded-clay p-4 items-center">
              <Link to={`/products/${item.product._id}`} className="shrink-0">
                <img src={item.product.images[0]} alt={item.product.name} className="w-20 h-20 rounded-lg object-cover" />
              </Link>
              <div className="flex-1 min-w-0">
                <Link to={`/products/${item.product._id}`} className="font-medium hover:text-terracotta line-clamp-1">
                  {item.product.name}
                </Link>
                <p className="text-terracotta font-semibold mt-1">
                  ₹{(item.product.discountPrice || item.product.price).toLocaleString("en-IN")}
                </p>
                <div className="flex items-center gap-3 mt-2">
                  <button
                    onClick={() => updateQuantity(item.product._id, Math.max(1, item.quantity - 1))}
                    className="w-7 h-7 rounded-full border border-terracotta/30 flex items-center justify-center"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-6 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                    className="w-7 h-7 rounded-full border border-terracotta/30 flex items-center justify-center"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <button onClick={() => removeItem(item.product._id)} aria-label="Remove item" className="text-charcoal/40 hover:text-red-600">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>

        <div className="bg-sand/50 paper-texture rounded-clay p-6 h-fit sticky top-24">
          <h2 className="font-display text-xl mb-4">Order Summary</h2>
          <div className="flex justify-between text-sm text-charcoal/70 mb-2">
            <span>Items Total</span>
            <span>₹{itemsTotal.toLocaleString("en-IN")}</span>
          </div>
          <div className="flex justify-between text-sm text-charcoal/70 mb-4">
            <span>Shipping</span>
            <span>{shippingFee === 0 ? "Free" : `₹${shippingFee}`}</span>
          </div>
          <div className="flex justify-between font-semibold text-lg border-t border-terracotta/15 pt-4">
            <span>Total</span>
            <span className="text-terracotta">₹{total.toLocaleString("en-IN")}</span>
          </div>
          <Button className="w-full mt-6" onClick={() => navigate("/checkout")}>
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;