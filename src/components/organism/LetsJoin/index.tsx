import React from "react";
import { Stack, Text, Button, createStyles } from "@mantine/core";
import Router from "next/router";
const UseStyles = createStyles((theme) => ({
  layout: {
    margin: "0 auto",
    padding: "100px 80px",
    maxWidth: "1500px",
    [theme.fn.smallerThan("md")]: {
      padding: "20px 40px",
    },
    [theme.fn.smallerThan("sm")]: {
      padding: "20px 20px",
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
    <div>
      <Stack align="flex-start" className={classes.layout}>
        <Text size={70} className={classes.title} weight={600}>
          Lets Join and Become
          <br />
          <Text span color="#6879C0">
            FLS 2023 Delegates
          </Text>
        </Text>
        <Button
          onClick={() => {
            Router.push("/Program");
          }}
        >
          Join Now
        </Button>
      </Stack>
    </div>
  );
}
