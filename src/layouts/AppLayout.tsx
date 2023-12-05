import React, { useState, useEffect } from "react";
import { AppShell, LoadingOverlay } from "@mantine/core";
import NavBar, { NavbarProps } from "@/components/molekul/Navbar";
import Cookies from "js-cookie";

type AppLayoutProps = {
  children: React.ReactNode;
  activeLink?: NavbarProps["activeLink"];
  role?: NavbarProps["role"];
};

export default function AppLayout({
  children,
  activeLink,
  role,
}: AppLayoutProps) {
  const [user, setUser] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);

  const triggerLoading = () => {
    if (isLoading) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  };

  useEffect(() => {
    const userData = Cookies.get("user");
    userData && setUser(JSON.parse(userData));
  }, []);

  const parseRole = (id: number) => {
    if (id == 1) {
      return "operator";
    } else if (id == 2) {
      return "mahasiswa";
    } else if (id == 3) {
      return "dosen-wali";
    } else if (id == 4) {
      return "departemen";
    }
  };

  return (
    <AppShell
      styles={{
        main: {
          background: "#EEF0F6",
        },
      }}
      navbarOffsetBreakpoint="sm"
      navbar={
        <NavBar
          activeLink={activeLink}
          role={parseRole(user.role_id)}
          triggerLoading={triggerLoading}
        />
      }
    >
      <LoadingOverlay visible={isLoading} overlayBlur={2} />
      {children}
    </AppShell>
  );
}
