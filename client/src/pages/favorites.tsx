import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Quote } from "@shared/schema";
import { QuoteCard } from "@/components/quote-card";
import { QuoteModal } from "@/components/quote-modal";
import { useFavorites } from "@/hooks/use-favorites";
import { Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Favorites() {
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const { favorites } = useFavorites();
  const { toast } = useToast();

  const { data: allQuotes = [] } = useQuery<Quote[]>({
    queryKey: ["/api/quotes"],
  });

  const favoriteQuotes = allQuotes.filter(quote => favorites.has(quote.id));

  const handleShare = async () => {
    if (!selectedQuote) return;
    
    const shareText = `"${selectedQuote.text}"\n\n— ${selectedQuote.author || "Unknown"}\n${selectedQuote.biblicalReference || ""}\n\n#AlphaGents #Motivation`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Alpha Gents Quote",
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
    <div className="min-h-[calc(100vh-144px)] px-4 pt-6 pb-6">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <Heart className="h-6 w-6 text-primary fill-current" />
          <h1 className="text-2xl font-black tracking-tight uppercase" data-testid="heading-favorites">
            Saved Quotes
          </h1>
        </div>
        <p className="text-sm text-muted-foreground" data-testid="text-favorites-subtitle">
          Your collection of warrior wisdom
        </p>
      </div>

      {favoriteQuotes.length === 0 ? (
        <div className="text-center py-12" data-testid="empty-favorites">
          <Heart className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
          <p className="text-muted-foreground">No saved quotes yet</p>
          <p className="text-sm text-muted-foreground mt-2">
            Tap the heart icon to save your favorites
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {favoriteQuotes.map((quote) => (
            <QuoteCard
              key={quote.id}
              quote={quote}
              variant="compact"
              onClick={() => setSelectedQuote(quote)}
              onShare={handleShare}
            />
          ))}
        </div>
      )}

      <QuoteModal
        quote={selectedQuote}
        open={!!selectedQuote}
        onOpenChange={(open) => !open && setSelectedQuote(null)}
        onShare={handleShare}
      />
    </div>
  );
}
