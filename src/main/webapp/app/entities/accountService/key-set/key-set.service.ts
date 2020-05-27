import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IKeySet } from 'app/shared/model/accountService/key-set.model';

type EntityResponseType = HttpResponse<IKeySet>;
type EntityArrayResponseType = HttpResponse<IKeySet[]>;

@Injectable({ providedIn: 'root' })
export class KeySetService {
  public resourceUrl = SERVER_API_URL + 'services/accountservice/api/key-sets';

  constructor(protected http: HttpClient) {}

  create(keySet: IKeySet): Observable<EntityResponseType> {
    return this.http.post<IKeySet>(this.resourceUrl, keySet, { observe: 'response' });
  }

  update(keySet: IKeySet): Observable<EntityResponseType> {
    return this.http.put<IKeySet>(this.resourceUrl, keySet, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IKeySet>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IKeySet[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
