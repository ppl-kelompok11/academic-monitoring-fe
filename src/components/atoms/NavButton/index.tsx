import React from "react";
import { createStyles, px, Center, Button, Tooltip } from "@mantine/core";

interface NavButtonProps {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  label?: string;
}

const UseStyles = createStyles((theme) => ({
  btn: {
    color: "transparent",
  },
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

export default function Index({ onClick, children, label }: NavButtonProps) {
  const { classes } = UseStyles();

  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
    <Button
      onClick={onClick}
      p={10}
      className={classes.link}
      sx={(theme) => ({
        borderRadius: "8px",
        [theme.fn.smallerThan("sm")]: {
          height: px(50),
          display: "flex",
          alignItems: "center",
          width: px(50),
          borderRadius: "8px",
        },
      })}
    >
      <Center>{children}</Center>
    </Button>
    </Tooltip>
  );
}
