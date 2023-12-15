import React from "react";
import {
  Card,
  Flex,
  Image,
  Center,
  Skeleton,
  Stack,
  Button,
} from "@mantine/core";
import Router from "next/router";

export default function Index({
  department,
  isLoading,
  isShowEditBtn = false,
}: any) {
  return (
    <Card mt={10} bg={"white"} radius={"lg"}>
      <Flex
        direction={{ base: "column-reverse", md: "row" }}
        gap={{ base: "sm", md: "lg" }}
        justify={{ base: "center", md: "space-between" }}
        align={{md: "flex-start"}}
        p={16}
      >
        <Stack align="flex-start" justify="space-between" h={300}>
          <table>
            <tr>
              <td style={{ paddingRight: "50px" }}>Nama Lengkap</td>
              <td style={{ paddingRight: "25px" }}>:</td>
              <td>
                {isLoading ? (
                  <Skeleton width={50} height={10} radius="xl" />
                ) : department.name ? (
                  department.name
                ) : (
                  "-"
                )}
              </td>
            </tr>
            <tr>
              <td>Email</td>
              <td>:</td>
              <td>
                {isLoading ? (
                  <Skeleton width={50} height={10} radius="xl" />
                ) : department.email ? (
                  department.email
                ) : (
                  "-"
                )}
              </td>
            </tr>
          </table>
          {isShowEditBtn && (
            <Button
              onClick={() => {
                Router.push(`${Router.asPath}/edit`);
              }}
              size="sm"
            >
              Edit Profile
            </Button>
          )}
        </Stack>
        <Center>
          {isLoading ? (
            <Skeleton width={300} height={300} radius="xl" />
          ) : (
            <Image
              alt="profile picture"
              radius={16}
              src={department.photo ? department.photo.url : "/sample-profile.jpg"}
              height={300}
              width={300}
              withPlaceholder
              className=""
            />
          )}
        </Center>
      </Flex>
    </Card>
  );
}
