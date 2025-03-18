
import { MainNav } from '@/components/MainNav';
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PieChart, AlertCircle } from 'lucide-react';
import { AddBudgetDialog } from '@/components/AddBudgetDialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Budget = () => {
  // Mock budget data - this would come from your state management
  const budgets = [
    { category: 'Food & Dining', allocated: 800, spent: 650 },
    { category: 'Transportation', allocated: 400, spent: 280 },
    { category: 'Entertainment', allocated: 300, spent: 290 },
    { category: 'Shopping', allocated: 500, spent: 200 },
    { category: 'Bills & Utilities', allocated: 1000, spent: 950 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <MainNav />
      <div className="container p-4 md:p-8 max-w-6xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Budget Settings</h1>
          <AddBudgetDialog />
        </div>

        {/* Overview Card */}
        <Card className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Total Budget</h3>
              <p className="text-3xl font-bold">$3,000</p>
              <p className="text-sm text-muted-foreground">for February 2024</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Spent</h3>
              <p className="text-3xl font-bold text-primary">$2,370</p>
              <Progress value={79} className="h-2" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Remaining</h3>
              <p className="text-3xl font-bold text-green-600">$630</p>
              <p className="text-sm text-muted-foreground">21% left this month</p>
            </div>
          </div>
        </Card>

        {/* Budget Categories */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Budget Categories</h2>
            <div className="flex gap-2">
              <PieChart className="w-5 h-5 text-muted-foreground" />
              <span className="text-muted-foreground">Monthly View</span>
            </div>
          </div>

          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead>Allocated</TableHead>
                  <TableHead>Spent</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {budgets.map((budget, index) => {
                  const percentage = (budget.spent / budget.allocated) * 100;
                  const isOverBudget = percentage > 90;

                  return (
                    <TableRow key={index}>
                      <TableCell>{budget.category}</TableCell>
                      <TableCell>${budget.allocated}</TableCell>
                      <TableCell>${budget.spent}</TableCell>
                      <TableCell className="w-[300px]">
                        <Progress value={percentage} className="h-2" />
                      </TableCell>
                      <TableCell>
                        {isOverBudget && (
                          <div className="flex items-center text-destructive">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            Alert
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  )}
                )}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Budget;
