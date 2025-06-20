import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"

const FLAG_URLS: Record<string, string> = {
  es: "/flags/es.svg",
  en: "/flags/en.svg",
}

const DEFAULT_LANG = "es"

export default function LanguageSelector({
  currentLang,
  onLangChange,
}: {
  currentLang: string
  onLangChange: (lang: string) => void
}) {
  const [selectedLang, setSelectedLang] = useState<string>(() => {
    const stored = localStorage.getItem("lang")
    return stored && FLAG_URLS[stored] ? stored : (FLAG_URLS[currentLang] ? currentLang : DEFAULT_LANG)
  })

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("lang", selectedLang)
      document.cookie = `lang=${selectedLang}; path=/; max-age=31536000`
    }

    if (typeof onLangChange === "function") {
      onLangChange(selectedLang)
    }
  }, [selectedLang])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="gap-2 text-lg">
          <Globe className="w-4 h-4" />
          {FLAG_URLS[selectedLang] && (
            <img
              src={FLAG_URLS[selectedLang]}
              alt={selectedLang}
              className="w-5 h-5 rounded-full object-cover"
            />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {Object.entries(FLAG_URLS).map(([lang, url]) => (
          <DropdownMenuItem
            key={lang}
            onSelect={() => {
              setSelectedLang(lang)
              onLangChange?.(lang)
              document.cookie = `lang=${lang}; path=/`
              window.location.reload()
            }}
            className="text-base flex items-center gap-2"
          >
            <img src={url} alt={lang} className="w-5 h-5 rounded-full" />
            {lang.toUpperCase()}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
