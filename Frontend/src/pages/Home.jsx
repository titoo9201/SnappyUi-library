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
const features = [
  { icon: TbLayout,       title: "Prebuilt UI Components", text: "Install snappyui-lib and use ready-made, production-grade components instantly." },
  { icon: HiSparkles,     title: "AI Component Generator", text: "Describe your UI in plain English and generate React components in seconds." },
  { icon: TbAdjustments,  title: "Customizable Props", text: "Modify component props and preview changes in real-time without rebuilding." },
  { icon: TbCode,         title: "Clean JSX Code", text: "Copy production-ready JSX directly into your project — zero boilerplate." },
  { icon: TbBrandNpm,     title: "NPM Library", text: "Import snappyui-lib components with a simple npm install command." },
  { icon: TbPlayerPlay,   title: "Live Preview", text: "Instantly preview AI-generated components before exporting your code." }
];

const steps = [
  { n:"01", title:"Install Library", text:"npm install snappyui-lib to access all prebuilt UI components." },
  { n:"02", title:"Use Components", text:"Import and customize with props for any design requirement." },
  { n:"03", title:"Generate with AI", text:"Describe your UI and let AI build the component for you." },
  { n:"04", title:"Copy & Use", text:"Paste the clean JSX code straight into your project." },
];


function Home() {
  const [showAuth, setshowAuth] = useState(false);
  const [profileOpen, setprofileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
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
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText("npm install snappyui-lib");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {}
  };
  const handlegenerate = async () => {
    try {
      if (userData) {
        navigate("/generate");
      } else {
        setshowAuth(true);
      }
    } catch (err) {}
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
          <button className="duration-200 px-6 py-2.5 border border-white/10 rounded-xl text-sm text-white/70 hover:text-white hover:border-[#3ACFFF]/40 transition-all cursor-pointer bg-transparent w-full">
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
              onClick={() => setshowAuth(true)}
              className="flex items-center gap-2 bg-gradient-to-tr from-[#9B5EFF] to-[#3ACFFF] px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer border-none shadow-[0_4px_15px_rgba(58,207,255,0.4)] hover:shadow-[0_6px_20px_rgba(58,207,255,0.6)] transition-shadow text-nowrap"
            >
              <HiSparkles size={18} /> Generate Component
            </motion.button>
          )}
        </div>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white/70 hover:text-white transition-colors bg-transparent border-none cursor-pointer"
        >
          {menuOpen ? <TbX size={24} /> : <TbMenu2 size={24} />}
        </button>
      </nav>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden sticky top-[65px] z-30 bg-[#0A0F2C]/95 backdrop-blur-md border-b border-white/[0.05] px-4 py-4 flex flex-col gap-3 "
          >
            <button className="duration-200 px-6 py-2.5 border border-white/10 rounded-xl text-sm text-white/70 hover:text-white hover:border-[#3ACFFF]/40 transition-all cursor-pointer bg-transparent w-full">
              components
            </button>
            {userData ? (
              <>
                <div className="flex items-center gap-2.5 py-2 border-t border-white/[0.07] ">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#9B5EFF] to-[#3ACFFF] flex items-center justify-center text-white text-[11px] font-bold">
                    {getLetter(userData?.name)}
                  </div>
                  <span className="text-sm text-white/70 text-sm font-medium ">
                    {userData?.name || "Guest"}
                  </span>
                </div>
                <button
                  onClick={() => setmenuOpen(false)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/[0.04] rounded-lg transition-colors"
                >
                  <TbComponents size={18} className="text-white/70" />
                  My Components
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/[0.04] transition-colors cursor-pointer bg-transparent border-none text-left"
                >
                  <TbLogout size={18} className="text-white/70" />
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setshowAuth(true);
                  setMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-tr from-[#9B5EFF] to-[#3ACFFF] px-4 py-3 rounded-xl text-sm font-semibold cursor-pointer border-none shadow-[0_4px_15px_rgba(58,207,255,0.4)] hover:shadow-[0_6px_20px_rgba(58,207,255,0.6)] transition-all"
              >
                <HiSparkles size={18} /> Generate Component
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      {/* hero section */}
      <section className="relative max-w-5xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-12 sm:pb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="inline-flex items-center gap-2 text-[10px] font-semibold tracking-[2.5px] uppercase text-[#3ACFFF] border border-[#3ACFFF] rounded-full py-1.5 px-4 mb-6 sm:mb-7 justify-center"
        >
          <span className=" w-1.5 h-1.5 rounded-full bg-[#3ACFFF] animate-pulse" />
          AI-POWERED REACT UI LIBRARY
        </motion.div>
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#9B5EFF] to-[#3ACFFF] mb-6 sm:mb-8"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12 }}
          style={{ fontFamily: "'Syne',sans-serif" }}
        >
          Build Stunning React UIs <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9B5EFF] to-[#3ACFFF]">
            in Seconds with SnappyUI - Your AI-Powered Design Companion
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-white/50 text-base sm:text-lg max-w-xl mx-auto leading-relaxed mb-8 sm:mb-10 font-light px-2"
        >
          Build faster, design smarter, and ship better with SnappyUI. Our
          AI-powered React UI library creates clean, responsive components
          instantly — so you can skip repetitive coding and focus on crafting
          seamless, high-quality user experiences.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.27 }}
          className="flex items-center justify-center mb-7 sm:mb-8 px-2"
        >
          <div className=" flex items-center gap=2 sm:gap-3 bg-white/[0.04] border boder-white/10 rounded-xl px-4 sm:px-5 py-3 text-xs sm:text-sm font-mono w-full max-w-xs sm:max-w-fit cursor-pointer text-white/70 hover:text-white hover:bg-white/[0.06] transition-colors">
            <span className="text-[#3ACFFF]">$</span>
            <span className="text-white/80 truncate">
              npm install snappyui-lib
            </span>
            <button
              onClick={handleCopy}
              className=" 
ml-1 text-white/30 hover:text-[#3ACFFF] tansition-colors cursor-pointer bg-transparent border-none flex-shrink-0"
            >
              {copied ? (
                <TbCheck size={15} className="text-[#3ACFFF]" />
              ) : (
                <TbCopy size={15} />
              )}
            </button>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.33 }}
          className="flex flex-col sm:flex-row justify-center gap-3 px-4 sm::px-0"
        >
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 bg-gradient-to-tr from-[#9B5EFF] to-[#3ACFFF] px-4 py-3 rounded-xl text-sm font-semibold cursor-pointer border-none shadow-[0_4px_15px_rgba(58,207,255,0.4)] hover:shadow-[0_6px_20px_rgba(58,207,255,0.6)] transition-all"
          >
            Get Started <TbArrowRight size={18} />
          </motion.button>
          <motion.button
            onClick={handlegenerate}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 border border-white/10 rounded-xl px-4 py-3 text-sm text-white/70 hover:text-white hover:border-[#3ACFFF]/40 transition-all cursor-pointer bg-transparent"
          >
            <HiSparkles size={18} /> Generate Component
          </motion.button>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="mt-12 sm:mt-16 mx-auto max-w-2xl bg-[#0A0F2C]/80 border border-white/[0.07] rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.1)] p-4 sm:p-5 text-left backdrop-blur-sm overflow-x-auto"
        >
          <div className="flex items-center gap-1.5 mb-4">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
            <span className="ml-3 text-[11px] text-white/20 font-mono">
              App.jsx
            </span>
          </div>
          <div className="font-mono text-[11px] sm:text-[12.5px] leading-6 space-y-0.5 min-w-[280px]">
            <p>
              <span className="text-[#FF6B6B]">import </span>{" "}
              <span className="text-[#3ACFFF]">{"{Button,Card}"}</span>{" "}
              <span className="text-white/80">from </span>{" "}
              <span className="text-green-400">snappyui-lib</span>
              <span className="text-white/80">;</span>
            </p>
            <p> </p>
            <p>
              <span className="text-[#FF6B6B]">export default function</span>{" "}
              <span className="text-[#3ACFFF]">App</span>
              <span className="text-white/80">(){"{}"}</span>
            </p>
            <p>
              <span className="text-white/80">{"return ("}</span>
            </p>
            <p>
              <span className="text-white/80">{"    <"}</span>{" "}
              <span className="text-[#3ACFFF]">Card</span>{" "}
              <span className="text-white/80">title</span>
              <span className="text-white/80">={'"Dashboard"'}</span>
              <span className="text-white/80">/{">"}</span>
            </p>
             <p>
              <span className="text-white/80">{"    <"}</span>{" "}
              <span className="text-[#3ACFFF]">Button</span>{" "}
              <span className="text-white/80">title</span>
              <span className="text-white/80">={'"click me"'}</span>
              <span className="text-white/80">/{">"}</span>
            </p>
            <p><span className="text-white/80">{"   </"}</span> <span className="text-[#3ACFFF]">Card</span> <span className="text-white/80">{">"}</span></p>
            <p><span className="text-white/80">{" )"}</span></p>
            
          </div>
        </motion.div>
      </section>
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <motion.div
        initial ={{opacity:0,y:16}}
        whileInView={{opacity:1,y:0}}
        viewport={{once:true}}
        transition={{duration:0.55}}

        className="text-center mb-10 sm:mb-14">
          <p className="text-sm text-[#3ACFFF] font-semibold tracking-[2.5px] uppercase mb-3">
            What's inside
          </p>
<h2 className="text-3xl sm:text-4xl font-bold tracking-tight" style={{fontFamily:"'syne',sans-serif"}}>
  👀Everything You Need to Build Stunning React UIs, Instantly 
</h2>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f,i)=>(
            <motion.div 
            initial ={{opacity:0,y:20}}
        whileInView={{opacity:1,y:0}}
        viewport={{once:true}}
        transition={{duration:0.55,delay:i*0.07}}

            key={i} className="group p-5 sm:p-6 rounded-2xl border border-white/[0.07] bg-wnite/[0.04] hover:bg-white/[0.06] transition-colors cursor-pointer duration-300">
             <div className="w-10 h-10 rounded-xl bg-[#febc2e]/[0.1] border border-[#febc2e]/15 flex items-center justify-center mb-4 group-hover:bg-[#febc2e]/15 transition-colors">
             <f.icon size={18} className="text-[#febc2e]" />
             </div>
             <h3 className="font-semibold text-white/90 mb-2 text-[15px]"> 
             {f.title}
             </h3>
             <p className="text-sm text-white/45 leading-relaxed">{f.text}</p>
            </motion.div>
          ))}
          
        </div>
      </section>
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
         <motion.div
        initial ={{opacity:0,y:16}}
        whileInView={{opacity:1,y:0}}
        viewport={{once:true}}
        transition={{duration:0.55}}

        className="text-center mb-10 sm:mb-14">
          <p className="text-sm text-[#3ACFFF] font-semibold tracking-[2.5px] uppercase mb-3">
            SIMPLE PROCESS, POWERFUL RESULTS
            
          </p>
<h2 className="text-3xl sm:text-4xl font-bold tracking-tight" style={{fontFamily:"'syne',sans-serif"}}>
  How It Works: From Idea to Code in Simple Steps 👇
</h2>
        </motion.div>
        <div className="relative grid grid-cols-2  lg:grid-cols-4 gap-6 sm:gap-8">
          <div className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-[#3ACFFF] to-transparent"/>
          {steps.map((s,i)=>(
            <motion.div key={i} 
        initial ={{opacity:0,y:20}}
        whileInView={{opacity:1,y:0}}
        viewport={{once:true}}
        transition={{duration:0.55,delay:i*0.1}}
          className="relative text-center group"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 rounded-2xl bg-gradient-to-br from-[#3ACFFF] to-[#007BFF] border border-[#3ACFFF]/20 flex flex-cols items-center justify-center group-hover:border-[#3ACFFF]/50 group-hover:shadow-[0_0_20px_rgba(58,207,255,0.5)] transition-all duration-300 " >
              <span className="text-[9px] text-white font-bold tracking-widset">{s.n}</span>
              </div>
              <h3 className="font-semibold text-white/90 mb-2 text-[13px] sm:text-[15px]">{s.title}</h3>
              <p className="text-[11px] sm:text-xs text-white/40 loading-relaxed">{s.text}</p>
            </motion.div>
          ))}
        </div>
      </section>
     <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-16 sm:pb-24">
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="relative rounded-2xl sm:rounded-3xl border border-[#3ACFFF]/15 bg-gradient-to-br from-[#3ACFFF]/10 to-[#3ACFFF]/5 p-8 sm:p-14 text-center overflow-hidden"
  >
    
    {/* Background Glow */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(58,207,255,0.1)_0%,rgba(58,207,255,0)_60%)] pointer-events-none" />

    {/* Content */}
    <div className="relative z-10">
      <p className="text-[10px] font-semibold tracking-[3px] uppercase text-[#3ACFFF]/60 mb-3 sm:mb-4">
        Start Building
      </p>

      <h3
        className="text-3xl sm:text-4xl font-bold tracking-tight mb-3 sm:mb-4"
        style={{ fontFamily: "'Syne',sans-serif" }}
      >
        Ready to Generate <br /> Your New Components?😁
      </h3>
{userData ? (<>
<p className="text-white/40 mb-7 sm:mb-8 text-sm max-w-md mx-auto leading-relaxed">
Welcome Back 🫣<span className="text-[#3ACFFF] font-bold"> {userData.name}</span> ! Continue building amazing components 🤗

</p>
<div className="flex flex-cols sm:flex-row justify-center gap-3">
  <motion.button
  whileHover={{y: -2, scale: 1.05}}
  whileTap={{scale:0.95}}
  className="flex items-center justify-center gap-2 bg-[#3ACFFF] text-[#030b0d] px-7 py-3.5 rounded-xl font-semibold cursor-pointer border-none shadow-[0_4px_15px_rgba(58,207,255,0.4)] hover:shadow-[0_6px_20px_rgba(58,207,255,0.6)] transition-shadow">
    Continue Generating <TbArrowRight size={18} />
  </motion.button>
  <motion.button 
   whileHover={{y: -2}}
  whileTap={{scale:0.95}}
  className="flex items-center justify-center gap-2 border border-white/15 rounded-xl px-7 py-3.5 text-sm text-white/60 hover:text-white hover:border-white/25 transition-all cursor-pointer bg-transparent">
 <TbComponents size={18} className="text-white/70" />
 My Components
  </motion.button>
</div>
</>):(<>
<p className="text-white/40 mb-7 sm:mb-8 text-sm max-w-md mx-auto leading-relaxed">
Sign in with Google get 350 free credits and start generating production-ready UI components in seconds! 🤗
</p>
<div className="flex flex-cols sm:flex-row justify-center gap-3">
  <motion.button
  onClick={()=>setshowAuth(true)}
  whileHover={{y: -2, scale: 1.05}}
  whileTap={{scale:0.97}}
  className="flex items-center justify-center gap-2 bg-[#3ACFFF] text-[#030b0d] px-7 py-3.5 rounded-xl font-semibold cursor-pointer border-none shadow-[0_4px_15px_rgba(58,207,255,0.4)] hover:shadow-[0_6px_20px_rgba(58,207,255,0.6)] transition-shadow">
    Get Started For Free <TbArrowRight size={18} />
  </motion.button>
  <motion.button 
   whileHover={{y: -2}}
  whileTap={{scale:0.95}}
  className="flex items-center justify-center gap-2 border border-white/15 rounded-xl px-7 py-3.5 text-sm text-white/60 hover:text-white hover:border-white/25 transition-all cursor-pointer bg-transparent">
 <TbComponents size={18} className="text-white/70" />
  Components
  </motion.button>
</div>
</>)}
    </div>
  </motion.div>
</section>

      {showAuth && <Auth onClose={() => setshowAuth(false)} />}
    </div>
  );
}

export default Home;
