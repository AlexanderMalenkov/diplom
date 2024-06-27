import React, { useEffect, useState } from "react";
import { Box, Stack } from "@mui/material";

import {
  MapContainer,
  Marker,
  TileLayer,
  Polyline,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { districtCoordinates } from "../../Utils/contstants";
import districtBorders from "../../Utils/otradnoe.geojsonl.json";
import { MapControl } from "./MapControl/MapControl";

import Tooltip from "@mui/material/Tooltip";

import MarkerClusterGroup from "react-leaflet-cluster";

import { VectorLayer } from "./VectorLayer";
import MapDrawer from "./MapDrawer/MapDrawer";
import * as ReactDOMServer from "react-dom/server";

import { MapDefaultMarker } from "./MapDefaultMarker/MapDefaultMarker";
import { DefaultButton } from "../../UI-kit/Button/DefaultButton";
import MapControlLayer from "./MapControlLayer";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

export const Map = () => {
  const currentBorders = districtBorders?.geometry?.coordinates[0][0]?.map(
    (coordinates) => {
      return [coordinates[1], coordinates[0]];
    }
  );

  const [kadastrData, setKadastrData] = useState([]);

  const [isKadastrDataDisplay, setIsKadastrDataDisplay] = useState(false);

  const [newBuildings, setNewBuildings] = useState([]);

  const [isNewBuildingsDataDisplay, setIsNewBuildingsDataDisplay] =
    useState(false);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [isCurrentBorders, setIsCurrentBorders] = useState(false);

  const [currentPoint, setCurrentPoint] = useState(null);

  const [analyzeParam, setAnalyzeParam] = useState("none");

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
  }, []);

  // const uniqueSeries = kadastrData?.map((item) => {
  //   return {
  //     id: item?.id,
  //     seria: item?.house_seria.toUpperCase().includes("ИНДИВИД")
  //       ? "Индивидуальный проект"
  //       : item?.house_seria,
  //   };
  // });

  return (
    <>
      <Box
        sx={{
          maxWidth: "100vw",
          height: "100vh",
          overflowY: "hidden !important",
        }}
      >
        <MapControl
          analyzeParam={analyzeParam}
          setAnalyzeParam={setAnalyzeParam}
          isCurrentBorders={isCurrentBorders}
          setIsCurrentBorders={setIsCurrentBorders}
          isKadastrDataDisplay={isKadastrDataDisplay}
          setIsKadastrDataDisplay={setIsKadastrDataDisplay}
          isNewBuildingsDataDisplay={isNewBuildingsDataDisplay}
          setIsNewBuildingsDataDisplay={setIsNewBuildingsDataDisplay}
        />
        <MapContainer
          maxZoom={19}
          zoom={13}
          center={districtCoordinates}
          scrollWheelZoom={true}
          style={{
            width: "inherit",
            height: "inherit",
          }}
        >
          <VectorLayer />
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
                        <MapDefaultMarker type="default" />
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
                            setIsDrawerOpen(true);
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
          <MapControlLayer
            currentPoint={currentPoint}
            isDrawerOpen={isDrawerOpen}
          />
        </MapContainer>
      </Box>
      <MapDrawer
        currentPoint={currentPoint}
        isDrawerOpen={isDrawerOpen}
        handleClose={() => {
          setIsDrawerOpen(false);
        }}
      />
    </>
  );
};
