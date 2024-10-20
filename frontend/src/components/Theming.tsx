import { createTheme } from "@mui/material/styles";
import "../styles/index.css";

/* Cores padrões da nossa logo: */
/* Verde: #29524A */
/* Roxo: #20275A */

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#20275A",
    },
    secondary: {
      main: "#29524A",
    },
    background: {
      default: "#f3f3f3",
    },
  },
  typography: {
    fontFamily: "Hammersmith One",
    body1: {
      fontSize: 13,
    },
    h1: {
      fontSize: 36,
    },
    h2: {
      fontSize: 24,
    },
    h3: {
      fontSize: 18,
    },
    subtitle1: {
      fontSize: 20,
    },
    subtitle2: {
      fontSize: 12,
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#354097",
    },
    secondary: {
      main: "#29524A",
    },
    background: {
      default: "#0e0e0e",
    },
  },
  typography: {
    fontFamily: "Hammersmith One",
    body1: {
      fontSize: 13,
    },
    h1: {
      fontSize: 36,
    },
    h2: {
      fontSize: 24,
    },
    h3: {
      fontSize: 18,
    },
    subtitle1: {
      fontSize: 20,
    },
    subtitle2: {
      fontSize: 12,
    },
  },
});

// declare module "@mui/material/styles" {
//   interface Theme {
//     breakpoints: {
//       values: {
//         xs: number;
//         vs: number;
//         sm: number;
//         md: number;
//         lg: number;
//         xl: number;
//       };
//     };
//   }
//   // allow configuration using `createTheme`
//   interface ThemeOptions {
//     breakpoints?: {
//       values?: {
//         xs?: number;
//         vs?: number;
//         sm?: number;
//         md?: number;
//         lg?: number;
//         xl?: number;
//       };
//     };
//   }
// }

export { lightTheme, darkTheme };
