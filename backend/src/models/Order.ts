import { Schema, model, Document, Types } from "mongoose";

export interface IOrderItem {
  product: Types.ObjectId;
  name: string;
  image: string;
  price: number;
  quantity: number;
  seller: Types.ObjectId;
}

export interface IOrder extends Document {
  buyer: Types.ObjectId;
  items: IOrderItem[];
  shippingAddress: {
    fullName: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    phone: string;
  };
  paymentMethod: string;
  itemsTotal: number;
  shippingFee: number;
  totalAmount: number;
  status: "placed" | "processing" | "shipped" | "delivered" | "cancelled";
  trackingId?: string;
  courierName?: string;
  createdAt: Date;
}

const orderSchema = new Schema<IOrder>(
  {
    buyer: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
        name: { type: String, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        seller: { type: Schema.Types.ObjectId, ref: "User", required: true },
      },
    ],
    shippingAddress: {
      fullName: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true },
      phone: { type: String, required: true },
    },
    paymentMethod: { type: String, default: "Cash on Delivery" },
    itemsTotal: { type: Number, required: true },
    shippingFee: { type: Number, required: true, default: 0 },
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["placed", "processing", "shipped", "delivered", "cancelled"],
      default: "placed",
    },
    trackingId: { type: String, default: "" },
    courierName: { type: String, default: "" },
  },
  { timestamps: true }
);

export default model<IOrder>("Order", orderSchema);