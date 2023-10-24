import { Card, Text, Grid, Button, createStyles, Modal } from "@mantine/core";
import Image from "next/image";
import React from "react";
import { useDisclosure } from "@mantine/hooks";
import RoomCard from "@/components/molekul/RoomCard";
const UseStyles = createStyles((theme) => ({
  layout: {
    [theme.fn.smallerThan("md")]: {
      padding: "0 30px",
    },
  },
  card: {
    [theme.fn.smallerThan("md")]: {
      width: "340px",
    },
    [theme.fn.smallerThan("xs")]: {
      width: "100%",
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
const RoomData = [
  {
    id: 1,
    name: "Urban and Regional Planning and Development x Sociotourism",
    description:
      "Over the last few decades, the development of supporting natural tourism infrastructure has been growing. Tourism development should have a multiplier effect in the social, cultural, economic, and environmental sectors, each of which benefits the local community around the tourism areas. In practice, the local communities continue to experience negative consequences. This is due to its inability to fully implement urban and regional planning theory and the concept of sustainable tourism, two elements that are essential for long-term community impact.",
    image: "/SocioTourism.png",
  },
  {
    id: 2,
    image: "/CardImage.png",
    name: "Education x Social Justice",
    description:
      "Despite the recent upsurge in social justice discourse, it is frequently unclear in concrete terms what we mean when we speak of a vision of social justice or how this affects matters like program development, curricula, practicum opportunities, educational philosophy, social vision, and activist work. When the education system isn’t committed to providing equal opportunities and privileges, it negatively impacts a society both culturally and economically.",
  },
  {
    id: 3,
    image: "/Artificial Intelligence.png",
    name: "Artificial Intelligence x Human Resources",
    description:
      "Artificial intelligence technologies have been presented as part of the purported Fourth Industrial Revolution or Industry 4.0. As information and communication technologies advance, this phenomena is having a significant impact especially on work field opportunities for Indonesia's human resources. Such as the emergence of massive layoffs because many industries almost do not need human labor, causing the unemployment rate to increase. It's about us learning and managing to utilize technology other than the opposite.",
  },
  {
    id: 4,
    image: "/renewable-energy.png",
    name: "Renewable Energy x Economical Growth",
    description:
      "In 2050, solar is projected to produce the most jobs (19.9 million), followed by bioenergy (13.7 million), and wind (5.5 million). Economic growth increases the level of energy use, especially the need for fossil fuels. Renewable energy visions to protect the environment, various factors, such as energy supply security, climate change, health issues, and environmental disasters, encouraged the consumption of renewable energy sources by emerging economies like Indonesia.",
  },
];
export default function Index() {
  const { classes } = UseStyles();
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <div>
      <Text
        color="white"
        size={60}
        align="center"
        weight={600}
        className={classes.title}
      >
        <Text span color="#6879C0">
          FLS 2023
        </Text>{" "}
        Room Overview
      </Text>
      <Grid
        className={classes.layout}
        sx={{
          padding: "100px 80px",
        }}
      >
        {RoomData.map((data) => (
          <Grid.Col xs={12} sm={6} sx={{ marginBottom: "20px" }} key={data.id}>
            <RoomCard
              name={data.name}
              description={data.description}
              image={data.image}
            />
          </Grid.Col>
        ))}
      </Grid>
    </div>
  );
}
