import React from "react";
import { Collapse, Skeleton, Center, Button, Space } from "@mantine/core";

export type PklPanelProps = {
  pkl: any;
  openCollapse: boolean;
  onViewDetail: Function;
  path: string;
};

export default function PklPanel({
  pkl,
  openCollapse,
  onViewDetail,
  path,
}: PklPanelProps) {
  return (
    <>
      <Space h={10} />
      <table>
        <tr>
          <td>Status PKL</td>
          <td>:</td>
          <td>
            {pkl.grade ? (
              "Lulus"
            ) : (
              <Skeleton width={50} height={10} radius="xl" />
            )}
          </td>
        </tr>
        <tr>
          <td>Nilai PKL</td>
          <td>:</td>
          <td>
            {pkl.grade ? (
              pkl.grade
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
