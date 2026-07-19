const reviews = [
  { name: "Priyanka Sinha", city: "Mumbai", text: "The Madhubani painting I bought looks even better in person. Knowing the artisan's story made it so much more special.", rating: 5 },
  { name: "Rohit Malhotra", city: "Bengaluru", text: "Ordered a blue pottery vase for my mother — beautifully packed, arrived safely, and she loved it.", rating: 5 },
  { name: "Fatima Sheikh", city: "Hyderabad", text: "Love that I can see exactly who made my candles and where. Hunar feels personal, not like a big faceless store.", rating: 4 },
];

export const Testimonials = () => (
  <section className="section-padding container-hunar bg-sand/30 rounded-[2.5rem]">
    <div className="text-center mb-12">
      <span className="font-script text-2xl text-saffron">Loved by Customers</span>
      <h2 className="font-display text-3xl md:text-4xl mt-1">Customer Reviews</h2>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {reviews.map((r) => (
        <div key={r.name} className="bg-ivory rounded-clay p-6 shadow-soft border border-terracotta/10">
          <p className="text-gold text-lg mb-2">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</p>
          <p className="text-charcoal/70 italic leading-relaxed">"{r.text}"</p>
          <p className="mt-4 font-medium">{r.name}</p>
          <p className="text-xs text-charcoal/50">{r.city}</p>
        </div>
      ))}
    </div>
  </section>
);
