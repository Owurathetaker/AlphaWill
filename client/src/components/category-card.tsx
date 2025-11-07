import { Category } from "@shared/schema";
import { Card } from "@/components/ui/card";
import { categoryIcons, categoryDescriptions } from "@/lib/quotes";
import { Shield, Target, Bookmark, Scale, Flame, Compass } from "lucide-react";

interface CategoryCardProps {
  category: Category;
  quoteCount: number;
  onClick: () => void;
}

const iconComponents = {
  Discipline: Shield,
  Goals: Target,
  Faith: Bookmark,
  Integrity: Scale,
  Strength: Flame,
  Purpose: Compass
};

export function CategoryCard({ category, quoteCount, onClick }: CategoryCardProps) {
  const Icon = iconComponents[category];
  
  return (
    <Card
      className="p-6 cursor-pointer hover-elevate active-elevate-2 transition-all"
      onClick={onClick}
      data-testid={`category-card-${category.toLowerCase()}`}
    >
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="p-4 rounded-full bg-primary/10">
          <Icon className="h-8 w-8 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-bold tracking-wide uppercase" data-testid={`text-category-${category.toLowerCase()}`}>
            {category}
          </h3>
          <p className="text-xs text-muted-foreground mt-1" data-testid={`text-category-desc-${category.toLowerCase()}`}>
            {categoryDescriptions[category]}
          </p>
          <p className="text-xs text-primary mt-2 font-semibold" data-testid={`text-count-${category.toLowerCase()}`}>
            {quoteCount} Quotes
          </p>
        </div>
      </div>
    </Card>
  );
}
