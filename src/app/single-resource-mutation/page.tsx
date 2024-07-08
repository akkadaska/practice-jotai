import React from 'react';
import { Provider } from 'jotai';
import { UserMutation } from '@/components/UserMutation';
import { userDataSource } from '@/data-source/user';

export default async function Home() {
  const user = await userDataSource.getMe();
  return (
    <Provider>
      <p>
        Data fetching and state management are completely separated from React
        components.
      </p>
      <UserMutation initialUserDataSource={user} />
    </Provider>
  );
}

export const dynamic = 'force-dynamic';
