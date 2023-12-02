import React from "react";
import { Stack } from "@mantine/core";
import NavLink from "@/components/atoms/NavLink";
import { TbCategoryFilled } from "react-icons/tb";
import { BsClipboard2CheckFill } from "react-icons/bs";
import { SlBookOpen } from "react-icons/sl";
import { FaUserGroup } from "react-icons/fa6";

type NavbarProps = {
  activeLink?: string;
  triggerLoading?: Function;
};

export default function DoswalNavItem({
  activeLink,
  triggerLoading,
}: NavbarProps) {
  return (
    <Stack>
      <NavLink
        route="/dashboard/lecturer"
        label="Dashboard"
        isActive={activeLink === "dashboard"}
        onClick={triggerLoading}
      >
        <TbCategoryFilled color="white" size={30} />
      </NavLink>
      <NavLink
        route="/validation/irs"
        label="Validasi Progress"
        isActive={activeLink === "validation"}
        onClick={triggerLoading}
      >
        <BsClipboard2CheckFill color="white" size={30} />
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
