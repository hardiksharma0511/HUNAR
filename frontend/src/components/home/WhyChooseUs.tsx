import { Heart, ShieldCheck, Sparkles, Handshake } from "lucide-react";

const items = [
  { icon: Heart, title: "Support Local Artists", desc: "Every purchase goes directly toward an artisan's livelihood and craft." },
  { icon: Sparkles, title: "100% Handmade", desc: "No mass production — each piece carries the maker's own hand and story." },
  { icon: ShieldCheck, title: "Safe Shopping", desc: "Secure checkout and verified sellers, every single time." },
  { icon: Handshake, title: "Direct from Artisan", desc: "No middlemen — you meet the maker behind every product." },
];

export const WhyChooseUs = () => (
  <section className="section-padding container-hunar">
    <div className="text-center mb-12">
      <span className="font-script text-2xl text-saffron">Our Promise</span>
      <h2 className="font-display text-3xl md:text-4xl mt-1">Why Choose Hunar</h2>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {items.map((item) => (
        <div key={item.title} className="text-center p-6">
          <div className="w-16 h-16 mx-auto rounded-full bg-olive/10 flex items-center justify-center mb-4">
            <item.icon className="w-7 h-7 text-olive" />
          </div>
          <h3 className="font-display text-lg">{item.title}</h3>
          <p className="text-sm text-charcoal/60 mt-2 leading-relaxed">{item.desc}</p>
        </div>
      ))}
    </div>
  </section>
);
