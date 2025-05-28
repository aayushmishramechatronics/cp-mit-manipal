import HeroGeometric from "@/components/kokonutui/hero-geometric"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"

export default function Home() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <div className="min-h-screen">
        <Header />
        <HeroGeometric />
      </div>
    </ThemeProvider>
  )
}
