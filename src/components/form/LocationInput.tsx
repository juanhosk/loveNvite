"use client"

import { useRef, useState } from "react"
import { Input } from "@/components/ui/input"
import LoaderPkg from "@googlemaps/js-api-loader"
const Loader = LoaderPkg.Loader


const loader = new Loader({
  apiKey: import.meta.env.PUBLIC_GOOGLE_MAPS_KEY,
  libraries: ["places"]
})

export default function LocationInput({
  placeholder,
  onPlaceSelected
}: {
  placeholder: string
  onPlaceSelected: (place: { name: string; lat: number; lng: number }) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [loaded, setLoaded] = useState(false)

  useState(() => {
    loader.load().then(() => {
      if (inputRef.current && !loaded) {
        const autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
          types: ["establishment"]
        })

        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace()
          if (!place.geometry?.location) return

          onPlaceSelected({
            name: place.name || "",
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
          })
        })

        setLoaded(true)
      }
    })
  })

  return (
    <Input
      ref={inputRef}
      placeholder={placeholder}
      autoComplete="off"
    />
  )
}
