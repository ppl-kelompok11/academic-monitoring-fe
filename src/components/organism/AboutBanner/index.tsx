import React from "react";
import { Text, createStyles, Stack, Image, Grid } from "@mantine/core";
const UseStyles = createStyles((theme) => ({
  layout: {
    margin: "0 auto",
    padding: "100px 80px 50px 80px",
    maxWidth: "1500px",
    [theme.fn.smallerThan("md")]: {
      padding: "100px 20px 50px 20px",
    },
    [theme.fn.smallerThan("xs")]: {
      padding: "100px 20px 50px 20px",
    },
  },
  title: {
    [theme.fn.smallerThan("md")]: {
      width: "100%",
      fontSize: "40px",
    },
    [theme.fn.smallerThan("sm")]: {
      fontSize: "30px",
    },
    [theme.fn.smallerThan("xs")]: {
      marginBottom: "20px",
      fontSize: "25px",
    },
  },
  subTitle: {
    [theme.fn.smallerThan("md")]: {
      fontSize: "15px",
      width: "100%",
      textAlign: "justify",
    },
  },
}));
export default function Index() {
  const { classes } = UseStyles();
  return (
    <div>
      <Grid className={classes.layout}>
        <Grid.Col xs={12} sm={6} sx={{ width: "100%" }}>
          <Stack align="center" justify="flex-end" sx={{ height: "100%" }}>
            <Text weight={600} size={45} className={classes.title}>
              Future Leader Summit is a national-scale
              <br />
              <Text color="#6879C0" span>
                youth conference since 2011.
              </Text>
            </Text>
          </Stack>
        </Grid.Col>
        <Grid.Col xs={12} sm={6} sx={{ width: "100%" }}>
          <Stack align="center" justify="flex-end" sx={{ height: "100%" }}>
            <Text weight={400} size={20} className={classes.subTitle}>
              Future Leader Summit was initiated by Nusantara Muda, aims to
              prepare young leaders, to be poured with innovative and
              progressive ideas to help the Indonesian people face change and
              the challenges that ensue.
            </Text>
          </Stack>
        </Grid.Col>
      </Grid>
      <Image alt="About" src="/About.png" width={"100%"} />
    </div>
  );
}
