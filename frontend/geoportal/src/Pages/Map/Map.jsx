import React, { useEffect, useState } from "react";
import { Box, Stack, TextField } from "@mui/material";
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
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Slider from "@mui/material/Slider";

import { DefaultButton } from "../../UI-kit/Button/DefaultButton";

import icon from "../../Assets/Icon.svg";
import blueIcon from "../../Assets/IconBlue.svg";
import blackIcon from "../../Assets/IconBlack.svg";

import { VectorLayer } from "./VectorLayer";
export const Map = () => {
  const currentBorders = districtBorders?.geometry?.coordinates[0][0]?.map(
    (coordinates) => {
      return [coordinates[1], coordinates[0]];
    }
  );

  // const area = currentBorders
  //   ?.map((item, index) => {
  //     return `area[${index}][lat]=${item[1]}&area[${index}][lng]=${item[0]}&`;
  //   })
  //   .join("");

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000000);
  const slideOutRight = keyframes` 
    from {
      transform: translateX(-200%);
    }
    to {
      transform: translateX(0%);
    }
  }`;

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [isCurrentBorders, setIsCurrentBorders] = useState(false);

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
          Инструмент управления картой
        </h2>
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
                      fetch(
                        `http://localhost:9000/objects-avito?price1=${minPrice}&price2=${maxPrice}`
                      )
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
                      fetch(
                        `http://localhost:9000/objects-cian?price1=${minPrice}&price2=${maxPrice}`
                      )
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
                <p className={styles.layersControlLabel}>
                  Анализ объектов cian.ru
                </p>
              </Stack>
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion
          sx={{
            marginTop: " 32px",
          }}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <h3 className={styles.layersControlSubTitle}>Фильтры</h3>
          </AccordionSummary>
          <AccordionDetails>
            <Box
              sx={{
                paddingTop: "16px",
                paddingBottom: "16px",
              }}
            >
              <p className={styles.layersControlLabel}>Цена, ₽</p>
              <Stack
                direction="row"
                gap="16px"
                sx={{
                  marginTop: "16px",
                  marginBottom: "32px",
                }}
              >
                <TextField variant="outlined" label="От" name="min" />
                <TextField
                  variant="outlined"
                  label="До"
                  name="max"
                  onChange={(e) => {
                    setMaxPrice(e.target.value);
                  }}
                />
              </Stack>
              <p className={styles.layersControlLabel}>Тип объявлений</p>
              <FormGroup
                sx={{
                  marginTop: "16px",
                  marginBottom: "16px",
                }}
              >
                <FormControlLabel control={<Checkbox />} label="Продам" />
                <FormControlLabel
                  required
                  control={<Checkbox />}
                  label="Сдам"
                />
                <FormControlLabel control={<Checkbox />} label="Куплю" />
                <FormControlLabel control={<Checkbox />} label="Сниму" />
              </FormGroup>
              <p className={styles.layersControlLabel}>
                Расстояние от метро, км.
              </p>
              <Slider
                min={0}
                step={1}
                max={10}
                valueLabelDisplay="auto"
                aria-labelledby="non-linear-slider"
              />
            </Box>
          </AccordionDetails>
        </Accordion>
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
        {/* <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        /> */}
        {avitoPointsData?.map((point) => (
          <Marker
            position={point?.coords}
            icon={avitoIcon}
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
            icon={darkIcon}
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
              color: "#B8533B",
            }}
            positions={currentBorders}
          />
        )}
        <VectorLayer />
      </MapContainer>
    </Box>
  );
};
