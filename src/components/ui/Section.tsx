interface SectionProps {
  background?: "light" | "dark";
  children: React.ReactNode;
  className?: string;
}

export default function Section({
  background = "light",
  children,
  className,
}: SectionProps) {
  const bg =
    background === "dark"
      ? "bg-[#060D1A]"
      : "bg-[#0C1830]/30";
  return (
    <section className={`py-16 md:py-24 ${bg} ${className ?? ""}`}>
      {children}
    </section>
  );
}
