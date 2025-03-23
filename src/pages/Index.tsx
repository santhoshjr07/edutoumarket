import { useState } from "react";
import { MainNav } from "@/components/MainNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Search, ShoppingCart, Plus, Minus, X } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Organic Bananas",
    price: 2.99,
    image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?q=80&w=500&auto=format",
    category: "Fruits",
    description: "Fresh organic bananas, perfect for smoothies or a healthy snack."
  },
  {
    id: 2,
    name: "Whole Grain Bread",
    price: 3.49,
    image: "https://images.unsplash.com/photo-1598373182133-52452f7691ef?q=80&w=500&auto=format",
    category: "Bakery",
    description: "Freshly baked whole grain bread, rich in fiber and nutrients."
  },
  {
    id: 3,
    name: "Free Range Eggs",
    price: 4.99,
    image: "https://images.unsplash.com/photo-1598965675045-45c67c1cfc47?q=80&w=500&auto=format",
    category: "Dairy",
    description: "Farm fresh free range eggs from ethically raised chickens."
  },
  {
    id: 4,
    name: "Grass-Fed Beef",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1551135049-8a33b5883817?q=80&w=500&auto=format",
    category: "Meat",
    description: "Premium grass-fed beef, high in omega-3 fatty acids."
  },
  {
    id: 5,
    name: "Organic Spinach",
    price: 2.49,
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?q=80&w=500&auto=format",
    category: "Vegetables",
    description: "Fresh, locally grown organic spinach, packed with nutrients."
  },
  {
    id: 6,
    name: "Greek Yogurt",
    price: 3.99,
    image: "https://images.unsplash.com/photo-1571212515416-fca325e39a36?q=80&w=500&auto=format",
    category: "Dairy",
    description: "Creamy Greek yogurt, high in protein and probiotics."
  },
  {
    id: 7,
    name: "Orange Juice",
    price: 4.49,
    image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?q=80&w=500&auto=format",
    category: "Beverages",
    description: "Freshly squeezed orange juice, rich in vitamin C."
  },
  {
    id: 8,
    name: "Avocados",
    price: 5.99,
    image: "https://images.unsplash.com/photo-1519162808019-7de1683fa2ad?q=80&w=500&auto=format",
    category: "Fruits",
    description: "Perfectly ripe avocados, great for salads or guacamole."
  }
];

const categories = ["All", ...new Set(products.map(product => product.category))];

export default function Index() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cart, setCart] = useState<{id: number, quantity: number}[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (productId: number) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.id === productId);
      if (existingItem) {
        return prev.map(item => 
          item.id === productId ? {...item, quantity: item.quantity + 1} : item
        );
      } else {
        return [...prev, {id: productId, quantity: 1}];
      }
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.id === productId);
      if (existingItem && existingItem.quantity > 1) {
        return prev.map(item => 
          item.id === productId ? {...item, quantity: item.quantity - 1} : item
        );
      } else {
        return prev.filter(item => item.id !== productId);
      }
    });
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const product = products.find(p => p.id === item.id);
      return total + (product ? product.price * item.quantity : 0);
    }, 0).toFixed(2);
  };

  const getCartQuantity = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  return (
    <div className="min-h-screen bg-secondary/40">
      <MainNav />
      
      <motion.div 
        className="orange-gradient text-white py-16 px-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1 
          className="text-4xl md:text-6xl font-bold mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Welcome to Edutou Basket
        </motion.h1>
        <motion.p 
          className="text-lg md:text-xl max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Fresh, organic products delivered to your doorstep
        </motion.p>
      </motion.div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="relative flex-1 max-w-xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search products..."
              className="pl-10 search-bar"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className="whitespace-nowrap"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="relative">
            <Button 
              className="flex items-center gap-2" 
              onClick={() => setIsCartOpen(!isCartOpen)}
            >
              <ShoppingCart className="h-5 w-5" />
              <span>Cart</span>
              {cart.length > 0 && (
                <Badge className="ml-1">{getCartQuantity()}</Badge>
              )}
            </Button>

            {isCartOpen && (
              <motion.div 
                className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-lg z-50 p-4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold">Your Cart</h3>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setIsCartOpen(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                {cart.length === 0 ? (
                  <p className="text-center text-muted-foreground py-4">Your cart is empty</p>
                ) : (
                  <>
                    <div className="max-h-64 overflow-y-auto space-y-2 mb-4">
                      {cart.map((item) => {
                        const product = products.find(p => p.id === item.id);
                        if (!product) return null;
                        
                        return (
                          <div key={item.id} className="cart-item">
                            <div className="w-12 h-12 bg-muted rounded-md overflow-hidden">
                              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-sm">{product.name}</h4>
                              <p className="text-sm text-orange-600 font-bold">${product.price.toFixed(2)}</p>
                            </div>
                            <div className="quantity-control">
                              <Button 
                                variant="outline" 
                                size="icon" 
                                className="h-6 w-6" 
                                onClick={() => removeFromCart(item.id)}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span>{item.quantity}</span>
                              <Button 
                                variant="outline" 
                                size="icon" 
                                className="h-6 w-6" 
                                onClick={() => addToCart(item.id)}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    
                    <div className="pt-4 border-t border-border">
                      <div className="flex justify-between mb-4">
                        <span className="font-medium">Total</span>
                        <span className="font-bold">${getCartTotal()}</span>
                      </div>
                      <Button className="w-full">Checkout</Button>
                    </div>
                  </>
                )}
              </motion.div>
            )}
          </div>
        </div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredProducts.map((product) => (
            <motion.div key={product.id} variants={itemVariants}>
              <Card className="product-card h-full flex flex-col">
                <div className="aspect-square bg-muted overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="pt-6 flex-1">
                  <Badge className="category-badge mb-2">{product.category}</Badge>
                  <h3 className="font-bold text-lg mb-1">{product.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{product.description}</p>
                  <p className="price-tag">${product.price.toFixed(2)}</p>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button 
                    className="w-full" 
                    onClick={() => addToCart(product.id)}
                  >
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium">No products found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
      
      <footer className="bg-foreground text-background py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Edutou Basket</h3>
              <p className="text-background/80">
                Your local grocery store offering fresh and organic products.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-background/80 hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#" className="text-background/80 hover:text-primary transition-colors">Products</a></li>
                <li><a href="#" className="text-background/80 hover:text-primary transition-colors">Recipes</a></li>
                <li><a href="#" className="text-background/80 hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Contact Us</h4>
              <p className="text-background/80 mb-2">123 Grocery Street</p>
              <p className="text-background/80 mb-2">Food City, FC 12345</p>
              <p className="text-background/80 mb-2">Phone: (123) 456-7890</p>
              <p className="text-background/80">Email: info@edutou.com</p>
            </div>
          </div>
          <div className="border-t border-background/20 mt-8 pt-8 text-center text-background/60">
            <p>&copy; {new Date().getFullYear()} Edutou Basket. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
