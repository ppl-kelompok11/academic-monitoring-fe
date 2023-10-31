import React from "react";
import { Stack } from "@mantine/core";
import NavLink from "@/components/atoms/NavLink";
import { TbCategoryFilled } from "react-icons/tb";
import { BsClipboard2CheckFill } from "react-icons/bs";
import { SlBookOpen } from "react-icons/sl";
import { FaUserGroup } from "react-icons/fa6";

type NavbarProps = {
  activeLink?: string;
};

export default function DoswalNavItem({ activeLink }: NavbarProps) {
  return (
    <Stack>
      <NavLink route="/" isActive={activeLink === "dashboard"}>
        <TbCategoryFilled color="white" size={30} />
      </NavLink>
      <NavLink route="/validation" isActive={activeLink === "validation"}>
        <BsClipboard2CheckFill color="white" size={30} />
      </NavLink>
      <NavLink route="/recap" isActive={activeLink === "recap"}>
        <SlBookOpen color="white" size={30} />
      </NavLink>
      <NavLink route="/student-list" isActive={activeLink === "student-list"}>
        <FaUserGroup color="white" size={30} />
      </NavLink>
    </Stack>
  );
}
