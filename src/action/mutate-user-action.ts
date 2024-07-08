'use server';

import { userDataSource, User } from '@/data-source/user';

export const mutateUserAction = async (updateUserFiled: Partial<User>) => {
  return userDataSource.updateMe(updateUserFiled);
};
