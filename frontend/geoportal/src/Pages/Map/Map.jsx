import React, { useEffect, useState } from "react";
import { Box, Stack, TextField } from "@mui/material";
import { StandartSwitch } from "../../UI-kit/Switch/StandartSwitch";
import { MapContainer, Marker, TileLayer, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import styles from "./Map.module.css";
import { districtCoordinates } from "../../Utils/contstants";
import districtBorders from "../../Utils/otradnoe.geojsonl.json";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import icon from "../../Assets/Icon.svg";
import blueIcon from "../../Assets/IconBlue.svg";
import blackIcon from "../../Assets/IconBlack.svg";
import MarkerClusterGroup from "react-leaflet-cluster";

import { VectorLayer } from "./VectorLayer";

export const Map = () => {
  const currentBorders = districtBorders?.geometry?.coordinates[0][0]?.map(
    (coordinates) => {
      return [coordinates[1], coordinates[0]];
    }
  );

  const createClusterCustomIcon = function (cluster) {
    return new L.DivIcon({
      html: `<span>${cluster.getChildCount()}</span>`,
      className: "custom-marker-cluster",
      iconSize: L.point(33, 33, true),
    });
  };

  const [kadastrData, setKadastrData] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:9000/`)
      .then((response) => response.json())
      .then((data) => {
        setKadastrData(data);
      });
  }, []);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [isCurrentBorders, setIsCurrentBorders] = useState(false);

  const defIcon = new L.Icon({
    iconUrl: icon,
    iconSize: [32, 32],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  const avitoIcon = new L.Icon({
    iconUrl: blueIcon,
    iconSize: [32, 32],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  const darkIcon = new L.Icon({
    iconUrl: blackIcon,
    iconSize: [32, 32],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  const [currentPoint, setCurrentPoint] = useState(null);


  return (
    <Box
      sx={{
        maxWidth: "100vw",
        height: "100vh",
        overflowY: "hidden !important",
      }}
    >
      <Box className={styles.layersControl}>
        <h2 className={styles.layersControlTitle}>
          Инструмент управления картой
        </h2>
       <Box>
         <Accordion
          sx={{
            marginTop: " 32px",
          }}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <h3 className={styles.layersControlSubTitle}>Тематические слои</h3>
          </AccordionSummary>
          <AccordionDetails>
            <Box
              sx={{
                paddingTop: "16px",
                paddingBottom: "16px",
              }}
            >
              <Stack direction="row" alignItems="center">
                <StandartSwitch
                  checked={isCurrentBorders}
                  onChange={() => {
                    setIsCurrentBorders((prev) => !prev);
                  }}
                  inputProps={{ "aria-label": "controlled" }}
                />
                <p className={styles.layersControlLabel}>Границы района</p>
              </Stack>
            </Box>
          </AccordionDetails>
        </Accordion>
       </Box>
      </Box>
      <MapContainer
        maxZoom={19}
        // minZoom={2}
        zoom={13}
        center={districtCoordinates}
        scrollWheelZoom={true}
        style={{
          width: "inherit",
          height: "inherit",
        }}
      >
        {/* <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        /> */}
        {isCurrentBorders && (
          <Polyline
            pathOptions={{
              color: "#B8533B",
            }}
            positions={currentBorders}
          />
        )}
        <MarkerClusterGroup>
          {kadastrData?.map((item) => {
            return (
              <Marker
                key={item?.id}
                position={[item?.coord_lat, item?.coord_lng]}
                icon={darkIcon}
              />
            );
          })}
        </MarkerClusterGroup>
        <VectorLayer />
      </MapContainer>
    </Box>
  );
};
