import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IUserAccount, UserAccount } from 'app/shared/model/userGateway/user-account.model';
import { UserAccountService } from './user-account.service';
import { IKeyCollection } from 'app/shared/model/accountService/key-collection.model';
import { KeyCollectionService } from 'app/entities/accountService/key-collection/key-collection.service';

@Component({
  selector: 'jhi-user-account-update',
  templateUrl: './user-account-update.component.html',
})
export class UserAccountUpdateComponent implements OnInit {
  isSaving = false;
  keycollections: IKeyCollection[] = [];

  editForm = this.fb.group({
    id: [],
    fieldName: [],
    keyCollectionId: [],
  });

  constructor(
    protected userAccountService: UserAccountService,
    protected keyCollectionService: KeyCollectionService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ userAccount }) => {
      this.updateForm(userAccount);

      this.keyCollectionService
        .query({ filter: 'useraccount-is-null' })
        .pipe(
          map((res: HttpResponse<IKeyCollection[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IKeyCollection[]) => {
          if (!userAccount.keyCollectionId) {
            this.keycollections = resBody;
          } else {
            this.keyCollectionService
              .find(userAccount.keyCollectionId)
              .pipe(
                map((subRes: HttpResponse<IKeyCollection>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IKeyCollection[]) => (this.keycollections = concatRes));
          }
        });
    });
  }

  updateForm(userAccount: IUserAccount): void {
    this.editForm.patchValue({
      id: userAccount.id,
      fieldName: userAccount.fieldName,
      keyCollectionId: userAccount.keyCollectionId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const userAccount = this.createFromForm();
    if (userAccount.id !== undefined) {
      this.subscribeToSaveResponse(this.userAccountService.update(userAccount));
    } else {
      this.subscribeToSaveResponse(this.userAccountService.create(userAccount));
    }
  }

  private createFromForm(): IUserAccount {
    return {
      ...new UserAccount(),
      id: this.editForm.get(['id'])!.value,
      fieldName: this.editForm.get(['fieldName'])!.value,
      keyCollectionId: this.editForm.get(['keyCollectionId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUserAccount>>): void {
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
