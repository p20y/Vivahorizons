import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';

const Success = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const { clearCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  const closeModalAndRedirect = () => {
    setIsModalOpen(false);
    navigate('/shop');
  };

  return (
    <>
      <Helmet>
        <title>Payment Successful - Midcentury Decor</title>
        <meta name="description" content="Thank you for your order. Your payment was successful." />
      </Helmet>
      
      <div className="bg-gray-100 min-h-[70vh] flex items-center justify-center p-4">
        <p className="text-gray-500">Redirecting after successful payment...</p>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
            onClick={closeModalAndRedirect}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-white rounded-2xl shadow-2xl max-w-lg w-full text-center p-8 sm:p-12 relative"
              onClick={e => e.stopPropagation()}
            >
               <Button onClick={closeModalAndRedirect} variant="ghost" size="icon" className="absolute top-4 right-4 text-gray-400 hover:bg-gray-100 hover:text-gray-600 rounded-full">
                <X size={24} />
              </Button>

              <motion.h1 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-3xl md:text-4xl font-light tracking-tight text-gray-900 mb-4"
              >
                Thank you for your order!
              </motion.h1>
    
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-gray-600 mb-8"
              >
                Your payment was successful and your order is being processed. You will receive a confirmation email shortly.
              </motion.p>
    
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <Button onClick={closeModalAndRedirect} className="bg-gray-900 text-white hover:bg-gray-800 rounded-full px-8 py-6 text-base w-full sm:w-auto">
                  Continue Shopping
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Success;