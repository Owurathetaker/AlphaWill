import { useEffect } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BottomNav } from "@/components/bottom-nav";
import { InstallPrompt } from "@/components/install-prompt";
import { registerServiceWorker } from "@/lib/pwa";
import Home from "@/pages/home";
import Categories from "@/pages/categories";
import Random from "@/pages/random";
import Favorites from "@/pages/favorites";
import Share from "@/pages/share";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/categories" component={Categories} />
      <Route path="/categories/:category" component={Categories} />
      <Route path="/random" component={Random} />
      <Route path="/favorites" component={Favorites} />
      <Route path="/share" component={Share} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  useEffect(() => {
    registerServiceWorker();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-background text-foreground">
          <main className="pb-[72px]">
            <Router />
          </main>
          <BottomNav />
          <InstallPrompt />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
