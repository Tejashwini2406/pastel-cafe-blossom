
import React from 'react';
import { Clock, Check, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type OrderStatus = 'pending' | 'completed' | 'cancelled';

interface OrderSummaryProps {
  pendingCount: number;
  completedCount: number;
  cancelledCount: number;
}

const OrdersSummary: React.FC<OrderSummaryProps> = ({
  pendingCount,
  completedCount,
  cancelledCount,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="cafe-card border-l-4 border-l-cafe-pink">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center">
            <Clock className="h-5 w-5 mr-2 text-cafe-pink" />
            Pending Orders
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-playfair font-bold">{pendingCount}</div>
          <p className="text-sm text-cafe-brown/80 mt-1">Waiting to be processed</p>
        </CardContent>
      </Card>
      
      <Card className="cafe-card border-l-4 border-l-cafe-mint">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center">
            <Check className="h-5 w-5 mr-2 text-cafe-mint" />
            Completed Orders
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-playfair font-bold">{completedCount}</div>
          <p className="text-sm text-cafe-brown/80 mt-1">Successfully fulfilled</p>
        </CardContent>
      </Card>
      
      <Card className="cafe-card border-l-4 border-l-amber-400">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2 text-amber-400" />
            Cancelled Orders
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-playfair font-bold">{cancelledCount}</div>
          <p className="text-sm text-cafe-brown/80 mt-1">Could not be completed</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrdersSummary;
