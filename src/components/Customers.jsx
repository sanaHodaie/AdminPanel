import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Users,
  Award,
  Crown,
  Search,
  Plus,
  Coins,
  Wallet,
  Sparkles,
  ShoppingBag,
  Star,
  ChevronLeft
} from 'lucide-react';
import { toPersianDigits, formatToman, formatGoldWeight } from '../utils/formatters';
import { playTactileClick, playSuccessChime } from '../utils/sound';

export default function Customers({ customers = [], onAddCustomer = null }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [tierFilter, setTierFilter] = useState('all');

  const filteredCustomers = customers.filter((c) => {
    const matchTier = tierFilter === 'all' || c.tier === tierFilter;
    const matchSearch = c.name.includes(searchQuery) || c.phone.includes(searchQuery);
    return matchTier && matchSearch;
  });

  const totalGoldVault = customers.reduce((acc, c) => acc + (c.goldWalletBalance || 0), 0);

  return (
    <div className="space-y-6 pb-12 w-full max-w-full min-w-0 overflow-hidden">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-2 rounded-2xl bg-gradient-to-tr from-amber-500 to-purple-600 text-white shadow-lg shadow-purple-500/20">
              <Crown className="w-5 h-5" />
            </span>
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white">
              باشگاه مشتریان و کیف پول طلایی
            </h1>
          </div>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400">
            مجموع موجودی طلای پس‌انداز شده در کیف پول مشتریان: {formatGoldWeight(totalGoldVault)}
          </p>
        </div>
      </div>

      {/* Top Loyalty Tier Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-panel rounded-3xl p-5 border border-purple-200/80 dark:border-purple-900/40 relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
              اعضای سطح الماس (Diamond VIP)
            </span>
            <span className="p-2 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
              <Crown className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white mb-1">
            {toPersianDigits(customers.filter((c) => c.tier === 'diamond').length)} نفر
          </div>
          <p className="text-[11px] text-slate-400">خرید بالای ۴۰۰ میلیون تومان یا ۱۰۰ گرم طلا</p>
        </div>

        <div className="glass-panel rounded-3xl p-5 border border-purple-200/80 dark:border-purple-900/40 relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
              اعضای سطح پلاتینیوم
            </span>
            <span className="p-2 rounded-xl bg-pink-500/10 text-pink-600 dark:text-pink-400">
              <Award className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white mb-1">
            {toPersianDigits(customers.filter((c) => c.tier === 'platinum').length)} نفر
          </div>
          <p className="text-[11px] text-slate-400">۳٪ تخفیف در اجرت ساخت + نگین رایگان</p>
        </div>

        <div className="glass-panel rounded-3xl p-5 border border-purple-200/80 dark:border-purple-900/40 relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
              اعضای طلایی (Gold Members)
            </span>
            <span className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Star className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white mb-1">
            {toPersianDigits(customers.filter((c) => c.tier === 'gold').length)} نفر
          </div>
          <p className="text-[11px] text-slate-400">امکان تبدیل امتیاز به طلای آب‌شده</p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="glass-panel rounded-3xl p-5 border border-purple-100 dark:border-purple-900/30 space-y-4 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5 items-center">
          <div className="sm:col-span-8 relative">
            <Search className="w-4 h-4 text-purple-500 absolute right-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="جستجوی نام مشتری، شماره تلفن همراه..."
              className="w-full pr-10 pl-4 py-2.5 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-purple-100 dark:border-purple-900/40 text-xs text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-xs transition-all"
            />
          </div>

          <div className="sm:col-span-4 relative">
            <div className="relative flex items-center">
              <span className="absolute right-3.5 top-3 text-purple-600 dark:text-purple-400 pointer-events-none">
                <Crown className="w-4 h-4" />
              </span>
              <select
                value={tierFilter}
                onChange={(e) => {
                  playTactileClick();
                  setTierFilter(e.target.value);
                }}
                className="w-full pr-10 pl-9 py-2.5 rounded-2xl bg-gradient-to-r from-purple-50/90 to-pink-50/70 dark:from-slate-800 dark:to-purple-950/40 border border-purple-200 dark:border-purple-800/60 text-xs font-bold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm appearance-none cursor-pointer hover:border-purple-400 transition-all"
              >
                <option value="all">همه سطوح باشگاه ({toPersianDigits(customers.length)})</option>
                <option value="diamond">👑 سطح الماس VIP (Diamond)</option>
                <option value="platinum">💎 سطح پلاتینیوم (Platinum)</option>
                <option value="gold">⭐ سطح طلایی (Gold)</option>
              </select>
              <ChevronLeft className="w-4 h-4 text-purple-500 pointer-events-none absolute left-3 top-3.5 -rotate-90" />
            </div>
          </div>
        </div>
      </div>

      {/* Customers Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {filteredCustomers.map((customer) => (
          <motion.div
            key={customer.id}
            whileHover={{ y: -4 }}
            className="glass-panel glass-card-hover rounded-3xl p-5 border border-purple-100/80 dark:border-purple-900/30 space-y-4 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${customer.avatarColor} flex items-center justify-center text-white font-black text-base shadow-md`}
                >
                  {customer.name.charAt(0)}
                </div>

                <span
                  className={`text-[11px] font-bold px-2.5 py-1 rounded-xl ${
                    customer.tier === 'diamond'
                      ? 'bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300'
                      : customer.tier === 'platinum'
                      ? 'bg-pink-100 text-pink-700 dark:bg-pink-950/60 dark:text-pink-300'
                      : 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
                  }`}
                >
                  {customer.tierName}
                </span>
              </div>

              <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                {customer.name}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">{toPersianDigits(customer.phone)}</p>
            </div>

            {/* Stats */}
            <div className="space-y-2 text-xs pt-3 border-t border-slate-100 dark:border-slate-800/80">
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>مجموع خریدها:</span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {formatToman(customer.totalPurchases)}
                </span>
              </div>

              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>گردش وزنی طلا:</span>
                <span className="font-semibold text-amber-600 dark:text-amber-400">
                  {formatGoldWeight(customer.goldTurnoverGrams)}
                </span>
              </div>

              <div className="flex justify-between items-center p-2 rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/40 text-purple-800 dark:text-purple-300">
                <span className="flex items-center gap-1">
                  <Wallet className="w-3.5 h-3.5 text-purple-600" />
                  کیف پول طلایی:
                </span>
                <span className="font-bold">{formatGoldWeight(customer.goldWalletBalance)}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
