import { Global } from "@mantine/core";

export function Fonts() {
  return (
    <Global
      styles={[
        {
          "@font-face": {
            fontFamily: "Poppins",
            src: "url('/fonts/Poppins-Regular.ttf') format('truetype')",
            fontStyle: "normal",
            fontWeight: 400,
          },
        },
        {
          "@font-face": {
            fontFamily: "Poppins",
            src: "url('/fonts/Poppins-Medium.ttf') format('truetype')",
            fontStyle: "medium",
            fontWeight: 500,
          },
        },
        {
          "@font-face": {
            fontFamily: "Poppins",
            src: "url('/fonts/Poppins-SemiBold.ttf') format('truetype')",
            fontStyle: "semibold",
            fontWeight: 600,
          },
        },
        {
          "@font-face": {
            fontFamily: "Poppins",
            src: "url('/fonts/Poppins-Bold.ttf') format('truetype')",
            fontStyle: "bold",
            fontWeight: 700,
          },
        },
        {
          "@font-face": {
            fontFamily: "Poppins",
            src: "url('/fonts/Poppins-Black.ttf') format('truetype')",
            fontStyle: "black",
            fontWeight: 900,
          },
        },
      ]}
    />
  );
}
