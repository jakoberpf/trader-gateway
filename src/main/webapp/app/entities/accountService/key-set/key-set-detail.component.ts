import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IKeySet } from 'app/shared/model/accountService/key-set.model';

@Component({
  selector: 'jhi-key-set-detail',
  templateUrl: './key-set-detail.component.html',
})
export class KeySetDetailComponent implements OnInit {
  keySet: IKeySet | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ keySet }) => (this.keySet = keySet));
  }

  previousState(): void {
    window.history.back();
  }
}
