import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UserGatewaySharedModule } from 'app/shared/shared.module';
import { KeySetComponent } from './key-set.component';
import { KeySetDetailComponent } from './key-set-detail.component';
import { KeySetUpdateComponent } from './key-set-update.component';
import { KeySetDeleteDialogComponent } from './key-set-delete-dialog.component';
import { keySetRoute } from './key-set.route';

@NgModule({
  imports: [UserGatewaySharedModule, RouterModule.forChild(keySetRoute)],
  declarations: [KeySetComponent, KeySetDetailComponent, KeySetUpdateComponent, KeySetDeleteDialogComponent],
  entryComponents: [KeySetDeleteDialogComponent],
})
export class AccountServiceKeySetModule {}
