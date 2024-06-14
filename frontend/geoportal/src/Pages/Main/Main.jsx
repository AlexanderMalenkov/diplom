import React from "react";
import styles from "./Main.module.css";
import { DefaultButton } from "../../UI-kit/Button/DefaultButton";
import { Stack } from "@mui/material";
import { keyframes } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const Main = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.mainContent}>
        <Stack>
          <h1 className={styles.mainTitle}>
            Геопортал для моделирования жилищного фонда района Отрадное
          </h1>
          <DefaultButton
            className={styles.mainButton}
            onClick={() => {
              navigate("/map");
            }}
          >
            <span>На карту</span>
          </DefaultButton>
        </Stack>
      </div>
    </div>
  );
};
