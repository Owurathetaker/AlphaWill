import { useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Quote } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Share2, Shuffle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import html2canvas from "html2canvas";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Share() {
  const [selectedQuoteId, setSelectedQuoteId] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const quoteCardRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const { data: quotes = [], isLoading } = useQuery<Quote[]>({
    queryKey: ["/api/quotes"],
  });

  const { data: dailyQuote } = useQuery<Quote>({
    queryKey: ["/api/quotes/daily"],
  });

  const selectedQuote = selectedQuoteId 
    ? quotes.find(q => q.id === selectedQuoteId)
    : dailyQuote;

  const handleRandomQuote = () => {
    if (quotes.length > 0) {
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      setSelectedQuoteId(randomQuote.id);
    }
  };

  const generateImage = async () => {
    if (!quoteCardRef.current || !selectedQuote) return null;

    setIsGenerating(true);
    try {
      const canvas = await html2canvas(quoteCardRef.current, {
        backgroundColor: '#0a0a0a',
        scale: 2,
        logging: false,
      });
      
      return canvas.toDataURL('image/png');
    } catch (error) {
      console.error('Failed to generate image:', error);
      toast({
        title: "Error",
        description: "Failed to generate image",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = async () => {
    const imageData = await generateImage();
    if (!imageData) return;

    const link = document.createElement('a');
    link.download = `alpha-gents-${Date.now()}.png`;
    link.href = imageData;
    link.click();

    toast({
      title: "Downloaded",
      description: "Quote image saved to your device",
    });
  };

  const handleShare = async () => {
    const imageData = await generateImage();
    if (!imageData) return;

    try {
      const blob = await (await fetch(imageData)).blob();
      const file = new File([blob], 'alpha-gents-quote.png', { type: 'image/png' });

      if (navigator.share && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'Alpha Gents Quote',
          text: `"${selectedQuote?.text}" - ${selectedQuote?.author || 'Unknown'}`,
        });
      } else {
        const shareText = `"${selectedQuote?.text}"\n\n— ${selectedQuote?.author || "Unknown"}\n${selectedQuote?.biblicalReference || ""}\n\n#AlphaGents #Motivation`;
        await navigator.clipboard.writeText(shareText);
        toast({
          title: "Copied to clipboard",
          description: "Quote text copied to clipboard",
        });
      }
    } catch (err) {
      if ((err as Error).name !== "AbortError") {
        console.error("Share failed:", err);
      }
    }
  };

  if (isLoading || !selectedQuote) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-144px)]">
        <div className="animate-pulse text-primary">
          <Share2 className="h-12 w-12" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-144px)] px-4 pt-6 pb-6">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <Share2 className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-black tracking-tight uppercase" data-testid="heading-share">
            Share Motivation
          </h1>
        </div>
        <p className="text-sm text-muted-foreground" data-testid="text-share-subtitle">
          Create and share formatted quote images
        </p>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Select value={selectedQuoteId} onValueChange={setSelectedQuoteId}>
            <SelectTrigger className="flex-1" data-testid="select-quote">
              <SelectValue placeholder="Today's quote" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Today's Quote</SelectItem>
              {quotes.slice(0, 20).map((quote) => (
                <SelectItem key={quote.id} value={quote.id}>
                  {quote.text.substring(0, 50)}...
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="icon"
            onClick={handleRandomQuote}
            data-testid="button-random-share"
          >
            <Shuffle className="h-5 w-5" />
          </Button>
        </div>

        <div ref={quoteCardRef} className="relative">
          <Card className="p-8 bg-gradient-to-br from-card to-card/50">
            <div className="flex flex-col gap-6">
              <Badge variant="secondary" className="self-start" data-testid={`badge-${selectedQuote.category.toLowerCase()}`}>
                {selectedQuote.category}
              </Badge>

              <blockquote className="text-2xl md:text-3xl font-bold leading-relaxed text-center" data-testid="text-share-quote">
                "{selectedQuote.text}"
              </blockquote>

              {selectedQuote.author && (
                <p className="text-base font-medium text-muted-foreground text-right italic" data-testid="text-share-author">
                  — {selectedQuote.author}
                </p>
              )}

              {selectedQuote.biblicalReference && (
                <p className="text-sm font-serif font-semibold text-primary text-center tracking-wide" data-testid="text-share-scripture">
                  {selectedQuote.biblicalReference}
                </p>
              )}

              <div className="flex items-center justify-center gap-2 pt-4">
                <div className="text-xs font-bold text-muted-foreground tracking-widest">
                  ALPHA GENTS
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="flex flex-col gap-3">
          <Button
            onClick={handleShare}
            disabled={isGenerating}
            data-testid="button-share-image"
            className="gap-2"
          >
            {isGenerating ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Share2 className="h-5 w-5" />
            )}
            Share Quote Image
          </Button>
          <Button
            variant="outline"
            onClick={handleDownload}
            disabled={isGenerating}
            data-testid="button-download-image"
            className="gap-2"
          >
            {isGenerating ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Download className="h-5 w-5" />
            )}
            Download Image
          </Button>
        </div>

        <div className="text-xs text-muted-foreground text-center pt-4">
          Quote images are generated in high quality for sharing on social media
        </div>
      </div>
    </div>
  );
}
