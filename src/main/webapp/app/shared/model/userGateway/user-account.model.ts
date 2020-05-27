export interface IUserAccount {
  id?: string;
  fieldName?: string;
  keyCollectionId?: string;
}

export class UserAccount implements IUserAccount {
  constructor(public id?: string, public fieldName?: string, public keyCollectionId?: string) {}
}
