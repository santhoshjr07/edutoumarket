
import { Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Home, ShoppingCart, ShoppingBag, Heart, User } from 'lucide-react';
import { motion } from 'framer-motion';

export function MainNav() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <NavigationMenu className="max-w-full w-full justify-start">
      <NavigationMenuList className="w-full flex justify-between px-4 md:px-8 py-4 bg-background border-b shadow-sm">
        <div className="flex items-center">
          <motion.div 
            className="mr-6 text-primary font-bold text-xl flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ShoppingBag className="mr-2 h-6 w-6" /> 
            EDUTOU
          </motion.div>
          
          <div className="flex items-center gap-6">
            <NavigationMenuItem>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/"
                  className={cn(
                    "flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary",
                    isActive("/") ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  <Home className="h-4 w-4" />
                  <span>Home</span>
                </Link>
              </motion.div>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/products"
                  className={cn(
                    "flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary",
                    isActive("/products") ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  <ShoppingBag className="h-4 w-4" />
                  <span>Products</span>
                </Link>
              </motion.div>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/transactions"
                  className={cn(
                    "flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary",
                    isActive("/transactions") ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  <ShoppingCart className="h-4 w-4" />
                  <span>Orders</span>
                </Link>
              </motion.div>
            </NavigationMenuItem>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <NavigationMenuItem>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/favorites"
                className={cn(
                  "flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary",
                  isActive("/favorites") ? "text-primary" : "text-muted-foreground"
                )}
              >
                <Heart className="h-4 w-4" />
                <span className="hidden md:inline">Favorites</span>
              </Link>
            </motion.div>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/settings"
                className={cn(
                  "flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary",
                  isActive("/settings") ? "text-primary" : "text-muted-foreground"
                )}
              >
                <User className="h-4 w-4" />
                <span className="hidden md:inline">Account</span>
              </Link>
            </motion.div>
          </NavigationMenuItem>
        </div>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
