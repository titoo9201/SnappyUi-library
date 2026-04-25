import React from "react";
import Auth from "../components/Auth";
import { useState } from "react";
import { useSelector } from "react-redux";
import { TbLetterS } from "react-icons/tb";
import { motion } from "motion/react";

function Home() {
  const [showAuth, setshowAuth] = useState(false);
  const { userData } = useSelector((state) => state.user);
  const getLetter = (name) => {
    if (!name) return "S";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div
      className="min-h-screen bg-[#030b0d] text-white overflow-x-hidden"
      style={{ fontFamily: "DM Sans, sans-serif" }}
    >
      {/* Grid BG */}
      <div className="fixed inset-0 bg-[radial-gradient(circle,rgba(58,207,255,0.035)_1px,transparent_1px)] bg-[size:26px_26px] pointer-events-none" />

      {/* Top Glow (UPDATED) */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[min(700px,100vw)] h-64 bg-[radial-gradient(ellipse,rgba(155,94,255,0.25)_0%,rgba(58,207,255,0.15)_40%,transparent_70%)] pointer-events-none" />

      {/* NAVBAR */}
      <nav className="sticky top-0 z-40 flex items-center justify-between px-4 sm:px-8 lg:px-10 py-4 border-b border-white/10 bg-[#0A0F2C]/85 backdrop-blur-md">
        {/* Logo */}
        <div className="flex items-center gap-2.5 ">
          <div
            className="
          w-8 h-8 rounded-full 
          bg-gradient-to-tr from-[#9B5EFF] to-[#3ACFFF] 
          flex items-center justify-center 
          shadow-[0_0_14px_rgba(58,207,255,0.4)]"
          >
            <TbLetterS className="text-white text-lg" size={20} />
          </div>

          <span
            className="text-lg font-bold text-[#e8f8fa]"
            style={{ fontFamily: "'Syne',sans-serif" }}
          >
            SnappyUI
          </span>
        </div>

        {/* Nav Buttons */}
        <div className=" hidden md:flex items-center gap-6 lg:gap-8 text-sm text-white/60">
          <button className="duration-200 px-6 py-1.5 border border-white/10 rounded-xl text-sm text-white/70 hover:text-white hover:border-[#3ACFFF]/40 transition-all cursor-pointer bg-transparent w-full">
            components
          </button>

          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (!userData) setshowAuth(true);
              }}
              className="flex items-center gap-2.5 bg-white/[0.06] border border-white/10 hover:border-[#3ACFFF]/40 px-3 py-1.5 rounded-xl transition-all cursor-pointer"
            >
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#9B5EFF] to-[#3ACFFF] flex items-center justify-center text-white text-[11px] font-bold">
                {getLetter(userData?.name)}
              </div>
            </motion.button>
          </div>
        </div>
      </nav>

      {showAuth && <Auth onClose={() => setshowAuth(false)} />}
    </div>
  );
}

export default Home;
