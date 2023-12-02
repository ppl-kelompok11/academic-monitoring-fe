import React from "react";
import { Collapse, Center, Button, Space, Loader } from "@mantine/core";

export type PklPanelProps = {
  isLoading?: boolean;
  pkl: any;
  openCollapse: boolean;
  onViewDetail: Function;
  path: string;
};

export default function PklPanel({
  isLoading = false,
  pkl,
  openCollapse,
  onViewDetail,
  path,
}: PklPanelProps) {
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
            <td>Status PKL</td>
            <td>:</td>
            <td>{pkl.grade ? "Lulus" : "-"}</td>
          </tr>
          <tr>
            <td>Nilai PKL</td>
            <td>:</td>
            <td>{pkl.grade ? pkl.grade : "-"}</td>
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
