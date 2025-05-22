
import React from 'react';
import { MoreHorizontal, Clock, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

export interface Order {
  id: string;
  customer: string;
  items: string[];
  total: number;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: Date;
}

interface RecentOrdersProps {
  orders: Order[];
  onUpdateStatus: (id: string, status: 'pending' | 'completed' | 'cancelled') => void;
}

const RecentOrders: React.FC<RecentOrdersProps> = ({ orders, onUpdateStatus }) => {
  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(date);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-cafe-pink/20 text-cafe-darkBrown border-cafe-pink';
      case 'completed':
        return 'bg-cafe-mint/20 text-cafe-darkBrown border-cafe-mint';
      case 'cancelled':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'completed':
        return <Check className="h-4 w-4" />;
      case 'cancelled':
        return <X className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <Card className="cafe-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-playfair">Recent Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="cafe-table">
            <thead>
              <tr>
                <th className="font-medium">Order ID</th>
                <th className="font-medium">Customer</th>
                <th className="font-medium">Items</th>
                <th className="font-medium">Total</th>
                <th className="font-medium">Status</th>
                <th className="font-medium">Time</th>
                <th className="font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="animate-fade-in" style={{ animationDelay: `${orders.indexOf(order) * 50}ms` }}>
                  <td className="font-medium">{order.id}</td>
                  <td>{order.customer}</td>
                  <td>
                    <div className="max-w-[180px] truncate">
                      {order.items.join(', ')}
                    </div>
                  </td>
                  <td>{formatCurrency(order.total)}</td>
                  <td>
                    <Badge variant="outline" className={`${getStatusColor(order.status)} flex items-center gap-1 text-xs`}>
                      {getStatusIcon(order.status)}
                      <span className="capitalize">{order.status}</span>
                    </Badge>
                  </td>
                  <td>{formatTime(order.createdAt)}</td>
                  <td>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onUpdateStatus(order.id, 'completed')}>
                          Mark as Completed
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onUpdateStatus(order.id, 'cancelled')}>
                          Cancel Order
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentOrders;
