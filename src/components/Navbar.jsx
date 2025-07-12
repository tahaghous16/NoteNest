import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  return (
    <nav className="fixed top-0 left-0 w-full bg-slate-800 shadow-md px-6 py-4 z-50 text-slate-100">
      <div className="flex items-center justify-between">
        {/* App Name */}
        <h1 className="text-2xl font-extrabold tracking-tight">
          <span className="text-indigo-500">📝</span>{" "}
          <span className="text-white">NoteNest</span>
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-indigo-400 font-semibold border-b-2 border-indigo-400 pb-1"
                : "text-slate-200 hover:text-indigo-400"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/pastes"
            className={({ isActive }) =>
              isActive
                ? "text-indigo-400 font-semibold border-b-2 border-indigo-400 pb-1"
                : "text-slate-200 hover:text-indigo-400"
            }
          >
            Pastes
          </NavLink>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? (
            <X className="h-6 w-6 text-white" />
          ) : (
            <Menu className="h-6 w-6 text-white" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="mt-4 flex flex-col space-y-4 md:hidden animate-slide-down">
          <NavLink
            to="/"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              isActive
                ? "text-indigo-400 font-semibold underline underline-offset-4"
                : "text-slate-200 hover:text-indigo-400"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/pastes"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              isActive
                ? "text-indigo-400 font-semibold underline underline-offset-4"
                : "text-slate-200 hover:text-indigo-400"
            }
          >
            Pastes
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
