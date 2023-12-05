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
  lecture,
  isLoading,
  isShowEditBtn = false,
}: any) {
  return (
    <Card mt={10} bg={"white"} radius={"lg"}>
      <Flex
        direction={{ base: "column", md: "row" }}
        gap={{ base: "sm", md: "lg" }}
        justify={{ base: "center", md: "space-between" }}
        align="flex-start"
        p={16}
      >
        <Stack align="flex-start" justify="space-between" h={300}>
          <table>
            <tr>
              <td style={{ paddingRight: "75px" }}>Nama Lengkap</td>
              <td style={{ paddingRight: "25px" }}>:</td>
              <td>
                {isLoading ? (
                  <Skeleton width={50} height={10} radius="xl" />
                ) : lecture.name ? (
                  lecture.name
                ) : (
                  "-"
                )}
              </td>
            </tr>
            <tr>
              <td>NIP</td>
              <td>:</td>
              <td>
                {isLoading ? (
                  <Skeleton width={50} height={10} radius="xl" />
                ) : lecture.nip ? (
                  lecture.nip
                ) : (
                  "-"
                )}
              </td>
            </tr>
            <tr>
              <td>NIDN</td>
              <td>:</td>
              <td>
                {isLoading ? (
                  <Skeleton width={50} height={10} radius="xl" />
                ) : lecture.nidn ? (
                  lecture.nidn
                ) : (
                  "-"
                )}
              </td>
            </tr>
            <tr>
              <td>Tanggal Mulai Bekerja</td>
              <td>:</td>
              <td>
                {isLoading ? (
                  <Skeleton width={50} height={10} radius="xl" />
                ) : lecture.work_start_date ? (
                  lecture.work_start_date
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
                ) : lecture.email ? (
                  lecture.email
                ) : (
                  "-"
                )}
              </td>
            </tr>
            <tr>
              <td>Provinsi</td>
              <td>:</td>
              <td>
                {isLoading ? (
                  <Skeleton width={50} height={10} radius="xl" />
                ) : lecture.province_name ? (
                  lecture.province_name
                ) : (
                  "-"
                )}
              </td>
            </tr>
            <tr>
              <td>Kabupaten / Kota</td>
              <td>:</td>
              <td>
                {isLoading ? (
                  <Skeleton width={50} height={10} radius="xl" />
                ) : lecture.city_name ? (
                  lecture.city_name
                ) : (
                  "-"
                )}
              </td>
            </tr>
            <tr>
              <td>Alamat</td>
              <td>:</td>
              <td>
                {isLoading ? (
                  <Skeleton width={50} height={10} radius="xl" />
                ) : lecture.address ? (
                  lecture.address
                ) : (
                  "-"
                )}
              </td>
            </tr>
            <tr>
              <td>No Handphone</td>
              <td>:</td>
              <td>
                {isLoading ? (
                  <Skeleton width={50} height={10} radius="xl" />
                ) : lecture.phone ? (
                  lecture.phone
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
              src={lecture.photo ? lecture.photo.url : "/sample-profile.jpg"}
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
