import { HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

export const Card = ({ className, children, ...props }: HTMLAttributes<HTMLDivElement> & { children: ReactNode }) => (
  <div
    className={clsx(
      "bg-sand/60 paper-texture rounded-clay shadow-soft border border-terracotta/10",
      className
    )}
    {...props}
  >
    {children}
  </div>
);
