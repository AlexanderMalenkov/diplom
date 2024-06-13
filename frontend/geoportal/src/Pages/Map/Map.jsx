import React, { useEffect, useState } from "react";
import { Box, Stack } from "@mui/material";
import { StandartSwitch } from "../../UI-kit/Switch/StandartSwitch";
import { MapContainer, Marker, TileLayer, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import styles from "./Map.module.css";
import { districtCoordinates } from "../../Utils/contstants";
import districtBorders from "../../Utils/otradnoe.geojsonl.json";
import CloseIcon from "@mui/icons-material/Close";
import { PieChart } from "@mui/x-charts/PieChart";
import { keyframes } from "@mui/material";

import { DefaultButton } from "../../UI-kit/Button/DefaultButton";

import icon from "../../Assets/Icon.svg";

export const Map = () => {
  const currentBorders = districtBorders?.geometry?.coordinates[0][0]?.map(
    (coordinates) => {
      return [coordinates[1], coordinates[0]];
    }
  );

  const slideOutRight = keyframes` 
    from {
      transform: translateX(-200%);
    }
    to {
      transform: translateX(0%);
    }
  }`;

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [isCurrentBorders, setIsCurrentBorders] = useState(true);

  const [isAvito, setIsAvito] = useState(false);
  const [isCian, setIsCian] = useState(false);
  const [sob, setIsSob] = useState(false);

  const [avitoPointsData, setAvitoPointsData] = useState([]);
  const [cianPointsData, setCianPointsData] = useState([]);
  const [sobPointsData, setSobPointsData] = useState([]);

  const [cianAvalyze, setCianAnalyze] = useState(false);

  const defIcon = new L.Icon({
    iconUrl: icon,
    iconSize: [32, 32],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  const [currentPoint, setCurrentPoint] = useState(null);

  const groupedCianAge = cianPointsData?.reduce((result, item) => {
    const kmToMetro = item.params2?.["О здании"]["Год постройки"];
    if (!result[kmToMetro]) {
      result[kmToMetro] = [];
    }
    result[kmToMetro].push(item.params2?.["О здании"]["Год постройки"]);
    return result;
  }, {});

  const groupedCianLevels = cianPointsData?.reduce((result, item) => {
    const kmToMetro = item["params"]["Этажей в доме"];
    if (!result[kmToMetro]) {
      result[kmToMetro] = [];
    }
    result[kmToMetro].push(item["params"]["Этажей в доме"]);
    return result;
  }, {});

  return (
    <Box
      sx={{
        maxWidth: "100vw",
        height: "100vh",
        overflowY: "hidden !important",
      }}
    >
      <Stack
        className={styles.drawer}
        sx={{
          transform: isDrawerOpen ? "translateX(0%)" : "translateX(-200%)",
          animation: isDrawerOpen ? `${slideOutRight} 0.5s` : "",
        }}
      >
        <Stack
          sx={{
            width: "100%",
            justifyContent: "flex-end",
            alignItems: "flex-end",
          }}
        >
          <Stack
            sx={{
              padding: "6px",
            }}
          >
            <CloseIcon
              onClick={() => {
                setIsDrawerOpen(false);
              }}
            />
          </Stack>
          <Stack
            sx={{
              padding: "16px",
            }}
            k
          >
            <h2 className={styles.drawerTitle}>{currentPoint?.title}</h2>
            <p className={styles.drawerText}>{currentPoint?.description}</p>

            <Box
              sx={{
                borderRadius: "16px",
                width: "300px",
                height: "300px",
                background: `url(${currentPoint?.images[0]?.imgurl})  lightgray 50% / cover no-repeat`,
              }}
            />
            <Box
              sx={{
                marginTop: "16px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <h1 className={styles.drawerSubTitle}>
                Расстояние до метро:{" "}
                <span
                  style={{
                    fontWeight: 800,
                  }}
                >
                  {currentPoint?.km_do_metro} км
                </span>
              </h1>
              <h1 className={styles.drawerSubTitle}>
                Этаж:{" "}
                <span
                  style={{
                    fontWeight: 800,
                  }}
                >
                  {currentPoint?.["params"]["Этаж"]}/
                  {currentPoint?.["params"]["Этажей в доме"]}
                </span>
              </h1>
              <h1 className={styles.drawerSubTitle}>
                Источник: {currentPoint?.source}
              </h1>
            </Box>
          </Stack>
        </Stack>
        <Box
          sx={{
            position: "absolute",
            bottom: "32px",
            marginLeft: "16px",
            width: "calc(100% - 32px)",
          }}
        >
          <DefaultButton
            onClick={() => window.open(currentPoint?.url)}
            sx={{
              color: "black",
              padding: "16px",
              border: "1px black solid",
              width: "100%",
              fontSize: "14px",
            }}
          >
            К источнику
          </DefaultButton>
        </Box>
      </Stack>
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
                if (!isAvito) {
                  fetch("http://localhost:9000/objects-avito")
                    .then((response) => response.json())
                    .then((data) => {
                      setAvitoPointsData(data);
                      setIsAvito((prev) => !prev);
                    });
                } else {
                  setAvitoPointsData(null);
                  setIsAvito(false);
                }
              }}
              inputProps={{ "aria-label": "controlled" }}
            />
            <p className={styles.layersControlLabel}>Объекты avito.ru</p>
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
                if (!isCian) {
                  fetch("http://localhost:9000/objects-cian")
                    .then((response) => response.json())
                    .then((data) => {
                      setCianPointsData(data);
                      setIsCian((prev) => !prev);
                    });
                } else {
                  setCianPointsData(null);
                  setIsCian(false);
                }
              }}
              inputProps={{ "aria-label": "controlled" }}
            />
            <p className={styles.layersControlLabel}>Объекты cian.ru</p>
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
                if (!sob) {
                  fetch("http://localhost:9000/objects-sob")
                    .then((response) => response.json())
                    .then((data) => {
                      setIsSob((prev) => !prev);
                      setSobPointsData(data);
                    });
                } else {
                  setSobPointsData(null);
                  setIsSob(false);
                }
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
              onChange={() => {
                setCianAnalyze((prev) => !prev);
              }}
              inputProps={{ "aria-label": "controlled" }}
            />
            <p className={styles.layersControlLabel}>Анализ объектов cian.ru</p>
          </Stack>
        </Box>
      </Box>
      {cianAvalyze && (
        <Stack
          sx={{
            position: "absolute",
            zIndex: 1000,
            top: "32px",
            gap: "16px",
          }}
        >
          <h1
            className={styles.layersControlTitle}
            style={{
              textAlign: "center",
              marginLeft: "-100px",
            }}
          >
            Год постройки
          </h1>
          <PieChart
            series={[
              {
                data: Object.values(groupedCianAge)?.map((item) => {
                  return {
                    value: Number(item),
                  };
                }),
              },
            ]}
            width={400}
            height={200}
          />
          <h1
            className={styles.layersControlTitle}
            style={{
              textAlign: "center",
              marginLeft: "-100px",
            }}
          >
            Этажность
          </h1>
          <PieChart
            series={[
              {
                data: Object.values(groupedCianLevels)?.map((item) => {
                  return {
                    value: item,
                  };
                }),
              },
            ]}
            width={400}
            height={200}
          />
        </Stack>
      )}
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
        {avitoPointsData?.map((point) => (
          <Marker
            position={point?.coords}
            icon={defIcon}
            eventHandlers={{
              click: (e) => {
                setIsDrawerOpen(true);
                setCurrentPoint(point);
              },
            }}
          />
        ))}
        {cianPointsData?.map((point) => (
          <Marker
            position={point?.coords}
            icon={defIcon}
            eventHandlers={{
              click: (e) => {
                setIsDrawerOpen(true);
                setCurrentPoint(point);
              },
            }}
          />
        ))}
        {sobPointsData?.map((point) => (
          <Marker
            position={point?.coords}
            icon={defIcon}
            eventHandlers={{
              click: (e) => {
                setIsDrawerOpen(true);
                setCurrentPoint(point);
              },
            }}
          />
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
