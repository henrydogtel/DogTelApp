"use client"
import { useEffect, useState } from "react";

export default function LocationComponent() {
  const [hasRequestedLocation, setHasRequestedLocation] = useState(false);

  const requestLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          console.log("Latitud:", position.coords.latitude);
          console.log("Longitud:", position.coords.longitude);
        },
        (error: GeolocationPositionError) => {
          console.error("Error obteniendo la ubicación:", error.message);
        }
      );
    } else {
      console.error("Geolocalización no está soportada por este navegador.");
    }
  };

  useEffect(() => {
    if (!hasRequestedLocation) {
      requestLocation();
      setHasRequestedLocation(true); 
    }
  }, [hasRequestedLocation]);

  return (
    <div>
     
    </div>
  );
}

