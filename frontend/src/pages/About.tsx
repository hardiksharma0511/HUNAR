import { Heart, Users, Globe } from "lucide-react";
import { WarliDivider } from "../components/decorative/PatternDivider";

const About = () => (
  <div className="section-padding container-hunar max-w-3xl">
    <span className="font-script text-2xl text-saffron">Our Story</span>
    <h1 className="font-display text-4xl mt-1">About Hunar</h1>
    <p className="text-charcoal/70 mt-6 leading-relaxed">
      "Hunar" means <em>skill</em> or <em>craft</em> in Hindi and Urdu — and that's exactly what
      this marketplace is built to celebrate. Across India, thousands of painters, potters,
      weavers and craftspeople carry forward traditions passed down through generations, often
      without a direct way to reach people who would cherish their work.
    </p>
    <p className="text-charcoal/70 mt-4 leading-relaxed">
      Hunar exists to close that gap. We give artisans a simple way to showcase their craft,
      tell their own story, and sell directly to buyers — with no middlemen taking a cut of
      either the price or the recognition they deserve.
    </p>

    <WarliDivider className="my-12" />

    <div className="grid sm:grid-cols-3 gap-6 text-center">
      <div>
        <Heart className="w-8 h-8 text-terracotta mx-auto" />
        <h3 className="font-display text-lg mt-3">Made with Care</h3>
        <p className="text-sm text-charcoal/60 mt-2">Every listing is reviewed to ensure it's genuinely handmade.</p>
      </div>
      <div>
        <Users className="w-8 h-8 text-terracotta mx-auto" />
        <h3 className="font-display text-lg mt-3">Artisan First</h3>
        <p className="text-sm text-charcoal/60 mt-2">Sellers keep control of their pricing, story, and shop.</p>
      </div>
      <div>
        <Globe className="w-8 h-8 text-terracotta mx-auto" />
        <h3 className="font-display text-lg mt-3">Rooted in India</h3>
        <p className="text-sm text-charcoal/60 mt-2">Celebrating regional crafts from every corner of the country.</p>
      </div>
    </div>
  </div>
);

export default About;
