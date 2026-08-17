import React from 'react';
import { motion } from 'motion/react';
import {
  TrendingUp,
  TrendingDown,
  ShoppingBag,
  Coins,
  Gem,
  MessageSquare,
  Users,
  ArrowUpRight,
  ArrowLeft,
  Sparkles,
  PlusCircle,
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  Eye,
  Zap,
  Scale,
  DollarSign,
  Package,
  Download,
  ShieldCheck,
  ChevronLeft
} from 'lucide-react';
import { toPersianDigits, formatToman, formatGoldWeight, formatPercent, getTodayJalali } from '../utils/formatters';
import { playTactileClick } from '../utils/sound';
import AnimatedCounter from './AnimatedCounter';
import { AnimatedAreaChart, AnimatedDonutChart } from './AnimatedChart';
import { CHART_REVENUE_DATA, CHART_CATEGORY_SHARE } from '../data/mockData';

export default function Dashboard({
  onNavigate,
  rates = [],
  orders = [],
  products = [],
  messages = [],
  customers = [],
  onOpenInvoice,
  onOpenNewProduct
}) {
  const gold18k = rates.find((r) => r.id === 'gold_18k')?.price || 3685000;
  const gold24k = rates.find((r) => r.id === 'gold_24k')?.price || 4913000;
  const coinEmami = rates.find((r) => r.id === 'coin_emami')?.price || 43850000;
  const silverGram = rates.find((r) => r.id === 'silver_999')?.price || 64500;

  // Aggregate metrics
  const totalRevenueToday = 148500000;
  const totalGoldGramsToday = 40.25;
  const netProfitToday = 19200000;
  const unreadMessagesCount = messages.filter((m) => m.unread).length;
  const activeOrdersCount = orders.filter((o) => o.status !== 'completed').length;

  return (
    <div className="space-y-6 pb-12 w-full max-w-full min-w-0 overflow-hidden">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
              {getTodayJalali()}
            </span>
            <span className="text-xs text-slate-400">| وضعیت بازار: فعال و زنده</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white">
            داشبورد اصلی گالری لوکس ژوئل
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            نمای جامع و یکپارچه در ساختار Bento Grid
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              playTactileClick();
              if (onOpenNewProduct) onOpenNewProduct();
            }}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold shadow-lg shadow-purple-500/20 hover:from-purple-700 hover:to-pink-700 transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            افزودن محصول جدید
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              playTactileClick();
              onNavigate('gold_rates');
            }}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-bold hover:border-purple-300 transition-all shadow-xs"
          >
            <Coins className="w-4 h-4 text-amber-500" />
            تابلو مظنه زنده
          </motion.button>
        </div>
      </div>

      {/* Main Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Bento Cell 1: Live Prices Card (Col 1, Large Widget) */}
        <motion.div
          whileHover={{ y: -3 }}
          onClick={() => {
            playTactileClick();
            onNavigate('gold_rates');
          }}
          className="bento-card p-5 flex flex-col justify-between cursor-pointer group hover:border-purple-300 dark:hover:border-purple-700 transition-all"
        >
          <div>
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-purple-50 dark:border-purple-900/40">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400">
                  <Coins className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-800 dark:text-white text-sm">قیمت‌های لحظه‌ای</h3>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-300 font-bold">
                زنده
              </span>
            </div>

            <div className="space-y-2.5">
              <div className="flex justify-between items-center p-2.5 rounded-2xl bg-white/60 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <span className="text-xs text-slate-500 dark:text-slate-400">طلای ۱۸ عیار</span>
                <span className="font-bold text-xs text-pink-600 dark:text-pink-400 tabular-nums">
                  {formatToman(gold18k)}
                </span>
              </div>

              <div className="flex justify-between items-center p-2.5 rounded-2xl bg-white/60 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <span className="text-xs text-slate-500 dark:text-slate-400">طلای ۲۴ عیار</span>
                <span className="font-bold text-xs text-purple-600 dark:text-purple-400 tabular-nums">
                  {formatToman(gold24k)}
                </span>
              </div>

              <div className="flex justify-between items-center p-2.5 rounded-2xl bg-white/60 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <span className="text-xs text-slate-500 dark:text-slate-400">سکه امامی</span>
                <span className="font-bold text-xs text-pink-600 dark:text-pink-400 tabular-nums">
                  {formatToman(coinEmami)}
                </span>
              </div>

              <div className="flex justify-between items-center p-2.5 rounded-2xl bg-white/60 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <span className="text-xs text-slate-500 dark:text-slate-400">نقره ۹۹۹ (گرم)</span>
                <span className="font-bold text-xs text-slate-700 dark:text-slate-200 tabular-nums">
                  {formatToman(silverGram)}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <span>محاسبه خودکار حباب و مظنه</span>
            <span className="text-purple-600 dark:text-purple-400 font-bold group-hover:translate-x-[-3px] transition-transform flex items-center gap-0.5">
              مشاهده تابلو
              <ChevronLeft className="w-3 h-3" />
            </span>
          </div>
        </motion.div>

        {/* Bento Cell 2: Main Sales Chart (Col 2-3, 2-column wide Bento Card) */}
        <motion.div
          whileHover={{ y: -3 }}
          className="bento-card p-6 md:col-span-2 flex flex-col justify-between relative overflow-hidden"
        >
          <div className="flex justify-between items-center mb-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse" />
                <h3 className="font-extrabold text-slate-800 dark:text-white text-base">
                  آمار فروش و گردش مالی جواهرات
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">روند فروش هفتگی گالری با انیمیشن پیوسته گرادیان</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 text-xs font-bold">
                +۱۲.۵٪ رشد
              </span>
            </div>
          </div>

          {/* Area Line Chart with Gradient */}
          <div className="py-2">
            <AnimatedAreaChart
              data={CHART_REVENUE_DATA}
              dataKey="revenue"
              xKey="day"
              height={180}
              unit="تومان"
              colorScheme="purple-pink"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
            <span>مجموع فروش دوره: {formatToman(605000000)}</span>
            <button
              onClick={() => {
                playTactileClick();
                onNavigate('analytics');
              }}
              className="text-purple-600 dark:text-purple-400 font-bold hover:underline flex items-center gap-1"
            >
              گزارش تفصیلی
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>

        {/* Bento Cell 3: Quick Stats Stack (Col 4) */}
        <div className="space-y-4 flex flex-col justify-between">
          {/* Top Gradient Metric Card */}
          <motion.div
            whileHover={{ y: -3, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              playTactileClick();
              onNavigate('analytics');
            }}
            className="bg-gradient-to-br from-purple-600 via-fuchsia-600 to-pink-500 rounded-3xl p-5 text-white shadow-lg shadow-purple-500/20 relative overflow-hidden cursor-pointer flex-1 flex flex-col justify-between"
          >
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-1 opacity-90">
                <span className="text-xs font-medium">مجموع درآمد روز</span>
                <Sparkles className="w-4 h-4 text-amber-300" />
              </div>
              <h4 className="text-2xl font-black tabular-nums tracking-tight">
                <AnimatedCounter value={totalRevenueToday} suffix=" تومان" />
              </h4>
              <p className="text-[10px] mt-2 bg-white/20 inline-block px-2.5 py-0.5 rounded-full font-bold">
                +۱۴.۸٪ افزایش نسبت به میانگین
              </p>
            </div>
            <div className="text-[10px] text-white/80 mt-3 pt-2 border-t border-white/20 flex items-center justify-between">
              <span>سود خالص: {formatToman(netProfitToday)}</span>
              <span>مشاهده آمار</span>
            </div>
          </motion.div>

          {/* Bottom Active Orders Card */}
          <motion.div
            whileHover={{ y: -3 }}
            onClick={() => {
              playTactileClick();
              onNavigate('orders');
            }}
            className="bento-card p-5 cursor-pointer hover:border-purple-300 dark:hover:border-purple-700 transition-all flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-400 font-bold">سفارشات نیازمند اقدام</span>
              <span className="p-2 rounded-xl bg-pink-50 dark:bg-pink-950/40 text-pink-600 dark:text-pink-400">
                <ShoppingBag className="w-4 h-4" />
              </span>
            </div>
            <div className="text-2xl font-black text-slate-800 dark:text-white mb-2 tabular-nums">
              <AnimatedCounter value={activeOrdersCount} suffix=" سفارش" />
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
              <span>در حال ساخت در کارگاه</span>
              <span className="text-purple-600 dark:text-purple-400 font-bold">فاکتورها</span>
            </div>
          </motion.div>
        </div>

        {/* Bento Cell 4: Recent Messages (Col 1-2, 2-column wide) */}
        <div className="bento-card p-5 md:col-span-2 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-3 pb-2 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400">
                <MessageSquare className="w-4 h-4" />
              </span>
              <h3 className="font-bold text-slate-800 dark:text-white text-sm">آخرین پیام‌ها و مشاوره‌ها</h3>
            </div>
            <button
              onClick={() => {
                playTactileClick();
                onNavigate('messages');
              }}
              className="text-[11px] text-purple-600 dark:text-purple-400 font-bold hover:underline flex items-center gap-0.5"
            >
              مشاهده همه
              <ChevronLeft className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-2.5">
            {messages.slice(0, 2).map((msg) => (
              <motion.div
                key={msg.id}
                whileHover={{ scale: 1.01 }}
                onClick={() => {
                  playTactileClick();
                  onNavigate('messages');
                }}
                className="flex items-center gap-3 p-2.5 hover:bg-purple-50/50 dark:hover:bg-slate-800/50 rounded-2xl transition-colors cursor-pointer border border-transparent hover:border-purple-100 dark:hover:border-purple-900/40"
              >
                <img
                  src={msg.avatar}
                  alt={msg.customerName}
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full object-cover border border-purple-200 dark:border-purple-800"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{msg.customerName}</p>
                    <span className="text-[10px] text-slate-400">{msg.time}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                    {msg.lastMessage}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bento Cell 5: Inventory Highlights (Col 3) */}
        <div className="bento-card p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100 dark:border-slate-800">
            <h3 className="font-bold text-slate-800 dark:text-white text-sm">موجودی ویترین</h3>
            <span className="p-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600">
              <Gem className="w-3.5 h-3.5" />
            </span>
          </div>

          <div className="space-y-3.5">
            <div>
              <div className="flex justify-between text-[11px] text-slate-500 mb-1">
                <span>جواهرات و الماس</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">۸۵٪ پر</span>
              </div>
              <div className="relative h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="absolute right-0 h-full w-[85%] bg-gradient-to-l from-purple-500 to-pink-500 rounded-full" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[11px] text-slate-500 mb-1">
                <span>النگو و دستبند طلا</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">۶۲٪ پر</span>
              </div>
              <div className="relative h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="absolute right-0 h-full w-[62%] bg-gradient-to-l from-pink-500 to-amber-400 rounded-full" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[11px] text-slate-500 mb-1">
                <span>شمش و سکه سرمایه‌گذاری</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">۴۰٪ پر</span>
              </div>
              <div className="relative h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="absolute right-0 h-full w-[40%] bg-gradient-to-l from-amber-400 to-yellow-300 rounded-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Bento Cell 6: Action Center (Col 4) */}
        <div className="bento-card p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100 dark:border-slate-800">
            <h3 className="font-bold text-slate-800 dark:text-white text-sm">عملیات سریع</h3>
            <Zap className="w-4 h-4 text-amber-500" />
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={() => {
                playTactileClick();
                if (onOpenNewProduct) onOpenNewProduct();
              }}
              className="flex flex-col items-center justify-center p-3 bg-purple-50 dark:bg-purple-950/40 hover:bg-purple-100 dark:hover:bg-purple-900/50 rounded-2xl transition-all group border border-purple-100 dark:border-purple-900/40"
            >
              <PlusCircle className="w-5 h-5 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform" />
              <span className="text-[11px] mt-1.5 text-purple-700 dark:text-purple-300 font-bold">طلا جدید</span>
            </button>

            <button
              onClick={() => {
                playTactileClick();
                onNavigate('orders');
              }}
              className="flex flex-col items-center justify-center p-3 bg-pink-50 dark:bg-pink-950/40 hover:bg-pink-100 dark:hover:bg-pink-900/50 rounded-2xl transition-all group border border-pink-100 dark:border-pink-900/40"
            >
              <FileText className="w-5 h-5 text-pink-600 dark:text-pink-400 group-hover:scale-110 transition-transform" />
              <span className="text-[11px] mt-1.5 text-pink-700 dark:text-pink-300 font-bold">فاکتور رسمی</span>
            </button>

            <button
              onClick={() => {
                playTactileClick();
                onNavigate('gold_rates');
              }}
              className="flex flex-col items-center justify-center p-3 bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/50 rounded-2xl transition-all group border border-amber-100 dark:border-amber-900/40"
            >
              <Scale className="w-5 h-5 text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform" />
              <span className="text-[11px] mt-1.5 text-amber-700 dark:text-amber-300 font-bold">ماشین‌حساب</span>
            </button>

            <button
              onClick={() => {
                playTactileClick();
                onNavigate('customers');
              }}
              className="flex flex-col items-center justify-center p-3 bg-violet-50 dark:bg-violet-950/40 hover:bg-violet-100 dark:hover:bg-violet-900/50 rounded-2xl transition-all group border border-violet-100 dark:border-violet-900/40"
            >
              <Users className="w-5 h-5 text-violet-600 dark:text-violet-400 group-hover:scale-110 transition-transform" />
              <span className="text-[11px] mt-1.5 text-violet-700 dark:text-violet-300 font-bold">باشگاه VIP</span>
            </button>
          </div>
        </div>

      </div>

      {/* Secondary Bento Row: Recent Orders & Top Jewelry Items */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Recent Orders with Quick Official Invoice Viewer (7 Cols) */}
        <div className="lg:col-span-7 bento-card p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
                <ShoppingBag className="w-4 h-4" />
              </span>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  آخرین سفارشات و خریدهای ثبت شده
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  مشاهده آنی، وضعیت کارگاه و صدور فاکتور رسمی اتحادیه
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                playTactileClick();
                onNavigate('orders');
              }}
              className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1"
            >
              همه سفارشات ({toPersianDigits(orders.length)})
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Orders List */}
          <div className="space-y-3">
            {orders.slice(0, 3).map((order) => (
              <motion.div
                key={order.id}
                whileHover={{ scale: 1.01 }}
                className="p-3.5 rounded-2xl bg-white/60 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 hover:border-purple-200 dark:hover:border-purple-800 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-500/20 to-pink-500/20 flex items-center justify-center text-purple-700 dark:text-purple-300 font-black">
                    <Gem className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-800 dark:text-slate-100 text-sm">
                      {order.customerName}
                    </div>
                    <div className="text-slate-500 dark:text-slate-400 text-[11px] flex items-center gap-2 mt-0.5">
                      <span>{order.productName}</span>
                      <span>•</span>
                      <span className="font-semibold text-amber-600 dark:text-amber-400">
                        {formatGoldWeight(order.goldWeight)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
                  <div className="text-left sm:text-right">
                    <div className="font-black text-slate-900 dark:text-white tabular-nums text-xs">
                      {formatToman(order.finalTotal)}
                    </div>
                    <span
                      className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        order.status === 'completed'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                          : order.status === 'processing'
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                          : 'bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300'
                      }`}
                    >
                      {order.statusText}
                    </span>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      playTactileClick();
                      onOpenInvoice(order);
                    }}
                    className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-300 hover:bg-purple-600 hover:text-white transition-colors"
                    title="مشاهده فاکتور رسمی"
                  >
                    <Eye className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Featured Showcase Jewelry Products (5 Cols) */}
        <div className="lg:col-span-5 bento-card p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-pink-500/10 text-pink-600 dark:text-pink-400">
                <Gem className="w-4 h-4" />
              </span>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  ویترین زرین
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  قیمت‌گذاری خودکار با مظنه زنده
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                playTactileClick();
                onNavigate('products');
              }}
              className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1"
            >
              همه کالاها
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2.5">
            {products.slice(0, 3).map((product) => {
              const rawGold = product.weight * (gold18k * (product.carat / 18));
              const ojrat = rawGold * (product.ojratPercent / 100);
              const profit = (rawGold + ojrat) * 0.07;
              const tax = (ojrat + profit) * 0.09;
              const livePrice = rawGold + ojrat + profit + tax + (product.stonePrice || 0);

              return (
                <motion.div
                  key={product.id}
                  whileHover={{ scale: 1.01 }}
                  onClick={() => {
                    playTactileClick();
                    onNavigate('products');
                  }}
                  className="flex items-center gap-3 p-2.5 rounded-2xl bg-white/60 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 hover:border-pink-200 dark:hover:border-pink-900/50 transition-all cursor-pointer group"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-11 h-11 rounded-xl object-cover border border-purple-100 dark:border-purple-900/40 group-hover:scale-105 transition-transform"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">
                      {product.name}
                    </h4>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-2 mt-0.5">
                      <span>{product.categoryName}</span>
                      <span>•</span>
                      <span className="font-semibold text-amber-600 dark:text-amber-400">
                        {formatGoldWeight(product.weight)}
                      </span>
                    </div>
                  </div>

                  <div className="text-left font-black text-xs text-purple-700 dark:text-pink-400 tabular-nums">
                    {formatToman(livePrice)}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

