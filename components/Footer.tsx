"use client"
import { Instagram, Mail, MapPin, Moon, Scissors } from "lucide-react"
export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="text-blanc py-16 px-4 md:px-8 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          <div>
            <img src="/6.svg" alt="Slay Studio" className="h-24 w-auto mb-3 brightness-0 invert" />
            <p className="text-blanc/40 text-sm leading-relaxed max-w-xs">Nail artist indépendante à domicile dans le Nord (59). Pose gel, semi-permanent, nail art personnalisé.</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-blanc/40 mb-4">Infos pratiques</h3>
            <ul className="flex flex-col gap-3 text-sm text-blanc/70">
              <li className="flex items-start gap-2"><MapPin className="size-4 shrink-0 mt-0.5 text-or" />Déplacement à domicile</li>
              <li className="flex items-start gap-2"><Moon className="size-4 shrink-0 mt-0.5 text-or" />Soir en semaine</li>
              <li className="flex items-start gap-2"><Scissors className="size-4 shrink-0 mt-0.5 text-or" />Salon Bruna Coiffure, Provin (59)</li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-blanc/40 mb-4">Contact</h3>
            <ul className="flex flex-col gap-3 text-sm text-blanc/70">
              <li><a href="mailto:contact.slaystudio@gmail.com" className="flex items-center gap-2 hover:text-blanc transition-colors"><Mail className="size-4 text-or" />contact.slaystudio@gmail.com</a></li>
              <li><a href="https://instagram.com/sl.aystudio" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-blanc transition-colors"><Instagram className="size-4 text-or" />@sl.aystudio</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-blanc/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-blanc/25">
          <p>&copy; {year} Slay Studio — Tous droits réservés</p>
          <p>Nail art à domicile · Nord (59) · Annœullin · Provin · Seclin</p>
        </div>
      </div>
    </footer>
  )
}
