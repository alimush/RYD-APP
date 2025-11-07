"use client";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Select from "react-select";
import {
  FaUser,
  FaPhone,
  FaInstagram,
  FaStore,
  FaFileAlt,
  FaReceipt,
  FaTimes,
  FaFilter,
  FaCode,
  FaCalendarAlt,
  FaSpinner,
} from "react-icons/fa";

export default function ReportsPage() {
  const [records, setRecords] = useState([]);
  const [selected, setSelected] = useState(null);
  const [nameOptions, setNameOptions] = useState([]);
  const [filterName, setFilterName] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🟢 جلب البيانات من MongoDB
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/reports");
        const data = await res.json();

        if (data.success) {
          // 🟢 تأكدنا أن كل سجل يحتوي على createdAt حتى لو ناقص
          const normalized = data.data.map((r) => ({
            ...r,
            createdAt: r.createdAt || new Date().toISOString(),
          }));

          setRecords(normalized);

          const uniqueNames = [
            ...new Set(normalized.map((r) => r.customerName).filter(Boolean)),
          ].map((n) => ({ value: n, label: n }));

          setNameOptions(uniqueNames);
        }
      } catch (err) {
        console.error("❌ Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // ✅ فلترة الأسماء
  const filtered = useMemo(() => {
    if (!filterName?.value) return records;
    return records.filter((r) =>
      r.customerName?.toLowerCase().includes(filterName.value.toLowerCase())
    );
  }, [filterName, records]);

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300">
      {/* 🧾 الهيدر */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-3 text-gray-700">
          <FaFileAlt className="text-gray-700" />
          <span>تقارير المسابقة</span>
        </h1>

        {/* 🔍 فلتر الاسم */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <FaFilter className="text-gray-600 text-lg" />
          <Select
            instanceId="name-filter"
            options={nameOptions}
            isClearable
            placeholder="بحث بالاسم..."
            value={filterName}
            onChange={setFilterName}
            className="min-w-[240px] text-sm"
            styles={{
              control: (base) => ({
                ...base,
                borderRadius: "12px",
                borderColor: "#9ca3af",
                backgroundColor: "#f3f4f6",
                boxShadow: "none",
                "&:hover": { borderColor: "#6b7280" },
              }),
              menu: (base) => ({
                ...base,
                borderRadius: "12px",
                backgroundColor: "white",
              }),
            }}
          />
        </div>
      </div>

      {/* 📋 الحالات */}
      <AnimatePresence mode="wait">
        {loading ? (
          // ⏳ جاري التحميل
          <motion.div
            key="loading"
            className="flex flex-col items-center justify-center bg-white rounded-2xl shadow p-10 text-gray-600 border border-gray-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <FaSpinner className="animate-spin text-3xl mb-3 text-gray-500" />
            <p className="text-lg font-medium">جاري تحميل البيانات...</p>
          </motion.div>
        ) : filtered.length > 0 ? (
          // ✅ جدول النتائج
          <motion.div
            key="table"
            className="overflow-x-auto bg-white shadow-lg rounded-3xl border border-gray-200"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <table className="w-full border-collapse text-center rounded-3xl overflow-hidden">
              <thead className="bg-gradient-to-r from-gray-600 to-gray-800 text-white text-lg">
                <tr>
                  <th className="p-3 border border-gray-700">الاسم</th>
                  <th className="p-3 border border-gray-700">كود الزبون</th>
                  <th className="p-3 border border-gray-700">رقم الفاتورة</th>
                  <th className="p-3 border border-gray-700">الهاتف</th>
                  <th className="p-3 border border-gray-700">الفرع</th>
                  <th className="p-3 border border-gray-700">المصدر</th>
                  <th className="p-3 border border-gray-700">التاريخ</th>
                </tr>
              </thead>
              <tbody className="text-gray-800 text-base">
                {filtered.map((item, i) => (
                  <motion.tr
                    key={i}
                    onClick={() => setSelected(item)}
                    className="cursor-pointer hover:bg-gray-100 transition-all duration-150"
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  >
                    <td className="p-3 border border-gray-200">{item.customerName || "-"}</td>
                    <td className="p-3 border border-gray-200">{item.customerCode || "-"}</td>
                    <td className="p-3 border border-gray-200">{item.invoiceNumber || "-"}</td>
                    <td className="p-3 border border-gray-200">{item.phone || "-"}</td>
                    <td className="p-3 border border-gray-200">{item.branch || "-"}</td>
                    <td className="p-3 border border-gray-200">{item.source || "-"}</td>
                    <td className="p-3 border border-gray-200 text-gray-500">
  {item.createdAt
    ? new Date(item.createdAt).toLocaleDateString("en-US")
    : "-"}
</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        ) : (
          // ❌ لا توجد بيانات
          <motion.div
            key="empty"
            className="bg-white rounded-2xl shadow p-10 text-center text-gray-500 italic border border-gray-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            لا توجد بيانات حالياً
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🪶 Popup التفاصيل */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl p-6 w-[90%] max-w-2xl relative border border-gray-300"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ duration: 0.4 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* زر الإغلاق */}
              <motion.button
                whileHover={{ scale: 1.2 }}
                className="absolute top-3 right-3 text-gray-600 hover:text-red-600 text-xl"
                onClick={() => setSelected(null)}
              >
                <FaTimes />
              </motion.button>

              {/* العنوان */}
              <h2 className="text-xl font-bold mb-6 text-center flex items-center justify-center gap-2 text-gray-700 border-b pb-2">
                <FaUser className="text-gray-600" />
                <span>تفاصيل المشاركة</span>
              </h2>

              {/* تفاصيل */}
              <div className="grid grid-cols-2 gap-4 text-gray-700 text-base">
                {[
                  { icon: <FaUser />, label: "الاسم", value: selected.customerName },
                  { icon: <FaCode />, label: "كود الزبون", value: selected.customerCode },
                  { icon: <FaReceipt />, label: "رقم الفاتورة", value: selected.invoiceNumber },
                  { icon: <FaPhone />, label: "الهاتف", value: selected.phone },
                  { icon: <FaInstagram />, label: "إنستغرام", value: selected.instagram },
                  { icon: <FaStore />, label: "الفرع", value: selected.branch },
                  { icon: <FaFilter />, label: "المصدر", value: selected.source },
                  {
                    icon: <FaCalendarAlt />,
                    label: "تاريخ الإرسال",
                    value: selected.createdAt
                    ? new Date(selected.createdAt).toLocaleString("en-US")
                    : "-",
                  },
                ].map((box, idx) => (
                  <motion.div
                    key={idx}
                    className="p-4 bg-gray-50 rounded-xl border border-gray-300 shadow-sm hover:shadow-md"
                    whileHover={{ scale: 1.04 }}
                  >
                    <h3 className="flex items-center gap-2 text-base font-semibold mb-1 text-gray-700">
                      {box.icon} {box.label}
                    </h3>
                    <p className="text-gray-800">{box.value || "-"}</p>
                  </motion.div>
                ))}
              </div>

              {/* فوتر */}
              <div className="border-t mt-8 pt-3 text-center text-sm text-gray-500">
                © 2025 - بوابة الحلول لتكنولوجيا المعلومات
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}