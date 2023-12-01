import React, { useEffect } from 'react';
import Router from 'next/router';
import { LoadingOverlay } from '@mantine/core';

export default function Home() {
  useEffect (() => {
    Router.push('/dashboard');
  }, []);
  
  return (
    <LoadingOverlay color='primary' visible={true} overlayBlur={2} />
  );
}
