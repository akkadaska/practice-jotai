import { join } from 'path';
import { readFileSync, writeFileSync } from 'fs';

export interface User {
  name: string;
}

interface UserDataSourceType {
  me: User;
}

class UserDataSource {
  private static FILE_PATH = join(process.cwd(), 'user.json');

  private readFile() {
    const data = readFileSync(UserDataSource.FILE_PATH, 'utf-8');
    return JSON.parse(data) as UserDataSourceType;
  }

  private writeFile(data: UserDataSourceType) {
    const dataString = JSON.stringify(data, null, 2);
    writeFileSync(UserDataSource.FILE_PATH, dataString);
  }

  public async getMe() {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return this.readFile().me;
  }

  public async updateMe(updateUserFiled: Partial<User>) {
    const data = this.readFile();
    const updatedData = { ...data, me: { ...data.me, ...updateUserFiled } };
    this.writeFile(updatedData);
    return this.getMe();
  }
}

export const userDataSource = new UserDataSource();
