import { motion } from "framer-motion";
import { Artisan } from "../../types";
import { ArtisanCard } from "../product/ArtisanCard";

export const ArtisanShowcase = ({ artisans }: { artisans: Artisan[] }) => (
  <section className="section-padding container-hunar">
    <div className="text-center mb-12">
      <span className="font-script text-2xl text-saffron">The Faces Behind the Craft</span>
      <h2 className="font-display text-3xl md:text-4xl mt-1">Meet Our Artisans</h2>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {artisans.slice(0, 4).map((a, i) => (
        <motion.div key={a._id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }}>
          <ArtisanCard artisan={a} />
        </motion.div>
      ))}
    </div>
  </section>
);
