import { ReactNode } from "react";
import {
  createStyles,
  Header,
  HoverCard,
  Group,
  Button,
  UnstyledButton,
  Text,
  SimpleGrid,
  ThemeIcon,
  Anchor,
  Divider,
  Center,
  Box,
  Burger,
  Drawer,
  Collapse,
  ScrollArea,
  rem,
  MantineProvider,
  Flex,
  Container,
} from "@mantine/core";
import { MantineLogo } from "@mantine/ds";
import { useDisclosure } from "@mantine/hooks";
import {
  IconNotification,
  IconCode,
  IconBook,
  IconChartPie3,
  IconFingerprint,
  IconCoin,
  IconChevronDown,
} from "@tabler/icons-react";
import Logo from "@/components/atoms/logo";
import Link from "next/link";
const UseStyles = createStyles((theme) => ({
  wrapper: {
    [theme.fn.smallerThan("lg")]: {
      padding: "5px 20px",
    },
  },
  hiddenMobile: {
    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan("md")]: {
      display: "none",
    },
  },
}));
import NavLinks from "@/components/atoms/NavLinks";
import router from "next/router";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
// const mockdata = [

// ];
type NavbarProps = {
  activeLink?: "Home" | "About" | "Program" | "Team" | "News" | "Products";
};
export default function Navbar({ activeLink }: NavbarProps) {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  // const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const { classes, theme } = UseStyles();
  const [token, setToken] = useState<any>();
  useEffect(() => {
    setToken(Cookies.get("token"));
  }, []);
  // console.log(token);

  // const links = mockdata.map((item) => (
  //   <UnstyledButton className={classes.subLink} key={item.title}>
  //     <Group noWrap align="flex-start">
  //       <ThemeIcon size={34} variant="default" radius="md">
  //         <item.icon size={rem(22)} color={theme.fn.primaryColor()} />
  //       </ThemeIcon>
  //       <div>
  //         <Text size="sm" fw={500}>
  //           {item.title}
  //         </Text>
  //         <Text size="xs" color="dimmed">
  //           {item.description}
  //         </Text>
  //       </div>
  //     </Group>
  //   </UnstyledButton>
  // ));
  return (
    <>
      <Box
        className={classes.wrapper}
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0)",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          padding: "10px 40px",
          backdropFilter: "blur(20px)",
          zIndex: 100,
        }}
      >
        <Group
          position="apart"
          sx={{ maxWidth: "1500px", marginLeft: "auto", marginRight: "auto" }}
        >
          <Logo />
          <Group position="center" className={classes.hiddenMobile} spacing="0">
            <NavLinks route="/" isActive={activeLink === "Home"}>
              Home
            </NavLinks>
            <NavLinks route="/About" isActive={activeLink === "About"}>
              About
            </NavLinks>
            <NavLinks route="/Program" isActive={activeLink === "Program"}>
              Program
            </NavLinks>
            {/* <NavLinks route="/" isActive={activeLink === "Team"}>
              Team
            </NavLinks>
            <NavLinks route="/" isActive={activeLink === "News"}>
              News
            </NavLinks>
            <NavLinks route="/" isActive={activeLink === "Products"}>
              Products
            </NavLinks> */}
          </Group>
          <Group position="apart" className={classes.hiddenMobile}>
            {token ? (
              <>
                <Button
                  onClick={() => {
                    router.push("/dashboard/SelectionProcess1");
                  }}
                >
                  <Text>Dashboard</Text>
                </Button>
                <Button
                  variant="subtle"
                  sx={{ backgroundColor: "white" }}
                  onClick={() => {
                    Cookies.remove("token");
                    Cookies.remove("user");
                    router.push("/");
                  }}
                >
                  Log Out
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={() => {
                    router.push("/auth/signin");
                  }}
                >
                  <Text>Sign In</Text>
                </Button>
                <Button
                  variant="subtle"
                  sx={{ backgroundColor: "white" }}
                  onClick={() => {
                    router.push("/auth/signup");
                  }}
                >
                  Sign Up
                </Button>
              </>
            )}
          </Group>
          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            className={classes.hiddenDesktop}
            color="white"
          />
          <Drawer
            opened={drawerOpened}
            onClose={closeDrawer}
            title={<Logo />}
            size={500}
            position="top"
            overlayProps={{ opacity: 0.5, blur: 4 }}
            // className={classes.hiddenDesktop}
          >
            <Box>
              <Box>
                <NavLinks route="/" isActive={activeLink === "Home"}>
                  Home
                </NavLinks>
              </Box>

              <NavLinks route="/About" isActive={activeLink === "About"}>
                About
              </NavLinks>
              <NavLinks route="/Program" isActive={activeLink === "Program"}>
                Program
              </NavLinks>
              {/* <NavLinks route="/" isActive={activeLink === "Team"}>
                Team
              </NavLinks>
              <NavLinks route="/" isActive={activeLink === "News"}>
                News
              </NavLinks>
              <NavLinks route="/" isActive={activeLink === "Products"}>
                Products
              </NavLinks> */}
              <br />

              {token ? (
                <>
                  <Button
                    fullWidth
                    onClick={() => {
                      router.push("/dashboard/SelectionProcess1");
                    }}
                  >
                    <Text>Dashboard</Text>
                  </Button>
                  <br />
                  <Button
                    fullWidth
                    variant="subtle"
                    sx={{ backgroundColor: "white" }}
                    onClick={() => {
                      Cookies.remove("token");
                      Cookies.remove("user");
                      router.push("/");
                    }}
                  >
                    Log Out
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    fullWidth
                    onClick={() => {
                      router.push("/auth/signin");
                    }}
                  >
                    <Text>Sign In</Text>
                  </Button>
                  <br />
                  <Button
                    fullWidth
                    variant="subtle"
                    sx={{ backgroundColor: "white" }}
                    onClick={() => {
                      router.push("/auth/signup");
                    }}
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </Box>
          </Drawer>
        </Group>
      </Box>
    </>
  );
}
