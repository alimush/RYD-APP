"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUser,
  FaHashtag,
  FaFileInvoice,
  FaPhone,
  FaInstagram,
  FaStore,
  FaShareAlt,
  FaPaperPlane,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

export default function CompetitionPage() {
  const [formData, setFormData] = useState({
    customerName: "",
    customerCode: "",
    invoiceNumber: "",
    phone: "",
    instagram: "",
    branch: "",
    source: "",
  });

  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);   // 🔥 بدأ التحميل
  
    try {
      const res = await fetch("/api/competition", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      if (res.ok) {
        setMessage({ type: "success", text: "تم إرسال المعلومات بنجاح" });
        setFormData({
          customerName: "",
          customerCode: "",
          invoiceNumber: "",
          phone: "",
          instagram: "",
          branch: "",
          source: "",
        });
      } else {
        setMessage({ type: "error", text: "❌ فشل في إرسال المعلومات." });
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "⚠️ حدث خطأ أثناء الإرسال." });
    } finally {
      setLoading(false); // 🔥 إيقاف التحميل بعد الإرسال
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const inputFields = [
    { label: "اسم الزبون", key: "customerName", icon: <FaUser /> },
    { label: "كود الزبون", key: "customerCode", icon: <FaHashtag /> },
    { label: "رقم الفاتورة", key: "invoiceNumber", icon: <FaFileInvoice /> },
    { label: "رقم الهاتف", key: "phone", icon: <FaPhone /> },
    { label: "صفحة الإنستغرام", key: "instagram", icon: <FaInstagram /> },
  ];

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 p-6 relative overflow-hidden">
      {/* تأثير خلفي خفيف */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-gray-200/40 via-gray-100/20 to-white/50 blur-3xl -z-10" />

      {/* ✅ الرسالة المنبثقة */}
      <AnimatePresence>
        {message && (
          <motion.div
            key="popup"
            initial={{ opacity: 0, scale: 0.9, y: -30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -30 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className={`fixed top-8 left-1/2 transform -translate-x-1/2 
                        px-6 py-4 rounded-2xl shadow-lg flex items-center gap-3 z-50
                        ${message.type === "success"
                          ? "bg-green-50 border border-green-500 text-green-700"
                          : "bg-red-50 border border-red-500 text-red-700"
                        }`}
          >
            {message.type === "success" ? (
              <FaCheckCircle className="text-2xl text-green-600" />
            ) : (
              <FaTimesCircle className="text-2xl text-red-600" />
            )}
            <span className="text-base font-semibold">{message.text}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ✅ النموذج */}
      <motion.form
        onSubmit={handleSubmit}
        className="bg-white/80 backdrop-blur-md border border-gray-200 rounded-3xl shadow-2xl p-10 w-full max-w-xl"
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* العنوان */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
            استمارة المسابقة
          </h1>
        
        </div>

        {/* حقول الإدخال */}
        <div className="space-y-6">
          {inputFields.map(({ label, key, icon }) => (
            <label
              key={key}
              className="flex flex-col font-semibold text-gray-700 space-y-1"
            >
              <div className="flex items-center gap-2 text-gray-600 text-sm">
                {icon}
                <span>{label}</span>
              </div>
              <motion.input
                type="text"
                className="border border-gray-300 bg-gray-50 p-3 rounded-xl focus:outline-none 
                           focus:ring-2 focus:ring-gray-400 transition-all text-gray-800"
                value={formData[key]}
                onChange={(e) =>
                  setFormData({ ...formData, [key]: e.target.value })
                }
                whileFocus={{ scale: 1.01 }}
              />
            </label>
          ))}

          {/* الفرع */}
          <label className="flex flex-col font-semibold text-gray-700 space-y-1">
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <FaStore />
              <span>الفرع</span>
            </div>
            <motion.select
              className="border border-gray-300 bg-gray-50 p-3 rounded-xl focus:outline-none 
                         focus:ring-2 focus:ring-gray-400 transition-all text-gray-800"
              value={formData.branch}
              onChange={(e) =>
                setFormData({ ...formData, branch: e.target.value })
              }
              whileFocus={{ scale: 1.01 }}
            >
              <option value="">اختر الفرع</option>
              <option value="الكرادة">الكرادة</option>
              <option value="المنصور">المنصور</option>
              <option value="النجف">النجف</option>
              <option value="عكد النصارى">عكد النصارى</option>
            </motion.select>
          </label>

          {/* المصدر */}
          <label className="flex flex-col font-semibold text-gray-700 space-y-1">
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <FaShareAlt />
              <span>من أين سمعت بالمسابقة؟</span>
            </div>
            <motion.select
              className="border border-gray-300 bg-gray-50 p-3 rounded-xl focus:outline-none 
                         focus:ring-2 focus:ring-gray-400 transition-all text-gray-800"
              value={formData.source}
              onChange={(e) =>
                setFormData({ ...formData, source: e.target.value })
              }
              whileFocus={{ scale: 1.01 }}
            >
              <option value="">اختر المصدر</option>
              <option value="صفحات التواصل الاجتماعي">
                صفحات التواصل الاجتماعي
              </option>
              <option value="من الواتس اب">من الواتس اب</option>
              <option value="اثناء زيارة المعرض">أثناء زيارة المعرض</option>
              <option value="عن طريق صديق او اقارب">
                عن طريق صديق أو أقارب
              </option>
            </motion.select>
          </label>

          <motion.button
  type="submit"
  disabled={loading}
  className={`w-full mt-6 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 
             text-white font-bold py-3 rounded-2xl shadow-md 
             hover:shadow-lg flex items-center justify-center gap-3 transition-all
             ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
  whileHover={!loading ? { scale: 1.04 } : {}}
  whileTap={!loading ? { scale: 0.97 } : {}}
>
  {loading ? (
    <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
  ) : (
    <>
      <FaPaperPlane className="text-lg" /> إرسال المعلومات
    </>
  )}
</motion.button>
        </div>
      </motion.form>
    </main>
  );
}
