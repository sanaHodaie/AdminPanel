import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import GoldPrices from './components/GoldPrices';
import Products from './components/Products';
import Orders from './components/Orders';
import Messages from './components/Messages';
import Customers from './components/Customers';
import Analytics from './components/Analytics';
import Settings from './components/Settings';
import InvoiceModal from './components/InvoiceModal';
import NewProductModal from './components/NewProductModal';
import LoginModal from './components/LoginModal';

import {
  INITIAL_GOLD_RATES,
  INITIAL_PRODUCTS,
  INITIAL_ORDERS,
  INITIAL_MESSAGES,
  INITIAL_CUSTOMERS
} from './data/mockData';
import { playSuccessChime } from './utils/sound';

export default function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [rates, setRates] = useState(INITIAL_GOLD_RATES);
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [customers, setCustomers] = useState(INITIAL_CUSTOMERS);

  // Authentication State
  const [currentUser, setCurrentUser] = useState<{ username: string; name: string; role: string } | null>({
    username: 'admin_jouel',
    name: 'مدیریت ارشد گالری ژوئل',
    role: 'ادمین کل صنف طلا و جواهر'
  });
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Modals
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [isRefreshingRates, setIsRefreshingRates] = useState(false);
  const [themeMode, setThemeMode] = useState<'light' | 'dark' | 'auto'>(() => {
    try {
      const saved = localStorage.getItem('zarrin_theme_mode') as 'light' | 'dark' | 'auto';
      if (saved && ['light', 'dark', 'auto'].includes(saved)) return saved;
    } catch {
      // ignore
    }
    return 'auto';
  });

  // Automatic & Manual Dark / Light Mode
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    
    const applyTheme = () => {
      let isDark = false;
      if (themeMode === 'dark') {
        isDark = true;
      } else if (themeMode === 'light') {
        isDark = false;
      } else {
        isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      }

      if (isDark) {
        root.classList.add('dark');
        body.classList.add('dark');
      } else {
        root.classList.remove('dark');
        body.classList.remove('dark');
      }
    };

    applyTheme();

    try {
      localStorage.setItem('zarrin_theme_mode', themeMode);
    } catch {
      // ignore
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemChange = () => {
      if (themeMode === 'auto') applyTheme();
    };

    mediaQuery.addEventListener('change', handleSystemChange);
    return () => mediaQuery.removeEventListener('change', handleSystemChange);
  }, [themeMode]);

  // Toggle Theme between light, dark, auto
  const handleToggleTheme = () => {
    setThemeMode((prev) => {
      if (prev === 'light') return 'dark';
      if (prev === 'dark') return 'auto';
      return 'light';
    });
  };

  // Refresh live gold rates with slight realistic variations
  const handleRefreshRates = () => {
    setIsRefreshingRates(true);
    setTimeout(() => {
      setRates((prev) =>
        prev.map((r) => {
          const shift = (Math.random() - 0.45) * 5000;
          return {
            ...r,
            price: Math.max(1000, Math.round(r.price + shift)),
            updatedAt: 'همین الان'
          };
        })
      );
      setIsRefreshingRates(false);
      playSuccessChime();
    }, 600);
  };

  // Product management handlers
  const handleSaveProduct = (productData) => {
    setProducts((prev) => {
      const exists = prev.some((p) => p.id === productData.id);
      if (exists) {
        return prev.map((p) => (p.id === productData.id ? productData : p));
      }
      return [productData, ...prev];
    });
    setEditingProduct(null);
  };

  const handleDeleteProduct = (productId) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const handleOpenEditProduct = (product) => {
    setEditingProduct(product);
    setIsProductModalOpen(true);
  };

  // Order status updater
  const handleUpdateOrderStatus = (orderId, newStatus, statusText) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus, statusText } : o))
    );
  };

  // Chat message reply
  const handleSendMessage = (messageId, replyText) => {
    setMessages((prev) =>
      prev.map((m) => {
        if (m.id === messageId) {
          const now = new Date();
          const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
          return {
            ...m,
            unread: false,
            lastMessage: replyText,
            chatHistory: [
              ...m.chatHistory,
              { sender: 'admin', text: replyText, time: timeStr }
            ]
          };
        }
        return m;
      })
    );
  };

  const currentGold18k = rates.find((r) => r.id === 'gold_18k')?.price || 3685000;
  const unreadCount = messages.filter((m) => m.unread).length;

  const handleLoginSuccess = (user: { username: string; name: string; role: string }) => {
    setCurrentUser(user);
    setIsLoginModalOpen(false);
  };

  const handleLogout = () => {
    setIsLoginModalOpen(true);
  };

  return (
    <>
      <Layout
        activePage={activePage}
        onNavigate={setActivePage}
        rates={rates}
        onRefreshRates={handleRefreshRates}
        isRefreshingRates={isRefreshingRates}
        unreadCount={unreadCount}
        themeMode={themeMode}
        onToggleTheme={handleToggleTheme}
        currentUser={currentUser}
        onLogout={handleLogout}
        onOpenLogin={() => setIsLoginModalOpen(true)}
      >
        {activePage === 'dashboard' && (
          <Dashboard
            onNavigate={setActivePage}
            rates={rates}
            orders={orders}
            products={products}
            messages={messages}
            customers={customers}
            onOpenInvoice={(order) => setSelectedInvoiceOrder(order)}
            onOpenNewProduct={() => {
              setEditingProduct(null);
              setIsProductModalOpen(true);
            }}
          />
        )}

        {activePage === 'gold_rates' && (
          <GoldPrices
            rates={rates}
            onUpdateRates={setRates}
            onNavigate={setActivePage}
          />
        )}

        {activePage === 'products' && (
          <Products
            products={products}
            onAddProduct={() => {
              setEditingProduct(null);
              setIsProductModalOpen(true);
            }}
            onEditProduct={handleOpenEditProduct}
            onDeleteProduct={handleDeleteProduct}
            currentGoldPrice18k={currentGold18k}
          />
        )}

        {activePage === 'orders' && (
          <Orders
            orders={orders}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            onOpenInvoice={(order) => setSelectedInvoiceOrder(order)}
          />
        )}

        {activePage === 'messages' && (
          <Messages messages={messages} onSendMessage={handleSendMessage} />
        )}

        {activePage === 'customers' && (
          <Customers
            customers={customers}
            onAddCustomer={(newCust) => setCustomers((prev) => [newCust, ...prev])}
          />
        )}

        {activePage === 'analytics' && (
          <Analytics />
        )}

        {activePage === 'settings' && (
          <Settings
            themeMode={themeMode}
            onSetThemeMode={setThemeMode}
          />
        )}

        {/* Official Gold Invoice Modal */}
        {selectedInvoiceOrder && (
          <InvoiceModal
            order={selectedInvoiceOrder}
            onClose={() => setSelectedInvoiceOrder(null)}
          />
        )}

        {/* New / Edit Jewelry Product Modal */}
        {isProductModalOpen && (
          <NewProductModal
            isOpen={isProductModalOpen}
            onClose={() => {
              setIsProductModalOpen(false);
              setEditingProduct(null);
            }}
            onSave={handleSaveProduct}
            editingProduct={editingProduct}
            currentGoldPrice18k={currentGold18k}
          />
        )}
      </Layout>

      {/* Luxury 3D Golden Flakes Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onLoginSuccess={handleLoginSuccess}
        onClose={() => setIsLoginModalOpen(false)}
        themeMode={themeMode}
        onToggleTheme={handleToggleTheme}
      />
    </>
  );
}
