import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Plus, Image, Gem, Tag, Scale, DollarSign } from 'lucide-react';
import { toPersianDigits, formatToman } from '../utils/formatters';
import { playTactileClick, playSuccessChime } from '../utils/sound';

export default function NewProductModal({ isOpen, onClose, onSave, editingProduct = null, currentGoldPrice18k = 3685000 }) {
  const [formData, setFormData] = useState(
    editingProduct || {
      name: '',
      category: 'necklace',
      categoryName: 'گردنبند',
      weight: 5.5,
      carat: 18,
      ojratPercent: 15,
      stoneType: 'بدون سنگ',
      stonePrice: 0,
      stock: 3,
      sku: `ZRN-${Math.floor(100 + Math.random() * 900)}`,
      status: 'available',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&auto=format&fit=crop&q=80',
      description: '',
      isFeatured: false
    }
  );

  if (!isOpen) return null;

  const categories = [
    { id: 'necklace', name: 'گردنبند' },
    { id: 'ring', name: 'انگشتر' },
    { id: 'bracelet', name: 'دستبند' },
    { id: 'earrings', name: 'گوشواره' },
    { id: 'set', name: 'سرویس طلا' },
    { id: 'bangle', name: 'النگو' },
    { id: 'bar', name: 'شمش سرمایه‌گذاری' },
    { id: 'anklet', name: 'پابند' }
  ];

  const presetImages = [
    { label: 'گردنبند پروانه', url: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&auto=format&fit=crop&q=80' },
    { label: 'انگشتر الماس', url: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&auto=format&fit=crop&q=80' },
    { label: 'دستبند کارتیه', url: 'https://images.unsplash.com/photo-1611591475878-a00632a67e45?w=600&auto=format&fit=crop&q=80' },
    { label: 'گوشواره یاقوت', url: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=600&auto=format&fit=crop&q=80' },
    { label: 'سرویس کامل', url: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&auto=format&fit=crop&q=80' },
    { label: 'شمش خالص طلا', url: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=600&auto=format&fit=crop&q=80' }
  ];

  // Calculate approximate base estimated price today
  const rawGold = (Number(formData.weight) || 0) * (currentGoldPrice18k * (formData.carat / 18));
  const ojrat = rawGold * ((Number(formData.ojratPercent) || 0) / 100);
  const profit = (rawGold + ojrat) * 0.07;
  const tax = (ojrat + profit) * 0.09;
  const estimatedPrice = rawGold + ojrat + profit + tax + (Number(formData.stonePrice) || 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    playSuccessChime();
    const productPayload = {
      ...formData,
      id: editingProduct ? editingProduct.id : `PRD-${Date.now().toString().slice(-4)}`,
      salesCount: editingProduct ? editingProduct.salesCount : 0
    };
    onSave(productPayload);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl my-8 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-purple-200/80 dark:border-purple-900/40 overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-gradient-to-r from-purple-50/60 to-pink-50/40 dark:from-slate-800/80 dark:to-purple-950/40">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-purple-600 text-white shadow-md shadow-purple-500/20">
                <Gem className="w-5 h-5" />
              </span>
              <div>
                <h3 className="font-bold text-slate-800 dark:text-white text-base">
                  {editingProduct ? 'ویرایش اطلاعات محصول طلا و جواهر' : 'افزودن محصول جدید به ویترین'}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  ثبت مشخصات دقیق عیار، وزن، اجرت ساخت و سنگ‌های قیمتی
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                playTactileClick();
                onClose();
              }}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
            {/* Title & Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  نام و مدل محصول *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="مثال: دستبند النگویی تیفانی طرح T"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  دسته‌بندی طلا و جواهر *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => {
                    const selectedCat = categories.find((c) => c.id === e.target.value);
                    setFormData({
                      ...formData,
                      category: e.target.value,
                      categoryName: selectedCat ? selectedCat.name : ''
                    });
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Weight, Carat, Ojrat */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  وزن خالص (گرم و سوت) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  عیار طلا *
                </label>
                <select
                  value={formData.carat}
                  onChange={(e) => setFormData({ ...formData, carat: parseInt(e.target.value) })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value={18}>۱۸ عیار (۷۵۰ استاندارد)</option>
                  <option value={24}>۲۴ عیار (۹۹۹ شمش خالص)</option>
                  <option value={21}>۲۱ عیار (۸۷۵)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  اجرت ساخت (درصد ٪) *
                </label>
                <input
                  type="number"
                  step="0.5"
                  required
                  value={formData.ojratPercent}
                  onChange={(e) => setFormData({ ...formData, ojratPercent: parseFloat(e.target.value) || 0 })}
                  placeholder="مثال: ۱۵"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* Gemstones & Stone Price */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  نوع سنگ یا نگین‌های به کار رفته
                </label>
                <input
                  type="text"
                  value={formData.stoneType}
                  onChange={(e) => setFormData({ ...formData, stoneType: e.target.value })}
                  placeholder="مثال: الماس برلیان تراش گرد یا بدون سنگ"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  ارزش ریالی سنگ‌های قیمتی (تومان)
                </label>
                <input
                  type="number"
                  step="100000"
                  value={formData.stonePrice}
                  onChange={(e) => setFormData({ ...formData, stonePrice: parseFloat(e.target.value) || 0 })}
                  placeholder="۰ برای بدون نگین"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* SKU, Stock & Status */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  کد شناسایی کالا (SKU)
                </label>
                <input
                  type="text"
                  value={formData.sku}
                  onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  تعداد موجودی در ویترین
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.stock}
                  onChange={(e) => {
                    const val = parseInt(e.target.value) || 0;
                    setFormData({
                      ...formData,
                      stock: val,
                      status: val > 0 ? 'available' : 'out_of_stock'
                    });
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  وضعیت نمایش
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="available">موجود در ویترین</option>
                  <option value="reserved">رزرو مشتری</option>
                  <option value="out_of_stock">ناموجود / در حال ساخت</option>
                </select>
              </div>
            </div>

            {/* Image URL & Presets */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                تصویر باکیفیت محصول
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="آدرس اینترنتی تصویر (URL)"
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Quick Image Picker */}
              <div className="flex items-center gap-2 overflow-x-auto py-1">
                <span className="text-[11px] text-slate-500 whitespace-nowrap">انتخاب سریع:</span>
                {presetImages.map((preset, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      playTactileClick();
                      setFormData({ ...formData, image: preset.url });
                    }}
                    className={`text-[11px] px-2.5 py-1 rounded-lg border whitespace-nowrap transition-colors ${
                      formData.image === preset.url
                        ? 'bg-purple-600 text-white border-purple-600'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Live Calculation Preview Banner */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-amber-500/10 border border-purple-200 dark:border-purple-900/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span className="text-slate-700 dark:text-slate-300">
                  قیمت تخمینی محصول بر اساس مظنه زنده روز (با اجرت، سود ۷٪ و مالیات ۹٪):
                </span>
              </div>
              <span className="font-black text-sm text-purple-700 dark:text-pink-400 tabular-nums">
                {formatToman(estimatedPrice)}
              </span>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => {
                  playTactileClick();
                  onClose();
                }}
                className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                انصراف
              </button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 text-white text-xs font-bold shadow-lg shadow-purple-500/25 hover:opacity-95 transition-all"
              >
                {editingProduct ? 'ذخیره تغییرات' : 'افزودن به ویترین'}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
