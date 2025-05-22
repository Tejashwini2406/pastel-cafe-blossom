
import React, { useState, useEffect } from 'react';
import OrdersSummary from '@/components/dashboard/OrdersSummary';
import RecentOrders, { Order } from '@/components/dashboard/RecentOrders';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

const Dashboard: React.FC = () => {
  const [orderStats, setOrderStats] = useState({
    pending: 0,
    completed: 0,
    cancelled: 0,
  });
  
  const [orders, setOrders] = useState<Order[]>([]);
  
  // Simulate fetching data
  useEffect(() => {
    // This would be replaced with actual API calls
    const fetchData = () => {
      // Mock data
      const mockOrders: Order[] = [
        {
          id: 'ORD-001',
          customer: 'Emma Johnson',
          items: ['Cappuccino', 'Croissant'],
          total: 8.50,
          status: 'pending',
          createdAt: new Date(Date.now() - 1000 * 60 * 15), // 15 mins ago
        },
        {
          id: 'ORD-002',
          customer: 'Michael Chen',
          items: ['Latte', 'Blueberry Muffin', 'Orange Juice'],
          total: 12.75,
          status: 'completed',
          createdAt: new Date(Date.now() - 1000 * 60 * 45), // 45 mins ago
        },
        {
          id: 'ORD-003',
          customer: 'Sophia Martinez',
          items: ['Earl Grey Tea', 'Chocolate Croissant'],
          total: 7.25,
          status: 'pending',
          createdAt: new Date(Date.now() - 1000 * 60 * 5), // 5 mins ago
        },
        {
          id: 'ORD-004',
          customer: 'James Wilson',
          items: ['Americano', 'Ham & Cheese Sandwich'],
          total: 10.50,
          status: 'cancelled',
          createdAt: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
        },
        {
          id: 'ORD-005',
          customer: 'Olivia Brown',
          items: ['Chai Latte', 'Avocado Toast', 'Fruit Cup'],
          total: 15.95,
          status: 'completed',
          createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 mins ago
        },
      ];

      setOrders(mockOrders);
      
      // Calculate counts
      const pending = mockOrders.filter(order => order.status === 'pending').length;
      const completed = mockOrders.filter(order => order.status === 'completed').length;
      const cancelled = mockOrders.filter(order => order.status === 'cancelled').length;
      
      setOrderStats({
        pending,
        completed,
        cancelled,
      });
    };

    fetchData();
  }, []);

  const handleUpdateStatus = (id: string, newStatus: 'pending' | 'completed' | 'cancelled') => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
    
    // Update counts
    setOrderStats(prev => {
      const order = orders.find(o => o.id === id);
      if (!order) return prev;
      
      const oldStatus = order.status;
      const result = { ...prev };
      
      if (oldStatus !== newStatus) {
        if (oldStatus === 'pending') result.pending--;
        else if (oldStatus === 'completed') result.completed--;
        else if (oldStatus === 'cancelled') result.cancelled--;
        
        if (newStatus === 'pending') result.pending++;
        else if (newStatus === 'completed') result.completed++;
        else if (newStatus === 'cancelled') result.cancelled++;
      }
      
      return result;
    });
    
    toast.success(`Order ${id} has been ${newStatus}`);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-playfair font-bold text-cafe-darkBrown">Dashboard</h1>
          <p className="text-cafe-brown/80 mt-1">Welcome back to your café management system!</p>
        </div>
        <div className="mt-4 md:mt-0">
          <span className="bg-cafe-pink/20 text-cafe-brown px-3 py-1 rounded-full text-sm">
            Today: {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
        </div>
      </div>

      <OrdersSummary 
        pendingCount={orderStats.pending}
        completedCount={orderStats.completed}
        cancelledCount={orderStats.cancelled}
      />

      <div className="mt-8">
        <RecentOrders orders={orders} onUpdateStatus={handleUpdateStatus} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <Card className="cafe-card">
          <CardHeader>
            <CardTitle className="text-xl font-playfair">Today's Popular Items</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex justify-between items-center">
                <span>Cappuccino</span>
                <span className="font-medium bg-cafe-mint/20 px-2 py-1 rounded-md text-cafe-darkBrown">23 orders</span>
              </li>
              <li className="flex justify-between items-center">
                <span>Croissant</span>
                <span className="font-medium bg-cafe-mint/20 px-2 py-1 rounded-md text-cafe-darkBrown">18 orders</span>
              </li>
              <li className="flex justify-between items-center">
                <span>Avocado Toast</span>
                <span className="font-medium bg-cafe-mint/20 px-2 py-1 rounded-md text-cafe-darkBrown">15 orders</span>
              </li>
              <li className="flex justify-between items-center">
                <span>Latte</span>
                <span className="font-medium bg-cafe-mint/20 px-2 py-1 rounded-md text-cafe-darkBrown">12 orders</span>
              </li>
              <li className="flex justify-between items-center">
                <span>Blueberry Muffin</span>
                <span className="font-medium bg-cafe-mint/20 px-2 py-1 rounded-md text-cafe-darkBrown">10 orders</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="cafe-card">
          <CardHeader>
            <CardTitle className="text-xl font-playfair">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <button className="cafe-button-primary w-full flex items-center justify-center">
                New Order
              </button>
              <button className="cafe-button-secondary w-full flex items-center justify-center">
                Add Menu Item
              </button>
              <button className="cafe-button-accent w-full flex items-center justify-center">
                Add Customer
              </button>
              <button className="bg-cafe-lightGray hover:bg-cafe-lavender/30 text-cafe-darkBrown font-medium py-2 px-4 rounded-lg transition-colors duration-200 w-full flex items-center justify-center">
                Generate Report
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
