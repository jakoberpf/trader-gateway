import { element, by, ElementFinder } from 'protractor';

export class KeySetComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-key-set div table .btn-danger'));
  title = element.all(by.css('jhi-key-set div h2#page-heading span')).first();
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

export class KeySetUpdatePage {
  pageTitle = element(by.id('jhi-key-set-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  ownerInput = element(by.id('field_owner'));
  marketSelect = element(by.id('field_market'));
  apiKeyInput = element(by.id('field_apiKey'));
  apiSecretInput = element(by.id('field_apiSecret'));

  keyCollectionSelect = element(by.id('field_keyCollection'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setOwnerInput(owner: string): Promise<void> {
    await this.ownerInput.sendKeys(owner);
  }

  async getOwnerInput(): Promise<string> {
    return await this.ownerInput.getAttribute('value');
  }

  async setMarketSelect(market: string): Promise<void> {
    await this.marketSelect.sendKeys(market);
  }

  async getMarketSelect(): Promise<string> {
    return await this.marketSelect.element(by.css('option:checked')).getText();
  }

  async marketSelectLastOption(): Promise<void> {
    await this.marketSelect.all(by.tagName('option')).last().click();
  }

  async setApiKeyInput(apiKey: string): Promise<void> {
    await this.apiKeyInput.sendKeys(apiKey);
  }

  async getApiKeyInput(): Promise<string> {
    return await this.apiKeyInput.getAttribute('value');
  }

  async setApiSecretInput(apiSecret: string): Promise<void> {
    await this.apiSecretInput.sendKeys(apiSecret);
  }

  async getApiSecretInput(): Promise<string> {
    return await this.apiSecretInput.getAttribute('value');
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

export class KeySetDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-keySet-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-keySet'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
