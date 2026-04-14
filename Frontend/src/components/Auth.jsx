import React from 'react'
import { AnimatePresence, motion } from "motion/react"
import { GiCrossMark } from "react-icons/gi";

function Auth() {
  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        // Backdrop remains dark to pop the UI
        className='fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-50 p-4'>
        
        <motion.div 
          className='flex flex-col sm:flex-row w-full max-w-[880px] max-h-[90vh] overflow-y-auto rounded-2xl border border-[#3ACFFF]/20 shadow-[0_40px_80px_rgba(0,0,0,0.9)] relative bg-[#0A0F2C]'>
          
          {/* x button */}
          <button className='absolute top-3 right-3 z-20 w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/30 hover:text-white transition-all cursor-pointer'>
            <GiCrossMark size={15}/>
          </button>

          {/* left box - Applied Purple to Blue Gradient & Cyan Glow effect */}
          <div className='sm:w-[52%] bg-gradient-to-br from-[#9B5EFF] to-[#3ACFFF] p-6 sm:p-10 relative overflow-hidden flex flex-col justify-center items-center shadow-[inset_0_0_50px_rgba(111,231,255,0.3)]'>
             
        <div className=''/>
             
            
         
          </div>

          {/* right box - Dark Navy Blue Background */}
          <motion.div className='sm:w-[48%] bg-[#0A0F2C] p-6 sm:p-10'>
          
          </motion.div>

        </motion.div>

      </motion.div>
    </AnimatePresence>
  )
}

export default Auth