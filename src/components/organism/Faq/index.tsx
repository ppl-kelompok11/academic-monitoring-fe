import { Stack, Text, Accordion, createStyles, rem } from "@mantine/core";
import Link from "next/link";
import React from "react";
const UseStyles = createStyles((theme) => ({
  layout: {
    margin: "0 auto",
    padding: "100px 80px",
    maxWidth: "1500px",
    [theme.fn.smallerThan("md")]: {
      padding: "80px 40px",
    },
    [theme.fn.smallerThan("sm")]: {
      padding: "50px 20px",
    },
  },
  root: {
    backgroundColor: "#111213",
    borderRadius: "20px",
  },

  item: {
    backgroundColor: "#111213",
    border: `${rem(1)} solid transparent`,
    borderRadius: "20px",
    position: "relative",
    zIndex: 0,
    transition: "transform 150ms ease",

    "&[data-active]": {
      backgroundColor: "#111213",
      boxShadow: theme.shadows.md,
      border: "4px solid #6879C0",
      borderRadius: "20px",
      zIndex: 1,
    },
  },
  chevron: {
    color: "white",
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
}));
const FAQData = [
  {
    id: 1,
    title: "What is the essay selection process?",
    content:
      "The essay selection process is the one and only way for you to become FLS 2023’s delegates. The selection process goes under the theme of “The Role of Youth in Supporting Decent Work and Economic Growth”. Thus, if you wish to be part of the aspiring youth in FLS 2023, don’t forget to enroll yourself in the essay selection process",
  },
  {
    id: 2,
    title: "Who participates in the essay selection process?",
    content:
      "All Indonesian citizens that are aged 17–25 years and committed to partake in all the event flow of FLS 2023",
  },
  {
    id: 3,
    title: "How are essays typically submitted for selection",
    content:
      "The essays submitted are formal essay types that have never been contested or published. For details, please access our guidebook here:",
    link: "https://bit.ly/GuidebookSelpro-FLS2023",
  },
  {
    id: 4,
    title: "What criteria are used to evaluate the essays",
    content:
      "We assess your essays based on the ideas and opinions, relevancy with the theme, sources of information, writing format, and originality. Make sure to write them on your own and believe in your own amazing ideas!",
  },
  {
    id: 5,
    title:
      "Are there any word limits or formatting guidelines for submitted essays?",
    content:
      "Please write your essays in 700–1000 words and follow the guidelines in our guidebook. Access them here:",
    link: "https://bit.ly/GuidebookSelpro-FLS2023",
  },
  {
    id: 6,
    title:
      "How important is the topic or theme of the essay in the selection process?",
    content:
      "One of the essay assessment matrix is theme suitability related to SDGs no 8, which is about decent work and economic growth. Therefore, you are asked to express your opinions through the essay that will later be submitted as your application as delegates. The essays are used as a determining factor in allocating delegates into rooms that intersect with your interest. Since this is detrimental to the rooms you will be allocated in, please make it as thorough and as elaborative as possible!",
  },
  {
    id: 7,
    title:
      "Can I submit an essay that has been previously published or used elsewhere?",
    content:
      "No, you absolutely can’t. Please note that we only accept essays that are originally written by you and have never been published elsewhere. Additionally, your essays should not contain elements of pornography, SARA, hoaxes, and elements that are contrary to Pancasila and discredit certain parties",
  },
  {
    id: 8,
    title:
      "Is there a specific format (e.g., MLA, APA) I should follow for citations and references?",
    content:
      "All sources used as data material must be referred in APA (American Psychiatric Association) citation style.",
  },
  {
    id: 9,
    title:
      "Is the essay selection process the only procedure to attend the summit?",
    content:
      "Yes, it certainly is! There will be no other way or other wave opened, so don’t miss this one and only chance",
  },
  {
    id: 10,
    title:
      "Are there any common mistakes that lead to the rejection of essays?",
    content:
      "Nothing specifically. But in the writing, essays must be in accordance with the provisions stated in the guidebook we have provided to you. More details can be accessed here:",
    link: "https://bit.ly/GuidebookSelpro-FLS2023",
  },
];
export default function Index() {
  const { classes } = UseStyles();
  return (
    <div>
      <Stack className={classes.layout}>
        <Text
          color="white"
          size={70}
          align="center"
          weight={600}
          className={classes.title}
        >
          FAQ
        </Text>
        {FAQData.map((data) => (
          <Accordion
            chevronPosition="right"
            variant="filled"
            defaultValue="customization"
            classNames={classes}
            className={classes.root}
            key={data.id}
          >
            <Accordion.Item value="focus-ring">
              <Accordion.Control>
                <Text color="white" size={20} weight={600}>
                  {data.title}
                </Text>
              </Accordion.Control>
              <Accordion.Panel>
                <Text color="white" size={15} weight={400}>
                  {data.content}
                  {data.link ? (
                    <Link href={data.link} target="_blank">
                      <Text color="#6879C0" td="underline">
                        Guidebook
                      </Text>
                    </Link>
                  ) : null}
                </Text>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        ))}
      </Stack>
    </div>
  );
}
