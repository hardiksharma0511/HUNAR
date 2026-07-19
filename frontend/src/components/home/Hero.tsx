import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HeroIllustration } from "../decorative/HeroIllustration";

export const Hero = () => (
  <section className="section-padding pt-12 md:pt-16 grid md:grid-cols-2 gap-10 items-center container-hunar">
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <span className="font-script text-2xl text-saffron">Kala se Vyapaar tak</span>
      <h1 className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight mt-3 text-balance">
        Celebrate India's <span className="italic text-terracotta">Handmade</span> Heritage
      </h1>
      <p className="mt-5 text-charcoal/65 text-lg max-w-md leading-relaxed">
        Support talented artisans by purchasing authentic handmade creations —
        painted by hand, shaped by hand, and sold directly to you.
      </p>
      <div className="flex flex-wrap gap-4 mt-8">
        <Link to="/products">
          <button className="bg-terracotta text-ivory px-8 py-3.5 rounded-full font-medium hover:bg-terracotta/90 transition-colors shadow-card">
            Explore Collection
          </button>
        </Link>
        <Link to="/become-seller">
          <button className="border-2 border-terracotta text-terracotta px-8 py-3.5 rounded-full font-medium hover:bg-terracotta hover:text-ivory transition-colors">
            Become a Seller
          </button>
        </Link>
      </div>
      <div className="flex gap-8 mt-10">
        <div>
          <p className="font-display text-2xl text-terracotta">10+</p>
          <p className="text-xs text-charcoal/50">Skilled Artisans</p>
        </div>
        <div>
          <p className="font-display text-2xl text-terracotta">40+</p>
          <p className="text-xs text-charcoal/50">Handmade Products</p>
        </div>
        <div>
          <p className="font-display text-2xl text-terracotta">15</p>
          <p className="text-xs text-charcoal/50">Craft Categories</p>
        </div>
      </div>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.15 }}
      className="relative"
    >
      <HeroIllustration className="w-full max-w-md mx-auto" />
    </motion.div>
  </section>
);
