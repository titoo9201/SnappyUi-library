import React from 'react'
import { AnimatePresence, motion } from "motion/react";
import {
  FiCpu,FiSave, FiEye, FiCode, FiUploadCloud, FiArrowRight,
  FiLoader, FiPackage, FiAlertCircle, FiCheckCircle,
  FiLayers, FiArrowLeft, FiRefreshCw, FiPlus,
  FiZap,
} from "react-icons/fi";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
const Toast=({message,type,onClose})=>{
  return (
    <motion.div></motion.div>
  )
}

function Generate() {
    const {userData}=useSelector((state)=>state.user)
    const userRole=userData?.role
    const aicredits=userData?.credits
    const lowCredits=userRole==="user"&& aicredits<15
    const navigate = useNavigate()
    const [prompt,setPrompt]=useState("")
    const [generated,setGenerated]=useState(null)
    const [generating,setGenerating]=useState(false)
    const handleGenerate=async()=>{
      try{

      }catch(err){

      }
    }
  return (
    <div
      className="min-h-screen text-white relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)"
      }}
    >

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(45deg, rgba(255, 255, 255, 0.08) 25%, transparent 25%), linear-gradient(-45deg, rgba(255, 255, 255, 0.08) 25%, transparent 25%)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Glow Effects */}
      <div
        className="absolute top-[-10%] left-[-5%] w-96 h-96 rounded-full pointer-events-none opacity-30"
        style={{
          background:
            "radial-gradient(circle at center, #6366f1 0%, transparent 70%)",
          filter: "blur(120px)",
        }}
      />

      <div
        className="absolute bottom-[-10%] right-[-5%] w-80 h-80 rounded-full pointer-events-none opacity-25"
        style={{
          background:
            "radial-gradient(circle at center, #8b5cf6 0%, transparent 70%)",
          filter: "blur(120px)",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto py-12 px-4">

        {/* Heading Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >

          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 backdrop-blur-md"
            style={{
              background: "rgba(255, 255, 255, 0.08)",
              border: "1px solid rgba(255, 255, 255, 0.15)"
            }}
          >
            <FiCpu size={14} className="text-indigo-400" />
            <span className="text-xs font-semibold tracking-wider text-indigo-300">
              Component Studio
            </span>
          </div>

          {/* Title */}
          <h2 className="text-5xl font-bold mb-4 leading-tight">
            <span className="text-white">Build with</span>{" "}
            <span
              className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent"
            >
              ease
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-gray-400 text-sm max-w-xl mx-auto">
            Generate, preview and export beautiful UI components instantly.
          </p>

        </motion.div>
        {
            userRole==="user"&& (
                <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className ="flex justify-end mb-4 "
                >
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl"
                    style={{background:lowCredits?"rgba(255, 0, 0, 0.08)":"rgba(255, 255, 255, 0.08)",border:lowCredits?"1px solid rgba(255, 0, 0, 0.5)":"1px solid rgba(255, 255, 255, 0.15)"}}>
                         <FiZap size={13} style={{color:lowCredits?"#ff0000":"#ffffff"}}/>
                         <span className="text-xs font-semibold" style={{color:lowCredits?"#ff0000":"#ffffff"}}>
                           {aicredits} Credits Left
                         </span>
                         <button className="flex items-center justify-center w-5 h-5 rounded-md transition-all cursor-pointer border-none"
                         style={{background:lowCredits?"rgba(255, 0, 0, 0.5)":"rgba(255, 255, 255, 0.5)"}}
                     
                         onClick={()=>navigate("/pricing")} 
                         >
                            <FiPlus size={10} style={{color:lowCredits?"#ff0000":"#ffffff"}}/>

                         </button>
                    </div>
                </motion.div>
            )
        }
        {
            lowCredits&&(
                <motion.div className ="flex items-center gap-3 px-4 py-3 rounded-2xl mb-5"
                style={{background:"rgba(255, 0, 0, 0.08)",border:"1px solid rgba(255, 0, 0, 0.5)"}}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}>
                    <FiAlertCircle size={18} style={{color:"#ff0000"}}/>
                    <p className="text-sm text-red-400">
                        You need at least <span className="font-bold text-red-400">15 Credits</span> to generate components. Please purchase more credits to continue using the AI generation feature.
                    </p>
                    <button 
                        onClick={()=>navigate("/pricing")}
                    className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer border-none whitespace-nowrap"
                    style={{background:"rgba(255, 0, 0, 0.5)"}}>
                        <span style={{color:"#ff0000"}}>Buy Credits</span>
                        <FiArrowRight size={12} style={{color:"#ff0000"}}/>
                        
                    </button>

                </motion.div>
            )
           
   
        }
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="rounded-2xl p-1 mb-8"
        style={{background: "rgba(255, 255, 255, 0.08)", border: `1px solid${lowCredits?" rgba(255, 0, 0, 0.5)":" rgba(255, 255, 255, 0.15)"}`,opacity:lowCredits?0.6:1}}

        >
            <div className="flex items-start gap-3 p-4">
                <FiCode size={20} className="text-indigo-400 mt-1" />
                <textarea
                value={prompt}
                onChange={(e)=>setPrompt(e.target.value)}
                row={3}
                disabled={lowCredits}
                placeholder={lowCredits ? "Insufficient credits to generate components." : "A glassmorphism pricing card with a toggle for monthly/yearly billing..."} className="w-full bg-transparent text-white placeholder-white/50 text-[15px] resize-none outline-none leading-relaxed disaabled:cursor-not-allowed" />
            </div>
            <div className="flex items-center justify-between px-4 pb-3">
                <span className="text-xs text-white/20">
                Ctrl + Enter to Generate
                </span>
                <motion.button 
                whileTap={{scale:0.95}}
                disabled={generating || lowCredits||!prompt.trim()}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed tansition-all"
                style={{background:generating?"rgba(255, 255, 255, 0.2)":"rgba(255, 255, 255, 0.5)",boxShadow:generating?"none":"0 4px 14px rgba(255, 255, 255, 0.3)"}}
                >
                {
                  generating?(
                    <motion.span
                    animate={{rotate:360}}
                    transition={{repeat:Infinity,duration:1,ease:"linear"}}
                    className="inline-block"
                    >
                      <FiLoader size={16}/>
                    </motion.span>
                  ):( <FiZap size={16} className="text-white"/> )
                }{generating?"Generating...":"Generate"}
                </motion.button>
            </div>
        </motion.div>
      </div>

{
  !generated&& !generating &&(
    <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.3 }}
    className="text-center py-16">
      <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
      style={{background:"rgba(255, 255, 255, 0.08)",border:"1px solid rgba(255, 255, 255, 0.15)"}}
      >
        <FiCpu size={24} className="text-indigo-400"/>
      </div>
      <p className="text-white/20 text-sm"> Describe your component above and hit Generate! </p>
    </motion.div>
  )
}
{
  generating&&(
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
     className=" text-center py-16">
      <motion.div 
      style={{borderTopColor:"#6366f1",borderRightColor:"#6366f1",}}
      className="w-12 h-12 rounded-full border-2 border-transparent mx-auto mb-4"
        animate={{rotate:360}}
        transition={{repeat:Infinity,duration:1,ease:"linear"}}
      
      />
      <p className='text-white/30 text-sm '>
      Generating your component...
      </p>

    </motion.div>
  )
}
    </div>
  );
}

export default Generate;