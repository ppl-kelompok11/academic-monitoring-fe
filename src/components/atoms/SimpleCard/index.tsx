import React from "react";
import { Card, Stack, Text, createStyles } from "@mantine/core";

type SimpleCardProps = {
  title: string;
  value: string;
};

const useStyles = createStyles((theme) => ({
  card: {
    borderRadius: "14px",
  },
}));

export default function Index({ title, value }: SimpleCardProps) {
  const { classes } = useStyles();

  return (
    <Card shadow="sm" h={200} w={450} className={classes.card}>
      <Stack align="center" justify="center" w="100%" h="100%" spacing="xs">
        <Text size={32} weight={600}>
          {title}
        </Text>
        <Text size={48} weight={600}>
          {value}
        </Text>
      </Stack>
    </Card>
  );
}
