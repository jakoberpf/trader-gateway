export interface IUserAccount {
  id?: string;
  owner?: string;
  keyCollectionId?: string;
}

export class UserAccount implements IUserAccount {
  constructor(public id?: string, public owner?: string, public keyCollectionId?: string) {}
}
