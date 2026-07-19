import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";
import { ProductCard } from "../components/product/ProductCard";
import { Spinner } from "../components/ui/Spinner";
import { Button } from "../components/ui/Button";

const Wishlist = () => {
  const { wishlist, loading } = useWishlist();

  if (loading) return <Spinner className="py-32" />;

  return (
    <div className="section-padding container-hunar">
      <div className="text-center mb-10">
        <span className="font-script text-2xl text-saffron">Saved for Later</span>
        <h1 className="font-display text-3xl md:text-4xl mt-1">Your Wishlist</h1>
      </div>

      {wishlist.length === 0 ? (
        <div className="text-center py-16">
          <Heart className="w-14 h-14 mx-auto text-terracotta/25" />
          <p className="text-charcoal/60 mt-4">Nothing saved yet — tap the heart on any product to keep it here.</p>
          <Link to="/products"><Button className="mt-6">Explore Products</Button></Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {wishlist.map((p) => <ProductCard key={p._id} product={p} />)}
        </div>
      )}
    </div>
  );
};

export default Wishlist;