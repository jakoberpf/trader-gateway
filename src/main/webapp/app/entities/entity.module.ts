import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'user-account',
        loadChildren: () => import('./userGateway/user-account/user-account.module').then(m => m.UserGatewayUserAccountModule),
      },
      {
        path: 'key-collection',
        loadChildren: () => import('./accountService/key-collection/key-collection.module').then(m => m.AccountServiceKeyCollectionModule),
      },
      {
        path: 'key-set',
        loadChildren: () => import('./accountService/key-set/key-set.module').then(m => m.AccountServiceKeySetModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class UserGatewayEntityModule {}
