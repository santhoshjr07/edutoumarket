
import { Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Home, WalletCards, PieChart, Settings } from 'lucide-react';

export function MainNav() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <NavigationMenu className="max-w-full w-full justify-start">
      <NavigationMenuList className="w-full flex justify-between px-4 md:px-8 py-4 bg-background border-b">
        <div className="flex items-center gap-6">
          <NavigationMenuItem>
            <Link
              to="/"
              className={cn(
                "flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary",
                isActive("/") ? "text-primary" : "text-muted-foreground"
              )}
            >
              <Home className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link
              to="/transactions"
              className={cn(
                "flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary",
                isActive("/transactions") ? "text-primary" : "text-muted-foreground"
              )}
            >
              <WalletCards className="h-4 w-4" />
              <span>Transactions</span>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link
              to="/budget"
              className={cn(
                "flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary",
                isActive("/budget") ? "text-primary" : "text-muted-foreground"
              )}
            >
              <PieChart className="h-4 w-4" />
              <span>Budget</span>
            </Link>
          </NavigationMenuItem>
        </div>
        <NavigationMenuItem>
          <Link
            to="/settings"
            className={cn(
              "flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary",
              isActive("/settings") ? "text-primary" : "text-muted-foreground"
            )}
          >
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
