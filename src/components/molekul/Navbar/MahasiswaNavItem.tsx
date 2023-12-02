import React from "react";
import { Stack } from "@mantine/core";
import NavLink from "@/components/atoms/NavLink";
import { TbCategoryFilled } from "react-icons/tb";
import { IoSchool } from "react-icons/io5";

type NavbarProps = {
  activeLink?: string;
  triggerLoading?: Function;
};

export default function MahasiswaNavItem({
  activeLink,
  triggerLoading,
}: NavbarProps) {
  return (
    <Stack>
      <NavLink
        route="/dashboard/student"
        label="Dashboard"
        isActive={activeLink === "dashboard"}
        onClick={triggerLoading}
      >
        <TbCategoryFilled color="white" size={30} />
      </NavLink>
      <NavLink
        route="/academic/irs"
        label="Akademik"
        isActive={activeLink === "academic"}
        onClick={triggerLoading}
      >
        <IoSchool color="white" size={30} />
      </NavLink>
    </Stack>
  );
}
