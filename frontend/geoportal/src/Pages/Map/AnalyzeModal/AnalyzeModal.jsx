import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

import styles from "./AnalyzeModal.module.css";
import { Stack } from "@mui/material";
import { DefaultButton } from "../../../UI-kit/Button/DefaultButton";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const AnalyzeModal = ({
  open,
  handleClose,
  currentPoint,
  analyzeData,
  setAnalyzeData,
  handleRoutintMachine,
}) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle className={styles.analyzeModalTitle}>
        Анализ объекта №{" "}
        <span style={{ fontWeight: 800 }}>{currentPoint?.kadastr_number}</span>
      </DialogTitle>
      <DialogContent className={styles.analyzeModalText}>
        <Stack gap="12px">
          {analyzeData?.map((item) => {
            return (
              <>
                <h1>
                  Расстояние до {item?.object}:{" "}
                  <span
                    style={{
                      fontWeight: 800,
                    }}
                  >
                    {item?.distance} км
                  </span>
                </h1>
                <DefaultButton
                  sx={{
                    color: "black",
                  }}
                  onClick={() => {
                    setAnalyzeData(
                      analyzeData?.filter((current) => current.id === item.id)
                    );
                    handleRoutintMachine(true);
                    handleClose();
                    // window.open(
                    //   `https://yandex.ru/maps/213/moscow/?mode=routes&rtext=${item?.points?.[0]?.coord_lat}%2C${item?.points?.[0]?.coord_lng}~${item?.points?.[1]?.coord_lat}%2C${item?.points?.[1]?.coord_lng}`
                    // );
                  }}
                >
                  Перейти к маршруту
                </DefaultButton>
              </>
            );
          })}
        </Stack>
      </DialogContent>
      <DialogActions>
        <DefaultButton onClick={handleClose} sx={{ color: "black" }}>
          Закрыть
        </DefaultButton>
      </DialogActions>
    </Dialog>
  );
};
