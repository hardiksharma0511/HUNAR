import { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Circle, XCircle, Package, Truck, ClipboardCheck, Star, Loader2 } from "lucide-react";
import api from "../lib/axios";
import { Order } from "../types";
import { Spinner } from "../components/ui/Spinner";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";

const statusTone: Record<string, "terracotta" | "olive" | "gold" | "saffron"> = {
  placed: "saffron",
  processing: "gold",
  shipped: "terracotta",
  delivered: "olive",
  cancelled: "terracotta",
};

const steps = [
  { key: "placed", label: "Placed", icon: ClipboardCheck },
  { key: "processing", label: "Processing", icon: Package },
  { key: "shipped", label: "Shipped", icon: Truck },
  { key: "delivered", label: "Delivered", icon: CheckCircle2 },
];

// A small, self-contained rating widget for a single delivered order item.
// Submits directly to the review endpoint and shows a thank-you state.
const RateProduct = ({ productId, productName }: { productId: string; productName: string }) => {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await api.post(`/products/${productId}/reviews`, { rating, comment });
      setDone(true);
    } catch (err: any) {
      setError(err.response?.data?.message || "Could not submit your review.");
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return <p className="text-xs text-olive mt-2">Thanks for rating {productName}! Your review has been posted.</p>;
  }

  return (
    <div className="mt-2">
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-1.5 text-xs font-medium text-terracotta border-b border-terracotta/40 hover:border-terracotta"
        >
          <Star className="w-3.5 h-3.5" /> Rate this product
        </button>
      ) : (
        <AnimatePresence>
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={submit}
            className="bg-ivory rounded-lg p-3 mt-2 border border-terracotta/10"
          >
            {error && <p className="text-xs text-red-600 mb-2">{error}</p>}
            <div className="flex gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  type="button"
                  key={n}
                  onClick={() => setRating(n)}
                  aria-label={`${n} star`}
                  className="p-0.5"
                >
                  <Star className={`w-5 h-5 ${rating >= n ? "fill-gold text-gold" : "text-gold/30"}`} />
                </button>
              ))}
            </div>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
              rows={2}
              placeholder={`How was your experience with ${productName}?`}
              className="w-full text-sm rounded-lg border border-terracotta/20 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-terracotta/30"
            />
            <div className="flex gap-2 mt-2">
              <Button type="submit" size="sm" disabled={submitting}>
                {submitting ? "Submitting..." : "Submit Review"}
              </Button>
              <Button type="button" size="sm" variant="ghost" onClick={() => setOpen(false)}>
                Cancel
              </Button>
            </div>
          </motion.form>
        </AnimatePresence>
      )}
    </div>
  );
};

const OrderDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);
  const [cancelError, setCancelError] = useState("");
  const justPlaced = (location.state as any)?.justPlaced;

  const load = () => {
    api.get(`/orders/${id}`).then((res) => setOrder(res.data.order)).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, [id]);

  const handleCancel = async () => {
    if (!confirm("Cancel this order? This cannot be undone.")) return;
    setCancelling(true);
    setCancelError("");
    try {
      const { data } = await api.put(`/orders/${id}/cancel`);
      setOrder(data.order);
    } catch (err: any) {
      setCancelError(err.response?.data?.message || "Could not cancel this order.");
    } finally {
      setCancelling(false);
    }
  };

  if (loading) return <Spinner className="py-32" />;
  if (!order) return <p className="text-center py-32">Order not found.</p>;

  const isCancelled = order.status === "cancelled";
  const isDelivered = order.status === "delivered";
  const canCancel = ["placed", "processing"].includes(order.status);
  const currentStepIndex = steps.findIndex((s) => s.key === order.status);

  return (
    <div className="section-padding container-hunar max-w-2xl">
      {justPlaced && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 bg-olive/10 text-olive rounded-clay px-5 py-4 mb-8"
        >
          <CheckCircle2 className="w-6 h-6 shrink-0" />
          <p className="text-sm font-medium">Your order has been placed successfully! You'll receive updates here.</p>
        </motion.div>
      )}

      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-2xl">Order #{order._id.slice(-8).toUpperCase()}</h1>
        <Badge tone={statusTone[order.status]}>{order.status}</Badge>
      </div>

      {/* Status timeline */}
      {isCancelled ? (
        <div className="flex items-center gap-3 bg-red-50 text-red-600 rounded-clay px-5 py-4 mb-8">
          <XCircle className="w-6 h-6 shrink-0" />
          <p className="text-sm font-medium">This order was cancelled.</p>
        </div>
      ) : (
        <div className="flex items-center justify-between mb-10 relative">
          <div className="absolute top-4 left-4 right-4 h-0.5 bg-terracotta/15 -z-0" />
          <motion.div
            className="absolute top-4 left-4 h-0.5 bg-terracotta -z-0"
            initial={{ width: 0 }}
            animate={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{ maxWidth: "calc(100% - 2rem)" }}
          />
          {steps.map((step, i) => {
            const reached = i <= currentStepIndex;
            const StepIcon = reached ? step.icon : Circle;
            return (
              <div key={step.key} className="relative z-10 flex flex-col items-center gap-2 flex-1">
                <motion.div
                  initial={false}
                  animate={{ scale: reached ? 1 : 0.9, backgroundColor: reached ? "#A0522D" : "#F8F3EA" }}
                  className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${reached ? "border-terracotta text-ivory" : "border-terracotta/25 text-terracotta/30"}`}
                >
                  <StepIcon className="w-4 h-4" />
                </motion.div>
                <span className={`text-xs font-medium ${reached ? "text-terracotta" : "text-charcoal/40"}`}>{step.label}</span>
              </div>
            );
          })}
        </div>
      )}

      {canCancel && (
        <div className="mb-8">
          {cancelError && <p className="text-xs text-red-600 mb-2">{cancelError}</p>}
          <Button variant="outline" size="sm" onClick={handleCancel} disabled={cancelling}>
            {cancelling ? <Loader2 className="w-4 h-4 animate-spin" /> : <XCircle className="w-4 h-4" />}
            {cancelling ? "Cancelling..." : "Cancel Order"}
          </Button>
        </div>
      )}

      {order.trackingId && (
        <div className="flex items-center justify-between bg-olive/10 rounded-clay px-5 py-4 mb-8 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <Truck className="w-5 h-5 text-olive shrink-0" />
            <div>
              <p className="text-sm font-medium text-olive">
                {order.courierName ? `Shipped via ${order.courierName}` : "Tracking number added"}
              </p>
              <p className="text-sm text-charcoal/70 font-mono">{order.trackingId}</p>
            </div>
          </div>
          <button
            onClick={() => navigator.clipboard.writeText(order.trackingId || "")}
            className="text-xs font-medium text-olive border-b border-olive/40 hover:border-olive shrink-0"
          >
            Copy tracking number
          </button>
        </div>
      )}

      <div className="bg-sand/40 rounded-clay p-6 space-y-5 mb-6">
        {order.items.map((item, i) => (
          <div key={i} className="flex gap-4 items-start">
            <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover shrink-0" />
            <div className="flex-1">
              <Link to={`/products/${item.product}`} className="font-medium hover:text-terracotta">{item.name}</Link>
              <p className="text-sm text-charcoal/60">Qty: {item.quantity} · ₹{(item.price * item.quantity).toLocaleString("en-IN")}</p>
              {isDelivered && <RateProduct productId={item.product} productName={item.name} />}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-sand/40 rounded-clay p-6 mb-6">
        <h2 className="font-medium mb-3">Shipping Address</h2>
        <p className="text-sm text-charcoal/70 leading-relaxed">
          {order.shippingAddress.fullName}<br />
          {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}<br />
          Phone: {order.shippingAddress.phone}
        </p>
      </div>

      <div className="bg-sand/40 rounded-clay p-6 space-y-2">
        <div className="flex justify-between text-sm"><span>Items Total</span><span>₹{order.itemsTotal.toLocaleString("en-IN")}</span></div>
        <div className="flex justify-between text-sm"><span>Shipping</span><span>{order.shippingFee === 0 ? "Free" : `₹${order.shippingFee}`}</span></div>
        <div className="flex justify-between font-semibold text-lg border-t border-terracotta/15 pt-2"><span>Total</span><span className="text-terracotta">₹{order.totalAmount.toLocaleString("en-IN")}</span></div>
      </div>

      <Link to="/orders" className="inline-block mt-6 text-terracotta font-medium border-b border-terracotta/40">
        ← Back to Order History
      </Link>
    </div>
  );
};

export default OrderDetail;