"use client"
import { motion } from "framer-motion"
import { MapPin, Clock } from "lucide-react"
import { SparklesText } from "@/components/ui/sparkles-text"

const villes = ["Annœullin","Provin","Seclin","Carvin","Lens","Hénin-Beaumont","Libercourt","Leforest","Attiches","Wahagnies","Gondecourt","Carnin","Camphin-en-Carembault"]

export default function Deplacements() {
  return (
    <section id="deplacements" className="py-20 bg-blanc">
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 20 }}>
          <p className="text-encre text-xs font-normal tracking-widest uppercase mb-2">Zone d&apos;intervention</p>
          <h2 className="font-display text-4xl md:text-5xl mb-6">Je viens <SparklesText text="chez toi" className="font-accent" colors={{ first: "#fae38f", second: "#d2e8ff" }} /></h2>
          <p className="text-encre/60 text-lg mb-8 leading-relaxed">Déplacement sans supplément dans un rayon de <strong>20 km autour d&apos;Annœullin</strong> (59112).</p>
          <div className="flex flex-col gap-4 mb-8">
            <div className="flex items-start gap-3"><Clock className="size-5 text-or mt-0.5 shrink-0" /><div><p className="font-semibold text-encre">Soir en semaine</p><p className="text-sm text-encre/50">À domicile, sur rendez-vous</p></div></div>
            <div className="flex items-start gap-3"><MapPin className="size-5 text-or mt-0.5 shrink-0" /><div><p className="font-semibold text-encre">Samedi matin — Salon Bruna Coiffure, Provin (59)</p><p className="text-sm text-encre/50">De 9h00 à 12h00, sur rendez-vous</p></div></div>
          </div>
          <div className="flex flex-wrap gap-2">
            {villes.map(v => <span key={v} className="bg-creme text-encre text-xs font-medium px-3 py-1.5 rounded-full border border-encre/10">{v}</span>)}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }} className="flex items-center justify-center">
          <div className="relative w-72 h-72 md:w-96 md:h-96">
            {[1, 0.75, 0.5, 0.25].map((scale, i) => <div key={i} className="absolute inset-0 rounded-full border border-bordeaux/20" style={{ transform: `scale(${scale})`, transformOrigin: "center" }} />)}
            <motion.div className="absolute inset-0" animate={{ rotate: 360 }} transition={{ duration: 6, repeat: Infinity, ease: "linear" }}>
              <div className="absolute left-1/2 top-1/2 w-1/2 origin-left h-0.5" style={{ background: "linear-gradient(90deg, #861519, transparent)", transform: "translateY(-50%)" }} />
            </motion.div>
            <div className="absolute inset-0 rounded-full bg-bordeaux/5" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <motion.div animate={{ scale: [1, 1.6, 1] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="absolute inset-0 rounded-full bg-bordeaux/30" />
                <div className="relative w-4 h-4 rounded-full bg-bordeaux shadow-md" />
              </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center mt-10">
              <span className="text-xs font-semibold text-bordeaux bg-blanc px-2 py-0.5 rounded-full shadow-sm mt-6">Annœullin</span>
            </div>
            <div className="absolute top-2 left-1/2 -translate-x-1/2"><span className="text-xs text-encre/40 font-medium">20 km</span></div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
