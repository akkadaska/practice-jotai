import { mutateUserAction } from '@/action/mutate-user-action';
import { User } from '@/data-source/user';
import { atom } from 'jotai';
import { atomWithMutation } from 'jotai-tanstack-query';

/**
 * Atom for updating the user data and retrieving the mutation status.
 * Use `userDataSourceAtom` if you want to get the current user data, including before the mutation.
 */
export const userDataSourceMutationAtom = atomWithMutation(() => ({
  mutationKey: ['userDataSourceUpdate'],
  mutationFn: async (updateUserFiled: Partial<User>) => {
    const mutateUser = mutateUserAction.bind(null, updateUserFiled);
    const updatedUser = await mutateUser();
    return updatedUser;
  },
}));

/**
 * Atom for storing the user data from the data source.
 * If the user data is not initialized, the value is `null`.
 */
const userDataSourceNullableAtom = atom<User | null>(null);

/**
 * Atom for retrieving the current user data from the data source.
 * This atom always returns the latest user data from the data source: before, during, or after a mutation.
 * If the user data is not initialized, an error is thrown.
 */
export const userDataSourceAtom = atom<User, [updatedUser: User], void>(
  (get) => {
    const user = get(userDataSourceNullableAtom);

    if (user !== null) {
      return user;
    }

    throw new Error('User data source is not initialized');
  },
  (_get, set, updatedUser) => {
    set(userDataSourceNullableAtom, updatedUser);
  },
);
