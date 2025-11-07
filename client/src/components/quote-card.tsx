import { Quote } from "@shared/schema";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Share2, ChevronRight } from "lucide-react";
import { useFavorites } from "@/hooks/use-favorites";
import { Badge } from "@/components/ui/badge";

interface QuoteCardProps {
  quote: Quote;
  variant?: "hero" | "compact";
  onClick?: () => void;
  onShare?: () => void;
}

export function QuoteCard({ quote, variant = "compact", onClick, onShare }: QuoteCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(quote.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(quote.id);
  };

  const handleShareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onShare?.();
  };

  if (variant === "hero") {
    return (
      <Card 
        className="p-8 cursor-pointer hover-elevate active-elevate-2 bg-gradient-to-br from-card to-card/50"
        onClick={onClick}
        data-testid={`quote-card-${quote.id}`}
      >
        <div className="flex flex-col gap-6">
          <div className="flex items-start justify-between gap-4">
            <Badge variant="secondary" className="shrink-0" data-testid={`badge-category-${quote.category.toLowerCase()}`}>
              {quote.category}
            </Badge>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleFavoriteClick}
              data-testid={`button-favorite-${quote.id}`}
              className="shrink-0"
            >
              <Heart className={`h-5 w-5 ${favorite ? "fill-accent text-accent" : ""}`} />
            </Button>
          </div>

          <blockquote className="text-2xl md:text-3xl font-bold leading-relaxed text-center" data-testid="text-quote">
            "{quote.text}"
          </blockquote>

          {quote.author && (
            <p className="text-base font-medium text-muted-foreground text-right italic" data-testid="text-author">
              — {quote.author}
            </p>
          )}

          {quote.biblicalReference && (
            <p className="text-sm font-serif font-semibold text-primary text-center tracking-wide" data-testid="text-scripture">
              {quote.biblicalReference}
            </p>
          )}

          <div className="flex items-center justify-center gap-3 mt-2">
            <Button
              variant="default"
              onClick={handleShareClick}
              data-testid="button-share"
              className="gap-2"
            >
              <Share2 className="h-4 w-4" />
              Share
            </Button>
            <Button
              variant="outline"
              onClick={onClick}
              data-testid="button-next"
              className="gap-2"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card 
      className="p-4 cursor-pointer hover-elevate active-elevate-2"
      onClick={onClick}
      data-testid={`quote-card-${quote.id}`}
    >
      <div className="flex items-start gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary" className="text-xs" data-testid={`badge-category-${quote.category.toLowerCase()}`}>
              {quote.category}
            </Badge>
            {quote.biblicalReference && (
              <span className="text-xs font-serif text-muted-foreground" data-testid="text-scripture-compact">
                {quote.biblicalReference}
              </span>
            )}
          </div>
          <p className="font-semibold text-sm line-clamp-2 mb-1" data-testid="text-quote-preview">
            "{quote.text}"
          </p>
          {quote.author && (
            <p className="text-xs text-muted-foreground italic" data-testid="text-author-compact">
              — {quote.author}
            </p>
          )}
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={handleFavoriteClick}
            data-testid={`button-favorite-${quote.id}`}
          >
            <Heart className={`h-4 w-4 ${favorite ? "fill-accent text-accent" : ""}`} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={handleShareClick}
            data-testid={`button-share-${quote.id}`}
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
