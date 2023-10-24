import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { NextResponse } from "next/server";
import {
  Container,
  Stack,
  Text,
  Group,
  Box,
  Button,
  Grid,
  Image,
} from "@mantine/core";
import { createStyles } from "@mantine/core";
import Router from "next/router";
import Link from "next/link";

const UseStyles = createStyles((theme) => ({
  wrapper: {
    margin: "0 auto",
    width: "100%",
    height: "100vh",
    background: "linear-gradient(180deg, #551F9B 27.97%, #000 100%)",
    maxHeight: "700px",
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
    [theme.fn.smallerThan("lg")]: {
      fontSize: "70px",
      lineHeight: "80px",
    },
    [theme.fn.smallerThan("md")]: {
      fontSize: "60px",
      lineHeight: "70px",
    },
    [theme.fn.smallerThan("sm")]: {
      fontSize: "40px",
      lineHeight: "50px",
    },
    [theme.fn.smallerThan("xs")]: {
      fontSize: "37px",
      lineHeight: "40px",
    },
  },
  hiddenMobile: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },
  heroImage: {
    [theme.fn.smallerThan("md")]: {
      width: "450px",
      height: "550px",
    },
    [theme.fn.smallerThan("sm")]: {
      width: "300px",
      height: "400px",
    },
    [theme.fn.smallerThan("sm")]: {
      width: "200px",
      height: "300px",
    },
  },
}));
export default function Index() {
  const { classes } = UseStyles();
  return (
    <div className={classes.wrapper}>
      <Grid
        className={classes.layout}
        sx={{
          margin: "0 auto",
          padding: "0 80px",
          width: "100%",
          maxWidth: "1500px",
          height: "100vh",
          maxHeight: "700px",
        }}
      >
        <Grid.Col xs={12} sm={6}>
          <Stack
            align="flex-start"
            justify="center"
            sx={{
              height: "100%",
            }}
          >
            <Text
              className={classes.title}
              size={70}
              weight={600}
              sx={{ lineHeight: "110px" }}
            >
              Lets Join and Become FLS 2023 Delegates
            </Text>
            <Group>
              <Button
                onClick={() => {
                  Router.push("/auth/signin");
                }}
              >
                <Text>Join Now</Text>
              </Button>
              <Link
                href="https://bit.ly/GuidebookSelpro-FLS2023"
                target="_blank"
              >
                <Button variant="subtle" sx={{ backgroundColor: "white" }}>
                  Guide Book
                </Button>
              </Link>
            </Group>
          </Stack>
        </Grid.Col>
        <Grid.Col xs={12} sm={6} className={classes.hiddenMobile}>
          <Stack
            align="flex-end"
            justify="center"
            sx={{
              width: "100%",
              height: "100%",
            }}
          >
            <Image
              src="/MascotProgram.png"
              className={classes.heroImage}
              height={500}
              alt="hero-image"
              fit="contain"
            />
          </Stack>
        </Grid.Col>
      </Grid>
    </div>
  );
}
