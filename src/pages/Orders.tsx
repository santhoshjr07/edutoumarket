
import { MainNav } from "@/components/MainNav";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { ChevronLeft, Filter, Search, Package, Calendar, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Sample order data
const orders = [
  { 
    id: "#ORD-5932",
    date: "2024-03-20",
    total: 82.50,
    status: "Delivered",
    items: 4
  },
  { 
    id: "#ORD-5931",
    date: "2024-03-15",
    total: 45.20,
    status: "Processing",
    items: 2
  },
  { 
    id: "#ORD-5930",
    date: "2024-03-10",
    total: 125.75,
    status: "Shipped",
    items: 6
  },
  { 
    id: "#ORD-5929",
    date: "2024-03-05",
    total: 37.90,
    status: "Delivered",
    items: 3
  },
  { 
    id: "#ORD-5928",
    date: "2024-02-28",
    total: 94.60,
    status: "Delivered",
    items: 5
  }
];

const Orders = () => {
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered": return "bg-success/20 text-success";
      case "Processing": return "bg-warning/20 text-warning";
      case "Shipped": return "bg-blue-500/20 text-blue-500";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-secondary/40">
      <MainNav />
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="p-4 md:p-8 space-y-8 fade-in"
      >
        <motion.header 
          variants={itemVariants}
          className="flex justify-between items-center"
        >
          <div className="flex items-center gap-4">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </motion.div>
            <h1 className="text-3xl font-bold text-gray-900">Your Orders</h1>
          </div>
          <Button>
            <FileText className="w-4 h-4 mr-2" />
            Order History
          </Button>
        </motion.header>

        <motion.div variants={itemVariants}>
          <Card className="p-6">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search orders..."
                  className="pl-10"
                />
              </div>
              <div className="flex gap-4">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Calendar className="w-4 h-4 mr-2" />
                  Date Range
                </Button>
              </div>
            </div>

            <motion.div 
              variants={itemVariants}
              className="rounded-lg border"
            >
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order, index) => (
                    <motion.tr
                      key={order.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ backgroundColor: 'rgba(0,0,0,0.02)' }}
                    >
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                      <TableCell>{order.items} items</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        ${order.total.toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          Details
                        </Button>
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </motion.div>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Orders;
