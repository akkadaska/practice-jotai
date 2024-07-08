'use client';

import { User } from '@/data-source/user';
import { nameAtom } from '@/jotai/atom/name';
import { userDataSourceAtom } from '@/jotai/atom/user-data-source';
import { useUserAtomsInitializeByDataSource } from '@/jotai/initialize/user-initialize';
import { useUserBaseMutation } from '@/jotai/mutation/user-base-mutation';
import { useAtom, useAtomValue } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';
import React from 'react';

export interface UserMutationProps {
  readonly initialUserDataSource: User;
}

export const UserMutation: React.FC<UserMutationProps> = ({
  initialUserDataSource,
}) => {
  // set the initial user data
  useHydrateAtoms([[userDataSourceAtom, initialUserDataSource]]);

  return (
    <>
      <UserDataSource />
      <UserBaseForm />
    </>
  );
};

const UserDataSource: React.FC = () => {
  const user = useAtomValue(userDataSourceAtom);
  return (
    <div>
      <h2 className="text-lg">Current user data source</h2>
      <pre>{JSON.stringify(user)}</pre>
    </div>
  );
};

const UserBaseForm: React.FC = () => {
  useUserAtomsInitializeByDataSource();

  const mutation = useUserBaseMutation();
  const [name, setName] = useAtom(nameAtom);
  const handleNameChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setName(e.target.value);
  };
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    mutation();
  };
  return (
    <form onSubmit={handleSubmit}>
      <input className="border" value={name} onChange={handleNameChange} />
    </form>
  );
};
