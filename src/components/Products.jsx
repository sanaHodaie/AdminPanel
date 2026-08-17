import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Gem,
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  Eye,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Scale,
  DollarSign,
  Tag,
  Layers,
  ArrowUpDown
} from 'lucide-react';
import { toPersianDigits, formatToman, formatGoldWeight } from '../utils/formatters';
import { playTactileClick, playSuccessChime } from '../utils/sound';

export default function Products({
  products = [],
  onAddProduct,
  onEditProduct,
  onDeleteProduct,
  currentGoldPrice18k = 3685000
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest'); // newest | weight_desc | weight_asc | sales

  const categories = [
    { id: 'all', name: 'همه ویترین' },
    { id: 'necklace', name: 'گردنبند' },
    { id: 'ring', name: 'انگشتر' },
    { id: 'bracelet', name: 'دستبند' },
    { id: 'earrings', name: 'گوشواره' },
    { id: 'set', name: 'سرویس طلا' },
    { id: 'bangle', name: 'النگو' },
    { id: 'bar', name: 'شمش خالص' },
    { id: 'anklet', name: 'پابند' }
  ];

  // Filter & Search logic
  const filteredProducts = products
    .filter((p) => {
      const matchCat = selectedCategory === 'all' || p.category === selectedCategory;
      const matchStatus = statusFilter === 'all' || p.status === statusFilter;
      const matchSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.stoneType.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchStatus && matchSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'weight_desc') return b.weight - a.weight;
      if (sortBy === 'weight_asc') return a.weight - b.weight;
      if (sortBy === 'sales') return b.salesCount - a.salesCount;
      return 0; // default
    });

  // Calculate total inventory weight
  const totalStockGrams = products.reduce((acc, p) => acc + p.weight * p.stock, 0);

  return (
    <div className="space-y-6 pb-12 w-full max-w-full min-w-0 overflow-hidden">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-2 rounded-2xl bg-gradient-to-tr from-pink-500 to-purple-600 text-white shadow-lg shadow-purple-500/20">
              <Gem className="w-5 h-5" />
            </span>
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white">
              ویترین و موجودی طلا و جواهرات
            </h1>
          </div>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400">
            مجموع موجودی طلای خالص در ویترین: {formatGoldWeight(totalStockGrams)} (
            {toPersianDigits(products.length)} قلم کالا)
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => {
            playTactileClick();
            onAddProduct();
          }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 text-white font-bold text-xs shadow-lg shadow-purple-500/25 hover:opacity-95 transition-all"
        >
          <Plus className="w-4 h-4" />
          افزودن طلا / جواهر جدید
        </motion.button>
      </div>

      {/* Filter and Search Bar Glass Panel */}
      <div className="glass-panel rounded-3xl p-5 border border-purple-100 dark:border-purple-900/30 space-y-4">
        {/* Categories Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                playTactileClick();
                setSelectedCategory(cat.id);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20'
                  : 'bg-white/60 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-purple-300'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Search, Status & Sort Row */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="جستجو بر اساس نام محصول، کد SKU، سنگ و الماس..."
              className="w-full pr-10 pl-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="sm:col-span-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">همه وضعیت‌ها</option>
              <option value="available">موجود در ویترین</option>
              <option value="out_of_stock">ناموجود / سفارشی</option>
            </select>
          </div>

          <div className="sm:col-span-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="newest">جدیدترین محصولات</option>
              <option value="weight_desc">بیشترین وزن طلا</option>
              <option value="weight_asc">کمترین وزن طلا</option>
              <option value="sales">پرفروش‌ترین‌ها</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredProducts.map((product) => {
          // Calculate live estimated price
          const rawGold = product.weight * (currentGoldPrice18k * (product.carat / 18));
          const ojrat = rawGold * (product.ojratPercent / 100);
          const profit = (rawGold + ojrat) * 0.07;
          const tax = (ojrat + profit) * 0.09;
          const livePrice = rawGold + ojrat + profit + tax + (product.stonePrice || 0);

          return (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -5 }}
              className="glass-panel glass-card-hover rounded-3xl overflow-hidden border border-purple-100/80 dark:border-purple-900/30 flex flex-col justify-between group"
            >
              {/* Product Image Box */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                <img
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Badges Overlay */}
                <div className="absolute top-3 right-3 flex flex-col gap-1.5">
                  <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-lg bg-slate-900/80 backdrop-blur-md text-white border border-white/20">
                    {product.categoryName}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-amber-500/90 text-white backdrop-blur-md">
                    {toPersianDigits(product.carat)} عیار
                  </span>
                </div>

                {/* Stock status badge */}
                <div className="absolute bottom-3 right-3">
                  <span
                    className={`text-[10px] font-bold px-2.5 py-1 rounded-lg backdrop-blur-md ${
                      product.stock > 0
                        ? 'bg-emerald-500/90 text-white'
                        : 'bg-rose-500/90 text-white'
                    }`}
                  >
                    {product.stock > 0 ? `موجودی: ${toPersianDigits(product.stock)} عدد` : 'ناموجود'}
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono mb-1">
                    <span>{product.sku}</span>
                    <span>فروش: {toPersianDigits(product.salesCount)} عدد</span>
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm line-clamp-2 leading-relaxed">
                    {product.name}
                  </h3>
                </div>

                {/* Specs Box */}
                <div className="grid grid-cols-2 gap-2 p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 text-xs border border-slate-100 dark:border-slate-800">
                  <div>
                    <span className="text-[10px] text-slate-400 block">وزن خالص:</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      {formatGoldWeight(product.weight)}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">اجرت ساخت:</span>
                    <span className="font-bold text-purple-600 dark:text-pink-400">
                      {toPersianDigits(product.ojratPercent)}٪
                    </span>
                  </div>
                  {product.stoneType !== 'بدون سنگ' && (
                    <div className="col-span-2 pt-1 border-t border-slate-200 dark:border-slate-700">
                      <span className="text-[10px] text-slate-400 block">نگین و سنگ:</span>
                      <span className="font-semibold text-slate-700 dark:text-slate-300 truncate block text-[11px]">
                        {product.stoneType}
                      </span>
                    </div>
                  )}
                </div>

                {/* Live Dynamic Price */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block">قیمت زنده با مظنه روز:</span>
                    <span className="font-black text-sm text-purple-700 dark:text-pink-400 tabular-nums">
                      {formatToman(livePrice)}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => {
                        playTactileClick();
                        onEditProduct(product);
                      }}
                      className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-300 hover:bg-purple-600 hover:text-white transition-colors"
                      title="ویرایش محصول"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        playTactileClick();
                        if (confirm(`آیا از حذف "${product.name}" اطمینان دارید؟`)) {
                          onDeleteProduct(product.id);
                        }
                      }}
                      className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 hover:bg-rose-600 hover:text-white transition-colors"
                      title="حذف از ویترین"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {filteredProducts.length === 0 && (
        <div className="glass-panel rounded-3xl p-12 text-center text-slate-500 space-y-3">
          <AlertTriangle className="w-10 h-10 text-amber-500 mx-auto" />
          <p className="font-bold text-sm">هیچ طلایی با این فیلتر یا عبارت یافت نشد!</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setStatusFilter('all');
            }}
            className="text-xs text-purple-600 dark:text-purple-400 font-bold hover:underline"
          >
            پاک کردن فیلترها
          </button>
        </div>
      )}
    </div>
  );
}
