import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
}: SectionHeaderProps) {
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <div className={cn("max-w-2xl", alignment, className)}>
      {eyebrow && (
        <div className="eyebrow mb-5">
          <span className="rule mr-3" />
          {eyebrow}
        </div>
      )}
      <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-foreground">
        {title}
      </h2>
      {description && (
        <p className="mt-6 text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl">
          {description}
        </p>
      )}
    </div>
  );
}