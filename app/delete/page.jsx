"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTrashAlt, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

export default function DeletePage() {
  const [status, setStatus] = useState(null);

  const handleDelete = async () => {
    if (!confirm("هل أنت متأكد من حذف جميع البيانات؟")) return;

    try {
      const res = await fetch("/api/competition/delete", {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setStatus({ type: "success", msg: data.message });
      } else {
        setStatus({ type: "error", msg: data.message });
      }
    } catch (err) {
      console.error(err);
      setStatus({ type: "error", msg: "حدث خطأ أثناء الحذف." });
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-6">
      <motion.div
        className="bg-white p-10 rounded-2xl shadow-2xl border border-gray-300 text-center max-w-md w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          🗑️ حذف جميع بيانات المسابقة
        </h1>

        <motion.button
          onClick={handleDelete}
          className="flex items-center justify-center gap-3 bg-red-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-red-700 transition"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaTrashAlt /> حذف البيانات
        </motion.button>

        <AnimatePresence>
          {status && (
            <motion.div
              key="status"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`mt-6 flex items-center justify-center gap-2 text-sm font-medium p-3 rounded-lg border ${
                status.type === "success"
                  ? "bg-green-50 border-green-300 text-green-700"
                  : "bg-red-50 border-red-300 text-red-700"
              }`}
            >
              {status.type === "success" ? (
                <FaCheckCircle className="text-green-600" />
              ) : (
                <FaTimesCircle className="text-red-600" />
              )}
              {status.msg}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </main>
  );
}