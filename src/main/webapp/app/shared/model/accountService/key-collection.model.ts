import { IKeySet } from 'app/shared/model/userGateway/key-set.model';

export interface IKeyCollection {
  id?: string;
  owner?: string;
  keySets?: IKeySet[];
  userAccountId?: string;
}

export class KeyCollection implements IKeyCollection {
  constructor(public id?: string, public owner?: string, public keySets?: IKeySet[], public userAccountId?: string) {}
}
