import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { Artisan } from "../../types";

export const ArtisanCard = ({ artisan }: { artisan: Artisan }) => (
  <motion.div whileHover={{ y: -4 }} className="bg-ivory rounded-clay shadow-soft border border-terracotta/10 overflow-hidden text-center p-6">
    <img
      src={artisan.avatar || artisan.sellerProfile?.photo}
      alt={artisan.name}
      className="w-24 h-24 rounded-full object-cover mx-auto border-4 border-sand"
    />
    <h3 className="font-display text-xl mt-4">{artisan.name}</h3>
    {artisan.sellerProfile && (
      <>
        <p className="flex items-center justify-center gap-1 text-xs text-charcoal/50 mt-1">
          <MapPin className="w-3.5 h-3.5" /> {artisan.sellerProfile.city}
        </p>
        <p className="text-sm text-saffron font-medium mt-2">{artisan.sellerProfile.craft}</p>
        <p className="text-sm text-charcoal/60 mt-2 line-clamp-3">{artisan.sellerProfile.story}</p>
      </>
    )}
    <Link
      to={`/artisans/${artisan._id}`}
      className="inline-block mt-4 text-sm font-medium text-terracotta border-b border-terracotta/40 hover:border-terracotta"
    >
      View Profile
    </Link>
  </motion.div>
);
