import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { GestoreComponentsPage, GestoreDeleteDialog, GestoreUpdatePage } from './gestore.page-object';

const expect = chai.expect;

describe('Gestore e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let gestoreComponentsPage: GestoreComponentsPage;
  let gestoreUpdatePage: GestoreUpdatePage;
  let gestoreDeleteDialog: GestoreDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Gestores', async () => {
    await navBarPage.goToEntity('gestore');
    gestoreComponentsPage = new GestoreComponentsPage();
    await browser.wait(ec.visibilityOf(gestoreComponentsPage.title), 5000);
    expect(await gestoreComponentsPage.getTitle()).to.eq('jhiptestwayApp.gestore.home.title');
    await browser.wait(ec.or(ec.visibilityOf(gestoreComponentsPage.entities), ec.visibilityOf(gestoreComponentsPage.noResult)), 1000);
  });

  it('should load create Gestore page', async () => {
    await gestoreComponentsPage.clickOnCreateButton();
    gestoreUpdatePage = new GestoreUpdatePage();
    expect(await gestoreUpdatePage.getPageTitle()).to.eq('jhiptestwayApp.gestore.home.createOrEditLabel');
    await gestoreUpdatePage.cancel();
  });

  it('should create and save Gestores', async () => {
    const nbButtonsBeforeCreate = await gestoreComponentsPage.countDeleteButtons();

    await gestoreComponentsPage.clickOnCreateButton();

    await promise.all([gestoreUpdatePage.setIdGestoreInput('5')]);

    await gestoreUpdatePage.save();
    expect(await gestoreUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await gestoreComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Gestore', async () => {
    const nbButtonsBeforeDelete = await gestoreComponentsPage.countDeleteButtons();
    await gestoreComponentsPage.clickOnLastDeleteButton();

    gestoreDeleteDialog = new GestoreDeleteDialog();
    expect(await gestoreDeleteDialog.getDialogTitle()).to.eq('jhiptestwayApp.gestore.delete.question');
    await gestoreDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(gestoreComponentsPage.title), 5000);

    expect(await gestoreComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
