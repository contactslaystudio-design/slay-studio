"use client"
import { useState, useEffect } from "react"

const JOURS_NOM: Record<string, string> = {
  "1": "Lundi", "2": "Mardi", "3": "Mercredi", "4": "Jeudi", "5": "Vendredi",
}
const JOURS_COURT = ["Di", "Lu", "Ma", "Me", "Je", "Ve", "Sa"]
const MOIS = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"]

const TOUS_DOMICILE: Record<string, string[]> = {
  "1": ["19:00","19:30","20:00"],
  "2": ["18:00","18:30","19:00","20:00"],
  "3": ["17:30","18:00","18:30","19:00","20:00"],
  "4": ["18:00","18:30","19:00","19:30","20:00"],
  "5": ["17:30","18:00","18:30","19:00"],
}
const TOUS_BRUNA = ["09:00","09:30","10:00","10:30","11:00","11:30"]

type HoraireDefaut = { domicile: Record<string, string[]>; bruna: string[] }
type BlockedSlot = { date: string; heures: string[] } // heures: ["all"] = journée entière
type Horaires = HoraireDefaut & { blockedSlots: BlockedSlot[] }

function toDateStr(d: Date) {
  return d.toISOString().split("T")[0]
}

function getJour(dateStr: string) {
  return String(new Date(dateStr + "T12:00:00").getDay())
}

export default function AdminPage() {
  const [password, setPassword] = useState("")
  const [authenticated, setAuthenticated] = useState(false)
  const [authError, setAuthError] = useState("")
  const [horaires, setHoraires] = useState<Horaires | null>(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [tab, setTab] = useState<"calendrier" | "defaut">("calendrier")
  const [calDate, setCalDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<string | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch("/api/horaires")
    const data = await res.json()
    const test = await fetch("/api/horaires", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, horaires: data }),
    })
    if (test.ok) {
      setHoraires({ ...data, blockedSlots: data.blockedSlots ?? [] })
      setAuthenticated(true)
    } else {
      setAuthError("Mot de passe incorrect")
    }
  }

  useEffect(() => {
    if (authenticated) {
      fetch("/api/horaires").then(r => r.json()).then(d =>
        setHoraires({ ...d, blockedSlots: d.blockedSlots ?? [] })
      )
    }
  }, [authenticated])

  const handleSave = async () => {
    setSaving(true)
    const res = await fetch("/api/horaires", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, horaires }),
    })
    setSaving(false)
    if (res.ok) setSaved(true)
  }

  // --- Calendrier ---
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    return { firstDay, daysInMonth, year, month }
  }

  const getBlockedForDate = (dateStr: string): BlockedSlot | undefined =>
    horaires?.blockedSlots.find(b => b.date === dateStr)

  const getSlotsForDate = (dateStr: string): string[] => {
    const jour = getJour(dateStr)
    if (jour === "6") return TOUS_BRUNA // samedi = Bruna
    return TOUS_DOMICILE[jour] ?? []
  }

  const isDateDisponible = (dateStr: string): boolean => {
    const jour = getJour(dateStr)
    if (jour === "0") return false // dimanche
    const slots = getSlotsForDate(dateStr)
    return slots.length > 0
  }

  const toggleSlot = (dateStr: string, heure: string) => {
    if (!horaires) return
    const existing = horaires.blockedSlots.find(b => b.date === dateStr)
    let newBlocked: BlockedSlot[]
    if (existing) {
      if (existing.heures.includes(heure)) {
        // débloquer
        const newHeures = existing.heures.filter(h => h !== heure)
        if (newHeures.length === 0) {
          newBlocked = horaires.blockedSlots.filter(b => b.date !== dateStr)
        } else {
          newBlocked = horaires.blockedSlots.map(b => b.date === dateStr ? { ...b, heures: newHeures } : b)
        }
      } else {
        // bloquer
        newBlocked = horaires.blockedSlots.map(b => b.date === dateStr ? { ...b, heures: [...b.heures, heure] } : b)
      }
    } else {
      newBlocked = [...horaires.blockedSlots, { date: dateStr, heures: [heure] }]
    }
    setHoraires({ ...horaires, blockedSlots: newBlocked })
    setSaved(false)
  }

  const toggleJournee = (dateStr: string) => {
    if (!horaires) return
    const existing = horaires.blockedSlots.find(b => b.date === dateStr)
    let newBlocked: BlockedSlot[]
    if (existing?.heures.includes("all")) {
      newBlocked = horaires.blockedSlots.filter(b => b.date !== dateStr)
    } else {
      newBlocked = [
        ...horaires.blockedSlots.filter(b => b.date !== dateStr),
        { date: dateStr, heures: ["all"] }
      ]
    }
    setHoraires({ ...horaires, blockedSlots: newBlocked })
    setSaved(false)
  }

  const toggleDomicile = (jour: string, heure: string) => {
    if (!horaires) return
    const current = horaires.domicile[jour] ?? []
    const next = current.includes(heure) ? current.filter(x => x !== heure) : [...current, heure].sort()
    setHoraires({ ...horaires, domicile: { ...horaires.domicile, [jour]: next } })
    setSaved(false)
  }

  const toggleBruna = (heure: string) => {
    if (!horaires) return
    const next = horaires.bruna.includes(heure) ? horaires.bruna.filter(x => x !== heure) : [...horaires.bruna, heure].sort()
    setHoraires({ ...horaires, bruna: next })
    setSaved(false)
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#f0efe9] flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl p-10 shadow-sm w-full max-w-sm">
          <h1 className="text-2xl font-bold text-[#1a1208] mb-2">Admin Slay Studio</h1>
          <p className="text-sm text-[#1a1208]/50 mb-8">Gestion des créneaux</p>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input type="password" value={password} onChange={e => { setPassword(e.target.value); setAuthError("") }}
              placeholder="Mot de passe"
              className="border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#861519]" />
            {authError && <p className="text-xs text-[#861519]">{authError}</p>}
            <button type="submit" className="bg-[#861519] text-white rounded-xl py-3 text-sm font-semibold">Connexion</button>
          </form>
        </div>
      </div>
    )
  }

  if (!horaires) return <div className="min-h-screen flex items-center justify-center">Chargement…</div>

  const { firstDay, daysInMonth, year, month } = getDaysInMonth(calDate)
  const today = toDateStr(new Date())

  return (
    <div className="min-h-screen bg-[#f0efe9] px-4 py-12">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#1a1208]">Mes créneaux 💅</h1>
            <p className="text-sm text-[#1a1208]/50 mt-1">Gère tes disponibilités</p>
          </div>
          <button onClick={handleSave} disabled={saving}
            className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all ${saved ? "bg-green-500 text-white" : "bg-[#861519] text-white hover:bg-[#6a1014]"}`}>
            {saving ? "Sauvegarde…" : saved ? "✓ Sauvegardé !" : "Sauvegarder"}
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {(["calendrier", "defaut"] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${tab === t ? "bg-[#861519] text-white" : "bg-white text-[#1a1208]/60 hover:bg-gray-100"}`}>
              {t === "calendrier" ? "📅 Bloquer des dates" : "⚙️ Horaires par défaut"}
            </button>
          ))}
        </div>

        {/* TAB : CALENDRIER */}
        {tab === "calendrier" && (
          <div className="bg-white rounded-3xl p-6 shadow-sm">
            {/* Navigation mois */}
            <div className="flex items-center justify-between mb-6">
              <button onClick={() => setCalDate(new Date(year, month - 1, 1))}
                className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center text-lg font-bold hover:bg-gray-200">‹</button>
              <h2 className="font-bold text-[#1a1208]">{MOIS[month]} {year}</h2>
              <button onClick={() => setCalDate(new Date(year, month + 1, 1))}
                className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center text-lg font-bold hover:bg-gray-200">›</button>
            </div>

            {/* Jours de la semaine */}
            <div className="grid grid-cols-7 mb-2">
              {JOURS_COURT.map(j => (
                <div key={j} className="text-center text-xs font-semibold text-[#1a1208]/40 py-1">{j}</div>
              ))}
            </div>

            {/* Grille calendrier */}
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: firstDay }).map((_, i) => <div key={`empty-${i}`} />)}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1
                const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
                const blocked = getBlockedForDate(dateStr)
                const disponible = isDateDisponible(dateStr)
                const isToday = dateStr === today
                const isSelected = dateStr === selectedDate
                const isFullyBlocked = blocked?.heures.includes("all")
                const isPartiallyBlocked = blocked && !isFullyBlocked && blocked.heures.length > 0

                return (
                  <button key={dateStr} onClick={() => disponible ? setSelectedDate(isSelected ? null : dateStr) : null}
                    className={`
                      aspect-square rounded-xl text-sm font-medium transition-all flex items-center justify-center relative
                      ${!disponible ? "text-[#1a1208]/20 cursor-default" : "cursor-pointer"}
                      ${isSelected ? "bg-[#861519] text-white" : ""}
                      ${isFullyBlocked && !isSelected ? "bg-red-100 text-red-400 line-through" : ""}
                      ${isPartiallyBlocked && !isSelected ? "bg-orange-50 text-orange-600" : ""}
                      ${!isSelected && !isFullyBlocked && !isPartiallyBlocked && disponible ? "hover:bg-[#f0efe9]" : ""}
                      ${isToday && !isSelected ? "ring-2 ring-[#861519]" : ""}
                    `}>
                    {day}
                    {isPartiallyBlocked && !isSelected && (
                      <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-orange-400" />
                    )}
                  </button>
                )
              })}
            </div>

            {/* Légende */}
            <div className="flex gap-4 mt-4 text-xs text-[#1a1208]/40">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-red-100 inline-block" />Journée bloquée</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-orange-50 inline-block" />Partiellement bloqué</span>
            </div>

            {/* Créneaux de la date sélectionnée */}
            {selectedDate && (
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-[#1a1208]">
                    {new Date(selectedDate + "T12:00:00").toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}
                  </h3>
                  <button onClick={() => toggleJournee(selectedDate)}
                    className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-all ${getBlockedForDate(selectedDate)?.heures.includes("all") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                    {getBlockedForDate(selectedDate)?.heures.includes("all") ? "✓ Débloquer la journée" : "Bloquer toute la journée"}
                  </button>
                </div>

                {getBlockedForDate(selectedDate)?.heures.includes("all") ? (
                  <p className="text-sm text-[#1a1208]/50 text-center py-4">Journée entière bloquée</p>
                ) : (
                  <div>
                    <p className="text-xs text-[#1a1208]/40 mb-3">Clique sur un créneau pour le bloquer / débloquer :</p>
                    <div className="flex flex-wrap gap-2">
                      {getSlotsForDate(selectedDate).map(h => {
                        const isBlocked = getBlockedForDate(selectedDate)?.heures.includes(h) ?? false
                        return (
                          <button key={h} onClick={() => toggleSlot(selectedDate, h)}
                            className={`px-4 py-2 rounded-xl text-sm font-medium border-2 transition-all ${isBlocked ? "border-red-300 bg-red-50 text-red-500 line-through" : "border-green-300 bg-green-50 text-green-700"}`}>
                            {h}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}

            {!selectedDate && (
              <p className="text-center text-sm text-[#1a1208]/30 mt-6">Clique sur un jour disponible pour gérer ses créneaux</p>
            )}
          </div>
        )}

        {/* TAB : HORAIRES PAR DÉFAUT */}
        {tab === "defaut" && (
          <div className="flex flex-col gap-6">
            <div className="bg-white rounded-3xl p-6 shadow-sm">
              <h2 className="font-bold text-[#1a1208] mb-1">🏠 À domicile — Soir en semaine</h2>
              <p className="text-xs text-[#1a1208]/40 mb-6">Vert = disponible par défaut · Gris = désactivé</p>
              <div className="flex flex-col gap-6">
                {Object.entries(TOUS_DOMICILE).map(([jour, heures]) => (
                  <div key={jour}>
                    <p className="text-sm font-semibold text-[#1a1208]/70 mb-2">{JOURS_NOM[jour]} soir</p>
                    <div className="flex flex-wrap gap-2">
                      {heures.map(h => {
                        const actif = horaires.domicile[jour]?.includes(h) ?? false
                        return (
                          <button key={h} onClick={() => toggleDomicile(jour, h)}
                            className={`px-4 py-2 rounded-xl text-sm font-medium border-2 transition-all ${actif ? "border-green-400 bg-green-50 text-green-700" : "border-gray-200 bg-gray-50 text-gray-400 line-through"}`}>
                            {h}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm">
              <h2 className="font-bold text-[#1a1208] mb-1">💅 Chez Bruna — Samedi matin</h2>
              <p className="text-xs text-[#1a1208]/40 mb-6">Vert = disponible par défaut · Gris = désactivé</p>
              <div className="flex flex-wrap gap-2">
                {TOUS_BRUNA.map(h => {
                  const actif = horaires.bruna.includes(h)
                  return (
                    <button key={h} onClick={() => toggleBruna(h)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium border-2 transition-all ${actif ? "border-green-400 bg-green-50 text-green-700" : "border-gray-200 bg-gray-50 text-gray-400 line-through"}`}>
                      {h}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        <p className="text-center text-xs text-[#1a1208]/30 mt-8">Les changements sont visibles immédiatement après sauvegarde.</p>
      </div>
    </div>
  )
}
