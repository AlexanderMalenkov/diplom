import { Stack, Box } from "@mui/material";
import React from "react";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import styles from "./MapFilters.module.css";

export const MapFilters = ({
  handleClose,
  open,
  handleFloorFilterParam,
  handleAgeFilterParam,
  floorFilterParam,
  ageFilterParam,
}) => {
  return (
    <Stack
      direction="column"
      className={styles.drawer}
      gap="6px"
      sx={{
        display: open ? "flex" : "none",
      }}
    >
      <Box
        sx={{
          padding: "12px",
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{
            width: "100%",
          }}
        >
          <h1 className={styles.drawerTitle}>Фильтры</h1>
          <ExpandLessIcon
            onClick={handleClose}
            sx={{
              height: "24px",
              cursor: "pointer",
            }}
          />
        </Stack>
        <Stack>
          <h2
            className={styles.drawerSubTitle}
            style={{
              fontWeight: "600",
              paddingTop: "12px",
              paddingBottom: "12px",
            }}
          >
            Возраст
          </h2>
          <FormGroup gap="1px">
            <FormControlLabel
              onChange={(e) =>
                handleAgeFilterParam({
                  ...ageFilterParam,
                  [e.target.name]: e.target.checked,
                })
              }
              name="less5"
              control={
                <Checkbox
                  checked={ageFilterParam.less5}
                  sx={{
                    "&, &.Mui-checked": {
                      color: "#b8533b ",
                    },
                  }}
                />
              }
              label={<p className={styles.layersControlLabel}>До 5 лет</p>}
            />{" "}
            <FormControlLabel
              onChange={(e) =>
                handleAgeFilterParam({
                  ...ageFilterParam,
                  [e.target.name]: e.target.checked,
                })
              }
              name="from6to9"
              control={
                <Checkbox
                  checked={ageFilterParam.from6to9}
                  sx={{
                    "&, &.Mui-checked": {
                      color: "#b8533b ",
                    },
                  }}
                />
              }
              label={<p className={styles.layersControlLabel}>От 6 до 9 лет</p>}
            />
            <FormControlLabel
              onChange={(e) =>
                handleAgeFilterParam({
                  ...ageFilterParam,
                  [e.target.name]: e.target.checked,
                })
              }
              name="from10to20"
              control={
                <Checkbox
                  checked={ageFilterParam.from10to20}
                  sx={{
                    "&, &.Mui-checked": {
                      color: "#b8533b ",
                    },
                  }}
                />
              }
              label={
                <p className={styles.layersControlLabel}>От 10 до 20 лет</p>
              }
            />
            <FormControlLabel
              onChange={(e) =>
                handleAgeFilterParam({
                  ...ageFilterParam,
                  [e.target.name]: e.target.checked,
                })
              }
              name="more20"
              control={
                <Checkbox
                  checked={ageFilterParam.more20}
                  sx={{
                    "&, &.Mui-checked": {
                      color: "#b8533b ",
                    },
                  }}
                />
              }
              label={<p className={styles.layersControlLabel}>Старше 20 лет</p>}
            />{" "}
          </FormGroup>
        </Stack>
        <Stack>
          <h2
            className={styles.drawerSubTitle}
            style={{
              fontWeight: "600",
              paddingTop: "12px",
              paddingBottom: "12px",
            }}
          >
            Этажность
          </h2>
          <FormGroup gap="1px">
            <FormControlLabel
              onChange={(e) =>
                handleFloorFilterParam({
                  ...floorFilterParam,
                  [e.target.name]: e.target.checked,
                })
              }
              name="less5"
              control={
                <Checkbox
                  checked={floorFilterParam.less5}
                  sx={{
                    "&, &.Mui-checked": {
                      color: "#b8533b ",
                    },
                  }}
                />
              }
              label={<p className={styles.layersControlLabel}>До 5 этажей</p>}
            />{" "}
            <FormControlLabel
              onChange={(e) =>
                handleFloorFilterParam({
                  ...floorFilterParam,
                  [e.target.name]: e.target.checked,
                })
              }
              name="from6to9"
              control={
                <Checkbox
                  checked={floorFilterParam.from6to9}
                  sx={{
                    "&, &.Mui-checked": {
                      color: "#b8533b ",
                    },
                  }}
                />
              }
              label={
                <p className={styles.layersControlLabel}>От 6 до 9 этажей</p>
              }
            />
            <FormControlLabel
              onChange={(e) =>
                handleFloorFilterParam({
                  ...floorFilterParam,
                  [e.target.name]: e.target.checked,
                })
              }
              name="from10to14"
              control={
                <Checkbox
                  checked={floorFilterParam.from10to14}
                  sx={{
                    "&, &.Mui-checked": {
                      color: "#b8533b ",
                    },
                  }}
                />
              }
              label={
                <p className={styles.layersControlLabel}>От 10 до 14 этажей</p>
              }
            />
            <FormControlLabel
              onChange={(e) =>
                handleFloorFilterParam({
                  ...floorFilterParam,
                  [e.target.name]: e.target.checked,
                })
              }
              name="more14"
              control={
                <Checkbox
                  checked={floorFilterParam.more14}
                  sx={{
                    "&, &.Mui-checked": {
                      color: "#b8533b ",
                    },
                  }}
                />
              }
              label={
                <p className={styles.layersControlLabel}>Выше 14 этажей</p>
              }
            />{" "}
          </FormGroup>
        </Stack>
      </Box>
    </Stack>
  );
};
