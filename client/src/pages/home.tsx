import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Quote } from "@shared/schema";
import { QuoteCard } from "@/components/quote-card";
import { QuoteModal } from "@/components/quote-modal";
import { Flame } from "lucide-react";
import { DAILY_QUOTE_KEY, DAILY_QUOTE_DATE_KEY } from "@/lib/quotes";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [dailyQuote, setDailyQuote] = useState<Quote | null>(null);
  const { toast } = useToast();

  const { data: quotes = [], isLoading } = useQuery<Quote[]>({
    queryKey: ["/api/quotes"],
  });

  const { data: todayQuote, refetch } = useQuery<Quote>({
    queryKey: ["/api/quotes/daily"],
  });

  useEffect(() => {
    if (todayQuote) {
      const today = new Date().toDateString();
      const storedDate = localStorage.getItem(DAILY_QUOTE_DATE_KEY);
      
      if (storedDate !== today) {
        localStorage.setItem(DAILY_QUOTE_KEY, JSON.stringify(todayQuote));
        localStorage.setItem(DAILY_QUOTE_DATE_KEY, today);
        setDailyQuote(todayQuote);
      } else {
        const stored = localStorage.getItem(DAILY_QUOTE_KEY);
        if (stored) {
          setDailyQuote(JSON.parse(stored));
        } else {
          setDailyQuote(todayQuote);
        }
      }
    }
  }, [todayQuote]);

  const handleNext = () => {
    refetch();
  };

  const handleShare = async () => {
    if (!dailyQuote) return;
    
    const shareText = `"${dailyQuote.text}"\n\n— ${dailyQuote.author || "Unknown"}\n${dailyQuote.biblicalReference || ""}\n\n#AlphaGents #Motivation`;
    
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

  if (isLoading || !dailyQuote) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-144px)]">
        <div className="animate-pulse text-primary">
          <Flame className="h-12 w-12" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-144px)] pb-6">
      <div className="px-4 pt-6 pb-4">
        <div className="flex items-center gap-3 mb-2">
          <Flame className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-black tracking-tight uppercase" data-testid="heading-today">
            Today's Mission
          </h1>
        </div>
        <p className="text-sm text-muted-foreground" data-testid="text-subtitle">
          Lock in. Go hard. No excuses.
        </p>
      </div>

      <div className="px-4">
        <QuoteCard
          quote={dailyQuote}
          variant="hero"
          onClick={handleNext}
          onShare={handleShare}
        />
      </div>

      <div className="px-4 mt-8">
        <h2 className="text-lg font-bold mb-4 tracking-wide uppercase" data-testid="heading-recent">
          Recent Motivation
        </h2>
        <div className="space-y-3">
          {quotes.slice(0, 5).map((quote) => (
            <QuoteCard
              key={quote.id}
              quote={quote}
              variant="compact"
              onClick={() => setSelectedQuote(quote)}
              onShare={handleShare}
            />
          ))}
        </div>
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
