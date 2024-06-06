import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";

export const DefaultButton = styled(Button)(({ theme }) => ({
  padding: "10px 16px",
  fontSize: "12px",
  fontStyle: "normal",
  fontWeight: 500,
  lineHeight: "12px",
  letterSpacing: "0.12px",
  // backgroundColor: "#e5d7c1",
  border: "2px #e5d7c1 solid",
  "backdrop-filter": "blur(10px)",

  color: "#e5d7c1",
  "&:hover": {
    backgroundColor: "#e5d7c1",
    color: "#563c2d",
  },
}));
