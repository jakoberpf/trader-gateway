import { MARKET } from 'app/shared/model/enumerations/market.model';

export interface IKeySet {
  id?: string;
  owner?: string;
  market?: MARKET;
  apiKey?: string;
  apiSecret?: string;
  keyCollectionId?: string;
}

export class KeySet implements IKeySet {
  constructor(
    public id?: string,
    public owner?: string,
    public market?: MARKET,
    public apiKey?: string,
    public apiSecret?: string,
    public keyCollectionId?: string
  ) {}
}
