import React from "react";
import { Stack, Text, createStyles, Button, Image } from "@mantine/core";
import Router from "next/router";
const UseStyles = createStyles((theme) => ({
  wrapper: {
    padding: "100px 0",
  },
  layout: {
    [theme.fn.smallerThan("xs")]: {
      padding: "0 20px",
    },
    [theme.fn.smallerThan("md")]: {
      padding: "0 20px",
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
  subTitle: {
    [theme.fn.smallerThan("md")]: {
      textAlign: "justify",
    },
  },
}));
export default function Index() {
  const { classes } = UseStyles();
  return (
    <div className={classes.wrapper}>
      <Stack
        className={classes.layout}
        sx={{
          margin: "0 auto",
          width: "100%",
          maxWidth: "1500px",
          padding: "0 80px",
        }}
        align="center"
      >
        <Text align="center" size={70} className={classes.title} weight={600}>
          About{" "}
          <Text color="#6879C0" span>
            FLS
          </Text>
        </Text>
        <Text align="center" size={20} className={classes.subTitle}>
          Future Leader Summit is a national-scale youth conference initiated by
          Nusantara Muda since 2011 in Semarang, Central Java.
        </Text>
        <Button
          onClick={() => {
            Router.push("/About");
          }}
        >
          Learn More
        </Button>
      </Stack>
      <br />
      <Image alt="About" src="/About.png" width={"100%"} />
    </div>
  );
}
