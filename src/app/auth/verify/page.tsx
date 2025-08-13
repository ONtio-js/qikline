import React from 'react'
import { Suspense } from 'react'
import Verify from '@/components/forms/Verify'

const page = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Verify />
      </Suspense>
    </div>
  );
};

export default page;