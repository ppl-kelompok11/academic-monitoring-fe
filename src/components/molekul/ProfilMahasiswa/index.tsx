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

const parseEntrance = (code: string) => {
  if (code == "00") return "SNMPTN";
  if (code == "01") return "SBMPTN";
  if (code == "02") return "Mandiri";
  return "-";
};

export default function Index({
  mahasiswa,
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
        <Stack align="flex-start">
          <table>
            <tr>
              <td style={{ paddingRight: "50px" }}>Nama Lengkap</td>
              <td style={{ paddingRight: "25px" }}>:</td>
              <td>
                {isLoading ? (
                  <Skeleton width={50} height={10} radius="xl" />
                ) : mahasiswa.name ? (
                  mahasiswa.name
                ) : (
                  "-"
                )}
              </td>
            </tr>
            <tr>
              <td>NIM</td>
              <td>:</td>
              <td>
                {isLoading ? (
                  <Skeleton width={50} height={10} radius="xl" />
                ) : mahasiswa.nim ? (
                  mahasiswa.nim
                ) : (
                  "-"
                )}
              </td>
            </tr>
            <tr>
              <td>Angkatan</td>
              <td>:</td>
              <td>
                {isLoading ? (
                  <Skeleton width={50} height={10} radius="xl" />
                ) : mahasiswa.start_education_year ? (
                  mahasiswa.start_education_year
                ) : (
                  "-"
                )}
              </td>
            </tr>
            <tr>
              <td>Jalur Masuk</td>
              <td>:</td>
              {isLoading ? (
                <Skeleton width={50} height={10} radius="xl" />
              ) : mahasiswa.entrance_code ? (
                parseEntrance(mahasiswa.entrance_code)
              ) : (
                "-"
              )}
            </tr>
            <tr>
              <td>Dosen Wali</td>
              <td>:</td>
              <td>
                {isLoading ? (
                  <Skeleton width={50} height={10} radius="xl" />
                ) : mahasiswa.lecture_name ? (
                  mahasiswa.lecture_name
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
                ) : mahasiswa.province_name ? (
                  mahasiswa.province_name
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
                ) : mahasiswa.city_name ? (
                  mahasiswa.city_name
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
                ) : mahasiswa.address ? (
                  mahasiswa.address
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
                ) : mahasiswa.phone ? (
                  mahasiswa.phone
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
              src={mahasiswa.photo ? mahasiswa.photo.url : "/sample-profile.jpg"}
              height={300}
              width={300}
              className=""
            />
          )}
        </Center>
      </Flex>
    </Card>
  );
}
