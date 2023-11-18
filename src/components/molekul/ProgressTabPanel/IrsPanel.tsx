import React from "react";
import { Collapse, Skeleton, Center, Button, Space } from "@mantine/core";

export type IrsPanelProps = {
  irs: any;
  openCollapse: boolean;
  onViewDetail: Function;
  path: string;
};

export default function IrsPanel({
  irs,
  openCollapse,
  onViewDetail,
  path,
}: IrsPanelProps) {
  return (
    <>
      <Space h={10} />
      <table>
        <tr>
          <td>SKS</td>
          <td>:</td>
          <td>
            {irs.sks ? (
              irs.sks
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
