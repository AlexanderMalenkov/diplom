import React, { useMemo } from "react";
import styles from "./MapDefaultMarker.module.css";
import PIK from "../../../Assets/PIK.svg";
import KROST from "../../../Assets/KROST.jpg";

export const MapDefaultMarker = ({ type, color, isLegend }) => {
  return (
    <div
      className={styles.mapIcon}
      style={{
        backgroundColor: type === "custom" ? color : "",
      }}
    >
      {type === "custom" && (
        <div
          style={{
            position: "relative",
            top: isLegend ? '0px' : "-12px",
            right: isLegend ? 0 : "12px",
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-dhaba5"
            focusable="false"
            aria-hidden="true"
            data-testid="ApartmentIcon"
            fill="white"
          >
            <path d="M17 11V3H7v4H3v14h8v-4h2v4h8V11zM7 19H5v-2h2zm0-4H5v-2h2zm0-4H5V9h2zm4 4H9v-2h2zm0-4H9V9h2zm0-4H9V5h2zm4 8h-2v-2h2zm0-4h-2V9h2zm0-4h-2V5h2zm4 12h-2v-2h2zm0-4h-2v-2h2z"></path>
          </svg>
        </div>
      )}
      {type === "default" && (
        <div
          style={{
            position: "relative",
            top: "-12px",
            right: "12px",
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-dhaba5"
            focusable="false"
            aria-hidden="true"
            data-testid="ApartmentIcon"
          >
            <path d="M17 11V3H7v4H3v14h8v-4h2v4h8V11zM7 19H5v-2h2zm0-4H5v-2h2zm0-4H5V9h2zm4 4H9v-2h2zm0-4H9V9h2zm0-4H9V5h2zm4 8h-2v-2h2zm0-4h-2V9h2zm0-4h-2V5h2zm4 12h-2v-2h2zm0-4h-2v-2h2z"></path>
          </svg>
        </div>
      )}
      {type === "PIK" && (
        <img
          src={PIK}
          style={{
            maxWidth: "24px !important",
            maxHeight: "24px !important",
          }}
        />
      )}
      {type === "MALEVICH" && (
        <img
          src={KROST}
          style={{
            maxWidth: "24px !important",
            maxHeight: "24px !important",
          }}
        />
      )}
    </div>
  );
};
