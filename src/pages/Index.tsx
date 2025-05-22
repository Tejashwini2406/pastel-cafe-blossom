
import React from 'react';
import { Link } from 'react-router-dom';
import { Coffee, CirclePlus, PanelLeftOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-cafe-lavender/20 shadow-sm py-4">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center">
            <Coffee className="h-8 w-8 text-cafe-brown mr-2" />
            <span className="font-playfair text-2xl font-bold text-cafe-brown">CaféSystem</span>
          </div>
        </div>
      </header>

      <main className="flex-grow bg-gradient-to-b from-cafe-cream to-cafe-lavender/20">
        <div className="container mx-auto px-6 py-12 md:py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-cafe-darkBrown mb-6 leading-tight">
              Café Order System
            </h1>
            <p className="text-lg md:text-xl text-cafe-brown/90 mb-8 md:mb-10 leading-relaxed">
              An elegant and efficient order management system for your café.
              Handle orders, manage your menu, and track customer preferences with ease.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/dashboard">
                <Button className="cafe-button-primary text-base py-6 px-8 rounded-full w-full sm:w-auto">
                  <PanelLeftOpen className="h-5 w-5 mr-2" />
                  Dashboard
                </Button>
              </Link>
              <Link to="/menu">
                <Button className="cafe-button-secondary text-base py-6 px-8 rounded-full w-full sm:w-auto">
                  <CirclePlus className="h-5 w-5 mr-2" />
                  Manage Menu
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="mt-16 md:mt-24">
            <div className="bg-white rounded-2xl shadow-lg border border-cafe-lavender/20 p-6 md:p-10 max-w-5xl mx-auto">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="cafe-card text-center">
                  <div className="bg-cafe-lavender/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Coffee className="h-8 w-8 text-cafe-darkBrown" />
                  </div>
                  <h3 className="font-playfair text-xl font-semibold mb-3">Order Management</h3>
                  <p className="text-cafe-brown/80">Process and track orders efficiently with real-time updates.</p>
                </div>
                
                <div className="cafe-card text-center">
                  <div className="bg-cafe-mint/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-cafe-darkBrown">
                      <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z"></path>
                      <line x1="6" y1="17" x2="18" y2="17"></line>
                    </svg>
                  </div>
                  <h3 className="font-playfair text-xl font-semibold mb-3">Menu Management</h3>
                  <p className="text-cafe-brown/80">Easily update your menu items, prices, and availability.</p>
                </div>
                
                <div className="cafe-card text-center">
                  <div className="bg-cafe-pink/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-cafe-darkBrown">
                      <path d="M17 18c.5 0 1-.1 1.4-.4l2.9 2.9c.2.2.5.2.7 0s.2-.5 0-.7l-2.9-2.9c.3-.4.4-.9.4-1.4 0-1.7-1.3-3-3-3s-3 1.3-3 3 1.3 3 3.5 3z"></path>
                      <path d="M3 10h11"></path>
                      <path d="M3 6h11"></path>
                      <path d="M3 14h8"></path>
                      <path d="M3 18h8"></path>
                    </svg>
                  </div>
                  <h3 className="font-playfair text-xl font-semibold mb-3">Customer Insights</h3>
                  <p className="text-cafe-brown/80">Track customer preferences and order history.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-cafe-cream border-t border-cafe-lavender/20 py-6">
        <div className="container mx-auto px-6 text-center text-cafe-brown/70">
          <p>© 2025 CaféSystem. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
