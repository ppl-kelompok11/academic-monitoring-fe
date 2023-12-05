import React from "react";
import { Stack } from "@mantine/core";
import NavLink from "@/components/atoms/NavLink";
import { TbCategoryFilled } from "react-icons/tb";
import { SlBookOpen } from "react-icons/sl";
import { FaUserGroup } from "react-icons/fa6";

type NavbarProps = {
  activeLink?: string;
  triggerLoading?: Function;
};

export default function DepartemenNavItem({
  activeLink,
  triggerLoading,
}: NavbarProps) {
  return (
    <Stack>
      <NavLink
        route="/dashboard"
        label="Dashboard"
        isActive={activeLink === "dashboard"}
        onClick={triggerLoading}
      >
        <TbCategoryFilled color="white" size={30} />
      </NavLink>
      <NavLink
        route="/recap"
        label="Rekap Progress"
        isActive={activeLink === "recap"}
        onClick={triggerLoading}
      >
        <SlBookOpen color="white" size={30} />
      </NavLink>
      <NavLink
        route="/students"
        label="Daftar Mahasiswa"
        isActive={activeLink === "student-list"}
        onClick={triggerLoading}
      >
        <FaUserGroup color="white" size={30} />
      </NavLink>
    </Stack>
  );
}
