interface ContainerProps {
  size?: "text" | "dashboard";
  children: React.ReactNode;
  className?: string;
}

export default function Container({
  size = "dashboard",
  children,
  className,
}: ContainerProps) {
  const maxWidth = size === "text" ? "max-w-5xl" : "max-w-7xl";
  return (
    <div className={`${maxWidth} mx-auto px-6 ${className ?? ""}`}>
      {children}
    </div>
  );
}
