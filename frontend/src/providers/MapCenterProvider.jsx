import { useState } from "react";
import { MapCenterContext } from "../contexts/MapCenterContext";
export function MapCenterProvider({ children }) {
  const [mapCenter, setMapCenter] = useState({
    lat: -3.745,
    lng: -38.523,
  });

  return (
    <MapCenterContext.Provider value={{ mapCenter, setMapCenter }}>
      {children}
    </MapCenterContext.Provider>
  );
}