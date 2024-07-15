import { useMap } from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import * as ReactDOMServer from "react-dom/server";
import { MapDefaultMarker } from "../MapDefaultMarker/MapDefaultMarker";

export const RoutingMachine = ({
  analyzeData,
  handleLegendOpen,
  handleRoutingData,
}) => {
  console.log(analyzeData);
  const map = useMap();
  const icon = L.icon({
    iconUrl:
      "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png",
    iconSize: [40, 40],
  });
  const routing = L.Routing.control({
    show: false,
    addWaypoints: false,
    extendToWaypoints: false,
    missingRouteTolerance: 10,
    fitSelectedRoutes: false,
    lineOptions: {
      styles: [
        {
          color: "#B8533B",
          opacity: 1,
          weight: 3,
          dashArray: [5, 10],
        },
      ],
    },
    createMarker: function (i, wp) {
      if (i === 1) {
        return L.marker(wp.latLng, {
          icon: L.divIcon({
            iconAnchor: [15, 37],
            popupAnchor: [6, -27],
            className: "custom-icon",
            html: ReactDOMServer.renderToString(
              <MapDefaultMarker type="metro" />
            ),
          }),
        });
      }
      return L.marker(wp.latLng, {
        icon: L.divIcon({
          iconAnchor: [15, 37],
          popupAnchor: [6, -27],
          className: "custom-icon",
          html: ReactDOMServer.renderToString(
            <MapDefaultMarker type="default" />
          ),
        }),
      });
    },
    routeWhileDragging: false,
  });

  useEffect(() => {
    routing.setWaypoints(
      analyzeData[0]?.points?.map((item) =>
        L.latLng(item.coord_lat, item?.coord_lng)
      )
    );
    routing.on("routesfound", function (e) {
      handleLegendOpen(true);
      var routes = e.routes;
      var summary = routes[0].summary;
      // alert distance and time in km and minutes
      handleRoutingData(
        "Общее расстояние составляет " +
          (summary.totalDistance / 1000).toFixed(2) +
          " км, а общее время в пути пешком – " +
          Math.round((summary.totalDistance / 1000 / 5) * 60) +
          " минут"
      );
    });
  }, [analyzeData]);
  useEffect(() => {
    if (!map) return;
    routing.addTo(map);
    return () => {
      map.removeControl(routing);
    };
  }, []);

  return null;
};
