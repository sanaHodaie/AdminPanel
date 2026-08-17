import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Printer, Download, CheckCircle2, ShieldCheck, Gem, Sparkles } from 'lucide-react';
import { formatToman, formatGoldWeight, toPersianDigits, getTodayJalali } from '../utils/formatters';
import { playTactileClick } from '../utils/sound';

export default function InvoiceModal({ order, onClose }) {
  if (!order) return null;

  const handlePrint = () => {
    playTactileClick();
    window.print();
  };

  return (
    <AnimatePresence>
      <div 
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-start justify-center p-3 sm:p-6 md:p-8 pt-12 sm:pt-16 md:pt-20 pb-12 bg-slate-950/70 backdrop-blur-md overflow-y-auto"
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.95, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 25 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-3xl my-auto bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-purple-200/80 dark:border-purple-900/40 overflow-hidden flex flex-col max-h-[88vh]"
        >
          {/* Header Action Bar */}
          <div className="no-print flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-gradient-to-r from-purple-50/60 to-pink-50/40 dark:from-slate-800/80 dark:to-purple-950/40 flex-shrink-0">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-purple-600 text-white shadow-md shadow-purple-500/20">
                <Sparkles className="w-5 h-5" />
              </span>
              <div>
                <h3 className="font-bold text-slate-800 dark:text-white text-base">
                  فاکتور رسمی صنف طلا و جواهر
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  شناسه فاکتور: {order.invoiceNumber}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePrint}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold shadow-md shadow-purple-500/20 hover:from-purple-700 hover:to-pink-700 transition-all cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                چاپ فاکتور رسمی
              </motion.button>

              <button
                onClick={() => {
                  playTactileClick();
                  onClose();
                }}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Invoice Body Printable Document (scrollable on screen, clean on print) */}
          <div className="p-6 md:p-8 space-y-6 text-slate-800 dark:text-slate-100 print:text-black print:p-4 overflow-y-auto flex-1">
            {/* Store & Header Information */}
            <div className="flex flex-col sm:flex-row items-center justify-between border-b pb-5 border-slate-200 dark:border-slate-800 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-purple-600 flex items-center justify-center text-white shadow-lg font-black text-xl">
                  ژوئل
                </div>
                <div>
                  <h2 className="text-lg font-black text-slate-900 dark:text-white print:text-black">
                    گالری لوکس ژوئل
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 print:text-gray-600">
                    عضو رسمی اتحادیه طلا، جواهر و نقره (پروانه کسب: ۷۴۸۲۹)
                  </p>
                </div>
              </div>

              <div className="text-left sm:text-right space-y-1 text-xs">
                <div className="flex justify-between sm:justify-start gap-4">
                  <span className="text-slate-500 dark:text-slate-400">شماره فاکتور:</span>
                  <span className="font-bold">{order.invoiceNumber}</span>
                </div>
                <div className="flex justify-between sm:justify-start gap-4">
                  <span className="text-slate-500 dark:text-slate-400">تاریخ صدور:</span>
                  <span className="font-medium">{order.date}</span>
                </div>
                <div className="flex justify-between sm:justify-start gap-4">
                  <span className="text-slate-500 dark:text-slate-400">وضعیت پرداخت:</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    تسویه شده ({order.paymentMethod})
                  </span>
                </div>
              </div>
            </div>

            {/* Customer Information Box */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 text-xs">
              <div>
                <span className="text-slate-500 dark:text-slate-400 block mb-0.5">نام و نام خانوادگی خریدار:</span>
                <span className="font-bold text-slate-900 dark:text-white text-sm">{order.customerName}</span>
              </div>
              <div>
                <span className="text-slate-500 dark:text-slate-400 block mb-0.5">کد ملی:</span>
                <span className="font-semibold">{toPersianDigits(order.customerNationalCode || '۰۰۱۲۴۵۸۷۹۶')}</span>
              </div>
              <div>
                <span className="text-slate-500 dark:text-slate-400 block mb-0.5">شماره تماس:</span>
                <span className="font-semibold">{toPersianDigits(order.customerPhone)}</span>
              </div>
              <div className="sm:col-span-3 pt-2 border-t border-slate-200 dark:border-slate-700/50">
                <span className="text-slate-500 dark:text-slate-400">آدرس تحویل: </span>
                <span className="font-medium">{order.shippingAddress}</span>
              </div>
            </div>

            {/* Itemized Specification Table */}
            <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
              <table className="w-full text-xs text-right">
                <thead className="bg-gradient-to-r from-purple-100/70 to-pink-100/50 dark:from-slate-800 dark:to-purple-950/50 font-bold text-slate-700 dark:text-slate-300">
                  <tr>
                    <th className="p-3">ردیف</th>
                    <th className="p-3">شرح مصنوعات / کالا</th>
                    <th className="p-3 text-center">عیار</th>
                    <th className="p-3 text-center">وزن خالص</th>
                    <th className="p-3 text-left">مظنه طلا (هر گرم)</th>
                    <th className="p-3 text-left">مبلغ خام طلا</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  <tr>
                    <td className="p-3 font-semibold text-center">{toPersianDigits(1)}</td>
                    <td className="p-3 font-bold text-slate-900 dark:text-white">{order.productName}</td>
                    <td className="p-3 text-center font-bold text-amber-600 dark:text-amber-400">
                      {toPersianDigits(order.carat)}
                    </td>
                    <td className="p-3 text-center font-bold">{formatGoldWeight(order.goldWeight)}</td>
                    <td className="p-3 text-left font-medium">{formatToman(order.goldPriceAtOrder)}</td>
                    <td className="p-3 text-left font-bold">{formatToman(order.rawGoldTotal)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Official Breakdown Formula Calculation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-900/40 text-xs space-y-2">
                <div className="font-bold text-purple-900 dark:text-purple-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-purple-600" />
                  فرمول قانونی محاسبه طبق مصوبه اتحادیه:
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                  ارزش کل = طلای خام + اجرت ساخت + سود قانونی (۷٪) + مالیات بر ارزش افزوده (۹٪ منحصراً بر اجرت و سود) + ارزش سنگ‌های گرانبها.
                </p>
                <div className="text-[11px] text-slate-500 font-mono">
                  اصالت طلا و سنگ‌های به کار رفته توسط آزمایشگاه ری‌گیری تایید شده است.
                </div>
              </div>

              {/* Financial Summary */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">مبلغ طلای خام:</span>
                  <span className="font-semibold">{formatToman(order.rawGoldTotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">اجرت ساخت کارگاه:</span>
                  <span className="font-semibold">{formatToman(order.ojratAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">سود مصوب فروشنده (۷٪):</span>
                  <span className="font-semibold">{formatToman(order.profitAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">مالیات بر ارزش افزوده (۹٪ اجرت و سود):</span>
                  <span className="font-semibold">{formatToman(order.taxAmount)}</span>
                </div>
                {order.stonePrice > 0 && (
                  <div className="flex justify-between text-pink-600 dark:text-pink-400 font-semibold">
                    <span>ارزش سنگ‌های قیمتی / الماس:</span>
                    <span>{formatToman(order.stonePrice)}</span>
                  </div>
                )}
                <div className="pt-3 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center">
                  <span className="text-sm font-black text-slate-900 dark:text-white">مبلغ نهایی فاکتور:</span>
                  <span className="text-base font-black text-purple-700 dark:text-pink-400">
                    {formatToman(order.finalTotal)}
                  </span>
                </div>
              </div>
            </div>

            {/* Official Signatures & Barcode */}
            <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-center">
              <div className="flex flex-col items-center">
                <div className="w-32 h-10 border-b border-dashed border-slate-400 dark:border-slate-600 flex items-center justify-center text-slate-400 text-[10px]">
                  مهر و امضای گالری لوکس ژوئل
                </div>
                <span className="text-[11px] text-slate-500 mt-1">تایید فروشنده</span>
              </div>

              {/* Barcode Visual Representation */}
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-0.5 h-7">
                  {[2, 4, 1, 3, 1, 5, 2, 1, 4, 2, 3, 1, 2, 4, 1, 3, 2, 1, 4].map((w, i) => (
                    <div
                      key={i}
                      className="bg-slate-800 dark:bg-slate-200 h-full"
                      style={{ width: `${w * 1.5}px` }}
                    />
                  ))}
                </div>
                <span className="font-mono text-[10px] text-slate-500 mt-1">{order.invoiceNumber}</span>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-28 h-10 border-b border-dashed border-slate-400 dark:border-slate-600 flex items-center justify-center text-slate-400 text-[10px]">
                  امضای خریدار
                </div>
                <span className="text-[11px] text-slate-500 mt-1">تحویل و تایید خریدار</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
