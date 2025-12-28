"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ExportInformationDepot() {
  const router = useRouter();

  const [form, setForm] = useState({
    agentId: "",
    name: "",
    documentQty: "",
    amount: "85.00",
    userName: "",
    barcode: "",
    dateTime: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    const query = new URLSearchParams({
      wfexpNo: form.barcode,
      agentName: form.name,
      ain: form.agentId,
      qty: form.documentQty,
      date: form.dateTime,
      userId: form.userName,
    }).toString();

    router.push(`/preview?${query}`);
  };

  return (
    <div className="min-h-screen bg-slate-600 flex justify-center items-start p-6">
      <div className="w-full max-w-5xl bg-[#ECE9D6] rounded shadow-md">
        {/* Header */}
        <div className="flex justify-between items-center bg-slate-700 text-white px-6 py-3 rounded-t">
          <h1 className="text-xl font-serif italic">
            Export Information Depot
          </h1>

          <select className="text-black bg-white  px-2 py-1 rounded">
            <option>English</option>
            <option>বাংলা</option>
          </select>
        </div>

        {/* Form */}
        <div className="p-6">
          <h2 className="text-lg font-serif italic mb-4">Details:</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Agent ID */}
            <div>
              <label className="block mb-1">Agent ID :</label>
              <input
                type="text"
                name="agentId"
                value={form.agentId}
                onChange={handleChange}
                className="w-full border bg-white px-3 py-2 rounded"
              />
            </div>

            {/* Name */}
            <div>
              <label className="block mb-1">Name :</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border px-3 py-2 bg-white rounded"
              />
            </div>

            {/* Document Qty */}
            <div>
              <label className="block mb-1">Document Quantity:</label>
              <input
                type="number"
                name="documentQty"
                value={form.documentQty}
                onChange={handleChange}
                className="w-full border px-3 py-2 bg-white rounded"
              />
            </div>

            {/* Amount */}
            <div>
              <label className="block mb-1">Amount:</label>
              <input
                type="text"
                name="amount"
                value={form.amount}
                onChange={handleChange}
                className="w-full border bg-white px-3 py-2 rounded"
              />
            </div>
          </div>

          {/* ✅ SAME LINE: USERNAME + BARCODE + DATE */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div>
              <label className="block mb-1">User Name:</label>
              <input
                type="text"
                name="userName"
                value={form.userName}
                onChange={handleChange}
                className="w-full border px-3 py-2 bg-white rounded"
              />
            </div>

            <div>
              <label className="block mb-1">Barcode:</label>
              <input
                type="text"
                name="barcode"
                value={form.barcode}
                onChange={handleChange}
                className="w-full border px-3 py-2 bg-white rounded"
              />
            </div>

            <div>
              <label className="block mb-1">Date and Time:</label>
              <input
                type="datetime-local"
                name="dateTime"
                value={form.dateTime}
                onChange={handleChange}
                className="w-full border px-3 py-2 bg-white rounded"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex gap-4">
            <button
              onClick={handleSave}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
            >
              Save
            </button>

            <button
              type="reset"
              onClick={() =>
                setForm({
                  agentId: "",
                  name: "",
                  documentQty: "",
                  amount: "85.00",
                  userName: "",
                  barcode: "",
                  dateTime: "",
                })
              }
              className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
