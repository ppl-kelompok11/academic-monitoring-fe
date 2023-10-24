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
        <title>FLS 2023</title>
        <meta
          name="description"
          content="Golden Generation 2045: Levearaging Leadership Through Resistance"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MantineProvider
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
                  color: "white",
                },
                input: {
                  backgroundColor: "transparent",
                  color: "white",
                },
              },
            },
            PasswordInput: {
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
            brand: [
              "#eceff8",
              "#c7ceeb",
              "#a2addd",
              "#7c8ccf",
              "#576bc2",
              "#3d52a8",
              "#303f83",
              "#222d5d",
              "#141b38",
              "#070913",
            ],
          },
          primaryColor: "brand",
        }}
      >
        <Notifications />
        <Fonts />
        <Component {...pageProps} />
      </MantineProvider>
      {/* <Head>
        <title>Page title</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head> */}
      {/* <Component {...pageProps} />
      </MantineProvider> */}
    </>
  );
}
