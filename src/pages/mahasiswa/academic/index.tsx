import React, { useEffect } from 'react';
import Router from 'next/router';

export default function Index() {
  useEffect(() => {
    Router.push('/mahasiswa/academic/irs');
  }, []);

  return null;
}
