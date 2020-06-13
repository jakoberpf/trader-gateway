import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IKeySet } from 'app/shared/model/userGateway/key-set.model';
import { KeySetService } from './key-set.service';
import { KeySetDeleteDialogComponent } from './key-set-delete-dialog.component';

@Component({
  selector: 'jhi-key-set',
  templateUrl: './key-set.component.html',
})
export class KeySetComponent implements OnInit, OnDestroy {
  keySets?: IKeySet[];
  eventSubscriber?: Subscription;

  constructor(protected keySetService: KeySetService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.keySetService.query().subscribe((res: HttpResponse<IKeySet[]>) => (this.keySets = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInKeySets();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IKeySet): string {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInKeySets(): void {
    this.eventSubscriber = this.eventManager.subscribe('keySetListModification', () => this.loadAll());
  }

  delete(keySet: IKeySet): void {
    const modalRef = this.modalService.open(KeySetDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.keySet = keySet;
  }
}
