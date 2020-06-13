import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IKeyCollection, KeyCollection } from 'app/shared/model/accountService/key-collection.model';
import { KeyCollectionService } from './key-collection.service';
import { KeyCollectionComponent } from './key-collection.component';
import { KeyCollectionDetailComponent } from './key-collection-detail.component';
import { KeyCollectionUpdateComponent } from './key-collection-update.component';

@Injectable({ providedIn: 'root' })
export class KeyCollectionResolve implements Resolve<IKeyCollection> {
  constructor(private service: KeyCollectionService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IKeyCollection> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((keyCollection: HttpResponse<KeyCollection>) => {
          if (keyCollection.body) {
            return of(keyCollection.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new KeyCollection());
  }
}

export const keyCollectionRoute: Routes = [
  {
    path: '',
    component: KeyCollectionComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'traderGatewayApp.accountServiceKeyCollection.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: KeyCollectionDetailComponent,
    resolve: {
      keyCollection: KeyCollectionResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'traderGatewayApp.accountServiceKeyCollection.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: KeyCollectionUpdateComponent,
    resolve: {
      keyCollection: KeyCollectionResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'traderGatewayApp.accountServiceKeyCollection.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: KeyCollectionUpdateComponent,
    resolve: {
      keyCollection: KeyCollectionResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'traderGatewayApp.accountServiceKeyCollection.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
