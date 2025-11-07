import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, X } from "lucide-react";
import { setupInstallPrompt } from "@/lib/pwa";

export function InstallPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [installHandler, setInstallHandler] = useState<(() => Promise<void>) | null>(null);

  useEffect(() => {
    const isDismissed = localStorage.getItem('alpha-gents-install-dismissed');
    if (isDismissed) return;

    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    if (isStandalone) return;

    setupInstallPrompt((prompt) => {
      setInstallHandler(() => prompt);
      setShowPrompt(true);
    });
  }, []);

  const handleInstall = async () => {
    if (installHandler) {
      await installHandler();
      setShowPrompt(false);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('alpha-gents-install-dismissed', 'true');
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-[88px] left-4 right-4 z-40 animate-in slide-in-from-bottom-4">
      <Card className="p-4" data-testid="install-prompt">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-full bg-primary/10 shrink-0">
            <Download className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-sm mb-1">Install Alpha Gents</h3>
            <p className="text-xs text-muted-foreground mb-3">
              Get daily motivation offline. Add to your home screen for quick access.
            </p>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                onClick={handleInstall}
                data-testid="button-install"
                className="text-xs"
              >
                Install App
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDismiss}
                data-testid="button-dismiss-install"
                className="text-xs"
              >
                Not Now
              </Button>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 shrink-0"
            onClick={handleDismiss}
            data-testid="button-close-install"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
}
