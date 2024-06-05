import React from "react";
import styles from "./Main.module.css";
import { DefaultButton } from "../../UI-kit/Button/DefaultButton";
import { Stack } from "@mui/material";

export const Main = () => {
  return (
    <div className={styles.mainWrapper}>
      <div className={styles.mainContent}>
        <Stack>
          <h1 className={styles.mainTitle}>
            Геопортал для моделирования жилищного фонда района Отрадное
          </h1>
          <DefaultButton
            sx={{
              width: "30vw",
              marginTop: "48px",
              fontSize: "22px",
              padding: "24px",
              borderRadius: "100px",
            }}
          >
            На карту
          </DefaultButton>
        </Stack>
      </div>
    </div>
  );
};
