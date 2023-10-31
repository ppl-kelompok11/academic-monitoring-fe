import React, { useState } from "react";
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
} from "@mantine/core";
import NavBar, { NavbarProps } from "@/components/molekul/Navbar";

type AppLayoutProps = {
  children: React.ReactNode;
  activeLink?: NavbarProps["activeLink"];
  role?: NavbarProps["role"];
};

export default function AppLayout({ children, activeLink, role }: AppLayoutProps) {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  return (
    <AppShell
      styles={{
        main: {
          background: "#EEF0F6",
        },
      }}
      navbarOffsetBreakpoint="sm"
      navbar={
        // <Navbar
        //   p="md"
        //   hiddenBreakpoint="sm"
        //   hidden={!opened}
        //   width={{ sm: 200, lg: 300 }}
        // >
        //   <Text>Application navbar</Text>
        // </Navbar>
        <NavBar activeLink={activeLink} role={role} />
      }
      // header={
      //   <Header height={{ base: 50, md: 70 }} p="md">
      //     <div
      //       style={{ display: "flex", alignItems: "center", height: "100%" }}
      //     >
      //       <MediaQuery largerThan="sm" styles={{ display: "none" }}>
      //         <Burger
      //           opened={opened}
      //           onClick={() => setOpened((o) => !o)}
      //           size="sm"
      //           color={theme.colors.gray[6]}
      //           mr="xl"
      //         />
      //       </MediaQuery>
      //       <MediaQuery largerThan="sm" styles={{ display: "none" }}>
      //         <Text c="black" size={24} fw={500} align="left">
      //           Academic Monitoring App
      //         </Text>
      //       </MediaQuery>
      //     </div>
      //   </Header>
      // }
    >
      {children}
    </AppShell>
  );
}
