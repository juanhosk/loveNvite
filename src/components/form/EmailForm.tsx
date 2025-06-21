"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { t } from "@/i18n"

interface Props {
  lang: string
  onValidEmail: (email: string) => void
}

export default function EmailStep({ lang, onValidEmail }: Props) {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError(t(lang, "form.email_invalid"))
      return
    }

    setError("")
    onValidEmail(email)
  }

  return (
    <form className="space-y-4 max-w-md mx-auto p-4" onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold text-center">
        {t(lang, "form.email_step_title")}
      </h2>

      <div className="space-y-2">
        <Label htmlFor="email">{t(lang, "form.email_label")}</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t(lang, "form.email_placeholder")}
          required
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>

      <Button type="submit" className="w-full">
        {t(lang, "form.continue")}
      </Button>
    </form>
  )
}
