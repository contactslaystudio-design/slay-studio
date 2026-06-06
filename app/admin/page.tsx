"use client"
import { useState, useEffect } from "react"

const JOURS: Record<string, string> = {
  "1": "Lundi soir",
  "2": "Mardi soir",
  "3": "Mercredi soir",
  "4": "Jeudi soir",
  "5": "Vendredi soir",
}

const TOUS_DOMICILE: Record<string, string[]> = {
  "1": ["19:00","19:30","20:00"],
  "2": ["18:00","18:30","19:00","20:00"],
  "3": ["17:30","18:00","18:30","19:00","20:00"],
  "4": ["18:00","18:30","19:00","19:30","20:00"],
  "5": ["17:30","18:00","18:30","19:00"],
}

const TOUS_BRUNA = ["09:00","09:30","10:00","10:30","11:00","11:30"]

type Horaires = {
  domicile: Record<string, string[]>
  bruna: string[]
}

export default function AdminPage() {
  const [password, setPassword] = useState("")
  const [authenticated, setAuthenticated] = useState(false)
  const [authError, setAuthError] = useState("")
  const [horaires, setHoraires] = useState<Horaires | null>(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    // Vérifie le mot de passe en essayant de sauvegarder
    const res = await fetch("/api/horaires")
    const data = await res.json()
    // Teste le mdp avec un faux save
    const test = await fetch("/api/horaires", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, horaires: data }),
    })
    if (test.ok) {
      setHoraires(data)
      setAuthenticated(true)
    } else {
      setAuthError("Mot de passe incorrect")
    }
  }

  useEffect(() => {
    if (authenticated) {
      fetch("/api/horaires").then(r => r.json()).then(setHoraires)
    }
  }, [authenticated])

  const toggleDomicile = (jour: string, heure: string) => {
    if (!horaires) return
    setHoraires(h => {
      if (!h) return h
      const current = h.domicile[jour] ?? []
      const next = current.includes(heure)
        ? current.filter(x => x !== heure)
        : [...current, heure].sort()
      return { ...h, domicile: { ...h.domicile, [jour]: next } }
    })
    setSaved(false)
  }

  const toggleBruna = (heure: string) => {
    if (!horaires) return
    setHoraires(h => {
      if (!h) return h
      const next = h.bruna.includes(heure)
        ? h.bruna.filter(x => x !== heure)
        : [...h.bruna, heure].sort()
      return { ...h, bruna: next }
    })
    setSaved(false)
  }

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

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#f0efe9] flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl p-10 shadow-sm w-full max-w-sm">
          <h1 className="text-2xl font-bold text-[#1a1208] mb-2">Admin Slay Studio</h1>
          <p className="text-sm text-[#1a1208]/50 mb-8">Gestion des créneaux</p>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="password"
              value={password}
              onChange={e => { setPassword(e.target.value); setAuthError("") }}
              placeholder="Mot de passe"
              className="border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#861519]"
            />
            {authError && <p className="text-xs text-[#861519]">{authError}</p>}
            <button type="submit" className="bg-[#861519] text-white rounded-xl py-3 text-sm font-semibold">
              Connexion
            </button>
          </form>
        </div>
      </div>
    )
  }

  if (!horaires) return <div className="min-h-screen flex items-center justify-center">Chargement…</div>

  return (
    <div className="min-h-screen bg-[#f0efe9] px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-2xl font-bold text-[#1a1208]">Mes créneaux 💅</h1>
            <p className="text-sm text-[#1a1208]/50 mt-1">Clique pour activer ou désactiver un horaire</p>
          </div>
          <button onClick={handleSave} disabled={saving}
            className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all ${saved ? "bg-green-500 text-white" : "bg-[#861519] text-white hover:bg-[#6a1014]"}`}>
            {saving ? "Sauvegarde…" : saved ? "✓ Sauvegardé !" : "Sauvegarder"}
          </button>
        </div>

        {/* Domicile */}
        <div className="bg-white rounded-3xl p-6 mb-6 shadow-sm">
          <h2 className="font-bold text-[#1a1208] mb-1">🏠 À domicile — Soir en semaine</h2>
          <p className="text-xs text-[#1a1208]/40 mb-6">Vert = disponible · Gris = désactivé</p>
          <div className="flex flex-col gap-6">
            {Object.entries(TOUS_DOMICILE).map(([jour, heures]) => (
              <div key={jour}>
                <p className="text-sm font-semibold text-[#1a1208]/70 mb-2">{JOURS[jour]}</p>
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

        {/* Bruna */}
        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <h2 className="font-bold text-[#1a1208] mb-1">💅 Chez Bruna — Samedi matin</h2>
          <p className="text-xs text-[#1a1208]/40 mb-6">Vert = disponible · Gris = désactivé</p>
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

        <p className="text-center text-xs text-[#1a1208]/30 mt-8">
          Les changements sont visibles immédiatement sur le site après sauvegarde.
        </p>
      </div>
    </div>
  )
}
