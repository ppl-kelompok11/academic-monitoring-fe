import React from "react";
import { Stack, Text, createStyles, Button, Image } from "@mantine/core";
const UseStyles = createStyles((theme) => ({
  wrapper: {
    padding: "100px 0",
  },
  layout: {
    margin: "0 auto",
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
        sx={{ width: "100%", maxWidth: "1500px", padding: "0 80px" }}
        align="center"
      >
        <Text align="center" size={70} className={classes.title} weight={600}>
          About{" "}
          <Text color="#6879C0" span>
            Delegates
          </Text>
        </Text>
        <Text align="center" size={20} className={classes.subTitle}>
          To become a delegate at the Future Leader Summit 2023, you will need
          to undergo a preliminary selection process. During the registration,
          you will be asked to prioritize and choose a room, which will
          determine the issue to be discussed at the conference.
        </Text>
      </Stack>
    </div>
  );
}
