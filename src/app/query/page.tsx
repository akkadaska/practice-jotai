import React from 'react';
import { dehydrate, QueryClient } from '@tanstack/react-query';

import { Client } from './_content';

const getDehydratedState = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['page', 0],
    queryFn: () => 'Result of page 0(SSR data)',
  });

  return dehydrate(queryClient);
};

export default async function Page() {
  const dehydratedState = await getDehydratedState();

  return <Client dehydratedState={dehydratedState} />;
}
