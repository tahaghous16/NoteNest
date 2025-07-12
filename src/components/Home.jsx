import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { addToPaste, updateToPaste } from "../features/pasteSlice";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");

  const dispatch = useDispatch();

  const allPaste = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    if (pasteId) {
      const paste = allPaste.find((p) => p._id === pasteId);
      setTitle(paste.title);
      setValue(paste.content);
    }
  }, [pasteId]);

  const navigate = useNavigate();

  const createPaste = () => {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };
    if (pasteId) {
      dispatch(updateToPaste(paste));
    } else {
      dispatch(addToPaste(paste));
    }

    //after creation and updation

    setTitle("");
    setValue("");
    setSearchParams({});

    navigate("/pastes");
  };

  return (
    <div className="pt-20 px-5 min-h-screen bg-slate-900">
      <div className="flex flex-col items-center justify-center py-6 px-4">
        <div className="w-full max-w-md space-y-6 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold text-center text-indigo-600 dark:text-indigo-400">
            {pasteId ? "✏️ Edit Your Paste" : "📝 Create New Paste"}
          </h2>
          <div className="w-full max-w-md text-blue-50 space-y-4">
            <input
              type="text"
              placeholder="Enter the title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
            />

            <textarea
              placeholder="Write your paste..."
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full h-60 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 resize-none"
            />

            <button
              onClick={createPaste}
              className={`w-full font-semibold py-2 rounded-lg transition duration-200 shadow-md
               ${
                 pasteId
                   ? "bg-yellow-400 hover:bg-yellow-500 text-black" // Update mode
                   : "bg-indigo-600 hover:bg-indigo-700 text-white" // Create mode
               }`}
            >
              {pasteId ? "Update Paste" : "Create My Paste"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
