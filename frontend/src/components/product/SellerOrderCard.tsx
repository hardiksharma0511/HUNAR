import { useState } from "react";
import { MapPin, Phone, User as UserIcon, Truck, Check } from "lucide-react";
import { Order } from "../../types";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";

const statusTone: Record<string, "terracotta" | "olive" | "gold" | "saffron"> = {
  placed: "saffron",
  processing: "gold",
  shipped: "terracotta",
  delivered: "olive",
  cancelled: "terracotta",
};

const statusOptions = ["placed", "processing", "shipped", "delivered", "cancelled"];

interface Props {
  order: Order;
  onStatusChange: (orderId: string, status: string) => Promise<void>;
  onTrackingSave: (orderId: string, trackingId: string, courierName: string) => Promise<void>;
}

export const SellerOrderCard = ({ order, onStatusChange, onTrackingSave }: Props) => {
  const [trackingId, setTrackingId] = useState(order.trackingId || "");
  const [courierName, setCourierName] = useState(order.courierName || "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSaveTracking = async () => {
    setSaving(true);
    await onTrackingSave(order._id, trackingId, courierName);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="bg-sand/40 rounded-clay p-5">
      {/* Header row: order id, date, status control */}
      <div className="flex items-center justify-between flex-wrap gap-3 pb-4 border-b border-terracotta/10">
        <div>
          <p className="font-medium">Order #{order._id.slice(-8).toUpperCase()}</p>
          <p className="text-xs text-charcoal/50">{new Date(order.createdAt).toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" })}</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge tone={statusTone[order.status]}>{order.status}</Badge>
          {order.status !== "cancelled" && (
            <select
              value={order.status}
              onChange={(e) => onStatusChange(order._id, e.target.value)}
              className="text-sm rounded-lg border border-terracotta/20 bg-ivory px-2 py-1.5 focus:outline-none"
            >
              {statusOptions.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 pt-4">
        {/* Items */}
        <div className="space-y-1.5">
          <p className="text-xs font-medium text-charcoal/50 uppercase tracking-wide mb-1">Items</p>
          {order.items.map((item, i) => (
            <p key={i} className="text-sm text-charcoal/80">{item.name} × {item.quantity} — ₹{(item.price * item.quantity).toLocaleString("en-IN")}</p>
          ))}
        </div>

        {/* Buyer + shipping details */}
        <div className="bg-ivory rounded-lg p-4 space-y-2">
          <p className="text-xs font-medium text-charcoal/50 uppercase tracking-wide mb-1">Ship To</p>
          <p className="flex items-center gap-2 text-sm font-medium">
            <UserIcon className="w-3.5 h-3.5 text-terracotta shrink-0" /> {order.shippingAddress.fullName}
          </p>
          <p className="flex items-start gap-2 text-sm text-charcoal/70">
            <MapPin className="w-3.5 h-3.5 text-terracotta shrink-0 mt-0.5" />
            {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
          </p>
          <p className="flex items-center gap-2 text-sm text-charcoal/70">
            <Phone className="w-3.5 h-3.5 text-terracotta shrink-0" /> {order.shippingAddress.phone}
          </p>
        </div>
      </div>

      {/* Tracking info — only relevant once the order is on its way, but the
          seller can enter it any time (e.g. as soon as they book the courier) */}
      {order.status !== "placed" && order.status !== "cancelled" && (
        <div className="mt-4 pt-4 border-t border-terracotta/10">
          <p className="text-xs font-medium text-charcoal/50 uppercase tracking-wide mb-2 flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5" /> Tracking Info (shown to buyer)
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              value={courierName}
              onChange={(e) => setCourierName(e.target.value)}
              placeholder="Courier name (e.g. India Post, Delhivery)"
              className="flex-1 text-sm rounded-lg border border-terracotta/20 bg-ivory px-3 py-2 focus:outline-none"
            />
            <input
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              placeholder="Tracking / AWB number"
              className="flex-1 text-sm rounded-lg border border-terracotta/20 bg-ivory px-3 py-2 focus:outline-none"
            />
            <Button type="button" size="sm" onClick={handleSaveTracking} disabled={saving}>
              {saved ? <Check className="w-4 h-4" /> : saving ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};