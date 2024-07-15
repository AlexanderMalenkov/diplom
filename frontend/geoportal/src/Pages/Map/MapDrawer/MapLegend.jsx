import React from "react";
import styles from "./MapDrawer.module.css";
import { Stack, Box, keyframes } from "@mui/material";
import { DefaultButton } from "../../../UI-kit/Button/DefaultButton";
import CloseIcon from "@mui/icons-material/Close";
import { MapDefaultMarker } from "../MapDefaultMarker/MapDefaultMarker";
import { colors } from "../../../Utils/colors";

const MapLegend = ({
  currentPoint,
  isLegenOpen,
  handleClose,
  analyzeParam,
  isRoutingMachine,
  routingData,
}) => {
  const slideOutRight = keyframes` 
  from {
    transform: translateX(-200%);
  }
  to {
    transform: translateX(0%);
  }
}`;
  return (
    <Stack
      className={styles.drawer}
      sx={{
        zIndex: 999,
        display: isLegenOpen ? "flex" : "none",
        animation: isLegenOpen ? `${slideOutRight} 0.5s` : "",
        maxHeight: isRoutingMachine ? "15vh" : "50vh",
      }}
    >
      <Stack
        sx={{
          width: "100%",
        }}
      >
        <Stack
          sx={{
            padding: "6px",
            width: "100%",
            flexDirection: "row",
            justifyContent: "end",
          }}
        >
          <CloseIcon
            sx={{
              marginRight: "12px",
              cursor: "pointer",
            }}
            onClick={() => {
              handleClose();
            }}
          />
        </Stack>
        {!isRoutingMachine ? (
          <Stack
            sx={{
              padding: "16px",
            }}
          >
            <h2 className={styles.drawerTitle}>
              {analyzeParam === "year" ? "Год постройки" : "Этажность"}
            </h2>
            <Box
              sx={{
                marginTop: "32px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <Stack direction="row" alignItems="center" gap="12px">
                {" "}
                <MapDefaultMarker type="custom" color={colors[0]} isLegend />
                <h1 className={styles.drawerSubTitle}>
                  {analyzeParam === "year" ? "Младше 5 лет" : "До 5 этажей"}
                </h1>
              </Stack>
              <Stack direction="row" alignItems="center" gap="12px">
                {" "}
                <MapDefaultMarker type="custom" color={colors[2]} isLegend />
                <h1 className={styles.drawerSubTitle}>
                  {analyzeParam === "year" ? "5 - 10 лет" : "От 6 до 9 этажей"}
                </h1>
              </Stack>
              <Stack direction="row" alignItems="center" gap="12px">
                {" "}
                <MapDefaultMarker type="custom" color={colors[1]} isLegend />
                <h1 className={styles.drawerSubTitle}>
                  {analyzeParam === "year"
                    ? "10 - 20 лет"
                    : "От 10 до 14 этажей"}
                </h1>
              </Stack>
              <Stack direction="row" alignItems="center" gap="12px">
                {" "}
                <MapDefaultMarker type="custom" color={colors[3]} isLegend />
                <h1 className={styles.drawerSubTitle}>
                  {" "}
                  {analyzeParam === "year" ? "Выше 20 лет" : "Выше 14 этажей"}
                </h1>
              </Stack>
            </Box>
          </Stack>
        ) : (
          <Stack
            sx={{
              padding: "16px",
            }}
          >
            {" "}
            <h2 className={styles.drawerTitle}>
              Отчёт по маршруту
            </h2>
            <h1 className={styles.drawerSubTitle} style={{
              marginTop: '16px'
            }}>{routingData}</h1>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};

export default MapLegend;
