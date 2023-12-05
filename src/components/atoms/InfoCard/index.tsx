import React from "react";
import {Card, Group, Stack, Text, Box, Center, createStyles} from "@mantine/core";

const useStyles = createStyles((theme) => ({
  card: {
    borderRadius: "14px",
    width: "100%",
  },
  icon: {
    borderRadius: "13px",
    backgroundColor: "#333F73",
    color: "white",
    fontWeight: 600,
    fontSize: "32px",
    padding: "16px",
    height: "100%",
  },
}));

type InfoCardProps = {
  title: string;
  value: any;
  icon: React.ReactNode;
  color?: string;
  height?: any;
  width?: any;
};


export default function Index( {title, value, icon, color="black", width, height}: InfoCardProps) {
  const { classes } = useStyles();
  return (
    <Card shadow="sm" className={classes.card}>
      <Group position="apart">
        <Stack align="flex-start" spacing={5}>
          <Text size={20} weight={600}>
            {title}
          </Text>
          <Text size={20} c={color}>{value}</Text>
        </Stack>
        <Box bg="primary" className={classes.icon}>
          <Center>
            {icon}
          </Center>
        </Box>
      </Group>
    </Card>
  );
}
