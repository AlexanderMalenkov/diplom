import React from "react";
import styles from "./MapDrawer.module.css";
import { Stack, Box, keyframes } from "@mui/material";
import { DefaultButton } from "../../../UI-kit/Button/DefaultButton";
import CloseIcon from "@mui/icons-material/Close";
import { MapDefaultMarker } from "../MapDefaultMarker/MapDefaultMarker";
import { colors } from "../../../Utils/colors";

const MapLegend = ({ currentPoint, isLegenOpen, handleClose }) => {
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
        zIndex: 1000,
        display: isLegenOpen ? "flex" : "none",
        animation: isLegenOpen ? `${slideOutRight} 0.5s` : "",
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
        <Stack
          sx={{
            padding: "16px",
          }}
        >
          <h2 className={styles.drawerTitle}>Возраст</h2>
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
              <h1 className={styles.drawerSubTitle}>Младше 5 лет</h1>
            </Stack>
            <Stack direction="row" alignItems="center" gap="12px">
              {" "}
              <MapDefaultMarker type="custom" color={colors[2]} isLegend />
              <h1 className={styles.drawerSubTitle}>5 - 10 лет</h1>
            </Stack>
            <Stack direction="row" alignItems="center" gap="12px">
              {" "}
              <MapDefaultMarker type="custom" color={colors[1]} isLegend />
              <h1 className={styles.drawerSubTitle}>10 - 20 лет</h1>
            </Stack>
            <Stack direction="row" alignItems="center" gap="12px">
              {" "}
              <MapDefaultMarker type="custom" color={colors[3]} isLegend />
              <h1 className={styles.drawerSubTitle}>Выше 20 лет</h1>
            </Stack>
          </Box>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default MapLegend;
