import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IKeySet } from 'app/shared/model/accountService/key-set.model';
import { KeySetService } from './key-set.service';

@Component({
  templateUrl: './key-set-delete-dialog.component.html',
})
export class KeySetDeleteDialogComponent {
  keySet?: IKeySet;

  constructor(protected keySetService: KeySetService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.keySetService.delete(id).subscribe(() => {
      this.eventManager.broadcast('keySetListModification');
      this.activeModal.close();
    });
  }
}
