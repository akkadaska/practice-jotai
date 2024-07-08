import { userDataSourceAtom } from '../atom/user-data-source';
import { nameAtom } from '../atom/name';
import { useAtomInitialize } from './initialize';

export const useUserAtomsInitializeByDataSource = () => {
  useAtomInitialize((store) => {
    const user = store.get(userDataSourceAtom);
    store.set(nameAtom, user.name);
  });
};
