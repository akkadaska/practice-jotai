'use client';

import {
  DehydratedState,
  HydrationBoundary,
  keepPreviousData,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { atom, Provider, useAtom, useAtomValue } from 'jotai';
import { atomWithQuery, queryClientAtom } from 'jotai-tanstack-query';
import { useHydrateAtoms } from 'jotai/utils';
import React, { ReactNode, useState } from 'react';

export const Client: React.FC<{ dehydratedState: DehydratedState }> = ({
  dehydratedState,
}) => {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState}>
        <Provider>
          <HydrateQueryClientAtom queryClient={queryClient}>
            <Content />
          </HydrateQueryClientAtom>
        </Provider>
      </HydrationBoundary>
    </QueryClientProvider>
  );
};

const HydrateQueryClientAtom: React.FC<{
  queryClient: QueryClient;
  children: ReactNode;
}> = ({ queryClient, children }) => {
  useHydrateAtoms([[queryClientAtom, queryClient]]);
  return <>{children}</>;
};

const pageAtom = atom<number>(0);

const queryAtomWithQuery = atomWithQuery<
  string,
  Error,
  string,
  ['page', number]
>((get) => ({
  queryKey: ['page', get(pageAtom)] as ['page', number],
  queryFn: async ({ queryKey: [, page] }) => {
    // eslint-disable-next-line no-console
    console.log(`Fetching page ${page}`);
    return new Promise<string>((resolve) =>
      setTimeout(() => {
        resolve(`Result of page ${page}`);
      }, 1000),
    );
  },
  retry: 1,
  refetchOnMount: false,
  refetchOnWindowFocus: false,
  refetchInterval: false,
  placeholderData: keepPreviousData,
}));

const Content: React.FC = () => {
  const [page, setPage] = useAtom(pageAtom);
  const { data } = useAtomValue(queryAtomWithQuery);
  const increment = () => setPage((c) => c + 1);
  const decrement = () => setPage((c) => c - 1);
  return (
    <div>
      <p>Page: {page}</p>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={increment}
      >
        Increment
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={decrement}
      >
        Decrement
      </button>
      {data ? <p>Result: {data}</p> : <p>Loading...</p>}
    </div>
  );
};
