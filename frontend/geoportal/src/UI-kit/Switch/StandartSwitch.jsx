import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";

export const StandartSwitch = styled(Switch)(({ theme }) => ({
    width: 72,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
      margin: 1,
      padding: 0,
      transform: 'translateX(6px)',
      '&.Mui-checked': {
        color: '#e5d7c1',
        transform: 'translateX(32px)',
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: '#dcbda6',
        },
      },
    },
    '& .MuiSwitch-thumb': {
      backgroundColor: '#b8533b',
      width: 32,
      height: 32,
    },
    '& .MuiSwitch-track': {
      opacity: 1,
      backgroundColor: '#e5d7c1',
      borderRadius: 20 / 2,
    },
  }));