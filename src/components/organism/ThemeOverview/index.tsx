import { Grid, Text, Stack, createStyles } from "@mantine/core";
import React from "react";
import Image from "next/image";
const UseStyles = createStyles((theme) => ({
  wrapper: {
    padding: "100px 0",
    margin: "0 auto",
    width: "100%",
    maxWidth: "1500px",
  },
  layout: {
    [theme.fn.smallerThan("md")]: {
      padding: "0 30px",
    },
  },
  overviewTheme: {
    [theme.fn.smallerThan("md")]: {
      fontSize: "60px",
    },
    [theme.fn.smallerThan("sm")]: {
      textAlign: "center",
      fontSize: "50px",
    },
    [theme.fn.smallerThan("xs")]: {
      textAlign: "center",
      fontSize: "40px",
    },
  },
  titleTheme: {
    [theme.fn.smallerThan("md")]: {
      fontSize: "20px",
    },
    [theme.fn.smallerThan("sm")]: {
      textAlign: "center",
      fontSize: "17px",
    },
    [theme.fn.smallerThan("xs")]: {
      fontSize: "15px",
    },
  },
  quotesTheme: {
    [theme.fn.smallerThan("lg")]: {
      fontSize: "28px",
    },
    [theme.fn.smallerThan("md")]: {
      fontSize: "25px",
    },
    [theme.fn.smallerThan("sm")]: {
      fontSize: "23px",
    },
  },
  //   heroLayout: {
  //     [theme.fn.smallerThan("md")]: {},
  //   },
  heroSecondary: {
    [theme.fn.smallerThan("md")]: {
      width: "350px",
      height: "400px",
    },
    [theme.fn.smallerThan("sm")]: {
      width: "250px",
      height: "300px",
    },
  },
  descriptionText: {
    [theme.fn.smallerThan("md")]: {
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
    },
  },
  hiddenMobile: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },
}));
export default function Index() {
  const { classes } = UseStyles();
  return (
    <div className={classes.wrapper}>
      <Grid
        sx={{
          width: "100%",
          maxWidth: "1500px",
          padding: "10px 80px",
        }}
        className={classes.layout}
      >
        <Grid.Col
          xs={12}
          sm={6}
          //   sx={{ backgroundColor: "white", height: "auto" }}
        >
          <Text
            size={60}
            weight={600}
            sx={{ lineHeight: "60px" }}
            className={classes.overviewTheme}
          >
            Our 2023s Theme
          </Text>
        </Grid.Col>
        <Grid.Col xs={12} sm={6}>
          <Stack align="flex-start" justify="flex-start">
            <Text
              size={27}
              weight={600}
              color="#6879C0"
              className={classes.titleTheme}
            >
              Golden Generation 2045: Leveraging Leadership Through Resistance
            </Text>
          </Stack>
        </Grid.Col>
        <Grid.Col
          xs="auto"
          sm={6}
          //   sx={{ backgroundColor: "white" }}
        >
          <Image
            src="/MascotSecondary.png"
            width={443}
            height={519}
            alt="mascot-image"
            className={classes.heroSecondary + " " + classes.hiddenMobile}
            style={{ marginBottom: "0" }}
          />
        </Grid.Col>
        <Grid.Col xs={12} sm={6}>
          <Stack
            align="flex-start"
            justify="flex-start"
            spacing="xl"
            className={classes.descriptionText}
          >
            <Text size={15} weight={400} color="white" align="justify">
              By 2045, Indonesia will enter the age of 100 years of independence
              as a sovereign country. The main hope is that in 2045 Indonesia
              will be colored by a large number of productive age generations.
              This peak is surely going to support our economy and the country
              can become one of the world’s economic giants. Having the
              predictions on the country means a need to have not only
              productive but also full of character and ethical generations.
            </Text>
            <Text size={35} weight={600} className={classes.quotesTheme}>
              “Future Leaders Summit summoned young people to carried out
              sustainably to support the development of the nation”
            </Text>
          </Stack>
        </Grid.Col>
      </Grid>
    </div>
  );
}
