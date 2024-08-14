export default function getTypography() {

    const toRem = (px) => {
        return px / 16
    }

    const typography = {
        typography: {
            fontFamily: '"Oswald", sans-serif',
            h1: {
                fontFamily: '"Oswald", sans-serif',
                // fontSize: `${toRem(72)}em`,
            },
            h2: {
                fontFamily: '"Oswald", sans-serif',
                // fontSize: `${toRem(54)}em`,

            }
        }
    }
    return typography
}