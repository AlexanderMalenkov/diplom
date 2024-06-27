import React, { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

const MapControlLayer = ({ currentPoint, isDrawerOpen }) => {
  const map = useMap();
  useEffect(() => {
    if (!map) return;
    if (currentPoint) {
      map.setView(
        new L.LatLng(currentPoint?.coord_lat, currentPoint?.coord_lng),
        18
      );
    }
  }, [currentPoint]);
  useEffect(() => {
    if (!map) return;
    if (isDrawerOpen) {
      map.closePopup();
    }
  }, [isDrawerOpen]);
  return null;
};

export default MapControlLayer;
