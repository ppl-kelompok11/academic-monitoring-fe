import React from "react";
import Link from "next/link";
import { Text, createStyles, rem, Box } from "@mantine/core";
interface NavLinksProps {
  isActive?: boolean;
  children: React.ReactNode;
  route: string;
}
const UseStyles = createStyles((theme) => ({
  link: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    paddingTop: "5px",
    paddingBottom: "5px",
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: "none",
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,

    ":hover": {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      borderRadius: "8px",
    },
    [theme.fn.smallerThan("md")]: {
      ":hover": {
        backgroundColor: "#111213",
        borderRadius: "8px",
      },
    },
  },
}));
export default function Index({ isActive, children, route }: NavLinksProps) {
  const { classes } = UseStyles();
  return (
    <Link href={route}>
      <Box
        className={classes.link}
        sx={(theme) => ({
          backgroundColor: isActive
            ? "rgba(255, 255, 255, 0.1)"
            : "transparent",
          borderRadius: "8px",
          [theme.fn.smallerThan("sm")]: {
            height: rem(42),
            display: "flex",
            alignItems: "center",
            width: "100%",
            borderRadius: "8px",
          },
        })}
      >
        <Text color="white" size="lg" weight={isActive ? 600 : 400}>
          {children}
        </Text>
      </Box>
    </Link>
  );
}
