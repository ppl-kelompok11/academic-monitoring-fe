import React from "react";
import { createStyles, Navbar, Image, Center, Stack } from "@mantine/core";
import OperatorNavItem from "./OperatorNavItem";
import MahasiswaNavItem from "./MahasiswaNavItem";
import DoswalNavItem from "./DoswalNavItem";
import DepartemenNavItem from "./DepartemenNavItem";
import NavLink from "@/components/atoms/NavLink";
import NavButton from "@/components/atoms/NavButton";
import { FaUser } from "react-icons/fa6";
import { CgLogOut } from "react-icons/cg";
import Cookies from "js-cookie";
import api from "@/configs/axios-interceptors";
import router from "next/router";

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor: "243063",
  },
}));

export type NavbarProps = {
  role?: "operator" | "mahasiswa" | "dosen-wali" | "departemen";
  activeLink?:
    | "dashboard"
    | "profile"

    // operator
    | "accounts"
    | "edit-status"

    // mahasiswa
    | "academic"

    // dosen-wali & departemen
    | "student-list"
    | "recap"
    | "validation"; // !departemen
};

export default function Index({
  activeLink,
  role,
}: NavbarProps) {
  const { classes } = useStyles();

  const onLogout = async () => {
    try {
      const response = await api.post("/auth/logout");
      Cookies.remove("token");
      Cookies.remove("user");
      router.push("/auth/signin");
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <Navbar
      py={20}
      bg="primary"
      height="100vh"
      p="xs"
      width={{ base: 90 }}
      className={classes.navbar}
    >
      <Navbar.Section>
        <Center>
          <Image src="/Logo.png" alt="logo_undip" width="45px" />
        </Center>
      </Navbar.Section>
      <Navbar.Section grow my="30px">
        <Center>
          {role === "operator" && (
            <OperatorNavItem
              activeLink={activeLink}
            />
          )}
          {role === "mahasiswa" && (
            <MahasiswaNavItem
              activeLink={activeLink}
            />
          )}
          {role === "dosen-wali" && (
            <DoswalNavItem
              activeLink={activeLink}
            />
          )}
          {role === "departemen" && (
            <DepartemenNavItem
              activeLink={activeLink}
            />
          )}
        </Center>
      </Navbar.Section>

      <Navbar.Section>
        <Center>
          <Stack>
            <NavLink
              label="Profil"
              route="/profile"
              isActive={activeLink === "profile"}
            >
              <FaUser color="white" size={30} />
            </NavLink>
            <NavButton label="Keluar" onClick={onLogout}>
              <CgLogOut color="white" size={30} />
            </NavButton>
          </Stack>
        </Center>
      </Navbar.Section>
    </Navbar>
  );
}
