
import React, { useState, useEffect } from 'react';
import MenuItem, { MenuItemType } from '@/components/menu/MenuItem';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlusCircle, Search } from 'lucide-react';
import { toast } from 'sonner';

const Menu: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItemType[]>([]);
  const [filteredItems, setFilteredItems] = useState<MenuItemType[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentCategory, setCurrentCategory] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<MenuItemType | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
  });

  // Simulate fetching data
  useEffect(() => {
    // This would be replaced with actual API calls
    const fetchData = () => {
      // Mock data
      const mockItems: MenuItemType[] = [
        {
          id: '1',
          name: 'Cappuccino',
          description: 'Espresso with steamed milk and foam',
          price: 4.50,
          category: 'Beverages',
          image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        },
        {
          id: '2',
          name: 'Croissant',
          description: 'Buttery, flaky, viennoiserie pastry',
          price: 3.25,
          category: 'Pastry',
          image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        },
        {
          id: '3',
          name: 'Avocado Toast',
          description: 'Multigrain toast with avocado, radish, and microgreens',
          price: 8.95,
          category: 'Breakfast',
          image: 'https://images.unsplash.com/photo-1603046891726-36bfd957e0bf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        },
        {
          id: '4',
          name: 'Chocolate Cake',
          description: 'Rich chocolate cake with ganache frosting',
          price: 5.75,
          category: 'Dessert',
          image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        },
        {
          id: '5',
          name: 'Latte',
          description: 'Espresso with steamed milk',
          price: 4.25,
          category: 'Beverages',
          image: 'https://images.unsplash.com/photo-1561047029-3000c68339ca?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        },
        {
          id: '6',
          name: 'Pain au Chocolat',
          description: 'Chocolate-filled pastry',
          price: 3.50,
          category: 'Pastry',
          image: 'https://images.unsplash.com/photo-1623334044303-241021148842?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        },
      ];

      setMenuItems(mockItems);
      setFilteredItems(mockItems);
    };

    fetchData();
  }, []);

  // Filter items when search query or category changes
  useEffect(() => {
    let filtered = [...menuItems];
    
    if (currentCategory !== 'all') {
      filtered = filtered.filter(item => 
        item.category.toLowerCase() === currentCategory.toLowerCase()
      );
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(query) || 
        item.description.toLowerCase().includes(query)
      );
    }
    
    setFilteredItems(filtered);
  }, [searchQuery, currentCategory, menuItems]);
  
  // Handle dialog operations
  const openDialog = (item: MenuItemType | null) => {
    if (item) {
      setCurrentItem(item);
      setFormData({
        name: item.name,
        description: item.description,
        price: item.price.toString(),
        category: item.category,
      });
    } else {
      setCurrentItem(null);
      setFormData({
        name: '',
        description: '',
        price: '',
        category: '',
      });
    }
    setIsDialogOpen(true);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, category: value }));
  };
  
  const handleSave = () => {
    // Validate form
    if (!formData.name || !formData.price || !formData.category) {
      toast.error('Please fill all required fields');
      return;
    }
    
    const price = parseFloat(formData.price);
    if (isNaN(price) || price <= 0) {
      toast.error('Please enter a valid price');
      return;
    }
    
    // Create or update item
    if (currentItem) {
      // Update existing item
      const updatedItem: MenuItemType = {
        ...currentItem,
        name: formData.name,
        description: formData.description,
        price: price,
        category: formData.category,
      };
      
      setMenuItems(prev => 
        prev.map(item => item.id === currentItem.id ? updatedItem : item)
      );
      
      toast.success('Item updated successfully');
    } else {
      // Create new item
      const newItem: MenuItemType = {
        id: `${Date.now()}`, // Generate a temporary ID
        name: formData.name,
        description: formData.description,
        price: price,
        category: formData.category,
      };
      
      setMenuItems(prev => [...prev, newItem]);
      toast.success('Item added successfully');
    }
    
    setIsDialogOpen(false);
  };
  
  const handleDelete = (id: string) => {
    // In a real app, you'd confirm with the user first
    setMenuItems(prev => prev.filter(item => item.id !== id));
    toast.success('Item deleted successfully');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-playfair font-bold text-cafe-darkBrown">Menu Management</h1>
          <p className="text-cafe-brown/80 mt-1">Add, edit or remove menu items</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button 
            className="cafe-button-primary"
            onClick={() => openDialog(null)}
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Add New Item
          </Button>
        </div>
      </div>

      {/* Search and filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cafe-brown/60 h-4 w-4" />
          <Input
            placeholder="Search menu items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="cafe-input pl-9"
          />
        </div>
      </div>

      {/* Category tabs */}
      <Tabs defaultValue="all" value={currentCategory} onValueChange={setCurrentCategory}>
        <TabsList className="bg-cafe-lightGray mb-6 overflow-x-auto whitespace-nowrap flex-wrap">
          <TabsTrigger value="all" className="data-[state=active]:bg-white">All Items</TabsTrigger>
          <TabsTrigger value="beverages" className="data-[state=active]:bg-white">Beverages</TabsTrigger>
          <TabsTrigger value="pastry" className="data-[state=active]:bg-white">Pastry</TabsTrigger>
          <TabsTrigger value="breakfast" className="data-[state=active]:bg-white">Breakfast</TabsTrigger>
          <TabsTrigger value="dessert" className="data-[state=active]:bg-white">Dessert</TabsTrigger>
        </TabsList>
        
        <TabsContent value={currentCategory} className="mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <MenuItem 
                key={item.id}
                item={item}
                onEdit={() => openDialog(item)}
                onDelete={handleDelete}
              />
            ))}
            
            {filteredItems.length === 0 && (
              <div className="col-span-full text-center py-12">
                <p className="text-cafe-brown/70 text-lg">No items found</p>
                <Button 
                  variant="link" 
                  className="mt-2 text-cafe-brown"
                  onClick={() => {
                    setSearchQuery('');
                    setCurrentCategory('all');
                  }}
                >
                  Clear filters
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{currentItem ? 'Edit Menu Item' : 'Add New Menu Item'}</DialogTitle>
            <DialogDescription>
              {currentItem ? 'Update the details of this menu item.' : 'Enter the details for your new menu item.'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name*</Label>
              <Input 
                id="name" 
                name="name"
                value={formData.name} 
                onChange={handleInputChange} 
                placeholder="Item name"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input 
                id="description" 
                name="description"
                value={formData.description} 
                onChange={handleInputChange} 
                placeholder="Item description"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="price">Price*</Label>
              <Input 
                id="price" 
                name="price"
                value={formData.price} 
                onChange={handleInputChange} 
                placeholder="0.00"
                type="number"
                step="0.01"
                min="0"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="category">Category*</Label>
              <Select value={formData.category} onValueChange={handleSelectChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beverages">Beverages</SelectItem>
                  <SelectItem value="Pastry">Pastry</SelectItem>
                  <SelectItem value="Breakfast">Breakfast</SelectItem>
                  <SelectItem value="Dessert">Dessert</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} className="cafe-button-primary">Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Menu;
