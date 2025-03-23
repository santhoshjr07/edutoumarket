
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ChevronRight, 
  ShoppingCart, 
  PlusCircle, 
  MinusCircle,
  Search,
  Filter,
  ShoppingBag
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { MainNav } from "@/components/MainNav";
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

// Product interface
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

// Cart item interface
interface CartItem extends Product {
  quantity: number;
}

const Index = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);

  // Mock product data
  const products: Product[] = [
    {
      id: 1,
      name: "Fresh Apples",
      price: 1.99,
      image: "https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?w=800&auto=format&fit=crop",
      category: "fruits",
      description: "Fresh, juicy apples picked at the peak of ripeness."
    },
    {
      id: 2,
      name: "Organic Bananas",
      price: 0.99,
      image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=800&auto=format&fit=crop",
      category: "fruits",
      description: "Sweet and nutritious organic bananas."
    },
    {
      id: 3,
      name: "Whole Milk",
      price: 3.49,
      image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=800&auto=format&fit=crop",
      category: "dairy",
      description: "Farm-fresh whole milk, rich and creamy."
    },
    {
      id: 4,
      name: "Bread Loaf",
      price: 2.49,
      image: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?w=800&auto=format&fit=crop",
      category: "bakery",
      description: "Freshly baked artisan bread loaf."
    },
    {
      id: 5,
      name: "Fresh Broccoli",
      price: 1.79,
      image: "https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?w=800&auto=format&fit=crop",
      category: "vegetables",
      description: "Nutritious green broccoli, farm fresh."
    },
    {
      id: 6,
      name: "Chicken Breast",
      price: 5.99,
      image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=800&auto=format&fit=crop",
      category: "meat",
      description: "Boneless, skinless chicken breast fillets."
    },
  ];

  // Filter products based on search and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Categories based on product data
  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))];

  // Cart functions
  const addToCart = (product: Product) => {
    setCart(currentCart => {
      const existingItem = currentCart.find(item => item.id === product.id);
      
      if (existingItem) {
        return currentCart.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...currentCart, { ...product, quantity: 1 }];
      }
    });

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
      duration: 2000,
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(currentCart => {
      const existingItem = currentCart.find(item => item.id === productId);
      
      if (existingItem && existingItem.quantity > 1) {
        return currentCart.map(item => 
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        );
      } else {
        return currentCart.filter(item => item.id !== productId);
      }
    });
  };

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="min-h-screen bg-orange-50/30">
      <MainNav />
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="p-4 md:p-8 space-y-8 fade-in"
      >
        {/* Header */}
        <motion.header 
          variants={itemVariants}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold text-orange-600">Edutou Grocery</h1>
            <p className="text-orange-700/70">Fresh products delivered to your door</p>
          </div>
          
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative"
          >
            <Button 
              size="lg" 
              className="flex items-center gap-2 orange-gradient text-white"
              onClick={() => setShowCart(!showCart)}
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Cart</span>
              {cartItemCount > 0 && (
                <Badge variant="secondary" className="ml-1 bg-white text-orange-600">{cartItemCount}</Badge>
              )}
            </Button>
            
            {/* Cart Dropdown */}
            {showCart && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 mt-2 w-80 bg-white shadow-xl rounded-lg z-50 orange-card"
              >
                <div className="p-4 max-h-96 overflow-auto">
                  <h3 className="font-bold text-lg mb-3 text-orange-600">Your Cart</h3>
                  
                  {cart.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-6 text-orange-400">
                      <ShoppingBag className="w-12 h-12 mb-2 opacity-50" />
                      <p>Your cart is empty</p>
                    </div>
                  ) : (
                    <>
                      {cart.map(item => (
                        <div key={item.id} className="flex items-center justify-between py-2 border-b border-orange-100">
                          <div className="flex items-center">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="w-12 h-12 object-cover rounded"
                            />
                            <div className="ml-3">
                              <p className="font-medium text-gray-800">{item.name}</p>
                              <p className="text-sm text-orange-600">${item.price.toFixed(2)} x {item.quantity}</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => removeFromCart(item.id)}
                              className="text-orange-500 hover:text-orange-700 hover:bg-orange-50"
                            >
                              <MinusCircle className="w-4 h-4" />
                            </Button>
                            <span className="mx-1 text-gray-800">{item.quantity}</span>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => addToCart(item)}
                              className="text-orange-500 hover:text-orange-700 hover:bg-orange-50"
                            >
                              <PlusCircle className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                      
                      <div className="pt-4 border-t border-orange-100 mt-4">
                        <div className="flex justify-between font-bold text-gray-800">
                          <span>Total:</span>
                          <span className="text-orange-600">${cartTotal.toFixed(2)}</span>
                        </div>
                        <Button className="w-full mt-4 orange-gradient" asChild>
                          <Link to="/checkout">Proceed to Checkout</Link>
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.header>

        {/* Search and Filter */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-orange-400" />
            <Input
              placeholder="Search products..."
              className="pl-10 border-orange-200 focus-visible:ring-orange-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map(category => (
              <Badge 
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className={`cursor-pointer capitalize ${
                  selectedCategory === category 
                    ? "bg-orange-500 hover:bg-orange-600" 
                    : "text-orange-500 border-orange-200 hover:border-orange-400"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </motion.div>

        {/* Product Grid */}
        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="h-full"
            >
              <Card className="overflow-hidden h-full flex flex-col orange-card shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="relative">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-2 right-2 capitalize bg-orange-500">{product.category}</Badge>
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="font-bold text-gray-800">{product.name}</h3>
                  <p className="text-lg font-bold text-orange-600 mt-1">${product.price.toFixed(2)}</p>
                  <p className="text-gray-600 text-sm mt-2 mb-4 flex-grow">{product.description}</p>
                  <Button 
                    className="w-full mt-auto bg-orange-500 hover:bg-orange-600 text-white" 
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Featured Sections */}
        <motion.section variants={itemVariants} className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-orange-700">Weekly Deals</h2>
            <Button variant="ghost" className="text-orange-500 hover:text-orange-700" asChild>
              <Link to="/deals">
                View All <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </div>
          
          <Card className="p-6 bg-gradient-to-r from-orange-100 to-orange-50 border-orange-200">
            <h3 className="text-lg font-semibold mb-4 text-orange-700">Get 15% off your first order!</h3>
            <p className="text-orange-700/70 mb-4">
              Sign up for our newsletter and get exclusive deals delivered to your inbox.
            </p>
            <div className="flex gap-2">
              <Input placeholder="Your email" className="flex-grow border-orange-200" />
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">Subscribe</Button>
            </div>
          </Card>
        </motion.section>
      </motion.div>
    </div>
  );
};

export default Index;
