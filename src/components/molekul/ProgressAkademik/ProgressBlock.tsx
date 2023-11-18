import React from "react";
import { Button, Tooltip } from "@mantine/core";

export type ProgressBlockProps = {
  riwayat: any;
  irs: any;
  khs: any;
  pkl: any;
  skripsi: any;
  setIrs: Function;
  setKhs: Function;
  setPkl: Function;
  setSkripsi: Function;
  setIrsId: Function;
  setKhsId: Function;
  setPklId: Function;
  setSkripsiId: Function;
  setSemester: Function;
  open: Function;
};

export default function ProgressBlock({
  riwayat,
  irs,
  khs,
  pkl,
  skripsi,
  setIrs,
  setKhs,
  setPkl,
  setSkripsi,
  setIrsId,
  setKhsId,
  setPklId,
  setSkripsiId,
  setSemester,
  open,
}: ProgressBlockProps) {
  let verifedDoc = [];
  if (riwayat.irs_verification_status == "02") verifedDoc.push("IRS");
  if (riwayat.khs_verification_status == "02") verifedDoc.push("KHS");
  if (riwayat.pkl_verification_status == "02") verifedDoc.push("PKL");
  if (riwayat.skripsi_verification_status == "02") verifedDoc.push("Skripsi");

  const label = verifedDoc.join(", ");

  let color = "red";
  if (riwayat.irs_verification_status == "02") {
    color = "blue";

    if (riwayat.khs_verification_status == "02") {
      color = "light blue";

      if (riwayat.pkl_verification_status == "02") {
        color = "yellow";
      }

      if (riwayat.skripsi_verification_status == "02") {
        color = "green";
      }
    }
  }

  const click = () => {
    irs && setIrs({});
    khs && setKhs({});
    pkl && setPkl({});
    skripsi && setSkripsi({});
    if (label != "") {
      riwayat.irs_verification_status == "02"
        ? setIrsId(riwayat.irs_id)
        : setIrsId(null);
      riwayat.khs_verification_status == "02"
        ? setKhsId(riwayat.khs_id)
        : setKhsId(null);
      riwayat.pkl_verification_status == "02"
        ? setPklId(riwayat.pkl_id)
        : setPklId(null);
      riwayat.skripsi_verification_status == "02"
        ? setSkripsiId(riwayat.skripsi_id)
        : setSkripsiId(null);
      setSemester(riwayat.semester_value);
      open();
    }
  };

  return (
    <Tooltip
      label={label || "Belum Diisikan"}
      withArrow
      arrowSize={6}
      arrowRadius={4}
    >
      <Button w={100} h={100} onClick={click} color={color} variant="filled">
        {riwayat.semester_value}
      </Button>
    </Tooltip>
  );
}
