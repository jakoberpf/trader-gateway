import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IKeyCollection } from 'app/shared/model/accountService/key-collection.model';

type EntityResponseType = HttpResponse<IKeyCollection>;
type EntityArrayResponseType = HttpResponse<IKeyCollection[]>;

@Injectable({ providedIn: 'root' })
export class KeyCollectionService {
  public resourceUrl = SERVER_API_URL + 'services/accountservice/api/key-collections';

  constructor(protected http: HttpClient) {}

  create(keyCollection: IKeyCollection): Observable<EntityResponseType> {
    return this.http.post<IKeyCollection>(this.resourceUrl, keyCollection, { observe: 'response' });
  }

  update(keyCollection: IKeyCollection): Observable<EntityResponseType> {
    return this.http.put<IKeyCollection>(this.resourceUrl, keyCollection, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IKeyCollection>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IKeyCollection[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
