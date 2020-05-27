import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UserGatewaySharedModule } from 'app/shared/shared.module';
import { KeyCollectionComponent } from './key-collection.component';
import { KeyCollectionDetailComponent } from './key-collection-detail.component';
import { KeyCollectionUpdateComponent } from './key-collection-update.component';
import { KeyCollectionDeleteDialogComponent } from './key-collection-delete-dialog.component';
import { keyCollectionRoute } from './key-collection.route';

@NgModule({
  imports: [UserGatewaySharedModule, RouterModule.forChild(keyCollectionRoute)],
  declarations: [KeyCollectionComponent, KeyCollectionDetailComponent, KeyCollectionUpdateComponent, KeyCollectionDeleteDialogComponent],
  entryComponents: [KeyCollectionDeleteDialogComponent],
})
export class AccountServiceKeyCollectionModule {}
