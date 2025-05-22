
import React from 'react';
import { Edit, Trash2, Coffee } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export interface MenuItemType {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
}

interface MenuItemProps {
  item: MenuItemType;
  onEdit: (item: MenuItemType) => void;
  onDelete: (id: string) => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ item, onEdit, onDelete }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'beverages':
        return 'bg-cafe-lavender/20 text-cafe-darkBrown border-cafe-lavender';
      case 'pastry':
        return 'bg-cafe-pink/20 text-cafe-darkBrown border-cafe-pink';
      case 'dessert':
        return 'bg-cafe-mint/20 text-cafe-darkBrown border-cafe-mint';
      case 'breakfast':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="cafe-card h-full flex flex-col transition-all duration-300 hover:shadow-lg">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-lg">
        {item.image ? (
          <img 
            src={item.image} 
            alt={item.name} 
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center bg-cafe-lightGray">
            <Coffee className="h-12 w-12 text-cafe-brown opacity-30" />
          </div>
        )}
        <Badge className={`${getCategoryColor(item.category)} absolute top-2 left-2`}>
          {item.category}
        </Badge>
      </div>

      <CardContent className="flex-grow pt-4">
        <h3 className="font-playfair text-lg font-medium mb-1">{item.name}</h3>
        <p className="text-cafe-brown/80 text-sm">{item.description}</p>
        <p className="font-playfair text-lg font-semibold mt-2">{formatCurrency(item.price)}</p>
      </CardContent>

      <CardFooter className="flex justify-between pt-2 pb-4">
        <Button 
          variant="outline" 
          size="sm" 
          className="text-cafe-darkBrown border-cafe-lavender/50 hover:bg-cafe-lavender/20"
          onClick={() => onEdit(item)}
        >
          <Edit className="h-4 w-4 mr-1" />
          Edit
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="text-red-500 border-red-200 hover:bg-red-50"
          onClick={() => onDelete(item.id)}
        >
          <Trash2 className="h-4 w-4 mr-1" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MenuItem;
