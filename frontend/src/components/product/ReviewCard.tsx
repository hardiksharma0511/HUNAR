import { Review } from "../../types";
import { Rating } from "../ui/Rating";

export const ReviewCard = ({ review }: { review: Review }) => (
  <div className="bg-ivory rounded-clay p-5 border border-terracotta/10">
    <div className="flex items-center justify-between">
      <p className="font-medium">{review.name}</p>
      <Rating value={review.rating} size={14} />
    </div>
    <p className="text-sm text-charcoal/65 mt-2 leading-relaxed">{review.comment}</p>
    <p className="text-xs text-charcoal/40 mt-2">{new Date(review.createdAt).toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" })}</p>
  </div>
);
