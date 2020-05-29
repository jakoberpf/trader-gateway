import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IKeySet, KeySet } from 'app/shared/model/userGateway/key-set.model';
import { KeySetService } from './key-set.service';
import { KeySetComponent } from './key-set.component';
import { KeySetDetailComponent } from './key-set-detail.component';
import { KeySetUpdateComponent } from './key-set-update.component';

@Injectable({ providedIn: 'root' })
export class KeySetResolve implements Resolve<IKeySet> {
  constructor(private service: KeySetService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IKeySet> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((keySet: HttpResponse<KeySet>) => {
          if (keySet.body) {
            return of(keySet.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new KeySet());
  }
}

export const keySetRoute: Routes = [
  {
    path: '',
    component: KeySetComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'userGatewayApp.userGatewayKeySet.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: KeySetDetailComponent,
    resolve: {
      keySet: KeySetResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'userGatewayApp.userGatewayKeySet.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: KeySetUpdateComponent,
    resolve: {
      keySet: KeySetResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'userGatewayApp.userGatewayKeySet.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: KeySetUpdateComponent,
    resolve: {
      keySet: KeySetResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'userGatewayApp.userGatewayKeySet.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
