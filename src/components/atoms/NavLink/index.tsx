import React from "react";
import Link from "next/link";
import { createStyles, Box, px, Center, Tooltip } from "@mantine/core";

interface NavLinksProps {
  isActive?: boolean;
  children: React.ReactNode;
  route: string;
  label?: string;
  onClick?: Function;
}

const UseStyles = createStyles((theme) => ({
  link: {
    display: "flex",
    alignItems: "center",
    height: "50px",
    width: "50px",
    textDecoration: "none",
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,

    ":hover": {
      backgroundColor: "#333F73",
      borderRadius: "8px",
    },
    [theme.fn.smallerThan("md")]: {
      ":hover": {
        backgroundColor: "#333F73",
        borderRadius: "8px",
      },
    },
  },
}));

export default function Index({
  isActive,
  children,
  route,
  label,
  onClick = () => {},
}: NavLinksProps) {
  const { classes } = UseStyles();

  return (
    <Link href={route}>
      <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
        <Box
          p={10}
          className={classes.link}
          sx={(theme) => ({
            backgroundColor: isActive ? "#333F73" : "transparent",
            borderRadius: "8px",
            [theme.fn.smallerThan("sm")]: {
              height: px(50),
              display: "flex",
              alignItems: "center",
              width: px(50),
              borderRadius: "8px",
            },
          })}
          onClick = {() => onClick()}
        >
          <Center>{children}</Center>
        </Box>
      </Tooltip>
    </Link>
  );
}
