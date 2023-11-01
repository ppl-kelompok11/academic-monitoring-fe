import React from "react";
import { Stack } from "@mantine/core";
import NavLink from "@/components/atoms/NavLink";
import { TbCategoryFilled } from "react-icons/tb";
import { SlBookOpen } from "react-icons/sl";
import { FaUserGroup } from "react-icons/fa6";

type NavbarProps = {
  activeLink?: string;
};

export default function DepartemenNavItem({ activeLink }: NavbarProps) {
  return (
    <Stack>
      <NavLink route="/" label="Dashboard" isActive={activeLink === "dashboard"}>
        <TbCategoryFilled color="white" size={30} />
      </NavLink>
      <NavLink route="/recap" label="Rekap Progress" isActive={activeLink === "recap"}>
        <SlBookOpen color="white" size={30} />
      </NavLink>
      <NavLink route="/student-list" label="Daftar Mahasiswa" isActive={activeLink === "student-list"}>
        <FaUserGroup color="white" size={30} />
      </NavLink>
    </Stack>
  );
}
