import React, { useEffect, useState } from "react";
import { AnimatePresence, easeInOut, motion } from "motion/react";
import { GiCrossMark } from "react-icons/gi";
import { FcGoogle } from "react-icons/fc";
import {
  TbLetterS,
  TbLogin2,
  TbSettings,
  TbCopy,
  TbDownload,
} from "react-icons/tb";
import { HiSparkles } from "react-icons/hi2";
import { auth ,provider} from "../utils/firebase";
import { signInWithPopup } from "firebase/auth";
import axios from "axios";
import { serverUrl } from "../utils/api";

const steps = [
  {
    icon: TbLogin2,
    title: "Login with Google",
    desc: "Secure OAuth to unlock all AI tools instantly.",
  },
  {
    icon: HiSparkles,
    title: "Get 350 AI Credits",
    desc: "Free credits to generate premium UI components.",
  },
  {
    icon: TbSettings,
    title: "Customize Props",
    desc: "Fine-tune and preview every change live.",
  },
  {
    icon: TbCopy,
    title: "Generate Components",
    desc: "AI builds production-ready JSX components.",
  },
  {
    icon: TbDownload,
    title: "Copy or Save",
    desc: "Export clean code straight into your project.",
  },
];

function Auth({ onClose }) {
  const [Active, setActive] = useState(0);
  useEffect(() => {
    const id = setInterval(
      () => setActive((s) => (s + 1) % steps.length),
      2400,
    );
    return () => clearInterval(id);
  }, []);
const googleAuth= async()=>{
    try {
        const res= await signInWithPopup(auth,provider)
        let user = res.user
        let name = user.displayName
        let email = user.email
        const result =await axios.post(serverUrl+"/api/auth/register",{name,email},{withCredentials:true})
        console.log(result.data);
        
        
    } catch (error) {
        console.log(error);
        
    }

}
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 flex items-start sm:items-center justify-center bg-black/80 backdrop-blur-sm z-50 p-2 sm:p-4 overflow-y-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 28, scale: 0.95 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row w-full max-w-[880px] max-h-[calc(100vh-1rem)] sm:max-h-none rounded-2xl border border-[#3ACFFF]/20 shadow-[0_40px_80px_rgba(0,0,0,0.9)] relative bg-[#0A0F2C] overflow-y-auto sm:overflow-hidden"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-20 w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/30 hover:text-white transition-all"
          >
            <GiCrossMark size={15} />
          </button>

          {/* LEFT BOX */}
          <div className="w-full sm:w-[52%] min-h-[260px] bg-gradient-to-br from-[#9B5EFF] to-[#3ACFFF] p-6 sm:p-10 relative flex flex-col items-center justify-center overflow-hidden">
            {/* Glow */}
            <div className="absolute -top-10 -right-10 w-40 h-40 sm:w-64 sm:h-64 rounded-full bg-[radial-gradient(circle_at_center,_rgba(111,231,255,0.3)_0%,_rgba(111,231,255,0)_100%)] pointer-events-none" />

            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#3be8ff] to-[#0ab5d4] flex items-center justify-center shadow-[0_4px_12px_rgba(58,207,255,0.5)]">
                <TbLetterS className="text-white text-lg" />
              </div>
              <span
                className="text-lg sm:text-xl font-bold text-[#e8f8fa]"
                style={{ fontFamily: "'Syne',sans-serif" }}
              >
                SnappyUI
              </span>
            </motion.div>

            <p className="text-[#e8f8fa] text-sm sm:text-base mb-3">
              How it Works
            </p>

            {/* STEPS */}
            <div className="flex flex-row sm:flex-col gap-2 w-full overflow-x-auto sm:overflow-visible pb-2">
              {steps.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  onClick={() => setActive(i)}
                  className={`flex items-center gap-3 p-3 rounded-lg min-w-[140px] sm:min-w-0 shrink-0 ${
                    Active === i ? "bg-white/10" : "bg-white/5"
                  } cursor-pointer`}
                >
                  <div
                    className={`w-10 h-10 rounded-md flex items-center justify-center ${
                      Active === i
                        ? "bg-gradient-to-tr from-[#3be8ff] to-[#0ab5d4] shadow-[0_4px_12px_rgba(58,207,255,0.5)]"
                        : "bg-white/20"
                    }`}
                  >
                    <s.icon
                      size={16}
                      className={Active === i ? "text-white" : "text-white/50"}
                    />
                  </div>

                  <div className="flex flex-col">
                    <p
                      className={`text-sm ${Active === i ? "text-white" : "text-white/50"}`}
                    >
                      {s.title}
                    </p>

                    {Active === i && (
                      <p className="text-xs text-white/80">{s.desc}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* RIGHT BOX */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="sm:w-[48%] bg-[#0E1630] px-6 sm:px-10 py-8 sm:py-12 flex flex-col justify-center items-center relative overflow-hidden"
          >
            {/* Background Grid */}
            <div
              className="absolute inset-0 pointer-events-none 
                  [background-size:32px_32px] 
                  [background-image:linear-gradient(to_right,#1f2a4a_1px,transparent_1px),linear-gradient(to_bottom,#1f2a4a_1px,transparent_1px)]"
            ></div>

            {/* Content */}
            <div className="relative z-10 w-full max-w-[280px] sm:w-[260px] text-center mx-auto">
              {/* Tera content yaha */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: easeInOut }}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl mx-auto mb-5 sm:mb-6 
  bg-gradient-to-br from-[#3be8ff] to-[#6366f1] 
  border border-[#3be8ff]/20 flex items-center justify-center shadow-lg shadow-[#3be8ff]/20"
              >
                <TbLetterS size={22} className="text-white text-lg" />
              </motion.div>
              <h3
                className="text-xl ffont-bold text-[#e8f8fa] tracking-tight mb-2 "
                style={{ fontFamily: "'Syne',sans-serif" }}
              >
                Welcome
              </h3>
              <p className="text-sm text-[#e8f8fa]/80 mb-6">
                Login to access your personalized SnappyUI dashboard and unleash
                the full potential of AI-powered UI generation.
              </p>
              <div className="flex justify-center gap-4 sm:gap-5 mb-6 sm:mb-7">
                {[["350 AI Credits"], ["100+ Components"], ["JSX Ready"]].map(
                  (s, i) => (
                    <div key={i} className="flex flex-col items-center gap-1">
                      <div className="w-9 h-9 rounded-md bg-gradient-to-tr from-[#3be8ff] to-[#0ab5d4] flex items-center justify-center shadow-[0_4px_12px_rgba(58,207,255,0.5)]">
                        <TbLetterS className="text-white text-sm" />
                      </div>
                      <p className="text-xs text-[#e8f8fa]/80">{s[0]}</p>
                    </div>
                  ),
                )}
              </div>
              <motion.button
                onClick={googleAuth}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-[#3be8ff] to-[#6366f1] text-white py-3 px-6 rounded-lg shadow-lg shadow-[#3be8ff]/20"
              >
                <FcGoogle size={18} className="inline-block mr-2 -mt-1" />
                Continue with Google
              </motion.button>
              <p className="text-[11px] text-[#e8f8fa]/80 mt-4 sm:mt-5">
                No account needed for npm.{" "}
                <span
                  onClick={onClose}
                  className="text-[#3be8ff]/50 border-b border-[#3be8ff]/20 cursor-pointer hover:text-[#3be8ff]/80 transition-colors"
                >
                  View docs
                </span>
              </p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
export default Auth;
