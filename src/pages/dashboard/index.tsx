import React, { useEffect } from 'react';
import { LoadingOverlay } from '@mantine/core';

export default function Index() {
    return (
    <LoadingOverlay color='primary' visible={true} overlayBlur={2} />
  );
}
