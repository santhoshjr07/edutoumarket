
import { MainNav } from "@/components/MainNav";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Heart, ShoppingCart, ChevronLeft, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Sample favorite products
const favoriteProducts = [
  {
    id: 1,
    name: "Organic Bananas",
    price: 2.99,
    image: "/placeholder.svg",
    category: "Fruits",
    description: "Fresh organic bananas, perfect for smoothies or a healthy snack."
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
    id: 5,
    name: "Organic Spinach",
    price: 2.49,
    image: "/placeholder.svg",
    category: "Vegetables",
    description: "Fresh, locally grown organic spinach, packed with nutrients."
  }
];

const Favorites = () => {
  const navigate = useNavigate();

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
      
      <div className="container mx-auto px-4 py-8">
        <motion.div 
          className="mb-8 flex items-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </motion.div>
          <h1 className="text-3xl font-bold flex items-center">
            <Heart className="h-6 w-6 text-primary mr-2" />
            Your Favorites
          </h1>
        </motion.div>
        
        {favoriteProducts.length === 0 ? (
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Heart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-medium mb-2">No favorites yet</h2>
            <p className="text-muted-foreground mb-6">Start adding products to your favorites!</p>
            <Button onClick={() => navigate('/products')}>Browse Products</Button>
          </motion.div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {favoriteProducts.map((product) => (
              <motion.div key={product.id} variants={itemVariants}>
                <Card className="product-card h-full flex flex-col relative group">
                  <Button 
                    variant="destructive" 
                    size="icon" 
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
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
                    <Button className="w-full flex items-center gap-2">
                      <ShoppingCart className="h-4 w-4" />
                      Add to Cart
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
