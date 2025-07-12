import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Trash2, Eye, Edit2, Copy } from "lucide-react";
import { removeFromPastes } from "../features/pasteSlice";
import toast from "react-hot-toast";

const Paste = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (pasteId) => {
    dispatch(removeFromPastes(pasteId));
  };

  return (
    <div className="pt-14 min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center">
      {/* Fixed Search Bar */}
      <div className="fixed top-16 z-40 w-full max-w-2xl bg-slate-900 px-4 pt-4">
        <input
          type="text"
          placeholder="Search pastes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg shadow-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
        />
      </div>

      {/* Scrollable Cards */}
      <div className="mt-[120px] px-4 w-full max-w-2xl flex-1 space-y-6 pb-12">
        {filteredData.length > 0 ? (
          filteredData.map((paste) => (
            <div
              key={paste._id}
              className="bg-slate-800 border border-slate-700 rounded-xl shadow-md p-6 space-y-4"
            >
              <div className="text-xl font-bold text-indigo-400">
                {paste.title}
              </div>
              <div className="text-slate-200 whitespace-pre-line">
                {paste.content}
              </div>

              <div className="flex gap-3 flex-wrap mt-4">
                <a
                  href={`/?pasteId=${paste?._id}`}
                  className="bg-indigo-600 text-white px-4 py-1 rounded-md hover:bg-indigo-700 transition"
                >
                  <Edit2 size={16} className="inline mr-1" />
                  Edit
                </a>
                <a
                  href={`/pastes/${paste?._id}`}
                  className="bg-blue-600 text-white px-4 py-1 rounded-md hover:bg-blue-700 transition"
                >
                  <Eye size={16} className="inline mr-1" />
                  View
                </a>
                <button
                  onClick={() => handleDelete(paste?._id)}
                  className="bg-red-600 text-white px-4 py-1 rounded-md hover:bg-red-700 transition"
                >
                  <Trash2 size={16} className="inline mr-1" />
                  Delete
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(paste?.content);
                    toast.success("Copied !");
                  }}
                  className="bg-gray-700 text-white px-4 py-1 rounded-md hover:bg-gray-800 transition"
                >
                  <Copy size={16} className="inline mr-1" />
                  Copy
                </button>
              </div>

              <div className="text-sm text-slate-400">
                Created at: {paste.createdAt}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-slate-400">No pastes found.</div>
        )}
      </div>
    </div>
  );
};

export default Paste;
