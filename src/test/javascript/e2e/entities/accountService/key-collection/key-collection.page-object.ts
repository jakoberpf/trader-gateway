import { element, by, ElementFinder } from 'protractor';

export class KeyCollectionComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-key-collection div table .btn-danger'));
  title = element.all(by.css('jhi-key-collection div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class KeyCollectionUpdatePage {
  pageTitle = element(by.id('jhi-key-collection-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  ownerInput = element(by.id('field_owner'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setOwnerInput(owner: string): Promise<void> {
    await this.ownerInput.sendKeys(owner);
  }

  async getOwnerInput(): Promise<string> {
    return await this.ownerInput.getAttribute('value');
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class KeyCollectionDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-keyCollection-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-keyCollection'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
