import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import api from "../lib/axios";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/Button";
import { Spinner } from "../components/ui/Spinner";

const schema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  pincode: z.string().min(5, "Enter a valid pincode").max(8),
  phone: z.string().min(10, "Enter a valid phone number"),
});
type FormData = z.infer<typeof schema>;

const Checkout = () => {
  const { cart, refreshCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { fullName: user?.name, address: user?.address },
  });

  const items = cart?.items || [];
  const itemsTotal = items.reduce((sum, i) => sum + (i.product.discountPrice || i.product.price) * i.quantity, 0);
  const shippingFee = itemsTotal > 999 || itemsTotal === 0 ? 0 : 79;
  const total = itemsTotal + shippingFee;

  if (items.length === 0) {
    return <p className="section-padding container-hunar text-center text-charcoal/60">Your cart is empty.</p>;
  }

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError("");
    try {
      const { data: res } = await api.post("/orders", {
        shippingAddress: data,
        paymentMethod: "Cash on Delivery",
      });
      await refreshCart();
      navigate(`/orders/${res.order._id}`, { state: { justPlaced: true } });
    } catch (err: any) {
      setError(err.response?.data?.message || "Could not place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section-padding container-hunar">
      <h1 className="font-display text-3xl md:text-4xl mb-8">Checkout</h1>
      <div className="grid lg:grid-cols-[1fr,320px] gap-10">
        <form onSubmit={handleSubmit(onSubmit)} className="bg-sand/40 paper-texture rounded-clay p-6 md:p-8 space-y-4">
          {error && <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</p>}
          <h2 className="font-display text-xl mb-2">Shipping Address</h2>

          <div>
            <label className="text-sm font-medium">Full Name</label>
            <input {...register("fullName")} className="w-full mt-1 rounded-lg border border-terracotta/20 bg-ivory px-4 py-2.5 focus:outline-none" />
            {errors.fullName && <p className="text-xs text-red-600 mt-1">{errors.fullName.message}</p>}
          </div>

          <div>
            <label className="text-sm font-medium">Address</label>
            <textarea {...register("address")} rows={2} className="w-full mt-1 rounded-lg border border-terracotta/20 bg-ivory px-4 py-2.5 focus:outline-none" />
            {errors.address && <p className="text-xs text-red-600 mt-1">{errors.address.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">City</label>
              <input {...register("city")} className="w-full mt-1 rounded-lg border border-terracotta/20 bg-ivory px-4 py-2.5 focus:outline-none" />
              {errors.city && <p className="text-xs text-red-600 mt-1">{errors.city.message}</p>}
            </div>
            <div>
              <label className="text-sm font-medium">State</label>
              <input {...register("state")} className="w-full mt-1 rounded-lg border border-terracotta/20 bg-ivory px-4 py-2.5 focus:outline-none" />
              {errors.state && <p className="text-xs text-red-600 mt-1">{errors.state.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Pincode</label>
              <input {...register("pincode")} className="w-full mt-1 rounded-lg border border-terracotta/20 bg-ivory px-4 py-2.5 focus:outline-none" />
              {errors.pincode && <p className="text-xs text-red-600 mt-1">{errors.pincode.message}</p>}
            </div>
            <div>
              <label className="text-sm font-medium">Phone</label>
              <input {...register("phone")} className="w-full mt-1 rounded-lg border border-terracotta/20 bg-ivory px-4 py-2.5 focus:outline-none" />
              {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone.message}</p>}
            </div>
          </div>

          <div className="pt-2">
            <p className="text-sm font-medium mb-2">Payment Method</p>
            <div className="rounded-lg border border-terracotta/20 bg-ivory px-4 py-3 text-sm text-charcoal/70">
              Cash on Delivery (only option in this MVP)
            </div>
          </div>

          <Button type="submit" disabled={loading} className="w-full mt-4">
            {loading ? "Placing order..." : `Place Order — ₹${total.toLocaleString("en-IN")}`}
          </Button>
        </form>

        <div className="bg-sand/50 rounded-clay p-6 h-fit sticky top-24">
          <h2 className="font-display text-xl mb-4">Order Summary</h2>
          <div className="space-y-3 max-h-64 overflow-y-auto pr-1 mb-4">
            {items.map((item) => (
              <div key={item.product._id} className="flex justify-between text-sm">
                <span className="text-charcoal/70 line-clamp-1 pr-2">{item.product.name} × {item.quantity}</span>
                <span className="shrink-0">₹{((item.product.discountPrice || item.product.price) * item.quantity).toLocaleString("en-IN")}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm text-charcoal/70 border-t border-terracotta/15 pt-3 mb-2">
            <span>Items Total</span><span>₹{itemsTotal.toLocaleString("en-IN")}</span>
          </div>
          <div className="flex justify-between text-sm text-charcoal/70 mb-3">
            <span>Shipping</span><span>{shippingFee === 0 ? "Free" : `₹${shippingFee}`}</span>
          </div>
          <div className="flex justify-between font-semibold text-lg border-t border-terracotta/15 pt-3">
            <span>Total</span><span className="text-terracotta">₹{total.toLocaleString("en-IN")}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
