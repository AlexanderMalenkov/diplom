import React from "react";
import styles from "./MapDrawer.module.css";
import { Stack, Box, keyframes } from "@mui/material";
import { DefaultButton } from "../../../UI-kit/Button/DefaultButton";
import CloseIcon from "@mui/icons-material/Close";

const MapDrawer = ({ currentPoint, isDrawerOpen, handleClose }) => {
  console.log(currentPoint);
  const slideOutRight = keyframes` 
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
}`;
  return (
    <Stack
      className={styles.drawer}
      sx={{
        display: isDrawerOpen ? "flex" : "none",
      }}
      //   sx={{
      //     transform: isDrawerOpen ? "translateX(-200%)" : "translateX(0%)",
      //     animation: isDrawerOpen ? `${slideOutRight} 0.5s` : "",
      //   }}
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
              cursor: 'pointer'
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
          <h2 className={styles.drawerTitle}>
            Объект № {currentPoint?.kadastr_number}
          </h2>
          <p className={styles.drawerText}>{currentPoint?.address}</p>

          <Box
            sx={{
              marginTop: "16px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <h1 className={styles.drawerSubTitle}>
              Кадастровая стоимость:{" "}
              <span
                style={{
                  fontWeight: 800,
                }}
              >
                {currentPoint?.kadastr_cost} ₽
              </span>
            </h1>
            <h1 className={styles.drawerSubTitle}>
              Общая площадь:{" "}
              <span
                style={{
                  fontWeight: 800,
                }}
              >
                {currentPoint?.area} кв. м
              </span>
            </h1>
            <h1 className={styles.drawerSubTitle}>
              Этажность:{" "}
              <span
                style={{
                  fontWeight: 800,
                }}
              >
                {currentPoint?.floor}
              </span>
            </h1>
            <h1 className={styles.drawerSubTitle}>
              Количество жилых помещений:{" "}
              <span
                style={{
                  fontWeight: 800,
                }}
              >
                {currentPoint?.residential_count}
              </span>
            </h1>
            <h1 className={styles.drawerSubTitle}>
              Тип проекта:{" "}
              <span
                style={{
                  fontWeight: 800,
                }}
              >
                {currentPoint?.house_seria}
              </span>
            </h1>
            <h1 className={styles.drawerSubTitle}>
              Организация:{" "}
              <span
                style={{
                  fontWeight: 800,
                }}
              >
                {currentPoint?.organization}
              </span>
            </h1>
            <h1 className={styles.drawerSubTitle}>
              Год постройки:{" "}
              <span
                style={{
                  fontWeight: 800,
                }}
              >
                {currentPoint?.year}
              </span>
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
          onClick={() =>
            window.open(
              `https://xn----8sbfkauo0anebcjdfk0n.xn--p1acf/moskva/${currentPoint?.kadastr_number.replace(
                /:/g,
                "-"
              )}/_secdc52b7535fe`
            )
          }
          sx={{
            color: "black",
            padding: "16px",
            border: "1px black solid",
            width: "100%",
            fontSize: "14px",
          }}
        >
          Заказать выписку
        </DefaultButton>
      </Box>
    </Stack>
  );
};

export default MapDrawer;
