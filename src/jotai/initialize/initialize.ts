import { useStore } from 'jotai';
import { useRef } from 'react';

type Store = ReturnType<typeof useStore>;

export const useAtomInitialize = (initializeFn: (store: Store) => void) => {
  // make sure initializeFn is called only once
  const isInitializedRef = useRef(false);
  const store = useStore();
  if (isInitializedRef.current) {
    return;
  }
  isInitializedRef.current = true;

  initializeFn(store);
};
