import React from "react";
import { Stack } from "@mantine/core";
import NavLink from "@/components/atoms/NavLink";
import { TbCategoryFilled } from "react-icons/tb";
import { FaUserGroup } from "react-icons/fa6";

type NavbarProps = {
  activeLink?: string;
};

export default function OperatorNavItem({ activeLink }: NavbarProps) {
  return (
    <Stack>
      <NavLink
        route="/dashboard/operator"
        label="Dashboard"
        isActive={activeLink === "dashboard"}
      >
        <TbCategoryFilled color="white" size={30} />
      </NavLink>
      <NavLink
        route="/accounts"
        label="Manajemen Akun"
        isActive={activeLink === "accounts"}
      >
        <FaUserGroup color="white" size={30} />
      </NavLink>
    </Stack>
  );
}
