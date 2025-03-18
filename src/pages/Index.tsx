import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, DollarSign, PieChart, Wallet, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MainNav } from "@/components/MainNav";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50/50">
      <MainNav />
      <div className="p-4 md:p-8 space-y-8 fade-in">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Good morning, Alex</h1>
            <p className="text-gray-500">Here's your financial overview</p>
          </div>
        </header>

        {/* Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 glass-card hover:shadow-lg transition-all">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Balance</p>
                <h3 className="text-2xl font-bold mt-1">$24,563.00</h3>
              </div>
              <Wallet className="w-8 h-8 text-primary" />
            </div>
            <div className="mt-4 flex items-center text-success">
              <ArrowUpRight className="w-4 h-4 mr-1" />
              <span className="text-sm font-medium">+2.4%</span>
            </div>
          </Card>

          <Card className="p-6 glass-card hover:shadow-lg transition-all">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Monthly Spending</p>
                <h3 className="text-2xl font-bold mt-1">$3,742.00</h3>
              </div>
              <PieChart className="w-8 h-8 text-warning" />
            </div>
            <div className="mt-4 flex items-center text-destructive">
              <ArrowDownRight className="w-4 h-4 mr-1" />
              <span className="text-sm font-medium">-4.7%</span>
            </div>
          </Card>

          <Card className="p-6 glass-card hover:shadow-lg transition-all">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Budget Left</p>
                <h3 className="text-2xl font-bold mt-1">$1,258.00</h3>
              </div>
              <DollarSign className="w-8 h-8 text-success" />
            </div>
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-success rounded-full h-2" style={{ width: '45%' }}></div>
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Transactions */}
        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Recent Transactions</h2>
            <Button variant="ghost" className="text-primary" asChild>
              <Link to="/transactions">
                View All <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </div>
          
          <Card className="divide-y">
            {[
              { name: 'Grocery Store', amount: -82.50, category: 'Food', date: 'Today' },
              { name: 'Salary Deposit', amount: 4200.00, category: 'Income', date: 'Yesterday' },
              { name: 'Electric Bill', amount: -145.00, category: 'Bills', date: 'Mar 15' },
            ].map((transaction, i) => (
              <div key={i} className="p-4 flex items-center justify-between hover:bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    transaction.amount > 0 ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'
                  }`}>
                    <DollarSign className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{transaction.name}</p>
                    <p className="text-sm text-gray-500">{transaction.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-medium ${
                    transaction.amount > 0 ? 'text-success' : 'text-destructive'
                  }`}>
                    {transaction.amount > 0 ? '+' : ''}{transaction.amount.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-500">{transaction.date}</p>
                </div>
              </div>
            ))}
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Index;
