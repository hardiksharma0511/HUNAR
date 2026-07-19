import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Package } from "lucide-react";
import api from "../lib/axios";
import { Order } from "../types";
import { Spinner } from "../components/ui/Spinner";
import { Badge } from "../components/ui/Badge";
import { WarliDivider } from "../components/decorative/PatternDivider";

const statusTone: Record<string, "terracotta" | "olive" | "gold" | "saffron"> = {
  placed: "saffron",
  processing: "gold",
  shipped: "terracotta",
  delivered: "olive",
  cancelled: "terracotta",
};

const OrderHistory = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/orders/mine").then((res) => setOrders(res.data.orders)).finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner className="py-32" />;

  return (
    <div className="section-padding container-hunar">
      <h1 className="font-display text-3xl mb-2">Order History</h1>
      <WarliDivider className="mb-8" />
      {orders.length === 0 ? (
        <p className="text-charcoal/60 text-center py-16">You haven't placed any orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Link
              key={order._id}
              to={`/orders/${order._id}`}
              className="flex items-center justify-between bg-sand/40 rounded-clay p-5 hover:bg-sand/60 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-terracotta/10 flex items-center justify-center">
                  <Package className="w-5 h-5 text-terracotta" />
                </div>
                <div>
                  <p className="font-medium">Order #{order._id.slice(-8).toUpperCase()}</p>
                  <p className="text-xs text-charcoal/50">
                    {new Date(order.createdAt).toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" })} · {order.items.length} item(s)
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-terracotta">₹{order.totalAmount.toLocaleString("en-IN")}</p>
                <Badge tone={statusTone[order.status]}>{order.status}</Badge>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;