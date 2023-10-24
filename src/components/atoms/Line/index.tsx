import React from "react";
import { createStyles } from "@mantine/core";
const UseStyles = createStyles((theme) => ({
  line: {
    width: "100%",
    height: "10px",
    backgroundColor: "#6879C0",
  },
}));
export default function Index() {
  const { classes } = UseStyles();
  return <div className={classes.line}></div>;
}
