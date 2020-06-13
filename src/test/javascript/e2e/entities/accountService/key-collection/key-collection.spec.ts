import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { KeyCollectionComponentsPage, KeyCollectionDeleteDialog, KeyCollectionUpdatePage } from './key-collection.page-object';

const expect = chai.expect;

describe('KeyCollection e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let keyCollectionComponentsPage: KeyCollectionComponentsPage;
  let keyCollectionUpdatePage: KeyCollectionUpdatePage;
  let keyCollectionDeleteDialog: KeyCollectionDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load KeyCollections', async () => {
    await navBarPage.goToEntity('key-collection');
    keyCollectionComponentsPage = new KeyCollectionComponentsPage();
    await browser.wait(ec.visibilityOf(keyCollectionComponentsPage.title), 5000);
    expect(await keyCollectionComponentsPage.getTitle()).to.eq('traderGatewayApp.accountServiceKeyCollection.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(keyCollectionComponentsPage.entities), ec.visibilityOf(keyCollectionComponentsPage.noResult)),
      1000
    );
  });

  it('should load create KeyCollection page', async () => {
    await keyCollectionComponentsPage.clickOnCreateButton();
    keyCollectionUpdatePage = new KeyCollectionUpdatePage();
    expect(await keyCollectionUpdatePage.getPageTitle()).to.eq('traderGatewayApp.accountServiceKeyCollection.home.createOrEditLabel');
    await keyCollectionUpdatePage.cancel();
  });

  it('should create and save KeyCollections', async () => {
    const nbButtonsBeforeCreate = await keyCollectionComponentsPage.countDeleteButtons();

    await keyCollectionComponentsPage.clickOnCreateButton();

    await promise.all([keyCollectionUpdatePage.setOwnerInput('owner')]);

    expect(await keyCollectionUpdatePage.getOwnerInput()).to.eq('owner', 'Expected Owner value to be equals to owner');

    await keyCollectionUpdatePage.save();
    expect(await keyCollectionUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await keyCollectionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last KeyCollection', async () => {
    const nbButtonsBeforeDelete = await keyCollectionComponentsPage.countDeleteButtons();
    await keyCollectionComponentsPage.clickOnLastDeleteButton();

    keyCollectionDeleteDialog = new KeyCollectionDeleteDialog();
    expect(await keyCollectionDeleteDialog.getDialogTitle()).to.eq('traderGatewayApp.accountServiceKeyCollection.delete.question');
    await keyCollectionDeleteDialog.clickOnConfirmButton();

    expect(await keyCollectionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
