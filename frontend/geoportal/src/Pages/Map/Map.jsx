import React, { useEffect, useState } from "react";

import { Box, Stack } from "@mui/material";

import { StandartSwitch } from "../../UI-kit/Switch/StandartSwitch";

import {
  MapContainer,
  Marker,
  TileLayer,
  Popup,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

import styles from "./Map.module.css";

import { districtCoordinates } from "../../Utils/contstants";

import districtBorders from "../../Utils/otradnoe.geojsonl.json";

export const Map = () => {
  const currentBorders = districtBorders?.geometry?.coordinates[0][0]?.map(
    (coordinates) => {
      return [coordinates[1], coordinates[0]];
    }
  );

  const [isCurrentBorders, setIsCurrentBorders] = useState(false);
  const [isAvito, setIsAvito] = useState(false);
  const [isCian, setIsCian] = useState(false);
  const [sob, setIsSob] = useState(false);
  const [yula, setIsYula] = useState(false);
  const [moyaReklama, setIsMoyaReklama] = useState(false);
  const [domClick, setIsDomClick] = useState(false);
  const [archieved, setIsArchieved] = useState(false);

  const [pointsData, setPointsData] = useState(null);

  console.log(pointsData);

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <Box className={styles.layersControl}>
        <h2 className={styles.layersControlTitle}>
          Инструмент управления слоями
        </h2>
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
          <Stack
            direction="row"
            alignItems="center"
            sx={{
              marginTop: "8px",
            }}
          >
            <StandartSwitch
              checked={isAvito}
              onChange={() => {
                setIsAvito((prev) => !prev);
                if (!isAvito) {
                  fetch("http://localhost:9000/objects-avito")
                    .then((response) => response.json())
                    .then((data) => {
                      setPointsData(data);
                    });
                } else {
                  setPointsData(null);
                }
              }}
              inputProps={{ "aria-label": "controlled" }}
            />
            <p className={styles.layersControlLabel}>Объекты Авито</p>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            sx={{
              marginTop: "8px",
            }}
          >
            <StandartSwitch
              checked={isCian}
              onChange={() => {
                setIsCian((prev) => !prev);
              }}
              inputProps={{ "aria-label": "controlled" }}
            />
            <p className={styles.layersControlLabel}>Объекты Циан</p>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            sx={{
              marginTop: "8px",
            }}
          >
            <StandartSwitch
              checked={sob}
              onChange={() => {
                setIsSob((prev) => !prev);
              }}
              inputProps={{ "aria-label": "controlled" }}
            />
            <p className={styles.layersControlLabel}>Объекты sob.ru</p>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            sx={{
              marginTop: "8px",
            }}
          >
            <StandartSwitch
              checked={yula}
              onChange={() => {
                setIsYula((prev) => !prev);
              }}
              inputProps={{ "aria-label": "controlled" }}
            />
            <p className={styles.layersControlLabel}>Объекты Юла</p>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            sx={{
              marginTop: "8px",
            }}
          >
            <StandartSwitch
              checked={moyaReklama}
              onChange={() => {
                setIsMoyaReklama((prev) => !prev);
              }}
              inputProps={{ "aria-label": "controlled" }}
            />
            <p className={styles.layersControlLabel}>Объекты МояРеклама</p>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            sx={{
              marginTop: "8px",
            }}
          >
            <StandartSwitch
              checked={domClick}
              onChange={() => {
                setIsDomClick((prev) => !prev);
              }}
              inputProps={{ "aria-label": "controlled" }}
            />
            <p className={styles.layersControlLabel}>Объекты ДомКлик</p>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            sx={{
              marginTop: "8px",
            }}
          >
            <StandartSwitch
              checked={archieved}
              onChange={() => {
                setIsArchieved((prev) => !prev);
              }}
              inputProps={{ "aria-label": "controlled" }}
            />
            <p className={styles.layersControlLabel}>Архивные объявления</p>
          </Stack>
        </Box>
      </Box>
      <MapContainer
        zoom={13}
        center={districtCoordinates}
        scrollWheelZoom={true}
        style={{
          width: "inherit",
          height: "inherit",
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {pointsData?.map((point) => (
          <Marker position={point?.coords} />
        ))}
        {isCurrentBorders && (
          <Polyline
            pathOptions={{
              color: "red",
            }}
            positions={currentBorders}
          />
        )}
      </MapContainer>
    </Box>
  );
};
