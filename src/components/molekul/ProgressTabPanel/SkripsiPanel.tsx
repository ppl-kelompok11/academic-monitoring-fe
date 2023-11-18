import React from "react";
import { Collapse, Skeleton, Center, Button, Space } from "@mantine/core";

export type SkripsiPanelProps = {
  skripsi: any;
  openCollapse: boolean;
  onViewDetail: Function;
  path: string;
};

export default function SkripsiPanel({
  skripsi,
  openCollapse,
  onViewDetail,
  path,
}: SkripsiPanelProps) {
  return (
    <>
      <Space h={10} />
      <table>
        <tr>
          <td>Status Skripsi</td>
          <td>:</td>
          <td>
            {skripsi.grade ? (
              "Lulus"
            ) : (
              <Skeleton width={50} height={10} radius="xl" />
            )}
          </td>
        </tr>
        <tr>
          <td>Nilai Skripsi</td>
          <td>:</td>
          <td>
            {skripsi.grade ? (
              skripsi.grade
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
