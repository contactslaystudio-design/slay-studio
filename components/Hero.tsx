"use client"
import { motion } from "framer-motion"
import { MagnetizeButton } from "@/components/ui/magnetize-button"
import { SparklesText } from "@/components/ui/sparkles-text"
import { StackedCardsInteraction } from "@/components/ui/stacked-cards-interaction"
import { ArrowDown } from "lucide-react"

const blobs = [
  { color: "#d2e8ff", x: "55%", y: "5%", size: 400 },
  { color: "#fae38f", x: "70%", y: "30%", size: 320 },
  { color: "#c1ff72", x: "75%", y: "80%", size: 350 },
  { color: "#861519", x: "60%", y: "75%", size: 280 },
]

const nailCards = [
  { image: "/g.jpeg", title: "Nail Art Personnalisé", description: "Designs uniques créés sur mesure pour toi" },
  { image: "/c.jpeg", title: "Capsules américaines", description: "Tenue impeccable jusqu'à 3-4 semaines" },
  { image: "/a.jpeg", title: "Semi-Permanent", description: "Couleur longue durée sur ongles naturels" },
]

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] bg-creme">
      <div className="hidden md:block absolute inset-0 overflow-visible">
        {blobs.map((blob, i) => (
          <motion.div key={i} className="absolute rounded-full opacity-60 blur-3xl pointer-events-none"
            style={{ backgroundColor: blob.color, width: blob.size, height: blob.size, left: blob.x, top: blob.y }}
            animate={{ x: [0, 20, -15, 10, 0], y: [0, -15, 20, -10, 0], scale: [1, 1.08, 0.95, 1.04, 1] }}
            transition={{ duration: 8 + i * 1.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }} />
        ))}
      </div>

      <div className="md:hidden absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-0 w-64 h-64 rounded-full opacity-40 blur-3xl" style={{ backgroundColor: "#d2e8ff" }} />
        <div className="absolute bottom-40 left-0 w-48 h-48 rounded-full opacity-30 blur-3xl" style={{ backgroundColor: "#fae38f" }} />
      </div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 min-h-[100dvh]">
        <div className="relative z-10 flex flex-col justify-center items-start text-left px-4 md:px-8 pt-36 pb-12 md:pt-32">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
            className="font-display text-5xl md:text-7xl leading-none mb-4">
            Tes ongles.<br />
            <SparklesText text="Ton style." className="font-accent" colors={{ first: "#fae38f", second: "#c1ff72" }} /><br />
            Sublimés.
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.35 }}
            className="text-encre/60 text-base md:text-lg max-w-sm mb-8 leading-relaxed">
            Pose gel, semi-permanent et nail art sur mesure. Je me déplace chez toi dans un rayon de 20 km autour d&apos;Annœullin. Présente également le samedi matin chez Bruna Coiffure à Provin.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-3 w-full justify-center md:justify-start">
            <MagnetizeButton label="Réserver maintenant" particleCount={16} className="w-full sm:w-auto"
              onClick={() => document.getElementById("rdv")?.scrollIntoView({ behavior: "smooth" })} />
            <MagnetizeButton className="bg-ciel hover:bg-ciel/80 border-ciel/60 w-full sm:w-auto" particleClassName="bg-ciel"
              onClick={() => document.getElementById("prestations")?.scrollIntoView({ behavior: "smooth" })}>
              Voir les prestations <ArrowDown className="size-4 inline-block" />
            </MagnetizeButton>
          </motion.div>
        </div>

        <div className="relative hidden md:flex items-center justify-center">
          <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="relative z-10">
            <StackedCardsInteraction cards={nailCards} spreadDistance={45} rotationAngle={6} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
