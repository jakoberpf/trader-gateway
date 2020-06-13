import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IKeyCollection } from 'app/shared/model/accountService/key-collection.model';
import { KeyCollectionService } from './key-collection.service';

@Component({
  templateUrl: './key-collection-delete-dialog.component.html',
})
export class KeyCollectionDeleteDialogComponent {
  keyCollection?: IKeyCollection;

  constructor(
    protected keyCollectionService: KeyCollectionService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.keyCollectionService.delete(id).subscribe(() => {
      this.eventManager.broadcast('keyCollectionListModification');
      this.activeModal.close();
    });
  }
}
