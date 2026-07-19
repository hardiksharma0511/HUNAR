import { Link } from "react-router-dom";
import { PenTool, Package, Truck, IndianRupee } from "lucide-react";
import { Button } from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";
import { WarliDivider } from "../components/decorative/PatternDivider";

const steps = [
  { icon: PenTool, title: "Tell Your Story", desc: "Register as an artisan and share your craft, city, and journey." },
  { icon: Package, title: "List Your Products", desc: "Upload photos, set your price, and describe what makes each piece special." },
  { icon: IndianRupee, title: "Get Discovered", desc: "Buyers browse by category and meet the maker behind every product." },
  { icon: Truck, title: "Fulfil Orders", desc: "Manage incoming orders and ship directly to your customers." },
];

const BecomeSeller = () => {
  const { user } = useAuth();

  return (
    <div className="section-padding container-hunar text-center">
      <span className="font-script text-2xl text-saffron">For Artisans</span>
      <h1 className="font-display text-4xl md:text-5xl mt-1 max-w-2xl mx-auto text-balance">
        Turn Your Craft into a Livelihood
      </h1>
      <p className="text-charcoal/65 mt-5 max-w-xl mx-auto leading-relaxed">
        Hunar connects skilled Indian artisans directly with buyers who value authentic,
        handmade work — no middlemen, no hidden fees, just your craft reaching the people who love it.
      </p>

      {user?.role === "seller" ? (
        <Link to="/seller/dashboard"><Button size="lg" className="mt-8">Go to Your Dashboard</Button></Link>
      ) : (
        <Link to="/register"><Button size="lg" className="mt-8">Register as an Artisan</Button></Link>
      )}

      <WarliDivider className="my-16" />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
        {steps.map((s, i) => (
          <div key={s.title} className="bg-sand/40 rounded-clay p-6">
            <span className="font-display text-3xl text-terracotta/30">0{i + 1}</span>
            <div className="w-12 h-12 rounded-full bg-terracotta/10 flex items-center justify-center mt-3 mb-4">
              <s.icon className="w-6 h-6 text-terracotta" />
            </div>
            <h3 className="font-display text-lg">{s.title}</h3>
            <p className="text-sm text-charcoal/60 mt-2 leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BecomeSeller;
