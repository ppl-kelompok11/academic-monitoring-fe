import React from "react";
import { Stack } from "@mantine/core";
import NavLink from "@/components/atoms/NavLink";
import { TbCategoryFilled } from "react-icons/tb";
import { FaUserGroup } from "react-icons/fa6";
import { BiSolidMessageSquareEdit } from "react-icons/bi";

type NavbarProps = {
  activeLink?: string;
};

export default function OperatorNavItem({ activeLink }: NavbarProps) {
  return (
    <Stack>
      <NavLink route="/" isActive={activeLink === "dashboard"}>
        <TbCategoryFilled color="white" size={30} />
      </NavLink>
      <NavLink route="/accounts" isActive={activeLink === "accounts"}>
        <FaUserGroup color="white" size={30} />
      </NavLink>
      <NavLink route="/edit-status" isActive={activeLink === "edit-status"}>
        <BiSolidMessageSquareEdit color="white" size={30} />
      </NavLink>
    </Stack>
  );
}
