import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IKeyCollection } from 'app/shared/model/accountService/key-collection.model';
import { KeyCollectionService } from './key-collection.service';
import { KeyCollectionDeleteDialogComponent } from './key-collection-delete-dialog.component';

@Component({
  selector: 'jhi-key-collection',
  templateUrl: './key-collection.component.html',
})
export class KeyCollectionComponent implements OnInit, OnDestroy {
  keyCollections?: IKeyCollection[];
  eventSubscriber?: Subscription;

  constructor(
    protected keyCollectionService: KeyCollectionService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.keyCollectionService.query().subscribe((res: HttpResponse<IKeyCollection[]>) => (this.keyCollections = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInKeyCollections();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IKeyCollection): string {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInKeyCollections(): void {
    this.eventSubscriber = this.eventManager.subscribe('keyCollectionListModification', () => this.loadAll());
  }

  delete(keyCollection: IKeyCollection): void {
    const modalRef = this.modalService.open(KeyCollectionDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.keyCollection = keyCollection;
  }
}
