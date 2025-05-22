
import React from 'react';
import { Coffee, List, X, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useIsMobile } from '@/hooks/use-mobile';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="bg-white border-b border-cafe-lavender/20 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Coffee className="h-8 w-8 text-cafe-brown mr-2" />
          <Link to="/" className="font-playfair text-2xl font-bold text-cafe-brown">
            CaféSystem
          </Link>
        </div>

        {isMobile ? (
          <>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-cafe-brown"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <List className="h-6 w-6" />}
            </Button>

            {isMenuOpen && (
              <div className="absolute top-full left-0 right-0 bg-white border-b border-cafe-lavender/20 shadow-md animate-fade-in">
                <nav className="container mx-auto py-4 px-4 flex flex-col space-y-4">
                  <Link 
                    to="/dashboard" 
                    className="px-4 py-2 text-cafe-darkBrown hover:bg-cafe-lavender/20 rounded-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link 
                    to="/orders" 
                    className="px-4 py-2 text-cafe-darkBrown hover:bg-cafe-lavender/20 rounded-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Orders
                  </Link>
                  <Link 
                    to="/menu" 
                    className="px-4 py-2 text-cafe-darkBrown hover:bg-cafe-lavender/20 rounded-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Menu
                  </Link>
                  <Link 
                    to="/customers" 
                    className="px-4 py-2 text-cafe-darkBrown hover:bg-cafe-lavender/20 rounded-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Customers
                  </Link>
                  <Link 
                    to="/reports" 
                    className="px-4 py-2 text-cafe-darkBrown hover:bg-cafe-lavender/20 rounded-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Reports
                  </Link>
                  <hr className="border-cafe-lavender/20" />
                  <Button 
                    variant="ghost" 
                    className="justify-start text-cafe-darkBrown hover:bg-cafe-pink/20"
                    onClick={() => {
                      console.log("Logout clicked");
                      setIsMenuOpen(false);
                    }}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </nav>
              </div>
            )}
          </>
        ) : (
          <>
            <nav className="flex items-center space-x-1">
              <Link to="/dashboard" className="px-4 py-2 text-cafe-darkBrown hover:bg-cafe-lavender/20 rounded-lg">
                Dashboard
              </Link>
              <Link to="/orders" className="px-4 py-2 text-cafe-darkBrown hover:bg-cafe-lavender/20 rounded-lg">
                Orders
              </Link>
              <Link to="/menu" className="px-4 py-2 text-cafe-darkBrown hover:bg-cafe-lavender/20 rounded-lg">
                Menu
              </Link>
              <Link to="/customers" className="px-4 py-2 text-cafe-darkBrown hover:bg-cafe-lavender/20 rounded-lg">
                Customers
              </Link>
              <Link to="/reports" className="px-4 py-2 text-cafe-darkBrown hover:bg-cafe-lavender/20 rounded-lg">
                Reports
              </Link>
            </nav>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User className="h-5 w-5 text-cafe-brown" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem className="cursor-pointer" onClick={() => console.log("Logout clicked")}>
                  <LogOut className="h-4 w-4 mr-2" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
