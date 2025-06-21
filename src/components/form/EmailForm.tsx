"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { t } from "@/i18n"

interface Props {
  lang: string
  onValidEmail?: (token: string) => void
}

export default function EmailForm({ lang, onValidEmail }: Props) {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError(t(lang, "form.email_invalid"))
      return
    }

    try {
      setLoading(true)
      const res = await fetch("http://localhost:3001/api/contact/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      })

      if (!res.ok) throw new Error("Fetch failed")

      const { token } = await res.json()

      // Guarda el token
      localStorage.setItem("form_email_token", token)

      // Llama al callback si se pasa
      if (typeof onValidEmail === "function") onValidEmail(token)

      // Redirige a la siguiente página
      window.location.href = "/init-form"
    } catch (err) {
      console.error(err)
      setError(t(lang, "form.email_error"))
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto p-4">
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
        {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? t(lang, "form.loading") : t(lang, "form.continue")}
      </Button>
    </form>
  )
}
