import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ViewPaste = () => {
  const { id } = useParams();
  const allPaste = useSelector((state) => state.paste.pastes);
  const paste = allPaste.find((p) => p._id === id);

  if (!paste) {
    return (
      <div className="pt-24 min-h-screen bg-slate-900 text-center text-slate-100">
        <h2 className="text-2xl font-semibold text-red-400">Paste not found</h2>
      </div>
    );
  }

  return (
    <div className="pt-35 px-4 min-h-screen bg-slate-900 text-slate-100">
      {/* Page Heading Styled Like Input */}
      <div className="text-center mb-6">
        <div className="inline-block w-full max-w-2xl px-4">
          <div className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-left text-xl font-semibold text-indigo-400 shadow-sm cursor-default">
            📝 {paste.title}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-2xl space-y-4">
          <textarea
            value={paste.content}
            disabled
            className="w-full h-60 px-4 py-3 bg-slate-800 text-slate-100 border border-slate-600 rounded-lg shadow-sm focus:outline-none transition duration-200 resize-none"
          />

          <div className="text-sm text-slate-400">
            Created at: {paste.createdAt}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPaste;
