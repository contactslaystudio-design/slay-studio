import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import Tarifs from "@/components/Tarifs"
import Deplacements from "@/components/Deplacements"
import Occasions from "@/components/Occasions"
import FormRDV from "@/components/FormRDV"
import Avis from "@/components/Avis"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Tarifs />
      <Deplacements />
      <Occasions />
      <Avis />
      <FormRDV />
      <Footer />
    </main>
  )
}
