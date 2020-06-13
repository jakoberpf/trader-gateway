import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IKeyCollection, KeyCollection } from 'app/shared/model/accountService/key-collection.model';
import { KeyCollectionService } from './key-collection.service';

@Component({
  selector: 'jhi-key-collection-update',
  templateUrl: './key-collection-update.component.html',
})
export class KeyCollectionUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    owner: [null, [Validators.required]],
  });

  constructor(protected keyCollectionService: KeyCollectionService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ keyCollection }) => {
      this.updateForm(keyCollection);
    });
  }

  updateForm(keyCollection: IKeyCollection): void {
    this.editForm.patchValue({
      id: keyCollection.id,
      owner: keyCollection.owner,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const keyCollection = this.createFromForm();
    if (keyCollection.id !== undefined) {
      this.subscribeToSaveResponse(this.keyCollectionService.update(keyCollection));
    } else {
      this.subscribeToSaveResponse(this.keyCollectionService.create(keyCollection));
    }
  }

  private createFromForm(): IKeyCollection {
    return {
      ...new KeyCollection(),
      id: this.editForm.get(['id'])!.value,
      owner: this.editForm.get(['owner'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IKeyCollection>>): void {
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
}
