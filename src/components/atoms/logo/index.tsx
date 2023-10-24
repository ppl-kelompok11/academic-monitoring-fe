import Image from "next/image";
import { Stack } from "@mantine/core";
import { url } from "inspector";
export default function Logo() {
  return <Image src="/Logo.png" alt="logo" width={100} height={59} />;
}
