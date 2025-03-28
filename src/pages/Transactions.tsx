import { motion } from 'framer-motion';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { ChevronLeft, Filter, Search, ArrowUpRight, ArrowDownRight, CalendarDays } from 'lucide-react';
import { Input } from "@/components/ui/input";

const Transactions = () => {
  const navigate = useNavigate();
  
  // Temporary mock data - this would come from your bank API
  const transactions = [
    { id: 1, date: '2024-02-20', description: 'Grocery Store', amount: -82.50, category: 'Food' },
    { id: 2, date: '2024-02-19', description: 'Salary Deposit', amount: 4200.00, category: 'Income' },
    { id: 3, date: '2024-02-18', description: 'Electric Bill', amount: -145.00, category: 'Bills' },
    { id: 4, date: '2024-02-17', description: 'Restaurant', amount: -65.30, category: 'Food' },
    { id: 5, date: '2024-02-16', description: 'Transport Pass', amount: -120.00, category: 'Transport' }
  ];

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
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="min-h-screen bg-gray-50/50"
    >
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
            <h1 className="text-3xl font-bold text-gray-900">Transactions</h1>
          </div>
        </motion.header>

        <motion.div variants={itemVariants}>
          <Card className="p-6">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search transactions..."
                  className="pl-10"
                />
              </div>
              <div className="flex gap-4">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="food">Food</SelectItem>
                    <SelectItem value="transport">Transport</SelectItem>
                    <SelectItem value="bills">Bills</SelectItem>
                    <SelectItem value="income">Income</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <CalendarDays className="w-4 h-4 mr-2" />
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
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction, index) => (
                    <motion.tr
                      key={transaction.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ backgroundColor: 'rgba(0,0,0,0.02)' }}
                    >
                      <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                      <TableCell>{transaction.description}</TableCell>
                      <TableCell>{transaction.category}</TableCell>
                      <TableCell className="text-right">
                        <span className={`flex items-center justify-end ${
                          transaction.amount > 0 ? 'text-success' : 'text-destructive'
                        }`}>
                          {transaction.amount > 0 ? (
                            <ArrowUpRight className="w-4 h-4 mr-1" />
                          ) : (
                            <ArrowDownRight className="w-4 h-4 mr-1" />
                          )}
                          ${Math.abs(transaction.amount).toFixed(2)}
                        </span>
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </motion.div>
          </Card>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Transactions;
