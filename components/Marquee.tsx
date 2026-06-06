"use client"
import { motion } from "framer-motion"
const items = ["Pose Gel","Semi-Permanent","Nail Art","Remplissage","Mariages","EVJF","Déplacements à domicile","Nord (59)","Strass et Décorations","Sur mesure"]
export default function Marquee() {
  const doubled = [...items, ...items]
  return (
    <div className="bg-bordeaux py-4 overflow-hidden w-full">
      <motion.div className="flex gap-8 whitespace-nowrap" animate={{ x: ["0%", "-50%"] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-8 text-blanc text-sm font-semibold uppercase tracking-widest shrink-0">
            {item}<span className="text-or">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}
