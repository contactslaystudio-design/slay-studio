"use client"
import { motion } from "framer-motion"
import { Heart, Users, Cake, Star } from "lucide-react"
import { SparklesText } from "@/components/ui/sparkles-text"

const occasions = [
  { icon: Heart, title: "Mariage", desc: "Ongles parfaits pour ton grand jour. Formules mariée + témoins disponibles sur devis.", accent: "text-or", border: "border-or/30" },
  { icon: Users, title: "EVJF", desc: "Une expérience beauté collective mémorable. Devis de groupe sur demande.", accent: "text-or", border: "border-or/30" },
  { icon: Cake, title: "Anniversaire", desc: "Offre un moment de glamour à celles que tu aimes. Bons cadeau disponibles.", accent: "text-or", border: "border-or/30" },
  { icon: Star, title: "Fêtes et Événements", desc: "Soirée de Noël, réveillon, fête de fin d'année — arrive avec des ongles qui brillent.", accent: "text-or", border: "border-or/20" },
]

export default function Occasions() {
  return (
    <section id="occasions" className="py-20 bg-ciel">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 20 }} className="mb-12 text-center md:text-left">
          <p className="text-encre text-xs font-normal tracking-widest uppercase mb-2">Pour chaque moment</p>
          <h2 className="font-display text-4xl md:text-6xl">Les grandes <SparklesText text="occasions" className="font-accent" colors={{ first: "#fae38f", second: "#c1ff72" }} /></h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {occasions.map((o, i) => {
            const Icon = o.icon
            return (
              <motion.div key={o.title} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 20, delay: i * 0.1 }}
                className={`border ${o.border} rounded-3xl p-8 bg-white/40 hover:bg-white/60 transition-colors`}>
                <Icon className={`size-8 ${o.accent} mb-4`} />
                <h3 className="font-display text-2xl text-encre mb-2">{o.title}</h3>
                <p className="text-encre/60 text-sm leading-relaxed">{o.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
