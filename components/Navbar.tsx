"use client"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { MagnetizeButton } from "@/components/ui/magnetize-button"

const links = [
  { label: "Prestations", href: "#prestations" },
  { label: "Déplacements", href: "#deplacements" },
  { label: "Occasions", href: "#occasions" },
  { label: "Avis", href: "#avis" },
  { label: "Contact", href: "#rdv" },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <motion.nav initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-creme/95 backdrop-blur-md shadow-sm border-b border-encre/5" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-28 md:h-24 flex items-center justify-between">
        <a href="#">
          <img src="/7.svg" alt="Slay Studio" className="h-28 md:h-36 w-auto" style={{ imageRendering: "auto" }} />
        </a>

        {/* Liens desktop uniquement */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <li key={l.href}>
              <a href={l.href} className="text-sm font-medium text-encre/70 hover:text-encre transition-colors">{l.label}</a>
            </li>
          ))}
        </ul>

        {/* Bouton RDV — visible sur tous les écrans */}
        <MagnetizeButton
          label="Prendre RDV"
          onClick={() => document.getElementById("rdv")?.scrollIntoView({ behavior: "smooth" })}
        />
      </div>
    </motion.nav>
  )
}
