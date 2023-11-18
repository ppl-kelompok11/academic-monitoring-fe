import React from 'react'
import ProgressBlock from './ProgressBlock'

export type ProgressAkademikProps = {
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

export default function Index({
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
} : ProgressAkademikProps) {
  return (
    riwayat.map ((item: any) => (
      <ProgressBlock
        key={item.semester_value}
        riwayat={item}
        irs={irs}
        khs={khs}
        pkl={pkl}
        skripsi={skripsi}
        setIrs={setIrs}
        setKhs={setKhs}
        setPkl={setPkl}
        setSkripsi={setSkripsi}
        setIrsId={setIrsId}
        setKhsId={setKhsId}
        setPklId={setPklId}
        setSkripsiId={setSkripsiId}
        setSemester={setSemester}
        open={open}
      />
    ))
  );
}
