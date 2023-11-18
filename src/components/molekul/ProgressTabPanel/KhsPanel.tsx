import React from "react";
import { Collapse, Skeleton, Center, Button, Space } from "@mantine/core";

export type KhsPanelProps = {
  khs: any;
  openCollapse: boolean;
  onViewDetail: Function;
  path: string;
};

export default function KhsPanel({
  khs,
  openCollapse,
  onViewDetail,
  path,
}: KhsPanelProps) {
  return (
    <>
      <Space h={10} />
      <table>
        <tr>
          <td>SKS Semester</td>
          <td>:</td>
          <td>
            {khs.sks ? (
              khs.sks
            ) : (
              <Skeleton width={50} height={10} radius="xl" />
            )}
          </td>
        </tr>
        <tr>
          <td>IP Semester</td>
          <td>:</td>
          <td>
            {khs.ip ? khs.ip : <Skeleton width={50} height={10} radius="xl" />}
          </td>
        </tr>
        <tr>
          <td>SKS Kumulatif</td>
          <td>:</td>
          <td>
            {khs.sks_kumulatif ? (
              khs.sks_kumulatif
            ) : (
              <Skeleton width={50} height={10} radius="xl" />
            )}
          </td>
        </tr>
        <tr>
          <td>IP Kumulatif</td>
          <td>:</td>
          <td>
            {khs.ip_kumulatif ? (
              khs.ip_kumulatif
            ) : (
              <Skeleton width={50} height={10} radius="xl" />
            )}
          </td>
        </tr>
      </table>
      <Space h={10} />
      <Center>
        <Button onClick={onViewDetail(path)}>Lihat Detail</Button>
      </Center>
      <Collapse in={openCollapse}>
        <Space h={10} />
        <iframe src={path} width="100%" height="720px" />
      </Collapse>
    </>
  );
}
