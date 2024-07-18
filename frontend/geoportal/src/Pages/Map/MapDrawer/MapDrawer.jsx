import React from "react";
import styles from "./MapDrawer.module.css";
import { Stack, Box, keyframes } from "@mui/material";
import { DefaultButton } from "../../../UI-kit/Button/DefaultButton";
import CloseIcon from "@mui/icons-material/Close";
import { enqueueSnackbar } from "notistack";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import NorthEastOutlinedIcon from "@mui/icons-material/NorthEastOutlined";

const MapDrawer = ({
  currentPoint,
  isDrawerOpen,
  handleClose,
  handleAdvertisementModalOpen,
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
        zIndex: 1001,
        display: isDrawerOpen ? "flex" : "none",
        animation: isDrawerOpen ? `${slideOutRight} 0.5s` : "",
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
          <h2 className={styles.drawerTitle}>
            Объект № {currentPoint?.kadastr_number}{" "}
            <ContentCopyIcon
              onClick={() => {
                navigator.clipboard.writeText(currentPoint?.kadastr_number);
                enqueueSnackbar("Кадастровый номер скопиран в буфер обмена!", {
                  variant: "info",
                });
              }}
              sx={{
                width: "18px",
                height: "18px",
                position: "relative",
                top: "3px",
                left: "3px",
                cursor: "pointer",
              }}
            />
          </h2>
          <p className={styles.drawerText}>{currentPoint?.address}</p>

          <Box
            sx={{
              marginTop: "16px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
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
            <h1 className={styles.drawerSubTitle}>
              Смотреть объявления
              <NorthEastOutlinedIcon
                onClick={() => {
                  handleAdvertisementModalOpen(true);
                }}
                sx={{
                  width: "18px",
                  height: "18px",
                  position: "relative",
                  top: "3px",
                  left: "3px",
                  cursor: "pointer",
                }}
              />
            </h1>
          </Box>
        </Stack>
      </Stack>
      <Box
        sx={{
          // position: "absolute",
          // bottom: "32px",
          marginBottom: '32px',
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
              )}/`
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
