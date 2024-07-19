import React, { useEffect } from "react";
import { useMap } from "react-leaflet";
import { MaptilerLayer } from "@maptiler/leaflet-maptilersdk";

export const VectorLayer = () => {
  const map = useMap();

  useEffect(() => {
    const mtLayer = new MaptilerLayer({
      apiKey: "S7QZTbs5XJzmMea03Xm8",
    });
    mtLayer.addTo(map);
  }, []);
  return null;
};
