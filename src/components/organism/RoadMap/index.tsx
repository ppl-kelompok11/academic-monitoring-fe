import React from "react";
import {
  Document,
  Magicpen,
  Microphone2,
  NotificationStatus,
  People,
} from "iconsax-react";
import TimelineCard from "@/components/molekul/TimelineCard";
import Line from "@/components/atoms/Line";
import {
  Stack,
  Text,
  createStyles,
  Card,
  ScrollArea,
  Box,
  Image,
  Group,
  Flex,
  Container,
} from "@mantine/core";
const UseStyles = createStyles((theme) => ({
  // Card: {
  //   [theme.fn.smallerThan("md")]: {
  //     height: "200px",
  //   },
  // },
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
const TimelineData = [
  {
    id: 1,
    type: "card",
    icon: <Microphone2 size="100%" color="#6879C0" />,
    title: "Roadshow in Big 2 Cities (Yogyakarta & Semarang)",
    date: "June 2023 - July 2023",
  },
  {
    id: 2,
    type: "line",
    icon: <Line />,
    title: "",
    date: "",
  },
  {
    id: 3,
    type: "card",
    icon: <Magicpen size="100%" color="#6879C0" />,
    title: "Registration",
    date: "August 2023",
  },
  {
    id: 4,
    type: "line",
    icon: <Line />,
    title: "",
    date: "",
  },
  {
    id: 5,
    type: "card",
    icon: <Document size="100%" color="#6879C0" />,
    title: "Essay Submission",
    date: "August 2023",
  },
  {
    id: 6,
    type: "line",
    icon: <Line />,
    title: "",
    date: "",
  },
  {
    id: 7,
    type: "card",
    icon: <NotificationStatus size="100%" color="#6879C0" />,
    title: "Announcement FLS Delegates",
    date: "September 2023",
  },
  {
    id: 8,
    type: "line",
    icon: <Line />,
    title: "",
    date: "",
  },
  {
    id: 9,
    type: "card",
    icon: <People size="100%" color="#6879C0" />,
    title: "Main Day Event",
    date: "October 2023",
  },
];
export default function Index() {
  const { classes } = UseStyles();
  return (
    <>
      <Stack className={classes.layout}>
        <Text align="center" size={70} className={classes.title} weight={600}>
          Roadmap{" "}
          <Text color="#6879C0" span>
            FLS
          </Text>
        </Text>
        <Card
          sx={{
            backgroundColor: "#111213",
            border: "8px solid #6879C0",
            borderRadius: "40px",
            width: "100%",
            height: "260px",
          }}
        >
          <ScrollArea
            w="100%"
            h={220}
            type="auto"
            styles={(theme) => ({
              scrollbar: {
                "&, &:hover": {
                  background: "transparent",
                },
                '&[data-orientation="horizontal"] .mantine-ScrollArea-thumb': {
                  backgroundColor: "black",
                },
              },
              corner: {
                opacity: 1,
                background:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[6]
                    : theme.colors.gray[0],
              },
            })}
          >
            <Flex gap="xs" justify="flex-start" align="flex-start">
              {TimelineData.map((data, index) => (
                <TimelineCard
                  key={index}
                  icon={data.icon}
                  type={data.type}
                  title={data.title}
                  date={data.date}
                ></TimelineCard>
              ))}
            </Flex>
          </ScrollArea>
        </Card>
      </Stack>
    </>
  );
}
