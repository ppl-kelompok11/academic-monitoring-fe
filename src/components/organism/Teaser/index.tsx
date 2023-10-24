import React from "react";
import Image from "next/image";
import { createStyles, Grid, Stack, Text, Button } from "@mantine/core";
const UseStyles = createStyles((theme) => ({
  wrapper: {
    height: "800px",
    width: "100%",
    maxHeight: "800px",
    position: "relative",
    [theme.fn.smallerThan("md")]: {
      height: "700px",
    },
    [theme.fn.smallerThan("xs")]: {
      height: "500px",
    },
  },
  video: {
    left: "auto",
    right: "auto",
    borderRadius: "8px",
    border: "1px solid white",
    [theme.fn.smallerThan("sm")]: {
      height: "400px",
    },
    [theme.fn.smallerThan("xs")]: {
      height: "200px",
    },
  },
  ornamentLeft: {
    position: "absolute",
    top: "0",
    left: "-100px",
    [theme.fn.smallerThan("sm")]: {
      height: "100px",
      width: "150px",
      left: "-75px",
    },
  },
  ornamentRight: {
    position: "absolute",
    bottom: "0",
    right: "-100px",
    [theme.fn.smallerThan("sm")]: {
      height: "100px",
      width: "150px",
      right: "-75px",
    },
  },
  frameWrapper: {
    padding: "100px 200px",
    width: "100%",
    height: "100%",

    [theme.fn.smallerThan("md")]: {
      padding: "100px 100px",
    },
    [theme.fn.smallerThan("sm")]: {
      padding: "100px 50px",
    },
    [theme.fn.smallerThan("xs")]: {
      padding: "100px 20px",
    },
  },
  title: {
    [theme.fn.smallerThan("md")]: {
      fontSize: "60px",
    },
    [theme.fn.smallerThan("sm")]: {
      fontSize: "50px",
    },
    [theme.fn.smallerThan("xs")]: {
      marginBottom: "20px",
      fontSize: "40px",
    },
  },
}));
export default function Index() {
  const { classes } = UseStyles();
  return (
    <div className={classes.wrapper}>
      <Image
        className={classes.ornamentLeft}
        alt="ornamen"
        src="/RoundOrnamen.svg"
        height={200}
        width={200}
      />
      <Image
        className={classes.ornamentRight}
        alt="ornamen"
        src="/RoundOrnamen.svg"
        height={200}
        width={200}
      />
      <div className={classes.frameWrapper}>
        <Text align="center" size={70} className={classes.title} weight={600}>
          Teaser{" "}
          <Text color="#6879C0" span>
            FLS 2023
          </Text>
        </Text>
        <iframe
          width="100%"
          height="400"
          className={classes.video}
          src="https://www.youtube.com/embed/DxHOIoeZLnA"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        ></iframe>
      </div>
    </div>
  );
}
