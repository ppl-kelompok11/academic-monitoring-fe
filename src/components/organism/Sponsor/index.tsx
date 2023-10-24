import React from "react";
import { Card, Stack, Text, Grid, Image, createStyles } from "@mantine/core";
import Link from "next/link";
const SponsorImage = [
    {
        id: 1,
        image: "/Sponsors/BankIndonesia.png",
        link: "https://www.bi.go.id/",
    },
    {
        id: 2,
        image: "/Sponsors/Radhend.png",
        link: "https://www.instagram.com/radhendindustry/",
    },
    {
        id: 3,
        image: "/Sponsors/Oti.png",
        link: "https://www.instagram.com/otichicken.id/",
    },
    {
        id: 4,
        image: "/Sponsors/Cakap.png",
        link: "https://cakap.com/",
    },
    {
        id: 5,
        image: "/Sponsors/Traveloka.png",
        link: "https://www.traveloka.com/",
    },
];
const UseStyles = createStyles((theme) => ({
    wrapper: {
        padding: "100px 0",
    },
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
export default function Index() {
    const { classes } = UseStyles();
    return (
        <div className={classes.wrapper}>
            <Stack className={classes.layout}>
                <Text
                    align="center"
                    weight={600}
                    size={70}
                    className={classes.title}
                >
                    Our{" "}
                    <Text color="#6879C0" span>
                        Sponsors
                    </Text>
                </Text>
                <Card
                    sx={{
                        backgroundColor: "#111213",
                        border: "8px solid #6879C0",
                        borderRadius: "40px",
                    }}
                >
                    <Grid sx={{ padding: "40px 40px" }}>
                        {SponsorImage.map((item) => (
                            <Grid.Col md={6} key={item.id}>
                                <Link href={item.link}>
                                    <Image
                                        alt="Sponsors"
                                        height="150px"
                                        src={item.image}
                                        fit="contain"
                                    ></Image>
                                </Link>
                            </Grid.Col>
                        ))}
                    </Grid>
                </Card>
            </Stack>
        </div>
    );
}
