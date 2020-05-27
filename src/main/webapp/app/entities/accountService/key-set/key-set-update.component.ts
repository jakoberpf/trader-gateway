import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IKeySet, KeySet } from 'app/shared/model/accountService/key-set.model';
import { KeySetService } from './key-set.service';
import { IKeyCollection } from 'app/shared/model/accountService/key-collection.model';
import { KeyCollectionService } from 'app/entities/accountService/key-collection/key-collection.service';

@Component({
  selector: 'jhi-key-set-update',
  templateUrl: './key-set-update.component.html',
})
export class KeySetUpdateComponent implements OnInit {
  isSaving = false;
  keycollections: IKeyCollection[] = [];

  editForm = this.fb.group({
    id: [],
    market: [null, [Validators.required]],
    apiKey: [null, [Validators.required]],
    apiSecret: [null, [Validators.required]],
    keyCollectionId: [],
  });

  constructor(
    protected keySetService: KeySetService,
    protected keyCollectionService: KeyCollectionService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ keySet }) => {
      this.updateForm(keySet);

      this.keyCollectionService.query().subscribe((res: HttpResponse<IKeyCollection[]>) => (this.keycollections = res.body || []));
    });
  }

  updateForm(keySet: IKeySet): void {
    this.editForm.patchValue({
      id: keySet.id,
      market: keySet.market,
      apiKey: keySet.apiKey,
      apiSecret: keySet.apiSecret,
      keyCollectionId: keySet.keyCollectionId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const keySet = this.createFromForm();
    if (keySet.id !== undefined) {
      this.subscribeToSaveResponse(this.keySetService.update(keySet));
    } else {
      this.subscribeToSaveResponse(this.keySetService.create(keySet));
    }
  }

  private createFromForm(): IKeySet {
    return {
      ...new KeySet(),
      id: this.editForm.get(['id'])!.value,
      market: this.editForm.get(['market'])!.value,
      apiKey: this.editForm.get(['apiKey'])!.value,
      apiSecret: this.editForm.get(['apiSecret'])!.value,
      keyCollectionId: this.editForm.get(['keyCollectionId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IKeySet>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IKeyCollection): any {
    return item.id;
  }
}
