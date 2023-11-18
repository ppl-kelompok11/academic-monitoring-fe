import React from "react";
import { Card, Flex, Image, Center, Skeleton } from "@mantine/core";

export default function Index({ mahasiswa }: any) {
  return (
    <Card mt={10} bg={"white"} radius={"lg"}>
      <Flex
        direction={{ base: "column", md: "row" }}
        gap={{ base: "sm", md: "lg" }}
        justify={{ base: "center", md: "space-between" }}
        align="flex-start"
        p={16}
      >
        <table>
          <tr>
            <td style={{ paddingRight: "50px" }}>Nama Lengkap</td>
            <td style={{ paddingRight: "25px" }}>:</td>
            <td>
              {mahasiswa.name ? (
                mahasiswa.name
              ) : (
                <Skeleton width={50} height={10} radius="xl" />
              )}
            </td>
          </tr>
          <tr>
            <td>NIM</td>
            <td>:</td>
            <td>
              {mahasiswa.nim ? (
                mahasiswa.nim
              ) : (
                <Skeleton width={50} height={10} radius="xl" />
              )}
            </td>
          </tr>
          <tr>
            <td>Angkatan</td>
            <td>:</td>
            <td>
              {mahasiswa.start_education_year ? (
                mahasiswa.start_education_year
              ) : (
                <Skeleton width={50} height={10} radius="xl" />
              )}
            </td>
          </tr>
          <tr>
            <td>Jalur Masuk</td>
            <td>:</td>
            {!mahasiswa.entrance_code && (
              <Skeleton width={50} height={10} radius="xl" />
            )}
            {mahasiswa.entrance_code == "00" && <td>SNMPTN</td>}
            {mahasiswa.entrance_code == "01" && <td>SBMPTN</td>}
            {mahasiswa.entrance_code == "02" && <td>Mandiri</td>}
          </tr>
          <tr>
            <td>Dosen Wali</td>
            <td>:</td>
            <td>
              {mahasiswa.lecture_name ? (
                mahasiswa.lecture_name
              ) : (
                <Skeleton width={50} height={10} radius="xl" />
              )}
            </td>
          </tr>
          <tr>
            <td>Provinsi</td>
            <td>:</td>
            <td>
              {mahasiswa.province_name ? (
                mahasiswa.province_name
              ) : (
                <Skeleton width={50} height={10} radius="xl" />
              )}
            </td>
          </tr>
          <tr>
            <td>Kabupaten / Kota</td>
            <td>:</td>
            <td>
              {mahasiswa.city_name ? (
                mahasiswa.city_name
              ) : (
                <Skeleton width={50} height={10} radius="xl" />
              )}
            </td>
          </tr>
          <tr>
            <td>Alamat</td>
            <td>:</td>
            <td>
              {mahasiswa.address ? (
                mahasiswa.address
              ) : (
                <Skeleton width={50} height={10} radius="xl" />
              )}
            </td>
          </tr>
          <tr>
            <td>No Handphone</td>
            <td>:</td>
            <td>
              {mahasiswa.phone ? (
                mahasiswa.phone
              ) : (
                <Skeleton width={50} height={10} radius="xl" />
              )}
            </td>
          </tr>
        </table>
        <Center>
          <Image
            alt="auth"
            radius={16}
            src="/profile-sample.png"
            height={300}
            width={300}
            className=""
          />
        </Center>
      </Flex>
    </Card>
  );
}
