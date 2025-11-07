import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Quote } from "@shared/schema";
import { QuoteCard } from "@/components/quote-card";
import { QuoteModal } from "@/components/quote-modal";
import { Button } from "@/components/ui/button";
import { Shuffle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Random() {
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { toast } = useToast();

  const { data: quotes = [], isLoading } = useQuery<Quote[]>({
    queryKey: ["/api/quotes"],
  });

  const handleShuffle = () => {
    if (quotes.length > 0) {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setCurrentIndex(randomIndex);
    }
  };

  const handleShare = async () => {
    const quote = quotes[currentIndex];
    if (!quote) return;
    
    const shareText = `"${quote.text}"\n\n— ${quote.author || "Unknown"}\n${quote.biblicalReference || ""}\n\n#AlphaGents #Motivation`;
    
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

  const currentQuote = quotes[currentIndex];

  if (isLoading || !currentQuote) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-144px)]">
        <div className="animate-pulse text-primary">
          <Shuffle className="h-12 w-12" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-144px)] pb-6">
      <div className="px-4 pt-6 pb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <Shuffle className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-black tracking-tight uppercase" data-testid="heading-random">
              Random Dose
            </h1>
          </div>
          <Button
            variant="default"
            size="icon"
            onClick={handleShuffle}
            data-testid="button-shuffle"
            className="shrink-0"
          >
            <Shuffle className="h-5 w-5" />
          </Button>
        </div>
        <p className="text-sm text-muted-foreground" data-testid="text-random-subtitle">
          Fresh motivation on demand
        </p>
      </div>

      <div className="px-4">
        <QuoteCard
          quote={currentQuote}
          variant="hero"
          onClick={handleShuffle}
          onShare={handleShare}
        />
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
