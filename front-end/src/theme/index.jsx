import { createTheme } from "@mui/material";
import  getPalette  from './palette';
import getTypography from './typography';

const palette = getPalette();
const typography = getTypography();

const toRem = (px) => {
    return px / 24
}

 const theme = createTheme({
    typography: {
        fontFamily: '"Oswald", sans-serif',
        h1: {
            fontFamily: '"Oswald", sans-serif',
            fontWeight: 400,
            fontSize: `${toRem(72)}em`,
        },
        h2: {
            fontFamily: '"Oswald", sans-serif',
            fontWeight: 400,
            // fontSize: `${toRem(54)}em`,

        }
    },
    // typography,
    palette: {
        ...palette,
        custom: palette.custom
    }
    
})

export default theme