"use client";

import { motion } from "framer-motion";
import { SparklesText } from "@/components/ui/sparkles-text";
import { Star } from "lucide-react";

const avis = [
  {
    nom: "Léa M.",
    note: 5,
    date: "il y a 2 semaines",
    texte: "Trop contente de ma pose ! Ça fait déjà 3 semaines et mes ongles sont toujours impeccables. Je recommande à 100% 💅",
    prestation: "Capsules américaines",
  },
  {
    nom: "Camille R.",
    note: 5,
    date: "il y a 1 mois",
    texte: "Super accueil, très à l'écoute de ce que je voulais. Le nail art est exactement ce que j'avais demandé. Je ferai appel à Slay Studio sans hésiter !",
    prestation: "Nail art personnalisé",
  },
  {
    nom: "Jade T.",
    note: 5,
    date: "il y a 3 semaines",
    texte: "J'ai pris un semi-permanent et c'est vraiment propre et soigné. Elle se déplace à domicile ce qui est super pratique. Merci encore !",
    prestation: "Semi-permanent",
  },
  {
    nom: "Manon B.",
    note: 5,
    date: "il y a 2 mois",
    texte: "On a fait notre EVJF avec les ongles faits par Slay Studio, toutes les copines étaient ravies ! Ambiance top et travail de qualité.",
    prestation: "EVJF",
  },
  {
    nom: "Sarah D.",
    note: 5,
    date: "il y a 1 semaine",
    texte: "Très professionnelle et rapide. Mes ongles sont magnifiques, plein de compliments depuis ! À recommander sans modération 🌟",
    prestation: "Capsules américaines",
  },
  {
    nom: "Inès L.",
    note: 5,
    date: "il y a 1 mois",
    texte: "Première fois que je fais des capsules et j'adore le résultat ! Elle prend le temps d'expliquer et c'est vraiment agréable.",
    prestation: "Capsules américaines",
  },
];

export default function Avis() {
  return (
    <section className="py-20 bg-blanc" id="avis">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="mb-14"
        >
          <p className="text-encre text-xs font-normal tracking-widest uppercase mb-2">Ce qu&apos;elles disent</p>
          <h2 className="font-display text-4xl md:text-6xl">
            Avis <SparklesText text="clientes" className="font-accent" colors={{ first: "#fae38f", second: "#c1ff72" }} />
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {avis.map((a, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: i * 0.08 }}
              className="bg-creme rounded-3xl p-6 flex flex-col gap-4 border border-encre/5 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-or flex items-center justify-center font-display text-encre font-bold text-sm">
                    {a.nom.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-encre text-sm">{a.nom}</p>
                    <p className="text-xs text-encre/40">{a.date}</p>
                  </div>
                </div>
                {/* Étoiles */}
                <div className="flex gap-0.5">
                  {Array.from({ length: a.note }).map((_, j) => (
                    <Star key={j} className="size-3.5 fill-or text-or" />
                  ))}
                </div>
              </div>

              {/* Texte */}
              <p className="text-sm text-encre/70 leading-relaxed">{a.texte}</p>

              {/* Badge prestation */}
              <span className="self-start text-xs font-medium px-3 py-1 rounded-full bg-blanc border border-encre/10 text-encre/50">
                {a.prestation}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
