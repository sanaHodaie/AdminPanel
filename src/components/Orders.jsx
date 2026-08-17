import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ShoppingBag,
  FileText,
  Search,
  CheckCircle2,
  Clock,
  Truck,
  Printer,
  Eye,
  Send,
  AlertCircle,
  Filter,
  ChevronDown,
  Hammer
} from 'lucide-react';
import { toPersianDigits, formatToman, formatGoldWeight } from '../utils/formatters';
import { playTactileClick, playSuccessChime } from '../utils/sound';

export default function Orders({ orders = [], onUpdateOrderStatus, onOpenInvoice }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredOrders = orders.filter((o) => {
    const matchStatus = statusFilter === 'all' || o.status === statusFilter;
    const matchSearch =
      o.customerName.includes(searchQuery) ||
      o.invoiceNumber.includes(searchQuery) ||
      o.productName.includes(searchQuery) ||
      o.customerPhone.includes(searchQuery);
    return matchStatus && matchSearch;
  });

  const handleStatusChange = (orderId, newStatus) => {
    playSuccessChime();
    let statusText = 'تحویل داده شده';
    if (newStatus === 'processing') statusText = 'در حال ساخت در کارگاه';
    if (newStatus === 'shipped') statusText = 'ارسال شده با بیمه ارزش بالا';

    onUpdateOrderStatus(orderId, newStatus, statusText);
  };

  return (
    <div className="space-y-6 pb-12 w-full max-w-full min-w-0 overflow-hidden">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-2 rounded-2xl bg-gradient-to-tr from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/20">
              <ShoppingBag className="w-5 h-5" />
            </span>
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white">
              مدیریت سفارشات و فاکتورهای رسمی
            </h1>
          </div>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400">
            صدور آنی فاکتور استاندارد اتحادیه، ثبت وضعیت ساخت در کارگاه و ارسال پستی با بیمه
          </p>
        </div>
      </div>

      {/* Styled Filter and Search Bar */}
      <div className="glass-panel rounded-3xl p-5 border border-purple-100 dark:border-purple-900/30 space-y-4 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5 items-center">
          <div className="sm:col-span-8 relative">
            <Search className="w-4 h-4 text-purple-500 absolute right-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="جستجو با نام مشتری، شماره فاکتور، تلفن یا محصول..."
              className="w-full pr-10 pl-4 py-2.5 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-purple-100 dark:border-purple-900/40 text-xs text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-xs transition-all"
            />
          </div>

          <div className="sm:col-span-4 relative">
            <div className="relative flex items-center">
              <span className="absolute right-3.5 top-3 text-purple-600 dark:text-purple-400 pointer-events-none">
                <Filter className="w-4 h-4" />
              </span>
              <select
                value={statusFilter}
                onChange={(e) => {
                  playTactileClick();
                  setStatusFilter(e.target.value);
                }}
                className="w-full pr-10 pl-9 py-2.5 rounded-2xl bg-gradient-to-r from-purple-50/90 to-pink-50/70 dark:from-slate-800 dark:to-purple-950/40 border border-purple-200 dark:border-purple-800/60 text-xs font-bold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm appearance-none cursor-pointer hover:border-purple-400 transition-all"
              >
                <option value="all">همه وضعیت‌های سفارش ({toPersianDigits(orders.length)})</option>
                <option value="processing">⚙️ در حال ساخت در کارگاه</option>
                <option value="shipped">📦 ارسال شده با بیمه</option>
                <option value="completed">✅ تحویل داده شده / تسویه کامل</option>
              </select>
              <ChevronDown className="w-4 h-4 text-purple-500 pointer-events-none absolute left-3 top-3.5" />
            </div>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="glass-panel rounded-3xl p-6 border border-purple-100 dark:border-purple-900/30 overflow-x-auto">
        <table className="w-full text-xs text-right">
          <thead>
            <tr className="text-slate-400 font-bold border-b border-slate-100 dark:border-slate-800">
              <th className="pb-3 pr-2">شماره فاکتور و تاریخ</th>
              <th className="pb-3">اطلاعات خریدار</th>
              <th className="pb-3">محصول و وزن طلا</th>
              <th className="pb-3 text-left">مبلغ کل فاکتور</th>
              <th className="pb-3 text-center">وضعیت سفارش</th>
              <th className="pb-3 text-left pl-2">عملیات و فاکتور</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
            {filteredOrders.map((order) => (
              <motion.tr
                key={order.id}
                whileHover={{ backgroundColor: 'rgba(168, 85, 247, 0.03)' }}
                className="transition-colors"
              >
                <td className="py-4 pr-2">
                  <div className="font-bold text-slate-800 dark:text-slate-100">
                    {order.invoiceNumber}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{order.date}</div>
                </td>

                <td className="py-4">
                  <div className="font-bold text-slate-800 dark:text-slate-200">
                    {order.customerName}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    {toPersianDigits(order.customerPhone)}
                  </div>
                </td>

                <td className="py-4">
                  <div className="font-bold text-slate-800 dark:text-slate-200">
                    {order.productName}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-0.5">
                    <span className="text-amber-600 dark:text-amber-400 font-semibold">
                      {formatGoldWeight(order.goldWeight)}
                    </span>
                    <span>•</span>
                    <span>{toPersianDigits(order.carat)} عیار</span>
                  </div>
                </td>

                <td className="py-4 text-left font-black text-slate-900 dark:text-white tabular-nums text-sm">
                  {formatToman(order.finalTotal)}
                </td>

                <td className="py-4 text-center">
                  <div className="relative inline-block w-48">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className={`w-full pr-8 pl-6 py-1.5 rounded-xl text-xs font-black border focus:outline-none appearance-none cursor-pointer shadow-xs transition-all ${
                        order.status === 'completed'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300 dark:bg-emerald-950/70 dark:text-emerald-300 dark:border-emerald-700 hover:border-emerald-400'
                          : order.status === 'processing'
                          ? 'bg-amber-50 text-amber-800 border-amber-300 dark:bg-amber-950/70 dark:text-amber-300 dark:border-amber-700 hover:border-amber-400'
                          : 'bg-purple-50 text-purple-800 border-purple-300 dark:bg-purple-950/70 dark:text-purple-300 dark:border-purple-700 hover:border-purple-400'
                      }`}
                    >
                      <option value="processing">⚙️ در حال ساخت در کارگاه</option>
                      <option value="shipped">📦 ارسال شده با بیمه</option>
                      <option value="completed">✅ تحویل داده شده</option>
                    </select>
                    <span className="absolute right-2.5 top-2 pointer-events-none">
                      {order.status === 'completed' ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      ) : order.status === 'processing' ? (
                        <Hammer className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                      ) : (
                        <Truck className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                      )}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 absolute left-2 top-2.5 text-slate-400 pointer-events-none" />
                  </div>
                </td>

                <td className="py-4 text-left pl-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      playTactileClick();
                      onOpenInvoice(order);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xs shadow-md shadow-purple-500/20 hover:opacity-95 transition-all cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    فاکتور رسمی
                  </motion.button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
