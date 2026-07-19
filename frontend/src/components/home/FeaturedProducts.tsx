import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Product } from "../../types";
import { ProductCard } from "../product/ProductCard";

export const FeaturedProducts = ({ products }: { products: Product[] }) => (
  <section className="section-padding container-hunar bg-sand/30 rounded-[2.5rem]">
    <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
      <div>
        <span className="font-script text-2xl text-saffron">Handpicked</span>
        <h2 className="font-display text-3xl md:text-4xl mt-1">Featured Products</h2>
      </div>
      <Link to="/products" className="text-terracotta font-medium border-b border-terracotta/40 hover:border-terracotta">
        View All →
      </Link>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
      {products.map((p, i) => (
        <motion.div key={p._id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}>
          <ProductCard product={p} />
        </motion.div>
      ))}
    </div>
  </section>
);
