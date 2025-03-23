
import { MainNav } from "@/components/MainNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Search, Filter, ShoppingCart } from "lucide-react";
import { useState } from "react";

// Sample product data
const products = [
  {
    id: 1,
    name: "Organic Bananas",
    price: 2.99,
    image: "/placeholder.svg",
    category: "Fruits",
    description: "Fresh organic bananas, perfect for smoothies or a healthy snack."
  },
  {
    id: 2,
    name: "Whole Grain Bread",
    price: 3.49,
    image: "/placeholder.svg",
    category: "Bakery",
    description: "Freshly baked whole grain bread, rich in fiber and nutrients."
  },
  {
    id: 3,
    name: "Free Range Eggs",
    price: 4.99,
    image: "/placeholder.svg",
    category: "Dairy",
    description: "Farm fresh free range eggs from ethically raised chickens."
  },
  {
    id: 4,
    name: "Grass-Fed Beef",
    price: 12.99,
    image: "/placeholder.svg",
    category: "Meat",
    description: "Premium grass-fed beef, high in omega-3 fatty acids."
  },
  {
    id: 5,
    name: "Organic Spinach",
    price: 2.49,
    image: "/placeholder.svg",
    category: "Vegetables",
    description: "Fresh, locally grown organic spinach, packed with nutrients."
  },
  {
    id: 6,
    name: "Greek Yogurt",
    price: 3.99,
    image: "/placeholder.svg",
    category: "Dairy",
    description: "Creamy Greek yogurt, high in protein and probiotics."
  },
  {
    id: 7,
    name: "Orange Juice",
    price: 4.49,
    image: "/placeholder.svg",
    category: "Beverages",
    description: "Freshly squeezed orange juice, rich in vitamin C."
  },
  {
    id: 8,
    name: "Avocados",
    price: 5.99,
    image: "/placeholder.svg",
    category: "Fruits",
    description: "Perfectly ripe avocados, great for salads or guacamole."
  }
];

// Get unique categories
const categories = ["All", ...new Set(products.map(product => product.category))];

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filter products based on search and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Animation variants
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
      
      {/* Products Title Section */}
      <motion.div 
        className="orange-gradient text-white py-12 px-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1 
          className="text-4xl md:text-5xl font-bold mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Our Products
        </motion.h1>
        <motion.p 
          className="text-lg max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Browse our selection of fresh, organic products
        </motion.p>
      </motion.div>

      {/* Search and Filter Section */}
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
        </div>

        {/* Products Grid */}
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
      
      {/* Footer */}
      <footer className="bg-foreground text-background py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Edutou Grocery</h3>
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
            <p>&copy; {new Date().getFullYear()} Edutou Grocery. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Products;
