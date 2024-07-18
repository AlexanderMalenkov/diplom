import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

import styles from "./AdvertisementModal.module.css";
import { Stack, Box, Divider } from "@mui/material";
import { DefaultButton } from "../../../UI-kit/Button/DefaultButton";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const AdvertisementModal = ({
  open,
  handleClose,
  currentPoint,
  advertisements,
}) => {
  const currentInfo = React.useMemo(() => {
    const data = advertisements?.filter(
      (item) => item?.parent_id === currentPoint?.id
    );
    if (data) return data;
  }, [currentPoint, advertisements]);
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle className={styles.advertisementModalTitle}>
        Объявления по объекту №{" "}
        <span style={{ fontWeight: 800 }}>{currentPoint?.kadastr_number}</span>
      </DialogTitle>
      <DialogContent className={styles.advertisementModalText}>
        <Divider />
        {currentInfo?.map((item) => {
          return (
            <>
              <Stack
                gap="12px"
                direction="row"
                sx={{
                  marginTop: "16px",
                }}
              >
                <Stack
                  sx={{
                    width: "111px",
                    height: "111px",
                    backgroundImage: `url(${item?.img_url})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    borderRadius: "5px",
                  }}
                />
                <Stack direction="column" justifyContent="space-between">
                  <h1
                    style={{
                      fontWeight: 800,
                    }}
                  >
                    {item?.title}
                  </h1>
                  <h1>
                    Тип аренды:{" "}
                    <span
                      style={{
                        fontWeight: 800,
                      }}
                    >
                      {item?.type === "long"
                        ? "длительный"
                        : "посуточно"}
                    </span>
                  </h1>
                  <h1>
                    Цена:{" "}
                    <span
                      style={{
                        fontWeight: 800,
                      }}
                    >
                      {item?.price}₽
                    </span>
                  </h1>
                  <DefaultButton sx={{ color: "black" }} onClick={() => {
                    window.open(item?.original_url)
                  }}>
                    Перейти к объявлению
                  </DefaultButton>
                </Stack>
              </Stack>
              <Divider
                sx={{
                  marginTop: "16px",
                }}
              />
            </>
          );
        })}
      </DialogContent>
      <DialogActions>
        <DefaultButton onClick={handleClose} sx={{ color: "black" }}>
          Закрыть
        </DefaultButton>
      </DialogActions>
    </Dialog>
  );
};
