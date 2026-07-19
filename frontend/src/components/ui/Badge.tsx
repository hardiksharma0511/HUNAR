import { ReactNode } from "react";
import clsx from "clsx";

export const Badge = ({
  children,
  tone = "terracotta",
}: {
  children: ReactNode;
  tone?: "terracotta" | "olive" | "gold" | "saffron";
}) => {
  const tones: Record<string, string> = {
    terracotta: "bg-terracotta/10 text-terracotta",
    olive: "bg-olive/15 text-olive",
    gold: "bg-gold/15 text-[#8a6d1f]",
    saffron: "bg-saffron/15 text-saffron",
  };
  return (
    <span className={clsx("text-xs font-medium px-3 py-1 rounded-full", tones[tone])}>
      {children}
    </span>
  );
};
