import { useEffect, useState } from "react";
import api from "../lib/axios";
import { Product, Category, Artisan } from "../types";
import { Hero } from "../components/home/Hero";
import { CategoryGrid } from "../components/home/CategoryGrid";
import { FeaturedProducts } from "../components/home/FeaturedProducts";
import { ArtisanShowcase } from "../components/home/ArtisanShowcase";
import { WhyChooseUs } from "../components/home/WhyChooseUs";
import { Testimonials } from "../components/home/Testimonials";
import { SellerCTA } from "../components/home/SellerCTA";
import { MandalaDivider, MadhubaniDivider } from "../components/decorative/PatternDivider";
import { Spinner } from "../components/ui/Spinner";

const Home = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [artisans, setArtisans] = useState<Artisan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const [catRes, prodRes, artRes] = await Promise.all([
          api.get("/categories"),
          api.get("/products/featured"),
          api.get("/users/artisans"),
        ]);
        setCategories(catRes.data.categories);
        setProducts(prodRes.data.products);
        setArtisans(artRes.data.artisans);
      } catch (err) {
        setError("Could not reach the Hunar API. Make sure the backend server is running.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <Spinner className="py-40" />;

  if (error) {
    return (
      <div className="section-padding container-hunar text-center">
        <p className="text-charcoal/60">{error}</p>
      </div>
    );
  }

  return (
    <div>
      <Hero />
      <MandalaDivider />
      <CategoryGrid categories={categories} />
      <MadhubaniDivider className="my-4" />
      <FeaturedProducts products={products} />
      <MandalaDivider />
      <ArtisanShowcase artisans={artisans} />
      <MadhubaniDivider className="my-4" />
      <WhyChooseUs />
      <Testimonials />
      <SellerCTA />
    </div>
  );
};

export default Home;