export const Spinner = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center justify-center ${className}`}>
    <div className="w-8 h-8 border-3 border-terracotta/20 border-t-terracotta rounded-full animate-spin" />
  </div>
);
