import { Home, Grid3x3, Shuffle, Heart, Share2 } from "lucide-react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";

interface NavItem {
  icon: typeof Home;
  label: string;
  path: string;
  testId: string;
}

const navItems: NavItem[] = [
  { icon: Home, label: "Today", path: "/", testId: "nav-today" },
  { icon: Grid3x3, label: "Categories", path: "/categories", testId: "nav-categories" },
  { icon: Shuffle, label: "Random", path: "/random", testId: "nav-random" },
  { icon: Heart, label: "Favorites", path: "/favorites", testId: "nav-favorites" },
  { icon: Share2, label: "Share", path: "/share", testId: "nav-share" },
];

export function BottomNav() {
  const [location] = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="flex items-center justify-around h-[72px] px-2">
        {navItems.map(({ icon: Icon, label, path, testId }) => {
          const isActive = location === path || (path !== "/" && location.startsWith(path));
          
          return (
            <Link key={path} href={path}>
              <Button
                variant="ghost"
                size="sm"
                data-testid={testId}
                className={`flex flex-col items-center justify-center gap-1 h-16 min-h-16 px-3 ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <Icon className={`h-6 w-6 ${isActive ? "fill-current" : ""}`} />
                <span className="text-xs font-medium tracking-wide uppercase">{label}</span>
              </Button>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
