"use client"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Sparkles, Clock, Heart, Star, Scissors, Gem } from "lucide-react"
import { SparklesText } from "@/components/ui/sparkles-text"

const prestations = [
  { icon: Star, title: "Pose Gel", price: "dès 40€", desc: "Ongles allongés ou renforcés, finition impeccable. Tenue jusqu'à 3-4 semaines.", bg: "bg-ciel", size: "col-span-2 md:col-span-1 md:row-span-2", textSize: "text-2xl" },
  { icon: Sparkles, title: "Semi-permanent", price: "dès 30€", desc: "Couleur longue durée sur ongles naturels.", bg: "bg-or", size: "col-span-2 md:col-span-1", textSize: "text-xl" },
  { icon: Gem, title: "Nail Art personnalisé", price: "sur devis", desc: "Dessins, dégradés, effets 3D.", bg: "bg-lime", size: "col-span-2 md:col-span-1", textSize: "text-xl" },
  { icon: Clock, title: "Remplissage", price: "dès 25€", desc: "Entretien de ta pose gel toutes les 3-4 semaines.", bg: "bg-blanc", size: "col-span-2 md:col-span-1", textSize: "text-lg" },
  { icon: Scissors, title: "Dépose", price: "dès 15€", desc: "Dépose soignée sans abîmer tes ongles naturels.", bg: "bg-creme border border-encre/10", size: "col-span-2 md:col-span-1", textSize: "text-lg" },
  { icon: Heart, title: "Strass et Décos", price: "en supplément", desc: "Brillants, chrome, feuilles d'or, nail stickers.", bg: "bg-bordeaux text-blanc", size: "col-span-2 md:col-span-2", textSize: "text-xl", light: true },
]

function Card({ item, index }: { item: typeof prestations[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  const Icon = item.icon
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ type: "spring", stiffness: 100, damping: 20, delay: index * 0.08 }}
      className={`${item.size} ${item.bg} rounded-3xl p-6 md:p-8 flex flex-col justify-between min-h-[160px]`}>
      <Icon className={`size-6 mb-4 ${item.light ? "text-blanc/70" : "text-encre/40"}`} />
      <div>
        <h3 className={`font-display ${item.textSize} ${item.light ? "text-blanc" : ""} mb-1 leading-tight`}>{item.title}</h3>
        <p className={`text-xs mb-2 ${item.light ? "text-blanc/60" : "text-encre/50"}`}>{item.desc}</p>
        <span className={`text-sm font-bold ${item.light ? "text-or" : "text-bordeaux"}`}>{item.price}</span>
      </div>
    </motion.div>
  )
}

export default function Prestations() {
  return (
    <section id="prestations" className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 20 }} className="mb-12">
        <p className="text-encre text-xs font-normal tracking-widest uppercase mb-2">Ce que je propose</p>
        <h2 className="font-display text-4xl md:text-6xl">Mes <SparklesText text="prestations" className="font-accent" colors={{ first: "#fae38f", second: "#c1ff72" }} /></h2>
      </motion.div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[minmax(160px,auto)]">
        {prestations.map((item, i) => <Card key={item.title} item={item} index={i} />)}
      </div>
    </section>
  )
}
