import { Schema, model, Document } from "mongoose";

export interface ICategory extends Document {
  name: string;
  slug: string;
  icon: string;
  description: string;
  subcategories: string[];
}

const categorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    icon: { type: String, default: "Sparkles" }, // lucide-react icon name
    description: { type: String, default: "" },
    subcategories: [{ type: String }],
  },
  { timestamps: true }
);

export default model<ICategory>("Category", categorySchema);
