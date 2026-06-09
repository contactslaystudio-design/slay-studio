"use client"
import { useState, useRef, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { MagnetizeButton } from "@/components/ui/magnetize-button"
import { SparklesText } from "@/components/ui/sparkles-text"
import { CheckCircle } from "lucide-react"

const prestationOptions = ["Pose complète capsules","Remplissage","Dépose repose","Semi-permanent","Dépose","Manucure","Mariage / EVJF","Autre"]

type Lieu = "domicile" | "bruna" | ""
type BlockedSlot = { date: string; heures: string[] }
type HorairesData = { domicile: Record<string, string[]>; bruna: string[]; blockedSlots?: BlockedSlot[] }
type FormData = { nom: string; tel: string; email: string; prestation: string; ville: string; date: string; heure: string; message: string }
const INITIAL: FormData = { nom: "", tel: "", email: "", prestation: "", ville: "", date: "", heure: "", message: "" }

function getJour(dateStr: string): string {
  if (!dateStr) return ""
  return String(new Date(dateStr + "T12:00:00").getDay())
}

export default function FormRDV() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [form, setForm] = useState<FormData>(INITIAL)
  const [lieu, setLieu] = useState<Lieu>("")
  const [errors, setErrors] = useState<Partial<FormData> & { lieu?: string }>({})
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [horairesData, setHorairesData] = useState<HorairesData | null>(null)

  useEffect(() => {
    fetch("/api/horaires").then(r => r.json()).then(setHorairesData)
  }, [])

  const jour = getJour(form.date)

  // Quels horaires afficher selon le lieu, le jour ET les blocages de la date
  const getHoraires = (): string[] => {
    if (!horairesData) return []
    let slots: string[] = []
    if (lieu === "bruna") slots = horairesData.bruna
    else if (lieu === "domicile") slots = horairesData.domicile[jour] ?? []

    if (!form.date || !horairesData.blockedSlots) return slots
    const blocked = horairesData.blockedSlots.find(b => b.date === form.date)
    if (!blocked) return slots
    if (blocked.heures.includes("all")) return [] // journée entière bloquée
    return slots.filter(h => !blocked.heures.includes(h))
  }

  const horaires = getHoraires()

  // Message info selon le jour choisi pour domicile
  const getJourInfo = (): string => {
    if (!form.date || lieu !== "domicile") return ""
    const noms: Record<string, string> = { "1":"Lundi","2":"Mardi","3":"Mercredi","4":"Jeudi","5":"Vendredi" }
    if (jour === "0" || jour === "6") return "⚠️ Je ne me déplace pas le week-end à domicile. Choisis une autre date ou sélectionne Chez Bruna le samedi."
    if (!noms[jour]) return "⚠️ Ce jour n'est pas disponible."
    return ""
  }

  const validate = () => {
    const e: Partial<FormData> & { lieu?: string } = {}
    if (!form.nom.trim()) e.nom = "Ton prénom est requis"
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Email invalide"
    if (!lieu) e.lieu = "Choisis un lieu"
    return e
  }

  const handleLieu = (l: Lieu) => {
    setLieu(l)
    setForm(f => ({ ...f, date: "", heure: "", ville: "" }))
    setErrors(e => ({ ...e, lieu: undefined }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, lieu: lieu === "bruna" ? "Chez Bruna Coiffure (Provin) — Samedi matin" : `À domicile — ${form.ville}` }),
      })
      if (res.ok) {
        setSent(true)
        setForm(INITIAL)
        setLieu("")
      } else {
        setError("Une erreur s'est produite. Réessaie ou contacte-moi directement.")
      }
    } catch {
      setError("Une erreur s'est produite. Réessaie ou contacte-moi directement.")
    } finally {
      setLoading(false)
    }
  }

  const field = (name: keyof FormData, label: string, type = "text", placeholder = "") => (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-encre/70">{label}</label>
      <input type={type} value={form[name]} onChange={e => { setForm(f => ({ ...f, [name]: e.target.value })); if ((errors as Record<string,unknown>)[name]) setErrors(er => ({ ...er, [name]: undefined })) }}
        placeholder={placeholder} className={`bg-blanc border ${(errors as Record<string,unknown>)[name] ? "border-bordeaux" : "border-encre/15"} rounded-xl px-4 py-3 text-sm text-encre placeholder:text-encre/30 outline-none focus:border-bordeaux transition-colors`} />
      {(errors as Record<string,string>)[name] && <p className="text-xs text-bordeaux">{(errors as Record<string,string>)[name]}</p>}
    </div>
  )

  return (
    <section id="rdv" className="py-20 px-4 md:px-8 bg-creme">
      <div className="max-w-2xl mx-auto">
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ type: "spring", stiffness: 100, damping: 20 }} className="mb-10">
          <p className="text-encre text-xs font-normal tracking-widest uppercase mb-2">On s&apos;organise</p>
          <h2 className="font-display text-4xl md:text-5xl">Prendre <SparklesText text="rendez-vous" className="font-accent" colors={{ first: "#fae38f", second: "#c1ff72" }} /></h2>
          <p className="text-encre/50 text-sm mt-3">Remplis le formulaire et tu recevras une confirmation par email.</p>
        </motion.div>

        {sent ? (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="bg-lime/30 border border-lime rounded-3xl p-10 text-center">
            <CheckCircle className="size-10 text-encre mx-auto mb-4" />
            <h3 className="font-display text-2xl mb-2">Demande envoyée !</h3>
            <p className="text-encre/60 text-sm">Tu vas recevoir un email de confirmation. Je reviens vers toi très vite 💅</p>
            <button onClick={() => setSent(false)} className="mt-6 text-sm text-bordeaux underline underline-offset-2">Faire une autre demande</button>
          </motion.div>
        ) : (
          <motion.form initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.15 }}
            onSubmit={handleSubmit} className="bg-blanc border border-encre/10 rounded-3xl p-8 flex flex-col gap-5 shadow-sm">

            {/* Infos de base */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {field("nom", "Prénom et nom *", "text", "Marie Dupont")}
              {field("tel", "Téléphone", "tel", "06 00 00 00 00")}
            </div>
            {field("email", "Email *", "email", "marie@email.com")}

            {/* Prestation */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-encre/70">Prestation souhaitée</label>
              <select value={form.prestation} onChange={e => setForm(f => ({ ...f, prestation: e.target.value }))}
                className="bg-blanc border border-encre/15 rounded-xl px-4 py-3 text-sm text-encre outline-none focus:border-bordeaux transition-colors">
                <option value="">Choisir…</option>
                {prestationOptions.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>

            {/* Choix du lieu */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-encre/70">Où souhaires-tu ton rendez-vous ?</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <button type="button" onClick={() => handleLieu("domicile")}
                  className={`flex flex-col items-start gap-1 rounded-2xl border-2 px-5 py-4 text-left transition-all ${lieu === "domicile" ? "border-bordeaux bg-bordeaux/5" : "border-encre/15 bg-blanc hover:border-encre/30"}`}>
                  <span className="text-base">🏠</span>
                  <span className="font-semibold text-sm text-encre">À mon domicile</span>
                  <span className="text-xs text-encre/50">Soir en semaine</span>
                </button>
                <button type="button" onClick={() => handleLieu("bruna")}
                  className={`flex flex-col items-start gap-1 rounded-2xl border-2 px-5 py-4 text-left transition-all ${lieu === "bruna" ? "border-bordeaux bg-bordeaux/5" : "border-encre/15 bg-blanc hover:border-encre/30"}`}>
                  <span className="text-base">💅</span>
                  <span className="font-semibold text-sm text-encre">Chez Bruna Coiffure</span>
                  <span className="text-xs text-encre/50">Samedi matin 9h–12h — Provin (59)</span>
                </button>
              </div>
              {errors.lieu && <p className="text-xs text-bordeaux">{errors.lieu}</p>}
            </div>

            {/* Ville — uniquement si domicile */}
            {lieu === "domicile" && (
              <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
                {field("ville", "Ta ville / adresse", "text", "Seclin (59)")}
              </motion.div>
            )}

            {/* Date */}
            {lieu !== "" && (
              <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} className="flex flex-col gap-1">
                <label className="text-sm font-medium text-encre/70">
                  {lieu === "bruna" ? "Date souhaitée (samedi uniquement)" : "Date souhaitée (lundi au vendredi)"}
                </label>
                <input type="date" value={form.date}
                  onChange={e => setForm(f => ({ ...f, date: e.target.value, heure: "" }))}
                  className="bg-blanc border border-encre/15 rounded-xl px-4 py-3 text-sm text-encre outline-none focus:border-bordeaux transition-colors" />
                {getJourInfo() && <p className="text-xs text-bordeaux mt-1">{getJourInfo()}</p>}
              </motion.div>
            )}

            {/* Horaires — apparaissent uniquement si le jour est valide */}
            {horaires.length > 0 && (
              <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} className="flex flex-col gap-2">
                <label className="text-sm font-medium text-encre/70">Heure souhaitée</label>
                <div className="flex flex-wrap gap-2">
                  {horaires.map(h => (
                    <button key={h} type="button" onClick={() => setForm(f => ({ ...f, heure: h }))}
                      className={`px-4 py-2 rounded-xl text-sm font-medium border-2 transition-all ${form.heure === h ? "border-bordeaux bg-bordeaux text-blanc" : "border-encre/15 text-encre hover:border-bordeaux/50"}`}>
                      {h}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Message */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-encre/70">Message (optionnel)</label>
              <textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                placeholder="Dis-moi ce que tu souhaites…" rows={3}
                className="bg-blanc border border-encre/15 rounded-xl px-4 py-3 text-sm text-encre placeholder:text-encre/30 outline-none focus:border-bordeaux transition-colors resize-none" />
            </div>

            {error && <p className="text-sm text-bordeaux">{error}</p>}
            <MagnetizeButton type="submit" disabled={loading} label={loading ? "Envoi en cours…" : "Envoyer ma demande"} className="w-full" />
          </motion.form>
        )}
      </div>
    </section>
  )
}
