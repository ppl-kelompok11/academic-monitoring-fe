import React from "react";
import { Collapse, Center, Button, Space, Loader } from "@mantine/core";

export type SkripsiPanelProps = {
  isLoading?: boolean;
  skripsi: any;
  openCollapse: boolean;
  onViewDetail: Function;
  path: string;
};

export default function SkripsiPanel({
  isLoading = false,
  skripsi,
  openCollapse,
  onViewDetail,
  path,
}: SkripsiPanelProps) {
  return (
    <>
      <Space h={10} />
      {isLoading ? (
        <Center>
          <Loader />
        </Center>
      ) : (
        <table>
          <tr>
            <td>Status Skripsi</td>
            <td>:</td>
            <td>{skripsi.grade ? "Lulus" : "-"}</td>
          </tr>
          <tr>
            <td>Nilai Skripsi</td>
            <td>:</td>
            <td>{skripsi.grade ? skripsi.grade : "-"}</td>
          </tr>
        </table>
      )}
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
