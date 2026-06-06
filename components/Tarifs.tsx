"use client";

import { motion } from "framer-motion";
import { InteractiveProductCard } from "@/components/ui/card-7";
import { SparklesText } from "@/components/ui/sparkles-text";

const tarifs = [
  {
    subtitle: "Pose et entretien",
    title: "Capsules américaines",
    imageUrl: "/d.jpeg",
    accentColor: "#fae38f",
    items: [
      { label: "Pose complète", price: "49 €" },
      { label: "Remplissage (3-4 sem.)", price: "39 €" },
      { label: "Dépose repose", price: "57 €" },
    ],
  },
  {
    subtitle: "Longue durée",
    title: "Semi-permanent",
    imageUrl: "/b.jpeg",
    accentColor: "#c1ff72",
    items: [
      { label: "Pose mains", price: "30 €" },
      { label: "Dépose repose", price: "38 €" },
    ],
  },
  {
    subtitle: "Retrait",
    title: "Dépose",
    imageUrl: "/i.jpg",
    accentColor: "#d2e8ff",
    items: [
      { label: "Dépose capsules", price: "15 €" },
      { label: "Dépose semi-perm.", price: "10 €" },
    ],
  },
  {
    subtitle: "Soin",
    title: "Manucure",
    imageUrl: "/h.jpeg",
    accentColor: "#fae38f",
    items: [
      { label: "Manucure seule", price: "15 €" },
    ],
  },
  {
    subtitle: "Options",
    title: "Suppléments",
    imageUrl: "/e.jpeg",
    accentColor: "#c1ff72",
    items: [
      { label: "French baby boomer", price: "+ 5 €" },
      { label: "Nail art / strass", price: "Sur devis" },
      { label: "Mariages et EVJF", price: "Sur devis" },
    ],
  },
];

export default function Tarifs() {
  return (
    <section id="prestations" className="py-20 bg-creme">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="mb-14"
        >
          <p className="text-encre text-xs font-normal tracking-widest uppercase mb-2">Ce que je propose</p>
          <h2 className="font-display text-4xl md:text-6xl">
            Mes <SparklesText text="tarifs" className="font-accent" colors={{ first: "#fae38f", second: "#c1ff72" }} />
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 items-stretch">
          {tarifs.map((card, i) => (
            <motion.div
              key={card.title}
              className="flex"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: i * 0.1 }}
            >
              <InteractiveProductCard {...card} className="w-full h-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
