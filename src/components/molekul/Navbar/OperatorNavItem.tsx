import React from "react";
import { Stack } from "@mantine/core";
import NavLink from "@/components/atoms/NavLink";
import { TbCategoryFilled } from "react-icons/tb";
import { FaUserGroup } from "react-icons/fa6";
import { BiSolidMessageSquareEdit } from "react-icons/bi";

type NavbarProps = {
  activeLink?: string;
  triggerLoading?: Function;
};

export default function OperatorNavItem({
  activeLink,
  triggerLoading,
}: NavbarProps) {
  return (
    <Stack>
      <NavLink
        route="/dashboard/operator"
        label="Dashboard"
        isActive={activeLink === "dashboard"}
        onClick={triggerLoading}
      >
        <TbCategoryFilled color="white" size={30} />
      </NavLink>
      <NavLink
        route="/accounts/student"
        label="Manajemen Akun"
        isActive={activeLink === "accounts"}
        onClick={triggerLoading}
      >
        <FaUserGroup color="white" size={30} />
      </NavLink>
      <NavLink
        route="/edit-status"
        label="Edit Status Mahasiswa"
        isActive={activeLink === "edit-status"}
        onClick={triggerLoading}
      >
        <BiSolidMessageSquareEdit color="white" size={30} />
      </NavLink>
    </Stack>
  );
}
