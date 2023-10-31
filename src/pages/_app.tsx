import "@/styles/globals.css";
import { AppProps } from "next/app";
import Head from "next/head";
import { Fonts } from "@/fonts";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Academic Monitoring App</title>
        <meta
          name="description"
          content="Monitoring and Evaluating System for Informatics Diponegoro Univeristy"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MantineProvider withGlobalStyles withNormalizeCSS
        theme={{
          breakpoints: {
            xs: "30em",
            sm: "48em",
            md: "64em",
            lg: "74em",
            xl: "90em",
          },
          fontFamily: "Poppins",
          components: {
            Button: {
              styles: {
                root: {
                  borderRadius: "8px",
                },
              },
            },
            TextInput: {
              styles: {
                label: {
                  color: "#243063",
                  fontSize: "18px"
                },
                input: {
                  backgroundColor: "transparent",
                  color: "#243063",
                  border: "2px solid #243063",
                  borderRadius: "8px",
                  marginTop: "5px",
                },
              },
            },
            PasswordInput: {
              styles: {
                label: {
                  color: "#243063",
                },
                input: {
                  backgroundColor: "transparent",
                  color: "#243063",
                  border: "2px solid #243063",
                },
                innerInput: {
                  backgroundColor: "transparent",
                  color: "#243063",
                },
              },
            },
            NativeSelect: {
              styles: {
                label: {
                  color: "#243063",
                  fontSize: "18px"
                },
                input: {
                  backgroundColor: "transparent",
                  color: "#243063",
                  border: "2px solid #243063",
                  borderRadius: "8px",
                  marginTop: "5px",
                  height: "42px",
                },
              },
            },
            Textarea: {
              styles: {
                label: {
                  color: "white",
                },
                input: {
                  backgroundColor: "transparent",
                  color: "white",
                },
                innerInput: {
                  backgroundColor: "transparent",
                  color: "white",
                },
              },
            },
            DateInput: {
              styles: {
                label: {
                  color: "white",
                },
                input: {
                  backgroundColor: "transparent",
                  color: "white",
                },
                innerInput: {
                  backgroundColor: "transparent",
                  color: "white",
                },
              },
            },
            Select: {
              styles: {
                label: {
                  color: "white",
                },
                input: {
                  backgroundColor: "transparent",
                  color: "white",
                },
                innerInput: {
                  backgroundColor: "transparent",
                  color: "white",
                },
              },
            },
            Drawer: {
              styles: {
                content: {
                  backgroundColor: "black",
                },
                header: {
                  backgroundColor: "black",
                },
              },
            },
          },
          colors: {
            primary: [
              "#ffffff",
              "#EBEBED",
              "#d3d6e0",
              "#a7acc1",
              "#7c83a1",
              "#333F73",
              "#243063",
              "#1d264f",
              "#0e1328",
              "#04050a",
            ],
          },
          primaryColor: "primary",
        }}
      >
        <Notifications />
        <Fonts />
        <Component {...pageProps} />
      </MantineProvider>
    </>
  );
}
