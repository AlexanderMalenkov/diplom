import React from 'react';
import styles from './MapDrawer.module.css';
import { Stack, Box } from '@mui/material';
import { DefaultButton } from "../../UI-kit/Button/DefaultButton";
import CloseIcon from "@mui/icons-material/Close";

const MapDrawer = ({currentPoint, isDrawerOpen, handleClose}) => {

  return (
    <Stack
    className={styles.drawer}
    sx={{
      transform: isDrawerOpen ? "translateX(0%)" : "translateX(-200%)",
    //   animation: isDrawerOpen ? `${slideOutRight} 0.5s` : "",
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
            handleClose();
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
  )
}

export default MapDrawer