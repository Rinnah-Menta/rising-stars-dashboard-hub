import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Download, 
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Filter,
  Search,
  Eye,
  MoreHorizontal
} from 'lucide-react';
import { PaymentDialog } from '@/components/finances/PaymentDialog';
import { FilterDialog, FilterOptions } from '@/components/finances/FilterDialog';
import { toast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Transaction {
  id: string;
  student: string;
  amount: number;
  type: string;
  date: string;
  status: string;
  method: string;
}

export const Finances = () => {
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState<FilterOptions>({});
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 'TXN001', student: 'Sarah Nakato', amount: 450000, type: 'School Fees', date: '2024-06-10', status: 'Completed', method: 'Mobile Money' },
    { id: 'TXN002', student: 'John Mukasa', amount: 450000, type: 'School Fees', date: '2024-06-10', status: 'Completed', method: 'Cash' },
    { id: 'TXN003', student: 'Mary Namuli', amount: 150000, type: 'Lunch Fees', date: '2024-06-09', status: 'Completed', method: 'Bank Transfer' },
    { id: 'TXN004', student: 'David Ssali', amount: 75000, type: 'Transport', date: '2024-06-09', status: 'Pending', method: 'Mobile Money' },
    { id: 'TXN005', student: 'Ruth Auma', amount: 200000, type: 'Uniform', date: '2024-06-08', status: 'Completed', method: 'Cash' },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'text-green-700 bg-green-100 border-green-200';
      case 'Pending': return 'text-yellow-700 bg-yellow-100 border-yellow-200';
      case 'Failed': return 'text-red-700 bg-red-100 border-red-200';
      default: return 'text-gray-700 bg-gray-100 border-gray-200';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-UG', {
      style: 'currency',
      currency: 'UGX',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleRecordPayment = (paymentData: any) => {
    const newTransaction: Transaction = {
      id: `TXN${String(transactions.length + 1).padStart(3, '0')}`,
      student: paymentData.studentName,
      amount: paymentData.amount,
      type: paymentData.paymentType,
      date: new Date().toISOString().split('T')[0],
      status: 'Completed',
      method: paymentData.paymentMethod
    };
    
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const handleExportReport = () => {
    const csvData = [
      ['Transaction ID', 'Student', 'Amount', 'Type', 'Date', 'Status', 'Method'],
      ...filteredTransactions.map(t => [t.id, t.student, t.amount.toString(), t.type, t.date, t.status, t.method])
    ];
    
    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `financial-report-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    toast({
      title: "Export Complete",
      description: "Financial report has been downloaded successfully.",
    });
  };

  const handleViewDetails = (transaction: Transaction) => {
    toast({
      title: "Transaction Details",
      description: `Viewing details for ${transaction.id} - ${transaction.student}`,
    });
  };

  const handleDownloadReceipt = (transaction: Transaction) => {
    toast({
      title: "Receipt Downloaded",
      description: `Receipt for ${transaction.id} has been downloaded.`,
    });
  };

  const applyFilters = (filters: FilterOptions) => {
    setActiveFilters(filters);
  };

  const filteredTransactions = transactions.filter(transaction => {
    // Search filter
    const matchesSearch = transaction.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.type.toLowerCase().includes(searchTerm.toLowerCase());

    // Status filter
    const matchesStatus = !activeFilters.status || transaction.status === activeFilters.status;
    
    // Payment type filter
    const matchesType = !activeFilters.paymentType || transaction.type === activeFilters.paymentType;
    
    // Payment method filter
    const matchesMethod = !activeFilters.paymentMethod || transaction.method === activeFilters.paymentMethod;
    
    // Date filters
    const transactionDate = new Date(transaction.date);
    const matchesDateFrom = !activeFilters.dateFrom || transactionDate >= new Date(activeFilters.dateFrom);
    const matchesDateTo = !activeFilters.dateTo || transactionDate <= new Date(activeFilters.dateTo);
    
    // Amount filters
    const matchesMinAmount = !activeFilters.minAmount || transaction.amount >= activeFilters.minAmount;
    const matchesMaxAmount = !activeFilters.maxAmount || transaction.amount <= activeFilters.maxAmount;

    return matchesSearch && matchesStatus && matchesType && matchesMethod && 
           matchesDateFrom && matchesDateTo && matchesMinAmount && matchesMaxAmount;
  });

  // ... keep existing code (stats array definition)
  const stats = [
    {
      title: "Total Revenue",
      value: "UGX 12.5M",
      change: "+12% from last month",
      icon: DollarSign,
      iconColor: "text-green-600",
      bgColor: "bg-green-50",
      trend: "up"
    },
    {
      title: "Outstanding Fees",
      value: "UGX 2.1M",
      change: "16.8% of total",
      icon: TrendingDown,
      iconColor: "text-red-600",
      bgColor: "bg-red-50",
      trend: "down"
    },
    {
      title: "Paid Students",
      value: "189",
      change: "76.5% payment rate",
      icon: Users,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-50",
      trend: "up"
    },
    {
      title: "Avg Fee per Term",
      value: "UGX 450K",
      change: "Current term average",
      icon: Calendar,
      iconColor: "text-purple-600",
      bgColor: "bg-purple-50",
      trend: "neutral"
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Financial Management</h1>
          <p className="text-gray-600 mt-1">Monitor payments, fees, and financial performance</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button 
            onClick={() => setPaymentDialogOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 transition-colors shadow-lg"
          >
            <Plus className="h-4 w-4 mr-2" />
            Record Payment
          </Button>
          <Button 
            variant="outline" 
            onClick={handleExportReport}
            className="border-gray-300 hover:bg-gray-50 transition-colors"
          >
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-all duration-300 border-0 shadow-md">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
                </div>
              </div>
              <div className="flex items-center space-x-2 mt-4">
                {stat.trend === 'up' && <ArrowUpRight className="h-4 w-4 text-green-600" />}
                {stat.trend === 'down' && <ArrowDownRight className="h-4 w-4 text-red-600" />}
                <span className={`text-sm font-medium ${
                  stat.trend === 'up' ? 'text-green-600' : 
                  stat.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {stat.change}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Fee Structure and Payment Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="shadow-md border-0">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-semibold">Fee Structure (Per Term)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'School Fees', amount: 450000, color: 'bg-blue-50 border-l-4 border-l-blue-500' },
                { name: 'Lunch Program', amount: 150000, color: 'bg-green-50 border-l-4 border-l-green-500' },
                { name: 'Transport (Optional)', amount: 75000, color: 'bg-yellow-50 border-l-4 border-l-yellow-500' },
                { name: 'Uniform & Books', amount: 200000, color: 'bg-purple-50 border-l-4 border-l-purple-500' }
              ].map((fee, index) => (
                <div key={index} className={`flex justify-between items-center p-4 rounded-lg ${fee.color} hover:shadow-sm transition-shadow`}>
                  <span className="font-medium text-gray-800">{fee.name}</span>
                  <span className="font-bold text-gray-900">{formatCurrency(fee.amount)}</span>
                </div>
              ))}
              <div className="border-t pt-4 mt-6">
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className="font-bold text-lg text-gray-800">Total Package</span>
                  <span className="font-bold text-lg text-blue-600">{formatCurrency(875000)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md border-0">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-semibold">Payment Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { label: 'Fees Paid', percentage: 76.5, color: 'bg-green-500', bgColor: 'bg-green-100' },
                { label: 'Partial Payments', percentage: 15.2, color: 'bg-yellow-500', bgColor: 'bg-yellow-100' },
                { label: 'Outstanding', percentage: 8.3, color: 'bg-red-500', bgColor: 'bg-red-100' }
              ].map((stat, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">{stat.label}</span>
                    <span className="text-sm font-semibold text-gray-900">{stat.percentage}%</span>
                  </div>
                  <div className={`w-full ${stat.bgColor} rounded-full h-3 overflow-hidden`}>
                    <div 
                      className={`h-full ${stat.color} rounded-full transition-all duration-500 ease-out`}
                      style={{ width: `${stat.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card className="shadow-md border-0">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle className="text-xl font-semibold">Recent Transactions</CardTitle>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => setFilterDialogOpen(true)}
              >
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
          {Object.keys(activeFilters).length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-gray-600">Active filters:</span>
              {Object.entries(activeFilters).map(([key, value]) => 
                value && (
                  <Badge key={key} variant="secondary" className="text-xs">
                    {key}: {value}
                  </Badge>
                )
              )}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => {
                  setActiveFilters({});
                  setSearchTerm('');
                }}
                className="text-xs"
              >
                Clear all
              </Button>
            </div>
          )}
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left p-4 font-semibold text-gray-700">Transaction ID</th>
                  <th className="text-left p-4 font-semibold text-gray-700">Student</th>
                  <th className="text-left p-4 font-semibold text-gray-700">Amount</th>
                  <th className="text-left p-4 font-semibold text-gray-700">Type</th>
                  <th className="text-left p-4 font-semibold text-gray-700">Date</th>
                  <th className="text-left p-4 font-semibold text-gray-700">Status</th>
                  <th className="text-left p-4 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction, index) => (
                  <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      <span className="font-mono text-sm font-medium text-gray-600">{transaction.id}</span>
                    </td>
                    <td className="p-4">
                      <span className="font-medium text-gray-900">{transaction.student}</span>
                    </td>
                    <td className="p-4">
                      <span className="font-semibold text-gray-900">{formatCurrency(transaction.amount)}</span>
                    </td>
                    <td className="p-4">
                      <span className="text-gray-700">{transaction.type}</span>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-gray-600">{new Date(transaction.date).toLocaleDateString()}</span>
                    </td>
                    <td className="p-4">
                      <Badge className={`border ${getStatusColor(transaction.status)}`}>
                        {transaction.status}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-white z-50">
                          <DropdownMenuItem onClick={() => handleViewDetails(transaction)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDownloadReceipt(transaction)}>
                            <Download className="h-4 w-4 mr-2" />
                            Download Receipt
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredTransactions.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No transactions found matching your search criteria.
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <PaymentDialog 
        open={paymentDialogOpen}
        onOpenChange={setPaymentDialogOpen}
        onSave={handleRecordPayment}
      />

      <FilterDialog
        open={filterDialogOpen}
        onOpenChange={setFilterDialogOpen}
        onApplyFilters={applyFilters}
      />
    </div>
  );
};
