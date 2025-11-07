import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { Quote, categories, Category } from "@shared/schema";
import { CategoryCard } from "@/components/category-card";
import { QuoteCard } from "@/components/quote-card";
import { QuoteModal } from "@/components/quote-modal";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function CategoryList() {
  const { data: quotes = [] } = useQuery<Quote[]>({
    queryKey: ["/api/quotes"],
  });

  const categoryCounts = categories.map(category => ({
    category,
    count: quotes.filter(q => q.category === category).length
  }));

  return (
    <div className="min-h-[calc(100vh-144px)] px-4 pt-6 pb-6">
      <div className="mb-6">
        <h1 className="text-2xl font-black tracking-tight uppercase mb-2" data-testid="heading-categories">
          Categories
        </h1>
        <p className="text-sm text-muted-foreground" data-testid="text-categories-subtitle">
          Choose your path to greatness
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categoryCounts.map(({ category, count }) => (
          <CategoryCard
            key={category}
            category={category}
            quoteCount={count}
            onClick={() => {
              window.location.href = `/categories/${category.toLowerCase()}`;
            }}
          />
        ))}
      </div>
    </div>
  );
}

function CategoryDetail({ category }: { category: Category }) {
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const { toast } = useToast();

  const { data: quotes = [] } = useQuery<Quote[]>({
    queryKey: ["/api/quotes/category", category],
  });

  const handleShare = async () => {
    if (!selectedQuote) return;
    
    const shareText = `"${selectedQuote.text}"\n\n— ${selectedQuote.author || "Unknown"}\n${selectedQuote.biblicalReference || ""}\n\n#AlphaGents #${category}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Alpha Gents - ${category}`,
          text: shareText,
        });
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          console.error("Share failed:", err);
        }
      }
    } else {
      await navigator.clipboard.writeText(shareText);
      toast({
        title: "Copied to clipboard",
        description: "Quote copied to clipboard",
      });
    }
  };

  return (
    <div className="min-h-[calc(100vh-144px)] pb-6">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border">
        <div className="px-4 py-4 flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => window.history.back()}
            data-testid="button-back"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-xl font-black tracking-tight uppercase" data-testid={`heading-${category.toLowerCase()}`}>
              {category}
            </h1>
            <p className="text-xs text-muted-foreground" data-testid="text-count">
              {quotes.length} Quotes
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 pt-4 space-y-3">
        {quotes.map((quote) => (
          <QuoteCard
            key={quote.id}
            quote={quote}
            variant="compact"
            onClick={() => setSelectedQuote(quote)}
            onShare={handleShare}
          />
        ))}
        {quotes.length === 0 && (
          <div className="text-center py-12 text-muted-foreground" data-testid="text-empty-category">
            No quotes in this category yet
          </div>
        )}
      </div>

      <QuoteModal
        quote={selectedQuote}
        open={!!selectedQuote}
        onOpenChange={(open) => !open && setSelectedQuote(null)}
        onShare={handleShare}
      />
    </div>
  );
}

export default function Categories() {
  const [match, params] = useRoute("/categories/:category");
  
  if (match && params?.category) {
    const category = (params.category.charAt(0).toUpperCase() + params.category.slice(1)) as Category;
    if (categories.includes(category)) {
      return <CategoryDetail category={category} />;
    }
  }

  return <CategoryList />;
}
