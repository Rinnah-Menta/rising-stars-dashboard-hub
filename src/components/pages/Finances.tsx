
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DollarSign, TrendingUp, TrendingDown, Users, Download, Plus } from 'lucide-react';

export const Finances = () => {
  const recentTransactions = [
    { id: 'TXN001', student: 'Sarah Nakato', amount: 450000, type: 'School Fees', date: '2024-06-10', status: 'Completed' },
    { id: 'TXN002', student: 'John Mukasa', amount: 450000, type: 'School Fees', date: '2024-06-10', status: 'Completed' },
    { id: 'TXN003', student: 'Mary Namuli', amount: 150000, type: 'Lunch Fees', date: '2024-06-09', status: 'Completed' },
    { id: 'TXN004', student: 'David Ssali', amount: 75000, type: 'Transport', date: '2024-06-09', status: 'Pending' },
    { id: 'TXN005', student: 'Ruth Auma', amount: 200000, type: 'Uniform', date: '2024-06-08', status: 'Completed' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'text-green-600 bg-green-50';
      case 'Pending': return 'text-yellow-600 bg-yellow-50';
      case 'Failed': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-UG', {
      style: 'currency',
      currency: 'UGX',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold">Financial Management</h1>
        <div className="flex flex-wrap gap-2">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Record Payment
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">UGX 12.5M</div>
                <p className="text-xs text-gray-600">Total Revenue</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span className="text-xs text-green-600">+12% from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">UGX 2.1M</div>
                <p className="text-xs text-gray-600">Outstanding Fees</p>
              </div>
              <TrendingDown className="h-8 w-8 text-red-600" />
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <span className="text-xs text-red-600">16.8% of total</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">189</div>
                <p className="text-xs text-gray-600">Paid Students</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <span className="text-xs text-blue-600">76.5% payment rate</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">UGX 450K</div>
                <p className="text-xs text-gray-600">Avg Fee per Term</p>
              </div>
              <DollarSign className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Fee Structure (Per Term)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">School Fees</span>
                <span className="font-bold">UGX 450,000</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">Lunch Program</span>
                <span className="font-bold">UGX 150,000</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">Transport (Optional)</span>
                <span className="font-bold">UGX 75,000</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">Uniform & Books</span>
                <span className="font-bold">UGX 200,000</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg">Total Package</span>
                  <span className="font-bold text-lg text-blue-600">UGX 875,000</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">Fees Paid</span>
                  <span className="text-sm font-medium">76.5%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '76.5%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">Partial Payments</span>
                  <span className="text-sm font-medium">15.2%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '15.2%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">Outstanding</span>
                  <span className="text-sm font-medium">8.3%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-red-600 h-2 rounded-full" style={{ width: '8.3%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-medium">Transaction ID</th>
                  <th className="text-left p-4 font-medium">Student</th>
                  <th className="text-left p-4 font-medium">Amount</th>
                  <th className="text-left p-4 font-medium">Type</th>
                  <th className="text-left p-4 font-medium">Date</th>
                  <th className="text-left p-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b hover:bg-gray-50">
                    <td className="p-4 font-mono text-sm">{transaction.id}</td>
                    <td className="p-4">{transaction.student}</td>
                    <td className="p-4 font-medium">{formatCurrency(transaction.amount)}</td>
                    <td className="p-4">{transaction.type}</td>
                    <td className="p-4 text-sm">{new Date(transaction.date).toLocaleDateString()}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
