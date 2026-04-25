import React from "react";
import Auth from "../components/Auth";
import { useState } from "react";
import { useSelector } from "react-redux";
import { TbLetterS } from "react-icons/tb";
import { AnimatePresence, motion } from "motion/react";
import { HiSparkles } from "react-icons/hi2";
import {
  TbArrowRight,
  TbBrandNpm,
  TbCode,
  TbLayout,
  TbAdjustments,
  TbPlayerPlay,
  TbCopy,
  TbCheck,
  TbMenu2,
  TbX,
  TbLogout,
  TbComponents,
} from "react-icons/tb";

import axios from "axios";
import { serverUrl } from "../utils/api";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserData } from "../redux/userSlice";

function Home() {
  const [showAuth, setshowAuth] = useState(false);
  const [profileOpen, setprofileOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
  const handleLogout = async () => {
    try {
      const response = await axios.get(serverUrl + "/api/auth/logout", {
        withCredentials: true,
      });
      if (response.status === 200) {
        window.location.reload();
      }
      dispatch(setUserData(null));
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
    setprofileOpen(false);
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
          <button className="duration-200 px-1 py-2 border border-white/10 rounded-xl text-sm text-white/70 hover:text-white hover:border-[#3ACFFF]/40 transition-all cursor-pointer bg-transparent w-full">
            components
          </button>

          {userData ? (
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
               
                onClick={() => setprofileOpen(!profileOpen)}
                className="flex items-center gap-2.5 bg-white/[0.06] border border-white/10 hover:border-[#3ACFFF]/40 px-3 py-1.5 rounded-xl transition-all cursor-pointer"
              >
                <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#9B5EFF] to-[#3ACFFF] flex items-center justify-center text-white text-[11px] font-bold">
                  {getLetter(userData?.name)}
                </div>
                <span className="text-sm text-white/70 text-sm font-medium max-w-[100px] truncate">
                  {userData?.name || "Guest"}
                </span>
              </motion.button>
              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.96 }}
                    transition={{ duration: 0.18 }}
                    className="absolute right-0 top-12 w-52 bg-[#0A0F2C]/90 border border-white/[0.09] rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.1)] overflow-hidden z-50"
                  >
                    <div className="px-4 py-3.5 border-b border-white/[0.07]">
                      <p className="text-sm text-white/70 truncate">
                        Welcome, {userData?.name || "Guest"}!
                      </p>
                      <p className="text-xs text-white/50 mt-1 truncate">
                        {" "}
                        {userData?.email || "No email provided"}
                      </p>
                    </div>
                    <div className=" py-1.5">
                      <button
                        onClick={() => setprofileOpen(false)}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/[0.04] transition-colors cursor-pointer bg-transparent border-none text-left"
                      >
                        <TbComponents size={18} className="text-white/70" />
                        My Components
                      </button>
                    </div>
                    <div className="border-t border-white/[0.07] py-1.5">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/[0.04] transition-colors cursor-pointer bg-transparent border-none text-left"
                      >
                        <TbLogout size={18} className="text-white/70" />
                        <span className="ml-3 text-sm text-white/60 hover:text-white hover:bg-white/[0.04] transition-colors cursor-pointer bg-transparent border-none text-left">
                          Logout
                        </span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
           <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
           onClick={()=>setshowAuth(true)}
           className ="flex items-center gap-2 bg-gradient-to-tr from-[#9B5EFF] to-[#3ACFFF] px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer border-none shadow-[0_4px_15px_rgba(58,207,255,0.4)] hover:shadow-[0_6px_20px_rgba(58,207,255,0.6)] transition-shadow text-nowrap">
            <HiSparkles size={18} /> Generate AI Component

             
           </motion.button>
          )}
        </div>
      </nav>

     {showAuth && <Auth onClose={() => setshowAuth(false)} />}
    </div>
  );
}

export default Home;
