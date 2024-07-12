import React, { useEffect } from "react";
import { useMap } from "react-leaflet";
import L, { point } from "leaflet";

export const AnalyzeLayer = ({
  metro,
  currentPoint,
  setAnalyzeData,
  analyzeData,
}) => {
  const map = useMap();
  useEffect(() => {
    if (!map) return;
    if (currentPoint && metro?.length > 0) {
      const data = [
        {
          id: 1,
          type: "metro",
          object: metro[1]?.title,
          points: [
            {
              id: 0,
              coord_lat: currentPoint?.coord_lat,
              coord_lng: currentPoint?.coord_lng,
            },
            {
              id: 1,
              coord_lat: metro[1]?.coord_lat,
              coord_lng: metro[1]?.coord_lng,
            },
          ],
          distance: (
            map.distance(
              new L.LatLng(currentPoint?.coord_lat, currentPoint?.coord_lng),
              new L.LatLng(metro[1]?.coord_lat, metro[1]?.coord_lng)
            ) / 1000
          ).toFixed(2),
        },
        {
          id: 0,
          type: "metro",
          object: metro[0]?.title,
          points: [
            {
              id: 0,
              coord_lat: currentPoint?.coord_lat,
              coord_lng: currentPoint?.coord_lng,
            },
            {
              id: 1,
              coord_lat: metro[0]?.coord_lat,
              coord_lng: metro[0]?.coord_lng,
            },
          ],
          distance: (
            map.distance(
              new L.LatLng(currentPoint?.coord_lat, currentPoint?.coord_lng),
              new L.LatLng(metro[0]?.coord_lat, metro[0]?.coord_lng)
            ) / 1000
          ).toFixed(2),
        },
      ];
      setAnalyzeData(data);
    }
  }, [currentPoint]);
  return null;
};
