import React from "react";
import { Stack } from "@mantine/core";
import NavLink from "@/components/atoms/NavLink";
import { TbCategoryFilled } from "react-icons/tb";
import { IoSchool } from "react-icons/io5";

type NavbarProps = {
  activeLink?: string;
};

export default function MahasiswaNavItem({ activeLink }: NavbarProps) {
  return (
    <Stack>
      <NavLink route="/" label="Dashboard" isActive={activeLink === "dashboard"}>
        <TbCategoryFilled color="white" size={30} />
      </NavLink>
      <NavLink route="/academic" label="Akademik" isActive={activeLink === "academic"}>
        <IoSchool color="white" size={30} />
      </NavLink>
    </Stack>
  );
}
