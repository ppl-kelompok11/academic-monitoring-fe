import React from "react";
import { Collapse, Center, Button, Space, Loader } from "@mantine/core";

export type KhsPanelProps = {
  isLoading?: boolean;
  khs: any;
  openCollapse: boolean;
  onViewDetail: Function;
  path: string;
};

export default function KhsPanel({
  isLoading = false,
  khs,
  openCollapse,
  onViewDetail,
  path,
}: KhsPanelProps) {
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
            <td>SKS Semester</td>
            <td style={{padding: "0 10px"}}>:</td>
            <td>{khs.sks ? khs.sks : "-"}</td>
          </tr>
          <tr>
            <td>IP Semester</td>
            <td style={{padding: "0 10px"}}>:</td>
            <td>{khs.ip ? khs.ip : "-"}</td>
          </tr>
          <tr>
            <td>SKS Kumulatif</td>
            <td style={{padding: "0 10px"}}>:</td>
            <td>{khs.sks_kumulatif ? khs.sks_kumulatif : "-"}</td>
          </tr>
          <tr>
            <td>IP Kumulatif</td>
            <td style={{padding: "0 10px"}}>:</td>
            <td>{khs.ip_kumulatif ? khs.ip_kumulatif : "-"}</td>
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
