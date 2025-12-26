import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart as ShoppingCartIcon, X, Plus, Minus } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
import { initializeCheckout } from '@/api/EcommerceApi';
import { useToast } from '@/components/ui/use-toast';

const ShoppingCart = ({ isCartOpen, setIsCartOpen }) => {
  const { toast } = useToast();
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();

  const handleCheckout = useCallback(async () => {
    if (cartItems.length === 0) {
      toast({
        title: 'Your cart is empty',
        description: 'Add some products to your cart before checking out.',
        variant: 'destructive',
      });
      return;
    }

    try {
      const items = cartItems.map(item => ({
        variant_id: item.variant.id,
        quantity: item.quantity,
      }));

      const successUrl = `${window.location.origin}/success`;
      const cancelUrl = window.location.href;

      const { url } = await initializeCheckout({ items, successUrl, cancelUrl });
      
      // We don't clear the cart here anymore. It will be cleared on the success page.
      window.location.href = url;
    } catch (error) {
      toast({
        title: 'Checkout error',
        description: error.message || 'There was a problem initializing checkout. Please try again.',
        variant: 'destructive',
      });
    }
  }, [cartItems, toast]);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 z-50"
          onClick={() => setIsCartOpen(false)}
        >
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-light text-gray-900">Shopping cart</h2>
              <Button onClick={() => setIsCartOpen(false)} variant="ghost" size="icon" className="text-gray-600 hover:bg-gray-100">
                <X />
              </Button>
            </div>
            <div className="flex-grow p-6 overflow-y-auto space-y-4">
              {cartItems.length === 0 ? (
                <div className="text-center text-gray-500 h-full flex flex-col items-center justify-center">
                  <ShoppingCartIcon size={48} className="mb-4 text-gray-400" />
                  <p>Your cart is empty.</p>
                  <Button asChild variant="link" className="mt-4" onClick={() => setIsCartOpen(false)}>
                    <Link to="/shop">Continue shopping</Link>
                  </Button>
                </div>
              ) : (
                cartItems.map(item => (
                  <div key={item.variant.id} className="flex items-start gap-4 p-3 rounded-lg border border-gray-100">
                    <img src={item.product.image} alt={item.product.title} className="w-20 h-20 object-cover rounded-md" />
                    <div className="flex-grow">
                      <h3 className="font-medium text-gray-900">{item.product.title}</h3>
                      {item.variant.title && <p className="text-sm text-gray-500">{item.variant.title}</p>}
                      <p className="text-sm text-gray-900 font-medium mt-1">
                        {item.variant.sale_price_formatted || item.variant.price_formatted}
                      </p>
                       <div className="flex items-center border border-gray-200 rounded-full mt-3 w-fit">
                        <Button onClick={() => updateQuantity(item.variant.id, item.quantity - 1)} size="icon" variant="ghost" className="h-8 w-8 rounded-full text-gray-600 hover:bg-gray-100"><Minus size={14} /></Button>
                        <span className="px-2 text-gray-900 text-sm font-medium">{item.quantity}</span>
                        <Button onClick={() => updateQuantity(item.variant.id, item.quantity + 1)} size="icon" variant="ghost" className="h-8 w-8 rounded-full text-gray-600 hover:bg-gray-100"><Plus size={14} /></Button>
                      </div>
                    </div>
                     <Button onClick={() => removeFromCart(item.variant.id)} size="icon" variant="ghost" className="text-gray-400 hover:text-red-500 hover:bg-red-50 h-8 w-8 rounded-full">
                       <X size={16} />
                     </Button>
                  </div>
                ))
              )}
            </div>
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-gray-200 pb-[80px]">
                <div className="flex justify-between items-center mb-4 text-gray-900">
                  <span className="text-lg font-medium">Subtotal</span>
                  <span className="text-2xl font-medium">{getCartTotal()}</span>
                </div>
                <Button onClick={handleCheckout} className="w-full bg-gray-900 text-white hover:bg-gray-800 rounded-full py-6 text-base">
                  Proceed to checkout
                </Button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ShoppingCart;