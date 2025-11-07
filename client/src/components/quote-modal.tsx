import { Quote } from "@shared/schema";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Heart, Share2, X } from "lucide-react";
import { useFavorites } from "@/hooks/use-favorites";
import { Badge } from "@/components/ui/badge";

interface QuoteModalProps {
  quote: Quote | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onShare?: () => void;
}

export function QuoteModal({ quote, open, onOpenChange, onShare }: QuoteModalProps) {
  const { isFavorite, toggleFavorite } = useFavorites();

  if (!quote) return null;

  const favorite = isFavorite(quote.id);

  const handleFavoriteClick = () => {
    toggleFavorite(quote.id);
  };

  const handleShareClick = () => {
    onShare?.();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl" data-testid="quote-modal">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <Badge variant="secondary" data-testid="modal-category">
              {quote.category}
            </Badge>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              data-testid="button-close-modal"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="flex flex-col gap-6 py-6">
          <blockquote className="text-xl md:text-2xl font-bold leading-relaxed" data-testid="modal-quote-text">
            "{quote.text}"
          </blockquote>

          {quote.author && (
            <p className="text-base font-medium text-muted-foreground text-right italic" data-testid="modal-quote-author">
              — {quote.author}
            </p>
          )}

          {quote.biblicalReference && (
            <p className="text-sm font-serif font-semibold text-primary text-center tracking-wide" data-testid="modal-scripture">
              {quote.biblicalReference}
            </p>
          )}

          <div className="flex items-center justify-center gap-3 pt-4">
            <Button
              variant={favorite ? "default" : "outline"}
              onClick={handleFavoriteClick}
              data-testid="button-modal-favorite"
              className="gap-2"
            >
              <Heart className={`h-4 w-4 ${favorite ? "fill-current" : ""}`} />
              {favorite ? "Saved" : "Save"}
            </Button>
            <Button
              variant="default"
              onClick={handleShareClick}
              data-testid="button-modal-share"
              className="gap-2"
            >
              <Share2 className="h-4 w-4" />
              Share
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
