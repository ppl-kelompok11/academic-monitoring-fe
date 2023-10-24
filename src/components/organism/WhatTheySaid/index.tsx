import React from "react";
import { createStyles, Grid, Stack, Text, Button, Image } from "@mantine/core";
const UseStyles = createStyles((theme) => ({
  layout: {
    [theme.fn.smallerThan("md")]: {
      padding: "20px 40px",
    },
    [theme.fn.smallerThan("sm")]: {
      padding: "20px 20px",
    },
  },
  title: {
    [theme.fn.smallerThan("lg")]: {
      fontSize: "60px",
      lineHeight: "70px",
    },
    [theme.fn.smallerThan("md")]: {
      fontSize: "50px",
      lineHeight: "60px",
    },
    [theme.fn.smallerThan("sm")]: {
      fontSize: "40px",
      textAlign: "center",
    },
  },
  titlestack: {
    [theme.fn.smallerThan("sm")]: {
      alignItems: "center",
    },
  },
  video: {
    [theme.fn.smallerThan("lg")]: {
      width: "450px",
      height: "300px",
    },
    [theme.fn.smallerThan("md")]: {
      width: "400px",
      height: "240px",
    },
    [theme.fn.smallerThan("sm")]: {
      width: "100%",
      height: "400px",
    },
    [theme.fn.smallerThan("xs")]: {
      width: "100%",
      height: "200px",
    },
    borderRadius: "8px",
  },
}));
export default function Index() {
  const { classes } = UseStyles();
  return (
    <div style={{ height: "600px", maxHeight: "600px", margin: "0 auto" }}>
      <Grid
        className={classes.layout}
        sx={{ padding: "100px 80px", height: "100%" }}
      >
        <Grid.Col xs={12} sm={5} orderSm={2}>
          <Stack
            className={classes.titlestack}
            align="flex-start"
            justify="center"
            sx={{
              width: "100%",
              height: "100%",
            }}
          >
            <Text
              className={classes.title}
              size={60}
              weight={600}
              sx={{ lineHeight: "110px" }}
            >
              What
              <Text span color="#6879C0">
                {" "}
                They
              </Text>
              <br />
              Said About FLS
            </Text>
            {/* <Button>
              <Text> View FullScreen</Text>
            </Button> */}
          </Stack>
        </Grid.Col>
        <Grid.Col xs={12} sm={7}>
          <Stack
            align="center"
            justify="center"
            sx={{
              width: "100%",
              height: "100%",
            }}
          >
            <iframe
              width="600"
              height="340"
              className={classes.video}
              src="https://www.youtube.com/embed/DxHOIoeZLnA"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
          </Stack>
        </Grid.Col>
      </Grid>
    </div>
  );
}
