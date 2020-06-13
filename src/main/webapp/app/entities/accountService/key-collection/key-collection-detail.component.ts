import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IKeyCollection } from 'app/shared/model/accountService/key-collection.model';

@Component({
  selector: 'jhi-key-collection-detail',
  templateUrl: './key-collection-detail.component.html',
})
export class KeyCollectionDetailComponent implements OnInit {
  keyCollection: IKeyCollection | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ keyCollection }) => (this.keyCollection = keyCollection));
  }

  previousState(): void {
    window.history.back();
  }
}
