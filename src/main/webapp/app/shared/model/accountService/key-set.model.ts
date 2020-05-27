import { MarketE } from 'app/shared/model/enumerations/market-e.model';

export interface IKeySet {
  id?: string;
  market?: MarketE;
  apiKey?: string;
  apiSecret?: string;
  keyCollectionId?: string;
}

export class KeySet implements IKeySet {
  constructor(
    public id?: string,
    public market?: MarketE,
    public apiKey?: string,
    public apiSecret?: string,
    public keyCollectionId?: string
  ) {}
}
