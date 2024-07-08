import { useAtomValue, useSetAtom, useStore } from 'jotai';
import { nameAtom } from '../atom/name';
import {
  userDataSourceAtom,
  userDataSourceMutationAtom,
} from '../atom/user-data-source';

export const useUserBaseMutation = () => {
  const store = useStore();
  const { mutate } = useAtomValue(userDataSourceMutationAtom);
  const setUserDataSource = useSetAtom(userDataSourceAtom);

  return () => {
    const name = store.get(nameAtom);
    mutate(
      { name },
      {
        onSuccess: (updatedUser) => {
          setUserDataSource(updatedUser);
        },
      },
    );
  };
};
