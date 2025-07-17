"use client"

import { useState } from "react"
import { t } from "@/i18n"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import LocationInput from "@/components/form/LocationInput"

export default function TestForm({ lang }: { lang: string }) {
  const [hasMultipleLocations, setHasMultipleLocations] = useState(false)
  const [hasTimeline, setHasTimeline] = useState(false)
  const [ceremonyLocation, setCeremonyLocation] = useState<{ name: string; lat: number; lng: number } | null>(null);
  const [receptionLocation, setReceptionLocation] = useState<{ name: string; lat: number; lng: number } | null>(null);


  return (
    <form className="space-y-6 max-w-2xl mx-auto p-4">
      <div className="space-y-2">
        <Label htmlFor="title">{t(lang, "form.title")}</Label>
        <Input id="title" placeholder={t(lang, "form.title_placeholder")} maxLength={64} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">{t(lang, "form.description")}</Label>
        <Textarea id="description" placeholder={t(lang, "form.description_placeholder")} maxLength={254} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="date">{t(lang, "form.date")}</Label>
        <Input id="date" type="date" required />
      </div>

      <div className="flex items-center justify-between py-2">
        <Label htmlFor="multipleLocations" className="text-base">{t(lang, "form.multiple_locations")}</Label>
        <Switch
          id="multipleLocations"
          checked={hasMultipleLocations}
          onCheckedChange={setHasMultipleLocations}
        />
      </div>

      {hasMultipleLocations && (
        <div className="space-y-2">
          <Label>{t(lang, "form.select_locations")}</Label>
          <div className="flex flex-col sm:flex-row gap-4">
            <LocationInput
              placeholder={t(lang, "form.location_ceremony")}
              onPlaceSelected={setCeremonyLocation} // Aquí guardas la ubicación de la ceremonia
            />
            <LocationInput
              placeholder={t(lang, "form.location_reception")}
              onPlaceSelected={setReceptionLocation} // Aquí guardas la ubicación de la recepción
            />
          </div>
        </div>
      )}

      <div className="flex items-center justify-between py-2">
        <Label htmlFor="addTimeline" className="text-base">{t(lang, "form.add_timeline")}</Label>
        <Switch
          id="addTimeline"
          checked={hasTimeline}
          onCheckedChange={setHasTimeline}
        />
      </div>

      {hasTimeline && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <Input type="time" />
            <Input placeholder={t(lang, "form.timeline_section_placeholder")} disabled />
          </div>
        </div>
      )}

      <Button type="submit">{t(lang, "form.submit")}</Button>
    </form>
  )
}
