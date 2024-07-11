import React, { useEffect, useMemo, useState } from "react";
import { Box, Stack } from "@mui/material";

import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { districtCoordinates } from "../../Utils/contstants";
import districtBorders from "../../Utils/otradnoe.geojsonl.json";
import { MapControl } from "./MapControl/MapControl";
import MapLegend from "./MapDrawer/MapLegend";

import Tooltip from "@mui/material/Tooltip";

import MarkerClusterGroup from "react-leaflet-cluster";

import { VectorLayer } from "./VectorLayer";
import { AnalyzeLayer } from "./AnalyzeLayer";
import MapDrawer from "./MapDrawer/MapDrawer";
import * as ReactDOMServer from "react-dom/server";
import styles from "./Map.module.css";

import { MapDefaultMarker } from "./MapDefaultMarker/MapDefaultMarker";
import { DefaultButton } from "../../UI-kit/Button/DefaultButton";
import MapControlLayer from "./MapControlLayer";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { AnalyzeModal } from "./AnalyzeModal/AnalyzeModal";
import { colors } from "../../Utils/colors";

export const Map = () => {
  const currentBorders = districtBorders?.geometry?.coordinates[0][0]?.map(
    (coordinates) => {
      return [coordinates[1], coordinates[0]];
    }
  );

  const [kadastrData, setKadastrData] = useState([]);

  const [isKadastrDataDisplay, setIsKadastrDataDisplay] = useState(false);

  const [newBuildings, setNewBuildings] = useState([]);

  const [metro, setMetro] = useState([]);

  const [isNewBuildingsDataDisplay, setIsNewBuildingsDataDisplay] =
    useState(false);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [isCurrentBorders, setIsCurrentBorders] = useState(false);

  const [currentPoint, setCurrentPoint] = useState(null);

  const [analyzeParam, setAnalyzeParam] = useState("none");

  const [currentMap, setCurrentMap] = useState("mapTiler");

  const [isAnalyze, setIsAnalyze] = useState(false);

  const [isOpenAnalyzeData, setIsOpenAnalyzeData] = useState(false);

  const [analyzeData, setAnalyzeData] = useState([]);

  const [isLegenOpen, setIsLegendOpen] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:9000/kadastr`)
      .then((response) => response.json())
      .then((data) => {
        setKadastrData(data);
      });
    fetch(`http://localhost:9000/new_buildings`)
      .then((response) => response.json())
      .then((data) => {
        setNewBuildings(data);
      });
    fetch(`http://localhost:9000/metro`)
      .then((response) => response.json())
      .then((data) => {
        setMetro(data);
      });
  }, []);

  useEffect(() => {
    if (isAnalyze) {
      setIsKadastrDataDisplay(true);
      setIsNewBuildingsDataDisplay(false);
    }
  }, [isAnalyze]);

  const getCurrentColorIconClassificate = (object) => {
    const age = new Date().getFullYear() - object?.year;
    if (object?.year > 0) {
      if (age < 5) {
        return colors?.[0];
      }
      if (age >= 5 && age <= 10) {
        return colors?.[2];
      }
      if (age >= 10 && age <= 20) {
        return colors?.[1];
      }
      if (age > 20) {
        return colors?.[3];
      }
    }
  };

  useEffect(() => {
    if (analyzeParam === "year") {
      setIsLegendOpen(true);
    }
  }, [analyzeParam]);

  return (
    <>
      <Box
        sx={{
          maxWidth: "100vw",
          height: "100vh",
          overflowY: "hidden !important",
        }}
      >
        {isAnalyze && (
          <Stack
            sx={{
              position: "absolute",
              zIndex: "1000",
              left: "30vw",
              top: "1vh",
            }}
            className={styles.mapTitle}
          >
            Выберите объект для анализа
          </Stack>
        )}
        <MapControl
          currentMap={currentMap}
          setCurrentMap={setCurrentMap}
          analyzeParam={analyzeParam}
          setAnalyzeParam={setAnalyzeParam}
          isCurrentBorders={isCurrentBorders}
          setIsCurrentBorders={setIsCurrentBorders}
          isKadastrDataDisplay={isKadastrDataDisplay}
          setIsKadastrDataDisplay={setIsKadastrDataDisplay}
          isNewBuildingsDataDisplay={isNewBuildingsDataDisplay}
          setIsNewBuildingsDataDisplay={setIsNewBuildingsDataDisplay}
          setIsAnalyze={setIsAnalyze}
          isAnalyze={isAnalyze}
        />
        <MapContainer
          maxZoom={19}
          zoom={14}
          center={districtCoordinates}
          scrollWheelZoom={true}
          style={{
            width: "inherit",
            height: "inherit",
          }}
        >
          <VectorLayer />
          {currentMap === "OSM" && (
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          )}
          {currentMap === "stadia" && (
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.{ext}"
            />
          )}
          {currentMap === "mtbMap" && (
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &amp;'
              url="http://tile.mtbmap.cz/mtbmap_tiles/{z}/{x}/{y}.png"
            />
          )}

          {isCurrentBorders && (
            <Polyline
              pathOptions={{
                color: "#B8533B",
              }}
              positions={currentBorders}
            />
          )}
          <MarkerClusterGroup>
            {isKadastrDataDisplay &&
              kadastrData?.map((item) => {
                return (
                  <Marker
                    eventHandlers={{
                      click: () => {
                        setCurrentPoint(item);
                      },
                    }}
                    key={item?.id}
                    position={[item?.coord_lat, item?.coord_lng]}
                    icon={L.divIcon({
                      iconAnchor: [15, 37],
                      popupAnchor: [6, -27],
                      className: "custom-icon",
                      html: ReactDOMServer.renderToString(
                        <MapDefaultMarker
                          type={analyzeParam !== "none" ? "custom" : "default"}
                          color={getCurrentColorIconClassificate(item)}
                        />
                      ),
                    })}
                  >
                    <Popup>
                      <Stack direction="column" gap="16px">
                        <Stack direction="row" gap="16px">
                          <Stack>
                            <Tooltip
                              title="Кадастровый номер здания"
                              placement="left"
                            >
                              <InfoOutlinedIcon
                                sx={{
                                  width: "12px",
                                  top: "9px !important",
                                  left: "18px !important",
                                  cursor: "pointer",
                                }}
                              />
                            </Tooltip>
                            <Box
                              sx={{
                                position: "relative",
                                left: "12px !important",
                              }}
                            >
                              КНЗ:
                            </Box>
                          </Stack>
                          <Stack
                            sx={{
                              fontWeight: "700",
                              cursor: "pointer",
                            }}
                          >
                            {item?.kadastr_number}
                          </Stack>
                        </Stack>
                        <DefaultButton
                          sx={{
                            color: "black",
                          }}
                          onClick={() => {
                            // setIsLegendOpen(false);
                            isAnalyze
                              ? setIsOpenAnalyzeData(true)
                              : setIsDrawerOpen(true);
                          }}
                        >
                          {isAnalyze ? "Подтвердить" : "Подробнее"}
                        </DefaultButton>
                      </Stack>
                    </Popup>
                  </Marker>
                );
              })}
          </MarkerClusterGroup>
          <MarkerClusterGroup>
            {isNewBuildingsDataDisplay &&
              newBuildings?.map((item) => {
                return (
                  <Marker
                    eventHandlers={{
                      click: () => {
                        setCurrentPoint(item);
                      },
                    }}
                    key={item?.id}
                    position={[item?.coord_lat, item?.coord_lng]}
                    icon={L.divIcon({
                      iconAnchor: [15, 37],
                      popupAnchor: [6, -27],
                      className: "custom-icon",
                      html: ReactDOMServer.renderToString(
                        <MapDefaultMarker type={item?.type} />
                      ),
                    })}
                  >
                    {" "}
                    <Popup>
                      <Stack direction="column" gap="16px">
                        <Stack direction="row" gap="16px">
                          <Stack>
                            <Tooltip
                              title="Кадастровый номер здания"
                              placement="left"
                            ></Tooltip>
                          </Stack>
                          <Stack>ЖК {item?.title}</Stack>
                        </Stack>
                        <DefaultButton
                          sx={{
                            color: "black",
                          }}
                          onClick={() => {
                            setIsLegendOpen(false);
                            window.open(item?.url);
                          }}
                        >
                          Подробнее
                        </DefaultButton>
                      </Stack>
                    </Popup>
                  </Marker>
                );
              })}
          </MarkerClusterGroup>
          <AnalyzeLayer
            metro={metro}
            currentPoint={currentPoint}
            setAnalyzeData={setAnalyzeData}
          />
          <MapControlLayer
            currentPoint={currentPoint}
            isDrawerOpen={isDrawerOpen}
          />
        </MapContainer>
      </Box>
      <AnalyzeModal
        open={isOpenAnalyzeData}
        handleClose={() => setIsOpenAnalyzeData(false)}
        currentPoint={currentPoint}
        analyzeData={analyzeData}
      />
      <MapDrawer
        currentPoint={currentPoint}
        isDrawerOpen={isDrawerOpen}
        handleClose={() => {
          setIsDrawerOpen(false);
        }}
      />
      <MapLegend
        isLegenOpen={isLegenOpen}
        handleClose={() => {
          setIsLegendOpen(false);
        }}
      />
    </>
  );
};
