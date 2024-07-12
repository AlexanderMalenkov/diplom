import React from "react";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Stack } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import { StandartSwitch } from "../../../UI-kit/Switch/StandartSwitch";
import styles from "./MapControl.module.css";
import { DefaultButton } from "../../../UI-kit/Button/DefaultButton";

export const MapControl = ({
  isCurrentBorders,
  setIsCurrentBorders,
  isKadastrDataDisplay,
  setIsKadastrDataDisplay,
  isNewBuildingsDataDisplay,
  setIsNewBuildingsDataDisplay,
  analyzeParam,
  setAnalyzeParam,
  setIsAnalyze,
  isAnalyze,
  setCurrentMap,
  currentMap,
  handleRoutintMachine
}) => {
  return (
    <Box className={styles.layersControl}>
      <h2 className={styles.layersControlTitle}>
        Инструмент управления картой
      </h2>
      <Box>
        <Accordion
          sx={{
            marginTop: " 32px",
          }}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <h3 className={styles.layersControlSubTitle}>
              Картографическая основа
            </h3>
          </AccordionSummary>
          <AccordionDetails>
            <Box
              sx={{
                paddingBottom: "16px",
                display: "flex",
                gap: "16px",
                flexDirection: "column",
              }}
            >
              <Stack direction="row" alignItems="center">
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={currentMap}
                  onChange={(e) => setCurrentMap(e.target.value)}
                >
                  <FormControlLabel
                    value="mapTiler"
                    control={
                      <Radio
                        sx={{
                          "&, &.Mui-checked": {
                            color: "#b8533b ",
                          },
                        }}
                      />
                    }
                    label={
                      <p className={styles.layersControlLabel}>MapTiler</p>
                    }
                  />
                  <FormControlLabel
                    value="OSM"
                    control={
                      <Radio
                        sx={{
                          "&, &.Mui-checked": {
                            color: "#b8533b ",
                          },
                        }}
                      />
                    }
                    label={
                      <p className={styles.layersControlLabel}>OpenStreetMap</p>
                    }
                  />

                  <FormControlLabel
                    value="mtbMap"
                    control={
                      <Radio
                        sx={{
                          "&, &.Mui-checked": {
                            color: "#b8533b ",
                          },
                        }}
                      />
                    }
                    label={<p className={styles.layersControlLabel}>MtbMap</p>}
                  />
                </RadioGroup>
              </Stack>
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion
          sx={{
            marginTop: " 32px",
          }}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <h3 className={styles.layersControlSubTitle}>Тематические слои</h3>
          </AccordionSummary>
          <AccordionDetails>
            <Box
              sx={{
                paddingBottom: "16px",
                display: "flex",
                gap: "16px",
                flexDirection: "column",
              }}
            >
              <Stack direction="row" alignItems="center">
                <StandartSwitch
                  checked={isCurrentBorders}
                  onChange={() => {
                    setIsCurrentBorders((prev) => !prev);
                  }}
                  inputProps={{ "aria-label": "controlled" }}
                />
                <p className={styles.layersControlLabel}>Границы района</p>
              </Stack>

              <Stack direction="row" alignItems="center">
                <StandartSwitch
                  checked={isKadastrDataDisplay}
                  onChange={() => {
                    setIsKadastrDataDisplay((prev) => !prev);
                  }}
                  inputProps={{ "aria-label": "controlled" }}
                />
                <p className={styles.layersControlLabel}>Объекты росреестра</p>
              </Stack>
              <Stack direction="row" alignItems="center">
                <StandartSwitch
                  checked={isNewBuildingsDataDisplay}
                  onChange={() => {
                    setIsNewBuildingsDataDisplay((prev) => !prev);
                  }}
                  inputProps={{ "aria-label": "controlled" }}
                />
                <p className={styles.layersControlLabel}>
                  Объекты застройщиков
                </p>
              </Stack>
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion
          sx={{
            marginTop: " 32px",
          }}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <h3 className={styles.layersControlSubTitle}>Классификация</h3>
          </AccordionSummary>
          <AccordionDetails>
            <Box
              sx={{
                paddingBottom: "16px",
                display: "flex",
                gap: "16px",
                flexDirection: "column",
              }}
            >
              <Stack direction="row" alignItems="center">
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={analyzeParam}
                  onChange={(e) => setAnalyzeParam(e.target.value)}
                >
                  <FormControlLabel
                    value="none"
                    control={
                      <Radio
                        sx={{
                          "&, &.Mui-checked": {
                            color: "#b8533b ",
                          },
                        }}
                      />
                    }
                    label={
                      <p className={styles.layersControlLabel}>Не выбрано</p>
                    }
                  />
                  <FormControlLabel
                    value="year"
                    control={
                      <Radio
                        sx={{
                          "&, &.Mui-checked": {
                            color: "#b8533b ",
                          },
                        }}
                      />
                    }
                    label={<p className={styles.layersControlLabel}>Возраст</p>}
                  />
                  <FormControlLabel
                    value="floor"
                    control={
                      <Radio
                        sx={{
                          "&, &.Mui-checked": {
                            color: "#b8533b ",
                          },
                        }}
                      />
                    }
                    label={
                      <p className={styles.layersControlLabel}>Этажность</p>
                    }
                  />

                  {/* <FormControlLabel
                    value="project"
                    control={
                      <Radio
                        sx={{
                          "&, &.Mui-checked": {
                            color: "#b8533b ",
                          },
                        }}
                      />
                    }
                    label={<p className={styles.layersControlLabel}>Проект</p>}
                  /> */}
                </RadioGroup>
              </Stack>
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion
          sx={{
            marginTop: " 32px",
          }}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <h3 className={styles.layersControlSubTitle}>Анализ</h3>
          </AccordionSummary>
          <AccordionDetails>
            <Box
              sx={{
                paddingBottom: "16px",
                display: "flex",
                gap: "16px",
                flexDirection: "column",
              }}
            >
              <Stack direction="column">
                <p className={styles.layersControlLabel}>
                  Расчёт расстояния до ближайших станций метро
                </p>
                <DefaultButton
                  onClick={() => {
                    setIsAnalyze((prev) => !prev);
                    if (isAnalyze) {
                      handleRoutintMachine(false);
                    }
                  }}
                  sx={{
                    marginTop: "16px",
                    color: "black",
                  }}
                >
                  {isAnalyze ? "Отмена" : "Выберите объект"}
                </DefaultButton>
              </Stack>
            </Box>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
};
