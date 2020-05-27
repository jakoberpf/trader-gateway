import { element, by, ElementFinder } from 'protractor';

export class UserAccountComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-user-account div table .btn-danger'));
  title = element.all(by.css('jhi-user-account div h2#page-heading span')).first();
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

export class UserAccountUpdatePage {
  pageTitle = element(by.id('jhi-user-account-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  fieldNameInput = element(by.id('field_fieldName'));

  keyCollectionSelect = element(by.id('field_keyCollection'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setFieldNameInput(fieldName: string): Promise<void> {
    await this.fieldNameInput.sendKeys(fieldName);
  }

  async getFieldNameInput(): Promise<string> {
    return await this.fieldNameInput.getAttribute('value');
  }

  async keyCollectionSelectLastOption(): Promise<void> {
    await this.keyCollectionSelect.all(by.tagName('option')).last().click();
  }

  async keyCollectionSelectOption(option: string): Promise<void> {
    await this.keyCollectionSelect.sendKeys(option);
  }

  getKeyCollectionSelect(): ElementFinder {
    return this.keyCollectionSelect;
  }

  async getKeyCollectionSelectedOption(): Promise<string> {
    return await this.keyCollectionSelect.element(by.css('option:checked')).getText();
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

export class UserAccountDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-userAccount-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-userAccount'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
