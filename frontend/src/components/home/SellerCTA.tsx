import { Link } from "react-router-dom";

export const SellerCTA = () => (
  <section className="section-padding container-hunar">
    <div className="relative bg-terracotta rounded-[2.5rem] overflow-hidden px-8 py-16 md:py-20 text-center">
      <div className="absolute inset-0 opacity-10 paper-texture" />
      <h2 className="font-display text-3xl md:text-4xl text-ivory relative">
        Are You an Artisan? Share Your Craft with India.
      </h2>
      <p className="text-ivory/80 mt-4 max-w-xl mx-auto relative">
        Join hundreds of makers selling directly to buyers who value handmade, authentic work.
      </p>
      <Link to="/become-seller">
        <button className="mt-8 bg-ivory text-terracotta px-8 py-3.5 rounded-full font-medium hover:bg-sand transition-colors relative">
          Become a Seller
        </button>
      </Link>
    </div>
  </section>
);
