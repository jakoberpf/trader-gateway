import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { KeySetComponentsPage, KeySetDeleteDialog, KeySetUpdatePage } from './key-set.page-object';

const expect = chai.expect;

describe('KeySet e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let keySetComponentsPage: KeySetComponentsPage;
  let keySetUpdatePage: KeySetUpdatePage;
  let keySetDeleteDialog: KeySetDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load KeySets', async () => {
    await navBarPage.goToEntity('key-set');
    keySetComponentsPage = new KeySetComponentsPage();
    await browser.wait(ec.visibilityOf(keySetComponentsPage.title), 5000);
    expect(await keySetComponentsPage.getTitle()).to.eq('userGatewayApp.accountServiceKeySet.home.title');
    await browser.wait(ec.or(ec.visibilityOf(keySetComponentsPage.entities), ec.visibilityOf(keySetComponentsPage.noResult)), 1000);
  });

  it('should load create KeySet page', async () => {
    await keySetComponentsPage.clickOnCreateButton();
    keySetUpdatePage = new KeySetUpdatePage();
    expect(await keySetUpdatePage.getPageTitle()).to.eq('userGatewayApp.accountServiceKeySet.home.createOrEditLabel');
    await keySetUpdatePage.cancel();
  });

  it('should create and save KeySets', async () => {
    const nbButtonsBeforeCreate = await keySetComponentsPage.countDeleteButtons();

    await keySetComponentsPage.clickOnCreateButton();

    await promise.all([
      keySetUpdatePage.marketSelectLastOption(),
      keySetUpdatePage.setApiKeyInput('apiKey'),
      keySetUpdatePage.setApiSecretInput('apiSecret'),
      keySetUpdatePage.keyCollectionSelectLastOption(),
    ]);

    expect(await keySetUpdatePage.getApiKeyInput()).to.eq('apiKey', 'Expected ApiKey value to be equals to apiKey');
    expect(await keySetUpdatePage.getApiSecretInput()).to.eq('apiSecret', 'Expected ApiSecret value to be equals to apiSecret');

    await keySetUpdatePage.save();
    expect(await keySetUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await keySetComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last KeySet', async () => {
    const nbButtonsBeforeDelete = await keySetComponentsPage.countDeleteButtons();
    await keySetComponentsPage.clickOnLastDeleteButton();

    keySetDeleteDialog = new KeySetDeleteDialog();
    expect(await keySetDeleteDialog.getDialogTitle()).to.eq('userGatewayApp.accountServiceKeySet.delete.question');
    await keySetDeleteDialog.clickOnConfirmButton();

    expect(await keySetComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
