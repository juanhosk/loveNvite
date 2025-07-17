"use client"

import { useEffect, useRef, useState } from "react"
import { Input } from "@/components/ui/input"

export default function LocationInput({
  placeholder,
  onPlaceSelected
}: {
  placeholder: string
  onPlaceSelected: (place: { name: string; lat: number; lng: number }) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [loaded, setLoaded] = useState(false)
  const [loaderInstance, setLoaderInstance] = useState<any>(null)

  useEffect(() => {
    import("@googlemaps/js-api-loader")
      .then(LoaderModule => {
        const SpecificLoader = (LoaderModule as any).Loader || (LoaderModule as any).default?.Loader || LoaderModule;
        
        if (typeof SpecificLoader === 'function' && SpecificLoader.prototype.load) {
            setLoaderInstance(new SpecificLoader({
                apiKey: import.meta.env.PUBLIC_GOOGLE_MAPS_KEY,
                libraries: ["places"]
            }));
        } else {
            console.error("Loader is not a constructor as expected:", SpecificLoader);
        }
      })
      .catch(error => {
        console.error("Failed to load @googlemaps/js-api-loader:", error);
      });
  }, []);

  useEffect(() => {
    if (loaderInstance && !loaded) { // Removed inputRef.current from here
      loaderInstance.load().then(() => {
        // --- ADDED THIS CHECK ---
        // Ensure inputRef.current is not null AFTER the API is loaded
        // and BEFORE creating the Autocomplete instance.
        if (inputRef.current && typeof google !== "undefined" && google.maps && google.maps.places) {
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
        } else {
            console.error("Google Maps API not fully loaded, 'places' library missing, or inputRef.current is null.");
            // Consider what to do if inputRef.current is null here.
            // It could mean the component unmounted before the API loaded.
        }
      }).catch((error: any) => {
          console.error("Error loading Google Maps API:", error);
      });
    }
  }, [loaderInstance, loaded, onPlaceSelected]);

  return (
    <Input
      ref={inputRef}
      placeholder={placeholder}
      autoComplete="off"
    />
  )
}