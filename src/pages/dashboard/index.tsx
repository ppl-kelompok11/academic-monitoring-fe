import React, { useEffect } from 'react';
import { LoadingOverlay } from '@mantine/core';
import Router from 'next/router';
import Cookies from 'js-cookie';

export default function Index() {
  const userData = Cookies.get('user');
  const user = userData && JSON.parse(userData);
  
  useEffect(() => {
    if (user) {
      if (user.role_id == 1) {
        Router.push('/dashboard/operator');
      } else if (user.role_id == 2) {
        Router.push('/dashboard/student');
      } else if (user.role_id == 3) {
        Router.push('/dashboard/lecturer');
      } else if (user.role_id == 4) {
        Router.push('/dashboard/department');
      }
    } else {
      Router.push('/auth/signin');
    }
  }, []);

  return (
    <LoadingOverlay color='primary' visible={true} overlayBlur={2} />
  );
}
