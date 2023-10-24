import React, { useCallback } from "react";
import Navbar from "@/components/molekul/Navbar";
import {
  Tabs,
  Card,
  Text,
  Flex,
  Stack,
  createStyles,
  useMantineTheme,
  MANTINE_SIZES,
  ScrollArea,
  Loader,
  Box,
} from "@mantine/core";
import { useViewportSize, useMediaQuery } from "@mantine/hooks";
import {
  UserEdit,
  EmptyWallet,
  ProfileCircle,
  DirectSend,
  NotificationStatus,
} from "iconsax-react";
import SelectionProcess1 from "@/components/organism/SelectionProcess1";
import SelectionProcess2 from "@/components/organism/SelectionProcess2";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import api from "@/configs/axios-interceptors";
import { useRouter } from "next/router";
import { Chicle } from "next/font/google";
const UseStyles = createStyles((theme) => ({
  layout: {
    [theme.fn.smallerThan("md")]: {
      marginLeft: "40px",
      marginRight: "40px",
    },
    [theme.fn.smallerThan("sm")]: {
      marginLeft: "20px",
      marginRight: "20px",
    },
  },
  hiddenMobile: {
    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },
  tabPanel: {
    [theme.fn.smallerThan("md")]: {
      paddingLeft: "0px",
      paddingTop: "40px",
    },
  },
  scroller: {
    [theme.fn.largerThan("md")]: {
      height: "auto",
    },
  },
  TabsList: {
    [theme.fn.smallerThan("md")]: {
      display: "flex",
      flexWrap: "nowrap",
      height: "50px",
    },
  },
}));
interface DashboardTabProps {
  children: React.ReactNode;
  activeTab: string;
  // user: string;
}
export default function Index({ children, activeTab }: DashboardTabProps) {
  const router = useRouter();
  const { classes } = UseStyles();
  const isWideScreen = useMediaQuery("(min-width: 64em)");
  const tabsOrientation = isWideScreen ? "vertical" : "horizontal";
  const [user, setUser] = useState<any>();
  const [isPaymentApproved, setPaymentApproved] = useState(true);
  const [selectionPhase1, setSelectionPhase1] = useState("");
  const [selectionPhase2, setSelectionPhase2] = useState("");
  const [loading, setLoading] = useState(false);
  const getUser = useCallback(async () => {
    const data = Cookies.get("user");
    const userIdentity = JSON.parse(data as string);
    const response = await api.get(`/user-identity/${userIdentity.id}/show`);
    setUser(response.data.data.fullname);
  }, []);
  const getPayment = useCallback(async () => {
    const data = Cookies.get("user");
    const userIdentity = JSON.parse(data as string);
    const response = await api.get(
      `/investment-fee-submission/${userIdentity.id}/show`
    );
    if (
      (activeTab == "SelectionProcess3" ||
        activeTab == "SelectionProcess4" ||
        activeTab == "SelectionProcess5" ||
        activeTab == "SelectionProcess6") &&
      response.data.data.status !== "approved"
    ) {
      router.push("/dashboard/SelectionProcess2");
    }
    if (response.data.data.status === "approved") {
      setPaymentApproved(false);
    }
    // setLoading(false);
  }, []);
  const getSelectionProcess = useCallback(async () => {
    const data = Cookies.get("user");
    const userIdentity = JSON.parse(data as string);
    const response = await api.get(`/selection-status/${userIdentity.id}/show`);
    if (
      activeTab == "SelectionProcess5" &&
      response.data.data.announcement_phase1_status !== "waitlisted"
    ) {
      router.push("/dashboard/SelectionProcess4");
    }
    setSelectionPhase1(response.data.data.announcement_phase1_status);
    setSelectionPhase2(response.data.data.announcement_phase2_status);

    // setLoading(false);
  }, []);
  useEffect(() => {
    if (typeof window !== "undefined") {
      getUser();
      getPayment();
      getSelectionProcess();
    }
  });
  const onChangeFullname = (name: string) => {
    setUser(name);
  };
  return (
    <>
      {loading ? (
        <Flex align="center" justify="center" w="100%" h="80vh">
          <Loader variant="dots" />
        </Flex>
      ) : (
        <>
          <Navbar />
          <Tabs
            variant="pills"
            orientation={tabsOrientation}
            value={activeTab}
            onTabChange={(value) => router.push(`/dashboard/${value}`)}
            className={classes.layout}
            sx={{
              marginBottom: "100px",
              marginTop: "100px",
              marginLeft: "80px",
              marginRight: "80px",
              position: "relative",
            }}
          >
            <Stack>
              <Card
                sx={{
                  backgroundColor: "#111213",
                  width: "270px",
                }}
                className={classes.hiddenMobile}
              >
                <Flex gap="lg" align="center" justify="flex-start">
                  <Box sx={{ width: "70px", height: "70px" }}>
                    <ProfileCircle size="70" color="white" variant="Bold" />
                  </Box>
                  <Stack>
                    <Text size="15px" color="white" sx={{ marginTop: "10px" }}>
                      {user}
                    </Text>
                  </Stack>
                </Flex>
              </Card>
              <ScrollArea
                className={classes.scroller}
                w="100%"
                h={50}
                type="auto"
                styles={(theme) => ({
                  scrollbar: {
                    "&, &:hover": {
                      background: "transparent",
                    },
                    '&[data-orientation="horizontal"] .mantine-ScrollArea-thumb':
                      {
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
                <Tabs.List
                  className={classes.TabsList}
                  sx={{
                    backgroundColor: "#111213",
                  }}
                >
                  <Tabs.Tab
                    value="SelectionProcess1"
                    sx={{
                      color: "white",
                      backgroundColor: "#111213",
                      ":hover": { color: "white", backgroundColor: "#243063" },
                    }}
                    icon={<UserEdit size="24" color="white" />}
                  >
                    Fill Your Identity
                  </Tabs.Tab>
                  <Tabs.Tab
                    value="SelectionProcess2"
                    sx={{
                      color: "white",
                      backgroundColor: "#111213",
                      ":hover": { color: "white", backgroundColor: "#243063" },
                    }}
                    icon={<EmptyWallet size="24" color="white" />}
                  >
                    Investment Fee
                  </Tabs.Tab>
                  <Tabs.Tab
                    value="SelectionProcess3"
                    sx={{
                      color: "white",
                      backgroundColor: "#111213",
                      ":hover": { color: "white", backgroundColor: "#243063" },
                    }}
                    icon={<DirectSend size="24" color="white" />}
                    disabled={isPaymentApproved}
                  >
                    Essay Submission
                  </Tabs.Tab>
                  <Tabs.Tab
                    value="SelectionProcess4"
                    sx={{
                      color: "white",
                      backgroundColor: "#111213",
                      ":hover": { color: "white", backgroundColor: "#243063" },
                    }}
                    icon={<NotificationStatus size="24" color="white" />}
                    disabled={isPaymentApproved}
                  >
                    Announcement
                  </Tabs.Tab>
                  {selectionPhase2 == "waitlisted" && (
                    <Tabs.Tab
                      value="SelectionProcess5"
                      sx={{
                        color: "white",
                        backgroundColor: "#111213",
                        ":hover": {
                          color: "white",
                          backgroundColor: "#243063",
                        },
                      }}
                      disabled
                      icon={<EmptyWallet size="24" color="white" />}
                    >
                      Announcement Waitlisted
                    </Tabs.Tab>
                  )}

                  {selectionPhase1 == "approved" && (
                    <Tabs.Tab
                      value="SelectionProcess6"
                      sx={{
                        color: "white",
                        backgroundColor: "#111213",
                        ":hover": {
                          color: "white",
                          backgroundColor: "#243063",
                        },
                      }}
                      // disabled
                      // disabled={
                      //   selectionStatus.announcement_phase2_status == null
                      // }
                      icon={<EmptyWallet size="24" color="white" />}
                    >
                      Commitment Fee
                    </Tabs.Tab>
                  )}
                  {selectionPhase2 == "approved" && (
                    <Tabs.Tab
                      value="SelectionProcess7"
                      sx={{
                        color: "white",
                        backgroundColor: "#111213",
                        ":hover": {
                          color: "white",
                          backgroundColor: "#243063",
                        },
                      }}
                      icon={<EmptyWallet size="24" color="white" />}
                    >
                      Commitment Fee
                    </Tabs.Tab>
                  )}
                </Tabs.List>
              </ScrollArea>
            </Stack>
            <Tabs.Panel
              className={classes.tabPanel}
              pt="xs"
              sx={{ paddingLeft: "40px", paddingTop: "0" }}
              value={activeTab}
            >
              {children}
            </Tabs.Panel>
          </Tabs>
        </>
      )}
    </>
  );
}
