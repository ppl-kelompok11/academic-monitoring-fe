import React from "react";
import {
  Collapse,
  Center,
  Button,
  Space,
  Loader,
} from "@mantine/core";

export type IrsPanelProps = {
  isLoading?: boolean;
  irs: any;
  openCollapse: boolean;
  onViewDetail: Function;
  path: string;
};

export default function IrsPanel({
  isLoading = false,
  irs,
  openCollapse,
  onViewDetail,
  path,
}: IrsPanelProps) {
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
            <td>SKS</td>
            <td>:</td>
            <td>{irs.sks ? irs.sks : "-"}</td>
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
